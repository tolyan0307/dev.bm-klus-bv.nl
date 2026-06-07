# Measurement Audit Report

**Generated:** 2026-04-08 10:43 UTC
**Report mode:** preliminary
**Workflow:** measurement_audit_v1
**Contract:** contracts/measurement_audit_rules_v1.md
**Scope:** site

---

## 1. Sources used

| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| ga4_landing_pages | snapshots/normalized/pages/ga4_landing_pages_last28d.csv | loaded, 43 pages | internal_artifact |
| ga4_channel_breakdown | snapshots/normalized/pages/ga4_landing_pages_by_channel_last28d.csv | loaded, 89 rows | internal_artifact |
| gsc_page_aggregates | snapshots/normalized/seo/gsc_query_page_aggregated_pages_last28d.csv | loaded, 32 pages | internal_artifact |
| conversions_config | config/conversions.yaml | loaded | internal_artifact |
| thresholds | config/thresholds/measurement_audit_v1.yaml | loaded | internal_artifact |

## 2. Site-wide measurement health

- Total GA4 sessions across all landing pages: 527
- Pages with GA4 data: 43
- (not set) sessions: 45
- (not set) proportion: 8.5%
- Pages with key events: 6
- Pages with sessions but zero key events: 36

**Interpretations:**
- (not set) proportion (8.5%) is slightly elevated but within acceptable range.

## 3. Measurement quality summary

**Pages audited:** 50

| Outcome | Count |
|---------|-------|
| `measurement_limited_low_volume` | 10 |
| `measurement_signal_mismatch` | 4 |
| `measurement_scope_mismatch` | 1 |
| `measurement_evidence_insufficient` | 35 |

---

## 4. Per-page measurement diagnosis

### //onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /buiten-stucwerk
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 12 sessions, 11 engaged, 0 key events
- GA4 channels: Organic Search=10, Direct=1, Paid Search=1
- GSC: 2 clicks, 1513 impressions, 134 queries

**Interpretation boundaries:**
- GA4 session volume (N=12) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (91.7%, N=12) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=2, sessions=12)

---

### /contact
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 6 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=5, Direct=1
- GSC: 1 clicks, 25 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=6) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (50.0%, N=6) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=1, sessions=6)

---

### /diensten
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 5 sessions, 5 engaged, 1 key events
- GA4 channels: Organic Search=4, Paid Search=1
- GSC: 0 clicks, 28 impressions, 2 queries

**Interpretation boundaries:**
- GA4 session volume (N=5) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=1) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=5) should not be cited — sample size is below minimum (20).

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=5)

**Caveats:**
- Low-volume caveat: N=5 sessions, below noise floor

---

### /gevel-schilderen
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 7 sessions, 5 engaged, 0 key events
- GA4 channels: Organic Search=6, Direct=1
- GSC: 0 clicks, 182 impressions, 28 queries

**Interpretation boundaries:**
- GA4 session volume (N=7) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (71.4%, N=7) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=7)

---

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

### /gevelisolatie-woning-almere-35m2-sierpleister
**Outcome:** `measurement_signal_mismatch`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 90 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Page has GSC visibility (90 impressions, 0 clicks) but no GA4 landing page data. This may indicate a measurement gap.

**Hypotheses (require verification):**
- Possible causes: GA4 tracking not firing on this page, sessions attributed to (not set), or page path mismatch in GA4 data.

**Recommended next checks:**
- Verify GA4 tracking code is present on the page
- Check if page appears under (not set) in GA4

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /gevelisolatie/afwerkingen
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 61 sessions, 36 engaged, 0 key events
- GA4 channels: Paid Search=53, Cross-network=3, Organic Search=3, Direct=2
- GSC: 0 clicks, 23 impressions, 8 queries

**Interpretation boundaries:**
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=61)

---

### /gevelisolatie/alphen-aan-den-rijn
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 2 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /gevelisolatie/breda
**Outcome:** `measurement_signal_mismatch`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 18 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Page has GSC visibility (18 impressions, 0 clicks) but no GA4 landing page data. This may indicate a measurement gap.

**Hypotheses (require verification):**
- Possible causes: GA4 tracking not firing on this page, sessions attributed to (not set), or page path mismatch in GA4 data.

**Recommended next checks:**
- Verify GA4 tracking code is present on the page
- Check if page appears under (not set) in GA4

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /gevelisolatie/capelle-aan-den-ijssel
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /gevelisolatie/delft
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 3 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=3
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=3) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=3) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=3)

**Caveats:**
- Low-volume caveat: N=3 sessions, below noise floor

---

