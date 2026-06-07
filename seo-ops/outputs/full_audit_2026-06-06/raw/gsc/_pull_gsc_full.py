"""
READ-ONLY GSC pull for the 2026-06-06 full audit.
Run with the seo-ops integrations venv python.
"""
from __future__ import annotations
import json, os, time
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

INTEG = Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/gsc")

for fn in (".env.local", ".env.example"):
    p = INTEG / fn
    if p.is_file():
        for line in p.read_text(encoding="utf-8").splitlines():
            line=line.strip()
            if line and not line.startswith("#") and "=" in line:
                k,_,v=line.partition("="); os.environ.setdefault(k.strip(), v.strip())

SITE = os.environ["BMKLUS_GSC_SITE_URL"].strip()
TOKEN = os.environ["BMKLUS_GSC_TOKEN_JSON"].strip()
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
if not creds.valid and creds.expired and creds.refresh_token:
    creds.refresh(Request())
svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

WINDOWS = {
    "healthy_2026-04-06_2026-04-23": ("2026-04-06","2026-04-23"),
    "bad_2026-04-24_2026-05-08":     ("2026-04-24","2026-05-08"),
    "recovery_2026-05-10_2026-06-02":("2026-05-10","2026-06-02"),
    "postcutover_2026-03-15_2026-06-02":("2026-03-15","2026-06-02"),
}

def q(dims, s, e, limit=5000):
    body={"startDate":s,"endDate":e,"dimensions":dims,"rowLimit":limit}
    rows=[]; start=0
    while True:
        body["startRow"]=start
        resp=svc.searchanalytics().query(siteUrl=SITE, body=body).execute()
        rs=resp.get("rows",[])
        for r in rs:
            d={dims[i]: r["keys"][i] for i in range(len(dims))}
            d.update({"clicks":r.get("clicks",0),"impressions":r.get("impressions",0),
                      "ctr":round(r.get("ctr",0),4),"position":round(r.get("position",0),1)})
            rows.append(d)
        if len(rs)<limit: break
        start+=limit
    return rows

def save(name,data):
    (OUT/f"{name}.json").write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding="utf-8")
    print(f"  saved {name}: {len(data)} rows")

print("== site-wide daily ==")
save("site_daily_postcutover", q(["date"], "2026-03-15","2026-06-02"))

print("== page-level per window ==")
for w,(s,e) in WINDOWS.items():
    save(f"pages__{w}", q(["page"], s, e))

print("== query-level per window ==")
for w,(s,e) in WINDOWS.items():
    save(f"queries__{w}", q(["query"], s, e))

print("== query x page per window (healthy/bad/recovery) ==")
for w in ["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-02"]:
    s,e = WINDOWS[w]
    save(f"query_x_page__{w}", q(["query","page"], s, e))

print("== URL Inspection ==")
URLS = [
 "https://bm-klus-bv.nl/",
 "https://bm-klus-bv.nl/gevelisolatie/",
 "https://bm-klus-bv.nl/gevelisolatie/kosten/",
 "https://bm-klus-bv.nl/gevelisolatie/afwerkingen/",
 "https://bm-klus-bv.nl/buiten-stucwerk/",
 "https://bm-klus-bv.nl/muren-stucen/",
 "https://bm-klus-bv.nl/sierpleister/",
 "https://bm-klus-bv.nl/gevel-schilderen/",
 "https://bm-klus-bv.nl/gevelisolatie/rotterdam/",
 "https://bm-klus-bv.nl/gevelisolatie/leiden/",
 "https://bm-klus-bv.nl/gevelisolatie/breda/",
 "https://bm-klus-bv.nl/gevelisolatie/zoetermeer/",
 "https://bm-klus-bv.nl/gevelisolatie/den-haag/",
 "https://bm-klus-bv.nl/gevelisolatie/dordrecht/",
 "https://bm-klus-bv.nl/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/",
 "https://bm-klus-bv.nl/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/",
 "https://bm-klus-bv.nl/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/",
 "https://bm-klus-bv.nl/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/",
 "https://bm-klus-bv.nl/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/",
 "https://bm-klus-bv.nl/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/",
]
insp=[]
for u in URLS:
    try:
        r = svc.urlInspection().index().inspect(
            body={"inspectionUrl":u,"siteUrl":SITE,"languageCode":"nl-NL"}).execute()
        res = r.get("inspectionResult",{}).get("indexStatusResult",{})
        insp.append({"url":u,
            "verdict":res.get("verdict"),
            "coverageState":res.get("coverageState"),
            "robotsTxtState":res.get("robotsTxtState"),
            "indexingState":res.get("indexingState"),
            "pageFetchState":res.get("pageFetchState"),
            "lastCrawlTime":res.get("lastCrawlTime"),
            "googleCanonical":res.get("googleCanonical"),
            "userCanonical":res.get("userCanonical")})
        print(f"  {res.get('verdict')}/{res.get('coverageState')}  {u}")
    except Exception as ex:
        insp.append({"url":u,"error":f"{type(ex).__name__}: {ex}"})
        print(f"  ERROR {u}: {type(ex).__name__}")
    time.sleep(0.4)
save("url_inspection", insp)
print("\nDONE GSC pull.")
