# SEO Expert Playbook — NL Local Service SEO

Version 1.0 · 2026-04-08 · For operator-level SEO interpretation at bm-klus-bv.nl

---

## Purpose

Short, high-signal rules for interpreting GSC/organic data in the context of a Dutch local-service site that is 1 month post-migration. This is NOT an SEO textbook — it is a decision-support layer for the operator.

---

## 1. How to read GSC for local service pages

**Position + impressions matrix:**

| Scenario | What it means | Action direction |
|----------|---------------|-----------------|
| Low position (>20) + low impressions | Page not competitive yet | Check indexation first, then content gap |
| Low position (>20) + high impressions | Broad query, page is a long-shot match | Verify query-page relevance — may be noise |
| Decent position (5–15) + low CTR | Snippet problem (title/description mismatch) | Title/meta rewrite — this is where CTR optimization pays |
| Decent position (5–15) + decent CTR | Working — monitor for movement | No intervention needed |
| High position (1–4) + low CTR | SERP feature stealing clicks (maps, ads, PAA) | Investigate SERP layout; may be structural, not fixable via on-page |
| High position (1–4) + high CTR | Healthy — protect this page | Do not change title/content without strong reason |

**Key rule:** Low CTR at position 5–15 is the highest-ROI optimization target. Low CTR at position 1–3 is often structural (SERP features) — do not recommend title rewrites without checking SERP layout.

---

## 2. Meaningful cannibalization vs noise

**Real cannibalization exists when:**
- Two pages from the same domain appear for the same query cluster
- Both pages have >10 impressions for the overlapping query
- The pages serve different intent (e.g., service page vs project page for same term)
- Position for both is mediocre (neither dominates)

**Noise that looks like cannibalization:**
- Homepage appearing for branded + service terms — this is normal
- City page + main service page appearing for geo query — expected overlap, not harmful if city page ranks locally
- Two pages with <5 impressions each — sample too small to diagnose
- Legacy pages that are 301-redirected — will resolve after GSC re-crawl (2–4 weeks)

**Decision rule:** Only flag cannibalization if both pages have >10 impressions AND neither is clearly winning (position gap <5). Otherwise, monitor.

---

## 3. Page ownership model for this site

| Page type | Owns queries for | Should NOT compete for |
|-----------|-----------------|----------------------|
| `/gevelisolatie/` (service hub) | Head terms: "gevelisolatie", "buitengevelisolatie" | City-specific queries |
| `/gevelisolatie/kosten/` (cluster) | "gevelisolatie kosten", "prijs gevelisolatie" | Head terms without cost intent |
| `/gevelisolatie/[city]/` (geo) | "gevelisolatie [city]", "[city] gevelisolatie" | Non-geo head terms |
| `/muren-stucen/` (money page) | "muren stucen", "sausklaar", "behangklaar" | Exterior stucco terms |
| `/buiten-stucwerk/` (money page) | "buiten stucwerk", "gevel stucen" | Interior stucco terms |
| `/sierpleister/` (money page) | "sierpleister", "spachtelputz", "crepi" | Generic stucwerk terms |
| `/gevel-schilderen/` (money page) | "gevel schilderen", "buitenmuur verven" | Stucwerk or isolation terms |
| `/onze-werken/[project]` (portfolio) | Long-tail project-specific queries | Service head terms |
| `/` (homepage) | Brand queries, generic "aannemer rotterdam" | Should not dominate specific service queries |

**Rule:** If a service page and the homepage compete for the same service query, the service page should win. If it doesn't, strengthen the service page — do not weaken the homepage.

---

## 4. Post-cutover data interpretation

**Current state (as of 2026-04-08): 31 days post-cutover.**

**Hard rules:**
- GSC 90-day snapshots contain ~63 days of OLD WordPress data mixed with 27 days of new site data
- Never compare pre-cutover and post-cutover periods as like-for-like
- Position instability in first 60 days post-migration is normal — do not treat temporary drops as permanent losses
- "Declining page" signals in first 90 days are unreliable — old URLs may be inflating the baseline

