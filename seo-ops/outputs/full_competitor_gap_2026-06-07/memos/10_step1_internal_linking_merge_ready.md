# 10 — Step 1: City internal-linking — MERGED to main (NOT pushed, NOT deployed)

Date: 2026-06-07. Safety-first. No deploy performed.

## Summary
The `seo/city-internal-linking` branch was fast-forward merged into **local** `main` after the pre-existing main WIP
was safely stashed. Validation green. **Not pushed to origin, not deployed** — prod deploy requires explicit
confirmation (see Deploy status).

## 1. Pre-existing main WIP — saved to stash (NOT lost, NOT re-applied)
- **Stash:** `stash@{0}` — message `"pre-existing main WIP before seo-city-internal-linking merge 2026-06-07"`.
- **Method:** `git stash push` **without `-u`** (deliberate — see note). 15 tracked changes saved (10 modified, 5 deleted).
- **Tracked changes stashed:**
  | File | Note |
  |---|---|
  | `app/gevelisolatie/page.tsx` | WaaromBmKlus subtitle → adds `<Link>` to /gevelisolatie/rotterdam/ (related WIP) |
  | `components/sections/gevelisolatie/waarom-bm-klus-section.tsx` | `subtitle?: string` → `React.ReactNode` |
  | `lib/content/gevelisolatie-locations.ts` | Rotterdam city **title/description/intro** rewrite (title/meta change) |
  | `.gitignore`, `CLAUDE.md`, `seo-ops/README.md`, `seo-ops/config/site.yaml`, `seo-ops/data/processed/latest_combined_snapshot.json`, `seo-ops/integrations/.env.example`, `tsconfig.tsbuildinfo` | config/docs/data |
  | 5 deleted: `seo-ops/analysis/__pycache__/*.pyc` (×3), `seo-ops/data/processed/.gitkeep`, `seo-ops/reports/weekly/.gitkeep` | |
- **Untracked NOT stashed (intentionally):** 57 untracked entries were left in place — they are the **untracked
  seo-ops system** (`analyzers/`, `contracts/`, `tools/`, `integrations/*`, `outputs/`…) and the **linked git worktree**
  `.claude/worktrees/`. Running `git stash -u` would have swept the entire seo-ops infrastructure, the audit
  deliverables, AND the linked worktree off the working tree (risking worktree corruption). Tracked-only stash fully
  preserves the at-risk pre-existing WIP while keeping those in place. The FF merge does not touch untracked paths, so
  this is sufficient and safer.

## 2. Branch / merge
- **Branch commit:** `40c08616d020373acfbe1d8e2e692ab277646042` (`40c0861`) on `seo/city-internal-linking`.
- **Merge:** fast-forward `c0b2fe1 → 40c0861` (no merge commit; linear history).
- **Previous main hash (rollback target):** `c0b2fe185db0f8176ba6bbf95e42dd117f1754d5`.
- **New main HEAD:** `40c08616d020373acfbe1d8e2e692ab277646042`.

## 3. Files changed (the merged commit)
| File | +lines | Change |
|---|---|---|
| `app/gevelisolatie/page.tsx` | +30 | "Werkgebied" block → 5 city links (Rotterdam, Den Haag, Leiden, Dordrecht, Breda) |
| `app/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/page.tsx` | +13 | contextual link → /gevelisolatie/rotterdam/ |
| `app/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/page.tsx` | +13 | contextual link → /gevelisolatie/rotterdam/ |

3 files, +56 lines. Internal links + one new `<h2>` only. **No title/meta/canonical/H1/schema/sitemap/robots changes.**

## 4. Validation result (on merged main)
- `npx tsc --noEmit` → **EXIT 0**.
- `npx next build` (= `next build`, static export; prod build is the GH Actions workflow, see below) → **EXIT 0**; all
  21 city routes + hub + project pages prerendered; `out/` generated.
- Built-HTML spot-check (`out/`): hub has all 5 city links; both Rotterdam project pages render the contextual link.
- `tsconfig.tsbuildinfo` (dirtied by build) reverted → **main tracked tree CLEAN** (only untracked seo-ops remain).

## 5. Deploy status: NOT DEPLOYED — blocked pending confirmation
- **Mechanism found:** GitHub Actions `.github/workflows/deploy-prod.yml` (and `deploy-dev.yml`).
  - Trigger: **`workflow_dispatch` only** (manual; not on push). Self-hosted runner `[self-hosted, oracle-bmklus]`,
    builds with prod env/secrets, deploys to Antagonist via SSH to `DEPLOY_DOMAIN_DIR_PROD`.
  - `actions/checkout` builds from **origin** → deploy requires the commit to be **pushed to origin/main first**, then
    the workflow triggered manually.
- **Push state:** local `main` is **1 commit ahead of `origin/main`** (merge commit not pushed).
- **Why stopped:** deploy = (1) `git push origin main` + (2) trigger `deploy-prod.yml`. Both are production actions; no
  explicit confirmation/command was given to push or run the workflow. Per instruction, stopped after build.
- **Live URL check (pending deploy):** `/gevelisolatie/`, `/gevelisolatie/rotterdam/`, Rotterdam project page — to be
  verified for HTTP 200 + presence of new links **after** deploy. Build-level check already passed.

## 6. What was NOT changed
- Stash WIP **not re-applied** (kept in `stash@{0}`).
- **Not pushed** to origin; **not deployed**.
- No Ads/GA4/GTM/GBP/WP changes. No env/secrets/config changes. No Step 2 (`/gevelisolatie/kosten/`) work.

## 7. Rollback
- **Undo the merge (local, not pushed/deployed):**
  - `git reset --hard c0b2fe185db0f8176ba6bbf95e42dd117f1754d5` (returns main to pre-merge), **or**
  - `git revert 40c08616d020373acfbe1d8e2e692ab277646042` (keeps history).
- **Restore the stashed pre-existing WIP (only after explicit OK):**
  - inspect: `git stash show --stat stash@{0}`
  - apply: `git stash apply stash@{0}` (use `apply`, not `pop`, so the stash is retained as backup).
- **Discard the branch (optional, after confirming main has the commit):**
  `git worktree remove .claude/worktrees/seo-city-linking --force && git branch -d seo/city-internal-linking`.

## Next decision needed from you
1. **Push + deploy?** Confirm to `git push origin main` and trigger `deploy-prod.yml` (production). I will not push/deploy without this.
2. **Stashed WIP** (`stash@{0}`) — handle separately: it contains a related hub→Rotterdam link + a **Rotterdam city title/meta rewrite**. Decide whether to apply/commit it (note: it overlaps intent with the merged regio block and includes a title/meta change beyond Step-1 scope).
3. Step 2 (`/gevelisolatie/kosten/`) — not started; awaiting your separate OK.
