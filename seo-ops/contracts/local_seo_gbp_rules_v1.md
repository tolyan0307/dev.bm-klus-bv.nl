# Local SEO / GBP Audit Rules v1

**Version:** 1.0
**Date:** 2026-04-08
**Governs:** `local_seo_gbp_audit_v1` workflow
**Template:** Template 9 (Local SEO / GBP Audit) in `templates/report_templates_v1.md`

---

## 1. Purpose

Define mandatory rules for interpreting and reporting local SEO / Google Business Profile evidence. Ensure that GBP-specific claims are grounded in GBP data, site/search data is kept as supporting context, and the report is honest about evidence gaps.

---

## 2. Scope

This contract applies to all outputs of the `local_seo_gbp_audit_v1` workflow, including:

- JSON output (`outputs/local_seo_gbp_audit_v1.json`)
- Markdown report (`reports/seo/local_seo_gbp_audit_v1_*.md`)

---

## 3. Primary truth sources

| Source | Role | Evidence tier |
|--------|------|---------------|
| GBP Performance API data | Primary truth for GBP visibility metrics (impressions, actions, searches) | Tier 1 |
| GBP Reviews API data | Primary truth for review count, average rating, review content | Tier 1 |
| `config/locales/local_entities_v1.yaml` | Business entity context (brand, service area, location terms) | Config |

---

## 4. Supporting sources

| Source | Role | Evidence tier |
|--------|------|---------------|
| GSC query/page snapshots | Supporting context for search visibility of location-related queries | Tier 2 |
| GA4 landing page data | Supporting context for on-site engagement from local traffic | Tier 2 |
| Page inventory | Supporting context for page structure alignment with local intent | Tier 2 |

Supporting sources do NOT substitute for missing GBP data. If GBP data is unavailable, supporting sources can only be used to describe site-side local signals — they cannot be used to make GBP-specific claims.

---

## 5. Required report structure

Reports MUST follow Template 9 from `templates/report_templates_v1.md`. Required sections:

1. Sources used (with availability status)
2. GBP evidence summary (or limited-mode disclosure)
3. Review/reputation signals (or limited-mode disclosure)
4. Supporting site/search context
5. Interpretation boundaries
6. Recommended manual actions
7. Excluded context
8. Provenance footer

---

## 6. Allowed interpretations

The following interpretations are allowed WITH supporting evidence:

- **GBP visibility trend:** "GBP impressions show [increase/decrease/stable] pattern over [period]" — requires GBP performance data
- **Review signal strength:** "Current review count ({N}) and average rating ({X}) provide [adequate/limited] social proof signal" — requires GBP reviews data
- **Local query presence:** "Site receives impressions for {N} queries with local intent signals" — requires GSC data + local_entities config
- **Page-location alignment:** "Site has {N} location-specific pages covering {M} of {T} target cities" — requires page inventory
- **Action signal:** "GBP data shows {N} [website clicks / direction requests / call clicks] in [period]" — requires GBP performance data
- **Limited-mode assessment:** "Without GBP data, local SEO assessment is limited to site-side signals only" — always allowed

---

## 7. Forbidden inferences

The following claims are FORBIDDEN:

| Forbidden claim | Why |
|----------------|-----|
| "This profile ranks #1 in the local pack" | No local pack ranking data available in GBP API |
| "Reviews guarantee more leads" | Reviews are signals, not causal proof of conversion |
| "Google prefers this business because..." | Anthropomorphic Google language |
| "This business dominates local search" | Overclaim without competitive evidence |
| "GBP performance proves business quality" | GBP metrics measure visibility, not quality |
| "Low reviews = bad business" | Reviews reflect review solicitation effort, not service quality |
| "Competitor has fewer reviews so we're ahead" | No competitor GBP data available |
| "Local SEO is fixed / complete" | Local SEO is ongoing, not a one-time fix |
| "{N} stars proves excellent service" | Rating is a signal, not proof of service quality |
| "GBP data confirms conversion quality" | GBP actions ≠ qualified leads |

---

## 8. Minimum caveat rules

### 8a. Limited mode (GBP data missing)

If GBP performance or reviews data is not available:

- Report MUST state: "**Limited mode:** GBP data is not available. This audit is based on site/search context only. GBP-specific conclusions cannot be drawn."
- NO GBP-specific performance claims
- NO review-specific claims
- Only site-side local SEO observations (query presence, page coverage, local intent alignment)

### 8b. Partial data

If only some GBP data is available (e.g., reviews but not performance):

- Report MUST disclose which GBP data is available and which is missing
- Claims MUST be limited to available data scope

### 8c. Low volume

If GBP metrics show very low volume (e.g., < 50 total impressions):

- Caveat: "GBP evidence volume is low. Trend interpretation is not reliable."

### 8d. Freshness

- GBP data older than 30 days MUST carry a staleness caveat
- Supporting GSC/GA4 data follows standard freshness rules from `config/preflight_rules_v1.yaml`

---

## 9. Separation of evidence layers

Reports MUST separate the following into distinct sections or clearly labeled blocks:

1. **Confirmed GBP evidence** — direct GBP API data (Tier 1)
2. **Supporting site/search context** — GSC/GA4/page inventory signals (Tier 2)
3. **Plausible local visibility interpretation** — inferences drawn from combined evidence (Tier 2-3)
4. **Manual next steps** — recommended actions for the operator

Do NOT blend GBP evidence with site evidence without explicit source labels.

---

## 10. Example phrasing: good vs bad

### Good

- "Current GBP evidence suggests {N} search impressions over {period}, with {M} website clicks."
- "Review signal is limited: {N} reviews with an average of {X} stars. This provides [baseline/moderate/strong] social proof for a local service business."
- "Local visibility interpretation remains limited because GBP performance data is not yet available."
- "This is a manual follow-up candidate: verify GBP profile completeness and category accuracy."
- "Site and GBP signals should be interpreted separately here — site has local pages, but GBP engagement is not yet measured."
- "Without GBP data, we can only observe that the site receives {N} impressions for queries with local intent signals. This does not confirm local pack presence."

### Bad

- "Reviews prove lead quality." (causal overclaim)
- "GBP performance proves business success." (overclaim)
- "Google prefers this business." (anthropomorphic)
- "This profile ranks everywhere." (overclaim without evidence)
- "5 stars means excellent service." (rating ≠ service quality)
- "We dominate local search in Rotterdam." (overclaim without competitive data)
- "Low review count is damaging the business." (causal claim without evidence)

---

_This contract governs all local SEO / GBP audit outputs. Follow it mechanically._
