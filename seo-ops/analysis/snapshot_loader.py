"""
Load and validate the latest combined snapshot JSON.
"""

import json
import sys
from pathlib import Path

SNAPSHOT_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "processed"
    / "latest_combined_snapshot.json"
)

REQUIRED_SECTIONS = [
    "site",
    "gsc_top_pages",
    "gsc_top_queries",
    "gsc_page_comparison",
    "ga4_landing_pages",
    "ga4_key_events_by_page",
    "ga4_traffic_acquisition",
    "ga4_daily_sessions",
]


def load_snapshot(path: Path | None = None) -> dict:
    """
    Load snapshot JSON, validate required sections, return plain dict.
    Exits with readable error if file is missing or malformed.
    """
    p = path or SNAPSHOT_PATH

    if not p.is_file():
        print(f"FAIL: snapshot not found: {p}", file=sys.stderr)
        print(
            "Run: cd seo-ops/integrations && python run_combined_snapshot.py",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        print(f"FAIL: cannot parse snapshot JSON: {e}", file=sys.stderr)
        sys.exit(1)

    missing = [s for s in REQUIRED_SECTIONS if s not in data]
    if missing:
        print(
            f"WARNING: snapshot missing sections: {', '.join(missing)}",
            file=sys.stderr,
        )

    errored = [s for s in REQUIRED_SECTIONS if isinstance(data.get(s), dict) and "error" in data[s]]
    if errored:
        print(
            f"WARNING: snapshot sections with errors: {', '.join(errored)}",
            file=sys.stderr,
        )

    return data
