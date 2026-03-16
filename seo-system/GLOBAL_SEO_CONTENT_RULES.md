# GLOBAL SEO & CONTENT RULES — BM klus BV

> Source of truth for all SEO content work in Cursor.
> Use together with a page-specific brief (`seo-system/briefs/*.yaml`).
> Priority when rules conflict: **verified business facts → page brief → this file**.

---

## 1. Project facts (do not change without owner confirmation)

| Field | Value |
|-------|-------|
| Domain | **bm-klus-bv.nl** |
| Market | Netherlands |
| Content language | Dutch (NL) only |
| Region phrasing | "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's" |
| Phone | +31 6 12 07 98 08 |
| Email | info@bm-klus-bv.nl |
| Address | Bonaventurastraat 58B, 3081 HE Rotterdam |
| KVK | 77356039 |
| Certifications | VCA* gecertificeerd |
| Tech stack | Next.js 16, static export (`output: 'export'`), Tailwind v4, React 19 |
| CMS | None — content lives in `lib/content/*.ts` files and inline JSX |

---

## 2. Existing architecture (what NOT to rebuild)

The project already has working infrastructure. Never recreate these without explicit request:

| What | Where | Status |
|------|-------|--------|
| Metadata builder | `lib/seo/meta.ts` → `buildPageMetadata()` | Working — enforces 60/160 limits, canonical, OG, Twitter |
| JSON-LD schemas | `lib/seo/schema.ts` → localBusiness, service, breadcrumb, website, jsonLdScript | Working |
| Sitemap | `app/sitemap.ts` → from `data/sitemap-plan.ts` + locations + projects | Working |
| Robots | `app/robots.ts` → blocks dev, allows prod | Working |
| Route config | `data/sitemap-plan.ts` → title, description, priority per route | Working |
| Internal linking | Navbar, footer, cross-page links, TOC, `internalLinks` in content files | Working |
| Structured content | `lib/content/*.ts` → sections, FAQ, prices, hero, internal links | Working for 5 money pages |
| Reviews | `components/reviews-section.tsx` → 4 Google reviews, 4.8/5 rating | Working |
| Sticky CTA | `components/sections/gevelisolatie/sticky-cta-bar.tsx` → WhatsApp, tel, #offerte | Working |

**Rule: when editing content, preserve existing links, schemas, and component structure. Only suggest content-level changes.**

---

## 3. Content principles (aligned with Google Helpful Content 2026 + E-E-A-T)

### 3a. People-first, conversion-aware
- Write for real homeowners and property decision-makers.
- Make the service and next step (offerte/contact) clear.
- Commercial intent must be visible on money pages — but not aggressive.

### 3b. E-E-A-T signals (Experience, Expertise, Authority, Trust)
- **Experience**: reference real projects (`/onze-werken/`), before/after results, local knowledge.
- **Expertise**: explain technical concepts (ETICS, Rc-waarde, dampopen) simply but correctly.
- **Authority**: mention KVK, VCA*, Google reviews (4.8/5, 23+) — only where natural.
- **Trust**: never fabricate claims. Use uncertainty flags when unsure (see §7).

### 3c. No fabricated claims (critical)
Do **not** invent:
- guarantees, certifications, awards
- prices, discounts, subsidies amounts
- lead times, project counts
- materials, brand names
- legal or regulatory claims

If information is uncertain, flag it — never guess.

### 3d. No thin content / no filler
- Every section must answer a concrete user question or support conversion.
- No generic AI filler, no repetition between sections.
- No paragraphs that say nothing ("wij staan klaar", "neem gerust contact op" as standalone content).

### 3e. One page = one intent
- Money page ≠ cluster page ≠ project page.
- Do not expand a page into a different search intent without instruction.

---

## 4. Anti-cannibalization map

These pages have overlapping topics. When editing one, check the listed siblings:

