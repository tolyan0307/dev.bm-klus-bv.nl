# Full Project Audit

Date: 2026-03-16

## 1. Executive summary

Проект выглядит как хорошо наполненный статический marketing site на Next.js App Router с сильной SEO-ориентацией, но текущая реализация не является полностью "backend-free" и имеет несколько подтверждённых технических рисков.

Подтверждённые сильные стороны:

- App Router, `output: 'export'`, единый SEO-слой через `lib/seo/meta.ts` и `lib/seo/schema.ts`.
- `robots` и `sitemap` реализованы на уровне App Router: `app/robots.ts`, `app/sitemap.ts`.
- Большая часть route pages остаётся server-first; route-level `use client` есть только у `app/contact/page.tsx:1` и `app/gevelisolatie/rc-waarde-dikte/page.tsx:1`.
- TypeScript-проверка проходит: `npx tsc --noEmit` выполнен успешно.

Подтверждённые риски:

- Build в офлайн/ограниченной среде падает из-за `next/font/google` в `app/layout.tsx:2,12`; `next build` не может получить `Inter` из Google Fonts.
- Продакшн-деплой завязан на WordPress REST/API и WP routing, несмотря на static export: `app/contact/page.tsx:68`, `components/quote-modal.tsx:47`, `components/inline-quote-form.tsx:40`, `components/pageview-beacon.tsx:8`, `deploy/apache/root.htaccess:111-146`.
- На ключевых money pages экспортируется очень тяжёлый HTML: например, `out/gevelisolatie/index.html` = 391,485 bytes, `out/sierpleister/index.html` = 389,994 bytes.
- Есть глобальный client cost в root layout: `app/layout.tsx:56-63` всегда монтирует `Navbar`, `GtmProvider`, `PageviewBeacon`, `GoogleAggregateRatingJsonLd`.

Спорные места, но не авария:

- `components/services-showcase.tsx:1-30` использует клиентский boundary только ради `matchMedia`.
- `components/google-aggregate-rating-jsonld.tsx:1-35` вставляет structured data только на клиенте; это допустимо, но менее надёжно, чем SSR JSON-LD.
- `app/sitemap.ts:16-43` обновляет `lastModified` для всех URL на момент каждой сборки; это не ломает сайт, но может создавать шум для crawl systems.

Baseline / vendor cost:

- GTM и Cloudflare Turnstile выглядят нормальными и типовыми интеграциями: `components/gtm-provider.tsx:5-35`, `app/contact/page.tsx:454-457`, `components/quote-modal.tsx:251-254`, `components/inline-quote-form.tsx:201-206`.
- Большой объём изображений в `public/images` сам по себе не доказывает плохой runtime, но увеличивает вес репозитория и стоимость deploy/storage.

## 2. Project map

### 2.1 Top-level structure

Ключевые директории:

- `app/` — все route pages, layouts, `robots`, `sitemap`, `not-found`.
- `components/` — shared UI, SEO, forms, interactive sections.
- `lib/` — SEO helpers, image helpers, Google Place cache, content registries.
- `data/` — sitemap plan и image manifest.
- `public/` — изображения, локальный cache Google Place.
- `deploy/` — Apache/WP deploy config.
- `docs/` — документация и audit materials.

### 2.2 Main sections and pages

Homepage:

- `app/page.tsx`

Core pages:

- `app/diensten/page.tsx`
- `app/onze-werken/page.tsx`
- `app/over-ons/page.tsx`
- `app/contact/page.tsx`
- `app/privacybeleid/page.tsx`

Service / money pages:

- `app/gevelisolatie/page.tsx`
- `app/gevel-schilderen/page.tsx`
- `app/buiten-stucwerk/page.tsx`
- `app/sierpleister/page.tsx`
- `app/muren-stucen/page.tsx`

Gevelisolatie cluster / supporting money pages:

- `app/gevelisolatie/kosten/page.tsx`
- `app/gevelisolatie/materialen/page.tsx`
- `app/gevelisolatie/afwerkingen/page.tsx`
- `app/gevelisolatie/rc-waarde-dikte/page.tsx`
- `app/gevelisolatie/subsidie-vergunning/page.tsx`
- `app/gevelisolatie/[location]/page.tsx`

Project pages:

