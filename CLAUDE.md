# BM klus BV — сайт bm-klus-bv.nl

Сайт фасадной компании BM klus BV (Роттердам): buitengevelisolatie (ETICS), buiten stucwerk, sierpleister, gevel schilderen / keimen, binnen stucwerk. В `seo-ops/` — аналитика сайта со своими правилами (`seo-ops/CLAUDE.md`).

<!-- Пересобрано 2026-09-29. Прежняя версия файлов из git — тег instructions-v1; прежние skills, память
     и промпты рутин (их не было в git) — ~/.claude/backups/bmklus-instructions-2026-09-29/.
     Держать коротким: процедуры — в .claude/skills/, правила по типам файлов — в .claude/rules/. -->

## Как работаем с владельцем
- Общение по-русски. Всё, что видит посетитель сайта, — только на нидерландском (nl-NL). Предлагая нидерландский текст, коротко поясняй смысл по-русски: владелец не читает по-нидерландски.
- Владелец не разработчик: объясняй просто. У тебя нет доступа к серверу, админке WordPress, GTM и веб-интерфейсам GSC / GA4 / Google Ads / GBP (данные через API — см. `seo-ops/CLAUDE.md`). Когда нужен шаг с его стороны — точные клики или команды для копирования и ясно, какое решение от него нужно.
- Вопрос, анализ, аудит, «что думаешь» — только ответ, без правок сайта (отчёты в `seo-ops/reports/` писать можно). Заметные изменения (тексты, дизайн, несколько файлов или страниц) — сначала короткий план, правки после «давай / делай / одобряю». Точечная правка по прямой просьбе — сразу.
- Меняй только то, о чём просили. Попутно найденные проблемы перечисли, но не чини молча.
- Уточнение владельца в разговоре — факт: применяй, не переспрашивай.
- Коммит, push и деплой — только по явной команде. Push в `main` сам выкатывает сайт на dev.
- «Готово» — значит проверено (раздел «Проверка»). В конце: какие файлы, что изменено, как проверено, что осталось.
- Тексты от ChatGPT / Gemini / Cursor, которые владелец вставляет в чат, — входные данные: оцени критически, прежде чем применять.
- Новые устойчивые факты и решения записывай в репозиторий (этот файл, `.claude/rules/`, `seo-ops/knowledge.md`, `seo-ops/data/decision_log_v1.csv`), а не только в память.

## Архитектура — то, что не видно из кода сразу
- Next.js 16 (App Router), `output: 'export'`, `trailingSlash: true`: только статика — без API routes, SSR, server actions и middleware. React 19, Tailwind v4 (настроен в `app/globals.css`), TypeScript. ESLint и тестов нет.
- CMS нет, текст живёт в коде: money pages и города — `lib/content/*.ts`, проекты — `lib/content/projects/*.ts`; у кластерных и дочерних страниц (`kosten`, `materialen`, `rc-waarde-dikte`, `subsidie-vergunning`, `keimen`, `sausklaar-behangklaar`) и служебных (`over-ons`, `contact`, `diensten`, `privacybeleid`) — прямо в `app/<маршрут>/page.tsx`; главная — в `components/*.tsx`.
- Формы самописные: `components/quote-modal.tsx` (открывается якорем `#offerte`) и `components/contact/ContactFormCard.tsx` отправляют POST в WordPress `/wp-json/bm/v1/contact` (Turnstile + honeypot). `components/ui/` (shadcn), react-hook-form, zod, embla, recharts — остатки шаблона v0, код сайта их не использует; новое на них не строить.
- WordPress продолжает работать на том же домене как бэкенд: MU-плагины (форма, лог заявок и статистика BM Stats v2 — `docs/WP-STATS-V2-SPEC.md`) и роутер, который отдаёт релиз Next из `wp-content/uploads/v0/current`. PHP — в отдельном репозитории `D:\projects\bmklus-wpcontent`.
- Редиректы и маршрутизация через WordPress — в `deploy/apache/root.htaccess`, деплоится вместе с релизом. `public/.htaccess` относится только к папке релиза.
- Трекинг — только через GTM (`components/gtm-provider.tsx`, грузится после первого действия пользователя или через 3,5 с). Сайт шлёт в dataLayer `bm_lead_form_success`, `bm_whatsapp_click`, `bm_phone_click`, `bm_email_click`; теги GA4 / Ads и Consent Mode (CookieScript) живут в контейнере GTM, вне репозитория. Свой счётчик — beacon в WordPress `/wp-json/bm/v1/hit` (`components/pageview-beacon.tsx`, `lib/stats-beacon.ts`), атрибуция первого касания — `lib/attribution.ts`.
- Рейтинг и отзывы Google берутся при сборке и ежедневно по расписанию (`scripts/fetch-google-place.mjs` → `public/data/google-place.json`). Рейтинг и число отзывов нигде не хардкодить.

