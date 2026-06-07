"""Classify SERP composition for the 16 audit queries."""
from __future__ import annotations
import json, re, sys
from pathlib import Path
from collections import Counter

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[1]
NORM = ROOT / "outputs" / "seo_audit_2026-05-10" / "serp_normalized_2026-05-10.json"

with open(NORM, encoding="utf-8") as f:
    DATA = json.load(f)

BY_QUERY = DATA["by_query"]

# ── Classification rules ────────────────────────────────────────────────
# Priority: government → directory/marketplace → cost-guide → DIY → city-page → service → blog
GOVT_DOMAINS = {
    "rotterdam.nl", "denhaag.nl", "leiden.nl", "breda.nl", "zoetermeer.nl",
    "rvo.nl", "milieucentraal.nl", "energieloketzoetermeer.nl",
    "duurzaam010.nl", "duurzaam-rotterdam.nl", "ijsselmonde.org",
    "gemeente.leiden.nl", "duurzaambouwloket.nl",
}

MARKETPLACE_DIR = {
    "homedeal.nl", "multiconcurrent.nl", "slimster.nl", "trustoo.nl",
    "zoofy.nl", "stuc-concurrent.nl", "schilder-gigant.nl",
    "metsel-gigant.nl", "stuc-gigant.nl", "stucadoor-expert.nl",
    "schilderwerken-expert.nl", "marktplaats.nl", "werkspot.nl", "bouwoffertes.nl",
}

COST_GUIDE = {
    "eigenhuis.nl", "gevelrenovatie-info.nl", "isolatie-info.nl",
    "isolatie-weetjes.nl", "isolatieinfo.nl", "consumentenbond.nl",
}

DIY_RETAIL = {
    "gamma.nl", "praxis.nl", "vtwonen.nl", "karwei.nl", "hornbach.nl",
}

REVIEW_BLOG = {
    "stukadoorsclub.nl", "stukadoor-amsterdam.nl", "groningsestukadoor.nl",
    "gestuct.nl", "stukadoor-in-amersfoort.nl",
}

def classify_url(domain: str, url: str) -> str:
    d = (domain or "").lower().strip()
    if d.startswith("www."): d = d[4:]
    u = (url or "").lower()
    if d in GOVT_DOMAINS or d.endswith(".gov.nl") or "gemeente" in d:
        return "government"
    if d in MARKETPLACE_DIR or "homedeal" in d or "stuc-concurrent" in d:
        return "marketplace_directory"
    if d in COST_GUIDE:
        return "cost_guide"
    if d in DIY_RETAIL:
        return "diy_retail"
    if d in REVIEW_BLOG:
        return "review_blog"
    # Cost / price hints in URL or path
    cost_path = bool(re.search(r"(kosten|prijs|prijzen|prijs-per-m2|wat-kost|hoeveel-kost)", u))
    isolation_path = bool(re.search(r"(gevelisolatie|isolatie|isoleren|stucen|stucwerk|sierpleister|gevel)", u))
    city_path = bool(re.search(r"(rotterdam|den-haag|leiden|breda|zoetermeer|amsterdam|utrecht|delft|alphen|groningen)", u))
    # Service-page heuristic: company-style domain AND service term in path
    if cost_path and not isolation_path:
        return "cost_guide"
    if cost_path and isolation_path:
        return "service_with_pricing"
    if city_path and isolation_path:
        return "city_page"
    if isolation_path:
        return "service_page"
    return "other"


# ── Build per-query view ────────────────────────────────────────────────
QUERY_INTENT = {
    "gevelisolatie kosten": "price",
    "kosten gevelisolatie": "price",
    "wat kost gevelisolatie": "price",
    "buitenmuur stucen": "service+info",
    "buitenmuur stucen nadelen": "informational",
    "buitenmuur stucen kosten": "price",
    "gevelisolatie rotterdam": "local",
    "buitengevelisolatie rotterdam": "local",
    "gevelisolatie breda": "local",
    "gevelisolatie zoetermeer": "local",
    "gevelisolatie leiden": "local",
    "gevelisolatie den haag": "local",
    "sausklaar stucen": "service+info",
    "behangklaar stucen": "service+info",
    "gevel sierpleister": "service+info",
    "gevel schilderen kosten": "price",
}

