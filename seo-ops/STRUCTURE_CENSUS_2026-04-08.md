# SEO-OPS STRUCTURE CENSUS

**Дата:** 2026-04-08
**Область:** `seo-ops/`

---

## A. EXECUTIVE SUMMARY

Система `seo-ops` — зрелый V1 scaffold из ~130 файлов (без .venv и __pycache__). Состоит из 5 функциональных слоёв:

1. **Integrations** — коннекторы к GSC, GA4, DataForSEO, Google Ads, local site
2. **Analyzers** — 14 Python-скриптов (4 source builds, 7 analysis, 3 DataForSEO enrichment)
3. **Analysis** — отдельный rule-based engine (legacy, всё ещё рабочий)
4. **Contracts** — 7 markdown-контрактов (expert rules, provenance, diagnosis, playbooks)
5. **Workflows** — registry, catalog, playbook, orchestrator, runbook, intake template

**Архивировано:** 3 скрипта + 3 отчёта + 1 папка snapshot (keyword master v1/v2 pipeline)

**Config surface:** 10+ yaml/env файлов — site, conversions, priority-pages, competitors, analysis_context, preflight_rules, project_state, service_taxonomy, market_terms

**Риски для интеграции:** минимальны — система хорошо структурирована, точки подключения ясны.

---

## B. DIRECTORY TREE

