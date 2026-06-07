# 08 — Step 1: City internal-linking patch (anti-cannibalization)

**Status: code change made in an ISOLATED worktree/branch — NOT merged, NOT deployed.**
- Worktree: `.claude/worktrees/seo-city-linking`
- Branch: `seo/city-internal-linking` (base `c0b2fe1`, main untouched)
- Validation: `npx tsc --noEmit` → **EXIT 0**; `npx next build` (static export) → **success, `out/` generated**.

## Goal
Make the correct **city page** the owner of its own `gevelisolatie {city}` query, where Google currently serves the
**homepage `/` / hub `/gevelisolatie/`** instead. Anti-cannibalization via internal links — explicitly endorsed by
governance `docs/governance/20-seo-and-url-rules.md:69` ("cross-reference with internal links instead").

## Evidence
- `processed/query_page_ownership_map.csv`: `gevelisolatie rotterdam`→`/`, `buitengevelisolatie rotterdam`→`/gevelisolatie/`,
  `klusbedrijf rotterdam`/`klussen rotterdam`→`/`.
- `02_seo_query_loss.md`: city-group impressions 854→191; hub/home outrank city pages.
- `03_non_aggregator_competitor_gap.md`: city SERP = ~8.8 contractors/top10; competitors win with dedicated city pages.

## Files changed (3 source files, +56 lines, nothing else)
| File | Change |
|---|---|
| `app/gevelisolatie/page.tsx` | +30 — new "Werkgebied / In welke regio's werken wij?" block: 5 internal links to top-5 city pages |
| `app/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/page.tsx` | +13 — contextual city link → `/gevelisolatie/rotterdam/` (replicates existing "Dordrecht pilot" pattern) |
| `app/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/page.tsx` | +13 — same contextual city link → `/gevelisolatie/rotterdam/` |

> `tsconfig.tsbuildinfo` was dirtied by the build and **reverted** — it is not part of the patch.

## Links added (from → to, anchor text)
| From page | To page | Anchor text | Type |
|---|---|---|---|
| `/gevelisolatie/` (hub) | `/gevelisolatie/rotterdam/` | "gevelisolatie in Rotterdam" | regio block |
| `/gevelisolatie/` | `/gevelisolatie/den-haag/` | "gevelisolatie in Den Haag" | regio block |
| `/gevelisolatie/` | `/gevelisolatie/leiden/` | "gevelisolatie in Leiden" | regio block |
| `/gevelisolatie/` | `/gevelisolatie/dordrecht/` | "gevelisolatie in Dordrecht" | regio block |
| `/gevelisolatie/` | `/gevelisolatie/breda/` | "gevelisolatie in Breda" | regio block |
| `/onze-werken/rotterdam-julianastraat-…` | `/gevelisolatie/rotterdam/` | "Bekijk onze pagina over gevelisolatie in Rotterdam" | contextual body link |
| `/onze-werken/rotterdam-buitenstucwerk-…` | `/gevelisolatie/rotterdam/` | "Bekijk onze pagina over gevelisolatie in Rotterdam" | contextual body link |

Anchor text verified in generated HTML (`out/gevelisolatie/index.html`): all 5 "gevelisolatie in {City}" present; both
Rotterdam project pages render the contextual link.

## Why this reduces cannibalization
- The hub/home currently rank for `gevelisolatie {city}` because they are the strongest internal nodes and the city
  pages receive almost no internal links. Adding hub→city links with the **exact geo anchor** passes topical/relevance
  signal to the city page and tells Google the city page is the canonical target for that geo query.
- Project→city links (Rotterdam) add a second relevant internal signal from a topically-matching page (a real Rotterdam
  project) to the Rotterdam city page — reinforcing ownership for `gevelisolatie rotterdam`.
- Natural anchors only ("gevelisolatie in {City}"); no keyword stuffing, no exact-match spam.

## Project→city data gaps (not invented — per rule 5)
- **Den Haag, Breda, Leiden: no project located in the city itself** → no contextual project→city link added.
  (Nearest real projects: Breda↔Etten-Leur ~15 km, Leiden↔Katwijk ~10 km — these are *nearby*, not in-city, so the
  "project in {city}" pattern does not apply; recorded as data gap. They still receive the hub→city link.)
- These 3 cities are candidates for the per-city nearby-project rendering in a later step (memo 07 Scope B-2).

## What was NOT changed (per task constraints)
- ❌ URL, canonical, robots/noindex, sitemap — untouched.
- ❌ title / meta / H1 — untouched (a new **H2** was added inside the new regio block; no existing heading altered).
- ❌ JSON-LD schema — untouched.
- ❌ City-page main copy — untouched (`lib/content/gevelisolatie-locations.ts` not modified).
- ❌ Project `relatedLinks` — untouched (governance: project relatedLinks = service pages only; city link added as
  separate contextual body link, not in relatedLinks).
- ❌ Homepage `/` — no Rotterdam/Zuid-Holland prose exists to anchor a natural link → intentionally not changed
  (only the global footer says "regio Rotterdam"; not edited to avoid a sitewide over-weighting of one city).
- ❌ No merge to main, no deploy, no Ads/GA4/GTM/WP changes.

## Risk
**Low.** Additive internal links only; no content/structure removed. Minor link-graph shift — monitor that the hub
does not lose its own head term `gevelisolatie`. Build + typecheck pass.

## Rollback
- Discard branch: `git worktree remove .claude/worktrees/seo-city-linking --force && git branch -D seo/city-internal-linking`.
- Or per-file: `git checkout -- <file>` on the branch. All changes are isolated to the branch; main is unaffected.

## Validation result
- `npx tsc --noEmit` → **EXIT 0**.
- `npx next build` → **success**; all 21 city routes + hub + project pages prerendered; `out/` generated.
- HTML spot-check: 5 city links + anchors present on hub; contextual link present on both Rotterdam project pages.
- Diff confined to 3 intended files (+56 lines).

## Next recommended step
Ready for review. If approved: (a) optionally extend project→city pattern is **not** possible for Den Haag/Breda/Leiden
(data gap); (b) proceed to memo-07 **Step 2** (kosten €/m² table) in a separate scoped branch. Do **not** merge/deploy
this branch without your go-ahead.
