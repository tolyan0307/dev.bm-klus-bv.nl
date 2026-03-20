# Unified Backlog — Technical + Content Audit
**Date:** 2026-03-19
**Source:** `TECH_AUDIT_STATUS.md` + `CONTENT_AUDIT_STATUS.md` + `60-decisions-and-bans.md`
**Owner:** update after each action

> Every item has a source ID (e.g. `T:C-1`, `C:CC-1`) linking to the original audit doc.
> Severity: CRIT / MAJOR / MED / MINOR

---

## ~~MUST FIX NOW~~ — ALL DONE (2026-03-19)

| # | Status | Title |
|---|--------|-------|
| 1 | **DONE** | "100% Garantie" → "VCA* Gecertificeerd" on `/diensten/` |
| 2 | **DONE** | "Snelle reactie" → "Persoonlijk contact per telefoon of WhatsApp" on `/gevel-schilderen/` |
| 3 | **DONE** | ReviewsSection → `dynamic()` + removed `below-fold` wrapper on homepage |
| 4 | **DONE** | Homepage CTA `href` → `#offerte` |
| 5 | **DONE** | Rc-waarde-dikte FAQ conflict resolved: layout FAQ deleted, JSON-LD moved to page.tsx |

---

## SHOULD FIX SOON

Real impact on SEO quality, performance, or content accuracy. Safe but require more care.

| # | Type | Sev | Route / file | Title | Why it matters | Next step |
|---|------|-----|-------------|-------|----------------|-----------|
| ~~6~~ | ~~content~~ | ~~MAJOR~~ | ~~`gevelisolatie-locations.ts` ×21~~ | ~~ISDE subsidy amounts~~ | **DONE** — amounts removed, conditional language added | — |
| ~~7~~ | ~~seo~~ | ~~MAJOR~~ | ~~`gevelisolatie-locations.ts` ×21~~ | ~~Subsidy boilerplate~~ | **DONE** — local supplement leads, ISDE generic | — |
| 8 | technical | MAJOR | `kosten/page.tsx:371–595` | Single large `below-fold` wraps entire body | Defeats per-section deferred rendering; governance requires individual wrappers | Split into per-Section `below-fold` wrappers. `T:MA-4` |
| 9 | technical | MAJOR | `materialen/page.tsx` | TrustStrip via `dynamic()` — above-fold flash | Only page with dynamic TrustStrip; causes late render of above-fold component | Convert to static import. `T:MA-5` |
| 10 | content | MAJOR | `diensten/page.tsx:30-55` | 5 FAQ items inline, no brief, no content file | Unauditable content; "Geen verrassingen achteraf" is promise-adjacent; no brief exists | Create brief + content file first, then review claims. `C:CM-5` |
| 11 | technical | MAJOR | `50-audit-and-verification-rules.md` + `60-decisions-and-bans.md:50` | Stale: materialen listed as "needs refactor" (already done) | Future agents may re-refactor working code | Update both docs to "Closed". `T:MA-1` |
| 12 | content | MINOR | `buiten-stucwerk/page.tsx`, `gevel-schilderen/page.tsx` | `hero.lead[1]` not rendered (dead content) | Approved second paragraph invisible to users/search — same bug fixed on /sierpleister/ | Add `<p>{hero.lead[1]}</p>` in hero. `C:CMI-3` + `C:CMI-4` |

---

## NICE TO IMPROVE LATER

Inconsistencies without breakage. Fix when touching the relevant files.

