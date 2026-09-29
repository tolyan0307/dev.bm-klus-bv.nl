"""
landing_page_loader.py — Pull GA4 landing-page data for SEO/page analysis.

GA4 auth and report helpers: google_clients.ga4_client (shared by all collectors).

Returns raw API rows as list[dict].
"""

from __future__ import annotations

import sys
from pathlib import Path

# Add parent for google_clients import
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from google_clients.config import load_ga4_config
from google_clients.ga4_client import KEY_EVENT_NAMES, date_range, get_client, key_event_filter, run_report


def pull_landing_pages_by_channel(days: int = 90) -> dict:
    """
    Pull landing page + channel group level data.
    Dimensions: landingPagePlusQueryString, sessionDefaultChannelGroup
    Metrics: sessions, engagedSessions, engagementRate, averageSessionDuration
    """
    cfg = load_ga4_config()
    client = get_client(cfg)
    dr, dr_info = date_range(days)

    rows = run_report(
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
    Pull key events by landing page (key events from config/conversions.yaml).
    """
    cfg = load_ga4_config()
    client = get_client(cfg)
    dr, dr_info = date_range(days)

    rows = run_report(
        client,
        cfg.property_id,
        dimensions=["landingPagePlusQueryString", "eventName"],
        metrics=["eventCount"],
        date_range=dr,
        limit=10000,
        dimension_filter=key_event_filter(),
    )

    return {
        "property_id": cfg.property_id,
        "date_range": dr_info,
        "key_events_tracked": KEY_EVENT_NAMES,
        "total_rows": len(rows),
        "rows": rows,
    }


def pull_key_events_by_date(days: int = 90, event_names: list[str] | None = None) -> dict:
    """
    Pull key events per day (for reconciliation with the WP lead log).
    Dimensions: date, eventName. Metric: eventCount.
    Rows: {date: 'YYYY-MM-DD', eventName, eventCount}.
    """
    cfg = load_ga4_config()
    client = get_client(cfg)
    dr, dr_info = date_range(days)
    names = event_names or KEY_EVENT_NAMES

    rows = run_report(
        client,
        cfg.property_id,
        dimensions=["date", "eventName"],
        metrics=["eventCount"],
        date_range=dr,
        limit=10000,
        dimension_filter=key_event_filter(names),
    )
    for r in rows:
        d = r.get("date", "")
        if len(d) == 8 and d.isdigit():
            r["date"] = f"{d[:4]}-{d[4:6]}-{d[6:]}"

    return {
        "property_id": cfg.property_id,
        "date_range": dr_info,
        "event_names": names,
        "total_rows": len(rows),
        "rows": rows,
    }


if __name__ == "__main__":
    result = pull_landing_pages_by_channel(days=90)
    print(f"Pulled {result['total_rows']} landing-page+channel rows")
    print(f"Date range: {result['date_range']['start']} to {result['date_range']['end']}")
    if result["rows"]:
        print(f"Sample: {result['rows'][0]}")
