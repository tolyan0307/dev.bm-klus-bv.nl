# Data Collection Status — Full Audit 2026-06-06

READ-ONLY run. All artifacts under `seo-ops/outputs/full_audit_2026-06-06/`.

## Source / auth status (live-verified)

| Source | Auth | Pulled | Blocker resolved |
|--------|------|--------|------------------|
| Google Ads API | refresh token VALID (re-auth not needed) | ✅ | `google-ads` SDK was missing → installed into **isolated venv** `D:/projects/bmklus/google/.venv-ads` (Python 3.14, separate from GSC/GA4 env). `google-ads.yaml` unchanged, token not regenerated. |
| GSC | OAuth token refreshed (non-interactive) | ✅ | latest data date 2026-06-02 |
| GA4 | service account | ✅ | property 428253147 |
| GBP | OAuth token refreshed | ✅ | location resolves |
| DataForSEO | basic auth OK (status 20000) | ✅ done | **actual spend $1.01** of $3; 74/82 results (8 read-timeouts) |

> Note on `.venv-ads`: it pre-existed as a Python **3.14** env with `google-ads 30.0.0`. An earlier `python -m venv` accidentally rewrote it to 3.12 (grpc cygrpc mismatch); it was **restored to 3.14** and verified working. No other environment was touched.

## Artifacts written

**raw/**
- `_preflight_status.json`
- `ads/` — campaign_daily_postcutover, campaign_agg×5 windows, campaign_settings, bidding_strategy, campaign_criteria, conversion_actions, campaign_conversion_goals, change_history_28d, keywords×3, search_terms×3, device×3, geo_userloc×3, ads_rsa, campaign_assets
- `ga4/` — daily_keyevents_by_channel, daily_sessions_by_channel, channel_totals×4, landing_by_channel×4, keyevents_by_name×4, paid_landing×4, keyevents_by_sourcemedium×4
- `gsc/` — site_daily, pages×4, queries×4, query_x_page×3, url_inspection
- `gbp/` — performance_85d, reviews
- `dataforseo/` — serp_raw.jsonl, serp_extracted.json, serp_costlog.json (on completion)
- `crawl/` — crawl_full.json (52 URLs)

**processed/**
- gsc_summary.json, ga4_summary.json, ads_summary.json, crawl_summary.json, _narrative.json
- page_inventory.csv, query_loss.csv, query_page_ownership.csv, ads_keyword_matrix.csv (186), ads_search_terms_matrix.csv (330)
- serp_summary.json, competitor_serp_matrix.csv (on SERP completion)

**memos/**
- 00_preflight.md, 01_data_collection_status.md (this), 02_initial_findings_no_actions.md, 03_form_test_checklist.md

## Pull scripts (reusable, under raw/*/ and processed/)
`_pull_ads_full.py`, `_pull_ads_fix.py`, `_pull_ga4_full.py`, `_pull_gsc_full.py`, `_pull_gbp_full.py`,
`_pull_serp.py`, `_crawl.py`, `_analyze.py`, `_build_processed.py`.
Ads scripts run with `.venv-ads` python; the rest with the seo-ops integrations venv (`PYTHONUTF8=1` for GSC/console).

## Secrets discipline
No tokens/passwords/credential file contents printed or written into any artifact. `.env.local` checked for key *presence* only.
