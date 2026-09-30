# Знания о проекте для анализа — bm-klus-bv.nl

Факты с датой и источником. Устарел факт — исправь его здесь (с датой), а не пиши новый рядом. Правила анализа — `CLAUDE.md` в этой папке; журнал действий — `data/decision_log_v1.csv`. Пути — от `seo-ops/`, если не сказано иное. Даты в календаре — даты выката на прод (запуски deploy-prod), если не сказано иное.

## Идентификаторы
- GSC: URL-prefix ресурс `https://bm-klus-bv.nl/`; сервисный аккаунт — siteFullUser. Доменный ресурс `sc-domain:` не подтверждён (403).
- GA4: аккаунт 303130737, ресурс 428253147 (Europe/Amsterdam, EUR), measurement id G-TYHS5B24FN.
- Google Ads: аккаунт 590-225-6023, одна поисковая кампания 23271040037 «NL | Gevelisolatie | Search». Доступ через SDK (`integrations/google_ads/`, API v23), MCP нет.
- DataForSEO: Нидерланды — location_code 2528, Роттердам — 1010751, language `nl`.
- WordPress (тот же домен): форма `/wp-json/bm/v1/contact`; BM Stats v2 — `/wp-json/bm-stats/v1/{leads,pageviews,events}` (чтение, токен `BMKLUS_WP_STATS_TOKEN`), beacon сайта — `/wp-json/bm/v1/hit`. Описание — `../docs/WP-STATS-V2-SPEC.md`.
- Ключи и токены: `D:\projects\bmklus\google\` (OAuth, сервисный аккаунт, `google-ads.yaml`, `gbp_token.json`) и `integrations/.env.local`. Только по имени.

## Календарь изменений — границы данных
| Дата | Что изменилось | Как учитывать |
|---|---|---|
| 2026-03-08 | Переезд WordPress → Next.js на том же домене | до — данные старого сайта: только год-к-году, с пометкой |
| 2026-03-15 | Перестройка Ads v1 (CPA вырос до ~€88) | Ads до и после не смешивать |
| 2026-03-27…~04-08 | March 2026 core update (Google) | после него хаб `/gevelisolatie/` упал по «gevelisolatie rotterdam» с 6–11 на 30–50 (W16); корреляция, не доказательство |
| 2026-04-24…05-09 | Конверсии 6 → 0: просадка спроса + подмена conversion action (6769425725 → 6790076058); восстановлено 05-10 | не «поломка трекинга» |
| 2026-05-21…~06-02 | May 2026 core update (Google) | после него показы по «gevelisolatie / buitengevelisolatie rotterdam» исчезли, кластер — на уровне ~200–300 показов в неделю |
| 2026-08-14 | WhatsApp-first CTA на всём сайте + события кликов (`cta-click-tracker.tsx`); коммит 07-19, на прод — 08-14 (между 06-18 и 08-14 выкатов не было) | каналы контакта до/после 08-14 несравнимы |
| 2026-07-20 | Ads v2: +3 группы (фасадный комплекс), +26 минус-слов, бюджет €9 → €13/день | новая база для PPC |
| 08-15…09-04 | Основная категория GBP: «Aannemer» → «Aannemer voor isolatie» | local pack до/после |
| ~2026-09-03 | Профиль GBP заполнен, ссылка на сайт с UTM `?utm_source=google&utm_medium=organic&utm_campaign=gbp` | в GSC главная раздвоилась: в выгрузках seo-ops склеена с 2026-09-29, в интерфейсе GSC и сырых JSON — считать суммой |
| 2026-09-04 (20:58 UTC) | Страницы `/gevel-schilderen/keimen/` и `/muren-stucen/sausklaar-behangklaar/`; атрибуция первого касания (`lib/attribution.ts`); BM Stats v2 — просмотры и CTA-клики с этого дня, заявки с бэкфиллом с 2026-03-11 (статус `archive`) | источники WP до/после 09-04 несравнимы; ревью страниц 2026-10-16 |
| 2026-09-04 (23:25 UTC) | Цены и калькуляторы убраны со всего сайта, 26 title переписаны. Title от 09-04 для `/gevelisolatie/` и `/buiten-stucwerk/` прожили на проде ~2,5 часа — ревью 10-16 оценивает уже эти | см. шаблоны title ниже |
| 2026-09-05 | Beacon сайта переведён на `/wp-json/bm/v1/hit` | — |
| 2026-09-05 | seo-ops начал учитывать Email (`config/conversions.yaml`, `integrations/ga4/landing_page_loader.py`). В GA4 Email — ключевое событие минимум с 2026-03 | границы в данных GA4 нет |
| с 2026-W36 | Еженедельные GBP-посты (W36 Дордрехт; лог `gbp-posts/log.jsonl`) | клики с `utm_content=post-*` |
| 2026-09-15 | 49 ИИ/стоковых изображений заменены реальными фото проектов | — |
| 2026-09-29 | Методика seo-ops: окна GSC кончаются «сегодня − 3» (было «вчера»), главная склеена с UTM-URL из GBP, Email в сводном снапшоте, правила v2 с порогами шума; в query-level CSV тоже склеены URL-варианты, а флаг каннибализации считается по правилу проекта без бренда (было «запрос на 3+ страницах») (не выкат сайта) | недельные сводки и CSV до и после 09-29 сравнивать с поправкой |
| 2026-09-24 | September 2026 spam update (Google) | с 21–24.09 показы сайта ~300 → 104–162 в день — в основном показы keimen, `/gevel-schilderen/`, sausklaar на 19–46 месте по 1–3 в день без кликов (похоже на ботов, уверенность средняя; `reports/seo/site_audit_2026-09-30/`); базу для ревью брать после 21.09 |
| 2026-09-30 (~01:07 NL) | По запросу владельца Google перечитал `/gevel-schilderen/`, `/gevel-schilderen/keimen/`, `/gevelisolatie/kosten/`, `/onze-werken/`. До этого в индексе были версии до 2026-09-04: с ценами и старыми title | для этих страниц «после ретайтла и удаления цен» в выдаче — с 09-30, не с 09-05 |
| 2026-09-30 | seo-ops: еженедельная проверка индексации (URL Inspection всех URL sitemap); позиция страницы по сопоставимым запросам (`like_for_like`) — в сводном снапшоте и в правиле падения позиции (не выкат сайта) | сводки до и после 09-30 по позициям сравнивать с поправкой |

Шаблоны title после 2026-09-04: города — «Gevelisolatie {City} – buitenkant (ETICS)», у шести длинных названий (Capelle aan den IJssel, Alphen aan den Rijn, Hellevoetsluis, Bergen op Zoom, Leidschendam-Voorburg, Hendrik-Ido-Ambacht) — «Gevelisolatie {City} (ETICS)»; с 2026-09-30 исключение — Den Haag: «Gevelisolatie Den Haag – gratis opname (ETICS)» (проба сниппета, ревью 2026-10-28); `/gevelisolatie/` и `/gevel-schilderen/` — «… kosten & offerte», `/buiten-stucwerk/` — «Buitenmuur stucen: kosten, betonstuc & crepi». Источник — `data/sitemap-plan.ts` и `lib/content/gevelisolatie-locations.ts`.

## Как устроено измерение
- Лиды: WP-лог — по строке на каждую принятую форму, статусы new / qualified / won / lost / spam / archive (`archive` — реальные заявки до 09-05 с неизвестным исходом). На 2026-09-24 ни одна заявка не размечена → «качественные лиды» пока не посчитать.
- GA4: `Contact_Form_Site` — триггер GTM на `bm_lead_form_success`; `Phone` / `Whatsapp` / `Email` — триггеры кликов по `tel:` / `wa.me` / `mailto:`. Все зависят от consent. Клик-события `bm_whatsapp_click` / `bm_phone_click` / `bm_email_click` в GTM намеренно не тегируются: link-click триггеры уже есть, иначе двойной счёт. WP-beacon считает CTA-клики без consent.
- GA4 ловит около 80 % форм из WP (56 дней до 2026-09-23, 12 из 15); за 28 дней бывает 100 % — малые числа. Для конверсии знаменатель — WP.
- Конверсии Ads — тег конверсии Ads в GTM на успешной отправке формы (consent, окно клика 30 дней), не импорт из GA4. У WP-лидов до 09-04 источник брался из URL страницы формы: переход с объявления на `/contact/` записан как `direct`, поэтому «ads» в WP до 09-04 — нижняя граница.
- Каналы: источник лида — по WP, объёмы трафика — по GA4; расхождение между ними ожидаемо.
- Известные искажения GA4: рефереры `127.0.0.1:8842` (локальная разработка) и `s246.webhostingserver.nl:2222` (панель хостинга) — 10–16 % сессий и несколько ложных событий; `Phone` в GA4: 3 в июле → 0 в августе–сентябре при кликах по телефону в WP-логе (их мало — вывод предварительный); лендинг `(not set)` — 20–22 сессии за 28 дней стабильно; платный трафик больше органики (28d до 09-23: Paid Search 103 сессии, Organic 65).

## Состояние (сентябрь 2026)
- Поиск, 28 дней до 2026-09-23: 59 кликов, 8 767 показов (+32 % показов почти целиком от двух новых страниц, CTR ≈ 0). Главная (оба URL) — 32 клика; кластер `/gevelisolatie/` — 11 кликов; небрендовая органика — единицы кликов, 3–5 органических лидов за квартал. На старом сайте SEO тоже не давало трафика (год-к-году).
- Лиды, 28 дней до 09-23: 7 заявок в WP (ads 5, campaign 1, organic 1). Ads: расход €278.85, 6 конверсий, CPA €46.48.
- Кластер `/gevelisolatie/`, 90 дней до 2026-09-27 (разбор — `reports/combined/gevelisolatie_cluster_2026-09-30.md`):
  - органика — 32 клика (14 % сайта) и 0 заявок; заявки кластера (8 из 24 в WP) — из Ads (6) и direct (2);
  - «gevelisolatie» — 3 показа, «buitengevelisolatie» — позиция ~34;
  - весной хаб был на 6–11 месте по «gevelisolatie rotterdam» и потерял его после core update в апреле и мае;
  - 15 из 27 страниц кластера не в индексе;
  - по «gevelisolatie rotterdam» в Роттердаме нас видно только через GBP (блок «Gerelateerde websites», 09-30).
- Городские страницы (21, все новые после переезда): за 28 дней 3 клика и ~400 показов, показы есть лишь у 9 из 21. Реальный гео-спрос — «stukadoor {город}» (~3 500/мес по матрице 2026-07-20), у «gevelisolatie {город}» объём ниже порога. Ждёт решения владельца план Wave 1 от 2026-07-20: 5 городов (Rotterdam, Zoetermeer, Leiden, Delft, Dordrecht) + раздел про stukadoor buitenwerk. Массово переписывать все 21 страницу — отклонено.
- Индексация (URL Inspection всех 59 URL sitemap, 2026-09-30). Не в индексе («Gecrawld – momenteel niet geïndexeerd») 19 URL:
  - 13 из 21 городской страницы; в индексе rotterdam, delft, dordrecht, leiden, den-haag, schiedam, vlaardingen, spijkenisse;
  - `/gevelisolatie/materialen/` и `/gevelisolatie/rc-waarde-dikte/`;
  - 4 проекта.

  У 15 проиндексированных страниц в индексе копия от обхода до удаления цен (2026-09-04 23:25 UTC): `/gevel-schilderen/` — обход 07-05, `/gevelisolatie/kosten/` — 08-15, `/onze-werken/` — 08-29, keimen, 9 проектов. Первые четыре Google перечитал 30.09 по запросу владельца. С 2026-09-30 еженедельный сбор проверяет индексацию: `data/processed/index_status_latest.json`.
- `/gevel-schilderen/keimen/`: 04–27.09 — 1 755 показов, 3 клика, поз. 18.3. С 06.09 по 20.09 — ровно 100–125 показов в день на 3–10 месте, с 21.09 — 0–6 в день. В живой выдаче 30.09 по «keimen kosten» страницы нет в топ-30 [DataForSEO]. Последний обход — 04.09 22:07 UTC, до удаления цен: в индексе версия с ценами. Разбор — `reports/seo/home-buiten-stucwerk_diagnosis_2026-09-30.md`.
- `/muren-stucen/sausklaar-behangklaar/`: 414 показов, поз. 36.9; по семейству sausklaar Google пока ставит выше родителя `/muren-stucen/` (взвешенная поз. 26 против 48). Страница живёт с 2026-09-04 — ревью 2026-10-16.
- `/buiten-stucwerk/`: после ретайтла позиция не ухудшилась (исправлено 2026-09-30; прежняя версия этой строки была неверна). Средняя страницы 8.4 → 10.8 (28 дней до 09-26), но по запросам из обоих окон 13.4 → 12.3; среднюю испортили показы на 64–85 месте на неделе 14–20.09. «gevel stucen» — поз. 3–5, 0 кликов из ~40 показов за 8 недель: для KPI CTR данных мало. В живой выдаче 30.09 по «buitenmuur stucen» и «gevel stucen» страницы нет в национальном топ-30 [DataForSEO]; позиции в GSC, вероятно, локальные (Роттердам).
- Внешние факторы (DataForSEO, 2026-09-04): 1 ссылающийся домен (improuse.com, UGC) против 20–3 300 у конкурентов — главный структурный блокер, а не объём текста. Local pack Роттердама: 0 из 5 основных запросов. GBP: 19 отзывов, 4.9 [DataForSEO, 09-04]; 20 отзывов, 5.0 [Places API, 09-29]. Список доноров: `reports/seo/link_prospects_latest.md` (tier A/B/C; начинать с tier B — каталоги, где есть 3+ конкурента). Работа со ссылками на 2026-09-04 не начата.
- Упоминания в ИИ-ответах: ChatGPT не называет бренд ни в одном из 5 локальных запросов (база 2026-09-03).

## Рынок и спрос (NL, Google Ads, в месяц, 2026-08-15)
- gevelisolatie 1 900 (сентябрь 3 600, июль 1 300); buitenmuur isoleren 720; buitengevelisolatie 480; gevelisolatie buitenkant 480.
- stukadoor 9 900; stukadoor rotterdam 480 (CPC €12); muren stucen 2 400; семейство sausklaar/behangklaar ~1 100; plafond stucen 1 000.
- buitenmuur stucen 1 000; betonstuc 880; buiten stucwerk 480; gevel stucen 140.
- семейство keimen ~1 100 (keimen 590, keimwerk 260); buitenmuur verven 1 300.
- gevelrenovatie 5 400 (CPC €7.24), gevelrenovatie rotterdam 210 (CPC €18.20) — страницы нет.
- spachtelputz 6 600 — товарный / DIY-интент, не цель. «gevelrenovatie met folie» — оклейка, не наш интент.
- Сезон: пик сентябрь–март, провал в июле–августе (bouwvak).
- Национальные информационные выдачи и «gevelisolatie kosten» заняты платформами и лидгенами (eigenhuis.nl, milieucentraal.nl, homedeal.nl, сеть Concurrent/Gigant) и AI Overview — туда контентом не пробиваемся. Нишевые kosten-семейства с KPI (keimen kosten) — исключение. «gevelisolatie rotterdam» Google понимает как любую изоляцию (spouwmuur, vloer, dak) плюс субсидии муниципалитетов.

## Услуги и владение запросами
- Услуги: ETICS с отделкой, наружная штукатурка, sierpleister / crepi, покраска фасада и keimen, внутренняя штукатурка. С 2026-07-19 фокус был только на наружных работах; 2026-09-30 владелец решил: интерьер (`/muren-stucen/`) тоже важен и его развиваем, но реальных интерьерных проектов с фото пока нет.
- Внутри: muren stucen, sausklaar, behangklaar. Снаружи: buiten stucwerk, gevel stucen, cementpleister, betonstuc. «stucen» без уточнения — двусмысленно.
- «gevelisolatie afwerking» — страница `/gevelisolatie/afwerkingen/`, не `/sierpleister/`. Sierpleister — часть наружной штукатурки, покраска — не штукатурка. По запросам услуги страница услуги должна быть выше главной.
- Не делаем (кандидаты в минус-слова): dakisolatie, vloerisolatie, spouwmuurisolatie, binnenisolatie, kozijnen, dakgoot. Исключение из практики: проект 2026 в Etten-Leur включал dakrenovatie.
- Зона работ: 80–100 км от Роттердама ярусами — ядро (Rotterdam, Vlaardingen, Schiedam, Spijkenisse, Barendrecht, Ridderkerk, Capelle a/d IJssel, Delft, Dordrecht, Zoetermeer), затем Den Haag, Leiden, Gouda, Hoeksche Waard, Breda, Bergen op Zoom, дальше — где есть проекты.

## Google Ads
- Бюджет €13/день с 2026-07-20, фактический расход ~€10/день. Maximize Conversions без tCPA (tCPA ~€45 — позже), радиус 80 км от Роттердама (presence), BE/DE исключены, только поисковая сеть.
- CPA: до v2 — €240.76 (29 дней), после — €35.65 (30 дней), 28 дней до 09-23 — €46.48. Цель — < €60.
- Исторические конвертеры (кампания 2024–2025, CPA €37–48): buiten stucwerk — CPA €26 (30.5 конв.), gevel van buiten isoleren — €17, gevel stucwerk — €22; интерьер muren stucen — €121 без конверсий.
- Утечки: zelf, wat is, hoe, nadelen, huur, groothandel, leverancier. «subsidie aanvragen» — наблюдать, «kosten» — не минусовать.
- В объявлениях есть цены, противоречащие запрету: применённые 2026-07-20 «Vanaf €35/m² spachtelputz» (группа buiten stucwerk), «Vanaf €25/m²» в заголовке и описании (gevel schilderen); возможно, «vanaf €110» в старых группах (`reports/ppc/ads_restructure_v2_2026-07.md`). Проверить все объявления и ассеты на «€» — не сделано на 2026-09-29.
- Малые числа: CPA — не меньше чем по 10 конверсиям; «пустой» ключ — не раньше 50 кликов и 60 дней без конверсий.

## Решения владельца
- Цены на сайте запрещены (2026-09-05); тема kosten — без цифр.
- Неподтверждённые обещания убрать (2026-09-30): гарантии, «vaste prijs», «geen onderaannemers», сроки (offerte / prijsindicatie / длительность работ), сроки службы, цифры вроде «1200+ gevels». Новые не добавлять без подтверждения владельца.
- Интерьер развиваем (2026-09-30), но без реальных проектов — без выдуманных кейсов и фото «как будто наших».
- WhatsApp — главный канал (обычный WhatsApp, не Business): звонки обслуживать некому из-за языкового барьера. В отзывах трижды упомянута «taalbarrière» — в ответах на отзывы и текстах полезно называть нидерландоязычное контактное лицо.
- WordPress остаётся бэкендом формы и статистики; деплой через CI не меняется.
- Хаб `/gevelrenovatie/` одобрен в принципе, отложен — не строить, пока владелец не попросит.
- Дизайн-проход для страниц keimen и sausklaar — просьба владельца от 2026-09-04, не сделан.
- Показывать живой рейтинг GBP на страницах можно, размечать его в JSON-LD (`AggregateRating`) — нет: по правилам Google отзывы о себе на своём сайте звёзд в выдаче не дают (за 16 месяцев по GSC — ни одного показа со звёздами), разметка убрана 2026-09-30. Звёзды у компании — в карточке GBP, растут только с числом отзывов. Отдельные GBP-листинги с ключевыми словами в названии не создавать (риск блокировки).
- Отклонено, не предлагать снова: пробиваться в национальные информационные выдачи; страница под spachtelputz; «folie»; массовое переписывание городских страниц или money pages; подписки Semrush / Ahrefs / aisa.one (DataForSEO хватает, расход за апрель–сентябрь — единицы долларов); Bing Webmaster; работа по PageSpeed/CrUX без сигнала проблемы; отдельные посадочные для Ads; A/B-тесты при таком бюджете; тегирование `bm_*` в GTM.

## KPI плана 2026-08-15
| К дате | Показатель | База 08-15 | Цель |
|---|---|---|---|
| 2026-11-15 | ссылающиеся домены | 1 | ≥ 12 |
| | отзывы GBP | 19 | ≥ 32 |
| | local pack Роттердам (5 запросов) | 0/5 | ≥ 1/5 |
| | семейство «keimen kosten», позиция | 27–42 | ≤ 20 |
| | семейство sausklaar, клики за 90 дней | 0 | ≥ 20 |
| | «buitengevelisolatie» на `/gevelisolatie/` | 46.5 | ≤ 25 |
| | CTR «gevel stucen» | ~1 % | ≥ 4 % |
| 2027-02-15 | ссылающиеся домены / отзывы / local pack | — | ≥ 25 / ≥ 50 / ≥ 2/5 |
| | небрендовые органические ключевые события за 90 дней | 3–5 | ≥ 12 |
| | Labs ETV | ~6 | ≥ 60 |

## Где подробности
- План и диагноз: `reports/combined/final_seo_improvement_plan_2026-08-15.md`, `strategy_v2_draft_2026-07-19.md`, `seo_ops_system_audit_2026-09-04.md`, `action_plan_2026-09-04.md`.
- Ads: `reports/ppc/ads_restructure_v2_2026-07.md`. Цены: `reports/seo/price_removal_*`. Сверка лидов: `reports/audits/lead_reconciliation_*`.
