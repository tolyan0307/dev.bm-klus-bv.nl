"""
build_index_status.py — weekly indexing check (step of run_weekly_refresh.py).

URL Inspection for every URL in the live sitemap.xml: indexed or not (and why),
last Google crawl, Google-chosen vs declared canonical. Compares with the
previous run and writes data/processed/index_status_latest.json.

Read-only; URL Inspection quota is 2 000 calls a day per property, one run
uses one call per sitemap URL.

Usage (from seo-ops/):
    integrations/.venv/Scripts/python.exe analyzers/seo/build_index_status.py
"""

from __future__ import annotations

import json
import re
import sys
import threading
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SEO_OPS / "integrations"))
from google_clients.config import load_gsc_config  # noqa: E402
from google_clients.gsc_client import build_service  # noqa: E402

OUT = SEO_OPS / "data" / "processed" / "index_status_latest.json"
# An indexed page Google has not recrawled for this long may still show an outdated
# title / text in search (e.g. prices removed on 2026-09-04): candidate for
# "Request indexing" in Search Console (owner, about 10 URLs a day).
STALE_CRAWL_DAYS = 30
WORKERS = 4

_local = threading.local()


def sitemap_urls(site_url: str) -> list[str]:
    req = urllib.request.Request(f"{site_url.rstrip('/')}/sitemap.xml", headers={"User-Agent": "seo-ops index check"})
    xml = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
    return re.findall(r"<loc>\s*(.*?)\s*</loc>", xml)


def inspect(cfg, url: str, now: datetime) -> dict:
    if not hasattr(_local, "service"):
        _local.service = build_service(cfg)  # httplib2 is not thread-safe: one service per thread
    path = url.replace(cfg.site_url.rstrip("/"), "") or "/"
    try:
        body = {"inspectionUrl": url, "siteUrl": cfg.site_url, "languageCode": "en-US"}
        res = _local.service.urlInspection().index().inspect(body=body).execute()
    except Exception as e:  # one failed URL must not stop the check
        return {"path": path, "url": url, "error": str(e)[:300]}
    r = res.get("inspectionResult", {}).get("indexStatusResult", {})
    last_crawl = r.get("lastCrawlTime")
    days = (now - datetime.fromisoformat(last_crawl.replace("Z", "+00:00"))).days if last_crawl else None
    google_c, user_c = r.get("googleCanonical"), r.get("userCanonical")
    return {
        "path": path,
        "url": url,
        "indexed": r.get("verdict") == "PASS",
        "verdict": r.get("verdict"),
        "coverage_state": r.get("coverageState"),
        "indexing_state": r.get("indexingState"),
        "page_fetch_state": r.get("pageFetchState"),
        "robots_txt_state": r.get("robotsTxtState"),
        "last_crawl": last_crawl,
        "days_since_crawl": days,
        "google_canonical": google_c,
        "user_canonical": user_c,
        "canonical_mismatch": bool(google_c and user_c and google_c != user_c),
    }


def compare(previous: dict | None, rows: list[dict]) -> dict | None:
    if not previous:
        return None
    before = {r["path"]: r for r in previous.get("urls", []) if "error" not in r}
    now = {r["path"]: r for r in rows if "error" not in r}
    return {
        "previous_generated_at": previous.get("_generated_at"),
        "newly_not_indexed": sorted(p for p, r in now.items() if p in before and before[p]["indexed"] and not r["indexed"]),
        "newly_indexed": sorted(p for p, r in now.items() if p in before and not before[p]["indexed"] and r["indexed"]),
        "added_urls": sorted(set(now) - set(before)),
        "removed_urls": sorted(set(before) - set(now)),
    }


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    cfg = load_gsc_config()
    build_service(cfg)  # refresh the OAuth token once, before the worker threads read it
    now = datetime.now(timezone.utc)
    urls = sitemap_urls(cfg.site_url)

    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        rows = list(pool.map(lambda u: inspect(cfg, u, now), urls))
    rows.sort(key=lambda r: (r.get("indexed", True), r["path"]))

    previous = json.loads(OUT.read_text(encoding="utf-8")) if OUT.is_file() else None
    ok = [r for r in rows if "error" not in r]
    not_indexed = [r for r in ok if not r["indexed"]]
    stale = [r for r in ok if r["indexed"] and (r["days_since_crawl"] or 0) > STALE_CRAWL_DAYS]
    by_state: dict[str, int] = {}
    for r in not_indexed:
        by_state[r["coverage_state"] or "?"] = by_state.get(r["coverage_state"] or "?", 0) + 1

    snapshot = {
        "_generated_at": now.isoformat(timespec="seconds"),
        "site": cfg.site_url,
        "_definitions": {
            "indexed": "URL Inspection verdict PASS",
            "stale_crawl_days": STALE_CRAWL_DAYS,
            "source": "live sitemap.xml, URL Inspection API (languageCode en-US)",
        },
        "summary": {
            "urls": len(rows),
            "indexed": sum(1 for r in ok if r["indexed"]),
            "not_indexed": len(not_indexed),
            "not_indexed_by_state": by_state,
            "canonical_mismatch": sum(1 for r in ok if r["canonical_mismatch"]),
            "indexed_stale_crawl": len(stale),
            "errors": len(rows) - len(ok),
        },
        "changes_since_previous": compare(previous, rows),
        "urls": rows,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snapshot, ensure_ascii=False, indent=1), encoding="utf-8")

    s = snapshot["summary"]
    print(f"Index status {now.astimezone().date()}: {s['urls']} sitemap URLs | indexed {s['indexed']} | not indexed {s['not_indexed']} "
          f"| canonical mismatch {s['canonical_mismatch']} | indexed, not crawled {STALE_CRAWL_DAYS}+ days: {s['indexed_stale_crawl']} "
          f"| errors {s['errors']}")
    ch = snapshot["changes_since_previous"]
    if ch:
        print(f"Since {ch['previous_generated_at']}: newly not indexed {ch['newly_not_indexed'] or '-'}; "
              f"newly indexed {ch['newly_indexed'] or '-'}; added {ch['added_urls'] or '-'}; removed {ch['removed_urls'] or '-'}")
    for r in not_indexed:
        print(f"  NOT INDEXED  {r['path']:62} {r['coverage_state']} (last crawl {(r['last_crawl'] or '-')[:10]})")
    for r in ok:
        if r["canonical_mismatch"]:
            print(f"  CANONICAL    {r['path']:62} Google chose {r['google_canonical']}")
    for r in sorted(stale, key=lambda r: -r["days_since_crawl"]):
        print(f"  OLD COPY     {r['path']:62} last crawl {r['last_crawl'][:10]} ({r['days_since_crawl']} days)")
    for r in rows:
        if "error" in r:
            print(f"  ERROR        {r['path']:62} {r['error'][:120]}")
    print(f"Saved {OUT.relative_to(SEO_OPS)}")
    return 1 if s["errors"] else 0


if __name__ == "__main__":
    sys.exit(main())
