"""
DataForSEO Labs — Google keyword endpoints.

Prepared helpers for future keyword enrichment.
All methods are POST-based and use the reusable client.

Usage:
    from dataforseo.labs_google import LabsGoogle
    labs = LabsGoogle()
    result = labs.keyword_overview(keywords=["gevelisolatie"])
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from dataforseo.client import DataForSEOClient


class LabsGoogle:
    """Helpers for DataForSEO Labs → Google endpoints."""

    def __init__(self, client: DataForSEOClient | None = None) -> None:
        self._client = client or DataForSEOClient()

    # -- keyword_overview_live ----------------------------------------------
    def keyword_overview(
        self,
        keywords: list[str],
        location_code: int = 2528,  # Netherlands
        language_code: str = "nl",
    ) -> dict:
        """
        POST /v3/dataforseo_labs/google/keyword_overview/live

        Returns search volume, CPC, competition for each keyword.
        """
        payload = [
            {
                "keywords": keywords,
                "location_code": location_code,
                "language_code": language_code,
            }
        ]
        return self._client.post(
            "/dataforseo_labs/google/keyword_overview/live", payload=payload
        )

    # -- related_keywords_live ----------------------------------------------
    def related_keywords(
        self,
        keyword: str,
        location_code: int = 2528,
        language_code: str = "nl",
        depth: int = 1,
        limit: int = 50,
    ) -> dict:
        """
        POST /v3/dataforseo_labs/google/related_keywords/live

        Returns semantically related keywords.
        """
        payload = [
            {
                "keyword": keyword,
                "location_code": location_code,
                "language_code": language_code,
                "depth": depth,
                "limit": limit,
            }
        ]
        return self._client.post(
            "/dataforseo_labs/google/related_keywords/live", payload=payload
        )

    # -- keywords_for_site_live ---------------------------------------------
    def keywords_for_site(
        self,
        target: str = "bm-klus-bv.nl",
        location_code: int = 2528,
        language_code: str = "nl",
        limit: int = 100,
    ) -> dict:
        """
        POST /v3/dataforseo_labs/google/keywords_for_site/live

        Returns keywords the target site ranks for.
        """
        payload = [
            {
                "target": target,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
            }
        ]
        return self._client.post(
            "/dataforseo_labs/google/keywords_for_site/live", payload=payload
        )

    # -- keyword_suggestions_live ----------------------------------------------
    def keyword_suggestions(
        self,
        keyword: str,
        location_code: int = 2528,
        language_code: str = "nl",
        limit: int = 50,
        include_seed_keyword: bool = True,
        filters: list | None = None,
    ) -> dict:
        """
        POST /v3/dataforseo_labs/google/keyword_suggestions/live

        Returns keyword suggestions based on seed keyword.
        Cost: ~$0.075 per task.
        """
        task: dict = {
            "keyword": keyword,
            "location_code": location_code,
            "language_code": language_code,
            "limit": limit,
            "include_seed_keyword": include_seed_keyword,
        }
        if filters:
            task["filters"] = filters
        return self._client.post(
            "/dataforseo_labs/google/keyword_suggestions/live", payload=[task]
        )
