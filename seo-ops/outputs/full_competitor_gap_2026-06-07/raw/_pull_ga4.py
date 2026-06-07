"""READ-ONLY GA4 pull for competitor-gap audit: current vs previous 28d."""
from __future__ import annotations
import json, os
from pathlib import Path
INTEG=Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07/raw")
for fn in (".env.local",".env.example"):
    p=INTEG/fn
    if p.is_file():
        for line in p.read_text(encoding="utf-8").splitlines():
            line=line.strip()
            if line and not line.startswith("#") and "=" in line:
                k,_,v=line.partition("="); os.environ.setdefault(k.strip(),v.strip())
PROP=os.environ["BMKLUS_GA4_PROPERTY_ID"].strip()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=os.environ["BMKLUS_GA4_SERVICE_ACCOUNT_JSON"].strip()
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange,Dimension,Metric,RunReportRequest,Filter,FilterExpression,OrderBy
c=BetaAnalyticsDataClient()
WIN={"current":("2026-05-06","2026-06-02"),"previous":("2026-04-08","2026-05-05")}
def rep(dims,mets,s,e,limit=2000,df=None,om=None):
    req=RunReportRequest(property=f"properties/{PROP}",date_ranges=[DateRange(start_date=s,end_date=e)],
        dimensions=[Dimension(name=d) for d in dims],metrics=[Metric(name=m) for m in mets],limit=limit)
    if df is not None: req.dimension_filter=df
    if om: req.order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name=om),desc=True)]
    r=c.run_report(req)
    return [{**{dims[i]:row.dimension_values[i].value for i in range(len(dims))},
             **{mets[i]:row.metric_values[i].value for i in range(len(mets))}} for row in r.rows]
def save(n,d): (OUT/f"{n}.json").write_text(json.dumps(d,indent=2,ensure_ascii=False),encoding="utf-8"); print(f"  {n}: {len(d)}")
KE=["Contact_Form_Site","Phone","Whatsapp","Email","generate_lead"]
kef=FilterExpression(filter=Filter(field_name="eventName",in_list_filter=Filter.InListFilter(values=KE)))
for w,(s,e) in WIN.items():
    save(f"ga4_channel_totals_{w}", rep(["sessionDefaultChannelGroup"],["sessions","keyEvents","engagedSessions","engagementRate"],s,e,om="sessions"))
    save(f"ga4_landing_by_channel_{w}", rep(["landingPagePlusQueryString","sessionDefaultChannelGroup"],["sessions","keyEvents","engagedSessions"],s,e,om="sessions"))
    save(f"ga4_keyevents_by_name_{w}", rep(["eventName","sessionDefaultChannelGroup"],["eventCount"],s,e,df=kef,om="eventCount"))
    save(f"ga4_sourcemedium_{w}", rep(["sessionSourceMedium"],["sessions","keyEvents"],s,e,om="sessions"))
print("DONE GA4.")
