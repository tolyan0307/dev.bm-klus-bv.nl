"""
Test harness: verify read-only access to Google Analytics 4 Data API.

Uses a service account for authentication (no browser required).

Usage:
    python test_ga4_access.py
"""

import os
import sys
from datetime import date, timedelta
from pathlib import Path


def main() -> int:
    # --- Read env vars ---------------------------------------------------
    property_id = os.environ.get("BMKLUS_GA4_PROPERTY_ID", "").strip()
    sa_json = os.environ.get("BMKLUS_GA4_SERVICE_ACCOUNT_JSON", "").strip()

    missing = []
    if not property_id or property_id == "TODO_SET_ME":
        missing.append("BMKLUS_GA4_PROPERTY_ID")
    if not sa_json:
        missing.append("BMKLUS_GA4_SERVICE_ACCOUNT_JSON")
    if missing:
        print(
            f"FAIL: missing or placeholder env vars: {', '.join(missing)}",
            file=sys.stderr,
        )
        return 1

    if not Path(sa_json).is_file():
        print(f"FAIL: service account JSON not found: {sa_json}", file=sys.stderr)
        return 1

    # --- Auth ------------------------------------------------------------
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Metric,
            RunReportRequest,
        )
    except ImportError as e:
        print(f"FAIL: missing dependency — {e}", file=sys.stderr)
        print("Run: pip install -r requirements.txt", file=sys.stderr)
        return 1

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa_json
    client = BetaAnalyticsDataClient()

    # --- Query -----------------------------------------------------------
    end_date = date.today() - timedelta(days=1)
    start_date = end_date - timedelta(days=6)

    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[
            DateRange(
                start_date=start_date.isoformat(),
                end_date=end_date.isoformat(),
            )
        ],
        dimensions=[Dimension(name="date")],
        metrics=[Metric(name="sessions")],
        limit=10,
    )

    try:
        response = client.run_report(request)
    except Exception as e:
        print(f"FAIL: API request error — {e}", file=sys.stderr)
        return 1

    # --- Output ----------------------------------------------------------
    rows = list(response.rows) if response.rows else []

    print(f"\nOK — GA4 access verified")
    print(f"Property:   {property_id}")
    print(f"Date range: {start_date} -> {end_date}")
    print(f"Rows returned: {len(rows)}")

    if rows:
        print(f"\nDaily sessions:")
        for row in rows:
            day = row.dimension_values[0].value
            sessions = row.metric_values[0].value
            print(f"  {day}  sessions={sessions}")
    else:
        print(
            "No data returned"
            " (this may be normal for a new or low-traffic property)."
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
