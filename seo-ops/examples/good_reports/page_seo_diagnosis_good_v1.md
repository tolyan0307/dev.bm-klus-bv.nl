# Page SEO Diagnosis — Good Example v1

> **Status:** EXEMPLAR — illustrative only, not a production report.
> Synthetic data for BM Klus context. Do not cite as real findings.

---

## 1. Purpose / Request binding

**Request:** "Hoe presteert /gevelisolatie/ organisch de afgelopen 28 dagen?"

**Bound scope:**

| Field | Value |
|-------|-------|
| Page | `/gevelisolatie/` |
| Channel | Organic Search only |
| Requested window | last 28 days |
| Actual data window | 2026-03-01 – 2026-03-28 |
| Report mode | preliminary (site < 6 months post-cutover) |

---

## 2. Sources used

| Source | Class | Role |
|--------|-------|------|
| `snapshots/gsc_page_query_last28d_*.json` | Rank 1 — internal artifact | Primary: impressions, clicks, position, CTR |
| `snapshots/ga4_page_last28d_*.json` | Rank 1 — internal artifact | Supporting: sessions, engagement |
| `config/page_inventory_v1.yaml` | Rank 1 — internal artifact | Page ownership + target query mapping |
| Google Search Central — URL Inspection docs | Rank 2 — official documentation | Supporting: indexation behaviour reference |

---

## 3. Observations

> Raw facts only. No conclusions.

- `/gevelisolatie/` received **1 240 impressions** and **38 clicks** in the data window.
  `source: gsc_api | window: 28d | scope: page`
- Average position: **14.2** `source: gsc_api | window: 28d | scope: page`
- Page-level CTR: **3.1%** `source: gsc_api | window: 28d | scope: page`
- Top query by impressions: "gevelisolatie" — 620 impressions, position 12.8, CTR 2.4%.
  `source: gsc_api | window: 28d | scope: query`
- Second query: "gevel isoleren" — 180 impressions, position 18.4, CTR 1.1%.
  `source: gsc_api | window: 28d | scope: query`
- GA4 sessions for this page: **42** `source: ga4_api | window: 28d | scope: page`
- No key events (form submissions) attributed to this page in GA4.
  `source: ga4_api | window: 28d | scope: page`
- Title tag: "Gevelisolatie | BM Klus BV" (33 characters).
- Meta description: 142 characters, includes "gevelisolatie" once.

---

## 4. Interpretations

> Supported by Tier 1–2 evidence only.

- **Striking distance signal (medium confidence):** The main query "gevelisolatie" sits at position 12.8 — within the 8–20 range where small ranking improvements could meaningfully increase visibility. This is a data-supported observation, not a guarantee of movement.

- **CTR below position-expected range (medium confidence):** At position ~13, a 2.4% CTR for the primary query is within normal bounds for this position tier. No strong CTR gap identified — snippet may be adequate but not compelling.

- **Session–click discrepancy is minor (low confidence):** 38 GSC clicks vs 42 GA4 sessions is within normal measurement variance. No indication of tracking issues at this volume.

---

## 5. Hypotheses

> Tier 3 — require verification before action. Not presented as conclusions.

- **H1:** The title tag "Gevelisolatie | BM Klus BV" may underperform in CTR because it lacks a service qualifier (e.g., location, benefit). This is plausible but unverified — a title change would be needed to test, and baseline CTR is not clearly below expectations for position ~13.

- **H2:** The secondary query "gevel isoleren" at position 18.4 may indicate the page has weak topical coverage for insulation-as-action queries versus insulation-as-noun queries. This would require content analysis beyond the current scope to confirm.

---

## 6. Recommended actions

### Do now (Tier 1–2 evidence)
- **Monitor primary query trajectory:** Track "gevelisolatie" position and CTR weekly for the next 28 days to establish trend direction. No content changes needed yet.

### Monitor (awaiting data)
- **Key event attribution:** No form submissions attributed to this page. Before concluding "page doesn't convert," verify that event tracking fires correctly on this page (measurement check, not performance conclusion).

### Later (Tier 3 — needs verification first)
- **Title tag experiment:** If after 60+ days the CTR for "gevelisolatie" remains below 3% at positions < 10, consider testing a more descriptive title. Current data is insufficient to justify a change.

---

## 7. Excluded context / Caveats

- **Post-cutover instability:** Site is < 6 months post-migration. Rankings may still be settling. Period-over-period comparison is not meaningful at this stage.
- **No competitor data used:** No DataForSEO or SERP analysis was performed. Competitor positions are unknown.
- **GA4 "(not set)" pages:** Not checked in this analysis — if present, some sessions may be misattributed.
- **Backlink profile:** Not assessed. Domain authority / link-based hypotheses are excluded per source hierarchy rules.

---

## 8. Provenance footer

| Field | Value |
|-------|-------|
| Report mode | preliminary |
| Data sources | GSC API (28d), GA4 API (28d), page_inventory_v1 |
| Generated | 2026-03-29 (illustrative) |
| Contracts applied | page_seo_diagnosis_rules_v1, source_hierarchy_rules_v1, numeric_provenance_v1 |

---

## 9. Why this is a good example

1. **Scope is explicitly bound** — page, channel, window, and report mode are declared upfront.
2. **Observations are separated from interpretations** — the Observations section contains only labelled facts; no conclusions.
3. **Every number has a provenance label** — source, window, and scope are stated for each metric.
4. **Hypotheses are clearly Tier 3** — they are in a separate section, flagged as unverified, and not placed in "Do now" actions.
5. **Actions are bucketed by evidence tier** — Do now = Tier 1–2, Later = Tier 3.
6. **Excluded context is explicit** — the report states what it did NOT assess, preventing readers from assuming completeness.
7. **No overclaims** — no "Google doesn't understand this page," no "main cause of low traffic," no guaranteed outcomes.
8. **Source hierarchy is respected** — internal artifacts are primary; official docs are supporting only.
