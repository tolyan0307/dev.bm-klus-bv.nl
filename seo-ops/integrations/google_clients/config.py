"""
Centralised config loader for Google API credentials.
All values come from environment variables — nothing is hardcoded.
"""

import os
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class GscConfig:
    site_url: str
    oauth_client_json: Path
    token_json: Path


@dataclass(frozen=True)
class Ga4Config:
    property_id: str
    service_account_json: Path


def _require_env(name: str) -> str:
    val = os.environ.get(name, "").strip()
    if not val or val == "TODO_SET_ME":
        print(f"FAIL: env var {name} is missing or placeholder", file=sys.stderr)
        sys.exit(1)
    return val


def _require_file(path_str: str, label: str) -> Path:
    p = Path(path_str)
    if not p.is_file():
        print(f"FAIL: {label} not found: {p}", file=sys.stderr)
        sys.exit(1)
    return p


def load_gsc_config() -> GscConfig:
    site_url = _require_env("BMKLUS_GSC_SITE_URL")
    client_json = _require_env("BMKLUS_GSC_OAUTH_CLIENT_JSON")
    token_json = _require_env("BMKLUS_GSC_TOKEN_JSON")
    return GscConfig(
        site_url=site_url,
        oauth_client_json=_require_file(client_json, "GSC OAuth client JSON"),
        token_json=Path(token_json),
    )


def load_ga4_config() -> Ga4Config:
    property_id = _require_env("BMKLUS_GA4_PROPERTY_ID")
    sa_json = _require_env("BMKLUS_GA4_SERVICE_ACCOUNT_JSON")
    return Ga4Config(
        property_id=property_id,
        service_account_json=_require_file(sa_json, "GA4 service account JSON"),
    )
