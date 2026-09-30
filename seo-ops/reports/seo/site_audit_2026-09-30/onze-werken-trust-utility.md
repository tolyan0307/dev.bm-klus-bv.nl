# Аудит trust / utility страниц: /onze-werken/ + 20 проектов, /over-ons/, /diensten/, /contact/

Дата: 2026-09-30. Только чтение, правок в репозитории нет. DataForSEO не использовался ($0).

**Источники и свежесть**
- GSC: MCP `search_analytics`, окно 2026-06-30…2026-09-27 (90d, page-level, web + image); query-level CSV `gsc_query_page_last90d.csv` (сбор 2026-09-29, анонимные запросы не видны).
- GA4: `ga4_landing_pages*_last90d.csv` (сбор 2026-09-29).
- WP: `reports/pages/wp_stats_last90d.md` (07-01…09-28; просмотры есть только с 09-04).
- Индексация: `index_status_latest.json` (URL Inspection, 2026-09-29 23:13 UTC).
- Сборка `out/` (2026-09-30 13:57) и технический краул (временный скрипт сессии, не сохранён) (61 страница).
- Исходники: `app/onze-werken/**`, `lib/content/projects*.ts`, `app/{over-ons,diensten,contact}/page.tsx`, `lib/seo/schema.ts`, `components/contact/LazyGoogleMap.tsx`.

**Масштаб маленький.** У 20 проектов вместе 6 веб-кликов за 90 дней. Любое «растёт / падает» по отдельному проекту — шум.

---

## 1. Факты

### 1.1 Трафик и роль страниц
| Страница | Клики / показы, web | Показы, image | Сессии организики, GA4 | Лид-события, WP |
|---|---|---|---|---|
| /contact/ | 8 / 391, поз. 3.7 | — | 7 | 6 |
| /over-ons/ | 7 / 462, поз. 5.2 | — | 6 | 1 |
| /diensten/ | 4 / 346, поз. 4.7 | — | 3 | 1 |
| /onze-werken/ | 3 / 555, поз. 8.4 | 5 кл. / 118 | 14 | 1 |
| 20 проектов вместе | 6 / ≈560 | 6 кл. / ≈450 | ≈18 | 0 |

Метки: `[GSC, 90d, page]` · `[GA4, 90d, landing]` · `[WP, 90d, event]`.

- **Utility-страницы живут на бренде.** Почти все их клики — по «bm klus bv» и вариантам (`[GSC, 90d, query]`: over-ons 7 из 7, contact 2 из видимых 2). Это сайтлинки бренда, а не SEO-трафик.
- **Хаб /onze-werken/ ловит локальный long-tail там, где нет городских страниц** `[GSC, 90d, query]`:
  - «buitenstucwerk vught» — 25 показов, поз. 9.8;
  - «renovatie buitenschil rotterdam» — 59 показов, поз. 17;
  - «scheurherstel vught» — 9 показов, поз. 18;
  - «gevelspecialist vught» — 5 показов, поз. 31.
- **Проекты по отдельности** `[GSC, 90d, page]`:
  - заметные — Etten-Leur 10 cm (3 клика, 83 показа, поз. 6.7), Etten-Leur Bankenstraat (1 / 101), Halsteren (0 / 157, по «buitenstucwerk» поз. ~70, «schildersbedrijf halsteren» — 16 показов, поз. 20);
  - Delft: 42 показа приходят по «plafondrestauratie delft» — это чужой интент;
  - в картинках проекты получают больше внимания, чем в веб-поиске: Etten-Leur 6 cm — 4 клика из 133 показов.
- **Лиды:** со страниц проектов 0 `[WP, 90d]`.

### 1.2 Индексация (`index_status_latest.json`)
- В индексе: 16 из 20 проектов, хаб, over-ons, diensten, contact.
- Не в индексе («Crawled – currently not indexed»):

| Проект | Последний обход | Контекстные входящие | Слов (краул) |
|---|---|---|---|
| hendrik-ido-ambacht-gevelrenovatie-2024 | 07-25 (66 дн.) | 1 (хаб) | 544 |
| katwijk-gevelisolatie-6cm-sierpleister-2024 | 04-26 (156 дн.) | 1 (хаб) | 452 |
| klaaswaal-gevelisolatie-6cm-sierpleister-2025 | 06-14 (107 дн.) | 1 (хаб) | 511 |
| vlaardingen-gevelisolatie-6cm-sierpleister-2024 | 05-01 (151 дн.) | 2 (хаб + /gevelisolatie/vlaardingen/) | 390 |

