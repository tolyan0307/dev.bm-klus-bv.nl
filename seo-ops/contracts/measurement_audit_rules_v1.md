# Measurement Audit Rules v1

Version 1.0 · 2026-04-08 · Governs `measurement_audit_v1` workflow outputs.

---

## 1. Purpose

Rules for assessing the quality, completeness, and reliability of measurement evidence around specific pages, landing scopes, or site-wide measurement health. This contract ensures that measurement audit outputs distinguish clearly between confirmed measurement gaps, plausible interpretations, and hypotheses that require further investigation.

A measurement audit does NOT prove business causality. It determines whether the available measurement evidence is sufficient to support the conclusions that other workflows (page audit, SEO gap, PPC review) might draw.

---

## 2. Scope

This contract governs:
- `run_measurement_audit_v1.py` analyzer outputs
- Any operator-written measurement audit reports using Template 7 (Measurement Audit)
- Interpretation of GA4/GSC cross-source evidence quality

This contract does NOT govern:
- Page SEO diagnosis (see `page_seo_diagnosis_rules_v1.md`)
- Indexation diagnostics (see `indexation_diagnosis_rules_v1.md`)
- PPC performance assessment (see `ppc_expert_playbook_v1.md`)

---

## 3. Primary truth sources

| Source | Role | Source class |
|--------|------|-------------|
| GA4 landing page snapshots | Primary measurement evidence for on-site behavior | internal_artifact |
| GA4 landing pages by channel | Channel-level measurement evidence | internal_artifact |
| `config/conversions.yaml` | Defines what constitutes a key event / conversion | internal_artifact |
| `config/thresholds/measurement_audit_v1.yaml` | Numeric thresholds for classification | internal_artifact |

---

## 4. Supporting sources

| Source | Role | Source class |
|--------|------|-------------|
| GSC page/query snapshots | Comparison layer for visibility vs measurement | internal_artifact |
| Page inventory | Scope validation, page existence check | internal_artifact |
| `config/analysis_context_v1.yaml` | Cutover date, analysis mode | internal_artifact |

Supporting sources provide context but are not primary truth for measurement quality assessment.

---

## 5. Required report structure

Every measurement audit output (JSON and markdown) must include:

1. **Scope and purpose** — what was audited and why
2. **Sources used** — with freshness, row counts, windows
3. **Measurement evidence observations** — factual, no interpretation
4. **Outcome classification** — per-scope bucket assignment
5. **Interpretation boundaries** — what can and cannot be concluded
6. **Plausible limitations vs confirmed issues** — clearly separated
7. **Recommended next checks** — specific, actionable
8. **Excluded context** — what was not assessed or not available

---

## 6. Allowed interpretations

The following interpretations are permitted when supported by evidence:

- "GA4 evidence for this page is limited by low session volume (N=X)"
- "Current measurement evidence is insufficient to confirm conversion performance"
- "The mismatch between GSC visibility and GA4 sessions may reflect [specific possibilities]"
- "Measurement adequacy for this scope is [classification] because [evidence]"
- "Engagement proxy metrics are available but cannot substitute for conversion evidence"
- "(not set) proportion is [X%], which indicates [elevated/normal] measurement gap"

---

## 7. Forbidden inferences

The following conclusions are **never permitted** in measurement audit outputs:

| Forbidden | Why |
|-----------|-----|
| "Tracking is broken" | Requires server-side investigation, not artifact analysis |
| "This page converts well" from engagement proxies alone | Engagement ≠ conversion (see `measurement_interpretation_rules_v1.md` §3) |
| "GA4 proves SEO quality" | GA4 measures on-site behavior, not search ranking quality |
| "GSC proves conversion quality" | GSC measures search visibility, not on-site outcomes |
| Blended channel conclusions without disclosure | Must isolate organic/paid/direct when interpreting |
| "The reason GA4 and GSC differ is [single cause]" | Multiple explanations exist; state all plausible ones |
| "Conversion rate is X%" from <20 key events | Insufficient volume for meaningful rate |
| Definitive attribution claims | Not supported by GA4/GSC artifacts alone |
| "Measurement is fine" without checking volume thresholds | Must apply thresholds from config |

---

## 8. Minimum caveat rules

### Always include when applicable:

**Post-cutover caveat:**
> Site is <90 days post-cutover. GA4 and GSC data may include pre-cutover signals. Measurement baselines are not yet established.

**Low-volume caveat:**
> Session count (N=X) is below the confident interpretation threshold. Findings are directional signals, not confirmed patterns.

**Mixed-window caveat:**
> GSC data covers [window]. GA4 data covers [window]. Cross-source metrics are directional only.

**Measurement gap caveat:**
> Known measurement gaps: [list]. These gaps may cause undercounting of actual page activity.

**Engagement ≠ conversion caveat (when citing engagement metrics):**
> Engagement rate and session duration are behavioral signals. They do not indicate conversion readiness or lead quality.

### Caveat placement:
- Report-level caveats go in the header (sources section), NOT in individual findings.
- Per-page caveats go in the page's interpretation section.

---

## 9. Example phrasing: good vs bad

### Good (allowed):
- "Current measurement evidence is limited by low session volume (N=7). Engagement metrics from this volume are unreliable."
- "The mismatch between GSC impressions (774) and GA4 organic sessions (82) may reflect: different counting windows, consent mode filtering, or (not set) allocation. No single cause is confirmed."
- "Measurement adequacy for /gevelisolatie/ is `measurement_limited_low_volume` because key events (N=2) are below the directional threshold (10)."
- "This remains a hypothesis until a clean 90-day post-cutover window is available."
- "Conversion interpretation is weak because primary key events (Contact_Form_Site, Phone, Whatsapp) total 2 in this window."

### Bad (forbidden):
- "Tracking is broken on this page" (no server-side evidence)
- "This page converts well — engagement rate is 68%" (engagement ≠ conversion)
- "GA4 shows the page is performing excellently" (overclaim from behavioral proxies)
- "The GSC-GA4 mismatch proves there is a tracking problem" (multiple explanations possible)
- "We can see from the data that organic traffic drives conversions" (attribution overclaim)
- "Page has 67% engagement rate" without stating N (misleading at low volume)

---

## Cross-references

- Measurement interpretation fundamentals: `contracts/measurement_interpretation_rules_v1.md`
- Evidence tiers: `contracts/expert_rules_v1.md`
- Numeric provenance: `contracts/numeric_provenance_v1.md`
- Conversion event definitions: `config/conversions.yaml`
- Thresholds: `config/thresholds/measurement_audit_v1.yaml`
- Analysis context (cutover, mode): `config/analysis_context_v1.yaml`
