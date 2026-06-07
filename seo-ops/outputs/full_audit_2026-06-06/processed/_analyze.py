"""Normalize raw audit pulls -> processed summaries + headline narrative. Stdlib only."""
from __future__ import annotations
import json, csv
from pathlib import Path
from collections import defaultdict

BASE = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06")
RAW = BASE/"raw"; PROC = BASE/"processed"
def jload(p):
    p=Path(p); return json.loads(p.read_text(encoding="utf-8")) if p.is_file() else None

# ---------- GSC ----------
def gsc_window(name):
    return jload(RAW/f"gsc/pages__{name}.json"), jload(RAW/f"gsc/queries__{name}.json")
def agg(rows):
    return {"clicks":sum(r["clicks"] for r in rows),
            "impressions":sum(r["impressions"] for r in rows),
            "rows":len(rows)}

gsc_summary={}
WIN_GSC={"healthy":"healthy_2026-04-06_2026-04-23","bad":"bad_2026-04-24_2026-05-08",
         "recovery":"recovery_2026-05-10_2026-06-02","postcutover":"postcutover_2026-03-15_2026-06-02"}
pages_by_win={}; queries_by_win={}
for k,w in WIN_GSC.items():
    pg,qr=gsc_window(w)
    pages_by_win[k]={r["page"]:r for r in pg}
    queries_by_win[k]={r["query"]:r for r in qr}
    gsc_summary[k]={"pages":agg(pg),"queries_total":len(qr),
                    "clicks":sum(r["clicks"] for r in pg),
                    "impressions":sum(r["impressions"] for r in pg)}

# top lost pages healthy->bad and healthy->recovery (by clicks delta)
def page_delta(a,b):
    out=[]
    for url in set(pages_by_win[a])|set(pages_by_win[b]):
        ca=pages_by_win[a].get(url,{}).get("clicks",0); cb=pages_by_win[b].get(url,{}).get("clicks",0)
        ia=pages_by_win[a].get(url,{}).get("impressions",0); ib=pages_by_win[b].get(url,{}).get("impressions",0)
        out.append({"page":url,"clicks_a":ca,"clicks_b":cb,"d_clicks":cb-ca,"impr_a":ia,"impr_b":ib,"d_impr":ib-ia})
    return sorted(out,key=lambda x:x["d_clicks"])
lost_pages_hb=page_delta("healthy","bad")
lost_pages_hr=page_delta("healthy","recovery")

def query_delta(a,b):
    out=[]
    for q in set(queries_by_win[a])|set(queries_by_win[b]):
        ca=queries_by_win[a].get(q,{}).get("clicks",0); cb=queries_by_win[b].get(q,{}).get("clicks",0)
        ia=queries_by_win[a].get(q,{}).get("impressions",0); ib=queries_by_win[b].get(q,{}).get("impressions",0)
        pa=queries_by_win[a].get(q,{}).get("position",0); pb=queries_by_win[b].get(q,{}).get("position",0)
        out.append({"query":q,"cl_a":ca,"cl_b":cb,"d_clicks":cb-ca,"impr_a":ia,"impr_b":ib,"d_impr":ib-ia,"pos_a":pa,"pos_b":pb})
    return out
q_hb=query_delta("healthy","bad")
q_hr=query_delta("healthy","recovery")
lost_q_clicks_hr=sorted([x for x in q_hr],key=lambda x:x["d_clicks"])[:25]
lost_q_impr_hr=sorted([x for x in q_hr],key=lambda x:x["d_impr"])[:25]

# query loss csv (healthy vs recovery)
with (PROC/"query_loss.csv").open("w",newline="",encoding="utf-8") as f:
    wr=csv.DictWriter(f,fieldnames=["query","cl_healthy","cl_recovery","d_clicks","impr_healthy","impr_recovery","d_impr","pos_healthy","pos_recovery"])
    wr.writeheader()
    for x in sorted(q_hr,key=lambda x:x["d_impr"]):
        wr.writerow({"query":x["query"],"cl_healthy":x["cl_a"],"cl_recovery":x["cl_b"],"d_clicks":x["d_clicks"],
                     "impr_healthy":x["impr_a"],"impr_recovery":x["impr_b"],"d_impr":x["d_impr"],
                     "pos_healthy":x["pos_a"],"pos_recovery":x["pos_b"]})

