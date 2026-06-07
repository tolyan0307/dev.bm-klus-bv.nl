# Operator Playbook v1

**Version:** 1.1
**Date:** 2026-04-07
**Purpose:** Deterministic routing table for operating seo-ops. Designed for weaker models (Sonnet-class) to follow without creative reasoning.

---

## How to use this playbook

1. Read the user's request
2. Match it to an intent in the routing table below
3. Follow the steps exactly — do not improvise
4. Use the specified report template
5. Apply all preflight checks from `config/preflight_rules_v1.yaml`
6. Apply all provenance rules from `contracts/numeric_provenance_v1.md`
7. Check current project state in `config/project_state_v1.yaml` — do not re-report resolved issues or re-recommend pending actions
8. Apply evidence tier rules from `contracts/expert_rules_v1.md`
9. Apply output quality gate from `contracts/final_report_rules_v1.md`
10. Apply domain interpretation rules from expert playbooks:
    - SEO analysis: `contracts/seo_expert_playbook_nl_v1.md`
    - PPC analysis: `contracts/ppc_expert_playbook_v1.md`
    - Cross-source data: `contracts/measurement_interpretation_rules_v1.md`
11. Use service/market context from:
    - Service structure: `config/service_taxonomy_v1.yaml`
    - Dutch market terms: `config/market_terms_nl_v1.yaml`
12. Use `examples/good_reports/` and `examples/bad_patterns/` as output quality anchors when generating strict reports

**If the user's intent does not match any row in the routing table:** ask the user to clarify. Do not guess a workflow.

---

## Intent routing table

| # | User intent (RU/EN examples) | Workflow(s) | Report template | Preflight |
|---|-----|-------------|-----------------|-----------|
| 1 | "Проверь PPC / Review Ads performance" | `ppc_review_v1` | decision_pack | Check: google_ads_csvs, keyword_master_v2, ga4_snapshot |
| 2 | "Найди SEO возможности / Find SEO gaps" | `seo_page_vs_query_gap_v1` | decision_pack | Check: gsc_snapshot, keyword_master_v2, ga4_snapshot, page_inventory |
| 3 | "Проаудируй страницу X / Audit page X" | `page_audit_v1` | **page_seo_diagnosis** | Check: all snapshots. Set route argument. **MANDATORY: use `contracts/page_seo_diagnosis_rules_v1.md`** for channel isolation, metric labeling, diagnostic structure. Use Template 5 (Page SEO Diagnosis) from `templates/report_templates_v1.md` — NOT decision_pack. |
| 4 | "Проверь ключевые слова / Keyword review" | `keyword_intelligence_review_v2` | decision_pack | Check: keyword_master_v2, page_inventory |
| 5 | "Найди legacy URL / Cleanup URLs" | `legacy_indexation_review_v1` | decision_pack | Check: page_inventory, gsc_snapshot, ga4_snapshot |
| 6 | "Проверь SERP позиции / Check SERP" | `dataforseo_serp_snapshot_v1` | enrichment_note | **LIVE API** — dry-run first, confirm cost |
| 7 | "Сравни с конкурентами / Competitor gap" | `dataforseo_ranked_keywords_gap_v1` | enrichment_note | **LIVE API** — dry-run first, confirm cost |
| 8 | "Найди вопросы для контента / Content ideas" | `dataforseo_question_suggestions_v1` | enrichment_note | **LIVE API** — dry-run first, confirm cost |
| 9 | "Обнови данные GSC / Refresh GSC" | `build_gsc_query_page_snapshot_v1` | none (source build) | **LIVE API** — GSC credentials required |
| 10 | "Обнови GA4 / Refresh GA4" | `build_ga4_landing_page_snapshot_v1` | none (source build) | **LIVE API** — GA4 credentials required |
| 11 | "Обнови keyword master" | `build_keyword_master_v3` | none (source build) | Check: Google Ads CSVs + GSC snapshot |
| 12 | "Обнови page inventory" | `build_page_inventory_v1` | none (source build) | None |
| 13 | "Проверь claims из отчёта / Verify report" | read artifacts manually | verification_audit | Read source artifacts, compare to claims |
| 14 | "Кто рангится по запросу X / Query ownership" | read GSC row-level data | page_ownership_audit | Check: gsc_snapshot, page_inventory |
| 15 | "Что видно по данным / Site overview" | `run_analysis_report` + manual | decision_pack | Check: latest_combined_snapshot.json freshness |
| 16 | "Почему страница не индексируется / Why isn't page indexed / Check indexation" | `build_url_inspection_snapshot_v1` → `indexation_debug_v1` | **indexation_diagnosis** | **LIVE API** — inspection requires user confirmation. Check: GSC credentials. Optional: gsc_snapshot, page_inventory. **MANDATORY: use `contracts/indexation_diagnosis_rules_v1.md`** |
| 17 | "Это проблема индексации или ранжирования / Indexation vs ranking" | `build_url_inspection_snapshot_v1` → `indexation_debug_v1` | **indexation_diagnosis** | Same as #16. If indexed, may route to `page_audit_v1` for ranking diagnosis. |
| 18 | "Можно ли доверять этим данным / Can we trust the measurement / Is this a tracking problem or a weak page / Why do GSC and GA4 differ" | `measurement_audit_v1` | **measurement_audit** | Check: ga4_snapshot (required), gsc_snapshot (optional). **MANDATORY: use `contracts/measurement_audit_rules_v1.md`**. Use Template 7 (Measurement Audit) from `templates/report_templates_v1.md`. |
| 19 | "Какие query themes самые перспективные / Это SEO opportunity или PPC negative / Какие запросы плохо соответствуют странице / К какому intent относятся запросы / Есть ли page-query mismatch / Query intent classification" | `query_intelligence_review_v1` | **query_intelligence_review** | Check: keyword_master (v3 preferred) or GSC snapshot. Page inventory recommended for page-fit. **MANDATORY: use `contracts/query_intelligence_rules_v1.md`**. Use Template 8 (Query Intelligence Review) from `templates/report_templates_v1.md`. |
| 20 | "Что у нас по local SEO / Проверь GBP сигналы / Есть ли у нас нормальные данные по отзывам и локальной видимости / Это проблема сайта или GBP/local presence / Насколько можно доверять выводам по local SEO" | `local_seo_gbp_audit_v1` | **local_seo_gbp_audit** | Check: local_entities config (recommended). GBP API access optional — runs in limited mode without. GSC/page_inventory optional for supporting context. **MANDATORY: use `contracts/local_seo_gbp_rules_v1.md`**. Use Template 9 (Local SEO / GBP Audit) from `templates/report_templates_v1.md`. |

