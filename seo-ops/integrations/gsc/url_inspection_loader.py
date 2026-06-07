"""
url_inspection_loader.py — Thin loader for GSC URL Inspection API.

Reuses existing GSC auth from integrations/google_clients/config.py.
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

import os
import sys
from pathlib import Path

# Load .env.local before importing config
ENV_LOCAL = Path(__file__).resolve().parents[1] / ".env.local"
if ENV_LOCAL.is_file():
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

# Add parent so google_clients is importable
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from google_clients.config import load_gsc_config, GscConfig

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def _get_credentials(cfg: GscConfig) -> Credentials:
    """Load and refresh GSC OAuth credentials."""
    creds = None
    if cfg.token_json.is_file():
        creds = Credentials.from_authorized_user_file(str(cfg.token_json), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                str(cfg.oauth_client_json), SCOPES
            )
            creds = flow.run_local_server(port=0)
        cfg.token_json.parent.mkdir(parents=True, exist_ok=True)
        cfg.token_json.write_text(creds.to_json())
    return creds


def _build_service(cfg: GscConfig):
    return build("searchconsole", "v1", credentials=_get_credentials(cfg))


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
    service = _build_service(cfg)

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
