"""
build_wp_snapshot.py — Build normalized snapshot from the BM Stats v2 WordPress plugin.

Source of truth for leads (with owner-set status) and cookieless server-side
pageviews / CTA clicks. Pulls via integrations/wp/stats_loader.py and writes:

  snapshots/raw/wp/wp_stats_last{N}d_raw.json
  snapshots/normalized/wp/wp_leads_last{N}d.csv             one lead per row, no personal data
  snapshots/normalized/wp/wp_leads_daily_last{N}d.csv       per day: totals by status and source
  snapshots/normalized/wp/wp_pageviews_daily_last{N}d.csv   per day: views, cta, lead events
  snapshots/normalized/wp/wp_pageviews_by_path_last{N}d.csv per page, mapped to page_inventory
  snapshots/normalized/wp/wp_traffic_by_source_last{N}d.csv
  snapshots/normalized/wp/wp_cta_last{N}d.csv
  snapshots/normalized/wp/wp_stats_last{N}d_meta.json       window, generated_at, source
  reports/pages/wp_stats_last{N}d.md                        human summary

Usage:
  python seo-ops/analyzers/pages/build_wp_snapshot.py            # 90d
  python seo-ops/analyzers/pages/build_wp_snapshot.py --days 28

Needs BMKLUS_WP_STATS_TOKEN in integrations/.env.local. Run with integrations/.venv Python.

Important: pageview / CTA events exist only from 2026-09-04 (v2 install date on PROD).
Lead rows exist from 2026-03-11 (backfilled from the WP lead records).
"""

from __future__ import annotations

import csv
import json
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.wp.stats_loader import pull_wp_window  # noqa: E402
from integrations.site.page_inventory_loader import load_page_inventory  # noqa: E402

RAW_DIR = SEO_OPS_ROOT / "snapshots" / "raw" / "wp"
NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "wp"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "pages"

EVENTS_SINCE = "2026-09-04"   # first day with pageview / cta events on PROD
LEADS_SINCE = "2026-03-11"    # earliest lead record in WP

STATUSES = ["new", "qualified", "won", "lost", "spam"]
SOURCES = ["ads", "campaign", "organic", "referral", "direct"]


def _output_paths(days: int) -> dict[str, Path]:
    tag = f"last{days}d"
    return {
        "raw_json":     RAW_DIR / f"wp_stats_{tag}_raw.json",
        "leads_csv":    NORM_DIR / f"wp_leads_{tag}.csv",
        "leads_daily":  NORM_DIR / f"wp_leads_daily_{tag}.csv",
        "pv_daily":     NORM_DIR / f"wp_pageviews_daily_{tag}.csv",
        "pv_path":      NORM_DIR / f"wp_pageviews_by_path_{tag}.csv",
        "sources_csv":  NORM_DIR / f"wp_traffic_by_source_{tag}.csv",
        "cta_csv":      NORM_DIR / f"wp_cta_{tag}.csv",
        "meta_json":    NORM_DIR / f"wp_stats_{tag}_meta.json",
        "summary_md":   REPORT_DIR / f"wp_stats_{tag}.md",
    }


# ── Helpers ──────────────────────────────────────────────────────────────────

def write_json(data, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=str), encoding="utf-8")


def write_csv_file(rows: list[dict], path: Path, fieldnames: list[str] | None = None) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not rows:
        path.write_text(",".join(fieldnames or []) + "\n", encoding="utf-8")
        return
    fieldnames = fieldnames or list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)


def build_route_map(pages: list[dict]) -> dict[str, dict]:
    return {p["route_path"]: p for p in pages if p.get("route_path")}


def map_route(path: str, route_map: dict[str, dict]) -> tuple[str, str]:
    if path in route_map:
        return path, route_map[path].get("page_type", "")
    alt = path.rstrip("/") + "/"
    if alt in route_map:
        return alt, route_map[alt].get("page_type", "")
    return "", ""


# ── Tables ───────────────────────────────────────────────────────────────────

def build_leads_table(leads: list[dict], route_map: dict) -> list[dict]:
    out = []
    for l in leads:
        created = l.get("created_at") or ""
        d, _, t = created.partition(" ")
        route, ptype = map_route(l.get("page_path") or "", route_map)
        out.append({
            "id": l["id"],
            "date": d,
            "time": t[:5],
            "status": l.get("status") or "",
            "source": l.get("source") or "",
            "form_variant": l.get("form_variant") or "",
            "service": l.get("service") or "",
            "city": l.get("city") or "",
            "page_path": l.get("page_path") or "",
            "mapped_route_guess": route,
            "mapped_page_type_guess": ptype,
            "landing_path": l.get("landing_path") or "",
            "referrer_host": l.get("referrer_host") or "",
            "utm_source": l.get("utm_source") or "",
            "utm_medium": l.get("utm_medium") or "",
            "utm_campaign": l.get("utm_campaign") or "",
            "has_gclid": 1 if l.get("gclid") else 0,
            "turnstile_ok": 1 if l.get("turnstile_ok") else 0,
            "order_value": l.get("order_value") if l.get("order_value") is not None else "",
            "backfilled": 1 if l.get("backfilled") else 0,
        })
    out.sort(key=lambda r: (r["date"], r["time"]))
    return out


