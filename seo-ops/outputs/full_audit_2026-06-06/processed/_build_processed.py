"""Build processed summaries + CSV matrices from raw pulls (stdlib only)."""
from __future__ import annotations
import json, csv
from pathlib import Path
from collections import defaultdict

B = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06")
RAW=B/"raw"; PROC=B/"processed"
def j(p): p=Path(p); return json.loads(p.read_text(encoding="utf-8")) if p.is_file() else None
def micros(v): return round(int(v or 0)/1e6,2)

WIN=["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-05"]
WL=["healthy","bad","recovery"]

# ---- page_inventory.csv (from crawl) ----
crawl=j(RAW/"crawl/crawl_full.json") or []
with (PROC/"page_inventory.csv").open("w",newline="",encoding="utf-8") as f:
    cols=["path","category","status","title_len","desc_len","h1_count","h2_count","word_count",
          "faq_questions","schema_types","internal_links","img_count","img_missing_alt",
          "has_form_endpoint","has_tel","has_whatsapp","canonical"]
    wr=csv.writer(f); wr.writerow(cols)
    for r in crawl:
        if r.get("error"): wr.writerow([r.get("url"),"","ERR"]+[""]*14); continue
        wr.writerow([r["path"],r["category"],r["status"],r["title_len"],r["desc_len"],r["h1_count"],
                     r["h2_count"],r["word_count"],r["faq_questions"],"|".join(r["schema_types"]),
                     r["internal_links"],r["img_count"],r["img_missing_alt"],
                     r["has_form_endpoint"],r["has_tel"],r["has_whatsapp"],r.get("canonical")])

# ---- ads keyword matrix ----
def load_kw(win):
    rows=j(RAW/f"ads/keywords__{win}.json") or []
    out={}
    for r in rows:
        kw=r.get("adGroupCriterion",{}).get("keyword",{})
        text=kw.get("text",""); mt=kw.get("matchType","")
        ag=r.get("adGroup",{}).get("name",""); m=r.get("metrics",{})
        out[(text,mt,ag)]={"impr":int(m.get("impressions",0)),"clicks":int(m.get("clicks",0)),
            "cost":micros(m.get("costMicros",0)),"conv":float(m.get("conversions",0)),
            "all_conv":float(m.get("allConversions",0)),
            "status":r.get("adGroupCriterion",{}).get("status","")}
    return out
kw_w={wl:load_kw(w) for wl,w in zip(WL,WIN)}
allkw=set().union(*[set(d) for d in kw_w.values()])
with (PROC/"ads_keyword_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    wr=csv.writer(f)
    wr.writerow(["keyword","match_type","ad_group","status"]+
                [f"{w}_{m}" for w in WL for m in ("impr","clicks","cost","conv")])
    for (text,mt,ag) in sorted(allkw):
        row=[text,mt,ag, kw_w["recovery"].get((text,mt,ag),kw_w["healthy"].get((text,mt,ag),{})).get("status","")]
        for w in WL:
            d=kw_w[w].get((text,mt,ag),{})
            row+=[d.get("impr",0),d.get("clicks",0),d.get("cost",0),d.get("conv",0)]
        wr.writerow(row)

# ---- ads search terms matrix ----
def load_st(win):
    rows=j(RAW/f"ads/search_terms__{win}.json") or []
    out=defaultdict(lambda:{"impr":0,"clicks":0,"cost":0.0,"conv":0.0})
    for r in rows:
        term=r.get("searchTermView",{}).get("searchTerm","")
        m=r.get("metrics",{})
        d=out[term]; d["impr"]+=int(m.get("impressions",0)); d["clicks"]+=int(m.get("clicks",0))
        d["cost"]+=micros(m.get("costMicros",0)); d["conv"]+=float(m.get("conversions",0))
    return out
st_w={wl:load_st(w) for wl,w in zip(WL,WIN)}
allst=set().union(*[set(d) for d in st_w.values()])
with (PROC/"ads_search_terms_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    wr=csv.writer(f)
    wr.writerow(["search_term"]+[f"{w}_{m}" for w in WL for m in ("impr","clicks","cost","conv")])
    for term in sorted(allst):
        row=[term]
        for w in WL:
            d=st_w[w].get(term,{}); row+=[d.get("impr",0),d.get("clicks",0),round(d.get("cost",0),2),d.get("conv",0)]
        wr.writerow(row)

# ---- query->page ownership (recovery window) ----
qxp=j(RAW/"gsc/query_x_page__recovery_2026-05-10_2026-06-02.json") or []
owner=defaultdict(list)
for r in qxp: owner[r["query"]].append((r["page"],r["impressions"],r["clicks"]))
with (PROC/"query_page_ownership.csv").open("w",newline="",encoding="utf-8") as f:
    wr=csv.writer(f); wr.writerow(["query","n_pages","owner_page","owner_impr","all_pages"])
    for q,lst in sorted(owner.items(),key=lambda x:-len(x[1])):
        lst.sort(key=lambda x:-x[1]); top=lst[0]
        wr.writerow([q,len(lst),top[0],top[1],"|".join(p for p,_,_ in lst)])

# ---- summary JSONs ----
def ads_agg(win):
    a=j(RAW/f"ads/campaign_agg__{win}.json")
    return a[0]["metrics"] if a else {}
ads_summary={wl:ads_agg(w) for wl,w in zip(WL,WIN)}
(PROC/"ads_summary.json").write_text(json.dumps(ads_summary,indent=2,ensure_ascii=False),encoding="utf-8")

ga4_ch={}
for wl,w in [("healthy","healthy_2026-04-06_2026-04-23"),("bad","bad_2026-04-24_2026-05-08"),("recovery","recovery_2026-05-10_2026-06-05")]:
    ga4_ch[wl]=j(RAW/f"ga4/channel_totals__{w}.json")
(PROC/"ga4_summary.json").write_text(json.dumps(ga4_ch,indent=2,ensure_ascii=False),encoding="utf-8")

nar=j(PROC/"_narrative.json")
(PROC/"gsc_summary.json").write_text(json.dumps({"windows":nar["gsc_windows"],
    "top_lost_queries_by_impr":nar["gsc_top_lost_queries_by_impr_healthy_to_recovery"]},
    indent=2,ensure_ascii=False),encoding="utf-8")

cats=defaultdict(lambda:{"n":0,"avg_words":0,"min_words":1e9,"max_words":0,"faq0":0,"alt_miss":0})
for r in crawl:
    if r.get("error"): continue
    c=cats[r["category"]]; c["n"]+=1; c["avg_words"]+=r["word_count"]
    c["min_words"]=min(c["min_words"],r["word_count"]); c["max_words"]=max(c["max_words"],r["word_count"])
    if r["faq_questions"]==0: c["faq0"]+=1
    if r["img_missing_alt"]>0: c["alt_miss"]+=1
for c in cats.values(): c["avg_words"]=round(c["avg_words"]/c["n"]) if c["n"] else 0; c["min_words"]=0 if c["min_words"]==1e9 else c["min_words"]
(PROC/"crawl_summary.json").write_text(json.dumps({"total_pages":len(crawl),"by_category":cats},indent=2,ensure_ascii=False),encoding="utf-8")

print("processed files written:")
for p in sorted(PROC.glob("*.csv"))+sorted(PROC.glob("*summary*.json")):
    print("  ",p.name)
print("\nads keyword matrix rows:",len(allkw)," search terms:",len(allst)," ownership queries:",len(owner))
