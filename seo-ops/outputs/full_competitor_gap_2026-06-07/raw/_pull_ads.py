"""READ-ONLY Ads pull for competitor-gap audit: 30/60/90d + recovery, keywords/search terms current vs previous 28d."""
from __future__ import annotations
import json
from pathlib import Path
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.json_format import MessageToDict
YAML="D:/projects/bmklus/google/google-ads.yaml"; CUST="5902256023"; CID="23271040037"
OUT=Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_competitor_gap_2026-06-07/raw")
svc=GoogleAdsClient.load_from_storage(YAML,version="v23").get_service("GoogleAdsService")
def run(qy):
    rows=[]
    for b in svc.search_stream(customer_id=CUST,query=qy):
        for r in b.results: rows.append(MessageToDict(r._pb))
    return rows
def safe(n,qy):
    try:
        d=run(qy); (OUT/f"{n}.json").write_text(json.dumps(d,indent=2,ensure_ascii=False),encoding="utf-8"); print(f"  {n}: {len(d)}")
    except GoogleAdsException as e: print(f"  ERR {n}: {[f'{x.error_code}:{x.message}' for x in e.failure.errors]}")
    except Exception as e: print(f"  ERR {n}: {type(e).__name__}: {e}")

AGG={"last30d":"DURING LAST_30_DAYS","last60d":"BETWEEN '2026-04-08' AND '2026-06-06'",
     "last90d":"BETWEEN '2026-03-09' AND '2026-06-06'","recovery":"BETWEEN '2026-05-10' AND '2026-06-06'"}
for n,clause in AGG.items():
    safe(f"ads_campaign_{n}", f"""SELECT campaign.id, metrics.impressions, metrics.clicks, metrics.ctr,
      metrics.average_cpc, metrics.cost_micros, metrics.conversions, metrics.all_conversions,
      metrics.cost_per_conversion, metrics.search_impression_share, metrics.search_budget_lost_impression_share,
      metrics.search_rank_lost_impression_share, metrics.search_top_impression_share,
      metrics.search_absolute_top_impression_share FROM campaign
      WHERE campaign.id={CID} AND segments.date {clause}""")

WIN={"current":("2026-05-06","2026-06-02"),"previous":("2026-04-08","2026-05-05")}
for w,(s,e) in WIN.items():
    safe(f"ads_keywords_{w}", f"""SELECT ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
      ad_group_criterion.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions,
      metrics.all_conversions, metrics.ctr FROM keyword_view
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}' ORDER BY metrics.cost_micros DESC""")
    safe(f"ads_search_terms_{w}", f"""SELECT search_term_view.search_term, ad_group.name, metrics.impressions,
      metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.all_conversions FROM search_term_view
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}' ORDER BY metrics.cost_micros DESC""")
    safe(f"ads_geo_{w}", f"""SELECT campaign.id, segments.geo_target_city, metrics.impressions, metrics.clicks,
      metrics.cost_micros, metrics.conversions FROM user_location_view
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}'""")
    safe(f"ads_conv_by_action_{w}", f"""SELECT segments.conversion_action_name, segments.conversion_action_category,
      metrics.all_conversions, metrics.conversions FROM campaign
      WHERE campaign.id={CID} AND segments.date BETWEEN '{s}' AND '{e}' AND metrics.all_conversions > 0""")
print("DONE Ads.")