def build_leads_daily(leads_table: list[dict], start: str, end: str) -> list[dict]:
    by_day: dict[str, Counter] = defaultdict(Counter)
    for l in leads_table:
        c = by_day[l["date"]]
        c["leads_total"] += 1
        st = l["status"] or "none"
        c[f"status_{st}"] += 1
        if st != "spam":
            c["leads_real"] += 1
        src = l["source"] or "unknown"
        c[f"source_{src}"] += 1
        if l["has_gclid"]:
            c["with_gclid"] += 1
    rows = []
    d0 = datetime.fromisoformat(start).date()
    d1 = datetime.fromisoformat(end).date()
    cur = d0
    while cur <= d1:
        k = cur.isoformat()
        c = by_day.get(k, Counter())
        row = {"date": k, "leads_total": c["leads_total"], "leads_real": c["leads_real"]}
        for st in STATUSES + ["none"]:
            row[f"status_{st}"] = c[f"status_{st}"]
        for src in SOURCES + ["unknown"]:
            row[f"source_{src}"] = c[f"source_{src}"]
        row["with_gclid"] = c["with_gclid"]
        rows.append(row)
        cur = cur.fromordinal(cur.toordinal() + 1)
    return rows


def build_pv_daily(pv_day: dict) -> list[dict]:
    rows = []
    for r in pv_day.get("rows", []):
        rows.append({
            "date": r["date"],
            "views": r.get("views", 0),
            "cta_clicks": r.get("cta", 0),
            "lead_events": r.get("leads", 0),
            "events_available": 1 if r["date"] >= EVENTS_SINCE else 0,
        })
    return rows


def build_pv_path(pv_path: dict, route_map: dict, mixed_window: bool = False) -> list[dict]:
    """mixed_window=True when the window starts before EVENTS_SINCE: lead events cover the whole
    window but views only part of it, so a conversion rate would be meaningless and is left empty."""
    rows = []
    for r in pv_path.get("rows", []):
        route, ptype = map_route(r["path"], route_map)
        views = r.get("views", 0)
        leads = r.get("leads", 0)
        notes = [] if route else ["unmapped: not in page_inventory"]
        if mixed_window:
            notes.append(f"views only since {EVENTS_SINCE}, lead events whole window")
        rows.append({
            "path": r["path"],
            "mapped_route_guess": route,
            "mapped_page_type_guess": ptype,
            "views": views,
            "cta_clicks": r.get("cta", 0),
            "lead_events": leads,
            "conversion_rate": "" if mixed_window else (round(leads / views, 4) if views else 0.0),
            "notes": "; ".join(notes),
        })
    rows.sort(key=lambda x: -x["views"])
    return rows


def build_sources(pv_source: dict) -> list[dict]:
    rows = []
    for r in pv_source.get("rows", []):
        rows.append({"level": "source", "source": r["source"], "utm_source": "", "utm_medium": "", "utm_campaign_or_host": "",
                     "views": r.get("views", 0), "cta_clicks": r.get("cta", 0), "lead_events": r.get("leads", 0)})
    for c in pv_source.get("campaigns", []) or []:
        rows.append({"level": "campaign", "source": c["source"], "utm_source": c.get("utm_source", ""), "utm_medium": c.get("utm_medium", ""),
                     "utm_campaign_or_host": c.get("utm_campaign", ""), "views": c.get("views", 0), "cta_clicks": c.get("cta", 0), "lead_events": c.get("leads", 0)})
    for h in pv_source.get("referrers", []) or []:
        rows.append({"level": "referrer_host", "source": h["source"], "utm_source": "", "utm_medium": "",
                     "utm_campaign_or_host": h.get("host", ""), "views": h.get("views", 0), "cta_clicks": h.get("cta", 0), "lead_events": h.get("leads", 0)})
    return rows


def build_cta(events_day: dict) -> list[dict]:
    cta = events_day.get("cta", {}) or {}
    return [{"cta": k, "clicks": v} for k, v in sorted(cta.items(), key=lambda x: -x[1])]