- У Vlaardingen-6cm: `google_canonical: null`, `indexing_state: INDEXING_STATE_UNSPECIFIED` — Google, похоже, так и не обработал страницу до конца.
- Технических причин нет: robots allowed, fetch successful, canonical свой.
- Литеральных дублей нет. Сходство по 5-граммам после вычета шаблона — максимум 0.09 (Bruinisse ↔ Dordrecht); у четырёх непроиндексированных 0.03–0.06 (мой расчёт по `out/`).
- **Входящие ссылки не объясняют разницу:** у 9 проиндексированных проектов тоже ровно 1 контекстная входящая (хаб).

### 1.3 Внутренние ссылки (краул `out/`, контекстные — вне header/nav/footer)
- **Money pages не ссылаются ни на один проект.** `/gevelisolatie/`, `/buiten-stucwerk/`, `/sierpleister/`, `/gevel-schilderen/`, `/muren-stucen/` ссылаются только на хаб `/onze-werken/`. При этом `buiten-stucwerk`, `sierpleister` и `gevel-schilderen` показывают фото проектов (`dir="/images/projects"`), но без ссылки на сам проект.
- **Кто ссылается на проекты, кроме хаба:**
  - главная — 4 проекта 2026 года;
  - `/gevelisolatie/afwerkingen/` — Halsteren, Nieuw-Beijerland, Dordrecht;
  - `/gevel-schilderen/keimen/` — Delft;
  - `/muren-stucen/sausklaar-behangklaar/` — Spijkenisse;
  - городские страницы — только dordrecht, vlaardingen (Vlaardingen-6cm) и rotterdam (Julianastraat). Слаги захардкожены в `app/gevelisolatie/[location]/page.tsx` (строки 612–700).
- **13 из 20 проектов** получают ссылку только с хаба.
- **Упущенные пары «город ↔ проект»** — городская страница есть, проект в том же месте есть, ссылки нет:

| Городская страница | Проект | Статус городской страницы |
|---|---|---|
| /gevelisolatie/delft/ | Delft Willemstraat | в индексе |
| /gevelisolatie/hendrik-ido-ambacht/ | H-I-A gevelrenovatie | обе не в индексе |
| /gevelisolatie/bergen-op-zoom/ | Halsteren (Halsteren входит в gemeente Bergen op Zoom) | — |
| /gevelisolatie/rotterdam/ | Rotterdam buitenstucwerk; возможно Rottekade — см. 1.6 | — |
| /gevelisolatie/vlaardingen/ | Vlaardingen 10 cm (сейчас там только 6 cm) | — |

- **Исходящие с проектов:** `/contact/`, хаб и 2–3 money pages. На связанные проекты, городские и кластерные страницы (afwerkingen, keimen, rc-waarde-dikte) ссылок нет. Исключение — Dordrecht → /gevelisolatie/dordrecht/.
  - Правило `content-nl.md` для проектов: «ссылки только на страницы услуг», так что это соответствует правилу.
  - Компонент `components/sections/related-projects.tsx` не подключён.
- **Сравнение с аудитом 2026-09-03:**
  - анкоры «Meer info» на /diensten/ исправлены (теперь «Meer over …»);
  - входящие на /contact/ 50 → 59, на /over-ons/ 28 → 30;
  - добавился проект Strijen (ссылка с главной);
  - главное не изменилось: у проектов по-прежнему 1–3 входящие, money pages на проекты не ссылаются.

### 1.4 Покрытие услуг проектами (`serviceTypes` в `lib/content/projects.ts`)
| Услуга | Проектов | Замечание |
|---|---|---|
| gevelisolatie (ETICS) | 14 | |
| sierpleister | 16 | обычно поверх ETICS; без утепления — только Halsteren |
| buiten stucwerk | 6 | Strijen, Delft, Dordrecht, Halsteren, H-I-A, Rotterdam |
| gevel schilderen | 6 | |
| muren stucen (binnen) | 1 | Spijkenisse |
| keimen | 0 | |
| betonstuc | 0 | |
| crepi | 0 | явно не названо |
| steenstrips | — | только как деталь плинтуса (Dordrecht, Vlaardingen 10 cm) |

Ни один проект не ссылается на `/gevel-schilderen/keimen/` или `/gevelisolatie/afwerkingen/`.