---

## Step-by-step execution protocol

### For analysis workflows (intents 1-8, 13-15)

```
STEP 1 — PREFLIGHT
  1.1  Identify required workflow from routing table
  1.2  Read config/preflight_rules_v1.yaml for that workflow
  1.3  Check each required_artifact exists (ls -la)
  1.4  Check each artifact freshness (file modification date)
  1.5  If any artifact is MISSING → STOP, tell user which and how to build
  1.6  If any artifact is STALE → WARN, ask user to confirm or rebuild
  1.7  If workflow requires_live_api → get explicit user confirmation
  1.8  If workflow is budget_sensitive → show cost estimate first

STEP 1.9 — PROJECT STATE CHECK
  1.9.1  Read config/project_state_v1.yaml
  1.9.2  Read data/decision_log_v1.csv
  1.9.3  Note resolved_issues — do NOT re-report as active
  1.9.4  Note pending_actions — do NOT re-recommend as new
  1.9.5  Note legacy_noise patterns — exclude or caveat

STEP 2 — DETERMINE REPORT MODE
  2.1  If site is <6 months post-cutover (check cutover_date in site.yaml) → preliminary
  2.2  If any required artifact is >7 days old → preliminary
  2.3  If using only enrichment data → enrichment_only
  2.4  Otherwise → verified

STEP 3 — RUN WORKFLOW
  3.1  Execute the Python script per command_catalog_v1.md
  3.2  For DataForSEO: ALWAYS --dry-run first, show plan, get confirmation
  3.3  Check output files were created

STEP 3.5 — SCOPE BINDING (page audit only)
  If intent = page_audit_v1 (intent #3):
  3.5.1  Record: requested page, requested channel, requested period, requested question (from user message)
  3.5.2  Record: actual data window (from artifact dates)
  3.5.3  Compare requested period vs actual data window
  3.5.4  If mismatch: prepare explicit disclosure and justification
  3.5.5  This information goes into the "Analysis scope" block at the top of the report
  3.5.6  If requested channel = organic, ALL core metrics MUST be organic-only (GSC + GA4 organic filter)

  WINDOW SELECTION POLICY (page audit):
  3.5.7  Standard recent-window = 28d. This is the preferred primary window for page diagnostics.
  3.5.8  If user requests "last 28 days" or "last 30 days":
         → PREFER *_last28d.* artifacts as PRIMARY data source
         → Use *_last90d.* as SECONDARY context only (query volume, trend direction)
         → If *_last28d.* artifacts are missing: WARN, suggest rebuild, fallback to *_last90d.* with mismatch disclosure
  3.5.9  If user requests "last 90 days" or does not specify a period:
         → Use *_last90d.* artifacts as primary
         → *_last28d.* can supplement as "recent slice" if available
  3.5.10 Never use 90d as primary answer window when user explicitly asked for ~28-30d and 28d artifacts exist.
  3.5.11 28d satisfies "last 30 days" requests — disclose as "28d (4-week analytical window)" in scope block.

  REBUILD COMMANDS (for operator when recent snapshots are missing or stale):
    python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py --days 28
    python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py --days 28

STEP 4 — BUILD REPORT
  4.1  Select report template from routing table
  4.2  Read template structure from templates/report_templates_v1.md
  4.3  **PAGE AUDIT GATE:** If intent = page_audit_v1 (intent #3):
       → Use Template 5 (Page SEO Diagnosis), NOT decision_pack
       → Apply ALL rules from contracts/page_seo_diagnosis_rules_v1.md
       → **Fill in "Analysis scope" block FIRST** (from step 3.5)
       → Metric labels MUST include source + window + scope (per numeric_provenance_v1 §6b)
       → Sections: visibility snapshot → query fit → on-page → interpretations → hypotheses (separate!) → actions
       → Include excluded-context block
       → Hypotheses MUST NOT appear in "Do now" actions
       → Run contradiction self-check (§7 of page_seo_diagnosis_rules_v1) before delivery
       → Speculative causes (domain authority, backlinks, featured snippets, engagement signals) are hypothesis-only (§4)
  4.4  Fill every section — do not skip sections
  4.5  Apply provenance labels from contracts/numeric_provenance_v1.md
  4.6  Apply evidence tiers from contracts/expert_rules_v1.md (Tier 1-4)
  4.7  Apply output quality gate from contracts/final_report_rules_v1.md
  4.8  Separate observations / interpretations / hypotheses / actions (4-part for page audits, 3-part minimum for others)
  4.9  Add provenance footer
  4.10 Set report_mode from step 2

STEP 5 — DELIVER
  5.1  Save report to reports/combined/ with proper naming
  5.2  Present key findings to user (3-5 bullets max)
  5.3  Offer specific next steps from the report
```

