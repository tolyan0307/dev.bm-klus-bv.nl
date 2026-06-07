"""
performance_loader.py — Thin loader for Google Business Profile performance data.

READ-ONLY: fetches GBP performance metrics (views, searches, actions).
Does not modify the profile in any way.

This loader is designed to fail clearly and safely when GBP API access
is not configured. The analyzer handles graceful degradation.

Usage:
    from integrations.gbp.performance_loader import load_gbp_performance

    result = load_gbp_performance()
    if result["status"] == "success":
        data = result["data"]
    else:
        print(result["error"])

Requirements:
    - Google Business Profile API access (mybusinessbusinessinformation)
    - OAuth credentials with GBP read scope
    - Account and location identifiers in config or env

Note:
    As of v1, GBP API access may not be fully configured.
    The loader is structurally correct and will fail clearly,
    returning a structured error rather than crashing.
"""

from __future__ import annotations

import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"

# GBP API config keys (expected in .env.local or environment)
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
    """Read GBP config from environment. Returns dict with account/location IDs."""
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

def load_gbp_performance(
    days: int = 28,
    account_id: str | None = None,
    location_id: str | None = None,
) -> dict:
    """
    Attempt to load GBP performance data.

    Args:
        days: Number of recent days to fetch (default 28).
        account_id: Override account ID (otherwise from config/env).
        location_id: Override location ID (otherwise from config/env).

    Returns:
        Structured dict with keys: status, source, fetched_at, data, error.
        On success: data contains performance metrics.
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
        from googleapiclient.discovery import build  # noqa: F401
        from google.oauth2.credentials import Credentials  # noqa: F401
    except ImportError:
        return _failure(
            "Google API client library not installed. "
            "Install google-api-python-client and google-auth.",
            error_type="dependency_missing",
        )

    # ── Attempt API call ──
    try:
        # GBP Performance API uses mybusinessbusinessinformation
        # Resource: accounts/{account_id}/locations/{location_id}
        # Metrics endpoint: reportInsights or performanceMetrics
        #
        # Note: The exact API surface depends on GBP API version.
        # As of 2026, Google Business Profile Performance API
        # uses the `mybusiness` or `businessprofileperformance` discovery.

        # Try to load credentials (reuse pattern from GSC loader)
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
                from google.auth.transport.requests import Request
                creds.refresh(Request())
            else:
                return _failure(
                    "GBP credentials expired and cannot be refreshed. "
                    "Re-run GBP auth setup.",
                    error_type="auth_expired",
                )

        # Build service
        service = build("businessprofileperformance", "v1", credentials=creds)

        # Calculate date range
        end_date = datetime.now(timezone.utc).date()
        start_date = end_date - timedelta(days=days)

        # Fetch daily metrics
        name = f"locations/{effective_location}"
        response = (
            service.locations()
            .fetchMultiDailyMetricsTimeSeries(
                location=name,
                dailyMetrics=[
                    "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
                    "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
                    "BUSINESS_IMPRESSIONS_MOBILE_MAPS",
                    "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
                    "CALL_CLICKS",
                    "WEBSITE_CLICKS",
                    "BUSINESS_DIRECTION_REQUESTS",
                ],
                dailyRange_startDate_year=start_date.year,
                dailyRange_startDate_month=start_date.month,
                dailyRange_startDate_day=start_date.day,
                dailyRange_endDate_year=end_date.year,
                dailyRange_endDate_month=end_date.month,
                dailyRange_endDate_day=end_date.day,
            )
            .execute()
        )

        return _success(
            data={
                "account_id": effective_account,
                "location_id": effective_location,
                "period_days": days,
                "start_date": str(start_date),
                "end_date": str(end_date),
                "raw_response": response,
            },
            source="gbp_api",
        )

    except Exception as e:
        error_msg = str(e)
        if "403" in error_msg or "permission" in error_msg.lower():
            return _failure(
                f"Permission denied for GBP API. Check OAuth scopes and account access. Detail: {error_msg}",
                error_type="permission_denied",
            )
        elif "404" in error_msg or "not found" in error_msg.lower():
            return _failure(
                f"GBP location not found. Check account_id and location_id. Detail: {error_msg}",
                error_type="not_found",
            )
        elif "quota" in error_msg.lower() or "429" in error_msg:
            return _failure(
                f"GBP API quota exceeded. Detail: {error_msg}",
                error_type="quota_exceeded",
            )
        else:
            return _failure(
                f"GBP API call failed: {error_msg}",
                error_type="api_error",
            )


# ---------------------------------------------------------------------------
# CLI smoke test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import json
    result = load_gbp_performance()
    print(json.dumps(result, indent=2, ensure_ascii=False, default=str))
