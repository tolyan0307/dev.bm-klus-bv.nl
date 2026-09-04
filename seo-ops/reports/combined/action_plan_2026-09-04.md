# План действий — bm-klus-bv.nl, 2026-09-04 → 2026-10-16

**Основание:** аудит системы `seo_ops_system_audit_2026-09-04.md`, план `final_seo_improvement_plan_2026-08-15.md`, проверка подключений 2026-09-04.
**Принцип:** сначала истина о лидах и исполнение уже принятых решений, потом упрощение системы. Ничего не перестраивать, пока не крутится цикл «действие → измерение».
**Владельцы:** О = владелец бизнеса / сайта, C = Claude в этом репозитории.

---

## Обзор по неделям

| Неделя | Трек A: измерение | Трек B: исполнение плана | Трек C: система | Трек D: локальный слой |
|---|---|---|---|---|
| 1 (7–13 сен) | A1 плагин WP v2, A3 GTM-триггеры | B1 тайтлы, B5 старт ссылок Tier B | — | D1 GBP-пост недели |
| 2 (14–20 сен) | A2 загрузчик WP в seo-ops, A4 сверка лидов | B2 keimen-страница | C1 единый рефреш | D2 Q&A и Services в GBP |
| 3 (21–27 сен) | A5 импорт конверсий в Ads | B3 sausklaar-страница, ссылки Tier A | C2 правила v2 | GBP-пост |
| 4 (28 сен–4 окт) | — | ссылки, отзывы | C3 еженедельный отчёт с журналом действий | GBP-пост |
| 5–6 (5–16 окт) | — | ссылки, отзывы | C4 чистка, C5 автозапуск | Контрольный снимок local pack |

Первый контрольный срок плана от 15 августа: **2026-11-15** (≥12 ссылающихся доменов, ≥32 отзыва, keimen-страница в индексе, sausklaar ≥20 кликов/90d).

---

## Трек A — Измерение: истина о лидах

### A1. Плагин WordPress `bm-stats` v2 — О (разработчик WP), 1 день

Расширить существующий MU-плагин. Он уже принимает форму (`/wp-json/bm/v1/contact`) и beacon просмотров (`/wp-json/bm-stats/v1/pageview`). Нужно: хранить, а не только показывать, и отдавать наружу.

**Таблица `wp_bm_leads`** (одна строка на отправку формы):

| Поле | Тип | Откуда |
|---|---|---|
| id, created_at (UTC) | | сервер |
| source | `contact_form` / `quote_modal` | payload формы |
| page_url, referrer | text | payload (см. A1.1) |
| utm_source, utm_medium, utm_campaign, utm_content, gclid | text, nullable | payload |
| service, city | text | поля формы, если есть |
| name, phone, email, message | как сейчас | форма |
| status | `new` / `spam` / `qualified` / `won` / `lost`, default `new` | **редактируется в админке** |
| turnstile_ok, honeypot_hit | bool | сервер |

Статус нужен, чтобы считать не отправки, а квалифицированные лиды. Без него любая сверка бессмысленна.

**Таблица `wp_bm_pageviews`** (beacon уже шлёт `url` и `referrer`):

| Поле | Тип |
|---|---|
| id, ts (UTC) | |
| url, path, referrer | text |
| utm_source, utm_medium, utm_campaign, gclid | text, парсить из url |
| visitor_hash | sha256(IP + User-Agent + дата), без cookie |
| is_bot | bool по User-Agent |

**REST read-эндпоинты**, только GET, авторизация заголовком `X-BM-Token` (секрет в `wp-config.php`), JSON:

```
GET /wp-json/bm-stats/v1/leads?from=YYYY-MM-DD&to=YYYY-MM-DD
GET /wp-json/bm-stats/v1/pageviews?from=&to=&group=day|path|source
GET /wp-json/bm-stats/v1/summary?days=28
```

`summary` возвращает: leads по статусам, по source, по utm_medium; pageviews по дням; уникальные visitor_hash по дням. Без персональных данных в `summary` и `pageviews`; в `leads` — без message, phone, email (только id, дата, статус, source, атрибуция).

**A1.1. Правка на сайте** — C, 30 мин: в `ContactFormCard.tsx` и `quote-modal.tsx` добавить в payload `page_url`, `referrer`, `utm_*`, `gclid` (из `sessionStorage`, куда beacon складывает первые UTM сессии). Проверить, что сейчас отправляется.

