"""READ-ONLY DataForSEO SERP pull (depth100, desktop+mobile) for competitor-gap audit. Cap $3."""
from __future__ import annotations
import json, sys, time, re
from pathlib import Path
INTEG=Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07/raw/dataforseo_serp")
sys.path.insert(0,str(INTEG))
from dataforseo.serp_google import SerpGoogle
CAP=3.00; BM="bm-klus-bv.nl"

CLUSTERS={
 "core":["gevelisolatie","buitengevelisolatie","gevel isoleren","buitenmuur isoleren","gevel van buiten isoleren","buitenmuur isoleren buitenkant"],
 "kosten":["gevelisolatie kosten","kosten gevelisolatie","wat kost gevelisolatie","gevelisolatie prijs m2","buitengevelisolatie kosten","kosten buitenmuur isoleren"],
 "afwerking":["gevelisolatie met steenstrips","buitengevelisolatie met steenstrips","gevel isoleren en bekleden","gevelisolatie met stucwerk","gevelisolatie crepi"],
 "city":["gevelisolatie rotterdam","buitengevelisolatie rotterdam","gevelisolatie den haag","gevelisolatie leiden","gevelisolatie delft","gevelisolatie breda","gevelisolatie zoetermeer","gevelisolatie gouda","gevelisolatie vlaardingen","gevelisolatie schiedam","gevelisolatie dordrecht"],
 "buiten_stucwerk":["buitenmuur stucen","buitenmuur stucen kosten","buitenmuur stucen nadelen","gevel stucen","stucen gevel","buiten stucwerk","buitenstucwerk"],
 "sierpleister":["sierpleister","gevel sierpleister","sierpleister buitengevel","spachtelputz buitengevel","sierpleister prijs","spachtelputz prijs"],
 "muren_stucen":["muren stucen","muur stucen","stucwerk binnen","sausklaar stucen","behangklaar stucen","muren stucen prijs"],
 "gevel_schilderen":["gevel schilderen","buitengevel schilderen","buitenmuur schilderen","gevel schilderen kosten","gevel keimen","keimen gevel kosten"],
}

AGG={"homedeal.nl","slimster.nl","trustoo.nl","werkspot.nl","doitpro.com","offerte.nl","bark.com",
     "offerteadviseur.nl","bouwoffertes.nl","klusbedrijf.nl","vergelijk.nl","ginder.nl","jelloo.nl",
     "offertevergelijken.nl","trustlocal.nl","klusexpert.nl","oferte.nl","klussenkenner.nl"}
RETAIL={"gamma.nl","hornbach.nl","praxis.nl","karwei.nl","bauhaus.nl","bol.com","ral9010.nl"}
GOV={"rijksoverheid.nl","rvo.nl","milieucentraal.nl","verbeterjehuis.nl","overheid.nl","energiesubsidiewijzer.nl"}
MEDIA={"eigenhuis.nl","vtwonen.nl","gevelrenovatie-info.nl","isolatie-info.nl","stucwerk-info.nl",
       "isolatiewijzer.nl","homedeal.nl","consumentenbond.nl","wonen.nl","gevel.nl","stukadoor.nl",
       "isolatie-weetjes.nl","duurzaambouwloket.nl","beterisoleren.nl"}
def classify(domain):
    d=(domain or "").lower().lstrip("www.")
    d2=d[4:] if d.startswith("www.") else d
    base=domain.lower().replace("www.","")
    if BM in base: return "bm"
    if base in AGG: return "aggregator"
    if base in RETAIL: return "retail"
    if base in GOV or base.endswith(".overheid.nl"): return "government"
    if base in MEDIA or base.endswith("-info.nl"): return "media_costguide"
    return "contractor"  # refine later via crawl

serp=SerpGoogle(); total=0.0; extracted=[]; costlog=[]
RAW=OUT/"serp_raw.jsonl"; RAW.write_text("",encoding="utf-8")

def extract(resp,kw,cluster,device):
    task=(resp.get("tasks") or [{}])[0]
    cost=resp.get("cost",0.0) or task.get("cost",0.0) or 0.0
    res=(task.get("result") or [{}])[0]
    items=res.get("items") or []
    organic=[it for it in items if it.get("type")=="organic"]
    bm_pos=bm_url=None
    for it in organic:
        if BM in (it.get("domain") or ""): bm_pos=it.get("rank_absolute"); bm_url=it.get("url"); break
    top20=[{"rank":it.get("rank_absolute"),"domain":it.get("domain"),"url":it.get("url"),
            "title":it.get("title"),"type":classify(it.get("domain"))} for it in organic[:20]]
    feats=sorted({it.get("type") for it in items if it.get("type")!="organic"})
    local_pack=[it for it in items if it.get("type")=="local_pack"]
    return cost,{"keyword":kw,"cluster":cluster,"device":device,"bm_position":bm_pos,"bm_url":bm_url,
                 "serp_features":feats,"local_pack_count":len(local_pack),
                 "se_results_count":res.get("se_results_count"),"top20":top20}

print(f"Cap ${CAP}. clusters={len(CLUSTERS)}")
for device in ("desktop","mobile"):
    for cluster,kws in CLUSTERS.items():
        for kw in kws:
            if total>=CAP: print(f"!! cap hit ${total:.3f} at {kw}/{device}"); break
            try:
                resp=serp.organic_live(kw,depth=100,device=device)
                cost,row=extract(resp,kw,cluster,device); total+=cost; extracted.append(row)
                costlog.append({"keyword":kw,"device":device,"cost":cost})
                with RAW.open("a",encoding="utf-8") as fh:
                    fh.write(json.dumps({"keyword":kw,"cluster":cluster,"device":device,"response":resp},ensure_ascii=False)+"\n")
                nonagg=[t for t in row["top20"][:10] if t["type"] in ("contractor","media_costguide")]
                print(f"  [{device}] {kw:<34} BM={row['bm_position'] or '-':<4} nonAggTop10={len(nonagg)} lp={row['local_pack_count']} ${cost:.4f} tot${total:.3f}")
            except Exception as e:
                print(f"  ERR {device}/{kw}: {type(e).__name__}"); costlog.append({"keyword":kw,"device":device,"error":str(e)[:160]})
            time.sleep(0.25)

(OUT/"serp_extracted.json").write_text(json.dumps(extracted,indent=2,ensure_ascii=False),encoding="utf-8")
(OUT/"serp_costlog.json").write_text(json.dumps({"total_cost_usd":round(total,4),"items":costlog},indent=2,ensure_ascii=False),encoding="utf-8")
print(f"\nTOTAL ${total:.4f} | extracted {len(extracted)}")
