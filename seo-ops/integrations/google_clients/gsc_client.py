"""
Read-only Google Search Console client.

All functions return plain Python dicts/lists — no pandas.
"""

from datetime import date, timedelta
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from .config import GscConfig

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def _get_credentials(cfg: GscConfig) -> Credentials:
    """Load, refresh, or run OAuth Desktop flow. Saves token on disk."""
    creds = None

    if cfg.token_json.is_file():
        creds = Credentials.from_authorized_user_file(str(cfg.token_json), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception:
                creds = None

        if not creds:
            flow = InstalledAppFlow.from_client_secrets_file(
                str(cfg.oauth_client_json), SCOPES
            )
            creds = flow.run_local_server(port=0)

        cfg.token_json.parent.mkdir(parents=True, exist_ok=True)
        cfg.token_json.write_text(creds.to_json())

    return creds


def _build_service(cfg: GscConfig):
    creds = _get_credentials(cfg)
    return build("searchconsole", "v1", credentials=creds)


def _date_range(last_days: int) -> tuple[str, str]:
    """Return (start, end) ISO dates for the last N complete days."""
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=last_days - 1)
    return start.isoformat(), end.isoformat()


def _parse_rows(rows: list[dict]) -> list[dict]:
    """Normalise API rows into flat dicts."""
    out = []
    for r in rows:
        out.append({
            "keys": r.get("keys", []),
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr": round(r.get("ctr", 0), 4),
            "position": round(r.get("position", 0), 1),
        })
    return out


# --- Public functions ---------------------------------------------------


def query_top_pages_last_28d(cfg: GscConfig, row_limit: int = 20) -> dict:
    """Top pages by clicks over last 28 complete days."""
    service = _build_service(cfg)
    start, end = _date_range(28)

    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": row_limit,
    }

    resp = service.searchanalytics().query(siteUrl=cfg.site_url, body=body).execute()
    rows = _parse_rows(resp.get("rows", []))

    return {
        "date_range": {"start": start, "end": end},
        "row_count": len(rows),
        "rows": rows,
    }


def query_top_queries_last_28d(cfg: GscConfig, row_limit: int = 20) -> dict:
    """Top queries by clicks over last 28 complete days."""
    service = _build_service(cfg)
    start, end = _date_range(28)

    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": row_limit,
    }

    resp = service.searchanalytics().query(siteUrl=cfg.site_url, body=body).execute()
    rows = _parse_rows(resp.get("rows", []))

    return {
        "date_range": {"start": start, "end": end},
        "row_count": len(rows),
        "rows": rows,
    }


def query_pages_comparison(
    cfg: GscConfig,
    last_days: int = 28,
    previous_days: int = 28,
    row_limit: int = 50,
) -> dict:
    """
    Compare page performance: current period vs previous period.
    Returns rows with current + previous metrics and deltas.
    """
    service = _build_service(cfg)

    # Current period
    curr_end = date.today() - timedelta(days=1)
    curr_start = curr_end - timedelta(days=last_days - 1)

    # Previous period (immediately before current)
    prev_end = curr_start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=previous_days - 1)

    def _fetch(start_d: date, end_d: date) -> dict[str, dict]:
        body = {
            "startDate": start_d.isoformat(),
            "endDate": end_d.isoformat(),
            "dimensions": ["page"],
            "rowLimit": row_limit,
        }
        resp = (
            service.searchanalytics()
            .query(siteUrl=cfg.site_url, body=body)
            .execute()
        )
        result = {}
        for r in resp.get("rows", []):
            page = r["keys"][0]
            result[page] = {
                "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0),
                "ctr": round(r.get("ctr", 0), 4),
                "position": round(r.get("position", 0), 1),
            }
        return result

    current = _fetch(curr_start, curr_end)
    previous = _fetch(prev_start, prev_end)

    # Merge
    all_pages = sorted(set(current) | set(previous))
    merged = []

    empty = {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0}

    for page in all_pages:
        c = current.get(page, empty)
        p = previous.get(page, empty)
        merged.append({
            "page": page,
            "current": c,
            "previous": p,
            "delta_clicks": c["clicks"] - p["clicks"],
            "delta_impressions": c["impressions"] - p["impressions"],
            "delta_position": round(c["position"] - p["position"], 1),
        })

    # Sort by current clicks descending
    merged.sort(key=lambda x: x["current"]["clicks"], reverse=True)

    return {
        "current_range": {
            "start": curr_start.isoformat(),
            "end": curr_end.isoformat(),
        },
        "previous_range": {
            "start": prev_start.isoformat(),
            "end": prev_end.isoformat(),
        },
        "row_count": len(merged),
        "rows": merged,
    }
