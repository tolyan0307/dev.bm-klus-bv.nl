"""
reviews_loader.py — Thin loader for Google Business Profile reviews/ratings data.

READ-ONLY: fetches GBP review count, average rating, and recent review samples.
Does not post, delete, or reply to reviews.

Designed to fail clearly when GBP API access is not configured.

Usage:
    from integrations.gbp.reviews_loader import load_gbp_reviews

    result = load_gbp_reviews()
    if result["status"] == "success":
        data = result["data"]
    else:
        print(result["error"])
"""

from __future__ import annotations

import os
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"

GBP_ACCOUNT_ID_KEY = "GBP_ACCOUNT_ID"
GBP_LOCATION_ID_KEY = "GBP_LOCATION_ID"


def _load_env() -> None:
    """Load .env.local if present."""
    if ENV_LOCAL.is_file():
        for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())


def _get_config() -> dict:
    _load_env()
    return {
        "account_id": os.environ.get(GBP_ACCOUNT_ID_KEY, ""),
        "location_id": os.environ.get(GBP_LOCATION_ID_KEY, ""),
    }


# ---------------------------------------------------------------------------
# Structured result helpers
# ---------------------------------------------------------------------------

def _success(data: dict, source: str = "gbp_api") -> dict:
    return {
        "status": "success",
        "source": source,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "data": data,
        "error": None,
    }


def _failure(reason: str, error_type: str = "config_missing") -> dict:
    return {
        "status": "error",
        "source": "gbp_api",
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "data": None,
        "error": reason,
        "error_type": error_type,
    }


# ---------------------------------------------------------------------------
# Main loader
# ---------------------------------------------------------------------------

def load_gbp_reviews(
    max_reviews: int = 20,
    account_id: str | None = None,
    location_id: str | None = None,
) -> dict:
    """
    Attempt to load GBP reviews and rating summary.

    Args:
        max_reviews: Maximum number of recent reviews to fetch (default 20).
        account_id: Override account ID (otherwise from config/env).
        location_id: Override location ID (otherwise from config/env).

    Returns:
        Structured dict with keys: status, source, fetched_at, data, error.
        On success: data contains review_count, average_rating, recent_reviews.
        On error: data is None, error contains human-readable reason.
    """
    cfg = _get_config()
    effective_account = account_id or cfg["account_id"]
    effective_location = location_id or cfg["location_id"]

    # ── Preflight: check config ──
    if not effective_account:
        return _failure(
            f"GBP account ID not configured. "
            f"Set {GBP_ACCOUNT_ID_KEY} in {ENV_LOCAL} or pass account_id argument.",
            error_type="config_missing",
        )

    if not effective_location:
        return _failure(
            f"GBP location ID not configured. "
            f"Set {GBP_LOCATION_ID_KEY} in {ENV_LOCAL} or pass location_id argument.",
            error_type="config_missing",
        )

    # ── Preflight: check API library availability ──
    try:
        from google.oauth2.credentials import Credentials  # noqa: F401
        from google.auth.transport.requests import AuthorizedSession, Request  # noqa: F401
    except ImportError:
        return _failure(
            "Google API client library not installed. "
            "Install google-auth and google-auth-httplib2.",
            error_type="dependency_missing",
        )

    # ── Attempt API call ──
    # Note: Google My Business API v4 (reviews) has no public discovery document,
    # so googleapiclient.discovery.build("mybusiness", "v4") raises
    # UnknownApiNameOrVersion. We call the REST endpoint directly via an
    # AuthorizedSession using the same OAuth credentials.
    try:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

        from . import GBP_TOKEN_PATH
        token_path = GBP_TOKEN_PATH
        if not token_path.is_file():
            return _failure(
                f"GBP OAuth token not found at {token_path}. "
                f"Run make_gbp_token.py, then place token at {token_path}.",
                error_type="auth_missing",
            )

        creds = Credentials.from_authorized_user_file(
            str(token_path),
            scopes=["https://www.googleapis.com/auth/business.manage"],
        )

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                return _failure(
                    "GBP credentials expired and cannot be refreshed. "
                    "Re-run GBP auth setup.",
                    error_type="auth_expired",
                )

        session = AuthorizedSession(creds)
        url = (
            "https://mybusiness.googleapis.com/v4/"
            f"accounts/{effective_account}/locations/{effective_location}/reviews"
        )
        page_size = min(max_reviews, 50)
        http_response = session.get(url, params={"pageSize": page_size})

        if http_response.status_code != 200:
            detail = http_response.text[:500]
            if http_response.status_code == 403:
                return _failure(
                    f"Permission denied for GBP Reviews API (HTTP 403). Detail: {detail}",
                    error_type="permission_denied",
                )
            if http_response.status_code == 404:
                return _failure(
                    f"GBP location not found for reviews (HTTP 404). Detail: {detail}",
                    error_type="not_found",
                )
            if http_response.status_code == 429:
                return _failure(
                    f"GBP Reviews API quota exceeded (HTTP 429). Detail: {detail}",
                    error_type="quota_exceeded",
                )
            return _failure(
                f"GBP Reviews API HTTP {http_response.status_code}: {detail}",
                error_type="api_error",
            )

        response = http_response.json()

        reviews_raw = response.get("reviews", [])
        total_count = response.get("totalReviewCount", len(reviews_raw))
        avg_rating = response.get("averageRating", None)

        # Normalize review samples
        recent_reviews = []
        for r in reviews_raw[:max_reviews]:
            recent_reviews.append({
                "reviewer": r.get("reviewer", {}).get("displayName", "Anonymous"),
                "star_rating": r.get("starRating", "UNKNOWN"),
                "comment": r.get("comment", ""),
                "create_time": r.get("createTime", ""),
                "update_time": r.get("updateTime", ""),
            })

        return _success(
            data={
                "account_id": effective_account,
                "location_id": effective_location,
                "total_review_count": total_count,
                "average_rating": avg_rating,
                "reviews_fetched": len(recent_reviews),
                "recent_reviews": recent_reviews,
            },
            source="gbp_api",
        )

    except Exception as e:
        error_msg = str(e)
        if "403" in error_msg or "permission" in error_msg.lower():
            return _failure(
                f"Permission denied for GBP Reviews API. Detail: {error_msg}",
                error_type="permission_denied",
            )
        elif "404" in error_msg or "not found" in error_msg.lower():
            return _failure(
                f"GBP location not found for reviews. Detail: {error_msg}",
                error_type="not_found",
            )
        else:
            return _failure(
                f"GBP Reviews API call failed: {error_msg}",
                error_type="api_error",
            )


# ---------------------------------------------------------------------------
# CLI smoke test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import json
    result = load_gbp_reviews()
    print(json.dumps(result, indent=2, ensure_ascii=False, default=str))