```
seo-ops/
├── _archive/                           # ARCHIVED
│   ├── analyzers/keywords/
│   │   ├── build_keyword_master_v1.py
│   │   ├── build_keyword_master_v2.py
│   │   └── run_keyword_intelligence_review_v1.py
│   ├── outputs/
│   │   └── keyword_intelligence_review_v1.json
│   ├── reports/keywords/
│   │   ├── keyword_intelligence_review_v1.md
│   │   ├── keyword_master_summary_v1.md
│   │   └── keyword_master_v2_summary.md
│   └── snapshots/normalized/keyword_master/  (empty)
│
├── analysis/                           # ACTIVE (legacy engine)
│   ├── __init__.py
│   ├── README.md
│   ├── report_builder.py
│   ├── rules.py
│   ├── run_analysis_report.py
│   └── snapshot_loader.py
│
├── analyzers/                          # ACTIVE (V1 pipeline)
│   ├── keywords/
│   │   ├── build_keyword_master_v3.py
│   │   ├── run_dataforseo_keyword_enrichment_v1.py
│   │   ├── run_dataforseo_question_suggestions_v1.py
│   │   ├── run_dataforseo_ranked_keywords_gap_v1.py
│   │   ├── run_dataforseo_related_keywords_v1.py
│   │   └── run_keyword_intelligence_review_v2.py
│   ├── pages/
│   │   ├── build_ga4_landing_page_snapshot.py
│   │   ├── build_page_inventory.py
│   │   └── run_page_audit_v1.py
│   ├── ppc/
│   │   └── run_ppc_review_v1.py
│   └── seo/
│       ├── build_gsc_query_page_snapshot.py
│       ├── run_dataforseo_serp_snapshot_v1.py
│       ├── run_legacy_indexation_review_v1.py
│       └── run_page_vs_query_gap_v1.py
│
├── config/
│   ├── analysis_context_v1.yaml
│   ├── competitors.yaml
│   ├── conversions.yaml
│   ├── dataforseo.example.env
│   ├── locales/  (.gitkeep)
│   ├── mappings/ (.gitkeep)
│   ├── market_terms_nl_v1.yaml
│   ├── preflight_rules_v1.yaml
│   ├── priority-pages.yaml
│   ├── project_state_v1.yaml
│   ├── service_taxonomy_v1.yaml
│   ├── site.yaml
│   └── thresholds/ (.gitkeep)
│
├── contracts/
│   ├── expert_rules_v1.md
│   ├── final_report_rules_v1.md
│   ├── measurement_interpretation_rules_v1.md
│   ├── numeric_provenance_v1.md
│   ├── page_seo_diagnosis_rules_v1.md
│   ├── ppc_expert_playbook_v1.md
│   └── seo_expert_playbook_nl_v1.md
│
├── data/
│   ├── decision_log_v1.csv
│   ├── processed/
│   │   ├── latest_analysis_report.json
│   │   └── latest_combined_snapshot.json
│   └── raw/  (ga4/.gitkeep, gsc/.gitkeep)
│
├── examples/
│   ├── bad_patterns/  (empty)
│   ├── good_reports/  (empty)
│   └── README.md
│
├── integrations/
│   ├── .env.example
│   ├── .env.local               # SECRETS
│   ├── .venv/                   # Python venv
│   ├── requirements.txt
│   ├── README.md
│   ├── run_combined_snapshot.py
│   ├── test_ga4_access.py
│   ├── test_gsc_access.py
│   ├── dataforseo/
│   │   ├── __init__.py
│   │   ├── client.py
│   │   ├── cost_tracker.py
│   │   ├── labs_google.py
│   │   ├── serp_google.py
│   │   └── smoke_test_user_data.py
│   ├── ga4/
│   │   └── landing_page_loader.py
│   ├── google_ads/
│   │   └── keyword_source_loader.py
│   ├── google_clients/
│   │   ├── __init__.py
│   │   ├── combined_snapshot.py
│   │   ├── config.py
│   │   ├── ga4_client.py
│   │   └── gsc_client.py
│   ├── gsc/
│   │   ├── query_page_loader.py
│   │   └── query_snapshot_loader.py
│   ├── site/
│   │   ├── local_page_loader.py
│   │   └── page_inventory_loader.py
│   └── web/ (.gitkeep)
│
├── outputs/                     # JSON outputs от analyzers
│   ├── dataforseo_cost_log.json
│   ├── dataforseo_keyword_enrichment_v1.json
│   ├── dataforseo_ranked_keywords_gap_v1.json
│   ├── dataforseo_related_keywords_v1.json
│   ├── dataforseo_serp_snapshot_v1.json
│   ├── keyword_intelligence_review_v2.json
│   ├── legacy_indexation_candidates_v1.csv
│   ├── legacy_indexation_review_v1.json
│   ├── page_audit_gevelisolatie_v1.json
│   ├── page_vs_query_gap_v1.json
│   └── ppc_review_campaign_23271040037_last30d.json
│
├── prompts/
│   ├── content-brief.md
│   ├── indexation-watchdog.md
│   ├── landing-page-audit.md
│   └── weekly-organic-opportunities.md
│
├── reports/
│   ├── audits/ (.gitkeep)
│   ├── briefs/ (.gitkeep)
│   ├── combined/  (9 .md reports)
│   ├── dataforseo/ (2 .md)
│   ├── keywords/ (5 .md)
│   ├── pages/ (4 .md)
│   ├── ppc/ (1 .md)
│   ├── seo/ (4 .md)
│   └── weekly/ (1 .md)
│
├── schemas/ (.gitkeep — empty)
│
├── snapshots/
│   ├── raw/
│   │   ├── dataforseo/ (5 .json)
│   │   ├── ga4/ (2 .json)
│   │   └── gsc/ (2 .json)
│   └── normalized/
│       ├── dataforseo/ (2 .json)
│       ├── keyword_master/ (6 files: v2+v3 csv/json + enrichment csv)
│       ├── pages/ (5 csv + 1 json)
│       └── seo/ (6 csv: 28d + 90d)
│
├── templates/
│   ├── export-file-naming.md
│   └── report_templates_v1.md
│
├── tools/
│   ├── init_report_scaffold.py
│   ├── run_preflight_check.py
│   └── validate_report_provenance.py
│
├── workflows/
│   ├── command_catalog_v1.md
│   ├── operator_playbook_v1.md
│   ├── orchestrator_v1.md
│   ├── runbook_v1.md
│   ├── task_intake_template_v1.md
│   └── workflow_registry_v1.json
│
├── ARCHITECTURE_V1.md
├── ASSET_REGISTRY.md
├── capabilities.md
├── CONTRACTS_V1.md
├── Instruction_for_me.md
├── README.md
└── ROADMAP_V1.md
```

