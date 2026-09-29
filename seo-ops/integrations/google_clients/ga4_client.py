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
from .definitions import is_junk_source, load_key_event_names

KEY_EVENT_NAMES = load_key_event_names()  # config/conversions.yaml


# --- Shared helpers (also used by integrations/ga4/landing_page_loader.py) ---


def get_client(cfg: Ga4Config) -> BetaAnalyticsDataClient:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(cfg.service_account_json)
    return BetaAnalyticsDataClient()


def date_range(days: int) -> tuple[DateRange, dict]:
    """Last N days ending yesterday, as a DateRange and as {start, end}."""
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=days - 1)
    return (
        DateRange(start_date=start.isoformat(), end_date=end.isoformat()),
        {"start": start.isoformat(), "end": end.isoformat()},
    )


def _date_range_28d() -> DateRange:
    return date_range(28)[0]


def _date_range_str() -> dict:
    return date_range(28)[1]


def key_event_filter(names: list[str] | None = None) -> FilterExpression:
    """eventName in `names`, by default the key events from config/conversions.yaml."""
    return FilterExpression(
        filter=Filter(
            field_name="eventName",
            in_list_filter=Filter.InListFilter(values=names or KEY_EVENT_NAMES),
        )
    )


def run_report(
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
    client = get_client(cfg)
    rows = run_report(
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
    client = get_client(cfg)

    rows = run_report(
        client,
        cfg.property_id,
        dimensions=["landingPagePlusQueryString", "eventName"],
        metrics=["eventCount"],
        date_range=_date_range_28d(),
        limit=limit,
        dimension_filter=key_event_filter(),
    )
    return {
        "date_range": _date_range_str(),
        "key_events_tracked": KEY_EVENT_NAMES,
        "row_count": len(rows),
        "rows": rows,
    }


def get_traffic_acquisition_last_28d(cfg: Ga4Config, limit: int = 20) -> dict:
    """
    Traffic acquisition by session source/medium, last 28 days.
    Rows from local dev / hosting-panel referrers get junk=True.
    """
    client = get_client(cfg)
    rows = run_report(
        client,
        cfg.property_id,
        dimensions=["sessionSourceMedium"],
        metrics=["sessions", "engagedSessions", "engagementRate"],
        date_range=_date_range_28d(),
        limit=limit,
    )
    for r in rows:
        if is_junk_source(r.get("sessionSourceMedium", "")):
            r["junk"] = True
    return {
        "date_range": _date_range_str(),
        "row_count": len(rows),
        "rows": rows,
    }


def get_key_events_by_channel_28d_vs_prev(cfg: Ga4Config) -> dict:
    """
    Key events by default channel group: last 28 days vs the 28 days before.
    Lets reports separate organic from paid leads (GA4 is a consent-limited
    sample; the WP lead log is the ground truth for lead counts).
    """
    client = get_client(cfg)
    curr_end = date.today() - timedelta(days=1)
    curr_start = curr_end - timedelta(days=27)
    prev_end = curr_start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=27)

    def _fetch(start_d: date, end_d: date) -> dict[tuple[str, str], int]:
        rows = run_report(
            client,
            cfg.property_id,
            dimensions=["sessionDefaultChannelGroup", "eventName"],
            metrics=["eventCount"],
            date_range=DateRange(start_date=start_d.isoformat(), end_date=end_d.isoformat()),
            limit=200,
            dimension_filter=key_event_filter(),
        )
        return {
            (r["sessionDefaultChannelGroup"], r["eventName"]): int(r.get("eventCount", 0))
            for r in rows
        }

    current = _fetch(curr_start, curr_end)
    previous = _fetch(prev_start, prev_end)
    rows = [
        {
            "sessionDefaultChannelGroup": channel,
            "eventName": event,
            "eventCount": current.get((channel, event), 0),
            "previousEventCount": previous.get((channel, event), 0),
        }
        for channel, event in sorted(set(current) | set(previous))
    ]
    return {
        "current_range": {"start": curr_start.isoformat(), "end": curr_end.isoformat()},
        "previous_range": {"start": prev_start.isoformat(), "end": prev_end.isoformat()},
        "key_events_tracked": KEY_EVENT_NAMES,
        "row_count": len(rows),
        "rows": rows,
    }


def get_daily_sessions_last_28d(cfg: Ga4Config, limit: int = 28) -> dict:
    """Daily session counts, last 28 days."""
    client = get_client(cfg)
    rows = run_report(
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
