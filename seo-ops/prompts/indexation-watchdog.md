# Indexation Watchdog

## Purpose
Monitor indexation health and post-redesign visibility for priority pages. Detect missing, weak, or cannibalising pages early. Avoid false alarms on pages that are still accumulating data.

## Required inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_28d.csv`

## Optional inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_90d.csv`
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_28d.csv`
- `seo-ops/config/priority-pages.yaml`
- Previous indexation report from `seo-ops/reports/audits/`

## Method

1. **Build expected page list** from `priority-pages.yaml` (wave 1 + wave 2). If config is unavailable, use the hardcoded priority list below.

2. **Compare expected vs actual:**
   - For each priority page, check if it appears in GSC pages export.
   - Flag pages with zero impressions in 28d as **not indexed or not ranking**.
   - Flag pages with < 10 impressions in 28d as **weakly visible**.

3. **Detect cannibalization:**
   - From queries export, find queries where 2+ priority pages receive impressions for the same query.
   - Flag cases where a lower-priority page outranks the intended target page.
   - Pay special attention to `/gevelisolatie/` cluster — child pages should not cannibalise the parent.

4. **Detect anomalies:**
   - Pages with impressions but 0 clicks and very low CTR (< 1%) — possible metadata or SERP feature issue.
   - Pages with sudden impression drops compared to 90d baseline (if available).
   - Non-priority pages receiving significant impressions that might be stealing from priority pages.

5. **Account for timing:**
   - Pages launched after the redesign may need 4–8 weeks to stabilise in GSC.
   - If a page has been live < 4 weeks, note this and reduce urgency.
   - Do not escalate a newly launched page to "critical" without strong evidence.

6. **Assign urgency tier:**
   - **Critical** — priority page completely absent from GSC for 4+ weeks, or confirmed deindexed.
   - **Medium** — priority page present but with very weak signals, or possible cannibalization affecting a money page.
   - **Low** — minor anomaly, page still accumulating data, or issue affects a non-strategic page.

## Priority pages reference

### Wave 1
- `/`, `/diensten/`, `/onze-werken/`, `/over-ons/`, `/contact/`
- `/gevelisolatie/`, `/gevel-schilderen/`, `/buiten-stucwerk/`, `/sierpleister/`, `/muren-stucen/`
- `/gevelisolatie/kosten/`, `/gevelisolatie/afwerkingen/`, `/gevelisolatie/materialen/`, `/gevelisolatie/rc-waarde-dikte/`, `/gevelisolatie/subsidie-vergunning/`

### Wave 2
- `/gevelisolatie/delft/`, `/gevelisolatie/dordrecht/`

## Preferred output sections

1. **Indexation status summary** — total priority pages, how many visible, how many missing/weak.
2. **Missing pages** — list with probable cause and urgency tier.
3. **Weakly visible pages** — list with impressions count, avg position, and probable cause.
4. **Cannibalization flags** — query, competing pages, which one should win, urgency.
5. **Anomalies** — anything unusual that does not fit the above categories.
6. **Recommended checks** — per issue, tagged as:
   - Sitemap check
   - Internal links check
   - Metadata / title intent
   - Duplication / cannibalization
   - Content depth / query fit
   - Technical (robots, noindex, redirect)
7. **Re-check next week** — pages to monitor in the next cycle.

## Do not
- Invent impressions or indexation status not present in the exports.
- Declare a page "deindexed" based only on zero impressions in 28d — it may simply not rank for tracked queries. Note the distinction.
- Overreact to low-volume pages without enough data points.
- Treat wave 2 pages with the same urgency as wave 1 money pages.
- Skip the `/gevelisolatie/` cluster — it is the strategic priority.
- Recommend resubmitting URLs to Google or using URL Inspection Tool as a fix — those are diagnostic steps, not solutions.
- If any required input is missing, state: **"Missing data needed:"** and list exactly what is absent.