**Safe interpretations post-cutover:**
- Indexation gaps (new pages not yet in index) — actionable
- Redirect chains or 404s from old URLs — actionable
- Title/meta problems visible in GSC — actionable (these don't depend on migration timing)
- Absolute impression counts per page — directional, not definitive

**Unsafe interpretations post-cutover:**
- "CTR dropped by X%" — baseline is contaminated
- "Page lost Y positions" — migration volatility
- "Traffic declined Z%" — window mixing

**When does post-cutover caution end?**
- 90 days post-cutover (≈2026-06-08): first clean 90-day window possible
- 180 days (≈2026-09-08): solid baseline available for comparison

---

## 5. Snippet problems vs ranking problems

| Signal | Diagnosis | Fix |
|--------|-----------|-----|
| Position 5–15, CTR <2% | Likely snippet problem | Rewrite title + meta description to match top queries |
| Position 20+, CTR <1% | Ranking problem — snippet is irrelevant at this position | Improve content/authority first, snippet later |
| Position 1–4, CTR <15% | SERP feature dominance or weak title | Check SERP features; if clean SERP, test title |
| Good CTR but wrong landing page in GSC | Internal linking / canonicalization problem | Strengthen target page signals |

**Title optimization for NL local service:**
- Include primary service term + geo if appropriate
- Include action/outcome terms Dutch users search: "kosten", "prijs per m²", "offerte"
- Keep under 60 characters (Google truncation)
- Do not keyword-stuff — Dutch users notice unnatural titles

---

## 6. When city page expansion is justified vs premature

**Justified when:**
- GSC shows >50 impressions/month for "[service] [city]" queries with no matching page
- The service is already established in that city (real jobs done there)
- Existing city pages are indexed and performing (prove the template works first)

**Premature when:**
- No search demand visible in GSC for that city + service combo
- The service area is aspirational, not actual
- Existing city pages haven't been indexed yet (fix indexation before expanding)
- The main service page hasn't stabilized post-cutover

**Current state for BM Klus:**
- Gevelisolatie: 21 city pages deployed, maintenance only — do not expand without strong data signal
- Other services: 0 city pages — expansion should wait until post-cutover baselines stabilize (after 2026-06-08)

---

## 7. Legacy URL tails

**What they are:** Old WordPress URLs still appearing in GSC impressions data because Google's index is slow to update.

**How to treat:**
- If redirected (301) → monitor for de-indexation, do not re-report as an issue
- If returning 404 → check if redirect is needed (was there traffic?)
- If returning 200 on new site → this is the new page, not legacy
- If returning 200 but wrong content (old page somehow alive) → investigate

**Timing:** Legacy URLs typically clear from GSC within 4–8 weeks after redirect deployment. Do not panic before that window.

---

## 8. What NOT to overclaim

**Forbidden claims without supporting data:**
- "This page is underperforming" — compared to what? State the benchmark
- "We're losing traffic to competitors" — requires competitor data (not available)
- "This keyword should rank #1" — requires SERP analysis and competitive assessment
- "City pages are not working" — 21 pages, 27 days of data, partial indexation — too early
- "The migration caused ranking losses" — cannot separate migration effect from normal volatility in current data window
- "Content needs to be rewritten" — specify which content signals are weak and how

**Safe claim patterns:**
- "Page X has Y impressions but Z% CTR — below expected for position N"
- "Query Q appears on pages A and B with similar impressions — potential ownership conflict"
- "Page X is not yet indexed (confirmed via GSC coverage)" — factual, actionable
- "Title does not include primary query terms visible in GSC data"

---

## Cross-references

- Evidence tiers and confidence: `contracts/expert_rules_v1.md`
- Report output format: `contracts/final_report_rules_v1.md`
- Numeric labeling: `contracts/numeric_provenance_v1.md`
- Measurement windows: `contracts/measurement_interpretation_rules_v1.md`
- Service taxonomy: `config/service_taxonomy_v1.yaml`
- Market terms: `config/market_terms_nl_v1.yaml`
