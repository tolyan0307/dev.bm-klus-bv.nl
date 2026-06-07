"""
.tmp_preflight_full_audit.py — READ-ONLY preflight ping for the full audit run.

Checks auth/connectivity for GSC, GA4, GBP, DataForSEO WITHOUT triggering any
interactive OAuth flow and WITHOUT printing any secret values. Google Ads is
checked separately (SDK not installed). Emits a status JSON + console table.

Run with the seo-ops integrations venv python.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

INTEG = Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/_preflight_status.json")


def load_env() -> None:
    # .env.local takes precedence; .env.example fills the rest (GA4 paths etc.)
    for fname in (".env.local", ".env.example"):
        p = INTEG / fname
        if not p.is_file():
            continue
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


results: list[dict] = []


def rec(source, auth, can_pull, blocker, detail):
    results.append({
        "source": source, "auth_status": auth, "can_pull": can_pull,
        "blocker": blocker, "detail": detail,
    })


# --------------------------------------------------------------------------
# GSC
# --------------------------------------------------------------------------
def check_gsc():
    try:
        from google.oauth2.credentials import Credentials
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build

        site = os.environ.get("BMKLUS_GSC_SITE_URL", "").strip()
        token_path = Path(os.environ.get("BMKLUS_GSC_TOKEN_JSON", "").strip())
        scopes = ["https://www.googleapis.com/auth/webmasters.readonly"]
        if not token_path.is_file():
            return rec("GSC", "no_token", "no", "token file missing", str(token_path))
        creds = Credentials.from_authorized_user_file(str(token_path), scopes)
        if not creds.valid:
            if creds.expired and creds.refresh_token:
                creds.refresh(Request())  # non-interactive
            else:
                return rec("GSC", "invalid_no_refresh", "no",
                           "token invalid and not refreshable (needs manual re-auth)", "")
        service = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
        sites = service.sites().list().execute()
        owned = [s.get("siteUrl") for s in sites.get("siteEntry", [])]
        present = site in owned
        # latest available date: query last 5 days, 1 row, date dim
        end = date.today()
        start = end - timedelta(days=7)
        body = {"startDate": start.isoformat(), "endDate": end.isoformat(),
                "dimensions": ["date"], "rowLimit": 10}
        resp = service.searchanalytics().query(siteUrl=site, body=body).execute()
        dates = sorted(r["keys"][0] for r in resp.get("rows", []))
        latest = dates[-1] if dates else "none"
        rec("GSC", "ok", "yes" if present else "yes(property check)",
            "" if present else "site not in owned list (check property form)",
            f"latest_data_date={latest}; owned_properties={len(owned)}")
    except Exception as e:
        rec("GSC", "error", "no", type(e).__name__, str(e)[:300])


# --------------------------------------------------------------------------
# GA4
# --------------------------------------------------------------------------
def check_ga4():
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange, Metric, RunReportRequest,
        )
        prop = os.environ.get("BMKLUS_GA4_PROPERTY_ID", "").strip()
        sa = os.environ.get("BMKLUS_GA4_SERVICE_ACCOUNT_JSON", "").strip()
        if not prop:
            return rec("GA4", "no_config", "no", "BMKLUS_GA4_PROPERTY_ID missing", "")
        if not Path(sa).is_file():
            return rec("GA4", "no_sa", "no", "service account JSON missing", sa)
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa
        client = BetaAnalyticsDataClient()
        end = date.today() - timedelta(days=1)
        start = end - timedelta(days=2)
        req = RunReportRequest(
            property=f"properties/{prop}",
            date_ranges=[DateRange(start_date=start.isoformat(), end_date=end.isoformat())],
            metrics=[Metric(name="sessions")],
            limit=1,
        )
        resp = client.run_report(req)
        sess = resp.rows[0].metric_values[0].value if resp.rows else "0"
        rec("GA4", "ok", "yes", "", f"property={prop}; sessions_last3d={sess}")
    except Exception as e:
        rec("GA4", "error", "no", type(e).__name__, str(e)[:300])


# --------------------------------------------------------------------------
# DataForSEO (free user_data ping — no spend)
# --------------------------------------------------------------------------
def check_dataforseo():
    try:
        sys.path.insert(0, str(INTEG))
        from dataforseo.client import DataForSEOClient
        c = DataForSEOClient(timeout=30)
        data = c.user_data()
        tasks = data.get("tasks", [])
        info = tasks[0].get("result", [{}])[0] if tasks else {}
        limits = info.get("rates", {}).get("limits", {}) if isinstance(info, dict) else {}
        rec("DataForSEO", "ok", "yes (spend-bearing for SERP)", "",
            f"status_code={data.get('status_code')}; login_ok=yes")
    except SystemExit as e:
        rec("DataForSEO", "no_creds", "no", "login/password missing in env", str(e)[:120])
    except Exception as e:
        rec("DataForSEO", "error", "no", type(e).__name__, str(e)[:300])


# --------------------------------------------------------------------------
# GBP
# --------------------------------------------------------------------------
def check_gbp():
    try:
        acct = os.environ.get("GBP_ACCOUNT_ID", "").strip()
        loc = os.environ.get("GBP_LOCATION_ID", "").strip()
        token_path = Path(r"D:\projects\bmklus\google\gbp_token.json")
        if not acct or not loc:
            return rec("GBP", "no_config", "no", "GBP_ACCOUNT_ID/LOCATION_ID empty", "")
        if not token_path.is_file():
            return rec("GBP", "no_token", "no", "gbp_token.json missing", str(token_path))
        from google.oauth2.credentials import Credentials
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
        creds = Credentials.from_authorized_user_file(
            str(token_path), ["https://www.googleapis.com/auth/business.manage"])
        if not creds.valid:
            if creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                return rec("GBP", "invalid_no_refresh", "no",
                           "token invalid and not refreshable (manual re-auth)", "")
        service = build("businessprofileperformance", "v1", credentials=creds,
                        cache_discovery=False)
        end = date.today() - timedelta(days=2)
        start = end - timedelta(days=2)
        resp = service.locations().fetchMultiDailyMetricsTimeSeries(
            location=f"locations/{loc}",
            dailyMetrics=["WEBSITE_CLICKS"],
            dailyRange_startDate_year=start.year, dailyRange_startDate_month=start.month,
            dailyRange_startDate_day=start.day,
            dailyRange_endDate_year=end.year, dailyRange_endDate_month=end.month,
            dailyRange_endDate_day=end.day,
        ).execute()
        ok = "multiDailyMetricTimeSeries" in resp or "dailyMetricTimeSeries" in resp or resp == {}
        rec("GBP", "ok", "yes", "", f"location={loc}; api_response_keys={list(resp.keys())}")
    except Exception as e:
        msg = str(e)
        et = "permission_denied" if "403" in msg else ("not_found" if "404" in msg else type(e).__name__)
        rec("GBP", "error", "no", et, msg[:300])


def main():
    load_env()
    check_gsc()
    check_ga4()
    check_dataforseo()
    check_gbp()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "today": date.today().isoformat(),
        "results": results,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    print("\n=== PREFLIGHT STATUS (live ping) ===")
    print(f"{'SOURCE':<12} {'AUTH':<18} {'CAN_PULL':<26} BLOCKER")
    for r in results:
        print(f"{r['source']:<12} {r['auth_status']:<18} {r['can_pull']:<26} {r['blocker']}")
    print("\n--- detail ---")
    for r in results:
        print(f"{r['source']}: {r['detail']}")
    print(f"\nsaved -> {OUT}")


if __name__ == "__main__":
    main()