**A1.2. Ретро-заполнение**: если у текущего плагина есть история отправок (письма или строки), импортировать с 2026-03-08 со статусом `new`, владелец проставляет статусы за последние 90 дней. Это даёт базу для сверки.

### A2. Загрузчик WP в seo-ops — C, полдня

`integrations/wp/stats_loader.py` (токен из `.env.local` как `BMKLUS_WP_STATS_TOKEN`), `analyzers/pages/build_wp_snapshot.py` → `snapshots/normalized/wp/leads_last90d.csv`, `pageviews_daily_last90d.csv`. Включить в единый рефреш (C1).

### A3. GTM: триггеры для событий кликов — О, 30 мин

В контейнере: триггер Custom Event для `bm_whatsapp_click`, `bm_phone_click`, `bm_email_click` → тег GA4 Event с тем же именем → в GA4 пометить как key events. Старые `Whatsapp` / `Phone` оставить до конца сентября для сравнения, потом отключить, чтобы не удваивать. Проверка: события появляются в GA4 Realtime при клике.

### A4. Сверка лидов — C, 2 часа

Отчёт `reports/audits/lead_reconciliation_2026-09.md`: WP leads (по статусам) vs GA4 key events vs Ads conversions по дням и каналам с 2026-06-01. Закрывает открытый вопрос «4 → 19 → 0 событий» и даёт коэффициент недоучёта GA4.

### A5. Конверсии в Google Ads — О, 1 час

Импортировать GA4 key events `Contact_Form_Site` и `bm_whatsapp_click` как конверсии кампании 23271040037 (если ещё не). Второй этап после месяца данных: офлайн-импорт квалифицированных лидов из WP по `gclid`.

---

## Трек B — Исполнение плана 15 августа

| # | Действие | Владелец | Трудозатраты | Проверка |
|---|---|---|---|---|
| B1 | Тайтлы `/gevelisolatie/` и `/buiten-stucwerk/` по плану (B3/B4 плана), PR в main | C | 1 час | GSC CTR по «gevel stucen» через 6 недель ≥4% (сейчас ≈1% при поз. 3) |
| B2 | Страница `/gevel-schilderen/keimen/`: цены keimwerk, KEIM vs siloxaan, когда подходит, FAQ из GSC-запросов; внутренние ссылки с родителя и `/gevelisolatie/afwerkingen/`. По `docs/ADD-PROJECT.md`-подобному scope lock: 5 файлов | C пишет, О проверяет цены | 1 день | Индексация ≤2 недели; позиция по «keimen kosten» ≤20 к 15.11 |
| B3 | Страница `/muren-stucen/sausklaar-behangklaar/`: разница, цена за м², FAQ; родитель остаётся на «muren stucen kosten» | C, О | 1 день | ≥20 кликов/90d к 15.11 |
| B4 | Пересмотр `/muren-stucen/`: 1462 показа, 0 кликов, поз. 27 — тайтл и первый экран под «muren stucen kosten / stukadoor» (pending с апреля) | C, О | 2 часа | CTR > 0 в следующие 28 дней |
| B5 | Ссылки, Tier B из `reports/seo/link_prospects_latest.md`: 35 каталогов и площадок, где стоят 3+ конкурента. NAP как в GBP, анкор — бренд | О | 3 часа/неделю | DataForSEO referring_domains ≥12 к 15.11 |
| B6 | Ссылки, Tier A: 10 ручных обращений (bouwnu.nl, bouwencyclopedie.nl, wonen.nl, komo.nl, regionaalenergieloket.nl, energieloket Zoetermeer, ikbenbint.nl, purperinterior.nl, in2klussen.nl, bedrijvenopdekaart.nl) | О, C готовит письма nl-NL | 2 часа/неделю | 3–5 ссылок за 6 недель |
| B7 | Отзывы: QR/короткая ссылка после каждой oplevering; ответ на каждый отзыв | О | постоянно | 19 → 32 к 15.11 |
| B8 | Каждое действие — строка в `data/decision_log_v1.csv` с датой, ожидаемым эффектом и `review_after` | C при каждом PR | 5 мин | журнал не отстаёт больше чем на неделю |

Не делать (подтверждено планом): национальные информационные запросы, spachtelputz-страница, переделка городских страниц, «gevelrenovatie met folie».

---

## Трек C — Одна пайплайна и честные правила

### C1. Единый рефреш — C, 1 день

