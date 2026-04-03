"""
CLI: run a combined GSC + GA4 read-only snapshot.

Prints a human-readable summary to stdout and saves the full
snapshot as JSON to seo-ops/data/processed/latest_combined_snapshot.json.

Usage:
    python run_combined_snapshot.py
"""

import json
import sys
from datetime import datetime
from pathlib import Path

# Allow running from the integrations/ directory
sys.path.insert(0, str(Path(__file__).resolve().parent))

from google_clients.combined_snapshot import collect_snapshot


def _print_section(title: str, data: dict, max_rows: int = 5) -> None:
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

    if "error" in data:
        print(f"  ERROR: {data['error']}")
        return

    dr = data.get("date_range", {})
    if dr:
        print(f"  Period: {dr.get('start', '?')} -> {dr.get('end', '?')}")

    # Also show comparison ranges if present
    for rkey in ("current_range", "previous_range"):
        r = data.get(rkey)
        if r:
            label = rkey.replace("_", " ").title()
            print(f"  {label}: {r.get('start', '?')} -> {r.get('end', '?')}")

    row_count = data.get("row_count", 0)
    print(f"  Rows: {row_count}")

    rows = data.get("rows", [])
    if not rows:
        return

    print()
    for row in rows[:max_rows]:
        # Determine display key
        keys = row.get("keys")
        page = row.get("page")
        if keys:
            label = keys[0] if len(keys) == 1 else " | ".join(keys)
        elif page:
            label = page
        else:
            # GA4 rows — show all dimension values
            label = " | ".join(
                f"{k}={v}"
                for k, v in row.items()
                if k not in ("clicks", "impressions", "ctr", "position",
                             "sessions", "engagedSessions", "engagementRate",
                             "eventCount", "current", "previous",
                             "delta_clicks", "delta_impressions", "delta_position")
            )

        # Determine metric display
        metrics = []
        for mkey in ("clicks", "impressions", "ctr", "position",
                     "sessions", "engagedSessions", "engagementRate",
                     "eventCount"):
            if mkey in row:
                metrics.append(f"{mkey}={row[mkey]}")

        # Comparison rows
        if "current" in row:
            c = row["current"]
            dc = row.get("delta_clicks", 0)
            di = row.get("delta_impressions", 0)
            metrics = [
                f"clicks={c['clicks']} ({dc:+d})",
                f"impr={c['impressions']} ({di:+d})",
                f"pos={c['position']}",
            ]

        metric_str = "  ".join(metrics)
        print(f"    {label}")
        if metric_str:
            print(f"      {metric_str}")

    if len(rows) > max_rows:
        print(f"    ... and {len(rows) - max_rows} more rows")


def main() -> int:
    print("Collecting combined snapshot (GSC + GA4)...")

    try:
        snapshot = collect_snapshot()
    except SystemExit:
        return 1
    except Exception as e:
        print(f"FAIL: {e}", file=sys.stderr)
        return 1

    # --- Console summary ---
    print(f"\nSite: {snapshot.get('site')}")
    print(f"GA4 Property: {snapshot.get('ga4_property')}")

    section_titles = {
        "gsc_top_pages": "GSC — Top Pages (28d)",
        "gsc_top_queries": "GSC — Top Queries (28d)",
        "gsc_page_comparison": "GSC — Page Comparison (28d vs prev 28d)",
        "ga4_landing_pages": "GA4 — Landing Pages (28d)",
        "ga4_key_events_by_page": "GA4 — Key Events by Landing Page (28d)",
        "ga4_traffic_acquisition": "GA4 — Traffic Acquisition (28d)",
        "ga4_daily_sessions": "GA4 — Daily Sessions (28d)",
    }

    errors = 0
    for key, title in section_titles.items():
        data = snapshot.get(key, {})
        _print_section(title, data)
        if "error" in data:
            errors += 1

    # --- Save JSON ---
    out_dir = Path(__file__).resolve().parent.parent / "data" / "processed"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "latest_combined_snapshot.json"

    snapshot["_generated_at"] = datetime.utcnow().isoformat() + "Z"
    out_file.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False))

    print(f"\n{'='*60}")
    print(f"  Snapshot saved to: {out_file}")
    if errors:
        print(f"  WARNING: {errors} section(s) had errors — check above")
    else:
        print(f"  All sections OK")
    print(f"{'='*60}")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
