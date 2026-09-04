"""
campaign_daily_loader.py — Read-only daily campaign metrics from the Google Ads API.

Thin wrapper over the same credentials the external utilities use
(D:/projects/bmklus/google/google-ads.yaml, customer 590-225-6023).
Returns per-day rows summed over all campaigns of the customer (or one campaign).

Usage:
    from integrations.google_ads.campaign_daily_loader import pull_campaign_daily
    rows = pull_campaign_daily("2026-06-07", "2026-09-04")       # all campaigns
    rows = pull_campaign_daily(start, end, campaign_id="23271040037")

Row: {date, impressions, clicks, cost_micros, conversions, conversions_value, campaigns}
Raises AdsLoaderError with a readable message when the SDK/config/API is unavailable.
Run with integrations/.venv Python (has google-ads).
"""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

YAML_PATH = Path("D:/projects/bmklus/google/google-ads.yaml")
CUSTOMER_ID = "5902256023"
API_VERSION = "v23"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class AdsLoaderError(RuntimeError):
    pass


def pull_campaign_daily(start: str, end: str, campaign_id: str | None = None) -> list[dict]:
    if not (DATE_RE.match(start) and DATE_RE.match(end)):
        raise AdsLoaderError("start/end must be YYYY-MM-DD")
    if not YAML_PATH.is_file():
        raise AdsLoaderError(f"google-ads.yaml not found at {YAML_PATH}")
    try:
        from google.ads.googleads.client import GoogleAdsClient
        from google.ads.googleads.errors import GoogleAdsException
    except ImportError as e:
        raise AdsLoaderError(f"google-ads SDK missing in this Python: {e}") from e

    try:
        client = GoogleAdsClient.load_from_storage(str(YAML_PATH), version=API_VERSION)
    except Exception as e:  # noqa: BLE001
        raise AdsLoaderError(f"cannot load Ads config: {e}") from e

    where = f"segments.date BETWEEN '{start}' AND '{end}'"
    if campaign_id:
        where += f" AND campaign.id = {int(campaign_id)}"
    query = f"""
        SELECT
            segments.date,
            campaign.id,
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros,
            metrics.conversions,
            metrics.conversions_value
        FROM campaign
        WHERE {where}
        ORDER BY segments.date ASC
    """
    svc = client.get_service("GoogleAdsService")
    try:
        response = svc.search_stream(customer_id=CUSTOMER_ID, query=query)
        by_day: dict[str, dict] = defaultdict(lambda: {"impressions": 0, "clicks": 0, "cost_micros": 0, "conversions": 0.0, "conversions_value": 0.0, "campaigns": set()})
        for batch in response:
            for row in batch.results:
                d = by_day[row.segments.date]
                d["impressions"] += int(row.metrics.impressions)
                d["clicks"] += int(row.metrics.clicks)
                d["cost_micros"] += int(row.metrics.cost_micros)
                d["conversions"] += float(row.metrics.conversions)
                d["conversions_value"] += float(row.metrics.conversions_value)
                d["campaigns"].add(str(row.campaign.id))
    except GoogleAdsException as e:
        msgs = "; ".join(f"[{err.error_code}] {err.message}" for err in e.failure.errors)
        raise AdsLoaderError(f"Google Ads API error: {msgs}") from e
    except Exception as e:  # noqa: BLE001
        raise AdsLoaderError(f"Google Ads request failed: {e}") from e

    out = []
    for date in sorted(by_day):
        d = by_day[date]
        out.append({
            "date": date,
            "impressions": d["impressions"],
            "clicks": d["clicks"],
            "cost_micros": d["cost_micros"],
            "conversions": round(d["conversions"], 2),
            "conversions_value": round(d["conversions_value"], 2),
            "campaigns": len(d["campaigns"]),
        })
    return out


if __name__ == "__main__":
    import sys
    from datetime import date, timedelta
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=27)
    rows = pull_campaign_daily(start.isoformat(), end.isoformat())
    print(f"Ads daily rows: {len(rows)} ({start}..{end})")
    if rows:
        print(f"  clicks={sum(r['clicks'] for r in rows)} conversions={sum(r['conversions'] for r in rows):.1f} cost=€{sum(r['cost_micros'] for r in rows)/1e6:.2f}")
    sys.exit(0)
