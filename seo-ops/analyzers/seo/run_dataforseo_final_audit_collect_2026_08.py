"""
run_dataforseo_final_audit_collect_2026_08.py

One-shot data collection for the final competitive SEO plan (Aug 2026).
Follows the interim decision pack (2026-08-15) which deferred the final plan
until: search volumes, competitor domains (Labs), backlink summary,
Rotterdam local pack, GBP data were collected.

Stages (each can be skipped with --skip <stage>):
    volume      Google Ads search volume for cluster keywords (NL, nl)
    labs        DataForSEO Labs: competitors_domain, ranked_keywords (own),
                serp_competitors (cluster keyword set), bulk_traffic_estimation
    backlinks   Backlinks summary for own domain + competitor shortlist
    serp_local  SERP advanced, Rotterdam location, incl. local_pack items
    gbp         Business Data: my_business_info for own brand

Usage (from seo-ops/):
    integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_final_audit_collect_2026_08.py
    ... --skip backlinks --skip gbp

Outputs:
    snapshots/raw/dataforseo/final_audit_2026-08/<stage>.json  (raw API responses)
    snapshots/normalized/dataforseo/final_audit_2026-08_summary.json
"""

from __future__ import annotations

import argparse
import io
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SEO_OPS / "integrations"))

from dataforseo.client import DataForSEOClient  # noqa: E402
from dataforseo.cost_tracker import record_task_cost  # noqa: E402

RAW_DIR = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "final_audit_2026-08"
NORM_OUT = SEO_OPS / "snapshots" / "normalized" / "dataforseo" / "final_audit_2026-08_summary.json"
ANALYZER = "run_dataforseo_final_audit_collect_2026_08"

NL = 2528
LANG = "nl"
OWN = "bm-klus-bv.nl"

CLUSTER_KEYWORDS: dict[str, list[str]] = {
    "gevelisolatie": [
        "gevelisolatie", "buitengevelisolatie", "buitenmuur isoleren", "isoleren van buitenmuren",
        "gevelisolatie buitenkant", "gevel isoleren", "buitengevel isoleren", "etics", "etics gevelisolatie",
        "gevelisolatie kosten", "kosten gevelisolatie", "gevelisolatie prijs per m2", "gevelisolatie subsidie",
        "gevelisolatie steenstrips", "gevelisolatie afwerking", "gevelisolatie materialen", "gevelisolatie rc waarde",
        "buitenmuur isoleren kosten", "buitengevelisolatie kosten",
    ],
    "gevelisolatie_geo": [
        "gevelisolatie rotterdam", "gevelisolatie den haag", "gevelisolatie delft", "gevelisolatie dordrecht",
        "gevelisolatie zoetermeer", "gevelisolatie leiden", "gevelisolatie schiedam", "gevelisolatie vlaardingen",
        "gevelisolatie capelle aan den ijssel", "gevelisolatie spijkenisse", "gevelisolatie barendrecht",
        "gevelisolatie gouda", "gevelisolatie breda", "gevelisolatie almere", "gevelisolatie utrecht",
        "gevelisolatie amsterdam", "gevelisolatie haarlem", "isolatiebedrijf rotterdam", "buitenmuur isoleren rotterdam",
    ],
    "muren_stucen": [
        "muren stucen", "sausklaar stucen", "sausklaar stucwerk", "behangklaar stucen", "behangklaar stucwerk",
        "sausklaar", "behangklaar", "glad stucwerk", "muren stucen kosten", "stucen prijs per m2",
        "stukadoor rotterdam", "stucadoor rotterdam", "stukadoor", "muren stucen rotterdam", "wanden stucen",
        "plafond stucen", "sausklaar maken", "behangklaar maken",
    ],
    "buiten_stucwerk": [
        "buiten stucwerk", "buitenmuur stucen", "gevel stucen", "buitenstucwerk", "gevelstuc", "cementpleister",
        "betonstuc", "gevel stucen kosten", "buiten stucwerk prijs per m2", "buiten stucwerk rotterdam",
        "gevel stucen rotterdam", "buitengevel stucen", "gevelstucwerk",
    ],
    "sierpleister": [
        "sierpleister", "spachtelputz", "crepi", "sierpleister buiten", "gevelpleister", "sierpleister kosten",
        "sierpleister rotterdam", "sierpleister prijs per m2", "spachtelputz buiten",
    ],
    "gevel_schilderen": [
        "gevel schilderen", "buitenmuur verven", "gevel verven", "gevel schilderen kosten", "keimen", "gevel keimen",
        "keimen kosten", "keimen gevel kosten", "keimwerk", "keimwerk prijs m2", "keimverf", "keimen prijs",
        "gevel schilderen rotterdam", "gevel schilderen prijs per m2", "buitenmuur schilderen",
    ],
    "gevelrenovatie": [
        "gevelrenovatie", "gevelrenovatie rotterdam", "gevelrenovatie kosten", "gevelrenovatie met folie",
        "gevelfolie", "gevel renoveren",
    ],
}