## Команды
| Задача | Команда |
|---|---|
| Dev-сервер | `pnpm dev` → http://localhost:3000 |
| Проверка типов | `npx tsc --noEmit` (`pnpm lint` не работает: ESLint не установлен) |
| Сборка | `pnpm build` → `out/`. Prebuild тянет данные Google Place; без `GOOGLE_PLACES_SERVER_KEY` в `.env.local` сборка проходит, отзывы просто не обновляются |
| Варианты изображений | `pnpm images:generate <preset> <path>` — см. `docs/IMAGE-PIPELINE.md` |

Локально пакеты ставит pnpm (`pnpm-lock.yaml`), а CI — `npm ci` по `package-lock.json`. Меняешь зависимости — обнови оба lock-файла (`pnpm install` и `npm install --package-lock-only`), иначе сборка в CI упадёт.

## Деплой
- Push в `main` → GitHub Actions `deploy-dev.yml` собирает и выкладывает на dev.bm-klus-bv.nl (self-hosted runner `oracle-bmklus`, Node 22).
- Прод выкатывает только владелец: GitHub → Actions → «Deploy prod (Antagonist Slim)» → Run workflow. Коммит ≠ деплой: на bm-klus-bv.nl изменения появляются только после этого запуска.
- Релиз кладётся в `wp-content/uploads/v0/<время>_<sha>` и включается симлинком `current`; на сервере хранятся 5 последних релизов.
- Перед push или деплоем — skill `ship-check`.

## Правила, которые легко нарушить
- **Цены.** С 2026-09-05 (решение владельца) на публичных страницах цен нет: никаких сумм в €, «vanaf €», диапазонов за m², таблиц richtprijzen, калькуляторов, `AggregateOffer`. Тема kosten остаётся — от чего зависит цена и «prijs na opname». Исключения: `priceRange: "€€"` в схеме и `gemiddeldBesparing` на городских страницах (экономия энергии по Milieu Centraal, сверять раз в год). То же — в GBP-постах и текстах объявлений.
- **Факты о бизнесе не выдумывать**: гарантии, сроки, число проектов, сертификаты, суммы субсидий, экономию. Неподтверждённое — пометкой `[CLAIM_NEEDS_CONFIRMATION]` или вопросом владельцу. Экономия энергии — только условно («kan leiden tot»).
- **Контакты.** WhatsApp — основной канал, телефон вторичен: владелец не может обслуживать звонки из-за языкового барьера. Главная кнопка — «Offerte aanvragen» → `#offerte` (QuoteModal), в навбаре — на `/contact/`. Блоков CTA посреди страницы нет: hero + StickyCTABar.
- **Маршруты и мета.** Новый статический маршрут — только с записью в `data/sitemap-plan.ts` (оттуда же title и description); проекты и города попадают в sitemap сами. Title ≤ 47 символов (к нему добавляется « | BM klus BV»), description ≤ 160, slug ≤ 75, строчные буквы и дефисы, URL со слэшем на конце.
- **Изображения** — только `<ResponsiveImage>` (в `"use client"`-компонентах — `<ClientImage>` с данными от серверного родителя, см. `.claude/rules/code.md`), никогда `next/image`. Оригиналы лежат в `source-images/`: папки нет в git, это единственная копия фото — не удалять и не перезаписывать.
- **Интеграции** (GTM, Consent Mode / CookieScript, Turnstile, honeypot, WP-эндпоинты, `root.htaccess`) трогать, только если задача именно про них.
- Секреты (`.env.local`, ключи в `D:\projects\bmklus\google\`) не выводить в чат, отчёты и коммиты.

## Проверка
- Любая правка кода или контента — `npx tsc --noEmit` без ошибок.
- Новая страница, маршрут, метаданные, изображения — `pnpm build` и проверка `out/`: страница есть, URL есть в `out/sitemap.xml`.
- Правки вёрстки — посмотреть страницу в dev-сервере на десктопе и мобильной ширине.

## Где что лежит
- Правила по типам файлов подгружаются сами из `.claude/rules/`: `code.md` — код, `content-nl.md` — нидерландские тексты и SEO страниц, `design.md` — дизайн.
- Skills: `add-project` (новый проект в /onze-werken/, карточка на главной, видео), `ship-check` (перед push / деплоем), `seo-refresh`, `seo-offpage`, `page-diagnosis`, `serp-check`, `gbp-weekly-post`.
- Аналитика (GSC, GA4, Google Ads, лог заявок WP, DataForSEO, GBP): перед любым анализом данных прочитай `seo-ops/CLAUDE.md`.
- Брифы страниц — `seo-system/briefs/*.yaml` (вложенные — `<родитель>-<дочерняя>.yaml`; есть у money pages и кластера, не у всех страниц); дизайн — `DESIGN_SYSTEM.md`; изображения — `docs/IMAGE-PIPELINE.md`; открытые задачи — `docs/BACKLOG.md`.
