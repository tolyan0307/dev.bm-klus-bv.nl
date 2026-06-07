# Runbook v1

**Version:** 1.0
**Date:** 2026-04-07

Practical execution sequences for common scenarios.

---

## 1. Fresh environment setup (first time or full rebuild)

Run all source builds in dependency order, then analysis as needed.

```
Step 1 (parallel — no dependencies):
  python seo-ops/analyzers/pages/build_page_inventory.py
  python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py
  python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py

Step 2 (requires Step 1 GSC snapshot + Google Ads CSVs):
  python seo-ops/analyzers/keywords/build_keyword_master_v3.py

Step 3 (analysis — requires Steps 1-2 complete):
  python seo-ops/analyzers/ppc/run_ppc_review_v1.py
  python seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py
  MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py /gevelisolatie/
```

**Prerequisites:**
- Google Ads CSVs exported to `D:/projects/bmklus/google/outputs/`
- GSC and GA4 API credentials configured
- Python environment with required packages

**Estimated artifacts produced:** 10+ CSVs + 4 JSONs + 8+ markdown reports

---

## 2. Weekly routine refresh

Minimal refresh to keep analysis current.

```
Step 1 (parallel):
  python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py
  python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py

Step 2 (if keyword_master needs refresh):
  python seo-ops/analyzers/keywords/build_keyword_master_v3.py

Step 3 (choose one or more based on need):
  python seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py
  MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py /gevelisolatie/
```

**Skip if:** GSC/GA4 snapshots are less than 7 days old and no urgent analysis needed.

---

## 3. Scenario: "I want a PPC review"

```
1. Verify Google Ads CSVs are fresh:
   ls -la D:/projects/bmklus/google/outputs/campaign_23271040037_*.csv

2. If CSVs are stale → export new ones from Google Ads scripts first

3. Check keyword_master_v2 freshness:
   ls -la seo-ops/snapshots/normalized/keyword_master/keyword_master_v2.csv

4. If stale → rebuild:
   python seo-ops/analyzers/keywords/build_keyword_master_v3.py

5. Check GA4 snapshot freshness:
   ls -la seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv

6. If stale → rebuild:
   python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py

7. Run PPC review:
   python seo-ops/analyzers/ppc/run_ppc_review_v1.py

8. Read report:
   seo-ops/reports/ppc/ppc_review_campaign_23271040037_last30d.md
```

---

## 4. Scenario: "Audit page /gevelisolatie/"

```
1. Check all snapshots exist and are reasonably fresh:
   ls -la seo-ops/snapshots/normalized/pages/page_inventory_v1.csv
   ls -la seo-ops/snapshots/normalized/seo/gsc_query_page_last90d.csv
   ls -la seo-ops/snapshots/normalized/keyword_master/keyword_master_v2.csv
   ls -la seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv

2. If any are missing or stale → rebuild relevant source(s) per dependency chain

3. Run page audit:
   MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py /gevelisolatie/

4. Read report:
   seo-ops/reports/pages/page_audit_gevelisolatie_v1.md
```

**For other pages**, replace `/gevelisolatie/` with target route:
```
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py /sierpleister/
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py /gevelisolatie/kosten/
```

---

## 5. Scenario: "Find SEO gaps for current site"

```
1. Refresh GSC + GA4 snapshots (if >7 days old):
   python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py
   python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py

2. Rebuild keyword_master (if GSC was refreshed):
   python seo-ops/analyzers/keywords/build_keyword_master_v3.py

3. Run SEO gap review:
   python seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py

4. Read report:
   seo-ops/reports/seo/page_vs_query_gap_v1.md
```

---

## 6. Scenario: "Rebuild keyword core"

```
1. Ensure fresh Google Ads CSVs at D:/projects/bmklus/google/outputs/

2. Ensure fresh GSC snapshot:
   python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py

3. Build keyword_master v3 (replaces old v1+v2 pipeline):
   python seo-ops/analyzers/keywords/build_keyword_master_v3.py

4. Verify:
   head -5 seo-ops/snapshots/normalized/keyword_master/keyword_master_v3.csv
```

> **Note:** The old two-step pipeline (build_keyword_master.py → build_keyword_master_v2.py) has been archived. Use build_keyword_master_v3.py which handles the full pipeline in one step.

---

## 7. Scenario: "Find legacy/cleanup URLs"

