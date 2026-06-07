"""Ads keyword action matrix + Ads/GA4 current vs previous summary."""
from __future__ import annotations
import json, csv
from pathlib import Path
from collections import defaultdict
B=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07")
RAW=B/"raw"; PROC=B/"processed"
def j(n): return json.loads((RAW/f"{n}.json").read_text(encoding="utf-8"))
def mc(v): return round(int(v or 0)/1e6,2)

# ---- Ads campaign windows ----
print("### Ads campaign windows ###")
for n in ["last30d","last60d","last90d","recovery"]:
    m=j(f"ads_campaign_{n}")[0]["metrics"]
    cost=mc(m.get("costMicros",0)); conv=float(m.get("conversions",0)); clk=int(m.get("clicks",0))
    print(f"  {n:<9} impr={int(m.get('impressions',0)):<5} clk={clk:<4} cost€{cost:<7} conv={conv:<4} "
          f"CPA€{round(cost/conv,1) if conv else '-':<6} IS={round(float(m.get('searchImpressionShare',0))*100,1)}% "
          f"rankLost={round(float(m.get('searchRankLostImpressionShare',0))*100,1)}% budgLost={round(float(m.get('searchBudgetLostImpressionShare',0))*100,1)}%")

# ---- Ads keyword action matrix (current vs previous) ----
def load_kw(w):
    out={}
    for r in j(f"ads_keywords_{w}"):
        k=r.get("adGroupCriterion",{}).get("keyword",{})
        key=(k.get("text",""),k.get("matchType",""))
        m=r.get("metrics",{})
        out[key]={"impr":int(m.get("impressions",0)),"clicks":int(m.get("clicks",0)),"cost":mc(m.get("costMicros",0)),
                  "conv":float(m.get("conversions",0)),"ag":r.get("adGroup",{}).get("name",""),
                  "status":r.get("adGroupCriterion",{}).get("status","")}
    return out
cur=load_kw("current"); prev=load_kw("previous")
allk=set(cur)|set(prev)
def action(c,p):
    conv=c.get("conv",0)+p.get("conv",0); cost=c.get("cost",0)+p.get("cost",0); clk=c.get("clicks",0)+p.get("clicks",0)
    if conv>0: return "keep_protect"
    if cost>=30 and conv==0: return "lower_bid_monitor"
    if cost>=15 and conv==0 and clk>=10: return "pause_candidate"
    if c.get("impr",0)==0 and c.get("status")=="ENABLED": return "zero_impr_cleanup"
    return "needs_data"
rows=[]
for key in allk:
    c=cur.get(key,{}); p=prev.get(key,{})
    rows.append({"keyword":key[0],"match_type":key[1],"ad_group":(c or p).get("ag",""),
                 "status":(c or p).get("status",""),
                 "cost_prev":p.get("cost",0),"cost_cur":c.get("cost",0),
                 "clicks_prev":p.get("clicks",0),"clicks_cur":c.get("clicks",0),
                 "conv_prev":p.get("conv",0),"conv_cur":c.get("conv",0),
                 "action":action(c,p)})
rows.sort(key=lambda r:-(r["cost_cur"]+r["cost_prev"]))
with (PROC/"ads_keyword_action_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
from collections import Counter
print("\n### Ads keyword actions (count) ###", dict(Counter(r["action"] for r in rows)))
print("keep_protect:")
for r in [r for r in rows if r["action"]=="keep_protect"]:
    print(f"  conv {r['conv_prev']}+{r['conv_cur']} €{r['cost_prev']+r['cost_cur']:.0f} [{r['match_type']}] {r['keyword'][:38]}")
print("lower_bid_monitor / pause:")
for r in [r for r in rows if r["action"] in ("lower_bid_monitor","pause_candidate")][:12]:
    print(f"  {r['action']:<18} €{r['cost_prev']+r['cost_cur']:.0f} clk={r['clicks_prev']+r['clicks_cur']} [{r['match_type']}] {r['keyword'][:36]}")

# ---- GA4 current vs previous ----
print("\n### GA4 channel totals (prev -> cur) ###")
def ga(w): return {r["sessionDefaultChannelGroup"]:r for r in j(f"ga4_channel_totals_{w}")}
gp,gc=ga("previous"),ga("current")
for ch in set(gp)|set(gc):
    a=gp.get(ch,{}); b=gc.get(ch,{})
    print(f"  {ch:<16} sess {a.get('sessions','0'):>4}->{b.get('sessions','0'):<4} keyEvents {a.get('keyEvents','0'):>2}->{b.get('keyEvents','0')}")
print("### GA4 key events by name (prev -> cur) ###")
def ke(w):
    d=defaultdict(int)
    for r in j(f"ga4_keyevents_by_name_{w}"): d[r["eventName"]]+=int(r["eventCount"])
    return d
kp,kc=ke("previous"),ke("current")
for ev in set(kp)|set(kc): print(f"  {ev:<20} {kp.get(ev,0)} -> {kc.get(ev,0)}")
print("\nDONE ads/ga4 analysis.")