# ── Summary ──────────────────────────────────────────────────────────────────

def write_summary(raw: dict, leads_table: list[dict], pv_daily: list[dict], pv_path: list[dict], sources: list[dict], cta: list[dict], path: Path, days: int) -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    dr = raw["date_range"]
    tag = f"{days}d"

    status_c = Counter((l["status"] or "none") for l in leads_table)
    source_c = Counter((l["source"] or "unknown") for l in leads_table)
    form_c = Counter(l["form_variant"] for l in leads_table)
    real = sum(1 for l in leads_table if l["status"] != "spam")
    qualified = sum(1 for l in leads_table if l["status"] in ("qualified", "won", "lost"))
    won = status_c.get("won", 0)
    revenue = sum(float(l["order_value"]) for l in leads_table if l["order_value"] not in ("", None) and l["status"] == "won")
    views_total = sum(r["views"] for r in pv_daily)
    cta_total = sum(r["cta_clicks"] for r in pv_daily)
    event_days = [r for r in pv_daily if r["events_available"]]
    antispam = (raw.get("events_day", {}).get("antispam") or {}).get("by_reason", {}) or {}

    lines = [
        f"# WP Stats Snapshot (last {days} days)",
        "",
        f"**Generated:** {now}",
        f"**Date range:** {dr['start']} to {dr['end']}",
        f"**Source:** BM Stats v2 plugin, {raw.get('base_url', '')} (provenance label: `[WP, {tag}, lead-level]` / `[WP, {tag}, event-level]`)",
        f"**Plugin version:** {raw.get('summary', {}).get('plugin_version', '?')}",
        "",
        "> Pageview and CTA events exist only from "
        f"{EVENTS_SINCE} ({len(event_days)} of {len(pv_daily)} days in window). Lead rows exist from {LEADS_SINCE}.",
        "",
        "---",
        "",
        "## Leads",
        "",
        "| Metric | Value |",
        "|--------|-------|",
        f"| Leads total | {len(leads_table)} |",
        f"| Leads excl. spam | {real} |",
        f"| Qualified (qualified + won + lost) | {qualified} |",
        f"| Won | {won} |",
        f"| Revenue on won (order_value) | € {revenue:,.0f} |",
        f"| With gclid | {sum(l['has_gclid'] for l in leads_table)} |",
        "",
        "### By status",
        "",
        "| Status | Leads |",
        "|--------|-------|",
    ]
    for st in STATUSES + ["none"]:
        if status_c.get(st):
            lines.append(f"| {st} | {status_c[st]} |")
    lines += ["", "### By source (first touch)", "", "| Source | Leads |", "|--------|-------|"]
    for src in SOURCES + ["unknown"]:
        if source_c.get(src):
            lines.append(f"| {src} | {source_c[src]} |")
    lines += ["", "### By form", "", "| Form | Leads |", "|------|-------|"]
    for f_, n in form_c.most_common():
        lines.append(f"| {f_ or 'other'} | {n} |")

    lines += [
        "",
        "---",
        "",
        f"## Traffic (events available since {EVENTS_SINCE})",
        "",
        "| Metric | Value |",
        "|--------|-------|",
        f"| Page views | {views_total} |",
        f"| CTA clicks | {cta_total} |",
        f"| Days with events | {len(event_days)} |",
        "",
        "### Top pages by views" + (" (conversion shown as — : views start later than lead events in this window)" if dr["start"] < EVENTS_SINCE else ""),
        "",
        "| Page | Views | CTA | Lead events | Conv. | Type |",
        "|------|-------|-----|-------------|-------|------|",
    ]
    for r in pv_path[:20]:
        conv = f"{r['conversion_rate']:.2%}" if r['conversion_rate'] != "" else "—"
        lines.append(f"| {r['path']} | {r['views']} | {r['cta_clicks']} | {r['lead_events']} | {conv} | {r['mapped_page_type_guess']} |")

    lines += ["", "### Traffic by source", "", "| Source | Views | CTA | Lead events |", "|--------|-------|-----|-------------|"]
    for r in sources:
        if r["level"] == "source":
            lines.append(f"| {r['source']} | {r['views']} | {r['cta_clicks']} | {r['lead_events']} |")

    if cta:
        lines += ["", "### CTA clicks", "", "| CTA | Clicks |", "|-----|--------|"]
        for r in cta:
            lines.append(f"| {r['cta']} | {r['clicks']} |")

    if antispam:
        lines += ["", "### Form outcomes (anti-spam)", "", "| Outcome | Count |", "|---------|-------|"]
        for k, v in sorted(antispam.items(), key=lambda x: -x[1]):
            lines.append(f"| {k} | {v} |")

    lines += [
        "",
        "---",
        "",
        "## Limitations",
        "",
        f"1. Pageviews and CTA clicks are counted by a JS beacon from {EVENTS_SINCE}; earlier days are 0 by construction, not real zeros.",
        "2. Leads before 2026-09-04 were backfilled: source comes from the form page URL only (utm/gclid), no first-touch referrer, form variant unknown.",
        "3. Lead source is classified from first-touch UTM/gclid/referrer, not from GA4 channel grouping; the two are not expected to match 1:1.",
        "4. No cookies, no visitor identifier: unique visitors are not available (visitor hash disabled by owner decision).",
        "5. Statuses are set manually by the owner; `new` means not yet triaged, not necessarily a real lead.",
        "",
        "## Output files",
        "",
        "| File | Path |",
        "|------|------|",
        f"| Raw JSON | `seo-ops/snapshots/raw/wp/wp_stats_last{days}d_raw.json` |",
        f"| Leads CSV | `seo-ops/snapshots/normalized/wp/wp_leads_last{days}d.csv` |",
        f"| Leads daily CSV | `seo-ops/snapshots/normalized/wp/wp_leads_daily_last{days}d.csv` |",
        f"| Pageviews daily CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_daily_last{days}d.csv` |",
        f"| Pageviews by path CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_by_path_last{days}d.csv` |",
        f"| Traffic by source CSV | `seo-ops/snapshots/normalized/wp/wp_traffic_by_source_last{days}d.csv` |",
        f"| CTA CSV | `seo-ops/snapshots/normalized/wp/wp_cta_last{days}d.csv` |",
    ]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(description="Build WP Stats v2 snapshot")
    parser.add_argument("--days", type=int, default=90)
    args = parser.parse_args()
    days = args.days
    paths = _output_paths(days)

    print(f"Building WP stats snapshot (last {days} days)...")
    raw = pull_wp_window(days=days)
    dr = raw["date_range"]
    print(f"  Date range: {dr['start']} to {dr['end']}")
    print(f"  Leads: {raw['leads'].get('count', 0)}; pageview days: {len(raw['pageviews_day'].get('rows', []))}")

    write_json(raw, paths["raw_json"])
    print(f"  Raw JSON -> {paths['raw_json']}")

    route_map = build_route_map(load_page_inventory())

    leads_table = build_leads_table(raw["leads"].get("leads", []), route_map)
    write_csv_file(leads_table, paths["leads_csv"], fieldnames=[
        "id", "date", "time", "status", "source", "form_variant", "service", "city", "page_path", "mapped_route_guess",
        "mapped_page_type_guess", "landing_path", "referrer_host", "utm_source", "utm_medium", "utm_campaign", "has_gclid",
        "turnstile_ok", "order_value", "backfilled",
    ])
    print(f"  Leads CSV -> {paths['leads_csv']} ({len(leads_table)} rows)")

    leads_daily = build_leads_daily(leads_table, dr["start"], dr["end"])
    write_csv_file(leads_daily, paths["leads_daily"])

    pv_daily = build_pv_daily(raw["pageviews_day"])
    write_csv_file(pv_daily, paths["pv_daily"], fieldnames=["date", "views", "cta_clicks", "lead_events", "events_available"])

    pv_path = build_pv_path(raw["pageviews_path"], route_map, mixed_window=dr["start"] < EVENTS_SINCE)
    write_csv_file(pv_path, paths["pv_path"], fieldnames=["path", "mapped_route_guess", "mapped_page_type_guess", "views", "cta_clicks", "lead_events", "conversion_rate", "notes"])

    sources = build_sources(raw["pageviews_source"])
    write_csv_file(sources, paths["sources_csv"], fieldnames=["level", "source", "utm_source", "utm_medium", "utm_campaign_or_host", "views", "cta_clicks", "lead_events"])

    cta = build_cta(raw["events_day"])
    write_csv_file(cta, paths["cta_csv"], fieldnames=["cta", "clicks"])

    write_json({
        "_meta": {
            "source": "wp_stats_v2",
            "base_url": raw["base_url"],
            "window": dr,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "events_since": EVENTS_SINCE,
            "leads_since": LEADS_SINCE,
            "plugin_version": raw.get("summary", {}).get("plugin_version"),
            "leads_count": len(leads_table),
            "views_total": sum(r["views"] for r in pv_daily),
        }
    }, paths["meta_json"])

    write_summary(raw, leads_table, pv_daily, pv_path, sources, cta, paths["summary_md"], days)
    print(f"  Summary -> {paths['summary_md']}")
    print("  Done.")


if __name__ == "__main__":
    main()
