"""incident_recovery_monitor.py — Read-only daily monitoring during the BM Klus
PPC incident recovery period (default 2026-05-09 → 2026-05-23).

What it does each run:
  1. Pulls current campaign budget for campaign 23271040037.
  2. Pulls bid strategy type and system status.
  3. Pulls daily conversions + all_conversions (last N days).
  4. Pulls daily cost / clicks / ctr / avg_cpc.
  5. Pulls daily search impression share, lost IS budget, lost IS rank.
  6. Pulls device split (desktop / mobile / tablet) for the window.
  7. Pulls GA4 paid sessions + key events by day.
  8. Pulls GA4 key event counts by event name × source/medium for the window.
  9. Compares against a state file to flag *budget changes* since last run.
 10. Flags if bid strategy enters LEARNING / LIMITED / MISCONFIGURED.

Outputs to seo-ops/outputs/recovery_log/:
  - snapshot_<YYYY-MM-DD>.json   — full structured snapshot of today's pull.
  - recovery_log.csv             — append-only daily summary, one row per run.
  - recovery_memo_<YYYY-MM-DD>.md — short markdown memo for humans.
  - state.json                   — last-seen budget + bid status + last-run time.

This script is READ-ONLY. It does not change Ads, GA4, site, GTM, conversion
goals, budget, keywords, locations, or bid strategy.

Run with the Ads venv (which has both google-ads and google-analytics-data):

    D:/projects/bmklus/google/.venv-ads/Scripts/python.exe \
        seo-ops/tools/incident_recovery_monitor.py

Optional flags:
    --window-days N        Daily breakdown window (default 14)
    --recovery-start DATE  Default 2026-05-09 (for "Day X/14" labelling)
    --recovery-end DATE    Default 2026-05-23
    --quiet                Suppress per-day terminal output (memo still written)
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Paths and constants
# ---------------------------------------------------------------------------
SCRIPT = Path(__file__).resolve()
SEO_OPS = SCRIPT.parent.parent
ENV_LOCAL = SEO_OPS / "integrations" / ".env.local"
OUT_DIR = SEO_OPS / "outputs" / "recovery_log"

ADS_YAML = "D:/projects/bmklus/google/google-ads.yaml"
CUSTOMER_ID = "5902256023"
CAMPAIGN_ID = "23271040037"

DEFAULT_RECOVERY_START = "2026-05-09"
DEFAULT_RECOVERY_END = "2026-05-23"
DEFAULT_WINDOW_DAYS = 14

KEY_EVENTS = ["Contact_Form_Site", "Phone", "Whatsapp"]

# Bid strategy enum values that count as "stable" — anything else = flag.
STABLE_BID_STATES = {"ENABLED"}

# Enum maps (kept here so the script is self-contained and tolerates SDK quirks).
BIDDING_STRATEGY_TYPE = {
    0: "UNSPECIFIED", 1: "UNKNOWN", 2: "ENHANCED_CPC", 3: "MANUAL_CPC",
    4: "MANUAL_CPM", 5: "PAGE_ONE_PROMOTED", 6: "TARGET_CPA", 7: "TARGET_OUTRANK_SHARE",
    8: "TARGET_ROAS", 9: "TARGET_SPEND", 10: "MAXIMIZE_CONVERSIONS",
    11: "MAXIMIZE_CONVERSION_VALUE", 12: "PERCENT_CPC", 13: "MANUAL_CPV",
    14: "TARGET_CPM", 15: "TARGET_IMPRESSION_SHARE", 16: "COMMISSION",
    17: "INVALID", 18: "MANUAL_CPA", 19: "FIXED_CPM", 20: "TARGET_CPV",
    21: "TARGET_CPC", 22: "FIXED_SHARE_OF_VOICE",
}
BIDDING_SYSTEM_STATUS = {
    0: "UNSPECIFIED", 1: "UNKNOWN", 2: "ENABLED", 3: "LEARNING_NEW",
    4: "LEARNING_SETTING_CHANGE", 5: "LEARNING_BUDGET_CHANGE",
    6: "LEARNING_COMPOSITION_CHANGE", 7: "LEARNING_CONVERSION_TYPE_CHANGE",
    8: "LEARNING_CONVERSION_SETTING_CHANGE", 9: "LIMITED_BY_CPC_BID_CEILING",
    10: "LIMITED_BY_CPC_BID_FLOOR", 11: "LIMITED_BY_DATA",
    12: "LIMITED_BY_BUDGET", 13: "LIMITED_BY_LOW_PRIORITY_SPEND",
    14: "LIMITED_BY_LOW_QUALITY", 15: "LIMITED_BY_INVENTORY",
    16: "MISCONFIGURED_ZERO_ELIGIBILITY", 17: "MISCONFIGURED_CONVERSION_TYPES",
    18: "MISCONFIGURED_CONVERSION_SETTINGS", 19: "MISCONFIGURED_SHARED_BUDGET",
    20: "MISCONFIGURED_STRATEGY_TYPE", 21: "PAUSED",
    22: "UNAVAILABLE", 23: "MULTIPLE_LEARNING", 24: "MULTIPLE_LIMITED",
    25: "MULTIPLE_MISCONFIGURED", 26: "MULTIPLE",
}
DEVICE = {0: "UNSPECIFIED", 1: "UNKNOWN", 2: "MOBILE", 3: "TABLET",
          4: "DESKTOP", 5: "CONNECTED_TV", 6: "OTHER"}
RESOURCE_TYPE = {0: "UNSPECIFIED", 1: "UNKNOWN", 2: "AD", 3: "AD_GROUP",
                 4: "AD_GROUP_CRITERION", 5: "CAMPAIGN", 6: "CAMPAIGN_BUDGET",
                 7: "AD_GROUP_BID_MODIFIER", 8: "CAMPAIGN_CRITERION"}
CHANGE_OP = {0: "UNSPECIFIED", 1: "UNKNOWN", 2: "CREATE", 3: "UPDATE", 4: "REMOVE"}
CLIENT_TYPE = {0: "UNSPECIFIED", 1: "UNKNOWN", 2: "GOOGLE_ADS_WEB_CLIENT",
               3: "GOOGLE_ADS_AUTOMATED_RULE", 4: "GOOGLE_ADS_SCRIPTS",
               5: "GOOGLE_ADS_BULK_UPLOAD", 6: "GOOGLE_ADS_API",
               7: "GOOGLE_ADS_EDITOR", 8: "GOOGLE_ADS_MOBILE_APP",
               9: "GOOGLE_ADS_RECOMMENDATIONS", 10: "SEARCH_ADS_360_SYNC",
               11: "SEARCH_ADS_360_POST"}


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def parse_args() -> argparse.Namespace:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--window-days", type=int, default=DEFAULT_WINDOW_DAYS,
                    help="Days of daily breakdown to pull (default 14).")
    ap.add_argument("--recovery-start", default=DEFAULT_RECOVERY_START,
                    help="Recovery window start (YYYY-MM-DD).")
    ap.add_argument("--recovery-end", default=DEFAULT_RECOVERY_END,
                    help="Recovery window end (YYYY-MM-DD).")
    ap.add_argument("--quiet", action="store_true", help="Suppress per-day prints.")
    return ap.parse_args()


# ---------------------------------------------------------------------------
# Env loader
# ---------------------------------------------------------------------------
def load_env(path: Path) -> None:
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


# ---------------------------------------------------------------------------
# Ads API helpers
# ---------------------------------------------------------------------------
def make_ads_client():
    from google.ads.googleads.client import GoogleAdsClient
    return GoogleAdsClient.load_from_storage(ADS_YAML, version="v23")


def ads_query(svc, q: str) -> list:
    from google.ads.googleads.errors import GoogleAdsException
    rows = []
    try:
        for batch in svc.search_stream(customer_id=CUSTOMER_ID, query=q):
            for row in batch.results:
                rows.append(row)
    except GoogleAdsException as e:
        raise RuntimeError(f"Ads query failed: {e}") from e
    return rows


def fetch_campaign_budget(client) -> dict:
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT campaign_budget.id, campaign_budget.name, "
        "campaign_budget.amount_micros, campaign_budget.delivery_method, "
        "campaign_budget.status, campaign.id "
        f"FROM campaign_budget WHERE campaign.id = {CAMPAIGN_ID}"
    )
    rows = ads_query(svc, q)
    out = {"budget_id": None, "name": None, "amount_eur": None,
           "delivery_method": None, "status": None}
    for r in rows:
        b = r.campaign_budget
        out["budget_id"] = b.id
        out["name"] = b.name
        out["amount_eur"] = round(b.amount_micros / 1_000_000, 2)
        out["delivery_method"] = int(b.delivery_method)
        out["status"] = int(b.status)
        break
    return out


def fetch_bid_strategy(client) -> dict:
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT campaign.id, campaign.name, campaign.status, "
        "campaign.bidding_strategy_type, "
        "campaign.bidding_strategy_system_status, "
        "campaign.maximize_conversions.target_cpa_micros, "
        "campaign.target_cpa.target_cpa_micros, "
        "campaign.optimization_score "
        f"FROM campaign WHERE campaign.id = {CAMPAIGN_ID}"
    )
    rows = ads_query(svc, q)
    out: dict[str, Any] = {}
    for r in rows:
        c = r.campaign
        bst_int = int(c.bidding_strategy_type)
        bss_int = int(c.bidding_strategy_system_status)
        out = {
            "campaign_name": c.name,
            "campaign_status_int": int(c.status),
            "bid_strategy_type_int": bst_int,
            "bid_strategy_type": BIDDING_STRATEGY_TYPE.get(bst_int, f"INT_{bst_int}"),
            "bid_strategy_system_status_int": bss_int,
            "bid_strategy_system_status": BIDDING_SYSTEM_STATUS.get(bss_int, f"INT_{bss_int}"),
            "max_conv_target_cpa_eur": round(c.maximize_conversions.target_cpa_micros / 1_000_000, 2) if c.maximize_conversions.target_cpa_micros else None,
            "tcpa_target_eur": round(c.target_cpa.target_cpa_micros / 1_000_000, 2) if c.target_cpa.target_cpa_micros else None,
            "optimization_score": round(c.optimization_score, 4),
        }
        break
    return out


def fetch_daily_metrics(client, start: str, end: str) -> list[dict]:
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT segments.date, "
        "metrics.impressions, metrics.clicks, metrics.ctr, "
        "metrics.average_cpc, metrics.cost_micros, "
        "metrics.conversions, metrics.all_conversions "
        f"FROM campaign WHERE campaign.id = {CAMPAIGN_ID} "
        f"AND segments.date BETWEEN '{start}' AND '{end}' "
        "ORDER BY segments.date ASC"
    )
    rows = ads_query(svc, q)
    out = []
    for r in rows:
        m = r.metrics
        out.append({
            "date": r.segments.date,
            "impressions": m.impressions,
            "clicks": m.clicks,
            "ctr": round(m.ctr, 4),
            "avg_cpc_eur": round(m.average_cpc / 1_000_000, 2),
            "cost_eur": round(m.cost_micros / 1_000_000, 2),
            "conversions": round(m.conversions, 2),
            "all_conversions": round(m.all_conversions, 2),
        })
    return out


def fetch_daily_is(client, start: str, end: str) -> list[dict]:
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT segments.date, "
        "metrics.search_impression_share, "
        "metrics.search_top_impression_share, "
        "metrics.search_absolute_top_impression_share, "
        "metrics.search_budget_lost_impression_share, "
        "metrics.search_rank_lost_impression_share "
        f"FROM campaign WHERE campaign.id = {CAMPAIGN_ID} "
        f"AND segments.date BETWEEN '{start}' AND '{end}' "
        "ORDER BY segments.date ASC"
    )
    rows = ads_query(svc, q)
    out = []
    for r in rows:
        m = r.metrics
        out.append({
            "date": r.segments.date,
            "search_is": round(m.search_impression_share, 4),
            "top_is": round(m.search_top_impression_share, 4),
            "abs_top_is": round(m.search_absolute_top_impression_share, 4),
            "lost_is_budget": round(m.search_budget_lost_impression_share, 4),
            "lost_is_rank": round(m.search_rank_lost_impression_share, 4),
        })
    return out


def fetch_device_split(client, start: str, end: str) -> list[dict]:
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT segments.device, "
        "metrics.impressions, metrics.clicks, metrics.cost_micros, "
        "metrics.conversions, metrics.all_conversions "
        f"FROM campaign WHERE campaign.id = {CAMPAIGN_ID} "
        f"AND segments.date BETWEEN '{start}' AND '{end}'"
    )
    rows = ads_query(svc, q)
    out = []
    for r in rows:
        m = r.metrics
        out.append({
            "device": DEVICE.get(int(r.segments.device), str(int(r.segments.device))),
            "impressions": m.impressions,
            "clicks": m.clicks,
            "cost_eur": round(m.cost_micros / 1_000_000, 2),
            "conversions": round(m.conversions, 2),
            "all_conversions": round(m.all_conversions, 2),
        })
    return out


def fetch_change_events(client, start_dt: str, end_dt: str) -> list[dict]:
    """Pull change_event for the campaign. API limit: last 30 days only.
    start_dt / end_dt format: 'YYYY-MM-DD HH:MM:SS'.
    """
    svc = client.get_service("GoogleAdsService")
    q = (
        "SELECT change_event.change_date_time, change_event.change_resource_type, "
        "change_event.change_resource_name, change_event.client_type, "
        "change_event.user_email, change_event.resource_change_operation, "
        "change_event.changed_fields, change_event.campaign, "
        "change_event.old_resource, change_event.new_resource "
        "FROM change_event "
        f"WHERE change_event.change_date_time BETWEEN '{start_dt}' AND '{end_dt}' "
        "ORDER BY change_event.change_date_time DESC LIMIT 1000"
    )
    rows = ads_query(svc, q)
    out = []
    for r in rows:
        ce = r.change_event
        old_b, new_b = None, None
        try:
            old_b = ce.old_resource.campaign_budget.amount_micros
            new_b = ce.new_resource.campaign_budget.amount_micros
        except Exception:
            pass
        out.append({
            "when": str(ce.change_date_time),
            "resource_type": RESOURCE_TYPE.get(int(ce.change_resource_type), str(int(ce.change_resource_type))),
            "resource_name": str(ce.change_resource_name),
            "client_type": CLIENT_TYPE.get(int(ce.client_type), str(int(ce.client_type))),
            "user": ce.user_email or "",
            "operation": CHANGE_OP.get(int(ce.resource_change_operation), str(int(ce.resource_change_operation))),
            "changed_fields": str(ce.changed_fields),
            "old_budget_eur": (old_b / 1_000_000) if old_b else None,
            "new_budget_eur": (new_b / 1_000_000) if new_b else None,
        })
    return out


# ---------------------------------------------------------------------------
# GA4 helpers
# ---------------------------------------------------------------------------
def make_ga4_client():
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    sa_json = os.environ.get("BMKLUS_GA4_SERVICE_ACCOUNT_JSON", "").strip()
    if not sa_json or not Path(sa_json).is_file():
        raise RuntimeError(
            "BMKLUS_GA4_SERVICE_ACCOUNT_JSON env var missing or file not found "
            f"(got: {sa_json!r}). Check seo-ops/integrations/.env.local."
        )
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa_json
    return BetaAnalyticsDataClient()


def ga4_run(client, pid: str, start: str, end: str, dims: list[str],
            mets: list[str], dim_filter=None, limit: int = 1000) -> list[dict]:
    from google.analytics.data_v1beta.types import (
        DateRange, Dimension, Metric, RunReportRequest,
    )
    req = RunReportRequest(
        property=f"properties/{pid}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets],
        limit=limit,
    )
    if dim_filter is not None:
        req.dimension_filter = dim_filter
    resp = client.run_report(req)
    out = []
    for row in resp.rows or []:
        rec: dict[str, Any] = {}
        for i, dv in enumerate(row.dimension_values):
            rec[dims[i]] = dv.value
        for i, mv in enumerate(row.metric_values):
            rec[mets[i]] = mv.value
        out.append(rec)
    return out


def fetch_ga4_paid_daily(client, pid: str, start: str, end: str) -> list[dict]:
    from google.analytics.data_v1beta.types import Filter, FilterExpression
    sm_filter = FilterExpression(
        filter=Filter(field_name="sessionSourceMedium",
                      string_filter=Filter.StringFilter(
                          value="google / cpc",
                          match_type=Filter.StringFilter.MatchType.EXACT)))
    rows = ga4_run(client, pid, start, end,
                   dims=["date"],
                   mets=["sessions", "engagedSessions", "keyEvents"],
                   dim_filter=sm_filter)
    rows.sort(key=lambda r: r.get("date", ""))
    return rows


def fetch_ga4_event_breakdown(client, pid: str, start: str, end: str) -> list[dict]:
    """Per-event counts × source/medium for the configured key events."""
    from google.analytics.data_v1beta.types import Filter, FilterExpression
    evt_filter = FilterExpression(
        filter=Filter(field_name="eventName",
                      in_list_filter=Filter.InListFilter(values=KEY_EVENTS)))
    rows = ga4_run(client, pid, start, end,
                   dims=["sessionSourceMedium", "eventName"],
                   mets=["eventCount"],
                   dim_filter=evt_filter)
    return rows


# ---------------------------------------------------------------------------
# Aggregation + flag detection
# ---------------------------------------------------------------------------
def aggregate(daily: list[dict], keys: list[str]) -> dict:
    out: dict[str, float] = {k: 0.0 for k in keys}
    for r in daily:
        for k in keys:
            v = r.get(k, 0) or 0
            try:
                out[k] += float(v)
            except (TypeError, ValueError):
                pass
    return out


def avg_pct(daily: list[dict], key: str) -> float:
    vals = [float(r.get(key, 0) or 0) for r in daily]
    return (sum(vals) / len(vals) * 100) if vals else 0.0


def detect_flags(snapshot: dict, state: dict) -> list[dict]:
    flags: list[dict] = []

    # 1. Budget changed since last run.
    last_budget = state.get("last_budget_eur")
    cur_budget = snapshot["budget"]["amount_eur"]
    if last_budget is not None and cur_budget != last_budget:
        flags.append({
            "level": "CRITICAL",
            "code": "BUDGET_CHANGED",
            "detail": f"Budget changed since last run: €{last_budget} → €{cur_budget}",
        })

    # 2. Budget changed in last 24h according to change_event log.
    recent_budget_changes = [
        e for e in snapshot["change_events"]
        if e.get("new_budget_eur") is not None
    ]
    if recent_budget_changes:
        most_recent = recent_budget_changes[0]  # already DESC-sorted
        when = most_recent["when"][:19]
        # Compute hours since
        try:
            dt = datetime.strptime(when, "%Y-%m-%d %H:%M:%S")
            hours_ago = (datetime.now() - dt).total_seconds() / 3600
            if hours_ago < 24:
                flags.append({
                    "level": "WARNING",
                    "code": "RECENT_BUDGET_CHANGE",
                    "detail": (
                        f"Budget change <24h ago: {when} "
                        f"€{most_recent.get('old_budget_eur','?')}→€{most_recent.get('new_budget_eur','?')} "
                        f"({most_recent['client_type']}, {most_recent['user']})"
                    ),
                })
        except ValueError:
            pass

    # 3. Bid strategy not in stable state.
    bss = snapshot["bid_strategy"]["bid_strategy_system_status"]
    if bss not in STABLE_BID_STATES:
        level = "CRITICAL" if bss.startswith("MISCONFIGURED") else "WARNING"
        flags.append({
            "level": level,
            "code": "BID_STRATEGY_NOT_STABLE",
            "detail": f"bidding_strategy_system_status = {bss}",
        })

    # 4. Bid strategy system status changed since last run (even if both stable).
    last_bss = state.get("last_bid_system_status")
    if last_bss is not None and last_bss != bss:
        flags.append({
            "level": "WARNING",
            "code": "BID_STRATEGY_STATUS_CHANGED",
            "detail": f"bidding_strategy_system_status: {last_bss} → {bss}",
        })

    # 5. Bid strategy type changed (any type change is a major event).
    last_bst = state.get("last_bid_strategy_type")
    cur_bst = snapshot["bid_strategy"]["bid_strategy_type"]
    if last_bst is not None and last_bst != cur_bst:
        flags.append({
            "level": "CRITICAL",
            "code": "BID_STRATEGY_TYPE_CHANGED",
            "detail": f"bidding_strategy_type: {last_bst} → {cur_bst}",
        })

    # 6. Potential tracking break: ≥3 consecutive recent days with Ads clicks > 0
    #    but GA4 paid sessions == 0.
    daily = snapshot["daily_metrics"]
    ga4_daily = snapshot["ga4_paid_daily"]
    ga4_by_date = {r["date"]: int(r.get("sessions", 0) or 0) for r in ga4_daily}
    consecutive_zero = 0
    last_n = sorted(daily, key=lambda r: r["date"])[-7:]  # last 7 days max
    for r in last_n:
        ads_date = r["date"]
        ga4_key = ads_date.replace("-", "")
        if r.get("clicks", 0) > 0 and ga4_by_date.get(ga4_key, 0) == 0:
            consecutive_zero += 1
        else:
            consecutive_zero = 0
    if consecutive_zero >= 3:
        flags.append({
            "level": "CRITICAL",
            "code": "POTENTIAL_TRACKING_BREAK",
            "detail": (
                f"{consecutive_zero} consecutive days with Ads clicks > 0 "
                "but GA4 paid sessions == 0. Verify tracking pipeline."
            ),
        })

    return flags


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------
CSV_HEADERS = [
    "run_at_local", "yesterday_date", "recovery_day",
    "budget_eur", "bid_strategy_type", "bid_strategy_system_status",
    "optimization_score",
    "last_window_clicks", "last_window_cost_eur",
    "last_window_conversions", "last_window_all_conversions",
    "yesterday_clicks", "yesterday_cost_eur", "yesterday_conv",
    "avg_search_is_pct", "avg_lost_is_budget_pct", "avg_lost_is_rank_pct",
    "mobile_clicks", "mobile_cost_eur", "mobile_conv",
    "desktop_clicks", "desktop_cost_eur", "desktop_conv",
    "ga4_paid_window_sessions", "ga4_paid_window_engaged",
    "ga4_paid_window_keyevents",
    "ga4_contact_form_paid_window", "ga4_phone_paid_window",
    "ga4_whatsapp_paid_window",
    "ga4_contact_form_org_window", "ga4_phone_org_window",
    "ga4_whatsapp_org_window",
    "flags_count", "flags_summary",
]


def build_csv_row(snapshot: dict, flags: list[dict]) -> dict:
    bud = snapshot["budget"]
    bs = snapshot["bid_strategy"]
    daily = snapshot["daily_metrics"]
    is_daily = snapshot["daily_is"]
    devs = snapshot["device_split"]
    ga4_daily = snapshot["ga4_paid_daily"]
    ga4_evt = snapshot["ga4_event_breakdown"]

    def dev_get(name: str) -> dict:
        for d in devs:
            if d["device"] == name:
                return d
        return {"clicks": 0, "cost_eur": 0.0, "conversions": 0.0}

    yesterday = sorted(daily, key=lambda r: r["date"])[-2:-1]
    yest = yesterday[0] if yesterday else {"date": "?", "clicks": 0, "cost_eur": 0.0, "conversions": 0.0}

    win_clicks = sum(r["clicks"] for r in daily)
    win_cost = sum(r["cost_eur"] for r in daily)
    win_conv = sum(r["conversions"] for r in daily)
    win_all = sum(r["all_conversions"] for r in daily)

    paid_sessions = sum(int(r.get("sessions", 0) or 0) for r in ga4_daily)
    paid_engaged = sum(int(r.get("engagedSessions", 0) or 0) for r in ga4_daily)
    paid_keyev = sum(float(r.get("keyEvents", 0) or 0) for r in ga4_daily)

    def evt_count(event: str, source_medium_prefix: str) -> int:
        return sum(
            int(r.get("eventCount", 0) or 0) for r in ga4_evt
            if r.get("eventName") == event
            and (r.get("sessionSourceMedium", "") or "").startswith(source_medium_prefix)
        )

    cf_paid = evt_count("Contact_Form_Site", "google / cpc")
    ph_paid = evt_count("Phone", "google / cpc")
    wa_paid = evt_count("Whatsapp", "google / cpc")
    cf_org = evt_count("Contact_Form_Site", "google / organic")
    ph_org = evt_count("Phone", "google / organic")
    wa_org = evt_count("Whatsapp", "google / organic")

    rec_start = datetime.strptime(snapshot["recovery_window"]["start"], "%Y-%m-%d").date()
    rec_end = datetime.strptime(snapshot["recovery_window"]["end"], "%Y-%m-%d").date()
    today_d = date.today()
    rec_total = (rec_end - rec_start).days
    rec_now = (today_d - rec_start).days
    rec_label = f"Day {max(0, rec_now)}/{rec_total}"
    if today_d < rec_start:
        rec_label = f"Pre-recovery (starts in {(rec_start - today_d).days}d)"
    elif today_d > rec_end:
        rec_label = f"Post-recovery (+{(today_d - rec_end).days}d)"

    return {
        "run_at_local": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "yesterday_date": yest["date"],
        "recovery_day": rec_label,
        "budget_eur": bud.get("amount_eur"),
        "bid_strategy_type": bs.get("bid_strategy_type"),
        "bid_strategy_system_status": bs.get("bid_strategy_system_status"),
        "optimization_score": bs.get("optimization_score"),
        "last_window_clicks": win_clicks,
        "last_window_cost_eur": round(win_cost, 2),
        "last_window_conversions": round(win_conv, 2),
        "last_window_all_conversions": round(win_all, 2),
        "yesterday_clicks": yest.get("clicks", 0),
        "yesterday_cost_eur": yest.get("cost_eur", 0),
        "yesterday_conv": yest.get("conversions", 0),
        "avg_search_is_pct": round(avg_pct(is_daily, "search_is"), 1),
        "avg_lost_is_budget_pct": round(avg_pct(is_daily, "lost_is_budget"), 1),
        "avg_lost_is_rank_pct": round(avg_pct(is_daily, "lost_is_rank"), 1),
        "mobile_clicks": dev_get("MOBILE")["clicks"],
        "mobile_cost_eur": dev_get("MOBILE")["cost_eur"],
        "mobile_conv": dev_get("MOBILE")["conversions"],
        "desktop_clicks": dev_get("DESKTOP")["clicks"],
        "desktop_cost_eur": dev_get("DESKTOP")["cost_eur"],
        "desktop_conv": dev_get("DESKTOP")["conversions"],
        "ga4_paid_window_sessions": paid_sessions,
        "ga4_paid_window_engaged": paid_engaged,
        "ga4_paid_window_keyevents": paid_keyev,
        "ga4_contact_form_paid_window": cf_paid,
        "ga4_phone_paid_window": ph_paid,
        "ga4_whatsapp_paid_window": wa_paid,
        "ga4_contact_form_org_window": cf_org,
        "ga4_phone_org_window": ph_org,
        "ga4_whatsapp_org_window": wa_org,
        "flags_count": len(flags),
        "flags_summary": "; ".join(f["code"] for f in flags) if flags else "",
    }


def append_csv(row: dict, csv_path: Path) -> None:
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    new_file = not csv_path.exists()
    with csv_path.open("a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CSV_HEADERS, extrasaction="ignore")
        if new_file:
            w.writeheader()
        w.writerow(row)


def write_memo(snapshot: dict, flags: list[dict], csv_row: dict, memo_path: Path) -> None:
    bs = snapshot["bid_strategy"]
    bud = snapshot["budget"]
    daily = snapshot["daily_metrics"]
    is_daily = snapshot["daily_is"]
    ga4_evt = snapshot["ga4_event_breakdown"]
    ga4_daily = snapshot["ga4_paid_daily"]

    def evt_count(event: str, prefix: str) -> int:
        return sum(int(r.get("eventCount", 0) or 0) for r in ga4_evt
                   if r.get("eventName") == event
                   and (r.get("sessionSourceMedium", "") or "").startswith(prefix))

    win_clicks = sum(r["clicks"] for r in daily)
    win_cost = sum(r["cost_eur"] for r in daily)
    win_conv = sum(r["conversions"] for r in daily)
    win_all = sum(r["all_conversions"] for r in daily)
    paid_sessions = sum(int(r.get("sessions", 0) or 0) for r in ga4_daily)
    paid_keyev = sum(float(r.get("keyEvents", 0) or 0) for r in ga4_daily)

    last_change = None
    for e in snapshot["change_events"]:
        if e.get("new_budget_eur") is not None:
            last_change = e
            break

    lines = [
        f"# PPC Recovery — {csv_row['recovery_day']} ({snapshot['run_at_local']})",
        "",
        "## Status snapshot",
        f"- **Budget:** €{bud.get('amount_eur')}/d (delivery enum {bud.get('delivery_method')})",
        f"- **Bid strategy:** {bs.get('bid_strategy_type')} · "
        f"system status: **{bs.get('bid_strategy_system_status')}** · "
        f"optimization score: {bs.get('optimization_score')}",
    ]
    if last_change:
        lines.append(
            f"- **Last budget change:** {last_change['when'][:19]} "
            f"({last_change['client_type']}, {last_change['user']}) "
            f"€{last_change.get('old_budget_eur','?')} → €{last_change.get('new_budget_eur','?')}"
        )
    else:
        lines.append("- **Last budget change:** none in last 30 days")

    lines += [
        "",
        f"## Last {len(daily)} days (campaign {CAMPAIGN_ID})",
        f"- Clicks: **{win_clicks}** · Cost: **€{round(win_cost,2)}** · "
        f"Conv: **{round(win_conv,2)}** · all_conv: **{round(win_all,2)}**",
        f"- Avg Search IS: **{round(avg_pct(is_daily,'search_is'),1)}%** · "
        f"Lost-IS-Budget avg: **{round(avg_pct(is_daily,'lost_is_budget'),1)}%** · "
        f"Lost-IS-Rank avg: **{round(avg_pct(is_daily,'lost_is_rank'),1)}%**",
        "",
        "## Device split (window aggregate)",
    ]
    for d in snapshot["device_split"]:
        lines.append(
            f"- **{d['device']}**: {d['clicks']} clicks · "
            f"€{d['cost_eur']} · {d['conversions']} conv ({d['all_conversions']} all)"
        )

    lines += [
        "",
        "## GA4 (window aggregate)",
        f"- Paid Search sessions: **{paid_sessions}** · keyEvents (paid): **{paid_keyev:.0f}**",
        "",
        "### Key event firings, paid vs organic (last window)",
        "| Event | google/cpc | google/organic |",
        "|---|---:|---:|",
        f"| Contact_Form_Site | {evt_count('Contact_Form_Site','google / cpc')} | "
        f"{evt_count('Contact_Form_Site','google / organic')} |",
        f"| Phone | {evt_count('Phone','google / cpc')} | "
        f"{evt_count('Phone','google / organic')} |",
        f"| Whatsapp | {evt_count('Whatsapp','google / cpc')} | "
        f"{evt_count('Whatsapp','google / organic')} |",
        "",
        "## Flags",
    ]
    if not flags:
        lines.append("- _(none — all checks passed)_")
    else:
        for f in flags:
            lines.append(f"- **[{f['level']}]** `{f['code']}` — {f['detail']}")

    lines += [
        "",
        "## Verdict (rule-based, no recommendations)",
    ]
    rec_end = datetime.strptime(snapshot["recovery_window"]["end"], "%Y-%m-%d").date()
    today_d = date.today()
    has_critical = any(f["level"] == "CRITICAL" for f in flags)
    has_tracking_break = any(f["code"] == "POTENTIAL_TRACKING_BREAK" for f in flags)

    if has_tracking_break:
        lines.append(
            "- **TRACKING BREAK SUSPECTED.** This is the only condition that justifies "
            "intervention before recovery window end. Verify tracking pipeline manually "
            "(GA4 DebugView with a paid-attributed test session) before changing anything."
        )
    elif has_critical:
        lines.append(
            "- **CRITICAL flag(s) raised.** Review the flags above. Do not act on Ads "
            "settings unless tracking is confirmed broken; the recovery memo's general "
            "instruction is: leave config unchanged until recovery window end."
        )
    elif today_d < rec_end:
        lines.append(
            "- Recovery period in progress. **Do not change Ads settings.** "
            "Continue daily monitoring."
        )
    else:
        lines.append(
            "- Recovery period ended. Reassess Ads strategy outside this monitor."
        )

    lines.append("")
    lines.append(f"_Snapshot file: `snapshot_{snapshot['run_date']}.json`_")
    memo_path.parent.mkdir(parents=True, exist_ok=True)
    memo_path.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    args = parse_args()
    load_env(ENV_LOCAL)

    pid = os.environ.get("BMKLUS_GA4_PROPERTY_ID", "").strip()
    if not pid:
        print("FAIL: BMKLUS_GA4_PROPERTY_ID missing in env (.env.local).",
              file=sys.stderr)
        return 1

    today = date.today()
    end = today.isoformat()
    start = (today - timedelta(days=args.window_days - 1)).isoformat()
    ce_start = (today - timedelta(days=29)).isoformat() + " 00:00:00"
    ce_end = end + " 23:59:59"

    if not args.quiet:
        print(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] "
              f"recovery monitor — window {start}..{end}")

    # --- Ads pulls -----
    ads_client = make_ads_client()
    budget = fetch_campaign_budget(ads_client)
    bid = fetch_bid_strategy(ads_client)
    daily = fetch_daily_metrics(ads_client, start, end)
    is_daily = fetch_daily_is(ads_client, start, end)
    devs = fetch_device_split(ads_client, start, end)
    change_events = fetch_change_events(ads_client, ce_start, ce_end)

    # --- GA4 pulls -----
    ga4_client = make_ga4_client()
    ga4_daily = fetch_ga4_paid_daily(ga4_client, pid, start, end)
    ga4_evt = fetch_ga4_event_breakdown(ga4_client, pid, start, end)

    # --- Snapshot -----
    snapshot = {
        "run_at_local": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "run_date": today.isoformat(),
        "window": {"start": start, "end": end, "days": args.window_days},
        "recovery_window": {
            "start": args.recovery_start, "end": args.recovery_end,
        },
        "campaign_id": CAMPAIGN_ID,
        "customer_id": CUSTOMER_ID,
        "ga4_property_id": pid,
        "budget": budget,
        "bid_strategy": bid,
        "daily_metrics": daily,
        "daily_is": is_daily,
        "device_split": devs,
        "change_events": change_events,
        "ga4_paid_daily": ga4_daily,
        "ga4_event_breakdown": ga4_evt,
    }

    # --- Load state, detect flags, write state -----
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    state_path = OUT_DIR / "state.json"
    state = {}
    if state_path.is_file():
        try:
            state = json.loads(state_path.read_text(encoding="utf-8"))
        except Exception:
            state = {}

    flags = detect_flags(snapshot, state)
    snapshot["flags"] = flags

    # Update state for next run.
    new_state = {
        "last_run_at": snapshot["run_at_local"],
        "last_budget_eur": budget.get("amount_eur"),
        "last_bid_strategy_type": bid.get("bid_strategy_type"),
        "last_bid_system_status": bid.get("bid_strategy_system_status"),
    }
    state_path.write_text(json.dumps(new_state, indent=2, ensure_ascii=False),
                          encoding="utf-8")

    # --- Outputs -----
    snap_path = OUT_DIR / f"snapshot_{today.isoformat()}.json"
    snap_path.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False, default=str),
                         encoding="utf-8")

    csv_row = build_csv_row(snapshot, flags)
    append_csv(csv_row, OUT_DIR / "recovery_log.csv")

    memo_path = OUT_DIR / f"recovery_memo_{today.isoformat()}.md"
    write_memo(snapshot, flags, csv_row, memo_path)

    if not args.quiet:
        print(f"  budget         €{budget.get('amount_eur')}/d")
        print(f"  bid strategy   {bid.get('bid_strategy_type')} / "
              f"{bid.get('bid_strategy_system_status')}")
        print(f"  window clicks  {sum(r['clicks'] for r in daily)}")
        print(f"  window cost    €{round(sum(r['cost_eur'] for r in daily), 2)}")
        print(f"  window conv    {round(sum(r['conversions'] for r in daily), 2)}")
        print(f"  flags          {len(flags)}")
        for f in flags:
            print(f"    [{f['level']}] {f['code']}: {f['detail']}")
        print(f"  snapshot:  {snap_path.name}")
        print(f"  csv:       {(OUT_DIR / 'recovery_log.csv').name}")
        print(f"  memo:      {memo_path.name}")

    return 1 if any(f["level"] == "CRITICAL" for f in flags) else 0


if __name__ == "__main__":
    sys.exit(main())
