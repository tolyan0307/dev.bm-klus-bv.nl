# Audit Outputs Index

> Index of all audit documents. These are snapshots — check dates before acting on findings.
> Living project state → `PROJECT-STATUS.md`, `TODO-DEFERRED.md`

---

## Current audit outputs

| File | Date | Scope | Key findings |
|------|------|-------|-------------|
| `docs/IMAGE-SLOT-AUDIT.md` | 2026-03-13 | All ~95 image slots across 18 routes | Location pages share one hero image (TODO); /buiten-stucwerk/ has only 2 images; ~20 orphaned image files; before/after consistency gaps |
| `docs/PROJECT-REGISTRY-AUDIT.md` | 2025-03-15 | 14 project pages vs projects.ts registry | All 14 projects have pages and registry entries; Etten-Leur 6cm hero has duplicate path segment bug |
| `docs/perf/performance-map-current-state.md` | 2026-03-15 | All audited routes post-manifest-leak-fix | Manifest leak CLOSED on all routes; `/gevelisolatie/materialen/` has unnecessary page-level client boundary (priority fix) |
| `app/gevelisolatie/page.tsx` (inline fix) | 2026-03-19 | `/gevelisolatie/` page technical fixes | `WatIsEticsSection` added `below-fold` wrapper (was missing); `WerkwijzeSection` converted from static import to `dynamic()` (was client component, caused SSR bundle leak) |
| `app/sierpleister/page.tsx` (inline fix) | 2026-03-19 | `/sierpleister/` page content/SEO fixes | `hero.lead[1]` surfaced in hero (was dead content); `soorten.types[*].bullets` added to type cards (comparison data was in content file but not rendered — brief requires "vergelijking" SERP format) |
| `docs/perf/homepage-audit-lighthouse-followup.md` | 2026-03-15 | Homepage only | Manifest leak was root cause (now fixed); vendor baseline ~500KB; CSS 140KB Tailwind output |
| `docs/audit/TECH_AUDIT_STATUS.md` | 2026-03-19 | Full project: routes, metadata, schema, below-fold, dead code, CTAs, perf | 1 critical (ReviewsSection static import on homepage); 5 major; 4 medium; 4 minor. See file for full findings. |
| `docs/audit/CONTENT_AUDIT_STATUS.md` | 2026-03-19 | Full project: content quality, SEO alignment, claims safety, cannibalization, Dutch compliance | 2 critical ("100% Garantie" badge, banned phrase); 5 major (CTA mismatch, FAQ conflict, subsidy boilerplate); 6 medium; 4 minor. |
| 5 priority fixes (inline) | 2026-03-19 | diensten, gevel-schilderen, homepage, hero-section, rc-waarde-dikte | "100% Garantie" → VCA*; banned phrase removed; ReviewsSection→dynamic(); hero CTA→#offerte; FAQ conflict resolved (layout→page JSON-LD) |
| Location pages batch | 2026-03-19 | 21 location pages via gevelisolatie-locations.ts + [location]/page.tsx | subsidieInfo: removed hardcoded ISDE amounts, lead with local supplement, conditional language; WaaromBmKlusSection: city-aware subtitle |
| Pilot deep-pass: 3 cities | 2026-03-20 | Dordrecht, Zoetermeer, Breda in gevelisolatie-locations.ts | localContext rewrite (no intro duplication), unique energieTip per city, FAQ +1 each (water/systeembouw/beschermd), Breda superlative governance fix, vergunningTip differentiator Zoetermeer |
| `docs/audit/CITY_PAGE_ROLLOUT_FRAMEWORK.md` | 2026-03-20 | Reusable process for remaining 18 city pages | Pilot lessons, 5-step process, per-city checklist, invariants, wave 2 recommendation (Leiden, Schiedam, Spijkenisse) |
| Wave 2: 3 cities | 2026-03-20 | Leiden, Schiedam, Spijkenisse in gevelisolatie-locations.ts | localContext rewrite (constructief per wijk), energieTip unique per city, FAQ replace generic→local, project refs in afstanden, Spijkenisse vergunningTip + jargon removal |
| Wave 3: 4 cities | 2026-03-20 | Capelle, Vlaardingen, Maassluis, Gouda in gevelisolatie-locations.ts | VvE-schaal (Capelle), eigen projecten E-E-A-T (Vlaardingen), oud/nieuw + foutcorrectie (Maassluis), smalle percelen binnenstad (Gouda), Rc-jargon removal (Vlaardingen/Gouda) |
| Waves 4–7: 11 cities | 2026-03-20 | Rotterdam, Den Haag, Delft, Barendrecht, Ridderkerk, Alphen a/d Rijn, Hellevoetsluis, Bergen op Zoom, Roosendaal, Leidschendam-Voorburg, Hendrik-Ido-Ambacht | **21/21 city pages complete.** Same framework: localContext rewrite, energieTip unique, vergunningTip differentiator, FAQ replace generic→local, project refs |
| Metadata title fix batch | 2026-03-20 | 6 long-city-name city pages in gevelisolatie-locations.ts | Shortened meta titles exceeding 60-char governance limit (title field only) |
| Safe technical SEO batch | 2026-03-20 | materialen/page.tsx, rc-waarde-dikte/page.tsx, google-aggregate-rating-jsonld.tsx | materialen: +metadata +BreadcrumbList +FAQPage; rc-waarde-dikte: +metadata +BreadcrumbList; aggregate-rating: BUSINESS_ID→SITE.canonicalBase |
| `docs/audit/LEGACY_REDIRECT_MAP.md` | 2026-03-20 | Analysis-only: legacy redirect inventory from root.htaccess + PROJECT-STATUS.md | 48 redirect rules already implemented in deploy/apache/root.htaccess; 14 project pages verified against actual slugs; 3 PROJECT-STATUS.md discrepancies noted |

---

## Phase status (2026-03-20)

**City pages block: COMPLETE.** All 21/21 city pages have unique content, metadata QA passed, title fix batch applied. No further broad rollout work planned.

**Current phase:** Monitoring / indexing / manual verification / possible later GSC-driven refinement.

**Next steps (not code):**
- Verify indexing via Google Search Console (submit sitemap, URL Inspection for key pages)
- Monitor coverage report for crawl errors
- Rich Results Test for JSON-LD on homepage, money pages, location pages
- Verify www→non-www redirect and canonical domain behavior live
- After GSC data accumulates: possible targeted refinement based on actual performance

---

## Decisions from audits (already applied)

See `docs/governance/60-decisions-and-bans.md §Performance decisions` for the full list of closed issues and what to leave alone.

---

## Next audit triggers

| When | What to audit |
|------|---------------|
| After adding 5+ new project pages | Run `docs/PROJECT-REGISTRY-AUDIT.md` checks again |
| After significant image additions | Run image slot coverage check |
| After refactoring `/gevelisolatie/materialen/` | Run performance map update |
| Before production deploy | Lighthouse run on all money pages |
