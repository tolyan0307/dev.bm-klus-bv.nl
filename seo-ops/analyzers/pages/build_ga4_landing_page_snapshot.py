"""
build_ga4_landing_page_snapshot.py — Build normalized GA4 landing-page snapshot.

Pulls data via landing_page_loader, normalizes, maps to page_inventory, outputs:
  - ga4_landing_pages_last{N}d_raw.json
  - ga4_landing_pages_last{N}d.csv (aggregated by page)
  - ga4_landing_pages_by_channel_last{N}d.csv (page x channel)
  - ga4_landing_pages_last{N}d.md (summary)

Usage:
  python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py           # default 90d
  python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py --days 28 # recent 28d

Must run with integrations/.venv Python (has google-analytics-data).
"""

from __future__ import annotations

import csv
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.ga4.landing_page_loader import (
    pull_landing_pages_by_channel,
    pull_key_events_by_landing_page,
)
from integrations.site.page_inventory_loader import load_page_inventory


# ── Output paths ─────────────────────────────────────────────────────────────

RAW_DIR = SEO_OPS_ROOT / "snapshots" / "raw" / "ga4"
NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "pages"


def _output_paths(days: int) -> dict[str, Path]:
    """Return output paths keyed by role, parameterized by window size."""
    tag = f"last{days}d"
    return {
        "raw_json":    RAW_DIR / f"ga4_landing_pages_{tag}_raw.json",
        "agg_csv":     NORM_DIR / f"ga4_landing_pages_{tag}.csv",
        "channel_csv": NORM_DIR / f"ga4_landing_pages_by_channel_{tag}.csv",
        "summary_md":  REPORT_DIR / f"ga4_landing_pages_{tag}.md",
    }


# Legacy constants kept for backwards-compat imports
RAW_JSON = RAW_DIR / "ga4_landing_pages_last90d_raw.json"
AGG_CSV = NORM_DIR / "ga4_landing_pages_last90d.csv"
CHANNEL_CSV = NORM_DIR / "ga4_landing_pages_by_channel_last90d.csv"
SUMMARY_MD = REPORT_DIR / "ga4_landing_pages_last90d.md"


# ── Normalization ────────────────────────────────────────────────────────────

def normalize_path(raw: str) -> str:
    """Normalize GA4 landing page path: strip query strings, ensure trailing slash."""
    # GA4 returns paths like /foo?bar or /foo or (not set)
    if not raw or raw == "(not set)":
        return "(not set)"
    path = raw.split("?")[0].split("#")[0]
    if not path.startswith("/"):
        path = "/" + path
    if not path.endswith("/") and "." not in path.split("/")[-1]:
        path += "/"
    return path


def _safe_int(val, default: int = 0) -> int:
    try:
        return int(float(val)) if val else default
    except (ValueError, TypeError):
        return default


def _safe_float(val, default: float = 0.0) -> float:
    try:
        return float(val) if val else default
    except (ValueError, TypeError):
        return default


# ── Page mapping ─────────────────────────────────────────────────────────────

def build_route_map(pages: list[dict]) -> dict[str, dict]:
    return {p["route_path"]: p for p in pages if p.get("route_path")}


def map_ga4_page(norm_path: str, route_map: dict[str, dict]) -> tuple[str, str]:
    """Map normalized path to (route_guess, page_type_guess)."""
    if norm_path == "(not set)":
        return "", ""
    if norm_path in route_map:
        p = route_map[norm_path]
        return norm_path, p.get("page_type", "")
    # Try with trailing slash
    with_slash = norm_path.rstrip("/") + "/"
    if with_slash in route_map:
        p = route_map[with_slash]
        return with_slash, p.get("page_type", "")
    return "", ""


# ── Aggregate by page ────────────────────────────────────────────────────────

