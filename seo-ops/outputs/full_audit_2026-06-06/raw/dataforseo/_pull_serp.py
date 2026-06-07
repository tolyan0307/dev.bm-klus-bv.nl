"""
READ-ONLY DataForSEO SERP pull for 2026-06-06 audit. Approved budget <= $3.00.
Hard cost cap: stops before exceeding CAP_USD. Run with seo-ops venv python.
"""
from __future__ import annotations
import json, sys, time
from pathlib import Path
INTEG = Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/dataforseo")
sys.path.insert(0, str(INTEG))
from dataforseo.serp_google import SerpGoogle

CAP_USD = 3.00
BM = "bm-klus-bv.nl"

QUERIES = [
 # core
 "gevelisolatie","buitengevelisolatie","gevelisolatie kosten","kosten gevelisolatie",
 "wat kost gevelisolatie","gevelisolatie prijs per m2","buitenmuur isoleren",
 "gevel van buiten isoleren","gevelisolatie met steenstrips","gevelisolatie met stucwerk",
 # local
 "gevelisolatie rotterdam","buitengevelisolatie rotterdam","gevelisolatie den haag",
 "gevelisolatie leiden","gevelisolatie zoetermeer","gevelisolatie breda",
 "gevelisolatie dordrecht","gevelisolatie vlaardingen",
 # buiten-stucwerk
 "buitenmuur stucen","buitenmuur stucen kosten","buitenmuur stucen nadelen",
 "buiten stucwerk","buitenstucwerk","gevel stucen","stucen gevel",
 # sierpleister
 "sierpleister","gevel sierpleister","sierpleister buitengevel",
 "spachtelputz buitengevel","spachtelputz prijs",
 # gevel schilderen
 "gevel schilderen","gevel schilderen kosten","buitengevel schilderen",
 "buitenmuur schilderen","gevel keimen","kosten keimen gevel",
 # muren stucen
 "muren stucen","muur stucen","sausklaar stucen","behangklaar stucen","muren stucen prijs",
]

serp = SerpGoogle()
total_cost = 0.0
extracted = []
costlog = []
RAW_JSONL = OUT / "serp_raw.jsonl"
RAW_JSONL.write_text("", encoding="utf-8")  # reset

def extract(resp, kw, device):
    task = (resp.get("tasks") or [{}])[0]
    cost = resp.get("cost", 0.0) or task.get("cost", 0.0) or 0.0
    res = (task.get("result") or [{}])[0]
    items = res.get("items") or []
    organic = [it for it in items if it.get("type") == "organic"]
    bm_pos, bm_url = None, None
    for it in organic:
        dom = (it.get("domain") or "")
        if BM in dom:
            bm_pos = it.get("rank_absolute"); bm_url = it.get("url"); break
    top10 = [{"rank": it.get("rank_absolute"), "domain": it.get("domain"), "url": it.get("url")}
             for it in organic[:10]]
    feature_types = sorted({it.get("type") for it in items if it.get("type") != "organic"})
    return cost, {
        "keyword": kw, "device": device,
        "bm_position": bm_pos, "bm_url": bm_url,
        "bm_in_top10": bool(bm_pos and bm_pos <= 10),
        "bm_in_top20": bool(bm_pos and bm_pos <= 20),
        "bm_in_top100": bool(bm_pos),
        "serp_features": feature_types,
        "se_results_count": res.get("se_results_count"),
        "top10": top10,
    }

print(f"Cost cap: ${CAP_USD}. Queries: {len(QUERIES)} x 2 devices")
for device in ("desktop", "mobile"):
    for kw in QUERIES:
        if total_cost >= CAP_USD:
            print(f"!! Cost cap reached (${total_cost:.3f}). Stopping at {kw}/{device}.")
            break
        try:
            resp = serp.organic_live(kw, depth=100, device=device)
            cost, row = extract(resp, kw, device)
            total_cost += cost
            extracted.append(row)
            costlog.append({"keyword": kw, "device": device, "cost_usd": cost})
            with RAW_JSONL.open("a", encoding="utf-8") as fh:
                fh.write(json.dumps({"keyword": kw, "device": device, "response": resp}, ensure_ascii=False) + "\n")
            pos = row["bm_position"]
            print(f"  [{device}] {kw:<32} BM={pos if pos else '-':<5} feats={','.join(row['serp_features'][:4])} ${cost:.4f} (tot ${total_cost:.3f})")
        except Exception as e:
            print(f"  ERROR {device}/{kw}: {type(e).__name__}: {e}")
            costlog.append({"keyword": kw, "device": device, "error": str(e)[:200]})
        time.sleep(0.3)

(OUT / "serp_extracted.json").write_text(json.dumps(extracted, indent=2, ensure_ascii=False), encoding="utf-8")
(OUT / "serp_costlog.json").write_text(json.dumps({"total_cost_usd": round(total_cost,4), "items": costlog}, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nTOTAL COST: ${total_cost:.4f}  | extracted {len(extracted)} | saved serp_extracted.json")