### For manual audit workflows (intents 13-14)

```
STEP 1 — PREFLIGHT
  1.1  Identify the manual workflow from routing table
  1.2  Read config/preflight_rules_v1.yaml for that workflow
  1.3  Check required_artifacts exist (page_ownership_audit requires GSC + page_inventory)
  1.4  For verification_audit: identify which artifacts contain the claims being verified

STEP 2 — READ SOURCE ARTIFACTS (not reports)
  2.1  Open machine-readable artifacts (JSON/CSV) first — these are primary truth
  2.2  Open workflow outputs (outputs/*.json) second
  2.3  Use markdown reports only as secondary human-readable context
  2.4  DO NOT verify a report by reading another report alone

STEP 3 — EXECUTE AUDIT
  3.1  For page_ownership_audit: filter GSC row-level data for target query, cross-reference with page_inventory
  3.2  For verification_audit: extract each claim, find the corresponding value in source artifacts

STEP 4 — BUILD REPORT
  4.1  Use the template from templates/report_templates_v1.md
  4.2  Fill every section — do not skip
  4.3  Apply provenance labels
  4.4  Add provenance footer

STEP 5 — DELIVER
  5.1  Save report to reports/combined/
  5.2  Present key findings (3-5 bullets max)
```

### For source builds (intents 9-12)

```
STEP 1 — Check prerequisites (credentials, upstream artifacts)
STEP 2 — Run the build script
STEP 3 — Verify output files exist and have reasonable row counts
STEP 4 — Report: what was built, how many rows, where output is
```

---

## Allowed and forbidden behaviors

### ALWAYS do

- Check artifact freshness before analysis
- Label every numeric claim with provenance
- State confidence level for every finding
- Disclose report mode (preliminary/verified/enrichment_only)
- Use exact template structure — do not improvise sections
- Show DataForSEO cost estimate before live API calls
- State what was NOT done at the end of every report

### NEVER do