### 1.5 Мета и заголовки
- **11 из 20 title обрезаны символом «…» прямо в `<title>`** (краул, `titleLen` 59–60). Это Almere, Bruinisse, Dordrecht, Katwijk, Klaaswaal, Nieuw-Beijerland, Rottekade, Rotterdam-buitenstucwerk, оба Vlaardingen и Vught — совпадает с `docs/BACKLOG.md`.
  - Пример: `Katwijk gevelisolatie 6 cm & sierpleister – pr… | BM klus BV` (обрывается на «project»).
- Все description ≤ 160, у каждой страницы один H1.
- Title utility-страниц в лимите: contact 40, over-ons 49, diensten 53, хаб 52 — все с суффиксом.

### 1.6 Schema (JSON-LD из `out/`)
- **Проекты: BreadcrumbList + Article (+ VideoObject у двух проектов)**, без HomeAndConstructionBusiness.
  - `author`, `publisher` и `VideoObject.publisher` — только `{"@id": ".../#business"}`, а сущности с этим @id на странице нет. Ссылка висит в пустоте: у автора нет name.
  - `datePublished` = `${year}-01-01` у всех 20 (`lib/seo/schema.ts`, projectPageSchema). Это выдуманная дата: проекты 2026 года «опубликованы» 1 января, до выполнения работ.
  - `contentLocation` — только name и страна, без addressLocality. У Rottekade стоит `name: "Rottekade"`.
  - Изображения из Article существуют в `out/` (проверено по всем 20).
- **HomeAndConstructionBusiness** на /, /onze-werken/, /over-ons/, /diensten/, /contact/ — один и тот же объект, дублей внутри страницы нет. Замечания:
  - **geo 51.9225, 4.4792**, а карта на /contact/ (`LazyGoogleMap.tsx`) стоит на 51.9008, 4.4663. Индекс 3081 HE (Bonaventurastraat) — южный берег, Charlois / Tarwewijk. Координаты в схеме, скорее всего, — центр Роттердама. Уверенность средняя: сверить с точкой GBP.
  - В `sameAs` личный LinkedIn (`/in/boris-mitov-…`) — это не профиль компании. Ссылки на карточку GBP (Maps) нет ни в `sameAs`, ни в `hasMap`.
  - KvK 77356039 выведен на страницах, но в схеме нет `identifier`.
  - `telephone` +31612079808 — одинаковый во всех блоках. `openingHours` пн–сб 9–18 совпадает с /contact/.
  - Адрес в схеме, на /contact/ и в ContactPage совпадает.
- **ContactPage.mainEntity** — отдельная `Organization` без `@id`, с повтором NAP. Для Google это вторая сущность, не связанная с `#business`.
- **CollectionPage** на хабе без `mainEntity` / `hasPart` — список проектов в разметке не описан. Некритично.
- **/diensten/ ItemList:** 6-й пункт «Schoonmaak na verbouwing» ведёт на `/contact/`. Такой услуги нет в `knowledge.md`.
- **Sitemap:** `lastmod` у всех 59 URL = время сборки (2026-09-30T13:57:43Z). Для Google такой lastmod ничего не значит, а это единственный способ подсказать, что старые копии (Katwijk — обход 156 дней назад) пора перечитать.

### 1.7 Изображения
- «1 img без alt» на каждом проекте — это **фоновое hero-фото**: `<img … alt="" aria-hidden="true">`, фото `*-na-01`. Пустой alt стоит намеренно, по правилам доступности это верно.
- То же фото есть в галерее с alt по шаблону `[City] [service] – na de werken foto 01 (year)`. Потерь для поиска картинок нет. Уверенность высокая.
- На /diensten/ то же самое: декоративный фон `process-hero` с opacity 0.06.
- Одно фото повторяется в DOM 2–3 раза (hero + превью карусели + галерея), например `katwijk-…-voor-01` дважды, `na-01` трижды.

### 1.8 E-E-A-T и тексты (нидерландские цитаты — с переводом)
**Хорошо**
- Реальные фото «до / после» по каждому проекту (с 09-15 без ИИ-изображений).
- Адрес, KvK 77356039 и VCA* выведены.
- На /contact/ WhatsApp стоит первым («WhatsApp · snelste reactie» — «WhatsApp — самый быстрый ответ»), есть карта и часы работы.
- Структура проекта фактическая: werkzaamheden → beginsituatie → resultaat → materialen.

**Не хватает**
- Нет ни одного человека: ни имени, ни фото контактного лица или команды, ни года основания. Про нидерландоязычное контактное лицо `knowledge.md` советует писать прямо: в трёх отзывах упомянут языковой барьер.
- В проектах нет отзыва клиента или ссылки на конкретный отзыв Google, нет m² и сроков (кроме Almere «ca. 35 m²»), нет типа или года постройки дома.

