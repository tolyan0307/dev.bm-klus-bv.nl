# SEO / Analytics Analysis Report

Generated: 2026-10-22T16:41:43.255926+00:00
Site: https://bm-klus-bv.nl/
Snapshot from: 2026-10-22T16:39:49.879083Z
GSC window: 2026-09-22 → 2026-10-19 (final data)

Rule findings are leads to verify, not conclusions (seo-ops/CLAUDE.md).

## Data issues

None — all snapshot sections present and non-empty.

## Executive Summary

- **Total findings:** 13
  - Seo Opportunities: 8
  - Seo Risks: 1
  - Measurement Issues: 2
  - Conversion Opportunities: 0
  - Gevelisolatie Cluster Notes: 2
- **Pages to watch:** 6
- **Next actions:** 6

## Top SEO Opportunities

### 1. /buiten-stucwerk/

- **Signal:** Position 9.2, CTR 0.5% (2 clicks / 393 impressions)
- **Why:** Shown in the top 20 but rarely clicked — the title/description may not match the queries it ranks for
- **Confidence:** medium
- **Action:** Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge
- **Category:** SEO

### 2. /gevelisolatie/

- **Signal:** Position 18.0, CTR 0.9% (2 clicks / 213 impressions)
- **Why:** Shown in the top 20 but rarely clicked — the title/description may not match the queries it ranks for
- **Confidence:** low
- **Action:** Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge
- **Category:** SEO

### 3. /gevel-schilderen/keimen/

- **Signal:** 2597 impressions at average position 23.1 (1 clicks)
- **Why:** Google shows the page for many queries but ranks it low — a relevance, intent or authority gap, not a snippet issue
- **Confidence:** medium
- **Action:** Check which queries it ranks for and what ranks above it (page-diagnosis skill) before changing the page
- **Category:** SEO

### 4. /gevel-schilderen/

- **Signal:** 846 impressions at average position 42.7 (0 clicks)
- **Why:** Google shows the page for many queries but ranks it low — a relevance, intent or authority gap, not a snippet issue
- **Confidence:** low
- **Action:** Check which queries it ranks for and what ranks above it (page-diagnosis skill) before changing the page
- **Category:** SEO

### 5. /gevelisolatie/afwerkingen/

- **Signal:** Position 14.7, CTR 0.0% (0 clicks / 291 impressions)
- **Why:** Shown in the top 20 but rarely clicked — the title/description may not match the queries it ranks for
- **Confidence:** low
- **Action:** Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge
- **Category:** SEO

### 6. /muren-stucen/

- **Signal:** 1231 impressions at average position 34.3 (0 clicks)
- **Why:** Google shows the page for many queries but ranks it low — a relevance, intent or authority gap, not a snippet issue
- **Confidence:** medium
- **Action:** Check which queries it ranks for and what ranks above it (page-diagnosis skill) before changing the page
- **Category:** SEO

### 7. /sierpleister/

- **Signal:** Position 11.7, CTR 0.0% (0 clicks / 123 impressions)
- **Why:** Shown in the top 20 but rarely clicked — the title/description may not match the queries it ranks for
- **Confidence:** low
- **Action:** Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge
- **Category:** SEO

### 8. gevelrenovatie met folie in rotterdam

- **Signal:** 138 impressions at position 4.6, CTR 0.0%
- **Why:** Non-brand query in the top 20 with few clicks — the snippet or SERP features may take the clicks
- **Confidence:** low
- **Action:** Find the ranking page in the query-level CSV and check the live SERP (serp-check) before rewriting the snippet
- **Category:** SEO

## SEO Risks

### 1. /gevel-schilderen/

- **Signal:** Like-for-like position (38 queries) 41.5 → 45.1 (higher is worse) on 846 impressions; page average 39.4 → 42.7, impressions deeper than 50: 16% → 32%
- **Why:** Rankings got worse on the same queries on a page with meaningful visibility
- **Confidence:** medium
- **Action:** Compare query-level positions for both periods and check for a coinciding title/content change or new sibling page
- **Category:** SEO

## Conversion Opportunities

No findings.

## Measurement Issues

### 1. (not set)

- **Signal:** 12 sessions with landing page = (not set)
- **Why:** GA4 cannot tell the entry page for these sessions — landing-page analysis misses them
- **Confidence:** medium
- **Action:** Treat landing-page shares as approximate; recurring, so no action unless it grows
- **Category:** Measurement

### 2. —

- **Signal:** Source '127.0.0.1:8842 / referral': 33 sessions from a local-dev / hosting-panel referrer
- **Why:** Not real visitors — inflates sessions and can add fake key events
- **Confidence:** high
- **Action:** Exclude in GA4 (owner): Admin → Data streams → Configure tag settings → List unwanted referrals / define internal traffic
- **Category:** Measurement

## Gevelisolatie Cluster Review

### 1. /gevelisolatie/*

- **Signal:** 17 cluster pages in GSC data: clicks 11 → 14, impressions 1075 → 1073
- **Why:** Cluster summary (strategic priority)
- **Confidence:** high
- **Action:** Review the cluster section of the weekly summary
- **Category:** Cluster

### 2. /gevelisolatie/* (low visibility)

- **Signal:** 9 pages with < 10 impressions: /gevelisolatie/alphen-aan-den-rijn/, /gevelisolatie/barendrecht/, /gevelisolatie/hendrik-ido-ambacht/, /gevelisolatie/leidschendam-voorburg/, /gevelisolatie/roosendaal/, /gevelisolatie/rotterdam/, /gevelisolatie/spijkenisse/, /gevelisolatie/vlaardingen/, /gevelisolatie/zoetermeer/
- **Why:** Very weak visibility; for city pages the content decision is pending with the owner (Wave 1 plan)
- **Confidence:** low
- **Action:** Spot-check indexation (GSC URL Inspection) for a few of them; no content changes without the owner's decision
- **Category:** Cluster

## Pages to Watch

- (not set)
- /buiten-stucwerk/
- /gevel-schilderen/
- /gevel-schilderen/keimen/
- /gevelisolatie/*
- /muren-stucen/

## Next Actions (7–14 days)

1. [SEO] Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge — /buiten-stucwerk/
2. [SEO] Check which queries it ranks for and what ranks above it (page-diagnosis skill) before changing the page — /gevel-schilderen/keimen/, /muren-stucen/
3. [SEO] Compare query-level positions for both periods and check for a coinciding title/content change or new sibling page — /gevel-schilderen/
4. [Measurement] Treat landing-page shares as approximate; recurring, so no action unless it grows — (not set)
5. [Measurement] Exclude in GA4 (owner): Admin → Data streams → Configure tag settings → List unwanted referrals / define internal traffic
6. [Cluster] Review the cluster section of the weekly summary — /gevelisolatie/*
