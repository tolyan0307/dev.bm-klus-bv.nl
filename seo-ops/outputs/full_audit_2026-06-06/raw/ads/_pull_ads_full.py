"""
Comprehensive READ-ONLY Google Ads pull for the 2026-06-06 full audit.
Campaign 23271040037 (NL | Gevelisolatie | Search), customer 5902256023.

Dumps raw JSON per query group into this directory. No mutations.
Run with: D:/projects/bmklus/google/.venv-ads/Scripts/python.exe
"""
from __future__ import annotations
import json, sys
from pathlib import Path
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.protobuf.json_format import MessageToDict

YAML = "D:/projects/bmklus/google/google-ads.yaml"
CUST = "5902256023"
CID = "23271040037"
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/ads")

WINDOWS = {
    "healthy_2026-04-06_2026-04-23": ("2026-04-06", "2026-04-23"),
    "bad_2026-04-24_2026-05-08":     ("2026-04-24", "2026-05-08"),
    "recovery_2026-05-10_2026-06-05":("2026-05-10", "2026-06-05"),
    "fresh28d_2026-05-09_2026-06-05":("2026-05-09", "2026-06-05"),
    "postcutover_2026-03-15_2026-06-05":("2026-03-15", "2026-06-05"),
}

client = GoogleAdsClient.load_from_storage(YAML, version="v23")
svc = client.get_service("GoogleAdsService")

def run(query: str) -> list[dict]:
    rows = []
    for batch in svc.search_stream(customer_id=CUST, query=query):
        for row in batch.results:
            rows.append(MessageToDict(row._pb))
    return rows

def save(name: str, data) -> None:
    p = OUT / f"{name}.json"
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  saved {p.name}: {len(data) if isinstance(data,list) else 'obj'} rows")

def safe(name, query):
    try:
        data = run(query)
        save(name, data)
        return data
    except GoogleAdsException as e:
        msgs = [f"[{er.error_code}] {er.message}" for er in e.failure.errors]
        print(f"  ERROR {name}: {msgs}")
        save(name + "__ERROR", {"errors": msgs})
        return None
    except Exception as e:
        print(f"  ERROR {name}: {type(e).__name__}: {e}")
        save(name + "__ERROR", {"error": f"{type(e).__name__}: {e}"})
        return None

print("== 1. Campaign daily (post-cutover, sliceable) ==")
safe("campaign_daily_postcutover", f"""
  SELECT segments.date, metrics.impressions, metrics.clicks, metrics.ctr,
         metrics.average_cpc, metrics.cost_micros, metrics.conversions,
         metrics.all_conversions, metrics.conversions_value,
         metrics.search_impression_share, metrics.search_budget_lost_impression_share,
         metrics.search_rank_lost_impression_share, metrics.search_top_impression_share,
         metrics.search_absolute_top_impression_share
  FROM campaign
  WHERE campaign.id = {CID} AND segments.date BETWEEN '2026-03-15' AND '2026-06-05'
  ORDER BY segments.date ASC
""")

print("== 2. Per-window campaign aggregate + IS ==")
for wname,(s,e) in WINDOWS.items():
    safe(f"campaign_agg__{wname}", f"""
      SELECT campaign.id, campaign.name, metrics.impressions, metrics.clicks, metrics.ctr,
             metrics.average_cpc, metrics.cost_micros, metrics.conversions, metrics.all_conversions,
             metrics.conversions_value, metrics.cost_per_conversion,
             metrics.search_impression_share, metrics.search_budget_lost_impression_share,
             metrics.search_rank_lost_impression_share, metrics.search_top_impression_share,
             metrics.search_absolute_top_impression_share
      FROM campaign
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
    """)

print("== 3. Current campaign settings ==")
safe("campaign_settings", f"""
  SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
         campaign.advertising_channel_sub_type, campaign.bidding_strategy_type,
         campaign.bidding_strategy_system_status, campaign.maximize_conversions.target_cpa_micros,
         campaign.target_cpa.target_cpa_micros, campaign.target_roas.target_roas,
         campaign.network_settings.target_google_search,
         campaign.network_settings.target_search_network,
         campaign.network_settings.target_content_network,
         campaign.network_settings.target_partner_search_network,
         campaign.geo_target_type.positive_geo_target_type,
         campaign.geo_target_type.negative_geo_target_type,
         campaign_budget.amount_micros, campaign_budget.delivery_method,
         campaign_budget.explicitly_shared
  FROM campaign WHERE campaign.id = {CID}
""")