### /gevelisolatie/den-haag
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 3 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=3
- GSC: 0 clicks, 179 impressions, 6 queries

**Interpretation boundaries:**
- GA4 session volume (N=3) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=3) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=3)

**Caveats:**
- Low-volume caveat: N=3 sessions, below noise floor

---

### /gevelisolatie/dordrecht
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 5 sessions, 4 engaged, 0 key events
- GA4 channels: Organic Search=3, Direct=1, Paid Search=1
- GSC: 0 clicks, 4 impressions, 2 queries

**Interpretation boundaries:**
- GA4 session volume (N=5) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (80.0%, N=5) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=5)

**Caveats:**
- Low-volume caveat: N=5 sessions, below noise floor

---

### /gevelisolatie/gouda
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- GSC: 0 clicks, 2 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /gevelisolatie/hellevoetsluis
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 2 sessions, 2 engaged, 0 key events
- GA4 channels: Organic Search=2
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=2) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=2) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=2 sessions, below noise floor

---

### /gevelisolatie/hendrik-ido-ambacht
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 0 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (0.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /gevelisolatie/kosten
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 25 sessions, 16 engaged, 1 key events
- GA4 channels: Paid Search=17, Organic Search=8
- GSC: 1 clicks, 111 impressions, 14 queries

**Interpretation boundaries:**
- GA4 session volume (N=25) is directional. Engagement signals can be cited with caveats.
- Key events (N=1) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=1, sessions=25)

---

### /gevelisolatie/leiden
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- GSC: 1 clicks, 203 impressions, 3 queries

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=1, sessions=1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /gevelisolatie/materialen
**Outcome:** `measurement_scope_mismatch`

**Observations:**
- GA4: 7 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=4, Paid Search=2, Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=7) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (42.9%, N=7) should not be cited — sample size is below minimum (20).
- Page has GA4 sessions (N=7) but no GSC data. Traffic may be non-organic or page may not be indexed.

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.
- GA4 shows 4 organic sessions but GSC shows no data. May indicate: GSC data gap, URL mismatch, or recent indexation.

---

### /gevelisolatie/rc-waarde-dikte
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 7 sessions, 4 engaged, 0 key events
- GA4 channels: Organic Search=6, Direct=1
- GSC: 0 clicks, 120 impressions, 18 queries

**Interpretation boundaries:**
- GA4 session volume (N=7) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (57.1%, N=7) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=7)

---

### /gevelisolatie/roosendaal
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /gevelisolatie/rotterdam
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 4 sessions, 3 engaged, 0 key events
- GA4 channels: Direct=2, Organic Search=2
- GSC: 0 clicks, 51 impressions, 4 queries

**Interpretation boundaries:**
- GA4 session volume (N=4) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (75.0%, N=4) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=4)

**Caveats:**
- Low-volume caveat: N=4 sessions, below noise floor

---

### /gevelisolatie/schiedam
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /gevelisolatie/subsidie-vergunning
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 4 sessions, 2 engaged, 0 key events
- GA4 channels: Organic Search=2, Direct=1, Paid Search=1
- GSC: 0 clicks, 3 impressions, 2 queries

**Interpretation boundaries:**
- GA4 session volume (N=4) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (50.0%, N=4) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=4)

**Caveats:**
- Low-volume caveat: N=4 sessions, below noise floor

---

### /gevelisolatie/vlaardingen
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- GSC: 0 clicks, 7 impressions, 3 queries

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /images/muren-stucen-voordelen.webp
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /images/projects/halsteren-buitenstucwerk-na-01.webp
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /muren-stucen
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 5 sessions, 2 engaged, 0 key events
- GA4 channels: Organic Search=4, Direct=1
- GSC: 0 clicks, 837 impressions, 50 queries

**Interpretation boundaries:**
- GA4 session volume (N=5) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (40.0%, N=5) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=5)

**Caveats:**
- Low-volume caveat: N=5 sessions, below noise floor

---

### /object7
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /onze-werken
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 20 sessions, 14 engaged, 1 key events
- GA4 channels: Organic Search=19, Paid Search=1
- GSC: 0 clicks, 33 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=20) is directional. Engagement signals can be cited with caveats.
- Key events (N=1) are below the low-volume floor. Conversion conclusions are not supported.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=20)

---

### /onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 0 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (0.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 2 sessions, 2 engaged, 0 key events
- GA4 channels: Direct=1, Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=2) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=2) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=2 sessions, below noise floor

---

### /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 2 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=2
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=2) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (50.0%, N=2) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=2 sessions, below noise floor

---

### /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 5 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=4, Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=5) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (60.0%, N=5) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=5 sessions, below noise floor

