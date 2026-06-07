# Official Source Usage Rules v1

**Version:** 1.0
**Date:** 2026-04-08
**Purpose:** Rules for when and how to use official documentation in seo-ops analysis.

---

## 1. Purpose

Codify when official Google/vendor documentation is required, optional, or insufficient — so that operators cite official sources correctly without overclaiming or underciting.

---

## 2. When official sources are required

Official documentation **must** be cited (or its content applied) when the analysis involves:

| Claim domain | Why official source is required | Example source |
|-------------|-------------------------------|----------------|
| Platform metric definitions | Prevent misinterpretation of what a metric measures | GA4 API docs (session definition), GSC API docs (position aggregation) |
| Match type behavior | Match types have specific documented rules | Google Ads API docs, Ads Help Center |
| Crawling/indexing rules | Google-defined constraints that affect visibility | Search Central (robots.txt, canonical, sitemap) |
| API constraints and limits | Rate limits, row limits, data freshness guarantees | GSC API docs, GA4 API docs, Ads API docs |
| Quality Score components | QS is a defined composite metric | Google Ads Help Center |
| Structured data requirements | Schema.org implementation rules per Google | Search Central structured data docs |
| Ads policy rules | Campaign eligibility, ad format requirements | Ads Help Center |

---

## 3. When official sources are optional but useful

| Situation | How official docs help |
|----------|----------------------|
| Explaining analytical methodology | "We use GSC position because [per API docs] it represents average position weighted by impressions" |
| Clarifying metric caveats | "GA4 engagement rate [per API docs] counts sessions >10s, 2+ pageviews, or key event — low engagement rate doesn't necessarily mean bad content" |
| Providing context for recommendations | "Search Central notes that Google may take weeks to re-crawl updated pages — monitoring period should account for this" |
| Interpreting unusual data patterns | "GSC reports [per API docs] may show position 0 for filtered queries — this is a data artifact, not a real position" |

---

## 4. When official sources are NOT enough

Official documentation alone **cannot** establish:

| Claim type | Why official docs are insufficient | What's needed instead |
|-----------|----------------------------------|----------------------|
| BM Klus-specific performance causes | Official docs describe systems, not why a specific page ranks at position X | Internal artifacts (GSC/GA4/Ads data) + Tier 2 interpretation |
| Page ownership decisions | Docs don't know which BM Klus page should own which query | GSC query-page data + page_inventory + keyword_master |
| Budget allocation recommendations | Docs describe bidding systems; they don't know BM Klus conversion economics | Ads CSVs + GA4 conversion data + budget context |
| "This change will improve rankings" | Google never guarantees specific outcomes from specific actions | State as hypothesis (Tier 3) with supporting evidence |
| Competitor strategy explanations | Official docs explain systems, not competitor intent | Competitor observation + SERP data (as enrichment) |

---

## 5. Citation expectations

### In reports
- When an official source informs a claim, include a brief reference: "Per GSC API documentation, position is calculated as..." or "Search Central defines..."
- Do not include full URLs in running text — a domain-level reference is sufficient
- Source class must appear in the "Sources used" section of the report

### In analytical chat answers
- Brief inline reference is sufficient: "Per Google Ads Help, broad match..."
- Full formal citation not required in conversational context

### When paraphrasing
- Paraphrase the relevant rule/definition accurately
- Do not add interpretive spin: "Google says X, which means Y for your page" — the first part is citation, the second part requires internal evidence

---

## 6. Misuse patterns to avoid

| Pattern | Why it's wrong | Correct approach |
|---------|---------------|-----------------|
| "Google says page speed matters, so your slow page is why you don't rank" | Conflates general system description with specific causation | "Google lists page speed as a signal. Your page LCP is X (GA4). Whether speed is the limiting factor for this page requires more evidence." |
| "Google recommends Smart Bidding, so we should switch" | Treats Google recommendations as mandatory | "Google Ads supports Smart Bidding for [use case]. At 10 EUR/day with <20 conversions/month, conversion data may be insufficient for ML optimization." |
| Citing a Google blog post as equivalent to official documentation | Blog posts are editorial, not documentation | Use Search Central docs or API references. Blog posts are supplementary. |
| "DataForSEO docs say their volume data is accurate, so we should trust it over Keyword Planner" | Vendor docs are authoritative about the vendor, not about Google | "DataForSEO provides volume estimates via [their methodology]. Google Ads Keyword Planner provides [Google's own estimates]. For BM Klus planning, we use both with explicit source labels." |

---

## 7. Examples

### PPC review context
**Good:** "Per Google Ads Help, Quality Score is based on expected CTR, ad relevance, and landing page experience. Current QS for keyword 'gevelisolatie rotterdam' is 6/10 (Ads CSV, 2026-04-01)."
**Bad:** "Google says QS should be 7+, so this keyword is underperforming." (overclaim — Google doesn't set a universal threshold)

### SEO diagnosis context
**Good:** "Per Search Central, Google uses canonical tags as a strong hint for which URL to index. Page /gevelisolatie/ has a self-referencing canonical (page_inventory). No duplicate signals detected in GSC."
**Bad:** "Google says canonical tags determine rankings." (oversimplification — canonicals affect indexation, not directly rankings)

### Measurement interpretation
**Good:** "Per GA4 API docs, engagement rate counts sessions with >10s duration, 2+ pageviews, or a key event. Current engagement rate for /gevelisolatie/ is 62% (GA4, 28d). This is within normal range for service pages."
**Bad:** "GA4 shows 62% engagement which means the page is good." (missing definition context, vague conclusion)

---

## 8. Minimum official-reference expectations by report type

| Report type | Minimum official-reference expectation |
|------------|---------------------------------------|
| PPC review | Match type definitions, QS component definitions, bidding strategy context. Budget constraint (10 EUR/day) is an internal fact, not an official-doc citation. |
| Page SEO diagnosis | Metric definitions used in the report (position, CTR, impressions). Indexation/canonical rules if relevant. Structured data requirements if auditing schema. |
| Indexation diagnosis | Crawling/indexing rules from Search Central. Canonical handling. Sitemap and robots.txt rules. |
| Measurement audit | GA4 session/event model definitions. GSC aggregation rules. Cross-source comparison caveats per measurement_interpretation_rules_v1.md. |
| Query intelligence review | Match type behavior (if PPC context). GSC position/impression definitions. Keyword volume source methodology (Ads Planner vs DataForSEO). |

---

## 9. Integration with source hierarchy

This contract is subordinate to `source_hierarchy_rules_v1.md`:
- Official docs are Rank 2 in the source hierarchy (after internal artifacts)
- This contract specifies *how* to use Rank 2 sources correctly
- For the full hierarchy and forbidden substitutions, see `source_hierarchy_rules_v1.md`
- For source manifests, see `config/official_sources_manifest_v1.yaml` and `config/external_sources_manifest_v1.yaml`
