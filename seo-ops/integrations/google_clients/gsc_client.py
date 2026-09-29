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
from .definitions import GSC_LAG_DAYS, is_brand_query, normalize_page_url, require_interactive_auth

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
            require_interactive_auth("GSC")
            flow = InstalledAppFlow.from_client_secrets_file(
                str(cfg.oauth_client_json), SCOPES
            )
            creds = flow.run_local_server(port=0)

        cfg.token_json.parent.mkdir(parents=True, exist_ok=True)
        cfg.token_json.write_text(creds.to_json())

    return creds


def build_service(cfg: GscConfig):
    """Search Console API service; the one GSC auth path for every collector."""
    creds = _get_credentials(cfg)
    return build("searchconsole", "v1", credentials=creds)


def _date_range(last_days: int) -> tuple[str, str]:
    """Return (start, end) ISO dates for the last N days with final GSC data."""
    end = date.today() - timedelta(days=GSC_LAG_DAYS)
    start = end - timedelta(days=last_days - 1)
    return start.isoformat(), end.isoformat()


def _aggregate_pages(api_rows: list[dict]) -> dict[str, dict]:
    """
    Sum GSC page rows per normalised URL: query-string variants such as the
    GBP link '/?utm_source=google&...' are merged into their base page.
    Position is the impression-weighted average of the merged rows.
    """
    agg: dict[str, dict] = {}
    for r in api_rows:
        raw = r["keys"][0]
        page = normalize_page_url(raw)
        a = agg.setdefault(page, {"clicks": 0, "impressions": 0, "pos_x_impr": 0.0, "variants": set()})
        impr = r.get("impressions", 0)
        a["clicks"] += r.get("clicks", 0)
        a["impressions"] += impr
        a["pos_x_impr"] += r.get("position", 0) * impr
        if raw != page:
            a["variants"].add(raw)

    out: dict[str, dict] = {}
    for page, a in agg.items():
        impr = a["impressions"]
        metrics = {
            "clicks": a["clicks"],
            "impressions": impr,
            "ctr": round(a["clicks"] / impr, 4) if impr else 0,
            "position": round(a["pos_x_impr"] / impr, 1) if impr else 0,
        }
        if a["variants"]:
            metrics["merged_variants"] = sorted(a["variants"])
        out[page] = metrics
    return out


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
    """Top pages by clicks over the last 28 days with final data (URL variants merged)."""
    service = build_service(cfg)
    start, end = _date_range(28)

    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 1000,
    }

    resp = service.searchanalytics().query(siteUrl=cfg.site_url, body=body).execute()
    pages = _aggregate_pages(resp.get("rows", []))
    ranked = sorted(pages.items(), key=lambda kv: (kv[1]["clicks"], kv[1]["impressions"]), reverse=True)
    rows = [{"keys": [page], **m} for page, m in ranked[:row_limit]]

    return {
        "date_range": {"start": start, "end": end},
        "row_count": len(rows),
        "rows": rows,
    }


def query_top_queries_last_28d(cfg: GscConfig, row_limit: int = 50) -> dict:
    """
    Top queries by impressions over the last 28 days with final data.
    Sorting by impressions (not clicks) surfaces visible queries without
    clicks; brand queries are flagged with is_brand.
    """
    service = build_service(cfg)
    start, end = _date_range(28)

    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": 1000,
    }

    resp = service.searchanalytics().query(siteUrl=cfg.site_url, body=body).execute()
    rows = _parse_rows(resp.get("rows", []))
    rows.sort(key=lambda r: (r["impressions"], r["clicks"]), reverse=True)
    rows = rows[:row_limit]
    for r in rows:
        r["is_brand"] = is_brand_query(r["keys"][0] if r["keys"] else "")

    return {
        "date_range": {"start": start, "end": end},
        "sorted_by": "impressions",
        "row_count": len(rows),
        "rows": rows,
    }


def query_pages_comparison(
    cfg: GscConfig,
    last_days: int = 28,
    previous_days: int = 28,
    row_limit: int = 1000,
) -> dict:
    """
    Compare page performance: current period vs previous period.
    Both windows end GSC_LAG_DAYS ago so the current one is not cut short by
    unfinished data. URL variants with query strings are merged into their page.
    Returns rows with current + previous metrics and deltas.
    """
    service = build_service(cfg)

    # Current period
    curr_end = date.today() - timedelta(days=GSC_LAG_DAYS)
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
        return _aggregate_pages(resp.get("rows", []))

    current = _fetch(curr_start, curr_end)
    previous = _fetch(prev_start, prev_end)

    # Merge
    all_pages = sorted(set(current) | set(previous))
    merged = []

    empty = {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0}

    for page in all_pages:
        c = dict(current.get(page, empty))
        p = dict(previous.get(page, empty))
        variants = sorted(set(c.pop("merged_variants", [])) | set(p.pop("merged_variants", [])))
        row = {
            "page": page,
            "current": c,
            "previous": p,
            "delta_clicks": c["clicks"] - p["clicks"],
            "delta_impressions": c["impressions"] - p["impressions"],
            "delta_position": round(c["position"] - p["position"], 1),
        }
        if variants:
            row["merged_variants"] = variants
        merged.append(row)

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