def build_page_aggregate(
    channel_rows: list[dict],
    key_events_map: dict[str, int],
    route_map: dict[str, dict],
) -> list[dict]:
    """Aggregate channel rows into per-page totals."""
    agg: dict[str, dict] = {}

    for row in channel_rows:
        raw = row.get("landingPagePlusQueryString", "")
        norm = normalize_path(raw)
        sessions = _safe_int(row.get("sessions"))
        engaged = _safe_int(row.get("engagedSessions"))
        duration = _safe_float(row.get("averageSessionDuration"))

        if norm not in agg:
            agg[norm] = {
                "landing_page_raw": raw,
                "normalized_path": norm,
                "sessions": 0,
                "engaged_sessions": 0,
                "_duration_weighted": 0.0,
            }
        a = agg[norm]
        a["sessions"] += sessions
        a["engaged_sessions"] += engaged
        a["_duration_weighted"] += duration * sessions

    result = []
    for norm, a in agg.items():
        sessions = a["sessions"]
        engaged = a["engaged_sessions"]
        eng_rate = round(engaged / sessions, 4) if sessions > 0 else 0.0
        avg_dur = round(a["_duration_weighted"] / sessions, 1) if sessions > 0 else 0.0
        route, page_type = map_ga4_page(norm, route_map)
        key_events = key_events_map.get(norm, 0)

        notes_parts = []
        if norm == "(not set)":
            notes_parts.append("GA4 (not set) landing page")
        elif not route:
            notes_parts.append("unmapped: not in page_inventory")

        result.append({
            "landing_page_raw": a["landing_page_raw"],
            "normalized_path": norm,
            "mapped_route_guess": route,
            "mapped_page_type_guess": page_type,
            "sessions": sessions,
            "engaged_sessions": engaged,
            "engagement_rate": eng_rate,
            "avg_session_duration_seconds": avg_dur,
            "key_events": key_events,
            "notes": "; ".join(notes_parts),
        })

    result.sort(key=lambda x: x["sessions"], reverse=True)
    return result


# ── Channel-level table ──────────────────────────────────────────────────────

def build_channel_table(
    channel_rows: list[dict],
    route_map: dict[str, dict],
) -> list[dict]:
    result = []
    for row in channel_rows:
        raw = row.get("landingPagePlusQueryString", "")
        norm = normalize_path(raw)
        channel = row.get("sessionDefaultChannelGroup", "")
        sessions = _safe_int(row.get("sessions"))
        engaged = _safe_int(row.get("engagedSessions"))
        eng_rate = _safe_float(row.get("engagementRate"))
        avg_dur = _safe_float(row.get("averageSessionDuration"))
        route, page_type = map_ga4_page(norm, route_map)

        result.append({
            "landing_page_raw": raw,
            "normalized_path": norm,
            "session_default_channel_group": channel,
            "sessions": sessions,
            "engaged_sessions": engaged,
            "engagement_rate": round(eng_rate, 4),
            "avg_session_duration_seconds": round(avg_dur, 1),
            "mapped_route_guess": route,
            "mapped_page_type_guess": page_type,
        })

    result.sort(key=lambda x: (x["normalized_path"], -x["sessions"]))
    return result


# ── Key events aggregation ───────────────────────────────────────────────────

def aggregate_key_events(ke_rows: list[dict]) -> dict[str, int]:
    """Aggregate key events by normalized landing page path."""
    result: dict[str, int] = defaultdict(int)
    for row in ke_rows:
        raw = row.get("landingPagePlusQueryString", "")
        norm = normalize_path(raw)
        count = _safe_int(row.get("eventCount"))
        result[norm] += count
    return dict(result)


# ── Writers ──────────────────────────────────────────────────────────────────

def write_json(data: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=str), encoding="utf-8")


