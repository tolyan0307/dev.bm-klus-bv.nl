"""
url_inspection_loader.py — Thin loader for GSC URL Inspection API.

GSC auth: google_clients.gsc_client.build_service (shared by all collectors).
Returns raw inspection response as Python dict.

Usage:
    from integrations.gsc.url_inspection_loader import inspect_url
    result = inspect_url("https://bm-klus-bv.nl/gevelisolatie/")

    # Or with explicit site_url override:
    result = inspect_url(
        "https://bm-klus-bv.nl/gevelisolatie/",
        site_url="https://bm-klus-bv.nl/"
    )
"""

from __future__ import annotations

import sys
from pathlib import Path

# Add parent so google_clients is importable
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from google_clients.config import load_gsc_config
from google_clients.gsc_client import build_service


def inspect_url(
    inspection_url: str,
    site_url: str | None = None,
    language_code: str = "nl",
) -> dict:
    """
    Run URL Inspection for a single URL.

    Args:
        inspection_url: The fully-qualified URL to inspect.
        site_url: GSC property URL. If None, loads from config.
        language_code: Language for the inspection (default: nl).

    Returns:
        Raw API response as dict. Contains inspectionResult with
        indexStatusResult, mobileUsabilityResult, etc.

    Raises:
        SystemExit: If credentials are missing or not configured.
        Exception: On API errors (permission denied, quota, network).
    """
    cfg = load_gsc_config()
    effective_site_url = site_url or cfg.site_url
    service = build_service(cfg)

    body = {
        "inspectionUrl": inspection_url,
        "siteUrl": effective_site_url,
        "languageCode": language_code,
    }

    try:
        response = service.urlInspection().index().inspect(body=body).execute()
    except Exception as e:
        error_msg = str(e)
        if "403" in error_msg or "permission" in error_msg.lower():
            print(
                f"FAIL: Permission denied for URL Inspection on {effective_site_url}. "
                f"Ensure the GSC property is verified and the OAuth account has access.",
                file=sys.stderr,
            )
        elif "quota" in error_msg.lower() or "429" in error_msg:
            print(
                f"FAIL: URL Inspection API quota exceeded. Try again later.",
                file=sys.stderr,
            )
        raise

    return response


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python url_inspection_loader.py <URL> [site_url]")
        sys.exit(1)

    url = sys.argv[1]
    site = sys.argv[2] if len(sys.argv) > 2 else None
    result = inspect_url(url, site_url=site)

    import json
    print(json.dumps(result, indent=2, ensure_ascii=False))
