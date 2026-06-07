"""Supplement Ads pull: ad_group, hour-of-day, landing page, conversion-action breakdown per window."""
from __future__ import annotations
import json
from pathlib import Path
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.json_format import MessageToDict

YAML="D:/projects/bmklus/google/google-ads.yaml"; CUST="5902256023"; CID="23271040037"
OUT=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/ads")
svc=GoogleAdsClient.load_from_storage(YAML,version="v23").get_service("GoogleAdsService")
def run(q):
    rows=[]
    for b in svc.search_stream(customer_id=CUST,query=q):
        for r in b.results: rows.append(MessageToDict(r._pb))
    return rows
def safe(n,q):
    try:
        d=run(q);(OUT/f"{n}.json").write_text(json.dumps(d,indent=2,ensure_ascii=False),encoding="utf-8");print(f"  {n}: {len(d)}")
    except GoogleAdsException as e:
        print(f"  ERR {n}: {[f'{x.error_code}:{x.message}' for x in e.failure.errors]}")
    except Exception as e: print(f"  ERR {n}: {type(e).__name__}: {e}")

WIN={"healthy_2026-04-06_2026-04-23":("2026-04-06","2026-04-23"),
     "bad_2026-04-24_2026-05-09":("2026-04-24","2026-05-09"),
     "recovery_2026-05-10_2026-06-05":("2026-05-10","2026-06-05")}

print("== ad_group per window ==")
for w,(s,e) in WIN.items():
    safe(f"adgroup__{w}", f"""SELECT ad_group.name, ad_group.status, metrics.impressions, metrics.clicks,
      metrics.cost_micros, metrics.conversions, metrics.all_conversions, metrics.ctr, metrics.average_cpc
      FROM ad_group WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}'""")

print("== hour-of-day per window ==")
for w,(s,e) in WIN.items():
    safe(f"hour__{w}", f"""SELECT segments.hour, metrics.impressions, metrics.clicks, metrics.cost_micros,
      metrics.conversions, metrics.all_conversions FROM campaign
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}'""")

print("== landing page per window ==")
for w,(s,e) in WIN.items():
    safe(f"landing__{w}", f"""SELECT landing_page_view.unexpanded_final_url, metrics.impressions, metrics.clicks,
      metrics.cost_micros, metrics.conversions FROM landing_page_view
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}'""")

print("== conversions by conversion-action per window (which actions actually fired) ==")
for w,(s,e) in WIN.items():
    safe(f"conv_by_action__{w}", f"""SELECT segments.conversion_action_name, segments.conversion_action_category,
      metrics.all_conversions, metrics.conversions FROM campaign
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}'
      AND metrics.all_conversions > 0""")
print("DONE supplement.")