def write_csv_file(rows: list[dict], path: Path) -> None:
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def write_summary(
    raw_data: dict,
    page_agg: list[dict],
    channel_table: list[dict],
    path: Path,
) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    dr = raw_data.get("date_range", {})

    mapped = [p for p in page_agg if p.get("mapped_route_guess")]
    unmapped = [p for p in page_agg if not p.get("mapped_route_guess")]
    not_set = [p for p in page_agg if p.get("normalized_path") == "(not set)"]

    total_sessions = sum(p["sessions"] for p in page_agg)
    total_key_events = sum(p.get("key_events", 0) for p in page_agg)

    # Channel summary
    from collections import Counter
    channel_sessions: dict[str, int] = Counter()
    for row in channel_table:
        channel_sessions[row.get("session_default_channel_group", "")] += row.get("sessions", 0)

    # Weak engagement: sessions >= 5 but engagement_rate < 0.3
    weak_engagement = [
        p for p in page_agg
        if p["sessions"] >= 5 and p["engagement_rate"] < 0.3
        and p.get("normalized_path") != "(not set)"
    ]
    weak_engagement.sort(key=lambda x: x["sessions"], reverse=True)

    # Paid landing pages
    paid_rows = [
        r for r in channel_table
        if r.get("session_default_channel_group", "").lower() in ("paid search", "paid social", "display")
    ]
    # Aggregate paid by page
    paid_by_page: dict[str, int] = Counter()
    for r in paid_rows:
        paid_by_page[r["normalized_path"]] += r.get("sessions", 0)

    # Organic landing pages
    organic_rows = [
        r for r in channel_table
        if r.get("session_default_channel_group", "").lower() == "organic search"
    ]
    organic_by_page: dict[str, int] = Counter()
    for r in organic_rows:
        organic_by_page[r["normalized_path"]] += r.get("sessions", 0)

    lines = [
        "# GA4 Landing Page Snapshot (last 90 days)",
        "",
        f"**Generated:** {now}",
        f"**Date range:** {dr.get('start', '?')} to {dr.get('end', '?')}",
        f"**Property:** {raw_data.get('property_id', '?')}",
        "",
        "---",
        "",
        "## Overview",
        "",
        "| Metric | Count |",
        "|--------|-------|",
        f"| Total landing pages | {len(page_agg)} |",
        f"| Mapped to page_inventory | {len(mapped)} |",
        f"| Unmapped | {len(unmapped)} |",
        f"| (not set) pages | {len(not_set)} |",
        f"| Total sessions | {total_sessions} |",
        f"| Total key events | {total_key_events} |",
        "",
        "---",
        "",
        "## Channel summary",
        "",
        "| Channel | Sessions |",
        "|---------|----------|",
    ]
    for ch, sess in sorted(channel_sessions.items(), key=lambda x: -x[1]):
        lines.append(f"| {ch} | {sess} |")

    lines += [
        "",
        "---",
        "",
        "## Top landing pages by sessions",
        "",
        "| Page | Sessions | Engaged | Eng Rate | Avg Dur (s) | Key Events | Type |",
        "|------|----------|---------|----------|-------------|------------|------|",
    ]
    for p in page_agg[:20]:
        lines.append(
            f"| {p['mapped_route_guess'] or p['normalized_path']} "
            f"| {p['sessions']} | {p['engaged_sessions']} "
            f"| {p['engagement_rate']:.2f} | {p['avg_session_duration_seconds']:.0f} "
            f"| {p.get('key_events', 0)} | {p['mapped_page_type_guess']} |"
        )

    if paid_by_page:
        lines += [
            "",
            "## Top paid landing pages",
            "",
            "| Page | Paid Sessions |",
            "|------|--------------|",
        ]
        for page, sess in sorted(paid_by_page.items(), key=lambda x: -x[1])[:15]:
            lines.append(f"| {page} | {sess} |")

    if organic_by_page:
        lines += [
            "",
            "## Top organic search landing pages",
            "",
            "| Page | Organic Sessions |",
            "|------|-----------------|",
        ]
        for page, sess in sorted(organic_by_page.items(), key=lambda x: -x[1])[:15]:
            lines.append(f"| {page} | {sess} |")

    lines += [
        "",
        "---",
        "",
        f"## Weak engagement pages ({len(weak_engagement)} pages with sessions >= 5, engagement < 30%)",
        "",
    ]
    if weak_engagement:
        lines.append("| Page | Sessions | Eng Rate | Avg Dur (s) | Type | Notes |")
        lines.append("|------|----------|----------|-------------|------|-------|")
        for p in weak_engagement[:15]:
            lines.append(
                f"| {p['mapped_route_guess'] or p['normalized_path']} "
                f"| {p['sessions']} | {p['engagement_rate']:.2f} "
                f"| {p['avg_session_duration_seconds']:.0f} "
                f"| {p['mapped_page_type_guess']} | {p.get('notes', '')} |"
            )
    else:
        lines.append("No weak-engagement pages detected.")

    if unmapped:
        unmapped_with_sessions = [p for p in unmapped if p["sessions"] > 0 and p["normalized_path"] != "(not set)"]
        unmapped_with_sessions.sort(key=lambda x: x["sessions"], reverse=True)
        lines += [
            "",
            f"## Unmapped / legacy landing pages ({len(unmapped_with_sessions)} pages with sessions > 0)",
            "",
        ]
        if unmapped_with_sessions:
            lines.append("| Page | Sessions | Eng Rate | Notes |")
            lines.append("|------|----------|----------|-------|")
            for p in unmapped_with_sessions[:20]:
                lines.append(
                    f"| {p['normalized_path']} | {p['sessions']} "
                    f"| {p['engagement_rate']:.2f} | {p.get('notes', '')} |"
                )

    lines += [
        "",
        "---",
        "",
        "## Limitations (v1)",
        "",
        "1. **No sessionSourceMedium split** -- only sessionDefaultChannelGroup used for simplicity",
        "2. **Key events pulled separately** and merged by landing page; some attribution mismatch possible",
        "3. **averageSessionDuration** is session-weighted in aggregation; may not match GA4 UI exactly",
        "4. **Query string stripped** during normalization; pages with different query params merged",
        "5. **(not set) pages** represent sessions where GA4 could not determine the landing page",
        "6. **No user-level metrics** (new users, returning users)",
        "7. **No bounce rate** -- GA4 uses engagement rate instead",
        "8. **Page mapping** based on page_inventory v1; legacy/redirected URLs may not map",
        "",
        "---",
        "",
        "## Output files",
        "",
        "| File | Path |",
        "|------|------|",
        "| Raw JSON | `seo-ops/snapshots/raw/ga4/ga4_landing_pages_last90d_raw.json` |",
        "| Page aggregate CSV | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv` |",
        "| By channel CSV | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv` |",
        "| Summary (this file) | `seo-ops/reports/pages/ga4_landing_pages_last90d.md` |",
    ]

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(description="Build GA4 landing page snapshot")
    parser.add_argument("--days", type=int, default=90,
                        help="Window size in days (default: 90, recommended recent: 28)")
    args = parser.parse_args()
    days = args.days

    paths = _output_paths(days)
    print(f"Building GA4 landing page snapshot (last {days} days)...")

    # 1. Pull channel data
    print("  Pulling landing pages by channel from GA4...")
    raw_channel = pull_landing_pages_by_channel(days=days)
    print(f"  Pulled {raw_channel['total_rows']} page+channel rows")
    print(f"  Date range: {raw_channel['date_range']['start']} to {raw_channel['date_range']['end']}")

    # 2. Pull key events
    print("  Pulling key events by landing page...")
    raw_events = pull_key_events_by_landing_page(days=days)
    print(f"  Pulled {raw_events['total_rows']} key event rows")

    # 3. Save raw JSON
    raw_combined = {
        "property_id": raw_channel.get("property_id", ""),
        "date_range": raw_channel.get("date_range", {}),
        "channel_data": raw_channel,
        "key_events_data": raw_events,
    }
    write_json(raw_combined, paths["raw_json"])
    print(f"  Raw JSON -> {paths['raw_json']}")

    # 4. Load page inventory
    pages = load_page_inventory()
    route_map = build_route_map(pages)
    print(f"  Page inventory: {len(pages)} pages loaded")

    # 5. Aggregate key events
    key_events_map = aggregate_key_events(raw_events["rows"])
    print(f"  Key events aggregated for {len(key_events_map)} landing pages")

    # 6. Build page aggregate
    page_agg = build_page_aggregate(raw_channel["rows"], key_events_map, route_map)
    write_csv_file(page_agg, paths["agg_csv"])
    print(f"  Page aggregate CSV -> {paths['agg_csv']} ({len(page_agg)} pages)")

    # 7. Build channel table
    channel_table = build_channel_table(raw_channel["rows"], route_map)
    write_csv_file(channel_table, paths["channel_csv"])
    print(f"  Channel CSV -> {paths['channel_csv']} ({len(channel_table)} rows)")

    # 8. Write summary
    write_summary(raw_combined, page_agg, channel_table, paths["summary_md"])
    print(f"  Summary -> {paths['summary_md']}")

    # Quick stats
    total_sessions = sum(p["sessions"] for p in page_agg)
    mapped_count = sum(1 for p in page_agg if p.get("mapped_route_guess"))
    unmapped_count = len(page_agg) - mapped_count
    total_key_events = sum(p.get("key_events", 0) for p in page_agg)
    print(f"\n  Total landing pages: {len(page_agg)}")
    print(f"  Mapped: {mapped_count}, Unmapped: {unmapped_count}")
    print(f"  Total sessions: {total_sessions}")
    print(f"  Total key events: {total_key_events}")
    print(f"\n  Done.")


if __name__ == "__main__":
    main()