| Page | Primary focus | Watch for overlap with |
|------|--------------|----------------------|
| `/gevelisolatie/` | ETICS pillar (overview) | All cluster pages, `/buiten-stucwerk/` |
| `/buiten-stucwerk/` | Exterior stucco (without insulation) | `/gevelisolatie/afwerkingen/`, `/sierpleister/` |
| `/sierpleister/` | Decorative facade plaster (spachtelputz/crepi) | `/buiten-stucwerk/`, `/gevelisolatie/afwerkingen/` |
| `/gevel-schilderen/` | Facade painting | `/buiten-stucwerk/` (voorbereiding overlap) |
| `/muren-stucen/` | Interior plastering | `/buiten-stucwerk/` (term confusion binnenmuur vs buitenmuur) |
| `/gevelisolatie/kosten/` | ETICS pricing deep-dive | `/gevelisolatie/` kosten section |
| `/gevelisolatie/afwerkingen/` | Finish options after ETICS | `/buiten-stucwerk/`, `/sierpleister/` |
| `/gevelisolatie/materialen/` | Insulation materials (EPS/PIR/wol) | `/gevelisolatie/rc-waarde-dikte/` |
| `/gevelisolatie/subsidie-vergunning/` | ISDE subsidy + permits | — |
| `/gevelisolatie/rc-waarde-dikte/` | R-value + thickness | `/gevelisolatie/materialen/` |
| `/gevelisolatie/[location]/` | Local ETICS landing pages | Each other (avoid identical blocks across cities) |

**Rule: do not duplicate large content blocks between siblings. Cross-reference with links instead.**

---

## 5. Language and style (Dutch)

### Requirements
- Natural, professional Dutch. Tone: **duidelijk, betrouwbaar, praktisch, lokaal**.
- Plain readable language for non-expert homeowners.
- No translated-sounding phrasing ("het is belangrijk om te vermelden dat...").
- Short/medium paragraphs, meaningful subheadings.

### Terminology consistency

| Concept | Preferred terms | Notes |
|---------|----------------|-------|
| Exterior stucco | gevel stucen, buitenmuur stucen | "buitenstucwerk" is OK as supporting term |
| Interior plastering | muren stucen (binnen), binnenmuren stucen, stucwerk binnen | Clarify interior context |
| Decorative plaster | gevel sierpleister, spachtelputz, crepi | Exterior only unless specified |
| Insulation system | buitengevelisolatie, ETICS | Not "gevelisolatie binnenkant" |
| Region | Regio Rotterdam en omgeving (±80–100 km) | Standard phrasing |

### Forbidden patterns
- Keyword stuffing / unnatural repetition
- Vague superlatives without proof ("de beste", "nummer 1")
- Overpromising (guaranteed outcomes without confirmation)
- Boilerplate text copied across pages
- Any language other than Dutch in public content

---

## 6. On-page constraints (strict)

| Element | Limit |
|---------|-------|
| Meta title | ≤ 60 characters |
| Meta description | ≤ 160 characters |
| Slug | ≤ 75 characters |
| URL format | trailing slash (`/gevelisolatie/`, not `/gevelisolatie`) |
| Heading hierarchy | exactly 1 H1 per page, H2/H3 nested properly |

`buildPageMetadata()` in `lib/seo/meta.ts` auto-truncates title/description. If drafting meta, stay within limits.

---

## 7. Uncertainty flags (mandatory)

When any information is not confirmed, mark it in draft/QA notes:

- `[UNCERTAIN_TERM]` — unsure if Dutch phrasing is natural
- `[CLAIM_NEEDS_CONFIRMATION]` — price, timeline, or factual claim needs owner verification
- `[CHECK_LOCAL_WORDING]` — regional Dutch variation may apply
- `[MISSING_BUSINESS_INPUT]` — needs info from the business owner

**Flag uncertainty instead of inventing facts. This is non-negotiable.**

---

## 8. Content structure by page type

### Money pages (service pages)
Files: `app/gevelisolatie/page.tsx`, `app/buiten-stucwerk/page.tsx`, etc.
Content: `lib/content/*.ts`