---

## C. ACTIVE SURFACE MAP

### Analyzers (14 scripts)

| Path | Role | Type | Dependencies |
|------|------|------|-------------|
| `analyzers/pages/build_page_inventory.py` | Scan Next.js routes → page_inventory | source_build | `integrations/site/local_page_loader` |
| `analyzers/pages/build_ga4_landing_page_snapshot.py` | GA4 API → landing page CSVs | source_build | `integrations/ga4/landing_page_loader`, `integrations/site/page_inventory_loader` |
| `analyzers/seo/build_gsc_query_page_snapshot.py` | GSC API → query+page CSVs | source_build | `integrations/gsc/query_page_loader`, `integrations/site/page_inventory_loader` |
| `analyzers/keywords/build_keyword_master_v3.py` | Ads CSV + GSC → keyword_master v3 | source_build | stdlib only |
| `analyzers/ppc/run_ppc_review_v1.py` | PPC campaign review | analysis | artifacts only |
| `analyzers/seo/run_page_vs_query_gap_v1.py` | SEO gap analysis | analysis | artifacts only |
| `analyzers/pages/run_page_audit_v1.py` | Single-page deep audit | analysis | artifacts only |
| `analyzers/keywords/run_keyword_intelligence_review_v2.py` | Keyword intelligence review | analysis | artifacts only |
| `analyzers/seo/run_legacy_indexation_review_v1.py` | Legacy URL cleanup review | analysis | artifacts only |
| `analyzers/seo/run_dataforseo_serp_snapshot_v1.py` | SERP snapshot | enrichment | sys.path → dataforseo |
| `analyzers/keywords/run_dataforseo_keyword_enrichment_v1.py` | Keyword overview enrichment | enrichment | `dataforseo.labs_google` |
| `analyzers/keywords/run_dataforseo_related_keywords_v1.py` | Related keywords | enrichment | `dataforseo.labs_google` |
| `analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py` | Competitor keyword gap | enrichment | sys.path → dataforseo |
| `analyzers/keywords/run_dataforseo_question_suggestions_v1.py` | Question suggestions | enrichment | sys.path → dataforseo |

### Integrations (15 modules)

| Path | Role | Used by |
|------|------|---------|
| `integrations/google_clients/config.py` | Shared config loader | ga4_client, gsc_client, ga4/landing_page_loader, gsc/query_page_loader |
| `integrations/google_clients/gsc_client.py` | GSC data fetcher | combined_snapshot |
| `integrations/google_clients/ga4_client.py` | GA4 data fetcher | combined_snapshot |
| `integrations/google_clients/combined_snapshot.py` | GSC+GA4 merge | run_combined_snapshot.py |
| `integrations/run_combined_snapshot.py` | CLI runner | standalone |
| `integrations/ga4/landing_page_loader.py` | GA4 landing page puller | build_ga4_landing_page_snapshot |
| `integrations/gsc/query_page_loader.py` | GSC query+page puller | build_gsc_query_page_snapshot |
| `integrations/gsc/query_snapshot_loader.py` | GSC CSV reader | **UNCLEAR — no importer found** |
| `integrations/site/local_page_loader.py` | Local route scanner | build_page_inventory |
| `integrations/site/page_inventory_loader.py` | page_inventory JSON reader | build_ga4_landing_page_snapshot, build_gsc_query_page_snapshot |
| `integrations/google_ads/keyword_source_loader.py` | Google Ads CSV reader | **UNCLEAR — no importer found** |
| `integrations/dataforseo/client.py` | REST client | labs_google, serp_google, smoke_test |
| `integrations/dataforseo/labs_google.py` | Labs API wrapper | keyword enrichment/related scripts |
| `integrations/dataforseo/serp_google.py` | SERP API wrapper | SERP snapshot script (via sys.path) |
| `integrations/dataforseo/cost_tracker.py` | API cost logging | **UNCLEAR — not imported anywhere visible** |
| `integrations/dataforseo/smoke_test_user_data.py` | API connectivity test | standalone |

