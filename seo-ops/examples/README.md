# Examples — Good Reports & Bad Patterns

## Purpose

Reference layer for calibrating report quality. Operators and models should use
these examples as **concrete quality anchors** when generating or reviewing
strict reports. Good reports show correct structure and reasoning discipline.
Bad patterns show realistic mistakes and explain why they violate the system's
contracts.

---

## How operators should use examples

1. **Before writing a report:** skim the relevant good example to refresh the
   expected structure, evidence tier separation, and provenance discipline.
2. **During self-review:** compare your draft against bad patterns — if your
   report resembles any anti-pattern, revise before delivery.
3. **When onboarding a new workflow or model:** point it to the relevant
   examples to set quality expectations without re-explaining every contract.

Examples are **illustrative, not templates.** They use synthetic data and should
not be copy-pasted. The report templates in `templates/report_templates_v1.md`
remain the authoritative structural reference.

---

## Difference between good_reports and bad_patterns

| Aspect | good_reports | bad_patterns |
|--------|-------------|--------------|
| Purpose | Show correct structure + reasoning | Show common mistakes + why they're wrong |
| Format | Full exemplar reports (synthetic data) | Flawed excerpt + "What is wrong" + "Why it is risky" |
| Tone | Realistic target output | Realistic mistakes (not cartoonishly bad) |
| Use case | Pre-writing calibration | Self-review / error prevention |

---

## File index

### good_reports/

| File | Report type | Key lessons |
|------|------------|-------------|
| `page_seo_diagnosis_good_v1.md` | Page-level SEO diagnosis | Scope binding, observation/interpretation split, Tier 3 separation, provenance labels, excluded context |
| `ppc_review_good_v1.md` | PPC review (€10/day) | Low-budget caution, theme-level analysis, minimum conversion thresholds, no ROAS at low volume |
| `indexation_debug_good_v1.md` | Indexation investigation | URL Inspection as primary truth, plausible vs confirmed causes, no Google anthropomorphism |

### bad_patterns/

| File | Anti-pattern | Contracts violated |
|------|-------------|-------------------|
| `page_diagnosis_bad_v1.md` | Mixed observations/conclusions, no scope, speculative root causes as confirmed | page_seo_diagnosis_rules, final_report_rules, numeric_provenance, expert_rules |
| `measurement_claims_bad_v1.md` | Overclaiming from proxy metrics, dismissing (not set), blended channel rates | measurement_interpretation_rules, expert_rules, numeric_provenance |
| `google_behavior_overclaim_bad_v1.md` | Official docs as site-specific proof, third-party blogs as policy, Google mind-reading | source_hierarchy_rules, official_source_usage_rules, expert_rules |

---

## Maintenance rules

- Examples are **illustrative** — they contain synthetic data and must never be
  presented as production reports.
- Update examples when contracts **materially change** (new mandatory sections,
  changed evidence tiers, updated thresholds). Minor contract wording edits do
  not require example updates.
- Keep examples **concise and high-signal.** If an example grows beyond ~200
  lines, consider splitting or trimming.
- Examples must **not contain secrets**, real sensitive data, production API
  keys, or credential paths.
- Each good example must include a **"Why this is a good example"** section.
- Each bad pattern must include **"What is wrong"** and **"Why it is risky"**
  sections with specific contract references.

---

## Cross-references

- Report format contracts: `contracts/final_report_rules_v1.md`
- Evidence tiers: `contracts/expert_rules_v1.md`
- Page diagnosis rules: `contracts/page_seo_diagnosis_rules_v1.md`
- PPC reasoning rules: `contracts/ppc_expert_playbook_v1.md`
- SEO reasoning rules: `contracts/seo_expert_playbook_nl_v1.md`
- Measurement rules: `contracts/measurement_interpretation_rules_v1.md`
- Source hierarchy: `contracts/source_hierarchy_rules_v1.md`
- Official source usage: `contracts/official_source_usage_rules_v1.md`
- Numeric provenance: `contracts/numeric_provenance_v1.md`
- Report templates: `templates/report_templates_v1.md`
