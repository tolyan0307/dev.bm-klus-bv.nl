"""READ-ONLY GSC pull for competitor-gap audit. Self-determines windows from latest available date."""
from __future__ import annotations
import json, os
from pathlib import Path
from datetime import date, timedelta, datetime
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

INTEG=Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07/raw")
for fn in (".env.local",".env.example"):
    p=INTEG/fn
    if p.is_file():
        for line in p.read_text(encoding="utf-8").splitlines():
            line=line.strip()
            if line and not line.startswith("#") and "=" in line:
                k,_,v=line.partition("="); os.environ.setdefault(k.strip(),v.strip())
SITE=os.environ["BMKLUS_GSC_SITE_URL"].strip()
creds=Credentials.from_authorized_user_file(os.environ["BMKLUS_GSC_TOKEN_JSON"].strip(),["https://www.googleapis.com/auth/webmasters.readonly"])
if not creds.valid and creds.expired and creds.refresh_token: creds.refresh(Request())
svc=build("searchconsole","v1",credentials=creds,cache_discovery=False)

def q(dims,s,e,limit=25000,dim_filter=None):
    body={"startDate":s,"endDate":e,"dimensions":dims,"rowLimit":limit}
    if dim_filter: body["dimensionFilterGroups"]=dim_filter
    rows=[]; start=0
    while True:
        body["startRow"]=start
        resp=svc.searchanalytics().query(siteUrl=SITE,body=body).execute()
        rs=resp.get("rows",[])
        for r in rs:
            d={dims[i]:r["keys"][i] for i in range(len(dims))}
            d.update({"clicks":r.get("clicks",0),"impressions":r.get("impressions",0),
                      "ctr":round(r.get("ctr",0),4),"position":round(r.get("position",0),2)})
            rows.append(d)
        if len(rs)<limit: break
        start+=limit
    return rows

# latest available date
end_probe=date.today()
probe=q(["date"], (end_probe-timedelta(days=10)).isoformat(), end_probe.isoformat())
latest=max(r["date"] for r in probe)
L=datetime.strptime(latest,"%Y-%m-%d").date()
cur=( (L-timedelta(days=27)).isoformat(), L.isoformat())
prev=((L-timedelta(days=55)).isoformat(), (L-timedelta(days=28)).isoformat())
d90=((L-timedelta(days=89)).isoformat(), L.isoformat())
windows={"current":cur,"previous":prev,"d90":d90}
print("latest GSC date:",latest)
print("windows:",windows)
(OUT/"gsc_windows.json").write_text(json.dumps({"latest":latest,"windows":windows},indent=2),encoding="utf-8")

def save(n,d): (OUT/f"{n}.json").write_text(json.dumps(d,indent=2,ensure_ascii=False),encoding="utf-8"); print(f"  {n}: {len(d)}")

for wn,(s,e) in windows.items():
    save(f"gsc_queries_{wn}", q(["query"],s,e))
    save(f"gsc_pages_{wn}", q(["page"],s,e))
for wn,(s,e) in {"current":cur,"previous":prev}.items():
    save(f"gsc_query_x_page_{wn}", q(["query","page"],s,e))
save("gsc_device_current", q(["device"],*cur))
save("gsc_country_current", q(["country"],*cur))
save("gsc_daily_d90", q(["date"],*d90))
print("DONE GSC.")
