# BM Klus BV — Project Status

> Last updated: 2026-03-01  
> Reference chat: c16e5855-8ff5-4297-8bb0-d34092fa5e25

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

## Deferred Tasks

- [ ] Photos for city pages (currently all share `gevelisolatie-hero.webp`)
- [ ] More FAQ per city (currently 2-3, target 4-5)
- [ ] City-specific reviews
- [ ] GTM ID integration (user will provide code snippets)
- [ ] Hero photos for service pages
- [ ] Cloudflare Turnstile integration in QuoteModal

## Next Steps

- SEO audit of remaining pages: `/over-ons/`, `/contact/`, `/onze-werken/`
- Visual design review of `/diensten/` (user may want adjustments)
- Google Ads campaign setup for service pages (not city pages, not /diensten/)
