# Source Hierarchy Rules v1

**Version:** 1.0
**Date:** 2026-04-08
**Purpose:** Define the hierarchy of evidence sources for all seo-ops analysis.

---

## 1. Purpose

Establish which sources are authoritative for which types of claims, preventing:
- Internal artifact data from being overridden by third-party estimates
- Official documentation from being confused with account-specific evidence
- Enrichment data from being elevated to primary truth
- Third-party blog opinions from becoming policy layer

---

## 2. Scope

Applies to all seo-ops analytical outputs: reports, chat answers, recommendations, decision packs, enrichment notes. This contract does not change what data is collected — it governs how data is weighted and cited.

---

## 3. Core principle

**Internal artifacts are primary truth for performance. Official docs are reference for system behavior. Everything else is context.**

---

## 4. Source hierarchy

| Rank | Source class | Examples | Role |
|------|------------|----------|------|
| 1 | **Internal operational artifacts** | GSC snapshots, GA4 snapshots, Google Ads CSVs, keyword_master, page_inventory | Primary truth for BM Klus account/site performance, measurement, and state |
| 2 | **Google official documentation** | Search Central, GSC API docs, GA4 API docs, Ads API docs, Ads Help Center | Policy/reference layer for platform definitions, metric semantics, system constraints |
| 3 | **Vendor official documentation** | DataForSEO docs | Truth only about the vendor's own system/API — not about Google behavior |
| 4 | **External enrichment data** | DataForSEO API outputs, competitor website observations, manual SERP checks | Supplementary context, directional signals, market landscape |
| 5 | **Community knowledge** | Third-party SEO blogs, forums, industry publications | Background context only — never policy, never primary evidence |

---

## 5. Allowed source classes by claim type

| Claim type | Required primary source | Allowed supporting sources | Not sufficient alone |
|-----------|------------------------|---------------------------|---------------------|
| BM Klus organic search performance | Internal artifacts (GSC) | GA4, page_inventory | DataForSEO, competitor observation, blogs |
| BM Klus paid search performance | Internal artifacts (Ads CSVs) | GA4, keyword_master | DataForSEO, blogs |
| BM Klus measurement interpretation | Internal artifacts (GA4 + GSC) | Google official docs (metric definitions) | Blogs, community knowledge |
| Google crawling/indexing behavior | Google official docs (Search Central) | GSC data as confirming evidence | Blogs, DataForSEO, competitor observation |
| Match type / bidding mechanics | Google official docs (Ads API, Ads Help) | Ads CSVs as confirming evidence | Blogs, community knowledge |
| Metric definitions (CTR, position, sessions) | Google official docs (API references) | None needed | Blogs, community knowledge |
| Competitor / SERP landscape | DataForSEO enrichment, manual SERP observation | Competitor websites | Internal artifacts alone (they show own performance, not market) |
| Local market terminology | Competitor websites, manual observation | DataForSEO suggestions | Internal artifacts, Google docs |
| Content gap / opportunity | keyword_master + DataForSEO enrichment | Competitor observation, SERP observation | Blogs, single DataForSEO output |

---

## 6. Forbidden substitutions

These substitutions are explicitly forbidden in seo-ops analysis:

| Forbidden substitution | Why |
|----------------------|-----|
| DataForSEO position data replacing GSC position data for BM Klus pages | GSC measures actual performance; DataForSEO estimates from external methodology |
| Third-party blog claiming "Google does X" replacing Google official docs | Blogs are not authoritative on Google system behavior |
| DataForSEO keyword volume replacing Google Ads Keyword Planner volume | Different methodologies; Ads Planner is closer to Google's own data |
| Competitor website analysis replacing internal artifact analysis for BM Klus performance | Competitor data tells you about competitors, not about your own account |
| Single manual SERP check replacing GSC-based position tracking | SERP is personalized and volatile; GSC aggregates actual impressions |
| Official docs alone proving BM Klus-specific causality | Official docs describe frameworks — they don't explain why a specific page ranks where it does |

---

## 7. Confidence and caveat rules

### When citing official documentation
- State what the official source says about the general system/rule
- Do not claim it proves something specific about BM Klus performance
- Example: "Per Search Central, Google considers page speed a ranking signal. BM Klus page X has LCP of 3.2s (GA4, 28d)." — the official source explains the system, the artifact provides the BM Klus measurement

### When citing enrichment data
- Always label as enrichment: `[DataForSEO enrichment]`, `[competitor observation]`
- State that the data is directional, not definitive
- If enrichment contradicts internal artifacts, report both and defer to internal artifacts for BM Klus-specific conclusions

### When no authoritative source is available
- State explicitly: "No internal artifact data available for this claim"
- Classify as Tier 3 (hypothesis) or Tier 4 (future exploration) per expert_rules_v1.md
- Do not elevate community knowledge to fill the gap

---

## 8. Practical examples

### Example 1: "Why is page X not ranking?"
- **Required:** GSC snapshot (impressions, position, queries for page X), page_inventory (on-page signals)
- **Helpful:** Google Search Central (indexing/crawling rules), DataForSEO SERP snapshot (competitor landscape)
- **Not sufficient:** Blog post claiming "thin content doesn't rank", DataForSEO position estimate alone
- **Correct approach:** Report GSC data as primary evidence, cite Search Central for system context, use DataForSEO SERP as enrichment labeled `[enrichment]`

### Example 2: "What does average position mean in GSC?"
- **Required:** Google official docs (Search Console API documentation defining position metric)
- **Helpful:** Internal GSC data as concrete example
- **Not sufficient:** Blog post explaining "how position works"
- **Correct approach:** Cite official API documentation for the definition, illustrate with BM Klus data

### Example 3: "Which keywords should we target next?"
- **Required:** keyword_master (current keyword coverage), GSC snapshot (current ranking queries)
- **Helpful:** DataForSEO keyword gap, DataForSEO question suggestions, competitor observation
- **Not sufficient:** DataForSEO alone without internal keyword/page data
- **Correct approach:** Start from internal keyword coverage, use DataForSEO as enrichment for gaps and opportunities

---

## 9. Integration notes for operators

- This contract works alongside `expert_rules_v1.md` (evidence tiers) and `numeric_provenance_v1.md` (provenance labeling)
- Source class should be reflected in provenance labels: `[GSC, 28d, page-level]` vs `[DataForSEO enrichment, point-in-time]`
- Report templates in `templates/report_templates_v1.md` include a "Sources used" section — use it to declare source classes
- When running enrichment workflows (DataForSEO), use the `enrichment_note` template which explicitly frames outputs as enrichment
- The `official_source_usage_rules_v1.md` contract provides specific guidance on when and how to cite official documentation
- Source manifests: `config/official_sources_manifest_v1.yaml` and `config/external_sources_manifest_v1.yaml`
