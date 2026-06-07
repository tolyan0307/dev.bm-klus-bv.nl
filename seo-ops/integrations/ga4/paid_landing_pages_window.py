"""
paid_landing_pages_window.py — GA4 paid landing page pull for a custom date window.

Read-only. Uses existing GA4 service account credentials via seo-ops/.env.local.

Produces one JSON file with four sections:
  1. landing_pages     — sessions, engaged sessions, engagement rate,
                         avg engagement time per session, key events per landing page
  2. session_campaigns — sessions + key events by session campaign name
                         (to check attribution reliability to "NL | Gevelisolatie | Search")
  3. key_events_by_lp  — Contact_Form_Site / Phone / Whatsapp counts per landing page
  4. daily_sessions    — daily sessions in the window (for sanity check vs Ads clicks)

Usage:
    python paid_landing_pages_window.py \
        --start 2026-03-15 --end 2026-04-23 \
        --source-medium "google / cpc" \
        --output seo-ops/outputs/ga4_paid_landing_pages_<window>.json
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # seo-ops/
ENV_LOCAL = ROOT / "integrations" / ".env.local"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

KEY_EVENT_NAMES = ["Contact_Form_Site", "Phone", "Whatsapp"]


def load_env_local() -> None:
    if not ENV_LOCAL.is_file():
        return
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def parse_args() -> argparse.Namespace:
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", required=True, help="YYYY-MM-DD inclusive")
    ap.add_argument("--end", required=True, help="YYYY-MM-DD inclusive")
    ap.add_argument(
        "--source-medium",
        default="google / cpc",
        help='GA4 sessionSourceMedium exact match (default: "google / cpc")',
    )
    ap.add_argument("--output", required=True, help="output JSON path")
    ap.add_argument("--limit", type=int, default=500, help="max rows per report")
    args = ap.parse_args()
    if not (DATE_RE.match(args.start) and DATE_RE.match(args.end)):
        raise SystemExit("FAIL: --start/--end must be YYYY-MM-DD")
    if args.start > args.end:
        raise SystemExit("FAIL: --start must be <= --end")
    return args


def main() -> int:
    args = parse_args()
    load_env_local()

    pid = os.environ.get("BMKLUS_GA4_PROPERTY_ID", "").strip()
    sa_json = os.environ.get("BMKLUS_GA4_SERVICE_ACCOUNT_JSON", "").strip()
    if not pid or not sa_json:
        print("FAIL: BMKLUS_GA4_PROPERTY_ID / BMKLUS_GA4_SERVICE_ACCOUNT_JSON missing", file=sys.stderr)
        return 1
    if not Path(sa_json).is_file():
        print(f"FAIL: service account JSON not found: {sa_json}", file=sys.stderr)
        return 1
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa_json

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Filter,
            FilterExpression,
            FilterExpressionList,
            Metric,
            RunReportRequest,
        )
    except ImportError as e:
        print(f"FAIL: google-analytics-data missing ({e}). Install in venv.", file=sys.stderr)
        return 1

    client = BetaAnalyticsDataClient()
    property_path = f"properties/{pid}"
    dr = DateRange(start_date=args.start, end_date=args.end)

    sm_filter = FilterExpression(
        filter=Filter(
            field_name="sessionSourceMedium",
            string_filter=Filter.StringFilter(
                value=args.source_medium,
                match_type=Filter.StringFilter.MatchType.EXACT,
            ),
        )
    )
    event_filter = FilterExpression(
        filter=Filter(
            field_name="eventName",
            in_list_filter=Filter.InListFilter(values=KEY_EVENT_NAMES),
        )
    )

    def run(dims: list[str], mets: list[str], flt: FilterExpression | None) -> list[dict]:
        req = RunReportRequest(
            property=property_path,
            date_ranges=[dr],
            dimensions=[Dimension(name=d) for d in dims],
            metrics=[Metric(name=m) for m in mets],
            limit=args.limit,
        )
        if flt is not None:
            req.dimension_filter = flt
        resp = client.run_report(req)
        out = []
        for row in resp.rows or []:
            entry = {}
            for i, dv in enumerate(row.dimension_values):
                entry[dims[i]] = dv.value
            for i, mv in enumerate(row.metric_values):
                entry[mets[i]] = mv.value
            out.append(entry)
        return out

    # 1. Landing pages for the source/medium
    landing = run(
        dims=["landingPagePlusQueryString"],
        mets=["sessions", "engagedSessions", "engagementRate",
              "userEngagementDuration", "keyEvents"],
        flt=sm_filter,
    )

    # 2. Session campaign names for the source/medium
    campaigns = run(
        dims=["sessionCampaignName"],
        mets=["sessions", "keyEvents"],
        flt=sm_filter,
    )

    # 3. Key events by landing page — AND(sessionSourceMedium, eventName IN KEY_EVENTS)
    sm_and_event = FilterExpression(
        and_group=FilterExpressionList(expressions=[sm_filter, event_filter])
    )
    events_by_lp = run(
        dims=["landingPagePlusQueryString", "eventName"],
        mets=["eventCount"],
        flt=sm_and_event,
    )

    # 4. Daily sessions for the source/medium (sanity vs Ads clicks per day)
    daily = run(
        dims=["date"],
        mets=["sessions", "keyEvents"],
        flt=sm_filter,
    )

    result = {
        "property_id": pid,
        "window": {"start": args.start, "end": args.end},
        "session_source_medium": args.source_medium,
        "key_events_tracked": KEY_EVENT_NAMES,
        "landing_pages": {
            "dimensions": ["landingPagePlusQueryString"],
            "metrics": ["sessions", "engagedSessions", "engagementRate",
                        "userEngagementDuration", "keyEvents"],
            "row_count": len(landing),
            "rows": landing,
        },
        "session_campaigns": {
            "dimensions": ["sessionCampaignName"],
            "metrics": ["sessions", "keyEvents"],
            "row_count": len(campaigns),
            "rows": campaigns,
        },
        "key_events_by_landing_page": {
            "dimensions": ["landingPagePlusQueryString", "eventName"],
            "metrics": ["eventCount"],
            "filter": "sessionSourceMedium == source_medium AND eventName IN key_events",
            "row_count": len(events_by_lp),
            "rows": events_by_lp,
        },
        "daily_sessions": {
            "dimensions": ["date"],
            "metrics": ["sessions", "keyEvents"],
            "row_count": len(daily),
            "rows": daily,
        },
    }

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    # Terminal summary
    total_sessions = sum(int(r.get("sessions", 0) or 0) for r in landing)
    total_key_events = sum(float(r.get("keyEvents", 0) or 0) for r in landing)
    print(f"OK — GA4 paid landing page pull complete")
    print(f"  Window:         {args.start} to {args.end}")
    print(f"  source/medium:  {args.source_medium}")
    print(f"  landing pages:  {len(landing)} rows | sessions={total_sessions} | keyEvents={total_key_events:.1f}")
    print(f"  campaigns:      {len(campaigns)} rows")
    print(f"  events_by_lp:   {len(events_by_lp)} rows")
    print(f"  daily:          {len(daily)} rows")
    print(f"  JSON saved:     {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