- `app/onze-werken/page.tsx` — index/collection page
- 14 static project pages under `app/onze-werken/*/page.tsx`

Counts confirmed during audit:

- 31 route files `app/**/page.tsx`
- 14 project detail pages under `app/onze-werken/`
- 23 location slugs in `lib/content/gevelisolatie-locations.ts`

### 2.3 Most important shared components and helpers

Shared shell:

- `app/layout.tsx` — root layout, metadata, global wrappers
- `components/navbar.tsx`
- `components/footer.tsx`

Lead generation / conversion:

- `components/quote-modal.tsx`
- `components/inline-quote-form.tsx`
- `app/contact/page.tsx`

SEO:

- `lib/seo/meta.ts`
- `lib/seo/routes.ts`
- `lib/seo/schema.ts`
- `data/sitemap-plan.ts`

Images:

- `components/responsive-image.tsx`
- `lib/responsive-image.ts`
- `data/image-manifest.json` (70,015 bytes)

Reviews / trust:

- `components/google-reviews.tsx`
- `components/google-rating-badge.tsx`
- `components/google-aggregate-rating-jsonld.tsx`
- `lib/google-place-cache.ts`

## 3. Architecture findings

### 3.1 App Router / layouts / wrappers

Confirmed:

- Проект использует App Router. Root shell определён в `app/layout.tsx:39-66`.
- Root layout задаёт глобальные metadata/robots и встраивает `Navbar`, `Footer`, `GtmProvider`, `PageviewBeacon`, `GoogleAggregateRatingJsonLd`: `app/layout.tsx:16-23`, `app/layout.tsx:56-63`.
- Есть несколько route-level layouts, но они неравномерны по роли:
  - Metadata-only wrappers: `app/diensten/layout.tsx:1-8`, `app/sierpleister/layout.tsx:1-8`, `app/gevelisolatie/subsidie-vergunning/layout.tsx:1-12`
  - SEO JSON-LD wrappers: `app/contact/layout.tsx:14-65`, `app/gevelisolatie/materialen/layout.tsx:58-97`, `app/gevelisolatie/rc-waarde-dikte/layout.tsx:58-100`
  - Behaviour wrapper with modal injection: `app/onze-werken/layout.tsx:1-15`

Finding:

- Архитектура SEO-слоя централизована, но UI/presentation слой централизован слабо: часть страниц использует shared sections, часть содержит очень большие route files с большим объёмом контента и логики прямо в `page.tsx`.

### 3.2 Route pages that use `use client`

Confirmed route pages:

- `app/contact/page.tsx:1`
- `app/gevelisolatie/rc-waarde-dikte/page.tsx:1`

Interpretation:

- Это хороший baseline: почти все route pages server-first.
- Однако два этих route-level client pages крупные и влияют на hydration cost сильнее, чем небольшие client islands.

### 3.3 Large client components

Крупные client components:

- `app/contact/page.tsx` — полноценная client page, form state, Turnstile, fetch, GTM, embedded map: `app/contact/page.tsx:1-704`
- `app/gevelisolatie/rc-waarde-dikte/page.tsx` — большая client page с интерактивным calculator/content page: `app/gevelisolatie/rc-waarde-dikte/page.tsx:1-753`
- `components/google-reviews.tsx` — client carousel/reviews widget с fetch и pointer events: `components/google-reviews.tsx:1`, `components/google-reviews.tsx:280`, `components/google-reviews.tsx:322-357`
- `components/quote-modal.tsx` — глобальная modal form с event listeners, body lock, hash handling, Turnstile, fetch: `components/quote-modal.tsx:1`, `components/quote-modal.tsx:90`, `components/quote-modal.tsx:108`, `components/quote-modal.tsx:128-129`, `components/quote-modal.tsx:188`, `components/quote-modal.tsx:251-252`

### 3.4 Components that look heavy or architecturally questionable

Real concern:

- `app/contact/page.tsx` тянет `ResponsiveImage` из client route: `app/contact/page.tsx:6,303`. Import chain идёт в `components/responsive-image.tsx:1-60` -> `lib/responsive-image.ts:1-88` -> `data/image-manifest.json`. Это likely client bundle cost; exact runtime bundle impact not proven without analyzer, но цепочка подтверждена.

Real concern:

