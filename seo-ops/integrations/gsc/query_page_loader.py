"""
query_page_loader.py — Pull query+page level data from Google Search Console.

Reuses existing GSC auth from integrations/google_clients/config.py.
Returns raw API rows as list[dict].

Usage:
    from integrations.gsc.query_page_loader import pull_query_page_data
    rows = pull_query_page_data(days=90, row_limit=25000)
"""

from __future__ import annotations

import os
import sys
from datetime import date, timedelta
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
API_ROW_LIMIT = 25000  # GSC API max per request


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


def pull_query_page_data(
    days: int = 90,
    row_limit: int = API_ROW_LIMIT,
    start_row: int = 0,
) -> dict:
    """
    Pull query+page rows from GSC Search Analytics API for the last N days.

    Returns dict with:
        - site_url
        - date_range: {start, end}
        - total_rows
        - rows: list of {query, page, clicks, impressions, ctr, position}
    """
    cfg = load_gsc_config()
    service = _build_service(cfg)

    end_date = date.today() - timedelta(days=3)  # GSC data has 2-3 day lag
    start_date = end_date - timedelta(days=days - 1)

    all_rows: list[dict] = []
    current_start = start_row

    while True:
        body = {
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "dimensions": ["query", "page"],
            "rowLimit": min(row_limit - len(all_rows), API_ROW_LIMIT),
            "startRow": current_start,
        }

        resp = service.searchanalytics().query(
            siteUrl=cfg.site_url, body=body
        ).execute()

        api_rows = resp.get("rows", [])
        if not api_rows:
            break

        for r in api_rows:
            keys = r.get("keys", [])
            all_rows.append({
                "query": keys[0] if len(keys) > 0 else "",
                "page": keys[1] if len(keys) > 1 else "",
                "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0),
                "ctr": round(r.get("ctr", 0), 6),
                "position": round(r.get("position", 0), 2),
            })

        current_start += len(api_rows)

        # Stop if we got fewer rows than requested (no more data)
        if len(api_rows) < API_ROW_LIMIT:
            break

        # Safety cap
        if len(all_rows) >= row_limit:
            break

    return {
        "site_url": cfg.site_url,
        "date_range": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat(),
        },
        "total_rows": len(all_rows),
        "rows": all_rows,
    }


if __name__ == "__main__":
    result = pull_query_page_data(days=90)
    print(f"Pulled {result['total_rows']} query-page rows")
    print(f"Date range: {result['date_range']['start']} to {result['date_range']['end']}")
    if result["rows"]:
        print(f"Sample: {result['rows'][0]}")
