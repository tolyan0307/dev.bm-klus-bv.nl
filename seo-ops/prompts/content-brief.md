# Content Brief Generator

## Purpose
Produce a structured content brief for a single page or cluster, grounded in GSC search demand and GA4 engagement/conversion signals. Output is a brief for a human writer or editor — not a finished article.

## Required inputs
- Target page URL (e.g., `/gevelisolatie/kosten/`)
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_28d.csv` (filtered to target page or cluster)
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_28d.csv`

## Optional inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_90d.csv`
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_landing_pages_28d.csv`
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_events_28d.csv`
- Current page content (URL or pasted text) for gap analysis
- `seo-ops/config/priority-pages.yaml`
- `seo-ops/config/conversions.yaml`

## Method

1. **Determine page role:**
   - Awareness / informational / cluster support page.
   - Consideration / comparison page.
   - Conversion / lead capture page.
   - Trust / portfolio page.

2. **Analyse search demand:**
   - From GSC queries, identify all queries driving impressions to the target page.
   - Group queries by intent: informational, commercial, transactional, navigational.
   - Identify the primary target intent the page should serve.
   - Identify supporting intents the page could additionally cover.
   - Flag queries with high impressions but low CTR — potential title/description gaps.

3. **Identify content gaps:**
   - Queries appearing in GSC that the current page does not clearly address.
   - Subtopics or question patterns (wat, hoe, kosten, verschil, etc.) not covered.
   - FAQ opportunities from long-tail queries.
   - Internal linking opportunities to/from related pages in the cluster.

4. **Identify mismatches:**
   - Query intent vs current page structure (e.g., informational queries landing on a conversion-heavy page).
   - Queries that should land on this page but currently land on a different page.

5. **Check conversion path:**
   - Does the page have a clear CTA relevant to its role?
   - If GA4 data is available: does engagement translate to key events?
   - Are there obvious CTA or internal-link improvements?

6. **Produce brief — not copy.** The output should guide a writer. It should not contain finished paragraphs or polished marketing text.

## Preferred output sections

1. **Target page** — URL and assigned role.
2. **Current performance snapshot** — GSC metrics (clicks, impressions, CTR, avg position) + GA4 metrics if available.
3. **Primary target intent** — what the page should primarily satisfy.
4. **Supporting intents** — secondary intents worth covering.
5. **Missing subtopics** — specific gaps identified from query analysis.
6. **Recommended page structure** — suggested sections/blocks (H2-level outline).
7. **FAQ ideas** — 3–7 questions derived from actual search queries, not invented.
8. **CTA recommendations** — what CTA fits the page role, where to place it.
9. **Internal linking recommendations** — specific pages to link to/from, with context.
10. **Risk notes** — anything that could go wrong (cannibalization risk, thin data, intent uncertainty).
11. **Data sufficiency note** — explicit statement on whether the available data is sufficient to write confidently, or whether more data / a waiting period is recommended before content work begins.

## Do not
- Write finished copy, polished paragraphs, or marketing text.
- Invent search queries or volumes not present in the provided exports.
- Recommend FAQ questions that have no basis in actual GSC query data.
- Ignore the page's role within the `/gevelisolatie/` cluster hierarchy.
- Produce a brief that contradicts the site's Dutch-only content language (nl-NL). The brief itself can be in English, but any suggested headings, FAQ questions, or copy fragments must be in Dutch.
- Recommend adding content that duplicates what another page in the cluster already covers — flag overlap risk instead.
- Skip the data sufficiency note. If query volume is low or data covers < 28 days, say so clearly.
- If any required input is missing, state: **"Missing data needed:"** and list exactly what is absent.

## Language note
All site-facing content suggestions (headings, FAQ, CTA copy) must be in Dutch (nl-NL). The brief structure and analysis may be in English.
