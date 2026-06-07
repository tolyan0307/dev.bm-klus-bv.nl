"""
DataForSEO SERP — Google organic endpoints.

Usage:
    from dataforseo.serp_google import SerpGoogle
    serp = SerpGoogle()
    result = serp.organic_live("gevelisolatie")
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from dataforseo.client import DataForSEOClient


class SerpGoogle:
    """Helpers for DataForSEO SERP -> Google endpoints."""

    def __init__(self, client: DataForSEOClient | None = None) -> None:
        self._client = client or DataForSEOClient()

    def organic_live(
        self,
        keyword: str,
        location_code: int = 2528,  # Netherlands
        language_code: str = "nl",
        depth: int = 10,  # top N results
        device: str = "desktop",
    ) -> dict:
        """
        POST /v3/serp/google/organic/live/advanced

        Returns live SERP for a single keyword.
        Cost: ~$0.002 per task (advanced).
        """
        payload = [
            {
                "keyword": keyword,
                "location_code": location_code,
                "language_code": language_code,
                "depth": depth,
                "device": device,
            }
        ]
        return self._client.post(
            "/serp/google/organic/live/advanced", payload=payload
        )