# Contractors / directories seen in the 2026-08-15 SERP snapshot (not authority platforms)
COMPETITOR_DOMAINS = [
    "takkenkamp.com", "plusisolatie.nl", "munnekestukadoors.nl", "vanginkelstukadoors.nl",
    "metsel-gigant.nl", "stucadoorsbedrijfdevries.nl", "rotterdamse-stukadoor.nl", "si-isolatie.nl",
    "pluimers.nl", "jandeisolatieman.nl", "stuc-gigant.nl", "vanklassestukadoors.nl",
    "stukadoor-ddziko.nl", "cpgroenendijk.nl", "batouz.nl", "isolatiespecialist.nl",
    "gevelrenovatie-info.nl", "stucwerk-info.nl",
]

LOCAL_KEYWORDS = [
    "stukadoor rotterdam", "gevelisolatie rotterdam", "gevel schilderen rotterdam",
    "buitenmuur stucen rotterdam", "sierpleister rotterdam", "gevelrenovatie rotterdam",
    "isolatiebedrijf rotterdam", "gevelisolatie", "buitenmuur isoleren", "gevel stucen",
    "buiten stucwerk", "gevelisolatie bedrijf",
]


def _save(name: str, data) -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    (RAW_DIR / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def _load(name: str):
    p = RAW_DIR / f"{name}.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.is_file() else None


def _tasks_ok(resp: dict) -> list[dict]:
    out = []
    for t in resp.get("tasks", []) or []:
        if t.get("status_code") == 20000:
            out.append(t)
        else:
            print(f"  WARN task {t.get('id')}: {t.get('status_code')} {t.get('status_message')}")
    return out


def _cost(resp: dict) -> float:
    return float(resp.get("cost") or 0)


# ---------------------------------------------------------------------------
def stage_volume(c: DataForSEOClient) -> dict:
    kws = sorted({k for lst in CLUSTER_KEYWORDS.values() for k in lst})
    print(f"[volume] {len(kws)} keywords")
    resp = c.post("/keywords_data/google_ads/search_volume/live",
                  [{"location_code": NL, "language_code": LANG, "keywords": kws}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="google_ads_search_volume", api_response=resp)
    _save("volume", resp)
    print(f"  cost ${_cost(resp):.4f}")
    return resp


def stage_labs(c: DataForSEOClient) -> dict:
    out = {}
    print("[labs] competitors_domain")
    r = c.post("/dataforseo_labs/google/competitors_domain/live",
               [{"target": OWN, "location_code": NL, "language_code": LANG, "limit": 40,
                 "exclude_top_domains": True, "intersecting_domains": None}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="labs_competitors_domain", api_response=r)
    out["competitors_domain"] = r; print(f"  cost ${_cost(r):.4f}")

    print("[labs] ranked_keywords own")
    r = c.post("/dataforseo_labs/google/ranked_keywords/live",
               [{"target": OWN, "location_code": NL, "language_code": LANG, "limit": 300,
                 "order_by": ["keyword_data.keyword_info.search_volume,desc"]}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="labs_ranked_keywords_own", api_response=r)
    out["ranked_keywords_own"] = r; print(f"  cost ${_cost(r):.4f}")

    print("[labs] serp_competitors (cluster keyword set)")
    kws = [k for cl in ("gevelisolatie", "buiten_stucwerk", "sierpleister", "gevel_schilderen", "muren_stucen")
           for k in CLUSTER_KEYWORDS[cl]][:200]
    r = c.post("/dataforseo_labs/google/serp_competitors/live",
               [{"keywords": kws, "location_code": NL, "language_code": LANG, "limit": 60}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="labs_serp_competitors", api_response=r)
    out["serp_competitors"] = r; print(f"  cost ${_cost(r):.4f}")

    print("[labs] bulk_traffic_estimation")
    r = c.post("/dataforseo_labs/google/bulk_traffic_estimation/live",
               [{"targets": [OWN] + COMPETITOR_DOMAINS, "location_code": NL, "language_code": LANG}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="labs_bulk_traffic", api_response=r)
    out["bulk_traffic"] = r; print(f"  cost ${_cost(r):.4f}")

    print("[labs] domain_rank_overview own")
    r = c.post("/dataforseo_labs/google/domain_rank_overview/live",
               [{"target": OWN, "location_code": NL, "language_code": LANG}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="labs_domain_rank_overview", api_response=r)
    out["domain_rank_overview_own"] = r; print(f"  cost ${_cost(r):.4f}")

    _save("labs", out)
    return out


def stage_backlinks(c: DataForSEOClient) -> dict:
    out = {}
    targets = [OWN] + COMPETITOR_DOMAINS
    print(f"[backlinks] bulk_ranks + bulk_referring_domains + bulk_backlinks for {len(targets)} domains")
    for ep, key in (("/backlinks/bulk_ranks/live", "bulk_ranks"),
                    ("/backlinks/bulk_referring_domains/live", "bulk_referring_domains"),
                    ("/backlinks/bulk_backlinks/live", "bulk_backlinks")):
        r = c.post(ep, [{"targets": targets}])
        record_task_cost(analyzer=ANALYZER, keyword_or_scope=f"backlinks_{key}", api_response=r)
        out[key] = r; print(f"  {key} cost ${_cost(r):.4f} status {r.get('status_code')}")
    print("[backlinks] summary own")
    r = c.post("/backlinks/summary/live", [{"target": OWN, "internal_list_limit": 10,
                                            "include_subdomains": True, "backlinks_status_type": "live"}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="backlinks_summary_own", api_response=r)
    out["summary_own"] = r; print(f"  cost ${_cost(r):.4f}")
    print("[backlinks] referring_domains own")
    r = c.post("/backlinks/referring_domains/live", [{"target": OWN, "limit": 100, "backlinks_status_type": "live",
                                                      "order_by": ["rank,desc"]}])
    record_task_cost(analyzer=ANALYZER, keyword_or_scope="backlinks_refdomains_own", api_response=r)
    out["referring_domains_own"] = r; print(f"  cost ${_cost(r):.4f}")
    _save("backlinks", out)
    return out


def _rotterdam_location(c: DataForSEOClient) -> int:
    cached = _load("locations_nl")
    if cached is None:
        cached = c.get("/serp/google/locations/NL")
        _save("locations_nl", cached)
    for t in cached.get("tasks", []):
        for loc in t.get("result", []) or []:
            if loc.get("location_name", "").startswith("Rotterdam,") and loc.get("location_type") == "City":
                return int(loc["location_code"])
    raise SystemExit("Rotterdam location code not found")


def stage_serp_local(c: DataForSEOClient) -> dict:
    loc = _rotterdam_location(c)
    print(f"[serp_local] Rotterdam location_code={loc}, {len(LOCAL_KEYWORDS)} keywords")
    out = {"location_code": loc, "keywords": {}}
    for kw in LOCAL_KEYWORDS:
        r = c.post("/serp/google/organic/live/advanced",
                   [{"keyword": kw, "location_code": loc, "language_code": LANG, "depth": 20, "device": "desktop",
                     "load_async_ai_overview": False}])
        record_task_cost(analyzer=ANALYZER, keyword_or_scope=f"serp_rotterdam:{kw}", api_response=r)
        out["keywords"][kw] = r
        print(f"  {kw}: ${_cost(r):.4f}")
        time.sleep(0.3)
    _save("serp_local", out)
    return out


def stage_gbp(c: DataForSEOClient) -> dict:
    loc = _rotterdam_location(c)
    out = {}
    for kw in ("BM Klus BV", "BM Klus"):
        print(f"[gbp] my_business_info '{kw}'")
        r = c.post("/business_data/google/my_business_info/live",
                   [{"keyword": kw, "location_code": loc, "language_code": LANG}])
        record_task_cost(analyzer=ANALYZER, keyword_or_scope=f"gbp:{kw}", api_response=r)
        out[kw] = r; print(f"  cost ${_cost(r):.4f} status {r.get('status_code')}")
    _save("gbp", out)
    return out


# ---------------------------------------------------------------------------
def summarize() -> dict:
    s: dict = {"_generated_at": datetime.now(timezone.utc).isoformat(), "stages": {}}
    v = _load("volume")
    if v:
        rows = {}
        for t in _tasks_ok(v):
            for it in t.get("result") or []:
                rows[it["keyword"]] = {"sv": it.get("search_volume"), "cpc": it.get("cpc"),
                                       "comp": it.get("competition"), "monthly": it.get("monthly_searches")}
        s["stages"]["volume"] = {cl: {k: rows.get(k) for k in lst} for cl, lst in CLUSTER_KEYWORDS.items()}
    labs = _load("labs")
    if labs:
        L = {}
        r = labs.get("competitors_domain", {})
        L["competitors_domain"] = [
            {"domain": i.get("domain"), "avg_pos": i.get("avg_position"), "intersections": i.get("intersections"),
             "etv": (i.get("full_domain_metrics") or {}).get("organic", {}).get("etv"),
             "count": (i.get("full_domain_metrics") or {}).get("organic", {}).get("count")}
            for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        r = labs.get("ranked_keywords_own", {})
        L["ranked_keywords_own"] = [
            {"kw": i["keyword_data"]["keyword"], "sv": i["keyword_data"].get("keyword_info", {}).get("search_volume"),
             "pos": (i.get("ranked_serp_element") or {}).get("serp_item", {}).get("rank_group"),
             "url": (i.get("ranked_serp_element") or {}).get("serp_item", {}).get("url"),
             "etv": (i.get("ranked_serp_element") or {}).get("serp_item", {}).get("etv")}
            for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        r = labs.get("serp_competitors", {})
        L["serp_competitors"] = [
            {"domain": i.get("domain"), "avg_pos": i.get("avg_position"), "median_pos": i.get("median_position"),
             "rating": i.get("rating"), "etv": i.get("etv"), "keywords_count": i.get("keywords_count"),
             "visibility": i.get("visibility")}
            for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        r = labs.get("bulk_traffic", {})
        L["bulk_traffic"] = [
            {"target": i.get("target"), "etv": (i.get("metrics") or {}).get("organic", {}).get("etv"),
             "count": (i.get("metrics") or {}).get("organic", {}).get("count")}
            for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        r = labs.get("domain_rank_overview_own", {})
        L["domain_rank_overview_own"] = [i.get("metrics") for t in _tasks_ok(r) for res in (t.get("result") or [])
                                         for i in (res.get("items") or [])]
        s["stages"]["labs"] = L
    b = _load("backlinks")
    if b:
        B = {}
        for key in ("bulk_ranks", "bulk_referring_domains", "bulk_backlinks"):
            r = b.get(key, {})
            B[key] = [i for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        r = b.get("summary_own", {})
        B["summary_own"] = [res for t in _tasks_ok(r) for res in (t.get("result") or [])]
        r = b.get("referring_domains_own", {})
        B["referring_domains_own"] = [
            {"domain": i.get("domain"), "rank": i.get("rank"), "backlinks": i.get("backlinks"),
             "first_seen": i.get("first_seen"), "dofollow": (i.get("referring_links_attributes") or {})}
            for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        s["stages"]["backlinks"] = B
    sl = _load("serp_local")
    if sl:
        S = {"location_code": sl.get("location_code"), "keywords": {}}
        for kw, r in sl.get("keywords", {}).items():
            entry = {"item_types": [], "local_pack": [], "organic_top10": [], "own_positions": [], "maps": []}
            for t in _tasks_ok(r):
                for res in t.get("result") or []:
                    entry["item_types"] = res.get("item_types")
                    for it in res.get("items") or []:
                        ty = it.get("type")
                        if ty == "local_pack":
                            entry["local_pack"].append({"pos": it.get("rank_group"), "title": it.get("title"),
                                                        "rating": (it.get("rating") or {}).get("value"),
                                                        "votes": (it.get("rating") or {}).get("votes_count"),
                                                        "domain": it.get("domain"), "desc": it.get("description")})
                        elif ty == "map":
                            entry["maps"].append({"pos": it.get("rank_group"), "title": it.get("title")})
                        elif ty in ("organic", "featured_snippet"):
                            if it.get("rank_group", 99) <= 10:
                                entry["organic_top10"].append({"pos": it.get("rank_group"), "domain": it.get("domain"),
                                                               "url": it.get("url"), "title": it.get("title")})
                            if it.get("domain", "") and OWN in it.get("domain", ""):
                                entry["own_positions"].append({"pos": it.get("rank_group"), "url": it.get("url"),
                                                               "type": ty})
                        elif ty == "ai_overview":
                            entry.setdefault("ai_overview", True)
            S["keywords"][kw] = entry
        s["stages"]["serp_local"] = S
    g = _load("gbp")
    if g:
        G = {}
        for kw, r in g.items():
            G[kw] = [{"title": i.get("title"), "category": i.get("category"), "rating": i.get("rating"),
                      "address": i.get("address"), "url": i.get("url"), "cid": i.get("cid"),
                      "additional_categories": i.get("additional_categories"), "domain": i.get("domain"),
                      "attributes": (i.get("attributes") or {}).get("available_attributes"),
                      "is_claimed": i.get("is_claimed"), "questions_and_answers": i.get("questions_and_answers"),
                      "place_topics": i.get("place_topics")}
                     for t in _tasks_ok(r) for res in (t.get("result") or []) for i in (res.get("items") or [])]
        s["stages"]["gbp"] = G
    NORM_OUT.parent.mkdir(parents=True, exist_ok=True)
    NORM_OUT.write_text(json.dumps(s, ensure_ascii=False, indent=2), encoding="utf-8")
    return s


def main() -> None:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("--skip", action="append", default=[])
    ap.add_argument("--only", action="append", default=[])
    ap.add_argument("--summarize-only", action="store_true")
    a = ap.parse_args()
    if not a.summarize_only:
        c = DataForSEOClient(timeout=90)
        stages = {"volume": stage_volume, "labs": stage_labs, "backlinks": stage_backlinks,
                  "serp_local": stage_serp_local, "gbp": stage_gbp}
        for name, fn in stages.items():
            if name in a.skip or (a.only and name not in a.only):
                continue
            try:
                fn(c)
            except Exception as e:  # noqa: BLE001
                print(f"  ERROR stage {name}: {e}")
    summarize()
    print(f"summary -> {NORM_OUT}")


if __name__ == "__main__":
    main()
