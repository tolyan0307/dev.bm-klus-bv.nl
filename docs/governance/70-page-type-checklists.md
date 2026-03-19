# 70 — Page Type Checklists

> Use when creating or auditing pages.
> SEO scoring checklist → `seo-system/CURSOR_TASK_TEMPLATE.md Step 3`
> Adding project pages → `docs/ADD-PROJECT.md` (complete, authoritative)

---

## Service page (money page)

### Structure
- [ ] Server Component at page level — dynamic imports for interactive parts
- [ ] No duplicate `<main>` tag (use `<article>` inside `<main>` if needed)
- [ ] `export const metadata = buildPageMetadata("/[slug]/")`
- [ ] SEO brief exists: `seo-system/briefs/[slug].yaml`

### JSON-LD
- [ ] BreadcrumbList
- [ ] LocalBusiness
- [ ] Service
- [ ] FAQPage

### Hero section
- [ ] Photo background (not gradient-only)
- [ ] Short H1 with primary keyword
- [ ] Price teaser (range, not exact — no fabrication)
- [ ] Primary CTA: `#offerte` (not `/contact/`)
- [ ] WhatsApp button (frosted glass style on dark background)
- [ ] Google stars badge

### After hero
- [ ] `<TrustStrip />` — no `below-fold` wrapper
- [ ] Each subsequent section: `<div className="below-fold"><Section /></div>`

### Required sections
- [ ] Wat is de dienst / voor wie
- [ ] Voordelen / wanneer nodig
- [ ] Werkwijze (process steps)
- [ ] Afwerkingen/materialen (if relevant to service)
- [ ] Kosten (price range with context — no fabricated exact prices)
- [ ] WaaromBmKlusSection (shared component, with `subtitle` prop)
- [ ] ReviewsSection (dynamic import)
- [ ] FAQ (native `<details>`, server-renderable)

### CTA components
- [ ] StickyCTABar (dynamic import)
- [ ] QuoteModal (dynamic import, triggered by `#offerte`)

### Tone checks
- [ ] Energy/savings claims: conditional ("kan leiden tot", never "leidt tot")
- [ ] No: "altijd", "garanderen", "Snelle reactie", "binnen X uur"
- [ ] No MidPageCTA block
- [ ] All CTAs target `#offerte` (except FAQ text links)
- [ ] WhatsApp primary, phone secondary

### SEO
- [ ] Unique OG image per page
- [ ] Sibling pages checked for cannibalization (see brief)

---

## Cluster page (gevelisolatie subtopics)

- [ ] Stays focused on its subtopic — does NOT replicate `/gevelisolatie/` pillar content
- [ ] Provides genuine depth the pillar doesn't cover
- [ ] Links back to pillar (`/gevelisolatie/`) in relevant context
- [ ] Links to `/contact/` for conversion
- [ ] Sibling pages checked (`seo-system/GLOBAL_SEO_CONTENT_RULES.md §4`)
- [ ] JSON-LD: BreadcrumbList + FAQPage (at minimum)
- [ ] No large content blocks duplicated from pillar or siblings

---

## Location page (`/gevelisolatie/[city]/`)

- [ ] Entry in `lib/content/gevelisolatie-locations.ts` (LocationData object)
- [ ] Genuine local context (bouwperiode, woningTypes, gemeente-specific info)
- [ ] NOT a copy of another city — differentiated by local facts
- [ ] "Lokale informatie" section (4 cards: Subsidie, Vergunning, Energie, Bouwperiode)
- [ ] Besparing callout (conditional phrasing — see §10 language rules)
- [ ] 4+ FAQ items unique to this city
- [ ] Links to pillar (`/gevelisolatie/`), cluster pages, `/contact/`
- [ ] Werkwijze section: **NOT included** (duplicates pillar content)
- [ ] Final CTA block: **NOT included** (Hero + StickyCTABar sufficient)
- [ ] Hero image: city-specific when available (currently all share `gevelisolatie-hero.webp` — pending)
- [ ] JSON-LD: BreadcrumbList + LocalBusiness + Service

---

## Project page (`/onze-werken/[slug]/`)

Follow `docs/ADD-PROJECT.md` — complete and authoritative.

Quick check (full checklist is in ADD-PROJECT.md):
- [ ] Entry in `lib/content/projects.ts`
- [ ] Content file at `lib/content/projects/[slug].ts`
- [ ] Page at `app/onze-werken/[slug]/page.tsx`
- [ ] Images present (check flat vs subfolder format — `docs/PROJECT-REGISTRY-AUDIT.md §4`)
- [ ] baseName doesn't create duplicate path segment (known issue: Etten-Leur 6cm)
- [ ] Alt text format: `[City] [service] – voor/na de werken foto [num] ([year])`
- [ ] Required sections: Hero, Werkzaamheden, Voor-foto's, Na-foto's, Details, Materialen, Gerelateerde Diensten
- [ ] Links to relevant service pages

---

## Hub page (`/diensten/`)

- [ ] Server Component at page level
- [ ] ServicesRail as dynamic import (SSR-rendered — content IS in HTML for SEO)
- [ ] JSON-LD: BreadcrumbList + FAQPage + ItemList (6 services) + LocalBusiness
- [ ] Not for Google Ads — organic SEO hub only
- [ ] QuoteModal + StickyCTABar

---

## Homepage (`/`)

- [ ] Server Component at page level
- [ ] Client components properly scoped to leaf nodes
- [ ] No manifest leak (do not import buildSrcSet/getFallbackSrc in client components)
- [ ] Dynamic imports for QuoteModal, StickyCTABar, ReviewsSection
- [ ] JSON-LD: WebSite + LocalBusiness
