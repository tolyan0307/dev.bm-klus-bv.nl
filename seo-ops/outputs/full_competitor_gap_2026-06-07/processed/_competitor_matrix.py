"""Build non-aggregator competitor matrix from serp_raw.jsonl (robust to in-progress writes)."""
from __future__ import annotations
import json, csv
from pathlib import Path
from collections import Counter, defaultdict
B=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07")
RAW=B/"raw/dataforseo_serp/serp_raw.jsonl"; PROC=B/"processed"
BM="bm-klus-bv.nl"

AGG={"homedeal.nl","slimster.nl","trustoo.nl","werkspot.nl","doitpro.com","offerte.nl","bark.com",
     "offerteadviseur.nl","bouwoffertes.nl","klusbedrijf.nl","vergelijk.nl","ginder.nl","jelloo.nl",
     "offertevergelijken.nl","trustlocal.nl","klusexpert.nl","oferte.nl","klussenkenner.nl","sortlist.nl",
     "bouwnu.nl","ledenpas.nl","mijnklusbedrijf.nl","ikwilverbouwen.nl","aanbouwwijzer.nl"}
RETAIL={"gamma.nl","hornbach.nl","praxis.nl","karwei.nl","bauhaus.nl","bol.com","ral9010.nl","verfwebwinkel.nl"}
GOV={"rijksoverheid.nl","rvo.nl","milieucentraal.nl","verbeterjehuis.nl","overheid.nl","energiesubsidiewijzer.nl"}
MEDIA={"eigenhuis.nl","vtwonen.nl","gevelrenovatie-info.nl","isolatie-info.nl","stucwerk-info.nl",
       "isolatiewijzer.nl","consumentenbond.nl","wonen.nl","isolatie-weetjes.nl","duurzaambouwloket.nl",
       "beterisoleren.nl","gevelisolatie-info.nl","bouwsuper.nl","homedeal.nl"}
def classify(domain):
    base=(domain or "").lower().replace("www.","")
    if BM in base: return "bm"
    if base in AGG: return "aggregator"
    if base in RETAIL: return "retail"
    if base in GOV or base.endswith(".overheid.nl"): return "government"
    if base in MEDIA or base.endswith("-info.nl"): return "media_costguide"
    return "contractor"

def expected_page(kw,cluster):
    ql=kw.lower()
    cities=["rotterdam","den haag","leiden","delft","breda","zoetermeer","gouda","vlaardingen","schiedam","dordrecht"]
    for c in cities:
        if c in ql: return f"/gevelisolatie/{c.replace(' ','-')}/"
    if cluster=="kosten": return "/gevelisolatie/kosten/"
    if cluster=="afwerking": return "/gevelisolatie/afwerkingen/"
    if cluster=="buiten_stucwerk": return "/buiten-stucwerk/"
    if cluster=="sierpleister": return "/sierpleister/"
    if cluster=="muren_stucen": return "/muren-stucen/"
    if cluster=="gevel_schilderen": return "/gevel-schilderen/"
    return "/gevelisolatie/"

# load raw robustly, dedupe (kw,device), prefer desktop
recs={}
for line in RAW.read_text(encoding="utf-8").splitlines():
    line=line.strip()
    if not line: continue
    try: o=json.loads(line)
    except: continue
    recs[(o["keyword"],o["device"])]=o

by_kw=defaultdict(dict)
for (kw,dev),o in recs.items(): by_kw[kw][dev]=o
print(f"loaded {len(recs)} results, {len(by_kw)} unique queries")

def organic(o):
    items=((o.get("response",{}).get("tasks") or [{}])[0].get("result") or [{}])[0].get("items") or []
    return items
