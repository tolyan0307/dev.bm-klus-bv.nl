"""
stats_loader.py — Read-only client for the BM Stats v2 WordPress plugin API.

Endpoints (all GET, header X-BM-Token):
    /wp-json/bm-stats/v1/summary?days=N
    /wp-json/bm-stats/v1/leads?from&to&status&source
    /wp-json/bm-stats/v1/pageviews?from&to&group=day|path|source|device
    /wp-json/bm-stats/v1/events?from&to&group=day|path|cta

Env (from integrations/.env.local):
    BMKLUS_WP_STATS_TOKEN   required, value of BM_STATS_API_TOKEN in wp-config.php (PROD)
    BMKLUS_WP_STATS_BASE    optional, default https://bm-klus-bv.nl

The leads endpoint returns no personal data (no name, phone, email, message).
Window convention: end = yesterday (local site date), to stay comparable with GA4 pulls.

Usage:
    from integrations.wp.stats_loader import pull_wp_window
    data = pull_wp_window(days=90)
"""

from __future__ import annotations

import os
from datetime import date, timedelta
from pathlib import Path

import requests

ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"
if ENV_LOCAL.is_file():
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

DEFAULT_BASE = "https://bm-klus-bv.nl"
API_PREFIX = "/wp-json/bm-stats/v1/"
TIMEOUT = 60


class WpStatsError(RuntimeError):
    pass


def _base() -> str:
    return os.environ.get("BMKLUS_WP_STATS_BASE", DEFAULT_BASE).rstrip("/")


def _token() -> str:
    tok = os.environ.get("BMKLUS_WP_STATS_TOKEN", "").strip()
    if not tok:
        raise WpStatsError(
            "BMKLUS_WP_STATS_TOKEN is not set. Add it to seo-ops/integrations/.env.local "
            "(same value as BM_STATS_API_TOKEN in wp-config.php on PROD)."
        )
    return tok


def _get(endpoint: str, params: dict | None = None) -> dict:
    url = _base() + API_PREFIX + endpoint
    clean = {k: v for k, v in (params or {}).items() if v not in (None, "")}
    resp = requests.get(url, headers={"X-BM-Token": _token()}, params=clean, timeout=TIMEOUT)
    if resp.status_code == 403:
        raise WpStatsError(f"WP stats API returned 403 for {endpoint}: token rejected or not configured on the server.")
    if resp.status_code == 404:
        raise WpStatsError(f"WP stats API endpoint not found ({url}). Is BM Stats v2 installed?")
    resp.raise_for_status()
    try:
        return resp.json()
    except ValueError as e:
        raise WpStatsError(f"WP stats API returned non-JSON for {endpoint}: {resp.text[:200]}") from e


def window(days: int, end_offset_days: int = 1) -> tuple[str, str]:
    """(from, to) as ISO dates. end = today - end_offset_days (default yesterday)."""
    end = date.today() - timedelta(days=end_offset_days)
    start = end - timedelta(days=days - 1)
    return start.isoformat(), end.isoformat()


# ── Endpoint wrappers ────────────────────────────────────────────────────────

def fetch_summary(days: int = 28) -> dict:
    return _get("summary", {"days": days})


def fetch_leads(start: str, end: str, status: str | None = None, source: str | None = None) -> dict:
    return _get("leads", {"from": start, "to": end, "status": status, "source": source})


def fetch_pageviews(start: str, end: str, group: str = "day") -> dict:
    return _get("pageviews", {"from": start, "to": end, "group": group})


def fetch_events(start: str, end: str, group: str = "cta") -> dict:
    return _get("events", {"from": start, "to": end, "group": group})


# ── Bundle ───────────────────────────────────────────────────────────────────

def pull_wp_window(days: int = 90) -> dict:
    """
    Pull everything needed for a snapshot for the last N days (ending yesterday).
    Returns dict with base_url, date_range, leads, pageviews_day, pageviews_path,
    pageviews_source, pageviews_device, events_day, events_path, summary.
    """
    start, end = window(days)
    out = {
        "base_url": _base(),
        "date_range": {"start": start, "end": end, "days": days},
        "leads": fetch_leads(start, end),
        "pageviews_day": fetch_pageviews(start, end, "day"),
        "pageviews_path": fetch_pageviews(start, end, "path"),
        "pageviews_source": fetch_pageviews(start, end, "source"),
        "pageviews_device": fetch_pageviews(start, end, "device"),
        "events_day": fetch_events(start, end, "day"),
        "events_path": fetch_events(start, end, "path"),
        "summary": fetch_summary(days),
    }
    return out


if __name__ == "__main__":
    s = fetch_summary(7)
    print(f"WP stats OK: {s['period']['from']} -> {s['period']['to']}, plugin {s.get('plugin_version')}")
    print(f"  views={s['current']['views']} cta={s['current']['cta']} leads={s['current']['leads']} (real {s['current']['leads_real']})")
