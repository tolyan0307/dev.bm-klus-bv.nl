"""
Orchestrator: collect a unified read-only snapshot from GSC + GA4.

Returns a single dict with all sections. No deep analytics —
just clean structured data for downstream analysis.
"""

import sys
import traceback

from .config import load_gsc_config, load_ga4_config
from . import gsc_client
from . import ga4_client


def collect_snapshot() -> dict:
    """
    Run all read-only queries and return a unified snapshot dict.
    Each section is either a data dict or an error string.
    """
    gsc_cfg = load_gsc_config()
    ga4_cfg = load_ga4_config()

    snapshot = {
        "site": gsc_cfg.site_url,
        "ga4_property": ga4_cfg.property_id,
    }

    # --- GSC sections ---
    for key, fn in [
        ("gsc_top_pages", lambda: gsc_client.query_top_pages_last_28d(gsc_cfg)),
        ("gsc_top_queries", lambda: gsc_client.query_top_queries_last_28d(gsc_cfg)),
        ("gsc_page_comparison", lambda: gsc_client.query_pages_comparison(gsc_cfg)),
    ]:
        try:
            snapshot[key] = fn()
        except Exception as e:
            snapshot[key] = {"error": str(e)}
            print(f"WARNING: {key} failed — {e}", file=sys.stderr)

    # --- GA4 sections ---
    for key, fn in [
        (
            "ga4_landing_pages",
            lambda: ga4_client.get_sessions_by_landing_page_last_28d(ga4_cfg),
        ),
        (
            "ga4_key_events_by_page",
            lambda: ga4_client.get_key_events_by_landing_page_last_28d(ga4_cfg),
        ),
        (
            "ga4_traffic_acquisition",
            lambda: ga4_client.get_traffic_acquisition_last_28d(ga4_cfg),
        ),
        (
            "ga4_daily_sessions",
            lambda: ga4_client.get_daily_sessions_last_28d(ga4_cfg),
        ),
    ]:
        try:
            snapshot[key] = fn()
        except Exception as e:
            snapshot[key] = {"error": str(e)}
            print(f"WARNING: {key} failed — {e}", file=sys.stderr)

    return snapshot
