# Indexation Debug — Good Example v1

> **Status:** EXEMPLAR — illustrative only, not a production report.
> Synthetic data for BM Klus context. This workflow is future-ready; the example
> establishes quality standards before the workflow is fully automated.

---

## 1. Purpose / Scope

**Request:** "De pagina /gevelisolatie/amsterdam/ wordt niet getoond in Google — kun je controleren?"

| Field | Value |
|-------|-------|
| Page | `/gevelisolatie/amsterdam/` |
| Concern | Page not appearing in Google search results |
| Data window | Spot check (not time-series) |
| Report mode | preliminary |

---

## 2. Sources used

| Source | Class | Role |
|--------|-------|------|
| URL Inspection API (or manual GSC check) | Rank 1 — internal artifact | Primary: indexation state |
| `config/page_inventory_v1.yaml` | Rank 1 — internal artifact | Page existence + intended status |
| `snapshots/gsc_page_query_last28d_*.json` | Rank 1 — internal artifact | Supporting: any impressions for this URL? |
| Google Search Central — Indexing docs | Rank 2 — official documentation | Reference: indexing process explanation |
| robots.txt / sitemap.xml (live) | Rank 1 — internal artifact | Technical: crawl/index directives |

---

## 3. Indexation status observations

> Raw facts only.

- URL Inspection result: **"URL is not on Google"** — status: "Crawled — currently not indexed."
  `source: gsc_url_inspection | scope: single URL`
- The page IS present in `sitemap.xml`.
- The page is NOT blocked by `robots.txt`.
- No `noindex` meta tag found in page source.
- GSC impressions for this URL in the last 28 days: **0**.
  `source: gsc_api | window: 28d | scope: page`
- The page was created on 2026-03-05 (33 days ago per page_inventory).
- Page content length: ~620 words. Contains unique city-specific paragraphs and shared service content.

---

## 4. Interpretation boundaries

- **Confirmed:** The page exists, is accessible, is in the sitemap, and is not blocked. Google has crawled it but has chosen not to index it at this time.

- **Not confirmed:** WHY Google has not indexed it. The "Crawled — currently not indexed" status tells us Google's decision, not Google's reasoning. We cannot read Google's internal quality or relevance signals.

- **Important distinction:** "Not indexed" ≠ "penalized." There is no evidence of a manual action or penalty. "Crawled — currently not indexed" is a common status for new pages, especially on young domains or recently migrated sites.

---

## 5. Plausible causes vs confirmed causes

### Confirmed factors (Tier 1)
- Page is 33 days old on a recently migrated site.
- Page has 0 impressions — Google has never shown it in search results.

### Plausible factors (Tier 3 — unverified)
- **P1: Page age + site age.** New pages on young/recently migrated domains commonly take 4–12 weeks to be indexed. This is a known pattern documented by Google, but the specific timeline for THIS page is unknown.
- **P2: Thin differentiation.** If the page shares substantial content with other `/gevelisolatie/[city]/` pages, Google may defer indexing of pages it considers lower-priority. This is plausible but unverified — we have not measured content overlap across city pages.
- **P3: Low external signals.** The page may have no inbound links. This could delay discovery/indexation but is speculative without link data.

### NOT claimed as causes
- "Google doesn't understand the page" — we have no evidence of comprehension issues.
- "The page is low quality" — we have no access to Google's quality assessment.
- "Duplicate content penalty" — "Crawled — currently not indexed" is not a duplicate content signal.

---

## 6. Recommended next checks

### Do now (verification steps)
1. **Check other city pages' indexation status.** If most `/gevelisolatie/[city]/` pages are also not indexed, this is a pattern (site-wide timing issue), not a page-specific problem. If most are indexed and only a few are not, investigate those specific pages.
2. **Verify canonical tags.** Confirm that `/gevelisolatie/amsterdam/` has a self-referencing canonical, not pointing to the parent `/gevelisolatie/` page.
3. **Request indexing via GSC.** Use the URL Inspection tool to request indexing. This does not guarantee indexing but signals priority to Google.

### Monitor (time-dependent)
4. **Re-check in 14 days.** If still not indexed after re-request + 14 days, escalate the investigation (content uniqueness audit, internal link analysis).

### Not recommended
5. **Do NOT rewrite page content** solely to "fix" indexation. There is no evidence that content quality is the cause.
6. **Do NOT create backlinks** as an indexation fix. Backlink building for indexation purposes is speculative at this stage.

---

## 7. Excluded context

- **Content uniqueness score:** Not calculated. Would require comparing this page's text against other city pages — this analysis was not in scope.
- **Internal link audit:** Not performed. The number of internal links pointing to this page is unknown.
- **Crawl budget analysis:** Not applicable at BM Klus site size (~50 pages). Crawl budget concerns apply to sites with thousands of pages.
- **Core Web Vitals:** Not assessed. CWV affect ranking, but their impact on initial indexation of a single page is not documented.

---

## 8. Provenance footer

| Field | Value |
|-------|-------|
| Report mode | preliminary |
| Data sources | GSC URL Inspection, GSC API (28d), page_inventory_v1, sitemap.xml, robots.txt |
| Generated | 2026-04-07 (illustrative) |
| Contracts applied | source_hierarchy_rules_v1, official_source_usage_rules_v1, expert_rules_v1 |

---

## 9. Why this is a good example

1. **Indexation state is sourced from URL Inspection** — the primary truth for indexation, not inferred from impressions alone.
2. **"Why" is explicitly separated from "what."** The report confirms the page is not indexed but does NOT claim to know why Google made that decision.
3. **Plausible causes are labelled Tier 3** — each is marked as unverified and kept separate from confirmed facts.
4. **No Google anthropomorphism** — the report does not say "Google thinks," "Google doesn't understand," or "Google penalizes."
5. **Actions are verification steps, not fixes** — the report recommends checking more data, not rewriting content based on speculation.
6. **"Not indexed" ≠ "penalty"** is explicitly stated, preventing a common overreaction.
7. **Excluded context is honest** — the report lists what it did not assess, so the reader knows the limits.
