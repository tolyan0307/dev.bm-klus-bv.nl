# Открытые задачи

Один список вместо разрозненных TODO и аудитов (свёрнуты сюда 2026-09-29; прежние документы — в git-теге `instructions-v1`). Сделано — удалить пункт. Решение владельца записать: внедрённое — в `seo-ops/data/decision_log_v1.csv`, устойчивое решение — в `seo-ops/knowledge.md` («Решения владельца») или в `CLAUDE.md`.

## Сайт: код и производительность
- `<link rel="preload">` hero в пяти `layout.tsx` (`keimen`, `sausklaar-behangklaar`, `kosten`, `afwerkingen`, `subsidie-vergunning`) дублирует предзагрузку, которую React сам ставит для hero с `priority` (в `<head>` две записи, тот же файл). Layout-файлы можно удалить.
- **Два менеджера пакетов.** Локально pnpm (`pnpm-lock.yaml`, обновлялся 2026-07-19), CI — `npm ci` по `package-lock.json` (2026-03-08). Решить: перевести CI на pnpm или всё на npm.
- **Остатки шаблона v0** (по проверке 2026-09-29 кодом сайта не используются — перед удалением перепроверить): 57 файлов `components/ui/`, 27 пакетов Radix, react-hook-form, @hookform/resolvers, zod, embla, recharts, sonner, vaul, cmdk, next-themes (`components/theme-provider.tsx`), date-fns, input-otp, react-day-picker, react-resizable-panels, `hooks/use-mobile.ts`, `hooks/use-toast.ts`; имя пакета `my-project`. Удаление — отдельной задачей со сборкой.
- **Тексты отзывов пропадают после каждого деплоя.** Сборка в `deploy-dev.yml` / `deploy-prod.yml` пишет `data/google-place.json` с рейтингом, но без текстов отзывов. Вероятная причина — в env сборки нет `GOOGLE_PLACES_SERVER_KEY`, а Legacy Place Details с браузерным ключом отзывов не отдаёт. Проверено 2026-09-30: на dev после деплоя 0 текстов, на проде после ежедневного обновления — 5. До ежедневного `refresh-google-place.yml` блок отзывов показывает только ссылку на Google; cron стоит на 05:00 UTC, но GitHub запускает его около 09:30–11:20 UTC. Пока не исправлено — после деплоя на прод запускать вручную: Actions → «Refresh Google Place data» → Run workflow. Исправление — передать секрет в env сборки обоих workflow (интеграция — по решению владельца).
- **Плашки рейтинга без указания Google Maps.** `google-rating-badge` показывает «5.0/5 · 20 reviews» и «5.0★ reviews (20)», а правила Places API требуют рядом с данными Google без карты надпись «Google Maps» или логотип. В блоке отзывов (`google-reviews`) подпись «Reviews van Google Maps» есть. Правка текста плашки — с согласия владельца.
- В `lib/seo/schema.ts` `serviceSchema` всё ещё умеет выдавать `AggregateOffer` при `lowPrice` / `highPrice` — убрать ветку, чтобы цены не вернулись случайно.
- Дизайн-долг (полный список — `DESIGN_SYSTEM.md` §8): ≈210 сырых hex в `className` (28 файлов), 29 `bg-gradient-to-*`, жёсткий `border-border` без прозрачности, тёмные блоки вне hero (3 на `sierpleister`, «Onze aanpak» на `over-ons`, `checklist-interactive`), три варианта eyebrow и три реализации hero. Переводить на токены и паттерны при переделке блоков; тёмные блоки — решение владельца.
- Одна обёртка `below-fold` на весь контент вместо обёртки на секцию: `kosten`, `materialen`, `rc-waarde-dikte`, `keimen`, `sausklaar-behangklaar` и все 20 страниц проектов (шаблон в skill `add-project` — такой же). Первая секция попадает в первый экран, и content-visibility ничего не экономит.
- `aria-label="Hero"` только у трёх hero (главная, хаб `/gevelisolatie/`, `afwerkingen`): на остальных страницах `StickyCTABar` появляется по запасному порогу, а в dataLayer-событиях `bm_*_click` из hero стоит `placement: content` (сейчас эта метка нигде не сохраняется, но пригодится, если её начнут собирать).
- Контраст ниже WCAG AA для мелкого текста: `text-primary` на креме 3.0:1 (все eyebrow и текстовые ссылки), белый на кнопках `primary` 3.15:1, `text-muted-foreground/60` (26 мест) 2.5:1. Решение владельца — например, отдельный более тёмный оранжевый для текста.
- Нет токенов для повторяющихся цветов: тёмный hero `#1A1A1A` (90 мест), WhatsApp `#25D366` (32), звёзды (два разных цвета: `fill-amber-400` и `#FBBC05`), премиум-тень (22 arbitrary-значения).
- Страница 404 (`app/not-found.tsx`) без тёмного hero — белые ссылки прозрачного навбара на кремовом фоне почти не видны. На 404 и `/privacybeleid/` нет `QuoteModal`, поэтому «Offerte aanvragen» в футере там ничего не открывает.
- На `[location]` классы сетки собираются динамически (`` `lg:grid-cols-${facts.length}` ``) — работает случайно, хрупко.
- Мёртвое: `styles/globals.css`; `@keyframes shimmer` и классы `.glass-card`, `.icon-container`, `.section-title-h2/-h3`, `.section-description` в `app/globals.css`; `components/cta-section.tsx` (CTA-блок посреди страницы — не подключать), `app/onze-werken/faq.tsx`; `openQuoteModal()` нигде не вызывается; `data/services.ts` ни откуда не импортируется (и его `dienst-*.webp`); `public/images/general/` не используется. Правило `#cookiescript_badge` в `app/globals.css` не мёртвое: оно намеренно прячет бейдж CookieScript на мобильных.
- OG-изображение одно на весь сайт (`public/images/og-default.png`, к тому же ИИ-рендер).
- Hero всех городских страниц — одно фото проекта в Дордрехте (`dordrecht-gevelisolatie-10cm-na-01`).

