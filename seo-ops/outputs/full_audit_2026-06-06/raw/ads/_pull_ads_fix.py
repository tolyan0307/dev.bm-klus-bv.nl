"""Patch pull: re-run the 3 Ads queries that failed in _pull_ads_full.py."""
from __future__ import annotations
import json
from pathlib import Path
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.json_format import MessageToDict

YAML = "D:/projects/bmklus/google/google-ads.yaml"
CUST = "5902256023"; CID = "23271040037"
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/ads")
svc = GoogleAdsClient.load_from_storage(YAML, version="v23").get_service("GoogleAdsService")

def run(q):
    rows=[]
    for b in svc.search_stream(customer_id=CUST, query=q):
        for r in b.results: rows.append(MessageToDict(r._pb))
    return rows
def safe(name,q):
    try:
        d=run(q); (OUT/f"{name}.json").write_text(json.dumps(d,indent=2,ensure_ascii=False),encoding="utf-8")
        print(f"  saved {name}: {len(d)} rows")
    except GoogleAdsException as e:
        print(f"  ERROR {name}: {[f'[{er.error_code}] {er.message}' for er in e.failure.errors]}")
    except Exception as e:
        print(f"  ERROR {name}: {type(e).__name__}: {e}")

# 3a. settings without geo_target_type
safe("campaign_settings", f"""
  SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
         campaign.advertising_channel_sub_type, campaign.bidding_strategy_type,
         campaign.bidding_strategy_system_status, campaign.maximize_conversions.target_cpa_micros,
         campaign.target_cpa.target_cpa_micros, campaign.target_roas.target_roas,
         campaign.network_settings.target_google_search,
         campaign.network_settings.target_search_network,
         campaign.network_settings.target_content_network,
         campaign.network_settings.target_partner_search_network,
         campaign_budget.amount_micros, campaign_budget.delivery_method, campaign_budget.explicitly_shared
  FROM campaign WHERE campaign.id = {CID}
""")

# 3b. change history within 28d explicit range
safe("change_history_28d", f"""
  SELECT change_event.change_date_time, change_event.change_resource_type,
         change_event.client_type, change_event.user_email, change_event.resource_change_operation,
         change_event.changed_fields, campaign.id
  FROM change_event
  WHERE change_event.change_date_time BETWEEN '2026-05-09 00:00:00' AND '2026-06-06 23:59:59'
    AND campaign.id = {CID}
  ORDER BY change_event.change_date_time DESC
  LIMIT 2000
""")

# 3c. geo with campaign.id, per window
WIN = {"healthy_2026-04-06_2026-04-23":("2026-04-06","2026-04-23"),
       "bad_2026-04-24_2026-05-08":("2026-04-24","2026-05-08"),
       "recovery_2026-05-10_2026-06-05":("2026-05-10","2026-06-05")}
for w,(s,e) in WIN.items():
    safe(f"geo_userloc__{w}", f"""
      SELECT campaign.id, segments.geo_target_region, segments.geo_target_city,
             metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
      FROM user_location_view
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
    """)
print("DONE fix.")
