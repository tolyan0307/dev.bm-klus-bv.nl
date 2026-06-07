# Query Intelligence Rules v1

Version 1.0 · 2026-04-08 · Governs `query_intelligence_review_v1` workflow outputs.

---

## 1. Purpose

Rules for structured query intelligence review: classifying queries by intent and commercial role, identifying SEO opportunities, PPC containment candidates, and page-query fit mismatches.

Query intelligence does NOT prove final business value by itself. It provides a systematic classification layer to support operator decisions about SEO content priority, PPC negative management, and page-query alignment.

---

## 2. Scope

This contract governs:
- `run_query_intelligence_review_v1.py` analyzer outputs
- Any operator-written query intelligence reports using Template 8 (Query Intelligence Review)
- Interpretation of query intent classification and page-query fit assessments

This contract does NOT govern:
- Page SEO diagnosis (see `page_seo_diagnosis_rules_v1.md`)
- PPC campaign performance assessment (see `ppc_expert_playbook_v1.md`)
- Keyword intelligence review v2 (separate workflow with different scope)
- Measurement quality assessment (see `measurement_audit_rules_v1.md`)

---

## 3. Primary truth sources

| Source | Role | Source class |
|--------|------|-------------|
| keyword_master v3 (preferred) or v2 | Primary keyword universe with performance signals | internal_artifact |
| GSC query/page snapshots (28d preferred, 90d fallback) | BM Klus actual search performance | internal_artifact |
| Page inventory | Page role/type for fit assessment | internal_artifact |
| `config/mappings/query_intent_taxonomy_v1.yaml` | Intent classification rules | internal_artifact |
| `config/service_taxonomy_v1.yaml` | Service cluster structure | internal_artifact |

---

## 4. Supporting sources

| Source | Role | Source class |
|--------|------|-------------|
| `config/market_terms_nl_v1.yaml` | Dutch market terminology context | internal_artifact |
| DataForSEO enrichment outputs | External volume/competition context | enrichment |
| GA4 landing page snapshots | On-site engagement context | internal_artifact |

Supporting sources provide context but are not primary truth for query classification or BM Klus search performance.

---

## 5. Required report structure

Every query intelligence review output (JSON and markdown) must include:

1. **Scope and purpose** — what was analyzed (site/page/query-set) and why
2. **Sources used** — with freshness, row counts, windows
3. **Taxonomy version** — which intent taxonomy was applied
4. **Query evidence observations** — factual summary of query landscape
5. **Classification summary** — counts by intent class and action bucket
6. **Top findings** — prioritized observations per bucket
7. **Interpretation boundaries** — what can and cannot be concluded
8. **Recommended manual actions** — specific, conservative
9. **Excluded context** — what was not assessed or not available

---

## 6. Allowed interpretations

The following interpretations are permitted when supported by evidence:

- "Current query evidence suggests this query cluster has transactional intent because [specific signals]"
- "Classification is heuristic based on keyword signals — not confirmed user intent"
- "Page fit appears mixed because query intent [X] does not align with page role [Y]"
- "This query is a candidate for manual review, not an automatic exclusion"
- "Signal is limited for strong prioritization — low impression/click volume"
- "This query set shows [N] potential service opportunities based on [signals]"
- "Commercial modifier presence suggests transactional intent, but volume is low"

---

## 7. Forbidden inferences

The following conclusions are **never permitted** in query intelligence outputs:

| Forbidden | Why |
|-----------|-----|
| "This keyword will convert" | No conversion evidence from intent classification alone |
| "This page owns this query" | Ownership requires GSC ranking + intent match + performance evidence |
| "DataForSEO proves BM Klus demand" | DataForSEO shows market estimates, not BM Klus-specific demand |
| "Intent is [X]" without "heuristic" or "based on signals" caveat | All classification is rule-based inference |
| Mixing internal truth and external enrichment without disclosure | Internal GSC data and external volume estimates are different evidence tiers |
| "This query is irrelevant" for low-signal queries | Low signal ≠ irrelevant; may need more data |
| "Remove this keyword from PPC" as definitive action | Recommend review, not definitive removal |
| Free-form storytelling instead of structured diagnosis | All findings must be structured per template |

---

## 8. Minimum caveat rules

### Always include when applicable:

**Classification caveat:**
> Intent classification is heuristic — based on keyword signal matching against `query_intent_taxonomy_v1.yaml`. It does not represent confirmed user intent.

**Low-volume caveat:**
> Query has [N] impressions / [N] clicks in the analysis window. Classification confidence is reduced at low volume.

**Page-fit caveat:**
> Page-query fit assessment compares inferred query intent against page role from page_inventory. Actual ranking intent may differ.

**Limited-mode caveat (when artifacts are missing):**
> This review runs in limited mode. [Missing artifact] is not available. Classification or fit assessment may be incomplete.

**Enrichment caveat (when DataForSEO data is used):**
> External enrichment data (DataForSEO) provides market volume estimates. These are not BM Klus-specific performance data.

### Caveat placement:
- Report-level caveats go in the header (sources section).
- Per-query or per-bucket caveats go in the relevant finding section.

---

## 9. Example phrasing: good vs bad

### Good (allowed):
- "Current query evidence suggests 'gevelisolatie kosten rotterdam' has transactional + local intent based on commercial and geo modifiers."
- "Classification is heuristic but commercially useful — 12 queries match the transactional_service pattern."
- "Page fit appears mixed: /gevelisolatie/ ranks for 3 informational queries ('wat is gevelisolatie', 'hoe werkt gevelisolatie') where a dedicated info page may be more appropriate."
- "This is a candidate for PPC negative review, not an automatic exclusion."
- "Signal is limited (4 impressions, 0 clicks) for strong prioritization."

### Bad (forbidden):
- "This keyword will convert well for BM Klus" (no conversion evidence)
- "This page owns 'gevelisolatie'" (ownership requires multi-source evidence)
- "DataForSEO shows high demand so we should target this" (enrichment ≠ BM Klus demand)
- "The intent is clearly transactional" (missing heuristic caveat)
- "Remove this from PPC immediately" (recommend review, not definitive action)
- "Based on our analysis, this is the best keyword strategy" (overclaim)

---

## Cross-references

- Intent taxonomy: `config/mappings/query_intent_taxonomy_v1.yaml`
- Service structure: `config/service_taxonomy_v1.yaml`
- Market terms: `config/market_terms_nl_v1.yaml`
- Source hierarchy: `contracts/source_hierarchy_rules_v1.md`
- Numeric provenance: `contracts/numeric_provenance_v1.md`
- Evidence tiers: `contracts/expert_rules_v1.md`
- Analysis context: `config/analysis_context_v1.yaml`
