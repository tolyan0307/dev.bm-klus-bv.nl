"""
DataForSEO API client — minimal reusable wrapper.

Handles:
- Basic Auth (login + password from env)
- GET / POST requests
- Timeout, error handling, JSON parsing

Credentials loaded from seo-ops/integrations/.env.local:
    DATAFORSEO_API_LOGIN
    DATAFORSEO_API_PASSWORD
"""

from __future__ import annotations

import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import requests

# ---------------------------------------------------------------------------
# Env loading — same pattern as gsc/query_page_loader.py
# ---------------------------------------------------------------------------
ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"
if ENV_LOCAL.is_file():
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

BASE_URL = "https://api.dataforseo.com/v3"
DEFAULT_TIMEOUT = 30  # seconds


@dataclass(frozen=True)
class DataForSEOConfig:
    login: str
    password: str


def _load_config() -> DataForSEOConfig:
    login = os.environ.get("DATAFORSEO_API_LOGIN", "").strip()
    password = os.environ.get("DATAFORSEO_API_PASSWORD", "").strip()
    if not login or not password:
        print(
            "FAIL: DATAFORSEO_API_LOGIN and/or DATAFORSEO_API_PASSWORD "
            "are missing from environment.",
            file=sys.stderr,
        )
        sys.exit(1)
    return DataForSEOConfig(login=login, password=password)


class DataForSEOClient:
    """Thin wrapper around DataForSEO REST API v3."""

    def __init__(self, timeout: int = DEFAULT_TIMEOUT) -> None:
        cfg = _load_config()
        self._auth = (cfg.login, cfg.password)
        self._timeout = timeout

    # -- core request methods -----------------------------------------------

    def get(self, endpoint: str, **kwargs: Any) -> dict:
        """GET request. `endpoint` is relative to /v3, e.g. '/appendix/user_data'."""
        url = f"{BASE_URL}{endpoint}"
        resp = requests.get(
            url, auth=self._auth, timeout=self._timeout, **kwargs
        )
        resp.raise_for_status()
        return resp.json()

    def post(self, endpoint: str, payload: list[dict] | None = None, **kwargs: Any) -> dict:
        """POST request. DataForSEO expects a JSON list of task objects."""
        url = f"{BASE_URL}{endpoint}"
        resp = requests.post(
            url, json=payload, auth=self._auth, timeout=self._timeout, **kwargs
        )
        resp.raise_for_status()
        return resp.json()

    # -- convenience --------------------------------------------------------

    def user_data(self) -> dict:
        """GET /appendix/user_data — account info, rate limits.

        WARNING: The `money.balance` and `money.total` fields in the response
        are NOT reliable USD amounts. Do not use them to derive account balance
        in reports. Check the DataForSEO dashboard for actual balance.
        """
        return self.get("/appendix/user_data")