`seo-ops/run_refresh.py --days 28|90` собирает за один запуск: GSC query×page (окно до `today-3`), GA4 landing × channel (organic отдельно), WP leads + pageviews (A2), GBP performance + reviews, Google Ads search terms + conversions за 28 дней (SDK теперь установлен). Всё в `snapshots/normalized/`, все с `_meta` (окно, дата сбора, источник). Старую 28-дневную JSON-пайплайну (`integrations/google_clients/*`, `data/processed/*`) отключить.

### C2. Правила v2 — C, 1 день

Один файл `analysis/rules_v2.py` + `config/thresholds/seo_rules_v2.yaml`:
- CTR-разрыв: только запросы с ≥50 показов, ожидаемый CTR по позиции (кривая из своих данных за 90 дней, fallback фиксированная), бренд исключён regex-ом из `config/site.yaml`;
- ranking-возможности: запрос×страница, позиция 4–20, ≥50 показов, без верхнего ограничения для money pages;
- дельты: минимум 30 показов в базе, Пуассоновский порог, сезонная пометка (bouwvak июль–август);
- конверсии: только organic-сессии, лиды из WP по статусу `qualified`, GA4 как вторичный;
- cutover 2026-03-08 из `analysis_context_v1.yaml` отсекает окно автоматически;
- каждая находка получает стабильный id (hash страница+правило) и confidence по правилу из yaml, не по константе в коде.

### C3. Еженедельный отчёт — C, полдня

`reports/weekly/weekly_YYYY-MM-DD.md`: 5 чисел с дельтами (небрендовые клики, показы money pages, квалифицированные лиды по каналам, ссылающиеся домены, присутствие в local pack Rotterdam), затем таблица действий из `decision_log`: дата, объект, метрика до / после, статус «рано / работает / не сработало». Затем не более 5 новых находок с id. Ничего из уже сделанного не повторяется.

### C4. Чистка — C, полдня

Удалить 6 `.tmp_*`, сирот (`list_gbp_accounts_locations.py`, `paid_landing_pages_window.py`, `incident_recovery_monitor.py`), 21 py внутри `outputs/`; `outputs/full_audit_2026-06-06` и `full_competitor_gap_2026-06-07` (26 МБ) — в архив вне git. `keyword_master` v2/v3 пересобрать только из post-cutover GSC 90d + объёмов DataForSEO, либо вывести из входов. Починить или удалить три никогда не запускавшихся анализатора, поправить пути в `workflow_registry_v1.json`. README, ROADMAP, CONTRACTS_V1 привести в соответствие или удалить дубли.

### C5. Автозапуск — C + О, 1 час

Понедельник 07:00: `run_refresh.py --days 28` + отчёт (Windows Task Scheduler на этой машине или GitHub Action с секретами, если данные можно вынести). Первое число месяца: `run_dataforseo_final_audit_collect_2026_08.py --only backlinks --only serp_local --only gbp --only link_prospects` (~$0.85). Раз в квартал: `--only volume --only labs`.

---

## Трек D — Локальный слой

- D1. GBP-пост еженедельно через `/gbp-weekly-post` (уже идёт с недели 36).
- D2. GBP Services с названиями money pages и URL с UTM; 5–8 Q&A по FAQ из скилла; в описании и ответах на отзывы — тема «taalbarrière»: назвать нидерландскоязычное контактное лицо.
- D3. Контрольный снимок local pack Rotterdam ежемесячно (входит в C5).

---

## Что не входит в план и почему

- Подписки на Semrush / Ahrefs / aisa.one: не меняют диагноз, у нас 1 ссылающийся домен — это не проблема данных.
- Bing Webmaster: доля Bing в NL не оправдывает.
- PageSpeed / CrUX: подключить бесплатный ключ можно в любой момент, но статический Next.js вряд ли ограничивает рост. Отложено до появления сигнала.
- Переписывание контрактов и документации seo-ops целиком: только чистка противоречий в C4.

---

## Контрольные точки

| Дата | Что проверяем |
|---|---|
| 2026-09-13 | Плагин отдаёт `summary`; GTM-события видны в GA4 Realtime; тайтлы B1 в проде; ≥10 регистраций из Tier B |
| 2026-09-27 | keimen и sausklaar в проде и отправлены на индексацию; отчёт сверки лидов; единый рефреш работает |
| 2026-10-16 | Первый еженедельный отчёт с колонкой «до/после»; чистка сделана; автозапуск включён |
| 2026-11-15 | KPI плана от 15 августа: ссылающиеся домены ≥12, отзывы ≥32, local pack ≥1/5, keimen ≤20 по «keimen kosten» |