## Контент — нужны решения владельца
- Подтвердить или убрать обещания и цифры, которых владелец не подтверждал: «25 jr garantie», «1200+ gevels», «2–4× meer woningwaarde», «ETICS gecertificeerd» (`components/etics-section.tsx`, `components/hero-section.tsx`); сроки «offerte binnen 24–48 uur» (meta главной в `data/sitemap-plan.ts`, `components/services/ServicesRailInteractive.tsx`), «Offerte binnen 48 uur» (`components/process-steps.tsx`, главная и `/diensten/`), «binnen 2 werkdagen» (`lib/content/sierpleister.ts`), «binnen één werkdag contact» (`app/onze-werken/page.tsx`, FAQ и JSON-LD).
- Остатки цен в текстах сайта: «voor advies en richtprijs» (`lib/content/sierpleister.ts`).
- `/gevelisolatie/rc-waarde-dikte/`: FAQ (`page.tsx`) называет для PIR при Rc 3,5 «±120 mm», а таблица на той же странице — 90 mm.
- Цены в Google Ads: «Vanaf €35/m² spachtelputz» (buiten stucwerk), «Vanaf €25/m²» в заголовке и описании (gevel schilderen), возможно «vanaf €110» в старых группах — противоречат запрету цен (`seo-ops/knowledge.md`). Правит владелец в Google Ads.
- keimen: часть запросов показывается и с `/gevel-schilderen/`, но дочерняя стоит намного выше — по критерию каннибализации (`seo-ops/CLAUDE.md`) это пересечение; срочных правок родителя не нужно, проверить на ревью 2026-10-16.
- sausklaar: по семейству Google пока ставит выше родителя `/muren-stucen/` (поз. 26 против 48 у дочерней). Если к ревью 2026-10-16 не изменится — решить, какая страница владеет запросами, сократить sausklaar на родителе, усилить ссылки на дочернюю. Связанный старый вопрос — кто владеет «stucen rotterdam» (журнал решений, 2026-04-07).
- `/buiten-stucwerk/`: раздел про betonstuc (пункт B4 плана 2026-08-15) — сейчас есть H3, строка таблицы и FAQ; решить, нужен ли полноценный раздел (без prijsindicatie). После ретайтла позиция страницы 8.1 → 11.0 — следить.
- Городские страницы: через полгода 1–3 клика за 28 дней. Ждёт решения план Wave 1 от 2026-07-20: 5 городов (Rotterdam, Zoetermeer, Leiden, Delft, Dordrecht) + раздел про stukadoor buitenwerk (матрица `seo-ops/outputs/city_service_matrix_2026-07-20.json`). Массово переписывать все 21 — отклонено.
- Со страниц городов на проекты ссылаются только dordrecht, vlaardingen и rotterdam (слаги захардкожены в `app/gevelisolatie/[location]/page.tsx`); новые проекты с городами не связываются — решить, нужна ли такая перелинковка.
- 11 из 20 страниц проектов: `metaTitle` длиннее 47 символов и обрезается с «…» — dordrecht и rottekade (59), bruinisse и klaaswaal (58), katwijk (56), vught (55), rotterdam-buitenstucwerk (54), vlaardingen-10cm, almere и nieuw-beijerland (51), vlaardingen-6cm (50).
- Несостыковки в данных проектов: Almere — в схеме `year: 2024`, в карточке `meta.year: 2025`; Spijkenisse — `city` в схеме «Spijkenisse», в карточке «Spijkenisse (Malledijk)».
- Дизайн-проход для страниц keimen и sausklaar (просьба владельца 2026-09-04): обе уже собраны на премиум-паттернах — уточнить у владельца, чего он ждёт.
- Хаб `/gevelrenovatie/` — одобрен в принципе, отложен до решения владельца.
- GBP-посты: ротация типа `service` включает `/muren-stucen/` (интерьер), хотя с 2026-07-19 в интерьер не вкладываемся — оставить или убрать.
- Телефон записан в двух форматах: «+31 6 12 07 98 08» и «+31 6 1207 9808» — выбрать один.

