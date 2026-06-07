# Measurement Audit Report

**Generated:** 2026-04-08 10:43 UTC
**Report mode:** preliminary
**Workflow:** measurement_audit_v1
**Contract:** contracts/measurement_audit_rules_v1.md
**Scope:** page

---

## 1. Sources used

| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| ga4_landing_pages | snapshots/normalized/pages/ga4_landing_pages_last28d.csv | loaded, 43 pages | internal_artifact |
| ga4_channel_breakdown | snapshots/normalized/pages/ga4_landing_pages_by_channel_last28d.csv | loaded, 89 rows | internal_artifact |
| gsc_page_aggregates | snapshots/normalized/seo/gsc_query_page_aggregated_pages_last28d.csv | loaded, 32 pages | internal_artifact |
| conversions_config | config/conversions.yaml | loaded | internal_artifact |
| thresholds | config/thresholds/measurement_audit_v1.yaml | loaded | internal_artifact |

## 3. Measurement quality summary

**Pages audited:** 1

| Outcome | Count |
|---------|-------|
| `measurement_limited_low_volume` | 1 |

---

## 4. Per-page measurement diagnosis

### /gevelisolatie
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 102 sessions, 69 engaged, 2 key events
- GA4 channels: Paid Search=59, Organic Search=37, Direct=3, Cross-network=1, Referral=1, Unassigned=1
- GSC: 6 clicks, 774 impressions, 36 queries
- GA4 organic sessions / GSC clicks ratio = 6.2 (elevated)

**Interpretation boundaries:**
- Key events (N=2) are below the low-volume floor. Conversion conclusions are not supported.

**Hypotheses (require verification):**
- High GA4/GSC ratio may reflect: different counting windows, direct traffic misattributed as organic, or session counting differences. Not necessarily a tracking issue.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

---

## Provenance

- **Generated:** 2026-04-08 10:43 UTC
- **Report mode:** preliminary
- **Generator:** run_measurement_audit_v1.py
- **Contract:** contracts/measurement_audit_rules_v1.md
- **Thresholds:** config/thresholds/measurement_audit_v1.yaml
- **Primary truth:** GA4 landing page snapshots + conversions config
- **Supporting data:** GSC page snapshots (if available)
- **Known limitations:**
  - Artifact-based audit — does not check live tracking or GTM configuration
  - GA4 data subject to consent mode filtering
  - Post-cutover: measurement baselines not yet established
  - Low site volume limits confident interpretation across all pages
