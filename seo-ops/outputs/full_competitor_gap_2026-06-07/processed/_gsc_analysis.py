"""GSC query-loss/gain, ownership map, per-money-page metrics. Current vs Previous 28d."""
from __future__ import annotations
import json, csv, re
from pathlib import Path
from collections import defaultdict
B=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07")
RAW=B/"raw"; PROC=B/"processed"
def j(n): return json.loads((RAW/f"{n}.json").read_text(encoding="utf-8"))

qc={r["query"]:r for r in j("gsc_queries_current")}
qp={r["query"]:r for r in j("gsc_queries_previous")}
# ---- query gap matrix ----
rows=[]
for q in set(qc)|set(qp):
    a=qp.get(q,{}); b=qc.get(q,{})  # a=previous, b=current
    ca,cb=a.get("clicks",0),b.get("clicks",0)
    ia,ib=a.get("impressions",0),b.get("impressions",0)
    pa,pb=a.get("position",0),b.get("position",0)
    ra,rb=a.get("ctr",0),b.get("ctr",0)
    flags=[]
    if q in qp and q not in qc: flags.append("lost_query")
    if q in qc and q not in qp: flags.append("new_query")
    if pa and pb and pb-pa>5: flags.append("fell_gt5pos")
    if ia>=20 and ib>=20 and ra>0 and rb<ra*0.5: flags.append("ctr_halved")
    if ib>=30 and rb==0: flags.append("impr_no_clicks")
    rows.append({"query":q,"impr_prev":ia,"impr_cur":ib,"d_impr":ib-ia,"clicks_prev":ca,"clicks_cur":cb,
                 "d_clicks":cb-ca,"pos_prev":pa,"pos_cur":pb,"d_pos":round(pb-pa,1) if (pa and pb) else "",
                 "ctr_prev":ra,"ctr_cur":rb,"flags":"|".join(flags)})
rows.sort(key=lambda r:r["d_impr"])
with (PROC/"query_gap_matrix.csv").open("w",newline="",encoding="utf-8") as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

# ---- ownership map (current) ----
qxp=j("gsc_query_x_page_current")
owner=defaultdict(list)
for r in qxp: owner[r["query"]].append((r["page"],r["impressions"],r["clicks"],r["position"]))
def expected(q):
    ql=q.lower()
    cities=["rotterdam","den haag","leiden","delft","breda","zoetermeer","gouda","vlaardingen","schiedam","dordrecht","barendrecht","spijkenisse","capelle","ridderkerk","alphen","maassluis","hellevoetsluis","bergen op zoom","roosendaal","leidschendam","hendrik","gouda"]
    for c in cities:
        if c in ql: return f"/gevelisolatie/{c.replace(' ','-')}/ (city)"
    if "kosten" in ql or "prijs" in ql or "wat kost" in ql:
        if "stuc" in ql: return "/buiten-stucwerk/ or /muren-stucen/"
        if "schilder" in ql or "keimen" in ql: return "/gevel-schilderen/"
        if "sierpleister" in ql or "spachtel" in ql: return "/sierpleister/"
        return "/gevelisolatie/kosten/"
    if "steenstrips" in ql or "afwerk" in ql or "bekleden" in ql or "crepi" in ql: return "/gevelisolatie/afwerkingen/"
    if "schilder" in ql or "keimen" in ql: return "/gevel-schilderen/"
    if "sierpleister" in ql or "spachtel" in ql: return "/sierpleister/"
    if "stuc" in ql and ("buiten" in ql or "gevel" in ql): return "/buiten-stucwerk/"
    if "stuc" in ql: return "/muren-stucen/"
    if "isol" in ql or "gevelisolatie" in ql: return "/gevelisolatie/"
    return "?"