print("== 4. Bidding strategy (if portfolio) ==")
safe("bidding_strategy", f"""
  SELECT campaign.id, bidding_strategy.id, bidding_strategy.name, bidding_strategy.type,
         bidding_strategy.status, bidding_strategy.maximize_conversions.target_cpa_micros
  FROM campaign WHERE campaign.id = {CID}
""")

print("== 5. Device bid modifiers / campaign criteria ==")
safe("campaign_criteria", f"""
  SELECT campaign_criterion.criterion_id, campaign_criterion.type,
         campaign_criterion.bid_modifier, campaign_criterion.negative,
         campaign_criterion.device.type, campaign_criterion.location.geo_target_constant,
         campaign_criterion.language.language_constant,
         campaign_criterion.status
  FROM campaign_criterion WHERE campaign.id = {CID}
""")

print("== 6. Conversion goals attached to campaign ==")
safe("campaign_conversion_goals", f"""
  SELECT campaign.id, campaign.selective_optimization.conversion_actions
  FROM campaign WHERE campaign.id = {CID}
""")

print("== 7. Conversion actions (account-level) ==")
safe("conversion_actions", """
  SELECT conversion_action.id, conversion_action.name, conversion_action.status,
         conversion_action.type, conversion_action.category,
         conversion_action.counting_type, conversion_action.primary_for_goal,
         conversion_action.include_in_conversions_metric
  FROM conversion_action
""")

print("== 8. Change history (last 30d API limit) ==")
safe("change_history_30d", f"""
  SELECT change_event.change_date_time, change_event.change_resource_type,
         change_event.client_type, change_event.user_email, change_event.resource_change_operation,
         change_event.changed_fields, change_event.old_resource, change_event.new_resource
  FROM change_event
  WHERE change_event.change_date_time DURING LAST_30_DAYS
    AND campaign.id = {CID}
  ORDER BY change_event.change_date_time DESC
  LIMIT 1000
""")

print("== 9. Keywords per window (healthy/bad/recovery) ==")
for wname in ["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-05"]:
    s,e = WINDOWS[wname]
    safe(f"keywords__{wname}", f"""
      SELECT ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group_criterion.status, ad_group_criterion.negative,
             ad_group_criterion.effective_cpc_bid_micros, ad_group_criterion.quality_info.quality_score,
             metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions,
             metrics.all_conversions, metrics.ctr, metrics.average_cpc
      FROM keyword_view
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
      ORDER BY metrics.cost_micros DESC
    """)

print("== 10. Search terms per window ==")
for wname in ["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-05"]:
    s,e = WINDOWS[wname]
    safe(f"search_terms__{wname}", f"""
      SELECT search_term_view.search_term, search_term_view.status, ad_group.name,
             segments.keyword.info.text, segments.keyword.info.match_type,
             metrics.impressions, metrics.clicks, metrics.cost_micros,
             metrics.conversions, metrics.all_conversions
      FROM search_term_view
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
      ORDER BY metrics.cost_micros DESC
    """)

print("== 11. Device split per window ==")
for wname in ["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-05"]:
    s,e = WINDOWS[wname]
    safe(f"device__{wname}", f"""
      SELECT segments.device, metrics.impressions, metrics.clicks, metrics.cost_micros,
             metrics.conversions, metrics.all_conversions, metrics.ctr
      FROM campaign
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
    """)

print("== 12. Geo (user location, region/city) per window ==")
for wname in ["healthy_2026-04-06_2026-04-23","bad_2026-04-24_2026-05-08","recovery_2026-05-10_2026-06-05"]:
    s,e = WINDOWS[wname]
    safe(f"geo_userloc__{wname}", f"""
      SELECT user_location_view.country_criterion_id, user_location_view.targeting_location,
             segments.geo_target_region, segments.geo_target_city,
             metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
      FROM user_location_view
      WHERE campaign.id = {CID} AND segments.date BETWEEN '{s}' AND '{e}'
    """)

print("== 13. Ads / assets (RSA headlines, descriptions, final urls) ==")
safe("ads_rsa", f"""
  SELECT ad_group.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.ad.final_urls,
         ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions,
         ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.ad.responsive_search_ad.path2
  FROM ad_group_ad WHERE campaign.id = {CID}
""")

print("== 14. Campaign assets (sitelinks/extensions) ==")
safe("campaign_assets", f"""
  SELECT campaign.id, campaign_asset.field_type, asset.type, asset.name,
         asset.sitelink_asset.link_text, asset.callout_asset.callout_text,
         asset.structured_snippet_asset.header, asset.call_asset.phone_number
  FROM campaign_asset WHERE campaign.id = {CID}
""")

print("\nDONE Ads pull.")
