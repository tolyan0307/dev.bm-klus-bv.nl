"""
Shared data definitions for the seo-ops collectors.

- key events come from config/conversions.yaml (single source for all loaders);
- GSC data lag, brand-query and junk-traffic patterns, page URL normalisation
  and the cannibalisation rule are small documented constants
  (reasoning: seo-ops/CLAUDE.md, seo-ops/knowledge.md).
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

SEO_OPS_ROOT = Path(__file__).resolve().parents[2]
CONVERSIONS_YAML = SEO_OPS_ROOT / "config" / "conversions.yaml"

# GSC finalises data with a 2-3 day lag; every GSC window ends on today - GSC_LAG_DAYS.
GSC_LAG_DAYS = 3

_FALLBACK_KEY_EVENTS = ["Contact_Form_Site", "Phone", "Whatsapp", "Email"]

# "bm klus", "bmklus", "bm-klus bv" ...
BRAND_QUERY_RE = re.compile(r"\bbm[\s\-_.]*klus", re.IGNORECASE)

# Not real visitors: local dev server and the hosting control panel.
JUNK_SOURCE_RE = re.compile(r"127\.0\.0\.1|localhost|webhostingserver\.nl", re.IGNORECASE)

# Cannibalisation: two URLs each get more than CANNIBAL_MIN_IMPRESSIONS impressions
# for the same query and rank less than CANNIBAL_MAX_POSITION_GAP positions apart.
# Merely sharing queries (parent and child page) is overlap, not cannibalisation.
CANNIBAL_MIN_IMPRESSIONS = 10
CANNIBAL_MAX_POSITION_GAP = 5


def load_key_event_names() -> list[str]:
    """Primary key events from config/conversions.yaml (fallback: the known four)."""
    try:
        import yaml

        data = yaml.safe_load(CONVERSIONS_YAML.read_text(encoding="utf-8")) or {}
        names = [str(n) for n in data.get("primary_key_events", []) if n]
        if names:
            return names
    except Exception as e:  # missing file or PyYAML — keep collecting with the known set
        print(f"WARNING: cannot read {CONVERSIONS_YAML.name} ({e}); using fallback key events", file=sys.stderr)
    return list(_FALLBACK_KEY_EVENTS)


def is_brand_query(query: str) -> bool:
    return bool(BRAND_QUERY_RE.search(query or ""))


def is_junk_source(source_medium: str) -> bool:
    return bool(JUNK_SOURCE_RE.search(source_medium or ""))


def require_interactive_auth(service: str) -> None:
    """
    Stop instead of opening a browser for OAuth: an unattended run (weekly
    routine) would hang on the login page. Set BMKLUS_ALLOW_BROWSER_AUTH=1 to
    allow the browser flow when the owner is present.
    """
    if os.environ.get("BMKLUS_ALLOW_BROWSER_AUTH") != "1":
        raise RuntimeError(
            f"{service}: OAuth token is missing or expired and needs a browser login. "
            "With the owner present run `python integrations/test_gsc_access.py`, then retry."
        )


def is_cannibalization(page_stats: list[tuple[int, float]]) -> bool:
    """page_stats: (impressions, position) of each URL ranking for one query."""
    positions = sorted(pos for impr, pos in page_stats if impr > CANNIBAL_MIN_IMPRESSIONS)
    return any(b - a < CANNIBAL_MAX_POSITION_GAP for a, b in zip(positions, positions[1:]))


def normalize_page_url(url: str) -> str:
    """Drop query string and fragment, e.g. '/?utm_source=google&...' -> '/'."""
    parts = urlsplit(url)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, "", ""))