**Внутренние повторы в проектах.** Одни и те же 3–4 факта повторяются в четырёх списках (heroBullets, werkzaamheden, detailCards, materialen). В Katwijk «hoekprofielen» и «keramische raamdorpels» (угловые профили, керамические отливы) встречаются по 4–5 раз. Шаблонные фразы:
- «Wens voor betere uitstraling» — «желание лучше выглядеть»;
- «Onderhoudsarme, moderne gevelafwerking» — «необслуживаемая современная отделка».

Это типичный признак «тонкого» контента: слов 400–600, а уникальной информации мало.

**Неподтверждённые обещания и расхождения с правилами** (правки — только с согласия владельца):

| Где | Фраза (nl) | Перевод | Проблема |
|---|---|---|---|
| /contact/ | «binnen één werkdag een duidelijke prijsindicatie» | за один рабочий день — понятный ориентир цены | срок + цена до осмотра; противоречит «prijs na opname» |
| хаб, FAQ и JSON-LD | «We nemen binnen één werkdag contact met u op» | свяжемся в течение рабочего дня | срок (есть в BACKLOG) |
| /diensten/ | «Offerte binnen 48 uur», «Offerte binnen 24–48 uur (na opname)» | предложение за 48 / 24–48 ч | сроки (есть в BACKLOG) |
| /diensten/, FAQ | «binnen 2-4 weken … 2-3 dagen … 1-2 weken» | начнём через 2–4 недели, работы 2–3 дня / 1–2 недели | сроки; **в BACKLOG нет** |
| /diensten/ | «Oplevering & garantie … bieden garantie op materiaal en uitvoering» | даём гарантию | гарантия не подтверждена (FAQ там же аккуратнее: «per project schriftelijk» — «письменно по каждому проекту») |
| /diensten/ | «Verlaagt stookkosten en verbetert uw energie-label» | снижает расходы на отопление | безусловная экономия → нужно «kan leiden tot» |
| /diensten/ | «vaste prijs per m²», «Jarenlange ervaring» | фиксированная цена за м², многолетний опыт | обещание, опыт не подтверждён |
| /over-ons/ | «Geen onderaannemers», «Eigen team» | без субподрядчиков, свой штат | факт о бизнесе — подтвердить |
| /over-ons/ | «U weet vooraf … wat het kost en wanneer het klaar is» | заранее знаете цену и срок | обещание |
| /over-ons/ | «Gecertificeerde materialen … jarenlang meegaat», «lagere energierekening» | сертифицированные материалы, служит годами, ниже счёт | безусловные утверждения |
| /over-ons/, FAQ | «via het contactformulier of telefonisch» | через форму или по телефону | противоречит WhatsApp-first |
| хаб, FAQ Q4 | «zonder harde categoriefilter … Filteropties voegen we toe» | без фильтра, фильтры добавим позже | на странице фильтр уже есть — ответ устарел |
| хаб, «Onze diensten» | «Muren stucen — Binnen & buiten» | внутри и снаружи | muren stucen — только интерьер |
| хаб, hero / contact | «(±100 km)» | — | стандарт — «±80–100 km» |

- **Телефон в двух форматах:** «+31 6 12 07 98 08» (hero, /contact/ ×8) и «+31 6 1207 9808» (модалка, остальные страницы). Пункт уже есть в BACKLOG.
- **Данные проектов** (есть в BACKLOG):
  - Almere: в схеме год 2024, в карточке 2025, в H1 «2024–2025»;
  - Spijkenisse: «Spijkenisse» против «Spijkenisse (Malledijk)»;
  - Rottekade подана как город. Предположение: это улица в Роттердаме — тогда проект роттердамский, и это сигнал для Rotterdam. Уверенность низкая, спросить владельца.

---

## 2. Интерпретация
1. **Проекты почти не подкрепляют money pages** (высокая уверенность). Это главный пробел. Доказательства работ есть, но со страниц услуг к ним ведёт только общий хаб. Посетитель `/buiten-stucwerk/` — вторая страница по просмотрам и 6 лид-событий `[WP, 90d]` — не видит ни одного из 6 проектов по штукатурке. Google тоже не видит связи «услуга ↔ выполненный объект».
2. **Четыре проекта вне индекса — скорее вопрос ценности, чем техники** (средняя уверенность):
   - 3 из 4 — однотипные «gevelisolatie 6 cm & sierpleister 1,5 mm» в городах без спроса и без ссылок; H-I-A — в городе, где и городская страница вне индекса;
   - при 1 ссылающемся домене Google индексирует слабые страницы выборочно — та же картина у 13 городских;
   - копии давние (апрель–июль), после замены фото 09-15 Google их не перечитывал.
   Потеря трафика мала: проекты — это доверие и long-tail, а не отдельные посадочные.