rows=[]; nonagg=Counter(); nonagg_urls=defaultdict(Counter); comp_title={}
for kw,devs in by_kw.items():
    o=devs.get("desktop") or list(devs.values())[0]
    cluster=o.get("cluster","")
    items=organic(o)
    org=[it for it in items if it.get("type")=="organic"]
    bm_pos=bm_url=None
    for it in org:
        if BM in (it.get("domain") or ""): bm_pos=it.get("rank_absolute"); bm_url=it.get("url"); break
    # composition top10
    comp=Counter(classify(it.get("domain")) for it in org[:10])
    # top non-aggregator in top10
    top_nonagg=None
    for it in org[:20]:
        t=classify(it.get("domain"))
        if t in ("contractor","media_costguide"):
            top_nonagg={"domain":it.get("domain"),"url":it.get("url"),"type":t,"pos":it.get("rank_absolute"),"title":it.get("title")}
            break
    for it in org[:10]:
        t=classify(it.get("domain"))
        if t in ("contractor","media_costguide"):
            nonagg[it.get("domain")]+=1; nonagg_urls[it.get("domain")][it.get("url")]+=1
            comp_title[it.get("url")]=it.get("title")
    feats=sorted({it.get("type") for it in items if it.get("type")!="organic"})
    rows.append({"cluster":cluster,"query":kw,"expected_bm_page":expected_page(kw,cluster),
                 "bm_position":bm_pos or "", "bm_url":bm_url or "",
                 "top10_aggregator":comp.get("aggregator",0),"top10_contractor":comp.get("contractor",0),
                 "top10_media":comp.get("media_costguide",0),"top10_retail":comp.get("retail",0),
                 "top10_gov":comp.get("government",0),
                 "top_nonagg_domain":(top_nonagg or {}).get("domain",""),
                 "top_nonagg_url":(top_nonagg or {}).get("url",""),
                 "top_nonagg_type":(top_nonagg or {}).get("type",""),
                 "top_nonagg_pos":(top_nonagg or {}).get("pos",""),
                 "serp_features":"|".join(feats)})
order={"core":0,"kosten":1,"afwerking":2,"city":3,"buiten_stucwerk":4,"sierpleister":5,"muren_stucen":6,"gevel_schilderen":7}
rows.sort(key=lambda r:(order.get(r["cluster"],9),r["query"]))
with (PROC/"non_aggregator_competitor_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

print("\n### Repeat NON-AGGREGATOR competitor domains (top-10 freq) ###")
for d,c in nonagg.most_common(20):
    top_url=nonagg_urls[d].most_common(1)[0][0]
    print(f"  {c:>3} {d:<28} e.g. {top_url}")
print("\n### BM presence ###")
bmp=[(r["query"],r["bm_position"],r["bm_url"]) for r in rows if r["bm_position"]!=""]
print(f"  BM in top100: {len(bmp)} of {len(rows)} queries")
for q,p,u in sorted(bmp,key=lambda x:x[1]): print(f"    #{p} {q}  {u}")
# pick competitor URLs to crawl: top repeat non-agg domains' most frequent URL
crawl_targets=[]
for d,c in nonagg.most_common(12):
    crawl_targets.append(nonagg_urls[d].most_common(1)[0][0])
(PROC/"_competitor_crawl_targets.json").write_text(json.dumps(crawl_targets,indent=2),encoding="utf-8")
print("\ncrawl targets saved:",len(crawl_targets))
print("\n### SERP composition by cluster (avg top10) ###")
cc=defaultdict(lambda:Counter()); ccount=defaultdict(int)
for r in rows:
    ccount[r["cluster"]]+=1
    for k in ("top10_aggregator","top10_contractor","top10_media","top10_retail","top10_gov"):
        cc[r["cluster"]][k]+=r[k]
for cl in order:
    if ccount[cl]:
        n=ccount[cl]; d=cc[cl]
        print(f"  {cl:<16} agg={d['top10_aggregator']/n:.1f} contractor={d['top10_contractor']/n:.1f} media={d['top10_media']/n:.1f} retail={d['top10_retail']/n:.1f} gov={d['top10_gov']/n:.1f}")