- `app/gevelisolatie/rc-waarde-dikte/page.tsx` делает весь информационный money page client-side, хотя интерактивной является только часть содержимого. Это архитектурно тяжёлое решение.

Debatable:

- `components/services-showcase.tsx:1-30` использует `use client` и `matchMedia` только чтобы разделить desktop/mobile layout. Для такого кейса client boundary выглядит неоптимально.

Debatable:

- `app/onze-werken/layout.tsx:1-15` инжектирует `QuoteModal` на все project pages через dynamic import. Это не критично, но увеличивает глобальный interactive footprint project section.

## 4. Performance findings

### 4.1 Confirmed mobile/runtime concerns

Real problem:

- Root layout всегда гидратирует глобальный `Navbar` с scroll listener и mobile state: `app/layout.tsx:56`, `components/navbar.tsx:1-58`. Это оправдано для навигации, но это постоянный client cost на каждой странице.

Real problem:

- `PageviewBeacon` всегда монтируется глобально: `app/layout.tsx:62`, `components/pageview-beacon.tsx:26-39`. Это небольшой код, но он добавляет client effect на каждый route change.

Real problem:

- `GoogleAggregateRatingJsonLd` всегда монтируется глобально: `app/layout.tsx:63`, `components/google-aggregate-rating-jsonld.tsx:15-35`. Для каждой страницы это лишний client effect, fetch path и hydration point ради schema.

Real problem:

- `components/google-reviews.tsx` использует fetch, resize listener и pointer listeners: `components/google-reviews.tsx:280`, `components/google-reviews.tsx:322-357`. На мобильных это явно heavier-than-basic trust widget.

### 4.2 Large pages / HTML weight

Confirmed exported HTML sizes:

- `out/gevelisolatie/index.html` — 391,485 bytes
- `out/sierpleister/index.html` — 389,994 bytes
- `out/gevel-schilderen/index.html` — 327,598 bytes
- `out/muren-stucen/index.html` — 295,900 bytes
- `out/buiten-stucwerk/index.html` — 295,255 bytes

Finding:

- Для static export это очень большие HTML документы. Это особенно чувствительно на mobile при первой загрузке и парсинге, даже до hydration.

### 4.3 Large source files

Confirmed large TS/TSX files:

- `lib/content/gevelisolatie-locations.ts` ~79 KB
- `app/gevel-schilderen/page.tsx` ~56.9 KB
- `app/sierpleister/page.tsx` ~52.2 KB
- `app/gevelisolatie/materialen/page.tsx` ~46.6 KB
- `app/gevelisolatie/subsidie-vergunning/page.tsx` ~42.4 KB
- `app/muren-stucen/page.tsx` ~42.0 KB
- `app/contact/page.tsx` ~41.2 KB
- `app/gevelisolatie/rc-waarde-dikte/page.tsx` ~40.1 KB

Finding:

- Это не доказательство проблемы само по себе, но подтверждённый маркер высокой page complexity и усложнённой поддержки.

### 4.4 Image pipeline and media cost

Confirmed:

- `next.config.mjs:8-10` отключает Next image optimization: `images.unoptimized = true`
- В проекте используется свой manifest-based image helper: `lib/responsive-image.ts:1-88`, `components/responsive-image.tsx:19-60`
- Общий объём `public/images` = 187,339,349 bytes
- `public/images/projects` = 163,416,230 bytes
- `public/images/og-default.png` = 1,031,953 bytes

Interpretation:

- Собственная responsive image pipeline выглядит осознанной, но цена ошибки выше: если manifest попадает в client bundle, проект сам несёт стоимость того, что обычно закрывает `next/image`.
- Большой общий image corpus больше влияет на repo/deploy/storage, чем обязательно на runtime. Runtime risk зависит от реальных `sizes`, `srcSet` и lazy loading; по коду явной катастрофы не доказано.

### 4.5 Client bundle / import chain risks

Likely risk, not proven by analyzer:

- `app/contact/page.tsx:6` импортирует `ResponsiveImage`; это тянет `lib/responsive-image.ts:1` и `data/image-manifest.json`.
- `components/google-rating-badge.tsx:1-64`, `components/google-aggregate-rating-jsonld.tsx:1-37`, `components/google-reviews.tsx:1-...` все используют `lib/google-place-cache.ts`, который может динамически пойти в `lib/google-maps-loader.ts:9-43`.

Clarification:

