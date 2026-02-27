# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Static marketing website for **BM Klus BV** (Dutch construction company). Built with Next.js 16 (App Router, `output: 'export'`), React 19, Tailwind CSS 4, and shadcn/ui. No backend, no database, no environment variables required.

### Development commands

Standard scripts are in `package.json`:

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (port 3000) |
| Build | `pnpm build` (static export to `out/`) |
| Type check | `npx tsc --noEmit` |

### Known caveats

- **ESLint is not installed.** The `pnpm lint` script (`eslint .`) will fail because `eslint` is not in `devDependencies`. Use `npx tsc --noEmit` for type checking instead.
- **Package manager:** Use `pnpm` (lockfile: `pnpm-lock.yaml`). A `package-lock.json` also exists but `pnpm` is the primary manager.
- **Static export:** The site uses `output: 'export'` so there are no API routes or server-side rendering. `pnpm dev` still works normally for development.
- **No tests:** The project has no automated test suite configured.
