# BM klus BV — Project Status

> Last updated: 2026-03-02  
> Reference chats: c16e5855, 01ed4250

## Architecture

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Output:** Static export (SSG) — all pages pre-rendered at build
- **Styling:** Tailwind CSS v4 (use `bg-linear-to-r` not `bg-gradient-to-r`, `bg-primary/4` not `bg-primary/[0.04]`)
- **Language:** Dutch (nl) for all user-facing content
- **SEO:** Server Components + dynamic imports for interactive parts. JSON-LD schemas on every page.
- **CTA pattern:** `#offerte` → QuoteModal (popup form), WhatsApp (thin-lined MessageCircle icon), StickyCTABar on all service pages
- **Communication priority:** WhatsApp/email/form first, phone secondary

## Completed Pages

### Service pages (all follow the same pattern):
- `/gevelisolatie/` — pillar page with ETICS cluster (kosten, materialen, afwerkingen, rc-waarde-dikte, subsidie-vergunning)
- `/buiten-stucwerk/`
- `/sierpleister/`
- `/gevel-schilderen/`
- `/muren-stucen/`

**Pattern for each service page:**
- Server Component with dynamic imports (ServicesRail, ReviewsSection, StickyCTABar, QuoteModal)
- Hero: Image background, price teaser, CTAs (#offerte + WhatsApp), Google stars, phone
- TrustStrip after Hero
- Content sections with unique service data
- WaaromBmKlusSection (shared component with per-page `subtitle` prop)
- ReviewsSection
- FAQ with native `<details>` (server-renderable)
- JSON-LD: BreadcrumbList, LocalBusiness, Service, FAQPage
- No mid-page CTA blocks (Hero + StickyCTABar sufficient)

### City pages: `/gevelisolatie/[location]/`
- **21 cities** generated from `lib/content/gevelisolatie-locations.ts`
- Cities: Rotterdam, Den Haag, Delft, Dordrecht, Schiedam, Vlaardingen, Leiden, Gouda, Zoetermeer, Capelle aan den IJssel, Spijkenisse, Barendrecht, Ridderkerk, Alphen aan den Rijn, Maassluis, Hellevoetsluis, Breda, Bergen op Zoom, Roosendaal, Leidschendam-Voorburg, Hendrik-Ido-Ambacht
- Each city has unique: localContext, woningTypes, faq, bouwperiode, gemiddeldBesparing, subsidieInfo, vergunningTip, energieTip, gemeenteWebsite
- "Lokale informatie" section (4 cards: Subsidie, Vergunning, Energie, Bouwperiode + besparing callout)
- Werkwijze section REMOVED from city pages (avoid duplication with pillar)
- Final CTA block REMOVED (Hero + StickyCTABar sufficient)
- All 21 cities in sitemap.xml (generated dynamically from locations data)

### Hub page: `/diensten/`
- Converted from `"use client"` to Server Component
- ServicesRail (dynamic import, but SSR-rendered — content IS in HTML)
- Process section (4 static cards)
- WaaromBmKlusSection, ReviewsSection, FAQ
- JSON-LD: BreadcrumbList, FAQPage, ItemList (6 services), LocalBusiness
- QuoteModal + StickyCTABar
- NOT for Google Ads — purely organic SEO hub

## Key Components

| Component | Path | Notes |
|-----------|------|-------|
| WaaromBmKlusSection | `components/sections/gevelisolatie/waarom-bm-klus-section.tsx` | Shared USPs, accepts `subtitle` prop, has own `max-w-7xl` container |
| ServicesRail | `components/services/ServicesRail.tsx` | Interactive service comparison + keuzehulp, SSR-rendered |
| StickyCTABar | `components/sections/gevelisolatie/sticky-cta-bar.tsx` | Frosted glass sticky bar |
| QuoteModal | `components/quote-modal.tsx` | Popup form triggered by `#offerte` |
| TrustStrip | `components/trust-strip.tsx` | Trust indicators strip |
| ReviewsSection | `components/reviews-section.tsx` | Google reviews |

## Key Content Files

| File | Purpose |
|------|---------|
| `lib/content/gevelisolatie-locations.ts` | All 21 city data (LocationData type) |
| `lib/content/gevelisolatie.ts` | Pillar page content |
| `lib/seo/schema.ts` | JSON-LD generators |
| `lib/seo/meta.ts` | Metadata builder |
| `data/sitemap-plan.ts` | Sitemap route definitions |
| `app/sitemap.ts` | Sitemap generator (includes dynamic city pages) |

## Hosting & Deployment

- **Hosting:** OneHome by Antagonist (antagonist.nl), package "slim"
- **Current CMS:** WordPress (Elementor + Rank Math SEO)
- **Deploy strategy:** Replace WordPress with static export (`out/` folder)
- **Domain:** bm-klus-bv.nl
- **Redirects:** Via `.htaccess` (Apache) — WordPress hosting uses Apache

## Migration Plan (old WordPress → new static site)

Source: `https://bm-klus-bv.nl/page-sitemap.xml` (Rank Math)

### Pages that match 1:1 (no redirect needed)

| Old URL | New URL | Status |
|---------|---------|--------|
| `/` | `/` | ✅ same |
| `/diensten/` | `/diensten/` | ✅ same |
| `/onze-werken/` | `/onze-werken/` | ✅ same |
| `/contact/` | `/contact/` | ✅ same |
| `/privacybeleid/` | `/privacybeleid/` | ✅ same |
| `/gevelisolatie/` | `/gevelisolatie/` | ✅ same |
| `/gevel-schilderen/` | `/gevel-schilderen/` | ✅ same |
| `/buiten-stucwerk/` | `/buiten-stucwerk/` | ✅ same |
| `/sierpleister/` | `/sierpleister/` | ✅ same |

### 301 Redirects (URL changed)

| Old URL | New URL | Reason |
|---------|---------|--------|
| `/over_ons/` | `/over-ons/` | Underscore → hyphen |
| `/muren-stucen-2/` | `/muren-stucen/` | WordPress slug had "-2" suffix |
| `/buitenstucwerk-woning-halsteren-sierpleister-schilderwerk-2025/` | `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` | Moved under /onze-werken/ |

### 301 Redirects — project pages that WILL be recreated

These 11 project pages from the old WP site will get new equivalents under `/onze-werken/`.
Until recreated, they redirect to `/onze-werken/`. Once the new page exists, update to exact 301.

| Old URL | New URL (planned) | Status |
|---------|-------------------|--------|
| `/gevelisolatie-woning-rottekade-10cm-schilderwerk-2024/` | `/onze-werken/rottekade-gevelisolatie-10cm-schilderwerk-2024/` | TODO |
| `/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/` | `/onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister/` | TODO |
| `/gevelisolatie-vrijstaande-woning-nieuw-beijerland-zuidzijdsedijk/` | `/onze-werken/nieuw-beijerland-gevelisolatie-zuidzijdsedijk/` | TODO |
| `/gevelisolatie-woning-bruinisse-6cm-sierpleister/` | `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister/` | TODO |
| `/gevelisolatie-woning-dordrecht-10cm-sierpleister/` | `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister/` | TODO |
| `/gevelisolatie-woning-klaaswaal-6cm-sierpleister/` | `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister/` | TODO |
| `/buitenstucwerk-woning-rotterdam-cementpleister/` | `/onze-werken/rotterdam-buitenstucwerk-cementpleister/` | TODO |
| `/gevelisolatie-woning-almere-35m2-sierpleister/` | `/onze-werken/almere-gevelisolatie-35m2-sierpleister/` | TODO |
| `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister/` | TODO |
| `/vught-gevelisolatie-10cm-sierpleister/` | `/onze-werken/vught-gevelisolatie-10cm-sierpleister/` | TODO |
| `/gevelisolatie-woning-katwijk-6cm-sierpleister/` | `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister/` | TODO |

### 301 Redirects — old /object* pages (image-only, no content)

No text content on old site, just photos. All redirect to portfolio hub.

| Old URL | → |
|---------|---|
| `/object1/` | `/onze-werken/` |
| `/object2/` | `/onze-werken/` |
| `/object3/` | `/onze-werken/` |
| `/object4/` | `/onze-werken/` |
| `/object5/` | `/onze-werken/` |
| `/object6/` | `/onze-werken/` |
| `/object7/` | `/onze-werken/` |
| `/object8/` | `/onze-werken/` |
| `/object9/` | `/onze-werken/` |
| `/object10/` | `/onze-werken/` |
| `/object-11/` | `/onze-werken/` |
| `/object12/` | `/onze-werken/` |
| `/object13/` | `/onze-werken/` |
| `/object14/` | `/onze-werken/` |
| `/object15/` | `/onze-werken/` |

### Disabled/removed pages

| Old URL | Decision | Note |
|---------|----------|------|
| `/schoonmaak-na-verbouwing/` | 301 → `/diensten/` | Disabled in `sitemap-plan.ts`, service no longer offered prominently |

### New pages (no old equivalent, no redirect needed)

| New URL | Type |
|---------|------|
| `/gevelisolatie/kosten/` | Cluster page |
| `/gevelisolatie/materialen/` | Cluster page |
| `/gevelisolatie/afwerkingen/` | Cluster page |
| `/gevelisolatie/rc-waarde-dikte/` | Cluster page |
| `/gevelisolatie/subsidie-vergunning/` | Cluster page |
| `/gevelisolatie/rotterdam/` | City page |
| `/gevelisolatie/den-haag/` | City page |
| `/gevelisolatie/delft/` | City page |
| `/gevelisolatie/dordrecht/` | City page |
| `/gevelisolatie/schiedam/` | City page |
| `/gevelisolatie/vlaardingen/` | City page |
| `/gevelisolatie/leiden/` | City page |
| `/gevelisolatie/gouda/` | City page |
| `/gevelisolatie/zoetermeer/` | City page |
| `/gevelisolatie/capelle-aan-den-ijssel/` | City page |
| `/gevelisolatie/spijkenisse/` | City page |
| `/gevelisolatie/barendrecht/` | City page |
| `/gevelisolatie/ridderkerk/` | City page |
| `/gevelisolatie/alphen-aan-den-rijn/` | City page |
| `/gevelisolatie/maassluis/` | City page |
| `/gevelisolatie/hellevoetsluis/` | City page |
| `/gevelisolatie/breda/` | City page |
| `/gevelisolatie/bergen-op-zoom/` | City page |
| `/gevelisolatie/roosendaal/` | City page |
| `/gevelisolatie/leidschendam-voorburg/` | City page |
| `/gevelisolatie/hendrik-ido-ambacht/` | City page |

### WordPress artifacts to block/clean

After removing WordPress, these paths will 404 naturally but should be blocked:
- `/wp-admin/`
- `/wp-content/`
- `/wp-includes/`
- `/wp-login.php`
- `/xmlrpc.php`
- `/wp-json/`
- `/?p=*` (old query-string permalinks)
- `/main-sitemap.xsl`, `/page-sitemap.xml` (Rank Math artifacts)

### Implementation

Redirects will be implemented via `.htaccess` in the site root (Apache on OneHome/Antagonist).
File to create: `public/_htaccess` → copy to `.htaccess` on deploy.

### Migration checksum

| Category | Count |
|----------|-------|
| Old sitemap URLs (total) | **39** |
| — match 1:1 (no redirect) | 9 |
| — 301 to changed URL | 3 |
| — 301 project pages (will be recreated) | 11 |
| — 301 object* pages (image-only → hub) | 15 |
| — 301 removed service → /diensten/ | 1 |
| **Old URLs accounted for** | **39 / 39** ✅ |
| | |
| New site URLs (total) | **49** |
| — ready (deployed) | 38 |
| — TODO (11 project pages) | 11 |
| — total 301 redirects to implement | 30 |

## Deferred Tasks

- [ ] Photos for city pages (currently all share `gevelisolatie-hero.webp`)
- [ ] More FAQ per city (currently 2-3, target 4-5)
- [ ] City-specific reviews
- [ ] GTM ID integration (user will provide code snippets)
- [ ] Hero photos for service pages
- [ ] Cloudflare Turnstile integration in QuoteModal
- [ ] Create `.htaccess` with all 30 redirects (before deploy)
- [ ] OG placeholder → replace with real OG images per page
- [ ] Build 11 project pages under `/onze-werken/` (from old WP content)
- **→ Инструкция:** [docs/ADD-PROJECT.md](docs/ADD-PROJECT.md)

## Next Steps

- Google Ads campaign setup for service pages (not city pages, not /diensten/)
- Build 11 project pages (template exists: Halsteren project page)
- **Инструкция по добавлению проекта:** [docs/ADD-PROJECT.md](docs/ADD-PROJECT.md) — передай AI JSON с данными
- **Конвертация JPEG→WebP:** `pnpm images:webp` ([scripts/convert-to-webp.mjs](scripts/convert-to-webp.mjs))
- Create `.htaccess` redirect file before production deploy
- Final pre-deploy SEO checklist (Lighthouse, sitemap validation, OG images)
