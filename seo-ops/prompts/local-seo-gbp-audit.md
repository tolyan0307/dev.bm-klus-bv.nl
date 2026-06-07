# Local SEO / GBP Audit — Operator Prompt

**Purpose:** Check local SEO health and GBP evidence for BM Klus BV.

---

## When to use

- User asks about local SEO, local visibility, or Google Business Profile
- User asks about reviews, ratings, or local reputation signals
- User wants to understand if a problem is site-related or GBP/local-presence-related
- User wants to audit GBP signals vs site signals separately

## Required inputs

1. `config/locales/local_entities_v1.yaml` — business entity context
2. GBP API access (optional — runs in limited mode without it)

## Optional supporting inputs

- GSC query/page snapshots (for local query presence)
- GA4 landing page data (for local traffic context)
- Page inventory (for location page coverage)

## Method

1. **Load GBP data** — attempt performance + reviews loaders
2. **Assess GBP evidence** — if available: summarize visibility, actions, reviews
3. **Load supporting context** — GSC local queries, page inventory location coverage
4. **Classify signals** — assign outcome buckets per scope (profile/reviews/combined)
5. **Disclose limitations** — state clearly what is missing, what cannot be concluded

## Preferred output

Use Template 9 (Local SEO / GBP Audit) from `templates/report_templates_v1.md`.
Contract: `contracts/local_seo_gbp_rules_v1.md`.

## Scopes

- `profile` — GBP performance metrics only
- `reviews` — GBP review/rating signals only
- `combined` — both profile + reviews + supporting site context

## Do-nots

- Do not claim local pack rankings without evidence
- Do not equate reviews with lead quality
- Do not use anthropomorphic Google language
- Do not present site SEO signals as GBP evidence
- Do not invent GBP data when API access is unavailable
- Do not make competitor claims without competitor data