## Изображения (из аудита замены ИИ-фото, 2026-09-15)
- Интерьер (muren stucen): ~14 слотов, включая «dienst-muren» на главной и `/diensten/` — снять 6–8 фото на объекте.
- Steenstrips: 5 слотов (в т. ч. `etics-layer-insulation-ext` на главной) — снять на объекте или убрать визуал.
- Типы sierpleister (siliconenhars, silicaat, krabpleister, kalei): 3–4 слота — макро образцов или сократить гид до 2 текстур.
- PIR и minerale wol — 2 слота; мойка фасада (schoonmaak) — 1 слот.
- Мусор пайплайна: 16 осиротевших ключей `projects/rotterdam-julianastraat-aanbouw-isolatie-4cm-2025/` (папка переименована в `-2026`), 117 файлов вариантов (~4 МБ) не в манифесте, 72 `.w*.webp` внутри `source-images/projects/`, 13 имён есть и как `.jpg`, и как `.webp`. `source-images/README.md` устарел.

## Измерение
- GA4: исключить рефереры `127.0.0.1:8842` и `s246.webhostingserver.nl:2222` (Admin → Data streams → Configure tag settings → List unwanted referrals; внутренний трафик — фильтром) — делает владелец.
- `Phone` в GA4: 3 в июле → 0 в августе–сентябре при кликах по телефону в WP-логе — проверить триггер `tel:` в GTM и consent (кликов мало, вывод предварительный).
- Разметить заявки в WP (qualified / won / lost / spam) — без этого «качественные лиды» не посчитать; через месяц разметки — импорт офлайн-конверсий в Ads по gclid.
- GBP-посты: подтвердить статусы W38 (`published: false`), W39 (`null`, делала облачная рутина), W40 (`false`) в `seo-ops/gbp-posts/log.jsonl`.

## Аналитика (seo-ops)
- Выгрузки seo-ops (недельные сводки, сверки, GBP-черновики) с 2026-09-05 не закоммичены — решить, коммитить ли их регулярно.
- Облачная GBP-рутина и копия skill `gbp-weekly-post` в claude.ai — удалить (делает владелец в claude.ai; в сессиях Claude Code копия видна как `anthropic-skills:gbp-weekly-post`); локальной GBP-рутины сейчас нет.

## Гигиена репозитория
- В git лежат `.lighthouse-tmp/` (574 файла), `.local-cleanup-archive/`, `temp_projects.txt` (устаревшая копия `projects.ts`).
- В рабочем дереве `grep.exe.stackdump` (корень и `seo-ops/`).
- Alt фото проектов: в `etten-leur-gevelisolatie-10cm-ral9010-2025.ts` и `spijkenisse-malledijk-stucwerk-schilderwerk-2024.ts` дефис вместо тире. У Vught имена файлов и `baseName` без ведущего нуля (`-na-1`).
- Не используется `components/sections/related-projects.tsx` (дублирует `srcToBaseName`); поле `subtitle` карточек проектов нигде не выводится; комментарий `// Order:` в `lib/content/projects.ts` устарел; пустая папка `app/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2025/` (вне git).