# Expected BM page per query
EXPECTED_BM = {
    "gevelisolatie kosten": "/gevelisolatie/kosten/",
    "kosten gevelisolatie": "/gevelisolatie/kosten/",
    "wat kost gevelisolatie": "/gevelisolatie/kosten/",
    "buitenmuur stucen": "/buiten-stucwerk/",
    "buitenmuur stucen nadelen": "/buiten-stucwerk/",
    "buitenmuur stucen kosten": "/buiten-stucwerk/",
    "gevelisolatie rotterdam": "/gevelisolatie/rotterdam/",
    "buitengevelisolatie rotterdam": "/gevelisolatie/rotterdam/ or /gevelisolatie/",
    "gevelisolatie breda": "/gevelisolatie/breda/",
    "gevelisolatie zoetermeer": "/gevelisolatie/zoetermeer/",
    "gevelisolatie leiden": "/gevelisolatie/leiden/",
    "gevelisolatie den haag": "/gevelisolatie/den-haag/",
    "sausklaar stucen": "/muren-stucen/",
    "behangklaar stucen": "/muren-stucen/",
    "gevel sierpleister": "/sierpleister/",
    "gevel schilderen kosten": "/gevel-schilderen/",
}

print("=" * 90)
print("SERP CLASSIFICATION — DataForSEO NL/NL desktop, 2026-05-10")
print("=" * 90)

per_query_summary = {}
for q, info in BY_QUERY.items():
    if "error" in info:
        print(f"\n--- {q} --- ERROR: {info['error']}")
        continue
    print(f"\n=== {q} ===")
    print(f"  intent (assumed): {QUERY_INTENT.get(q, '?')}")
    print(f"  expected BM page: {EXPECTED_BM.get(q, '?')}")
    bm = info.get("bm_appearances") or []
    if bm:
        for b in bm:
            print(f"  BM @ rank {b['organic_rank']} (abs {b['rank_absolute']}): {b['url']}")
            print(f"     title: {b.get('title', '')[:80]}")
    else:
        max_rank = (info["organic_full"] or [{}])[-1].get("organic_rank") if info.get("organic_full") else 0
        print(f"  BM NOT in top {max_rank}")

    feats = info.get("features", {})
    feat_list = [k for k, v in feats.items() if v and not isinstance(v, list)]
    print(f"  SERP features: {feat_list}")

    print(f"  Top 10 organic:")
    type_counts = Counter()
    top10 = info.get("organic_top10") or []
    for e in top10:
        ptype = classify_url(e.get("domain"), e.get("url"))
        type_counts[ptype] += 1
        print(f"    #{e['organic_rank']:2d} [{ptype:<22s}] {e.get('domain', '')[:35]:<35s} {(e.get('url') or '')[:80]}")

    print(f"  Type rollup: {dict(type_counts)}")

    per_query_summary[q] = {
        "intent": QUERY_INTENT.get(q),
        "expected_bm_page": EXPECTED_BM.get(q),
        "bm_position_organic": (bm[0]["organic_rank"] if bm else None),
        "bm_url": (bm[0]["url"] if bm else None),
        "bm_in_top_10": bool(bm and bm[0]["organic_rank"] <= 10),
        "bm_in_top_20": bool(bm and bm[0]["organic_rank"] <= 20),
        "bm_in_top_100": bool(bm and bm[0]["organic_rank"] <= 100),
        "top10_types": dict(type_counts),
        "top10_domains": [e.get("domain") for e in top10],
        "top10_urls": [e.get("url") for e in top10],
        "top10_titles": [e.get("title") for e in top10],
        "features": {k: v for k, v in feats.items() if v},
        "depth_pulled": (info.get("organic_full") or [{}])[-1].get("organic_rank") if info.get("organic_full") else 0,
    }

# Save summary
out = ROOT / "outputs" / "seo_audit_2026-05-10" / "serp_classified_2026-05-10.json"
out.write_text(json.dumps(per_query_summary, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n[OK] Saved: {out}")

# Aggregate competitor patterns
print(f"\n\n=== AGGREGATE COMPETITOR PATTERN (top-10 URL TYPE distribution across all 16 queries) ===")
type_global = Counter()
domain_global = Counter()
for q, s in per_query_summary.items():
    for k, v in s["top10_types"].items():
        type_global[k] += v
    for d in s["top10_domains"]:
        if d:
            domain_global[d] += 1

print("Type distribution (top 160 = 16q × 10 results):")
for t, n in type_global.most_common():
    print(f"  {t:<24s}: {n}")

print(f"\nMost frequent domains across all 16 queries (top 20):")
for d, n in domain_global.most_common(20):
    print(f"  {d:<35s}: {n} queries")
