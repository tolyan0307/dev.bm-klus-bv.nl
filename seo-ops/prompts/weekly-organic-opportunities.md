# Weekly Organic Opportunities

## Purpose
Identify actionable organic search opportunities and risks from the past week, based on manual GSC + GA4 exports. Produce a prioritised action list for the next 7–14 days.

## Required inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_28d.csv`
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_28d.csv`

## Optional inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_90d.csv` (for trend comparison)
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_90d.csv` (for trend comparison)
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_landing_pages_28d.csv`
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_events_28d.csv` (key events by landing page)
- Previous week's report from `seo-ops/reports/weekly/`

## Method

1. **Load and cross-reference** GSC pages and queries data. If 90d data is available, compare 28d vs 90d to detect trends.

2. **Identify opportunities:**
   - Queries with high impressions but low CTR (potential title/description mismatch).
   - Pages ranking in positions 4–15 (striking distance to page 1 or top 3).
   - Pages with rising impressions or clicks week-over-week.
   - Queries where `/gevelisolatie/` cluster pages appear but underperform.
   - New post-redesign pages starting to gain impressions.

3. **Identify risks:**
   - Pages with declining impressions or clicks.
   - Pages with worsening average position.
   - Priority pages with zero or near-zero impressions.
   - Queries splitting across multiple pages (possible cannibalization).

4. **Cross-reference with GA4** (if available):
   - Pages with organic traffic but zero key events (Contact_Form_Site, Phone, Whatsapp).
   - Pages with key events but low organic visibility — may need SEO support.
   - Mismatches between GSC visibility and GA4 engagement signals.

5. **Classify each finding:**
   - SEO opportunity (content, metadata, internal links, position improvement).
   - CRO/CTA issue (traffic exists but conversions are weak — likely on-page problem).
   - Data gap / measurement issue (not enough data, tracking suspect, too early to call).

6. **Prioritise** by impact potential and confidence level.

## Preferred output sections

1. **Executive summary** — 3–5 sentences max.
2. **Top opportunities** — ranked list with page, query context, metric evidence, and recommended action.
3. **Top risks** — ranked list with page, metric evidence, and urgency.
4. **Quick wins (next 7–14 days)** — specific, actionable items.
5. **Pages to watch next week** — pages where data is too thin to act but trend is notable.
6. **Action list** — deduplicated, with each item tagged as SEO / CRO / measurement.

## Do not
- Invent data that is not present in the provided exports.
- Treat low-volume queries (< 10 impressions) as significant signals without noting the sample size.
- Declare a page "failing" without checking whether it launched recently and may still be accumulating data.
- Recommend large content rewrites based on a single week of data.
- Mix organic findings with paid/ads analysis.
- Produce generic SEO advice not grounded in the actual data.
- Ignore the `/gevelisolatie/` cluster — it is the strategic priority.
- If any required input is missing, state: **"Missing data needed:"** and list exactly what is absent. Do not proceed with guesses.