Required sections (adapt per brief):
1. Hero + H1 + trust bullets + CTA
2. What is the service / for whom
3. Benefits / when needed
4. Werkwijze (process steps)
5. Options / materials / finishes (if relevant)
6. Pricing factors (no fabricated pricing — use ranges with context)
7. Why BM klus BV (proof-oriented, no fake claims)
8. FAQ (relevant, not generic)
9. CTA (offerte / contact / WhatsApp)
10. Related pages links

### Cluster pages (gevelisolatie subtopics)
Files: `app/gevelisolatie/kosten/page.tsx`, etc.

Must:
- Stay focused on subtopic (not replicate pillar page)
- Link back to pillar (`/gevelisolatie/`) and to conversion path (`/contact/`)
- Provide genuine depth that the pillar page doesn't cover

### Location pages
File: `app/gevelisolatie/[location]/page.tsx`
Content: `lib/content/gevelisolatie-locations.ts`

Must:
- Include genuine local context (bouwperiode, woningTypes, gemeente info)
- Not be thin copies of each other — differentiate by local facts
- Link to pillar, cluster pages, and /contact/

### Project pages (Onze werken)
Must:
- Describe real completed work (scope, city, approach)
- Use real photos (before/after when available)
- Link to relevant services
- Never invent project facts

---

## 9. Internal linking rules

**Architecture is already implemented.** Do not redesign.

When editing content:
- Preserve existing links
- Suggest small anchor text improvements if needed
- Flag broken/missing links if found
- When brief specifies required links, treat as content-level placement, not architecture change

---

## 10. Hardcoded prices in content files (reference)

These prices appear in `lib/content/*.ts` and page files. Flag any change requests with `[CLAIM_NEEDS_CONFIRMATION]`:

| Service | Range | Source file |
|---------|-------|-------------|
| ETICS + pleister | €110–€200/m² | gevelisolatie.ts |
| ETICS + steenstrips | €200–€280/m² | gevelisolatie.ts |
| Gevel schilderen basis | €25–€40/m² | gevel-schilderen.ts |
| Gevel schilderen standaard | €30–€50/m² | gevel-schilderen.ts |
| Cementpleister | €50–€80/m² | buiten-stucwerk.ts |
| Spachtelputz | €35–€80/m² | buiten-stucwerk.ts, sierpleister.ts (€50–€95) |
| Crepi | €60–€95/m² | buiten-stucwerk.ts, sierpleister.ts (€55–€105) |
| Betonstuc | €80–€110/m² | buiten-stucwerk.ts |
| Spackspuitwerk | €8–€15/m² | muren-stucen.ts |
| Behangklaar | €10–€22/m² | muren-stucen.ts |
| Sausklaar | €15–€30/m² | muren-stucen.ts |

---

## 11. QA requirements (every content task)

For every content generation or edit, report scores (0–100) and issues:

1. **SEO alignment** — intent match + keyword coverage + heading structure
2. **Dutch naturalness** — professional tone, no AI-sounding phrases
3. **Factual safety** — no fabricated claims, flagged uncertainties
4. **Conversion clarity** — CTA present, next step obvious
5. **Cannibalization risk** — checked against sibling pages (see §4)
6. **On-page constraints** — title/meta/slug within limits

Also return:
- Exact weak/risky sentences (quoted)
- Corrected versions
- Final risk summary

**Never skip QA. The project owner cannot manually validate Dutch quality.**

---

## 12. What Cursor must NOT do

- Create new pages without a brief
- Produce duplicate blocks across service pages
- Overwrite page intent based on keyword similarity alone
- Add long city lists to every page (location pages handle this)
- Add legal/guarantee claims without owner verification
- Output content in any language other than Dutch (unless explicitly requested for internal use)
- Redesign internal linking architecture
- Change technical SEO infrastructure (meta.ts, schema.ts, sitemap.ts) without explicit request