- Invent data points not found in artifacts
- Present estimated values as actual
- Derive account balance from API `money` fields
- Skip the provenance footer
- Run DataForSEO without --dry-run first
- Chain multiple analysis workflows without user confirmation between each
- Present low-volume metrics (<10 clicks) as statistically significant
- Compare post-cutover metrics to pre-cutover baselines as like-for-like
- Add "improvements" or refactors beyond what the user asked
- Recommend aggressive budget scaling
- Present GSC query-level position as page-level position (they differ)

### Verification source priority

When verifying claims from any report, use sources in this order:

1. **Machine-readable artifacts** — JSON / CSV files in `snapshots/normalized/` and `outputs/` (primary truth)
2. **Direct workflow outputs** — `outputs/*.json` (structured, traceable)
3. **Markdown reports** — `reports/` (human-readable support only, never sole verification source)

A verification that only compares one markdown report to another is **invalid**. Always trace claims back to machine-readable artifacts.

### Source selection rules

All analysis must respect the source hierarchy defined in `contracts/source_hierarchy_rules_v1.md`:

1. **Internal artifacts first.** GSC/GA4/Ads snapshots and keyword_master are primary truth for BM Klus performance. All performance claims must originate from these.
2. **Official docs for system behavior.** Google official documentation (Search Central, API docs, Ads Help) explains how platforms work — metric definitions, crawling rules, match type behavior. Use it as reference layer, not as proof of BM Klus-specific outcomes.
3. **DataForSEO = enrichment only.** DataForSEO outputs provide competitor/SERP/keyword context. They do not replace GSC position data or Ads performance data for BM Klus. Exception: when the question is specifically about DataForSEO output itself (e.g., "what did the SERP snapshot show?").
4. **Third-party blogs are not policy.** Do not cite SEO blogs as authority on how Google systems work. Use Google official docs instead.

Source manifests: `config/official_sources_manifest_v1.yaml`, `config/external_sources_manifest_v1.yaml`.
Official source citation rules: `contracts/official_source_usage_rules_v1.md`.

### When uncertain

- If data is insufficient: say so explicitly, do not fill gaps
- If intent doesn't match routing table: ask user to clarify
- If artifact seems corrupted or empty: report the problem, do not proceed
- If two workflows could apply: present both options to user, let them choose
- If confidence would be low for all findings: state this upfront, ask if user wants to proceed

---

## Quick reference: workflow operational status

| Workflow | Status | Flags |
|----------|--------|-------|
| build_page_inventory_v1 | primary | — |
| build_keyword_master_v3 | primary | — |
| build_gsc_query_page_snapshot_v1 | primary | requires_live_api |
| build_ga4_landing_page_snapshot_v1 | primary | requires_live_api |
| ~~build_keyword_master_v1~~ | deprecated | archived → use build_keyword_master_v3 |
| ~~build_keyword_master_v2~~ | deprecated | archived → use build_keyword_master_v3 |
| ppc_review_v1 | primary | budget_sensitive, legacy_noise_sensitive |
| seo_page_vs_query_gap_v1 | primary | legacy_noise_sensitive |
| page_audit_v1 | primary | legacy_noise_sensitive, **page_seo_diagnosis_rules_v1**, template=page_seo_diagnosis |
| keyword_intelligence_review_v2 | secondary | budget_sensitive, legacy_noise_sensitive |
| legacy_indexation_review_v1 | secondary | post_cutover_context |
| dataforseo_serp_snapshot_v1 | secondary | budget_sensitive, requires_live_api, enrichment_only |
| dataforseo_ranked_keywords_gap_v1 | experimental | budget_sensitive, requires_live_api, enrichment_only, do_not_use_for_final_decision_alone |
| dataforseo_question_suggestions_v1 | experimental | budget_sensitive, requires_live_api, enrichment_only, do_not_use_for_final_decision_alone |
| page_ownership_audit_v1 | primary | legacy_noise_sensitive, verification_recommended, manual_audit |
| verification_audit_v1 | primary | verification_recommended, manual_audit |
| build_url_inspection_snapshot_v1 | secondary | requires_live_api |
| indexation_debug_v1 | secondary | indexation_diagnosis_rules_v1, template=indexation_diagnosis |
| measurement_audit_v1 | secondary | measurement_audit_rules_v1, template=measurement_audit |
| query_intelligence_review_v1 | secondary | query_intelligence_rules_v1, template=query_intelligence_review |
| local_seo_gbp_audit_v1 | secondary | local_seo_gbp_rules_v1, template=local_seo_gbp_audit, allow_limited_mode |
| run_full_site_audit | planned | — |