| # | Type | Sev | Route / file | Title | Why it matters | Next step |
|---|------|-----|-------------|-------|----------------|-----------|
| 13 | technical | MED | Multiple pages | ReviewsSection wrapped in `below-fold` | Redundant: `dynamic()` already lazy-loads; `below-fold` adds unnecessary CSS containment | Remove `below-fold` wrapper per page. `T:ME-1` |
| 14 | seo | MED | `afwerkingen/page.tsx:577-625` | Cannibalization: sierpleister depth on /afwerkingen/ | "stuc-vs-crepi" section duplicates /sierpleister/ coverage; brief says "doNotCoverDeeply" | Shorten to summary + link. `C:CME-1` |
| ~~15~~ | ~~ux~~ | ~~MED~~ | ~~`[location]/page.tsx:429`~~ | ~~WaaromBmKlusSection "regio Rotterdam"~~ | **DONE** — subtitle now uses `${data.city}` | — |
| 16 | seo | MED | Pillar FAQ #1 vs kosten FAQ #1 | Duplicate "Wat kost gevelisolatie per m²?" in both FAQPage schemas | Google may show wrong page in rich results | Change pillar FAQ #1 to unique question. `C:CME-4` |
| 17 | seo | MED | `[location]/page.tsx` voordelen | Identical 4-benefit cards on all 21 location pages | Increases thin-duplicate signal alongside boilerplate subsidy text | Remove voordelen from locations or make 1 benefit dynamic. `C:CME-2` |
| 18 | architecture | MED | `home-faq.ts` | English field names `question`/`answer` vs project standard `vraag`/`antwoord` | Breaks consistency for project-wide FAQ audits | Rename fields + update 2 consumers. `C:CME-5` |
| 19 | seo | MED | `/buiten-stucwerk/` vs `/afwerkingen/` | Cannibalization risk: stucwerk comparison tables on both pages | Both cover glad stucwerk types; currently adequate but monitor | Monitor Search Console; sharpen if overlap appears. `C:CME-6` |
| 20 | technical | MED | `sierpleister.ts` | Dead `meta` export never imported | Confuses agents about metadata flow | Delete export. `T:ME-3` |
| 21 | technical | MED | `afwerkingen/page.tsx:808-902` | Two `bg-background` containers (split at ReviewsSection) | Visual seam risk if background color changes | Unify into one container. `T:ME-4` |
| 22 | architecture | MED | 6 pages | Metadata in `layout.tsx` vs `page.tsx` inconsistency | No functional issue but confuses SEO auditing | Document in governance as intentional or standardize. `T:ME-2` |

---

## DEFERRED

Known issues already documented. No urgency. Batch cleanup.

| # | Type | Sev | Route / file | Title | Why it matters | Next step |
|---|------|-----|-------------|-------|----------------|-----------|
| 23 | architecture | MED | `materialen/layout.tsx`, `kosten/page.tsx`, `afwerkingen/page.tsx` | FAQ content inline in page/layout files instead of lib/content/ | Separation of concerns; makes content non-reusable | Extract to lib/content/ when touching pages. `T:MA-2` + `T:MA-3` |
| 24 | ux | MINOR | `hero-section.tsx` | Homepage hero lacks "Vanaf €X/m²" price teaser | All money pages have one; homepage is highest traffic | Add after owner confirms price range. `C:CMI-1` |
| 25 | ux | MINOR | `[location]/page.tsx` hero | All 21 location pages use Dordrecht project photo | Weakens local feel — tracked in IMAGE-SLOT-AUDIT | Replace when city-specific images available. `C:CMI-2` |
| 26 | technical | MINOR | `styles/globals.css` | Dead file — never imported | shadcn/ui artifact | Delete. `T:MI-1` |
| 27 | technical | MINOR | `components/inline-quote-form.tsx` | Dead component — never imported | Replaced by QuoteModal | Delete. `T:MI-2` |
| 28 | technical | MINOR | `components/sections/gevelisolatie/mid-page-cta.tsx` | Dead component — removed from all pages | Ban: no mid-page CTA blocks | Delete. `60-decisions §stale` |
| 29 | technical | MINOR | `app/globals.css:197` | `#cookiescript_badge` dead CSS | CookieScript not used | Remove rule. `T:MI-3` |

---

## Completed

| Date | ID | Action |
|------|----|--------|
| 2026-03-19 | — | `app/gevelisolatie/page.tsx`: `WatIsEticsSection` below-fold wrapper added |
| 2026-03-19 | — | `app/gevelisolatie/page.tsx`: `WerkwijzeSection` static → dynamic |
| 2026-03-19 | — | `app/sierpleister/page.tsx`: `hero.lead[1]` surfaced |
| 2026-03-19 | — | `app/sierpleister/page.tsx`: `soorten.types.bullets` surfaced |
| 2026-03-19 | #1 | `app/diensten/page.tsx`: "100% Garantie" → "VCA* Gecertificeerd" |
| 2026-03-19 | #2 | `app/gevel-schilderen/page.tsx`: banned phrase "Snelle reactie" replaced |
| 2026-03-19 | #3 | `app/page.tsx`: ReviewsSection static→dynamic + below-fold removed |
| 2026-03-19 | #4 | `components/hero-section.tsx`: CTA href="/contact/" → "#offerte" |
| 2026-03-19 | #5 | `rc-waarde-dikte/layout.tsx` + `page.tsx`: FAQ conflict resolved, JSON-LD moved to page |
| 2026-03-19 | #6,7 | `gevelisolatie-locations.ts` ×21: subsidieInfo rewritten — no hardcoded ISDE amounts, local-first |
| 2026-03-19 | #15 | `[location]/page.tsx`: WaaromBmKlusSection subtitle → `${data.city} en omgeving` |