# ---------- GSC site daily ----------
site_daily=jload(RAW/"gsc/site_daily_postcutover.json") or []
site_daily_sorted=sorted(site_daily,key=lambda r:r["date"])

# ---------- GA4 daily key events ----------
ke_daily=jload(RAW/"ga4/daily_keyevents_by_channel_postcutover.json") or []
by_date=defaultdict(lambda:defaultdict(int))
for r in ke_daily:
    by_date[r["date"]][r["sessionDefaultChannelGroup"]]+=int(r["eventCount"])
ke_timeline=[{"date":d,**{k:v for k,v in chans.items()},"total":sum(chans.values())} for d,chans in sorted(by_date.items())]

sess_daily=jload(RAW/"ga4/daily_sessions_by_channel_postcutover.json") or []

# ---------- Ads daily ----------
ads_daily=jload(RAW/"ads/campaign_daily_postcutover.json") or []
def m(r,k,default=0):
    v=r.get("metrics",{}).get(k,default)
    return v
ads_timeline=[]
for r in sorted(ads_daily,key=lambda r:r.get("segments",{}).get("date","")):
    seg=r.get("segments",{}); mt=r.get("metrics",{})
    ads_timeline.append({"date":seg.get("date"),
        "impr":int(mt.get("impressions",0)),"clicks":int(mt.get("clicks",0)),
        "cost":round(int(mt.get("costMicros",0))/1e6,2),
        "conv":float(mt.get("conversions",0)),"all_conv":float(mt.get("allConversions",0))})

summary={
 "gsc_windows":gsc_summary,
 "gsc_top_lost_pages_healthy_to_bad":lost_pages_hb[:15],
 "gsc_top_lost_pages_healthy_to_recovery":lost_pages_hr[:15],
 "gsc_top_lost_queries_by_impr_healthy_to_recovery":lost_q_impr_hr,
 "ga4_keyevents_timeline":ke_timeline,
 "ads_daily_timeline":ads_timeline,
}
(PROC/"_narrative.json").write_text(json.dumps(summary,indent=2,ensure_ascii=False),encoding="utf-8")

# print headlines
print("### GSC window aggregates (page-level) ###")
for k in ["healthy","bad","recovery"]:
    s=gsc_summary[k]; print(f"  {k:<10} clicks={s['clicks']:<5} impr={s['impressions']:<7} pages={s['pages']['rows']} queries={s['queries_total']}")
print("\n### GSC site daily (first/last 5) ###")
for r in site_daily_sorted[:3]+["..."]+site_daily_sorted[-5:]:
    if r=="...": print("  ..."); continue
    print(f"  {r['date']} clicks={r['clicks']} impr={r['impressions']} pos={r['position']}")
print("\n### Top lost PAGES healthy->bad (by clicks) ###")
for x in lost_pages_hb[:8]:
    print(f"  d_clicks={x['d_clicks']:<4} d_impr={x['d_impr']:<6} {x['page']}")
print("\n### Top lost QUERIES healthy->recovery (by impressions) ###")
for x in lost_q_impr_hr[:12]:
    print(f"  d_impr={x['d_impr']:<6} d_clicks={x['d_clicks']:<4} pos {x['pos_a']}->{x['pos_b']}  {x['query'][:45]}")
print("\n### GA4 key-events daily timeline ###")
for r in ke_timeline:
    print(f"  {r['date']} total={r['total']}  " + " ".join(f"{k}={v}" for k,v in r.items() if k not in ('date','total')))
print("\n### Ads daily — bad-window slice (2026-04-22..2026-05-12) ###")
for r in ads_timeline:
    if "2026-04-22"<=r["date"]<="2026-05-12":
        print(f"  {r['date']} impr={r['impr']:<4} clicks={r['clicks']:<3} cost={r['cost']:<6} conv={r['conv']} all_conv={r['all_conv']}")
print("\nsaved _narrative.json")
