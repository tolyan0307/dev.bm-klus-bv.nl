# 01 — Data Freshness & Coverage (Competitor Gap Audit, 2026-06-07)

READ-ONLY. All APIs live-verified (same stack as the 2026-06-06 full audit; Ads via isolated `.venv-ads`).

## Windows (no mixing; both comparison windows are 28d → directly comparable)
| Window | Range | Source |
|---|---|---|
| GSC current | 2026-05-06 → 2026-06-02 (latest GSC date) | GSC |
| GSC previous | 2026-04-08 → 2026-05-05 | GSC |
| GSC 90d trend | 2026-03-05 → 2026-06-02 | GSC |
| GA4 current / previous | same 28d ranges as GSC | GA4 |
| Ads last30/60/90d | ending 2026-06-06 | Ads API |
| Ads recovery | 2026-05-10 → 2026-06-06 | Ads API |

**Caveat:** the GSC/GA4 *previous* window (2026-04-08→05-05) overlaps the known conversion-incident window
(2026-04-24→05-09). So "previous" key-event counts are partly depressed by that incident; organic *traffic*
(sessions/impressions) in "previous" is not affected by tracking and is a clean comparison.

## Source status
| Source | Status | Notes |
|---|---|---|
| GSC | ✅ | latest data date 2026-06-02 (lag ~5d) |
| GA4 | ✅ | property 428253147 |
| Ads API | ✅ | campaign 23271040037 ENABLED, MAX_CONVERSIONS, €9/day |
| GBP | ✅ | 90d series + reviews |
| DataForSEO SERP | ⏳/✅ | 53 queries × desktop+mobile, depth 100, NL/nl; cap $3 |
| Live crawl (BM) | ✅ (from 2026-06-06 audit, 52 URLs) | reused; re-crawled competitors fresh |
| DataForSEO backlinks | see memo 03 | pulled only if within $3 budget; else marked "not pulled / authority not measured" |

## Artifacts
- raw/: gsc_*, ga4_*, ads_*, gbp_*, dataforseo_serp/, competitor_crawls/
- processed/: query_gap_matrix.csv, query_page_ownership_map.csv, ads_keyword_action_matrix.csv,
  non_aggregator_competitor_matrix.csv, page_action_matrix.csv, serp_summary
- No secrets written. Spend tracked in dataforseo_serp/serp_costlog.json.
