"""
READ-ONLY GA4 pull for the 2026-06-06 full audit. Property 428253147.
Run with the seo-ops integrations venv python (has google-analytics-data).
"""
from __future__ import annotations
import json, os
from pathlib import Path
from datetime import date

INTEG = Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/ga4")

for fn in (".env.local", ".env.example"):
    p = INTEG / fn
    if p.is_file():
        for line in p.read_text(encoding="utf-8").splitlines():
            line=line.strip()
            if line and not line.startswith("#") and "=" in line:
                k,_,v=line.partition("="); os.environ.setdefault(k.strip(), v.strip())

PROP = os.environ["BMKLUS_GA4_PROPERTY_ID"].strip()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.environ["BMKLUS_GA4_SERVICE_ACCOUNT_JSON"].strip()

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange, Dimension, Metric, RunReportRequest, Filter, FilterExpression, OrderBy,
)
client = BetaAnalyticsDataClient()

WINDOWS = {
    "healthy_2026-04-06_2026-04-23": ("2026-04-06","2026-04-23"),
    "bad_2026-04-24_2026-05-08":     ("2026-04-24","2026-05-08"),
    "recovery_2026-05-10_2026-06-05":("2026-05-10","2026-06-05"),
    "postcutover_2026-03-15_2026-06-05":("2026-03-15","2026-06-05"),
}

def report(dims, mets, s, e, limit=2000, dim_filter=None, order_metric=None):
    req = RunReportRequest(
        property=f"properties/{PROP}",
        date_ranges=[DateRange(start_date=s, end_date=e)],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets],
        limit=limit,
    )
    if dim_filter is not None:
        req.dimension_filter = dim_filter
    if order_metric:
        req.order_bys = [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_metric), desc=True)]
    resp = client.run_report(req)
    rows=[]
    for r in resp.rows:
        rows.append({**{dims[i]: r.dimension_values[i].value for i in range(len(dims))},
                     **{mets[i]: r.metric_values[i].value for i in range(len(mets))}})
    return rows

def save(name, data):
    (OUT/f"{name}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  saved {name}: {len(data)} rows")

# Key-event filter (Contact_Form_Site, Phone, Whatsapp)
KEY_EVENTS = ["Contact_Form_Site","Phone","Whatsapp","Email","generate_lead"]
ke_filter = FilterExpression(filter=Filter(
    field_name="eventName",
    in_list_filter=Filter.InListFilter(values=KEY_EVENTS)))

print("== A. Daily key events by channel (THE disambiguator) ==")
save("daily_keyevents_by_channel_postcutover", report(
    ["date","sessionDefaultChannelGroup","eventName"], ["eventCount"],
    "2026-03-15","2026-06-05", dim_filter=ke_filter))

print("== B. Daily sessions+keyEvents by channel ==")
save("daily_sessions_by_channel_postcutover", report(
    ["date","sessionDefaultChannelGroup"], ["sessions","keyEvents","engagedSessions"],
    "2026-03-15","2026-06-05"))

print("== C. Per-window channel totals ==")
for w,(s,e) in WINDOWS.items():
    save(f"channel_totals__{w}", report(
        ["sessionDefaultChannelGroup"], ["sessions","keyEvents","engagedSessions","engagementRate"],
        s, e, order_metric="sessions"))

print("== D. Per-window landing page x channel ==")
for w,(s,e) in WINDOWS.items():
    save(f"landing_by_channel__{w}", report(
        ["landingPagePlusQueryString","sessionDefaultChannelGroup"],
        ["sessions","keyEvents","engagedSessions"], s, e, order_metric="sessions"))

print("== E. Per-window key events by name x channel ==")
for w,(s,e) in WINDOWS.items():
    save(f"keyevents_by_name__{w}", report(
        ["eventName","sessionDefaultChannelGroup"], ["eventCount"], s, e,
        dim_filter=ke_filter, order_metric="eventCount"))

print("== F. Paid-specific: sourceMedium x campaign x landing (per window) ==")
paid_filter = FilterExpression(filter=Filter(
    field_name="sessionSourceMedium",
    string_filter=Filter.StringFilter(value="google / cpc")))
for w,(s,e) in WINDOWS.items():
    save(f"paid_landing__{w}", report(
        ["landingPagePlusQueryString","sessionCampaignName","deviceCategory"],
        ["sessions","keyEvents"], s, e, dim_filter=paid_filter, order_metric="sessions"))

print("== G. Key events by name x source/medium (per window) — attribution check ==")
for w,(s,e) in WINDOWS.items():
    save(f"keyevents_by_sourcemedium__{w}", report(
        ["eventName","sessionSourceMedium"], ["eventCount"], s, e,
        dim_filter=ke_filter, order_metric="eventCount"))

print("\nDONE GA4 pull.")