3. **Utility-страницы работают на бренд.** Их SEO-роль — доверие и сайтлинки. Растить на них небрендовый трафик не нужно, важнее точность фактов и NAP (высокая уверенность).
4. **Schema технически валидна, но «рыхлая»:** висящие @id, выдуманные даты, вторая Organization, сомнительный geo. Звёзд и rich results это не даст, зато чистит сущность компании для локального поиска (уверенность в пользе — низкая–средняя).
5. **Главные риски E-E-A-T** — неподтверждённые сроки и гарантии, отсутствие людей и отзывов в проектах, повторы текста (средняя уверенность).

## 3. Гипотезы и как проверить
| Гипотеза | Проверка |
|---|---|
| H1. Ссылки с money pages и городских страниц на проекты ускорят индексацию и перечитывание проектов | через 4–6 недель после выката: `index_status_latest.json` (4 проекта; `days_since_crawl` у 9 устаревших копий) |
| H2. Проекты на страницах услуг поднимут вовлечение на money pages | WP-просмотры переходов money → проект; клики на WhatsApp / форму с этих страниц `[WP]`. Данных мало — смотреть через 8 недель, без процентов |
| H3. Vlaardingen-6cm Google считает «второй» страницей того же города и услуги | после «Request indexing» — если снова «Crawled – not indexed», а Vlaardingen-10cm в индексе, объединение или сильная дифференциация |
| H4. Хаб ранжируется по «{услуга} {город}» для городов проектов без городских страниц (Vught, Halsteren) | GSC query × page по хабу раз в месяц; если растёт — аргумент за ссылки хаб → проекты с анкорами «{услуга} {город}» |

---

## 4. Блоки, которые добавляют вес без пользы (только список — облегчать позже)
- **/over-ons/:** шаги «Onze aanpak» отрисованы дважды (мобильная и десктопная версии в DOM, «Opname & inventarisatie» ×2).
- **/diensten/:**
  - «Keuzehulp — Kies op resultaat» ×2;
  - карточка ETICS ×4 (рейл, деталка, keuzehulp);
  - список услуг повторяется трижды подряд (рейл, карточки с тегами, keuzehulp);
  - плитка статистики «21+ Steden», «6 Diensten»;
  - «– Reviews» до загрузки JS: в статическом HTML прочерк.
- **Хаб /onze-werken/:**
  - «Wat u kunt verwachten» (4 общих пункта) и фраза «Projecten worden stap voor stap toegevoegd» («проекты добавляются постепенно»);
  - блок «Onze diensten», дублирующий навбар;
  - FAQ Q3 «Kan ik een project indienen voor publicatie?» («можно ли прислать проект для публикации?») и устаревший Q4;
  - «Werkgebied» — список городов, который повторяется на других страницах;
  - оглавление «Inhoud» на 3 пункта.
- **Проекты:**
  - один и тот же набор фактов в 4 списках;
  - hero-фото повторяется в карусели и галерее (2–3 `<img>` на одно фото);
  - 14–54 `<img>` на страницу, HTML ~157 КБ (Katwijk);
  - одна обёртка `below-fold` на весь контент (есть в BACKLOG).
- **Сквозное:** разметка QuoteModal с формой в DOM каждой страницы (нужна для `#offerte`, но это текст формы в main); trust-плашка «KVK geregistreerd · VCA gecertificeerd · Gratis opname» на каждой странице.

---

## 5. Рекомендации владельцу (по приоритету)