### Analysis engine (legacy)

| Path | Role | Used by |
|------|------|---------|
| `analysis/rules.py` | Rule-based analysis | run_analysis_report |
| `analysis/report_builder.py` | Report builder | run_analysis_report |
| `analysis/snapshot_loader.py` | Snapshot loader | run_analysis_report |
| `analysis/run_analysis_report.py` | CLI runner | standalone (intent #15 in playbook) |

### Tools (3 scripts)

| Path | Role | Used by |
|------|------|---------|
| `tools/run_preflight_check.py` | Pre-workflow validation | operator (manual, step 1) |
| `tools/init_report_scaffold.py` | Report template generator | operator (manual, step 3) |
| `tools/validate_report_provenance.py` | Post-report quality check | operator (manual, step 5) |

### Contracts (7 docs)

| Path | Role |
|------|------|
| `contracts/expert_rules_v1.md` | Evidence tier system (4 tiers) |
| `contracts/final_report_rules_v1.md` | Output quality gate |
| `contracts/numeric_provenance_v1.md` | Provenance labeling rules |
| `contracts/page_seo_diagnosis_rules_v1.md` | Page audit report structure |
| `contracts/measurement_interpretation_rules_v1.md` | Cross-source data interpretation |
| `contracts/seo_expert_playbook_nl_v1.md` | SEO domain knowledge for NL market |
| `contracts/ppc_expert_playbook_v1.md` | PPC domain knowledge |

### Workflows (6 docs)

| Path | Role |
|------|------|
| `workflows/workflow_registry_v1.json` | Source of truth for all workflows |
| `workflows/command_catalog_v1.md` | Human-readable command docs |
| `workflows/operator_playbook_v1.md` | Intent routing + execution protocol |
| `workflows/orchestrator_v1.md` | System philosophy + rules |
| `workflows/runbook_v1.md` | Step-by-step operational guide |
| `workflows/task_intake_template_v1.md` | Intake template for tasks |

### Config (10 files)

| Path | Role |
|------|------|
| `config/site.yaml` | Site URL, property IDs |
| `config/conversions.yaml` | Key events |
| `config/priority-pages.yaml` | Wave 1+2 pages |
| `config/competitors.yaml` | Competitor domains |
| `config/analysis_context_v1.yaml` | Cutover context, mode |
| `config/preflight_rules_v1.yaml` | Preflight checks |
| `config/project_state_v1.yaml` | Resolved issues, pending actions |
| `config/service_taxonomy_v1.yaml` | Service structure |
| `config/market_terms_nl_v1.yaml` | Dutch market terms |
| `config/dataforseo.example.env` | DataForSEO credential template |

### ARCHIVED / DEPRECATED

| Path | Was | Replaced by |
|------|-----|-------------|
| `_archive/analyzers/keywords/build_keyword_master_v1.py` | keyword master v1 builder | build_keyword_master_v3 |
| `_archive/analyzers/keywords/build_keyword_master_v2.py` | keyword master v2 builder | build_keyword_master_v3 |
| `_archive/analyzers/keywords/run_keyword_intelligence_review_v1.py` | Keyword review v1 | run_keyword_intelligence_review_v2 |
| `_archive/outputs/keyword_intelligence_review_v1.json` | Old output | outputs/keyword_intelligence_review_v2.json |
| `_archive/reports/keywords/*.md` | Old reports | reports/keywords/ |

### UNCLEAR / NEEDS REVIEW

| Path | Issue |
|------|-------|
| `integrations/gsc/query_snapshot_loader.py` | No visible importer — possibly legacy |
| `integrations/google_ads/keyword_source_loader.py` | No visible importer — possibly used by build_keyword_master_v3 via sys.path, needs verification |
| `integrations/dataforseo/cost_tracker.py` | Not imported anywhere visible — possibly called directly from enrichment scripts |
| `Instruction_for_me.md` | Unclear purpose — personal notes? |
| `examples/bad_patterns/` and `examples/good_reports/` | Empty — placeholder or abandoned |
| `schemas/` | Empty — placeholder for Phase 5+ |
| `config/locales/`, `config/mappings/`, `config/thresholds/` | Empty (.gitkeep) — placeholders |

---

## D. DEPENDENCY MAP

### Python import graph (internal modules)

```
analyzers/pages/build_page_inventory.py
  └── integrations.site.local_page_loader (build_inventory, PageRecord)

analyzers/pages/build_ga4_landing_page_snapshot.py
  ├── integrations.ga4.landing_page_loader
  └── integrations.site.page_inventory_loader

analyzers/seo/build_gsc_query_page_snapshot.py
  ├── integrations.gsc.query_page_loader
  └── integrations.site.page_inventory_loader

analyzers/keywords/run_dataforseo_keyword_enrichment_v1.py
  └── dataforseo.labs_google.LabsGoogle (via sys.path)

analyzers/keywords/run_dataforseo_related_keywords_v1.py
  └── dataforseo.labs_google.LabsGoogle (via sys.path)

integrations/run_combined_snapshot.py
  └── google_clients.combined_snapshot.collect_snapshot

integrations/google_clients/combined_snapshot.py
  ├── .config (load_gsc_config, load_ga4_config)
  ├── .gsc_client
  └── .ga4_client

integrations/ga4/landing_page_loader.py
  └── google_clients.config (load_ga4_config, Ga4Config)

integrations/gsc/query_page_loader.py
  └── google_clients.config (load_gsc_config, GscConfig)

integrations/dataforseo/labs_google.py
  └── dataforseo.client.DataForSEOClient

integrations/dataforseo/serp_google.py
  └── dataforseo.client.DataForSEOClient

analysis/run_analysis_report.py
  ├── snapshot_loader.load_snapshot
  ├── rules.* (6 rule functions)
  └── report_builder.build_report, report_to_markdown
```

### Doc/registry cross-references

| Registry file | References to |
|---------------|---------------|
| `workflows/workflow_registry_v1.json` | 15 workflows → all scripts in analyzers/ + manual audits |
| `workflows/command_catalog_v1.md` | All run commands from registry |
| `workflows/operator_playbook_v1.md` | workflow_registry → contracts → templates → preflight_rules → project_state |
| `config/preflight_rules_v1.yaml` | All workflows + artifact paths |
| `ASSET_REGISTRY.md` | External Google Ads scripts + internal integrations + DataForSEO |
| `ARCHITECTURE_V1.md` | Directory structure overview + data source status |

### Stale references in active files

| File | Stale reference | Issue |
|------|-----------------|-------|
| `workflows/orchestrator_v1.md` line 37 | `build_keyword_master_v1` then `build_keyword_master_v2` | Should be `build_keyword_master_v3` — deprecated chain still in text |
| `workflows/orchestrator_v1.md` line 78-86 | Dependency chain shows v1 → v2 pipeline | Should show v3 pipeline |
| `workflows/workflow_registry_v1.json` | `build_keyword_master_v1`, `build_keyword_master_v2`, `keyword_intelligence_review_v1` | Marked deprecated but still present in registry JSON |
| `ARCHITECTURE_V1.md` line 53 | DataForSEO listed as "Not connected" | Actually working — 5 enrichment scripts active |
| `ARCHITECTURE_V1.md` line 54 | Web research listed as "Not connected" | Accurate — `integrations/web/` is still empty |
| `ROADMAP_V1.md` Phase 5 | DataForSEO listed as "Not started" | Partially done — 5 enrichment scripts + client active |

---

## E. EXISTING CAPABILITIES RELEVANT TO EXPERT UPGRADE

### Already exists (fully)

| Capability | Location | Status |
|-----------|----------|--------|
| Source manifest / asset registry | `ASSET_REGISTRY.md` | Complete, up to date |
| Evidence validation / provenance | `contracts/numeric_provenance_v1.md` + `tools/validate_report_provenance.py` | Complete, with CLI validator |
| Preflight validation | `config/preflight_rules_v1.yaml` + `tools/run_preflight_check.py` | Complete, with CLI checker |
| Report scaffolding | `tools/init_report_scaffold.py` + `templates/report_templates_v1.md` | Complete, 5+ templates |
| Expert rules (evidence tiers) | `contracts/expert_rules_v1.md` | Complete (4 tiers) |
| SEO expert playbook | `contracts/seo_expert_playbook_nl_v1.md` | Complete |
| PPC expert playbook | `contracts/ppc_expert_playbook_v1.md` | Complete |
| Measurement interpretation | `contracts/measurement_interpretation_rules_v1.md` | Complete |
| Page SEO diagnosis rules | `contracts/page_seo_diagnosis_rules_v1.md` | Complete |

### Partially exists

| Capability | What exists | What is missing |
|-----------|------------|----------------|
| URL inspection / indexation diagnostics | `run_legacy_indexation_review_v1.py` — finds legacy URLs | No HTTP status check, no robots.txt/sitemap/canonical, no URL Inspection API |
| Query clustering / search term insights | keyword_master_v3 has theme classification, keyword_intelligence_review_v2 has priority buckets | No intent classifier, no semantic clustering, no SERP intent analysis |
| Measurement integrity audit | `analysis/rules.py` catches (not set) pages and missing events | No full measurement audit (tag coverage, event completeness, attribution chain) |

### Does not exist yet

| Capability | Notes |
|-----------|-------|
| Local SEO / GBP audit | No GBP integration, no NAP consistency check, no local pack analysis |
| Full competitor intelligence | DataForSEO enrichment is ranked_keywords_gap only (100 kw/domain cap). No SERP feature analysis, no backlink data |
| Content quality audit | No word count analysis, no readability scoring, no thin content detection |
| Technical SEO audit | No Core Web Vitals, no crawl analysis, no structured data validation |
| Automated scheduling | No cron, no batch runner |

---

## F. SAFE INSERTION POINTS

### Where new files logically connect

| Extension point | File to update | What to add |
|----------------|----------------|-------------|
| New workflow | `workflows/workflow_registry_v1.json` | New entry in `workflows[]` array |
| New command | `workflows/command_catalog_v1.md` | New section under appropriate heading |
| New intent | `workflows/operator_playbook_v1.md` | New row in intent routing table (#16+) |
| New preflight | `config/preflight_rules_v1.yaml` | New entry in `workflow_preflight:` |
| New contract | `contracts/` | New `*_v1.md` file + reference in operator_playbook |
| New report template | `templates/report_templates_v1.md` | New Template 6+ section |
| New analyzer | `analyzers/{domain}/` | New Python script, following existing patterns |
| New integration | `integrations/{source}/` | New Python module |
| New config | `config/` | New YAML file |
| New prompt | `prompts/` | New `.md` file |
| New data source | `ASSET_REGISTRY.md` | New section |

### Workflow registration checklist (for each new workflow)

1. `workflows/workflow_registry_v1.json` — add entry
2. `workflows/command_catalog_v1.md` — add command section
3. `workflows/operator_playbook_v1.md` — add row in intent routing table
4. `config/preflight_rules_v1.yaml` — add preflight section
5. `ASSET_REGISTRY.md` — update if new integration

### FILES TO EXTEND

- `workflows/workflow_registry_v1.json` — add new workflows
- `workflows/command_catalog_v1.md` — add new commands
- `workflows/operator_playbook_v1.md` — add routing rows + step references
- `config/preflight_rules_v1.yaml` — add preflight for new workflows
- `templates/report_templates_v1.md` — add new templates
- `ASSET_REGISTRY.md` — if new integrations
- `ROADMAP_V1.md` — mark progress

### FILES NOT TO TOUCH YET

| File | Reason |
|------|--------|
| `analysis/*` (legacy engine) | Working, used by `run_analysis_report.py`. Coexists with `analyzers/` — do not touch until decision to merge |
| `integrations/google_clients/*` | Working API clients — wrap, don't rewrite |
| `integrations/.env.local` | Credentials — do not touch |
| `data/processed/latest_combined_snapshot.json` | Used by CLAUDE.md operator role — do not break format |
| `_archive/*` | Archive — read only |
| Anything in `D:/projects/bmklus/google/` | External asset — registered only, DO NOT modify |

---

## G. RISKS / CONFLICTS

### 1. Duplicate concepts

| Risk | Details |
|------|---------|
| `analysis/` vs `analyzers/` | Two analysis layers coexist. `analysis/` = legacy rule-based engine, `analyzers/` = V1 workflow modules. Different import paths, different patterns. New modules should go in `analyzers/`, not `analysis/`. |
| `data/processed/` vs `outputs/` | Both contain JSON outputs. `data/processed/` is used by CLAUDE.md operator role. `outputs/` is used by workflow registry. Do not duplicate. |
| `integrations/google_clients/` vs `integrations/gsc/` + `integrations/ga4/` | Two levels of GSC/GA4 clients. `google_clients/` = combined snapshot pipeline. `gsc/` + `ga4/` = standalone loaders for analyzers. Do not merge. |

### 2. Stale references

| Reference | Location | Fix |
|-----------|----------|-----|
| `build_keyword_master_v1 → v2` pipeline | `orchestrator_v1.md:37,75-86` | Update to reference `build_keyword_master_v3` |
| "DataForSEO: Not connected" | `ARCHITECTURE_V1.md:53` | Update status to "Working" |
| "Phase 5: Not started" | `ROADMAP_V1.md` | Update to "Partially done" |

### 3. Naming collision risks for new files

| Potential collision | Existing file | Recommendation |
|--------------------|---------------|----------------|
| New `measurement_*` analyzer | `contracts/measurement_interpretation_rules_v1.md` | Name as `run_measurement_audit_v1.py` to avoid confusion with the contract |
| New `technical_*` config | `config/thresholds/` exists as placeholder | Use `config/thresholds/` for threshold YAML files as intended |

### 4. Other risks

| Risk | Details |
|------|---------|
| Duplicate report filenames | `reports/combined/buiten_stucwerk_seo_diagnosis_2026-04-08.md` vs `buiten-stucwerk_seo_diagnosis_2026-04-08.md` — one is likely redundant |
| 3 UNCLEAR modules | `query_snapshot_loader`, `keyword_source_loader`, `cost_tracker` — verify before building on them |
| Empty placeholder dirs | `schemas/`, `config/locales/`, `config/thresholds/`, `examples/` — safe to fill, do not break gitkeep structure |

---

## H. RECOMMENDED INTEGRATION ORDER

For new expert system layers:

### 1. CONTRACTS FIRST (low risk, no code changes)

Add new contracts in `contracts/` — purely documentary files, break nothing.

### 2. CONFIG SECOND (low risk)

Add new yaml configs in `config/` — reference data, nothing imports them.

### 3. TEMPLATES THIRD (low risk)

Extend `templates/report_templates_v1.md` with new Template N sections.

### 4. ANALYZERS (medium risk)

New scripts in `analyzers/{domain}/`. Each new script should:
- Read artifacts from `snapshots/normalized/`
- Write to `outputs/` and `reports/{domain}/`
- Not import from `analysis/` (legacy) — only from `integrations/`

### 5. REGISTRY UPDATE (low risk, but coordination needed)

Update simultaneously: workflow_registry → command_catalog → operator_playbook → preflight_rules.

### 6. FIX STALE REFERENCES (cleanup)

- `orchestrator_v1.md` — update dependency chain
- `ROADMAP_V1.md` — update Phase 5 status
- `ARCHITECTURE_V1.md` — update DataForSEO status