---

### /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 3 sessions, 0 engaged, 0 key events
- GA4 channels: Organic Search=2, Unassigned=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=3) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (0.0%, N=3) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=3 sessions, below noise floor

---

### /onze-werken/nieuw-
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 1 key events
- GA4 channels: Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=1) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2024
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 0 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (0.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/rottekade-gevelisolatie-schilderwerk-2024
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 4 sessions, 4 engaged, 0 key events
- GA4 channels: Organic Search=3, Direct=1
- GSC: 0 clicks, 1 impressions, 1 queries

**Interpretation boundaries:**
- GA4 session volume (N=4) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=4) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=4)

**Caveats:**
- Low-volume caveat: N=4 sessions, below noise floor

---

### /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 2 sessions, 2 engaged, 0 key events
- GA4 channels: Direct=1, Organic Search=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=2) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=2) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=2 sessions, below noise floor

---

### /onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 2 sessions, 1 engaged, 0 key events
- GA4 channels: Paid Search=1, Referral=1
- GSC: 0 clicks, 3 impressions, 2 queries

**Interpretation boundaries:**
- GA4 session volume (N=2) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (50.0%, N=2) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=2)

**Caveats:**
- Low-volume caveat: N=2 sessions, below noise floor

---

### /onze-werken/vught-gevelisolatie-10cm-sierpleister-2024
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /over-ons
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 6 sessions, 3 engaged, 0 key events
- GA4 channels: Organic Search=5, Paid Search=1
- GSC: 0 clicks, 10 impressions, 3 queries

**Interpretation boundaries:**
- GA4 session volume (N=6) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (50.0%, N=6) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=6)

---

### /over_ons
**Outcome:** `measurement_signal_mismatch`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 1 clicks, 39 impressions, 3 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Page has GSC visibility (39 impressions, 1 clicks) but no GA4 landing page data. This may indicate a measurement gap.

**Hypotheses (require verification):**
- Possible causes: GA4 tracking not firing on this page, sessions attributed to (not set), or page path mismatch in GA4 data.

**Recommended next checks:**
- Verify GA4 tracking code is present on the page
- Check if page appears under (not set) in GA4

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /privacybeleid
**Outcome:** `measurement_evidence_insufficient`

**Observations:**
- GA4: 1 sessions, 1 engaged, 0 key events
- GA4 channels: Direct=1
- No GSC page-level data found for this page

**Interpretation boundaries:**
- GA4 session volume (N=1) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (100.0%, N=1) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Verify page is deployed and has GA4 tracking
- Check if page is indexed (run indexation_debug_v1)

**Caveats:**
- Low-volume caveat: N=1 sessions, below noise floor

---

### /schoonmaak-na-verbouwing
**Outcome:** `measurement_signal_mismatch`

**Observations:**
- No GA4 landing page data found for this page
- GSC: 0 clicks, 320 impressions, 10 queries

**Interpretation boundaries:**
- GA4 session volume (N=0) is at noise level. Engagement and conversion metrics from this volume are unreliable.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Page has GSC visibility (320 impressions, 0 clicks) but no GA4 landing page data. This may indicate a measurement gap.

**Hypotheses (require verification):**
- Possible causes: GA4 tracking not firing on this page, sessions attributed to (not set), or page path mismatch in GA4 data.

**Recommended next checks:**
- Verify GA4 tracking code is present on the page
- Check if page appears under (not set) in GA4

**Excluded context:**
- No channel-level GA4 breakdown available

**Caveats:**
- Low-volume caveat: N=0 sessions, below noise floor

---

### /sierpleister
**Outcome:** `measurement_limited_low_volume`

**Observations:**
- GA4: 19 sessions, 7 engaged, 0 key events
- GA4 channels: Organic Search=15, Organic Social=3, Direct=1
- GSC: 0 clicks, 256 impressions, 24 queries

**Interpretation boundaries:**
- GA4 session volume (N=19) is low. Engagement metrics are directional only.
- Key events (N=0) are below the low-volume floor. Conversion conclusions are not supported.
- Engagement rate (36.8%, N=19) should not be cited — sample size is below minimum (20).

**Hypotheses (require verification):**
- Zero key events with non-zero sessions could indicate: low conversion intent traffic, correct behavior for informational pages, or a measurement gap in event configuration. Cause is not determinable from artifacts alone.

**Recommended next checks:**
- Wait for more data accumulation before drawing performance conclusions
- Check measurement evidence again after 30-60 days

**Excluded context:**
- GSC/GA4 mismatch analysis skipped — volume too low (clicks=0, sessions=19)

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