- Для rating-only path в `lib/google-place-cache.ts:116-127` карта не нужна.
- Для full place/reviews path `lib/google-place-cache.ts:147-154` возможен heavier client fetch path через Google Maps JS loader.

### 4.6 Render-blocking CSS / hints

Confirmed:

- В `app/layout.tsx:47` есть `preconnect` к `https://cdn.cookie-script.com`
- Глобальный CSS импортируется из `app/globals.css`: `app/layout.tsx:10`
- В текущем `.next/static/chunks` присутствует CSS chunk 143,769 bytes

Finding:

- CSS render-blocking cost как факт для initial paint естественен; exact severity not proven без trace.
- `preconnect` к CookieScript может быть лишним, потому что прямого loader script в source code не найдено. Связь с реальным рантаймом not proven; возможно, CookieScript грузится через GTM или внешний CMP flow.

### 4.7 Obvious hydration hotspots

Confirmed hotspots:

- `components/navbar.tsx`
- `components/google-reviews.tsx`
- `components/quote-modal.tsx`
- `app/contact/page.tsx`
- `app/gevelisolatie/rc-waarde-dikte/page.tsx`
- `components/services-showcase.tsx`
- `components/sections/gevelisolatie/sticky-cta-bar.tsx`
- `components/sections/gevelisolatie/sticky-toc.tsx`

## 5. Third-party / tracking findings

### 5.1 GTM

Confirmed:

- GTM env-gated: `components/gtm-provider.tsx:5-8`
- Script loads `afterInteractive`: `components/gtm-provider.tsx:12-24`
- Noscript iframe present: `components/gtm-provider.tsx:25-32`
- Custom events pushed through `trackEvent`: `components/gtm-provider.tsx:37-44`

Verdict:

- Normal, standard integration.

### 5.2 CookieScript

Confirmed:

- `app/layout.tsx:47` has `preconnect` to `cdn.cookie-script.com`
- `app/globals.css:190-199` styles/hides `#cookiescript_badge`
- `components/footer.tsx:238-243` has `.csconsentlink` button

Not proven:

- Прямое подключение CookieScript script в repo source не найдено.
- Следовательно, сам loader может быть GTM-managed, server-injected, или вообще отсутствовать в текущем build snapshot.

Verdict:

- Integration traces are present.
- Actual runtime loading path not proven from repository code alone.

### 5.3 Analytics / tracking / external scripts

Confirmed:

- Custom pageview beacon posts to WP endpoint: `components/pageview-beacon.tsx:8-23`
- Contact success tracking to GTM: `app/contact/page.tsx:275-278`, `components/quote-modal.tsx:211-214`, `components/inline-quote-form.tsx:144-147`
- Cloudflare Turnstile loads externally: `app/contact/page.tsx:454-457`, `components/quote-modal.tsx:251-254`, `components/inline-quote-form.tsx:201-206`
- Google Maps iframe embed on contact page: `app/contact/page.tsx:703-704`
- Google Place / reviews use local JSON cache and possibly Maps JS API loader: `lib/google-place-cache.ts:53-154`, `lib/google-maps-loader.ts:9-43`

Verdict:

- GTM, Turnstile, Maps, Google reviews look like normal vendor integrations.
- Custom pageview beacon is acceptable technically, but it is a confirmed backend dependency and should not be described as purely static/no-backend.

### 5.4 Suspicious integrations

Real concern:

- Apache config explicitly states WordPress remains active and `wp-json` is intentionally left open: `deploy/apache/root.htaccess:111-146`

Interpretation:

- Это не выглядит malicious/suspicious, но это скрытая production dependency, которую легко недооценить.

## 6. SEO / technical SEO findings

### 6.1 Metadata / canonical logic

Confirmed strong baseline:

- Central metadata builder in `lib/seo/meta.ts:38-87`
- Canonical always built from `getSiteUrl()` and normalized trailing slash: `lib/seo/meta.ts:42-49`
- Shared site constants in `lib/seo/routes.ts:5-13`
- Planned route metadata source in `data/sitemap-plan.ts:44-197`

Verdict:

- Metadata architecture is one of the strongest parts of the project.

### 6.2 Robots / sitemap

Confirmed:

- `app/robots.ts:18-28` blocks non-production hosts from indexing
- `app/sitemap.ts:14-43` composes planned routes + projects + location pages
- `out/robots.txt` and `out/sitemap.xml` exist in exported output

Real issue:

- `app/sitemap.ts:16` uses `const lastModified = new Date()` for all URLs. Every build rewrites all `<lastmod>` values regardless of actual content changes.

Interpretation:

- Это не broken SEO, но это noisy signal and weak freshness semantics.

### 6.3 Structured data / JSON-LD

Confirmed strong coverage:

- Home page includes `WebSite`, `LocalBusiness`, `Organization`, `FAQ`: `app/page.tsx:87-90`
- Contact layout includes `BreadcrumbList`, `LocalBusiness`, `ContactPage`: `app/contact/layout.tsx:15-64`
- Service pages and cluster pages broadly include breadcrumb/service/FAQ JSON-LD via `jsonLdScript`: multiple route files under `app/`
- Project pages use `projectPageSchema`: `lib/seo/schema.ts:164-202`

Real caveat:

- Aggregate rating schema is client-injected only: `components/google-aggregate-rating-jsonld.tsx:15-35`

Interpretation:

- Google usually can render JS, but SSR schema is more robust. Current approach is acceptable, not ideal.

### 6.4 Breadcrumbs

Confirmed:

- Breadcrumb schema is widely used via `breadcrumbSchema(...)`.
- Dedicated UI component `components/seo/Breadcrumbs.tsx` exists.

Real code-quality issue:

- `components/seo/Breadcrumbs.tsx` appears unused; breadcrumb rendering is mostly implemented inline in pages instead.

### 6.5 SEO risks / inconsistencies

Real issue:

- `lib/seo/schema.ts:190` sets `datePublished` for project pages as `${year}-01-01`. This is synthetic, not actual publication date.

Debatable:

- Default OG image is heavy: `lib/seo/routes.ts:12`, backed by `public/images/og-default.png` ~1.03 MB.

Not proven:

- Не найдено явной ошибки canonical duplication.
- Не найдено evidence of missing sitemap coverage for current enabled routes.

## 7. Code quality / technical debt

### 7.1 Dead or likely unused files

Likely dead:

- `components/theme-provider.tsx` — no repository usage found
- `components/cta-section.tsx` — no repository usage found
- `components/seo/Breadcrumbs.tsx` — no repository usage found
- `styles/globals.css` — no import usage found from App Router shell
- `components/ui/use-mobile.tsx` — duplicate hook, appears unused
- `components/ui/use-toast.ts` — duplicate hook, appears unused

Clarification:

- These are repository-level search findings, not runtime proofs. False positives are possible only if files are used externally or by codegen; no such evidence was found.

### 7.2 Strange duplication

Confirmed duplicates:

- `hooks/use-mobile.ts` and `components/ui/use-mobile.tsx`
- `hooks/use-toast.ts` and `components/ui/use-toast.ts`

Finding:

- Это явный technical debt marker: duplicated utilities increase drift risk.

### 7.3 Overly large files / fragile places

Real concern:

- Very large page files centralize content, layout and logic together:
  - `app/gevel-schilderen/page.tsx`
  - `app/sierpleister/page.tsx`
  - `app/contact/page.tsx`
  - `app/gevelisolatie/materialen/page.tsx`
  - `app/gevelisolatie/subsidie-vergunning/page.tsx`
  - `app/gevelisolatie/rc-waarde-dikte/page.tsx`

Fragile integration points:

- All form submission flows depend on `NEXT_PUBLIC_CONTACT_API_BASE` + WP REST path:
  - `app/contact/page.tsx:66-68`
  - `components/quote-modal.tsx:45-47`
  - `components/inline-quote-form.tsx:37-40`
- Review/rating data path depends on local cache plus optional Google API access:
  - `public/data/google-place.json`
  - `lib/google-place-cache.ts:53-154`
  - `package.json:7` prebuild script

### 7.4 What looks like technical debt

Confirmed:

- Hidden WordPress coupling in an otherwise static-export codebase
- Mixed SEO patterns: some pages use dedicated layout wrappers, others inline JSON-LD directly
- Large monolithic content pages
- Duplicate hooks / dead components
- Vendor traces around CookieScript without explicit source-of-truth loader in repo code

## 8. Build / deploy risks

### 8.1 Safe buildability