own_rows=[]
for q,lst in owner.items():
    lst.sort(key=lambda x:-x[1]); top=lst[0]
    exp=expected(q)
    actual_path=re.sub(r"^https?://[^/]+","",top[0])
    wrong = exp!="?" and not exp.startswith("?") and exp.split(" ")[0].rstrip("/") not in actual_path.rstrip("/") and not (exp.split()[0].rstrip('/')==actual_path.rstrip('/'))
    own_rows.append({"query":q,"n_pages":len(lst),"actual_owner":actual_path,"owner_impr":top[1],
                     "owner_pos":top[3],"expected_page":exp,"wrong_owner":"yes" if wrong else "no"})
own_rows.sort(key=lambda r:-r["owner_impr"])
with (PROC/"query_page_ownership_map.csv").open("w",newline="",encoding="utf-8") as f:
    w=csv.DictWriter(f,fieldnames=list(own_rows[0].keys())); w.writeheader(); w.writerows(own_rows)

# ---- per money page metrics ----
pc={r["page"]:r for r in j("gsc_pages_current")}
pp={r["page"]:r for r in j("gsc_pages_previous")}
MONEY=["/gevelisolatie/","/gevelisolatie/kosten/","/gevelisolatie/afwerkingen/","/buiten-stucwerk/",
       "/sierpleister/","/muren-stucen/","/gevel-schilderen/"]
def page(url_suffix, d):
    for u,r in d.items():
        if u.rstrip("/")==("https://bm-klus-bv.nl"+url_suffix).rstrip("/"): return r
    return {}
print("### MONEY PAGE metrics (current vs previous 28d) ###")
print(f"{'page':<34} {'impr_p':>7}{'impr_c':>7} {'clk_p':>5}{'clk_c':>5} {'pos_p':>6}{'pos_c':>6}")
mp=[]
for m in MONEY:
    a=page(m,pp); b=page(m,pc)
    print(f"{m:<34} {a.get('impressions',0):>7}{b.get('impressions',0):>7} {a.get('clicks',0):>5}{b.get('clicks',0):>5} {a.get('position',0):>6}{b.get('position',0):>6}")
    mp.append({"page":m,"impr_prev":a.get("impressions",0),"impr_cur":b.get("impressions",0),
               "clicks_prev":a.get("clicks",0),"clicks_cur":b.get("clicks",0),
               "pos_prev":a.get("position",0),"pos_cur":b.get("position",0),"ctr_cur":b.get("ctr",0)})
# city group
print("\n### CITY pages aggregate ###")
def isc(u): return bool(re.match(r"^https://bm-klus-bv\.nl/gevelisolatie/[a-z-]+/$",u)) and not any(x in u for x in ["kosten","materialen","afwerkingen","rc-waarde","subsidie"])
for label,d in [("previous",pp),("current",pc)]:
    cs=[r for u,r in d.items() if isc(u)]
    print(f"  {label}: pages={len(cs)} impr={sum(r['impressions'] for r in cs)} clicks={sum(r['clicks'] for r in cs)}")

(PROC/"_money_page_metrics.json").write_text(json.dumps(mp,indent=2,ensure_ascii=False),encoding="utf-8")
print("\n### query gap headlines ###")
print("lost_query (>=20 prev impr):")
for r in sorted([r for r in rows if "lost_query" in r["flags"] and r["impr_prev"]>=20],key=lambda r:-r["impr_prev"])[:15]:
    print(f"  -{r['impr_prev']} impr  pos_prev={r['pos_prev']}  {r['query'][:45]}")
print("fell_gt5pos:")
for r in sorted([r for r in rows if "fell_gt5pos" in r["flags"]],key=lambda r:-(r['d_pos'] if isinstance(r['d_pos'],(int,float)) else 0))[:15]:
    print(f"  {r['pos_prev']}->{r['pos_cur']} (+{r['d_pos']})  impr {r['impr_prev']}->{r['impr_cur']}  {r['query'][:42]}")
print("wrong_owner queries:")
for r in [r for r in own_rows if r["wrong_owner"]=="yes"][:15]:
    print(f"  {r['query'][:34]:<34} owner={r['actual_owner']:<28} exp={r['expected_page']}")
print("\nDONE gsc analysis.")
