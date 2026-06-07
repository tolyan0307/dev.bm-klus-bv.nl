# Indexation Diagnosis Rules v1

**Version:** 1.0
**Date:** 2026-04-08
**Scope:** Governs all indexation diagnostic outputs produced by `indexation_debug_v1` workflow.

---

## 1. Purpose

Define evidence standards, interpretation boundaries, and output requirements for indexation diagnostics. Ensure that indexation state claims are grounded in URL Inspection evidence, not in generic SEO reasoning.

---

## 2. Scope

This contract applies to:
- `run_indexation_debug_v1.py` analyzer output (JSON + markdown)
- Any operator-generated indexation diagnosis following the `indexation_debug_v1` workflow
- Claude-generated interpretations when answering indexation questions about BM Klus pages

This contract does NOT apply to:
- Legacy indexation review (`legacy_indexation_review_v1`) — that workflow has different scope
- General SEO page audits (`page_audit_v1`) — governed by `page_seo_diagnosis_rules_v1.md`

---

## 3. Primary truth sources

| Source | Role | Evidence tier |
|--------|------|---------------|
| **URL Inspection API response** | Primary truth for indexation state of a specific URL | Tier 1 (confirmed fact) |
| **GSC Search Analytics (query/page)** | Supporting evidence for search visibility after indexation | Tier 1–2 (confirmed data, interpretation needed) |

These are the ONLY sources that can confirm indexation state for a BM Klus URL.

---

## 4. Supporting sources

| Source | Role | Evidence tier |
|--------|------|---------------|
| Page inventory | Context: does the page exist locally, what type is it | Tier 1 (inventory is factual) |
| GSC query/page aggregates | Visibility context: impressions, clicks, queries | Tier 1–2 |
| Google official documentation | Platform rule reference: how indexing works in general | Reference only — not BM Klus proof |

---

## 5. Required report structure

Every indexation diagnosis report MUST contain:

1. **Sources used** — with freshness and availability status
2. **Summary** — URL count and outcome distribution
3. **Per-URL diagnosis** with these subsections:
   - Observations (factual, from inspection + GSC)
   - Interpretations (evidence-backed conclusions)
   - Hypotheses (plausible but unconfirmed)
   - Recommended next checks
   - Excluded context
4. **Provenance footer** — generator, contract, data sources, limitations

---

## 6. Allowed interpretations

The following interpretation patterns ARE allowed:

| Pattern | When allowed |
|---------|-------------|
| "URL is not indexed" | When inspection returns explicit not-indexed state |
| "URL is indexed" | When inspection returns indexed/pass state |
| "Canonical mismatch detected" | When user_canonical ≠ google_canonical |
| "Visibility is limited" | When GSC shows low impressions/clicks |
| "Indexing is blocked by robots/noindex" | When inspection explicitly reports this |
| "Current evidence supports X" | When evidence is consistent but not conclusive |
| "This remains a hypothesis until Y" | When stating tier 3 claims |

---

## 7. Forbidden inferences

The following inferences are FORBIDDEN in indexation diagnostics:

| Forbidden claim | Why |
|----------------|-----|
| "Google doesn't understand this page" | Anthropomorphic, not provable from inspection |
| "Google penalized this page" | Penalty requires Manual Actions evidence, not inspection |
| "Crawl budget problem" | Requires server log analysis, not available here |
| "After these fixes the page will be indexed" | No guaranteed fix — indexing is Google's decision |
| "The page is not indexed because of [single reason]" | Definitive single-cause claims require stronger evidence than one inspection |
| "Content quality is the issue" | Not measurable from inspection data |
| "Domain authority is too low" | Not a measurable factor in this system |
| "Backlinks are insufficient" | No backlink data in this workflow |

---

## 8. Minimum caveat rules

### 8a. When only inspection data is available (no GSC query/page)

- MUST state: "Running in limited mode — no GSC visibility data available"
- Visibility assessment is NOT possible
- Only indexation state can be confirmed
- All ranking/visibility claims must be excluded

### 8b. When inspection + GSC data available but volume is low

- MUST state volume level: "Low search evidence — N clicks, M impressions in window"
- Performance conclusions are provisional
- Do not extrapolate trends from <10 data points

### 8c. When canonical mismatch is detected

- MUST report both user and Google canonical
- MUST recommend inspecting the Google-selected canonical
- Do NOT claim the mismatch "causes" ranking loss without further evidence

### 8d. Always

- State the data window explicitly
- Separate confirmed state from plausible causes
- Hypotheses must include "would confirm" and "would refute" conditions

---

## 9. Example phrasing: good vs bad

### Good ✓

- "Inspection evidence indicates this URL is not currently indexed."
- "Current GSC data shows 3 impressions and 0 clicks in the last 28 days, suggesting limited search visibility."
- "A canonical mismatch is detected: the page declares canonical X, but Google selected Y. This may affect which URL appears in results."
- "Supporting visibility data is absent — indexation state is confirmed, but ranking assessment is not possible."
- "This hypothesis requires checking server logs to confirm or refute."

### Bad ✗

- "Google doesn't understand the content of this page."
- "The page is penalized for thin content."
- "This page has a crawl budget problem."
- "Fix the canonical tag and the page will be indexed within a week."
- "The obvious reason this page is not indexed is..."
- "Google is confused by the URL structure."
- "The problem is clearly related to content quality."

---

_This contract is enforced for all `indexation_debug_v1` workflow outputs. Violations render the report non-compliant._
