"""
.tmp_dataforseo_serp_pull.py — one-shot SERP pulls for 16 queries
Read-only. NL/NL desktop, depth=100.
Saves:
  raw    -> seo-ops/snapshots/raw/dataforseo/serp_2026-05-10/<slug>.json
  norm   -> seo-ops/outputs/seo_audit_2026-05-10/serp_normalized_2026-05-10.json
"""
from __future__ import annotations
import json
import sys
import time
import re
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "integrations"))

from dataforseo.serp_google import SerpGoogle
from dataforseo.cost_tracker import record_task_cost

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "snapshots" / "raw" / "dataforseo" / "serp_2026-05-10"
RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_DIR = ROOT / "outputs" / "seo_audit_2026-05-10"
OUT_DIR.mkdir(parents=True, exist_ok=True)

QUERIES = [
    "gevelisolatie kosten",
    "kosten gevelisolatie",
    "wat kost gevelisolatie",
    "buitenmuur stucen",
    "buitenmuur stucen nadelen",
    "buitenmuur stucen kosten",
    "gevelisolatie rotterdam",
    "buitengevelisolatie rotterdam",
    "gevelisolatie breda",
    "gevelisolatie zoetermeer",
    "gevelisolatie leiden",
    "gevelisolatie den haag",
    "sausklaar stucen",
    "behangklaar stucen",
    "gevel sierpleister",
    "gevel schilderen kosten",
]

BM_DOMAIN = "bm-klus-bv.nl"


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def normalize_serp(query: str, raw: dict) -> dict:
    """Extract slim normalized SERP from DataForSEO advanced response."""
    out = {
        "query": query,
        "raw_status_code": raw.get("status_code"),
        "raw_cost": raw.get("cost"),
        "task": None,
        "se_domain": None,
        "location_code": None,
        "language_code": None,
        "datetime": None,
        "spell": None,
        "items_count": 0,
        "items": [],          # all SERP items in order (organic + features)
        "organic_top10": [],  # only organic, top 10
        "organic_top20": [],
        "organic_full": [],   # up to depth
        "bm_appearances": [],
        "features": {
            "ads_top": False,
            "ads_bottom": False,
            "local_pack": False,
            "people_also_ask": False,
            "ai_overview": False,
            "maps": False,
            "shopping": False,
            "images": False,
            "video": False,
            "knowledge_graph": False,
            "featured_snippet": False,
            "site_links": [],
            "related_searches": [],
        },
        "top10_domains": [],
    }
    tasks = raw.get("tasks") or []
    if not tasks:
        out["error"] = "no tasks in response"
        return out
    t = tasks[0]
    out["task"] = {"id": t.get("id"), "status_code": t.get("status_code"), "status_message": t.get("status_message"), "cost": t.get("cost")}
    results = t.get("result") or []
    if not results:
        out["error"] = "no result in task"
        return out
    r = results[0]
    out["se_domain"] = r.get("se_domain")
    out["location_code"] = r.get("location_code")
    out["language_code"] = r.get("language_code")
    out["datetime"] = r.get("datetime")
    out["spell"] = r.get("spell")
    items = r.get("items") or []
    out["items_count"] = len(items)
    organic_rank = 0
    for it in items:
        item_type = it.get("type")
        rank_abs = it.get("rank_absolute")
        rank_grp = it.get("rank_group")
        slim = {
            "type": item_type,
            "rank_absolute": rank_abs,
            "rank_group": rank_grp,
            "domain": it.get("domain"),
            "url": it.get("url"),
            "title": it.get("title"),
            "description": it.get("description") or it.get("snippet"),
            "is_image": it.get("is_image"),
            "is_video": it.get("is_video"),
        }
        out["items"].append(slim)
        # Feature flags
        if item_type == "paid":
            if rank_abs and rank_abs <= 5:
                out["features"]["ads_top"] = True
            else:
                out["features"]["ads_bottom"] = True
        elif item_type == "local_pack":
            out["features"]["local_pack"] = True
        elif item_type == "people_also_ask":
            out["features"]["people_also_ask"] = True
        elif item_type in ("knowledge_graph", "knowledge_graph_description_item"):
            out["features"]["knowledge_graph"] = True
        elif item_type == "featured_snippet":
            out["features"]["featured_snippet"] = True
        elif item_type in ("ai_overview", "ai_overview_element"):
            out["features"]["ai_overview"] = True
        elif item_type == "map":
            out["features"]["maps"] = True
        elif item_type == "shopping":
            out["features"]["shopping"] = True
        elif item_type in ("images", "image"):
            out["features"]["images"] = True
        elif item_type == "video":
            out["features"]["video"] = True
        elif item_type == "related_searches":
            out["features"]["related_searches"] = it.get("items", []) if isinstance(it.get("items"), list) else []

        # Organic items collection
        if item_type == "organic":
            organic_rank += 1
            entry = {
                "organic_rank": organic_rank,
                "rank_absolute": rank_abs,
                "rank_group": rank_grp,
                "domain": it.get("domain"),
                "url": it.get("url"),
                "title": it.get("title"),
                "description": it.get("description") or it.get("snippet"),
                "breadcrumb": it.get("breadcrumb"),
            }
            out["organic_full"].append(entry)
            if organic_rank <= 10:
                out["organic_top10"].append(entry)
            if organic_rank <= 20:
                out["organic_top20"].append(entry)
            if it.get("domain") and BM_DOMAIN in (it.get("domain") or ""):
                out["bm_appearances"].append(entry)

    out["top10_domains"] = [e["domain"] for e in out["organic_top10"]]
    return out


