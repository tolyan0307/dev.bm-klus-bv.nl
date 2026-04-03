"""
Read-only Google Analytics 4 Data API client.

All functions return plain Python dicts/lists — no pandas.
"""

import os
from datetime import date, timedelta

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    FilterExpression,
    Filter,
    Metric,
    RunReportRequest,
)

from .config import Ga4Config

KEY_EVENT_NAMES = ["Contact_Form_Site", "Phone", "Whatsapp"]


def _get_client(cfg: Ga4Config) -> BetaAnalyticsDataClient:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(cfg.service_account_json)
    return BetaAnalyticsDataClient()


def _date_range_28d() -> DateRange:
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=27)
    return DateRange(start_date=start.isoformat(), end_date=end.isoformat())


def _date_range_str() -> dict:
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=27)
    return {"start": start.isoformat(), "end": end.isoformat()}


def _run_report(
    client: BetaAnalyticsDataClient,
    property_id: str,
    dimensions: list[str],
    metrics: list[str],
    date_range: DateRange,
    limit: int = 50,
    dimension_filter: FilterExpression | None = None,
) -> list[dict]:
    """Run a GA4 report and return rows as plain dicts."""
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


# --- Public functions ---------------------------------------------------


def get_sessions_by_landing_page_last_28d(
    cfg: Ga4Config, limit: int = 50
) -> dict:
    """Sessions and engaged sessions by landing page, last 28 days."""
    client = _get_client(cfg)
    rows = _run_report(
        client,
        cfg.property_id,
        dimensions=["landingPagePlusQueryString"],
        metrics=["sessions", "engagedSessions", "engagementRate"],
        date_range=_date_range_28d(),
        limit=limit,
    )
    return {
        "date_range": _date_range_str(),
        "row_count": len(rows),
        "rows": rows,
    }


def get_key_events_by_landing_page_last_28d(
    cfg: Ga4Config, limit: int = 50
) -> dict:
    """
    Key event counts by landing page for primary conversions.
    Uses eventName dimension filtered to KEY_EVENT_NAMES.
    """
    client = _get_client(cfg)

    # Filter to only our key events
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
        date_range=_date_range_28d(),
        limit=limit,
        dimension_filter=event_filter,
    )
    return {
        "date_range": _date_range_str(),
        "key_events_tracked": KEY_EVENT_NAMES,
        "row_count": len(rows),
        "rows": rows,
    }


def get_traffic_acquisition_last_28d(cfg: Ga4Config, limit: int = 20) -> dict:
    """Traffic acquisition by session source/medium, last 28 days."""
    client = _get_client(cfg)
    rows = _run_report(
        client,
        cfg.property_id,
        dimensions=["sessionSourceMedium"],
        metrics=["sessions", "engagedSessions", "engagementRate"],
        date_range=_date_range_28d(),
        limit=limit,
    )
    return {
        "date_range": _date_range_str(),
        "row_count": len(rows),
        "rows": rows,
    }


def get_daily_sessions_last_28d(cfg: Ga4Config, limit: int = 28) -> dict:
    """Daily session counts, last 28 days."""
    client = _get_client(cfg)
    rows = _run_report(
        client,
        cfg.property_id,
        dimensions=["date"],
        metrics=["sessions"],
        date_range=_date_range_28d(),
        limit=limit,
    )
    return {
        "date_range": _date_range_str(),
        "row_count": len(rows),
        "rows": rows,
    }
