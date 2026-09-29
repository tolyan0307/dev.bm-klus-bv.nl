---
paths:
  - "app/**/*.{ts,tsx,css}"
  - "components/**/*.{ts,tsx}"
  - "lib/**/*.ts"
  - "hooks/**/*.ts"
  - "data/**/*.ts"
  - "scripts/**/*.mjs"
---

# Код сайта

- Server Components по умолчанию. `"use client"` — только в листовых компонентах, которым нужны хуки, события или API браузера. Ни один `page.tsx` сейчас не клиентский — так и держать.
- Интерактив ниже первого экрана подключается через `dynamic()` (так уже сделано с `quote-modal`, `reviews-section`, `sticky-cta-bar`, аккордеонами FAQ). Каждая секция после hero и TrustStrip оборачивается отдельно в `<div className="below-fold">` (content-visibility): не одной обёрткой на все секции, и не вокруг StickyCTABar / QuoteModal — они фиксированные поверх страницы. На `kosten`, `materialen`, `rc-waarde-dikte`, `keimen`, `sausklaar-behangklaar` и всех страницах проектов сейчас одна обёртка на весь контент — известное отклонение (`docs/BACKLOG.md`); попутно не переделывать, новые страницы проектов собираются по шаблону skill `add-project`.
- Изображения — `<ResponsiveImage baseName preset sizes alt>` из `components/responsive-image.tsx`. В `"use client"`-компонент не импортируй `components/responsive-image`, `lib/responsive-image` и `data/image-manifest.json`: весь манифест (~125 КБ на диске, ~86 КБ в чанке) попадает в клиентский JS. Нужна картинка в клиентском компоненте — посчитай src/srcset в серверном родителе и передай пропсами. Сейчас утечка есть: через `components/lazy-before-after-slider.tsx` / `before-after-slider.tsx` (городские страницы) и через `components/projects/ProjectsSection.tsx` → `ProjectCard` (/onze-werken/) — см. `docs/BACKLOG.md`; не копируй эти паттерны.
- `data/image-manifest.json` генерирует `scripts/generate-variants.mjs`. Руками — только удалить ключ заменяемого изображения перед перегенерацией (скрипт лишь добавляет ширины); подробно — `docs/IMAGE-PIPELINE.md`.
- Цвета — токены (`bg-primary`, `text-foreground`, `border-border` и др., см. `DESIGN_SYSTEM.md`), без сырых hex в `className`; исключение — градиент hero в `style`. В старом коде около 210 hex-вхождений (список — `DESIGN_SYSTEM.md` §8): новых не добавляй, при переделке блока переводи на токены. Tailwind v4: `bg-linear-to-*`, прозрачность сокращённо (`bg-primary/7`). Условные классы — через `cn()` из `lib/utils.ts`.
- Где лежит текст страницы — см. `CLAUDE.md` («Архитектура»). В `lib/content/*.ts` — только данные, без UI-кода; якоря оглавления — с `scroll-mt-24`.
- Метаданные — `export const metadata = buildPageMetadata("/путь/")` из `lib/seo/meta.ts`, свои объекты metadata не писать. Источник title/description: основные страницы — `data/sitemap-plan.ts`; города — `lib/content/gevelisolatie-locations.ts`; проекты — override в своём `page.tsx`. Объекты `*Meta` в `lib/content/` в метаданных не участвуют.
- Sitemap (`app/sitemap.ts`) собирается из трёх источников: включённые `PLANNED_ROUTES` в `data/sitemap-plan.ts`, `lib/content/projects.ts` и города. `app/robots.ts` разрешает индексацию только на прод-домене.
- JSON-LD: хелперы в `lib/seo/schema.ts` (`localBusinessSchema`, `serviceSchema`, `breadcrumbSchema`, `websiteSchema`, `projectPageSchema`, `videoSchema`, `jsonLdScript`); FAQPage пишется прямо в страницах; общий AggregateRating — `components/google-aggregate-rating-jsonld.tsx` в `app/layout.tsx`. Бизнес — `HomeAndConstructionBusiness` с `@id` `/#business`. Структуру схем без запроса не менять; цены не добавлять — в `serviceSchema` не передавать `lowPrice` / `highPrice` (иначе вернётся `AggregateOffer`).
- Новая зависимость — только с объяснением зачем, и с обновлением обоих lock-файлов (см. `CLAUDE.md`). Мёртвый код, найденный попутно, назови, но без просьбы не удаляй.