```
1. Check snapshots are fresh:
   ls -la seo-ops/snapshots/normalized/pages/page_inventory_v1.csv
   ls -la seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv
   ls -la seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv

2. If stale, rebuild relevant snapshots

3. Run legacy indexation review:
   python seo-ops/analyzers/seo/run_legacy_indexation_review_v1.py

4. Read report:
   seo-ops/reports/seo/legacy_indexation_review_v1.md

5. Review CSV for actionable candidates:
   seo-ops/outputs/legacy_indexation_candidates_v1.csv
```

---

## 8. Scenario: "DataForSEO enrichment run"

All three DataForSEO enrichment workflows are standalone. Run from `seo-ops/` directory.

```
Step 1 — always dry-run first:
  integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --dry-run
  integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --dry-run
  integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --dry-run

Step 2 — run one at a time, check cost estimate before proceeding:
  integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py
  # ~$0.01 for 5 keywords

  integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py
  # ~$0.225 for 3 domains

  integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py
  # ~$0.225 for 3 seeds

Step 3 — review reports:
  seo-ops/reports/dataforseo/serp_snapshot_v1.md
  seo-ops/reports/dataforseo/ranked_keywords_gap_v1.md
  seo-ops/reports/dataforseo/question_suggestions_v1.md
```

**Total estimated cost (all 3):** ~$0.46
**Prerequisites:** DataForSEO API credentials in `seo-ops/integrations/.env.local`
**Important:** These are enrichment-only; they do NOT modify keyword_master or any internal artifacts.

---

## 9. Scenario: "Can we trust the measurement on this page?"

```
1. Check GA4 snapshot exists:
   ls -la seo-ops/snapshots/normalized/pages/ga4_landing_pages_last28d.csv

2. If missing or stale → rebuild:
   python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py --days 28

3. Run measurement audit (single page):
   MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope page --page /gevelisolatie/

4. Or site-wide:
   python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site

5. Read report:
   seo-ops/reports/audits/measurement_audit_*.md
```

**Key:** This audit answers "is the data reliable?" — NOT "is the page performing well?".

---

---

## 10. Dependency chain reference

```
page_inventory ──────────────────────────────────┐
keyword_master_v1 ──┐                            │
                    ├──> keyword_master_v2 ──┐   │
gsc_snapshot ───────┘                        │   │
                                             ├──> analysis workflows
ga4_snapshot ────────────────────────────────┘   │
                                                 │
google_ads_csvs (manual export) ─────────────────┘
```

**Key rule:** Never run an analysis workflow without checking that its upstream artifacts exist and are reasonably fresh.

---

## 11. Post-draft report validation

After writing any report, run validators to catch quality issues before delivery.

### Recommended order

```
Step 1 — Provenance (always run):
  python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/{report}.md

Step 2 — Source hierarchy (run for report-style tasks):
  python seo-ops/tools/validate_source_hierarchy.py seo-ops/reports/combined/{report}.md

Step 3 — Official evidence (run when report references Google/platform behavior):
  python seo-ops/tools/validate_official_evidence.py seo-ops/reports/combined/{report}.md
```

**Shortcut — all three at once:**
```
python seo-ops/tools/validate_report_provenance.py --with-all seo-ops/reports/combined/{report}.md
```

### When to run which validator

| Validator | Always | page_seo_diagnosis | indexation_diagnosis | decision_pack | enrichment_note |
|-----------|--------|-------------------|---------------------|---------------|-----------------|
| provenance | ✓ | ✓ | ✓ | ✓ | ✓ |
| source hierarchy | — | ✓ | ✓ | ✓ | optional |
| official evidence | — | ✓ | ✓ (mandatory) | if platform claims | — |

### Interpreting results

- **FAIL** → fix before delivery
- **WARN** → review; fix if substantive, ignore if false positive
- **SKIP** → file is an example/anti-pattern, not a production report
- Exit code 0 = no FAILs, exit code 1 = at least one FAIL

### Optional flags

- `--strict` — upgrades WARNs to FAILs where applicable (use for high-stakes reports)
- `--report-type <type>` — override auto-detection if validator misidentifies the report type

---

## 12. Troubleshooting

| Issue | Solution |
|-------|----------|
| `FileNotFoundError` on CSV | Missing upstream artifact — rebuild it |
| `UnicodeEncodeError` on console output | Pipe to file or set `PYTHONIOENCODING=utf-8` |
| MSYS path expansion (`/gevelisolatie/` becomes `C:/Program Files/...`) | Prefix command with `MSYS_NO_PATHCONV=1` |
| GSC API auth failure | Check credentials at `seo-ops/integrations/google_clients/` |
| Stale data warning | Rebuild the flagged snapshot before proceeding |
| Empty report sections | Usually means no data matched thresholds — check raw snapshot sizes |