| # | Что сделать | Ожидаемый эффект | Как измерить | Ревью |
|---|---|---|---|---|
| 1 | **Проекты на money pages.** На `/buiten-stucwerk/`, `/gevel-schilderen/`, `/sierpleister/`, `/gevelisolatie/` сделать фото проектов, которые там уже стоят, ссылками на сами проекты. Плюс 2–3 карточки проектов по этой услуге (buiten-stucwerk: Delft, Halsteren, H-I-A, Rotterdam; gevel-schilderen: Delft, Etten-Leur 10 cm, Rottekade). Не CTA-блок, а «Uitgevoerde projecten» («выполненные проекты») рядом с блоком доверия. Нужен план и «давай» | доказательства на страницах, где рождаются лиды; +3–5 входящих у проектов | индексация проектов, просмотры проектов из WP | 2026-11-15 |
| 2 | **Город → проект автоматически по полю city**, вместо хардкода трёх слагов: Delft, H-I-A, Bergen op Zoom (Halsteren), Rotterdam (+ buitenstucwerk), Vlaardingen (+10 cm). Совпадает с Wave 1 (Rotterdam, Delft, Dordrecht) и закрывает вопрос BACKLOG о перелинковке | местное подтверждение на городских страницах; ссылки для H-I-A и Halsteren | index_status городских и проектов | 2026-11-15 |
| 3 | **Title 11 проектов — до 47 символов**, без «…». Пример: «Katwijk: gevelisolatie 6 cm & sierpleister» («Катвейк: утепление 6 см и декоративная штукатурка», 42 симв.) | аккуратный сниппет; мелочь, но дёшево | — | — |
| 4 | **Проверить у владельца и затем решить по фактам:** точку GBP (geo в схеме, см. 1.6); ссылку на карточку GBP (для `sameAs` / `hasMap`); подходит ли личный LinkedIn в `sameAs`; «Schoonmaak na verbouwing» — реальная ли услуга; Rottekade — улица в Роттердаме или отдельное место | согласованность NAP и сущности для local pack (эффект небольшой, но это основа) | — | — |
| 5 | **Schema-чистка (техническая, одним коммитом):** в проектах author / publisher с name (или полный `localBusinessSchema` на странице); реальная `datePublished` или без неё; `contentLocation.address.addressLocality`; ContactPage → `mainEntity: {"@id": "#business"}`; `identifier` KvK. Заодно убрать ветку AggregateOffer (есть в BACKLOG) | чистая связанная сущность, без выдуманных дат | Rich Results Test / Schema validator — 0 предупреждений | после выката |
| 6 | **Обещания на /contact/, /diensten/, /over-ons/ и в хабе** (таблица в 1.8): владелец подтверждает или убирает. Новое к BACKLOG — «binnen 2-4 weken / 2-3 dagen / 1-2 weken», «bieden garantie», «Geen onderaannemers», «vaste prijs per m²», «telefonisch» в FAQ, устаревший FAQ про фильтр, «Muren stucen — Binnen & buiten» | снимает риск «обещал — не выполнил» и противоречия правилам | — | до 2026-10-16 |
| 7 | **E-E-A-T-факты от владельца** `[MISSING_BUSINESS_INPUT]`: имя и фото нидерландоязычного контактного лица, год основания, фото команды на объекте. По каждому новому проекту — m², срок, тип дома и ссылка на соответствующий отзыв Google (если клиент его оставил). Для 20 старых — только то, что владелец помнит точно | доверие посетителя, уникальный контент проектов | — | по мере поступления |
| 8 | **4 непроиндексированных проекта:** после пунктов 1–3 нажать в GSC «URL-inspectie → Indexering aanvragen» для всех четырёх (плюс 9 проектов с копией старше 30 дней). Если к 2026-12-15 не в индексе — решить, объединять ли однотипные (Vlaardingen-6cm ↔ Vlaardingen-10cm). Страницы не удалять: для посетителей они полезны | индексация 16 → 18–20 | `index_status_latest.json` | 2026-12-15 |
| 9 | **Сократить повторы в шаблоне проекта:** detailCards только с новыми фактами, иначе блок не показывать — нужно менять skill `add-project`. Реальный `lastmod` в sitemap по дате изменения страницы | меньше «тонкого» веса; полезный сигнал для перечитывания | — | отдельной задачей |

Что **не** предлагаю:
- отдельные страницы или SEO под Katwijk, Klaaswaal и другие города проектов — спроса нет;
- массово переписывать 20 проектов;
- AggregateRating — отклонено владельцем.

---

## 6. Ограничения
- Query-level CSV не содержит анонимных запросов: у проектов видно ≈40 % показов из page-level.
- Просмотры WP есть только с 09-04; проекты — единицы просмотров, коэффициенты не считаются.
- Краул сделан по локальной сборке `out/` от 2026-09-30 (включает незадеплоенный коммит Den Haag); прод может отличаться в мелочах.
- Координаты по индексу 3081 HE оценены примерно — проверить в GBP / Maps.
- Статус Rottekade как роттердамской улицы — предположение, не проверено.
- DataForSEO не вызывался ($0).
