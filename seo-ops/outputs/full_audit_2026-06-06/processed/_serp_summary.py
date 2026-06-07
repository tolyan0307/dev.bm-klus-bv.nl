"""Build serp_summary.json + competitor_serp_matrix.csv from serp_extracted.json."""
from __future__ import annotations
import json, csv
from pathlib import Path
from collections import Counter, defaultdict

B=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06")
ext=json.loads((B/"raw/dataforseo/serp_extracted.json").read_text(encoding="utf-8"))
costlog=json.loads((B/"raw/dataforseo/serp_costlog.json").read_text(encoding="utf-8"))

dom_top10=Counter(); dom_top3=Counter()
feat_counter=Counter()
bm_present=[]
per_query=defaultdict(dict)  # keyword -> device -> row
for r in ext:
    per_query[r["keyword"]][r["device"]]=r
    for f in r.get("serp_features",[]): feat_counter[f]+=1
    if r.get("bm_position"): bm_present.append({"keyword":r["keyword"],"device":r["device"],"pos":r["bm_position"],"url":r.get("bm_url")})
    for i,t in enumerate(r.get("top10",[])):
        d=t.get("domain")
        if d:
            dom_top10[d]+=1
            if t.get("rank") and t["rank"]<=3: dom_top3[d]+=1

# competitor matrix: per keyword (desktop preferred), top-5 domains + BM pos + features
with (B/"processed/competitor_serp_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    wr=csv.writer(f)
    wr.writerow(["keyword","device","bm_position","serp_features","top1","top2","top3","top4","top5"])
    for kw,devs in per_query.items():
        for dev in ("desktop","mobile"):
            if dev not in devs: continue
            r=devs[dev]
            top=[t.get("domain") for t in r.get("top10",[])][:5]
            wr.writerow([kw,dev,r.get("bm_position") or "", "|".join(r.get("serp_features",[]))]+top+[""]*(5-len(top)))

summary={
 "generated":"2026-06-06","source":"DataForSEO organic live advanced, NL/nl, depth100",
 "total_cost_usd":costlog["total_cost_usd"],
 "queries_extracted":len(ext),
 "timeouts":[c for c in costlog["items"] if c.get("error")],
 "bm_presence_top100":bm_present,
 "bm_absent_count":sum(1 for r in ext if not r.get("bm_position")),
 "serp_feature_frequency":dict(feat_counter.most_common()),
 "top_competitor_domains_top10":dict(dom_top10.most_common(25)),
 "top_competitor_domains_top3":dict(dom_top3.most_common(15)),
}
(B/"processed/serp_summary.json").write_text(json.dumps(summary,indent=2,ensure_ascii=False),encoding="utf-8")

print("BM present in top100:",len(bm_present),"of",len(ext),"results")
for x in bm_present: print("  ",x)
print("\nTop competitor domains (top-10 freq):")
for d,c in dom_top10.most_common(20): print(f"  {c:>3}  {d}")
print("\nTop-3 dominant domains:")
for d,c in dom_top3.most_common(12): print(f"  {c:>3}  {d}")
print("\nSERP feature frequency:")
for fkey,c in feat_counter.most_common(): print(f"  {c:>3}  {fkey}")
print("\ntimeouts:",len(summary["timeouts"]),"| cost $",costlog["total_cost_usd"])
