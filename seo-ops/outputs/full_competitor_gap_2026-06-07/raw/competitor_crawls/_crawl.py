"""Crawl non-aggregator competitor pages + key BM pages, extract content-gap dimensions."""
from __future__ import annotations
import json, re, time, urllib.request, urllib.error
from html import unescape
from pathlib import Path
B=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07")
OUT=B/"raw/competitor_crawls"
UA={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"}
targets=json.loads((B/"processed/_competitor_crawl_targets.json").read_text(encoding="utf-8"))
BM=[ "https://bm-klus-bv.nl/gevelisolatie/kosten/","https://bm-klus-bv.nl/buiten-stucwerk/",
     "https://bm-klus-bv.nl/gevelisolatie/rotterdam/","https://bm-klus-bv.nl/gevelisolatie/",
     "https://bm-klus-bv.nl/sierpleister/","https://bm-klus-bv.nl/muren-stucen/"]
URLS=[(u,"competitor") for u in targets]+[(u,"bm") for u in BM]

def fetch(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=25)
        return r.getcode(),r.read().decode("utf-8","ignore")
    except urllib.error.HTTPError as e: return e.code,""
    except Exception as e: return None,f"__ERR__{type(e).__name__}"

def txt(s): return unescape(re.sub("<[^>]+>","",s)).strip()
def allm(pat,h): return [txt(m) for m in re.findall(pat,h,re.I|re.S)]
def analyze(u,kind,h):
    title=allm(r"<title[^>]*>(.*?)</title>",h); title=title[0] if title else ""
    h1=allm(r"<h1[^>]*>(.*?)</h1>",h); h2=allm(r"<h2[^>]*>(.*?)</h2>",h); h3=allm(r"<h3[^>]*>(.*?)</h3>",h)
    body=re.sub(r"<(script|style)[^>]*>.*?</\1>"," ",h,flags=re.I|re.S)
    words=len(re.findall(r"\w+",re.sub(r"<[^>]+>"," ",body)))
    ld=set(); faq=0
    for blk in allm(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>',h):
        ld.update(re.findall(r'"@type"\s*:\s*"([^"]+)"',blk)); faq+=len(re.findall(r'"@type"\s*:\s*"Question"',blk))
    low=h.lower()
    has_table="<table" in low
    price_signals=len(re.findall(r"€\s?\d|\d+\s?(?:euro|per m2|per m²|/m2|/m²|p/m)",low))
    return {"url":u,"kind":kind,"title":title[:90],"title_len":len(title),
            "h1":h1[:2],"h2":h2,"h3_count":len(h3),"word_count":words,
            "faq_questions":faq,"schema_types":sorted(ld),
            "has_price_table":has_table and price_signals>=3,"price_mentions":price_signals,
            "has_rekenvoorbeeld":bool(re.search(r"rekenvoorbeeld|rekenhulp|calculator|prijsindicatie",low)),
            "has_project_proof":bool(re.search(r"project|uitgevoerd werk|onze werken|referentie|cases|portfolio|gerealiseerd",low)),
            "has_reviews":bool(re.search(r"beoordeling|review|sterren|klantwaardering|google reviews|trustpilot|\d[,.]\d\s*(?:sterren|/\s*5)",low)),
            "has_nadelen":bool(re.search(r"nadel",low)),"has_voordelen":bool(re.search(r"voordel",low)),
            "has_onderhoud":bool(re.search(r"onderhoud",low)),"has_subsidie":bool(re.search(r"subsidie|isde",low)),
            "has_comparison":bool(re.search(r"vergelijk|verschil tussen|versus|\bvs\b",low)),
            "has_alternatieven":bool(re.search(r"alternatief|alternatieven",low)),
            "mentions_city":len(re.findall(r"rotterdam|den haag|leiden|delft|breda|dordrecht|vlaardingen|schiedam|zoetermeer",low)),
            "has_cta_phone":bool(re.search(r"tel:|bel ons|gratis offerte|offerte aanvragen",low))}

rows=[]
for u,kind in URLS:
    code,h=fetch(u)
    if not h or h.startswith("__ERR__"):
        rows.append({"url":u,"kind":kind,"status":code,"error":h or "empty"}); print(f"  {code} ERR {u}"); time.sleep(0.4); continue
    r=analyze(u,kind,h); r["status"]=code; rows.append(r)
    print(f"  {code} {kind:<10} w={r['word_count']:<5} h2={len(r['h2']):<2} faq={r['faq_questions']} priceTbl={r['has_price_table']} reken={r['has_rekenvoorbeeld']} proof={r['has_project_proof']} rev={r['has_reviews']} nadelen={r['has_nadelen']} {u[:60]}")
    time.sleep(0.6)
(OUT/"competitor_crawl.json").write_text(json.dumps(rows,indent=2,ensure_ascii=False),encoding="utf-8")
print(f"\nsaved competitor_crawl.json ({len(rows)})")
