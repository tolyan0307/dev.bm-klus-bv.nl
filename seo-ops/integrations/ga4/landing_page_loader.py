"""
landing_page_loader.py — Pull GA4 landing-page data for SEO/page analysis.

Reuses existing GA4 auth from integrations/google_clients/config.py and
the _run_report / _get_client helpers from ga4_client.py.

Returns raw API rows as list[dict].
"""

from __future__ import annotations

import os
import sys
from datetime import date, timedelta
from pathlib import Path

# Load .env.local
ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"
if ENV_LOCAL.is_file():
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

# Add parent for google_clients import
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from google_clients.config import load_ga4_config, Ga4Config

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    FilterExpression,
    Filter,
    Metric,
    RunReportRequest,
)

KEY_EVENT_NAMES = ["Contact_Form_Site", "Phone", "Whatsapp"]


def _get_client(cfg: Ga4Config) -> BetaAnalyticsDataClient:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(cfg.service_account_json)
    return BetaAnalyticsDataClient()


def _date_range(days: int) -> tuple[DateRange, dict]:
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=days - 1)
    dr = DateRange(start_date=start.isoformat(), end_date=end.isoformat())
    info = {"start": start.isoformat(), "end": end.isoformat()}
    return dr, info


def _run_report(
    client: BetaAnalyticsDataClient,
    property_id: str,
    dimensions: list[str],
    metrics: list[str],
    date_range: DateRange,
    limit: int = 10000,
    dimension_filter: FilterExpression | None = None,
) -> list[dict]:
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[Dimension(name=d) for d in dimensions],
        metrics=[Metric(name=m) for m in metrics],
        limit=limit,
    )
    if dimension_filter:
        request.dimension_filter = dimension_filter

    response = client.run_report(request)
    rows = []
    for row in response.rows or []:
        entry = {}
        for i, dv in enumerate(row.dimension_values):
            entry[dimensions[i]] = dv.value
        for i, mv in enumerate(row.metric_values):
            entry[metrics[i]] = mv.value
        rows.append(entry)
    return rows


def pull_landing_pages_by_channel(days: int = 90) -> dict:
    """
    Pull landing page + channel group level data.
    Dimensions: landingPagePlusQueryString, sessionDefaultChannelGroup
    Metrics: sessions, engagedSessions, engagementRate, averageSessionDuration
    """
    cfg = load_ga4_config()
    client = _get_client(cfg)
    dr, dr_info = _date_range(days)

    rows = _run_report(
        client,
        cfg.property_id,
        dimensions=["landingPagePlusQueryString", "sessionDefaultChannelGroup"],
        metrics=["sessions", "engagedSessions", "engagementRate", "averageSessionDuration"],
        date_range=dr,
        limit=10000,
    )

    return {
        "property_id": cfg.property_id,
        "date_range": dr_info,
        "dimensions": ["landingPagePlusQueryString", "sessionDefaultChannelGroup"],
        "metrics": ["sessions", "engagedSessions", "engagementRate", "averageSessionDuration"],
        "total_rows": len(rows),
        "rows": rows,
    }


def pull_key_events_by_landing_page(days: int = 90) -> dict:
    """
    Pull key events by landing page (Contact_Form_Site, Phone, Whatsapp).
    """
    cfg = load_ga4_config()
    client = _get_client(cfg)
    dr, dr_info = _date_range(days)

    event_filter = FilterExpression(
        filter=Filter(
            field_name="eventName",
            in_list_filter=Filter.InListFilter(values=KEY_EVENT_NAMES),
        )
    )

    rows = _run_report(
        client,
        cfg.property_id,
        dimensions=["landingPagePlusQueryString", "eventName"],
        metrics=["eventCount"],
        date_range=dr,
        limit=10000,
        dimension_filter=event_filter,
    )

    return {
        "property_id": cfg.property_id,
        "date_range": dr_info,
        "key_events_tracked": KEY_EVENT_NAMES,
        "total_rows": len(rows),
        "rows": rows,
    }


if __name__ == "__main__":
    result = pull_landing_pages_by_channel(days=90)
    print(f"Pulled {result['total_rows']} landing-page+channel rows")
    print(f"Date range: {result['date_range']['start']} to {result['date_range']['end']}")
    if result["rows"]:
        print(f"Sample: {result['rows'][0]}")