Confirmed:

- `npx tsc --noEmit` passes

Confirmed problem:

- `pnpm build` could not be executed in this environment because `pnpm` is not installed locally.
- `node .\\node_modules\\next\\dist\\bin\\next build` fails with:
  - `next/font: error`
  - `Failed to fetch Inter from Google Fonts`
  - import trace points to `./app/layout.tsx`

Relevant code:

- `app/layout.tsx:2`
- `app/layout.tsx:12`

Interpretation:

- Build is not reproducible in offline/restricted environments.
- In CI/CD or isolated build runners this is a real deployment risk unless internet access to Google Fonts is guaranteed.

### 8.2 Prebuild / deploy coupling

Confirmed:

- `package.json:7-8` runs `prebuild` before build: `node scripts/fetch-google-place.mjs`
- `public/data/google-place.json` is generated/fetched data, but `public/data/` is gitignored

Risk:

- Clean environments depend on prebuild being able to fetch Google data or at least handle failure gracefully.
- Exact failure behaviour of `scripts/fetch-google-place.mjs` was not deeply audited here, so full build resilience is not proven.

### 8.3 Production deployment shape

Confirmed:

- `next.config.mjs:3-4` uses `output: 'export'` and `trailingSlash: true`
- `deploy/apache/root.htaccess:143-155` routes unknown paths through WordPress
- `deploy/apache/root.htaccess:145-146` says MU-plugin serves static HTML from release directory

Real concern:

- Deployment model is hybrid: static export artefacts plus WordPress front-controller fallback. That is more operationally complex than the project overview suggests.

## 9. Priority list

### Critical

- Build reproducibility risk: `next/font/google` in `app/layout.tsx:2,12` breaks restricted/offline builds.
- Hidden backend dependency: forms and pageview tracking require WordPress REST endpoints (`app/contact/page.tsx:68`, `components/quote-modal.tsx:47`, `components/inline-quote-form.tsx:40`, `components/pageview-beacon.tsx:8`, `deploy/apache/root.htaccess:111-146`).
- Hybrid static + WordPress deployment model is a real operational coupling, not a documentation detail.

### Important

- Very large exported HTML on key commercial pages (`out/gevelisolatie/index.html`, `out/sierpleister/index.html`, etc.).
- Global client footprint in root layout (`app/layout.tsx:56-63`).
- Entire `app/contact/page.tsx` and `app/gevelisolatie/rc-waarde-dikte/page.tsx` are client routes instead of server pages with smaller islands.
- Likely client import cost of `image-manifest.json` via `ResponsiveImage` inside client code path (`app/contact/page.tsx:6` -> `lib/responsive-image.ts:1`).
- `app/sitemap.ts:16` uses build-time-now for all `lastModified`.

### Later

- Dead files and duplicate hooks: `components/theme-provider.tsx`, `components/cta-section.tsx`, `components/seo/Breadcrumbs.tsx`, `styles/globals.css`, `components/ui/use-mobile.tsx`, `components/ui/use-toast.ts`.
- CookieScript integration path is not explicit in repo; source of truth should be clearer.
- Synthetic project `datePublished` in `lib/seo/schema.ts:190`.
- Heavy default OG image in `public/images/og-default.png`.

### Leave alone

- Centralized metadata builder in `lib/seo/meta.ts`
- Host-gated `robots` strategy in `app/robots.ts`
- Broad JSON-LD coverage across major pages
- Custom responsive image pipeline as a concept; current concern is only boundary placement, not the idea itself
- GTM and Turnstile integrations as such; they look normal

## 10. Final verdict

Состояние проекта можно оценить как `commercially strong, technically serviceable, but operationally less static than advertised`.

Что реально хорошо:

- Сильная SEO-структура.
- Хорошее покрытие коммерческих intent pages.
- App Router используется в целом разумно.
- TypeScript health на текущий момент нормальный.

Что реально настораживает:

- Build portability already broken in restricted environment.
- Production shape зависит от WordPress больше, чем видно по описанию проекта.
- На ряде ключевых страниц есть тяжёлый HTML и заметный client-side footprint.

Итог:

- Проект не выглядит аварийным.
- Проект выглядит зрелым по контенту и SEO.
- Но с точки зрения архитектурной честности и deploy health его нельзя описывать как "просто статический Next export без backend".