def main():
    serp = SerpGoogle()
    normalized = {}
    print(f"DataForSEO SERP pull — {len(QUERIES)} queries, NL/NL desktop, depth=100")
    print(f"Started: {datetime.now(timezone.utc).isoformat()}")

    total_cost = 0.0
    for i, q in enumerate(QUERIES, 1):
        slug = slugify(q)
        raw_path = RAW_DIR / f"{slug}.json"
        print(f"\n[{i}/{len(QUERIES)}] '{q}' ...")
        try:
            resp = serp.organic_live(
                keyword=q,
                location_code=2528,  # Netherlands
                language_code="nl",
                depth=100,
                device="desktop",
            )
            raw_path.write_text(json.dumps(resp, indent=2, ensure_ascii=False), encoding="utf-8")
            cost = resp.get("cost") or 0.0
            total_cost += cost

            try:
                record_task_cost(
                    analyzer="serp_loss_audit_2026-05-10",
                    keyword_or_scope=q,
                    api_response=resp,
                    estimated_cost_usd=0.002,
                )
            except Exception:
                pass

            norm = normalize_serp(q, resp)
            normalized[q] = norm

            bm = norm["bm_appearances"]
            top_doms = norm["top10_domains"][:5]
            feats = [k for k, v in norm["features"].items() if v and not isinstance(v, list)]
            print(f"   status: {norm['raw_status_code']}, cost: ${cost:.5f}, items: {norm['items_count']}, top-5 domains: {top_doms}")
            if bm:
                for b in bm:
                    print(f"   BM @ #{b['organic_rank']} (abs {b['rank_absolute']}): {b['url']}")
            else:
                print(f"   BM NOT FOUND in top {len(norm['organic_full'])}")
            print(f"   features: {feats}")
            time.sleep(0.5)
        except Exception as e:
            print(f"   ERROR: {e}")
            normalized[q] = {"query": q, "error": str(e)}

    out_path = OUT_DIR / "serp_normalized_2026-05-10.json"
    out_path.write_text(json.dumps({
        "_meta": {
            "generated_at_utc": datetime.now(timezone.utc).isoformat(),
            "queries_count": len(QUERIES),
            "location_code": 2528,
            "language_code": "nl",
            "depth": 100,
            "device": "desktop",
            "total_cost_usd": round(total_cost, 5),
            "bm_domain": BM_DOMAIN,
        },
        "by_query": normalized,
    }, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[OK] Total cost: ${total_cost:.5f}")
    print(f"[OK] Normalized -> {out_path}")
    print(f"[OK] Raw -> {RAW_DIR}/")


if __name__ == "__main__":
    main()