**Status legend:**
- **primary** — Core workflow, well-tested, use by default for matching intent
- **secondary** — Works but narrower scope, or requires external API, or lower priority
- **experimental** — Tested once but limited usage history; outputs need cross-verification before acting
- **planned** — Not yet implemented, do not attempt to run
- **deprecated** — Superseded, do not use (none currently)

---

## Workflow flag reference

| Flag | Meaning | Operator action |
|------|---------|----------------|
| `budget_sensitive` | Results affected by low PPC budget (10 EUR/day) | Cap volume-dependent confidence at `low` |
| `legacy_noise_sensitive` | Pre-cutover data may contaminate results | Discard pre-cutover signals unless explicitly analyzing legacy |
| `requires_live_api` | Makes external API calls | Get user confirmation before running |
| `enrichment_only` | Standalone enrichment, does not modify internal artifacts | Set report_mode to `enrichment_only` |
| `post_cutover_context` | Workflow specifically designed for post-cutover analysis | Apply mandatory context disclosure |
| `verification_recommended` | Output should be cross-checked before acting | Add verification note to report |
| `do_not_use_for_final_decision_alone` | Data is directional, not conclusive | State explicitly in report |

---

## Enforcement tools

Three CLI tools in `seo-ops/tools/` automate hardening checks:

### Preflight checker
```bash
python seo-ops/tools/run_preflight_check.py ppc_review_v1
python seo-ops/tools/run_preflight_check.py --list
```
Run BEFORE any workflow. Checks artifacts, freshness, credentials, prints PASS/WARN/BLOCK.

### Report scaffold generator
```bash
python seo-ops/tools/init_report_scaffold.py decision_pack --topic "Rotterdam SEO" --mode preliminary
python seo-ops/tools/init_report_scaffold.py --list
```
Run AFTER workflow completes. Generates a markdown scaffold with all required sections.

### Provenance validator
```bash
python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/some_report.md
```
Run AFTER report is written. Checks report mode, provenance footer, forbidden patterns.

### Source hierarchy validator
```bash
python seo-ops/tools/validate_source_hierarchy.py seo-ops/reports/combined/some_report.md
python seo-ops/tools/validate_source_hierarchy.py --strict report.md
```
Run AFTER report draft. Checks that source hierarchy is respected: no external enrichment as primary truth, no third-party blogs as policy, internal artifact evidence present for BM Klus claims.

### Official evidence validator
```bash
python seo-ops/tools/validate_official_evidence.py seo-ops/reports/combined/some_report.md
python seo-ops/tools/validate_official_evidence.py --report-type indexation_diagnosis report.md
```
Run AFTER report draft when report includes Google/platform behavior claims. Checks for anthropomorphic language, penalty overclaims, and missing official-source references.

### Recommended workflow with tools
```
1. python seo-ops/tools/run_preflight_check.py {workflow}                  # BEFORE
2. python seo-ops/analyzers/.../{workflow_script}.py                        # RUN
3. python seo-ops/tools/init_report_scaffold.py {template} ...             # SCAFFOLD
4. (fill in report with findings)                                           # WRITE
5. python seo-ops/tools/validate_report_provenance.py {report}             # VALIDATE provenance
6. python seo-ops/tools/validate_source_hierarchy.py {report}              # VALIDATE source hierarchy
7. python seo-ops/tools/validate_official_evidence.py {report}             # VALIDATE official evidence
```

**Shortcut:** Run all validators at once:
```
python seo-ops/tools/validate_report_provenance.py --with-all {report}
```

### Post-draft validation checklist

After writing any report draft, run validation in this order:

1. **Provenance validation (always):** `validate_report_provenance.py` — checks report mode, footer, forbidden patterns, mandatory sections.
2. **Source hierarchy validation (report-style tasks):** `validate_source_hierarchy.py` — checks that BM Klus claims use internal artifacts, external data is labelled as enrichment, no blogs as policy. Especially important for `page_seo_diagnosis` and `decision_pack` reports.
3. **Official evidence validation (when report references Google/platform behavior):** `validate_official_evidence.py` — checks for anthropomorphic language, penalty overclaims, missing official-source support. Mandatory for `indexation_diagnosis` and `page_seo_diagnosis` reports.

**Rule:** If any validator returns FAIL, fix the issue before delivering the report. WARN findings should be reviewed but do not block delivery.

---

_This playbook is the primary operating guide for seo-ops. Follow it mechanically._
