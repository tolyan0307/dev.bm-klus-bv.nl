# WP Stats v2 — техническая основа для нового чата

Дата: 2026-09-04. Источники: сводка ChatGPT по `bm-internal-stats.php` (передана владельцем), реальный код в `D:\projects\bmklus-wpcontent\mu-plugins\bm-internal-stats.php` (691 строка, версия 1.0.0), фронтенд в этом репозитории, план `seo-ops/reports/combined/action_plan_2026-09-04.md` (пункт A1).

Пометки: **[код]** = проверено в исходниках на диске; **[сводка]** = утверждение из сводки ChatGPT, на диске не подтверждено, проверить на сервере; **[сегодня]** = изменено 2026-09-04 в этом репозитории, на прод ещё не задеплоено.

---

## 1. Зачем v2

Сейчас статистика считает только два числа в день: просмотры и отправки формы. Для управления SEO этого мало. Цель v2:

1. **Истина о лидах.** Каждая заявка сохраняется как строка со статусом `new / spam / qualified / won / lost`, который владелец меняет в админке. Без статусов сверка с GA4 и Ads бессмысленна.
2. **Атрибуция каждого лида.** Посадочная страница, referrer, utm_*, полный gclid, первое касание сессии. Фронтенд это уже шлёт [сегодня], серверу осталось сохранить.
3. **Read-API для seo-ops.** Три GET-эндпоинта с токеном: `leads`, `pageviews`, `summary`. Их будет читать еженедельная routine и отчёт сверки «WP-лиды vs GA4 vs Ads».
4. **Счётчик просмотров остаётся**, но перестаёт двоить (см. §5, риск 1) и получает сырой event-слой, чтобы агрегаты можно было пересчитать.
5. Потом, не в первой версии: офлайн-импорт квалифицированных лидов в Google Ads по gclid.

Чего v2 не делает: не заменяет GA4, не трогает GTM/consent, не публикует ничего, не меняет API формы без необходимости.

---

## 2. Архитектура среды

| Факт | Статус |
|---|---|
| Фронтенд: Next.js App Router, static export, деплой в `wp-content/uploads/v0/<REL>/`, активный релиз `uploads/v0/current`, symlink для `/_next` и `/images` | [сводка] |
| WordPress = серверная оболочка на том же домене (Apache, OneHome/Antagonist); MU-плагин-роутер отдаёт статику | [сводка]; наличие WP на домене подтверждено `deploy/apache/root.htaccess` [код] |
| MU-плагины на PROD: `automation-by-installatron.php`, `bm-contact-leads.php`, `bm-v0-static-router.php`, `bm-internal-stats.php` | [сводка] |
| Локальный репозиторий `D:\projects\bmklus-wpcontent`: есть `mu-plugins/bm-internal-stats.php` (**untracked в git**), `bmklus-core.php` + папка `bmklus/` (6 модулей, DEV-лоадер); **нет** `bm-contact-leads.php` и `bm-v0-static-router.php` | [код] |
| PROD-путь: `/home/deb147890/domains/bm-klus-bv.nl/public_html/wp-content/mu-plugins/`; DEV: `.../dev.bm-klus-bv.nl/...`; DEV за Basic Auth | [сводка] |
| Деплой PHP делается вручную (SFTP/файловый менеджер), состояние сервера может отличаться от репозитория | [сводка] |

**Вывод:** прежде чем что-то менять, новый чат должен получить с PROD актуальные копии всех четырёх MU-плагинов и положить их в `D:\projects\bmklus-wpcontent\mu-plugins\` под git. Особенно `bm-contact-leads.php`: неизвестно, сохраняет ли он заявки куда-либо, кроме письма.

---

## 3. Текущий `bm-internal-stats.php` v1.0.0 [код]

**Таблица** `{prefix}bm_stats_daily`, создаётся через `dbDelta()` на `admin_init`, версия в `wp_options` (`bm_stats_daily_db_version`):

```
id, stat_date, path(255), source_type(32) default 'direct', utm_source(100), utm_campaign(150),
has_gclid tinyint, views, submits, created_at, updated_at
UNIQUE (stat_date, path, source_type, utm_source, utm_campaign, has_gclid)
KEY stat_date, KEY path, KEY source_type
```

Только дневные агрегаты. Полный gclid, referrer, utm_medium/content/term не хранятся.

**Просмотры, серверная сторона.** `register_shutdown_function('bm_stats_maybe_record_pageview')`: считает только GET, не admin, HTTP 200, путь проходит `bm_stats_is_trackable_path()`, не бот (`bm_stats_is_bot()`), **и `PHP_AUTH_USER` пуст** (DEV за Basic Auth не считается).

**Просмотры, клиентская сторона.** `POST /wp-json/bm-stats/v1/pageview`, `permission_callback __return_true`. Payload `{url, referrer}`. Проверки: не бот, host совпадает с `home_url()`, путь trackable. Записывает `views`.

**Отправки формы.** Фильтр `rest_post_dispatch` смотрит ответы маршрута `/bm/v1/contact` со статусом 200 и `ok: true`, берёт из тела запроса `sourceUrl`, парсит из него utm/gclid, классифицирует источник по `$_SERVER['HTTP_REFERER']` и увеличивает `submits`. Плюс action `bm_stats_form_submit` для явного вызова из других плагинов (используется ли где-то, неизвестно).

**Классификация** `bm_stats_classify_source()`: `ads` (gclid или utm_medium cpc/ppc/paid), `organic` (referrer из списка поисковиков), `referral`, `direct`, `unknown`. Выполняется в момент записи, пересчитать потом нельзя.

**Админка** Tools → BM Stats (`manage_options`): фильтры дата/путь/источник, тоталы, таблица по 50 строк, экспорт CSV с nonce, UTF-8 BOM, разделитель `;`.

---

## 4. Фронтенд на 2026-09-04

| Файл | Что делает | Статус |
|---|---|---|
| `components/pageview-beacon.tsx` | На каждой смене `pathname`/`searchParams` вызывает `captureAttribution()` и шлёт `{url, referrer}` через `sendBeacon`, fallback `fetch keepalive`. Смонтирован глобально в `app/layout.tsx` внутри `<Suspense>` | [код]; `captureAttribution()` добавлен [сегодня] |
| `lib/attribution.ts` | Первое касание сессии: `landing_url, referrer, utm_source/medium/campaign/content/term, gclid, first_seen_at`. Хранится в **sessionStorage** под ключом `bm_attr_v1`, без cookie и идентификаторов; все обращения в try/catch | [сегодня] |
| `components/contact/ContactFormCard.tsx`, `components/quote-modal.tsx` | POST на `${NEXT_PUBLIC_CONTACT_API_BASE}/wp-json/bm/v1/contact`. Payload: `name, city, phone, email, service, message, consent, sourceUrl, referrer, attribution{...}, company (honeypot), turnstileToken`. Поля `referrer` и `attribution` новые | [код]; новые поля [сегодня] |
| `components/cta-click-tracker.tsx`, `components/gtm-provider.tsx` | События `bm_whatsapp_click / bm_phone_click / bm_email_click / bm_lead_form_success` в dataLayer. В GA4 не доходят: триггеры GTM не настроены (открыто с июля) | [код], факт по GA4 проверен 2026-09-04 |

Форм на сайте **две**, не три: `components/inline-quote-form.tsx` из сводки в репозитории не существует. Сводка в этой части устарела.

---

## 5. Расхождения и риски, проверить первыми

1. **Двойной счёт просмотров при hard load.** Сводка утверждает, что beacon пропускает первый рендер (`isFirstRender`). В репозитории такой защиты **нет**: `lastUrl` изначально пустой, поэтому при первой загрузке beacon отправляет pageview, и серверный shutdown-хук считает тот же заход ещё раз. Либо защиту удалили при правках, либо на проде задеплоен другой beacon. Проверить: снять 10 hard-load на проде и посмотреть, сколько строк добавилось. Пока это не решено, цифры `views` за период с момента деплоя beacon подозрительны.
2. **sessionStorage против заявленного принципа.** Плагин v1 декларирует «без cookies, localStorage, sessionStorage». `lib/attribution.ts` использует sessionStorage для первого касания. Идентификатора посетителя там нет, только параметры URL и referrer, и хранение живёт до закрытия вкладки. Это, скорее всего, не требует согласия по cookie-политике, но **решение должен принять владелец явно** и, при необходимости, отразить в privacybeleid. Альтернатива без хранения: передавать первое касание через параметры в URL при внутренних переходах, что хуже.
3. **Источник у отправки формы.** В submit-хуке `HTTP_REFERER` для fetch с того же домена равен адресу страницы формы, то есть классификация по referrer видит «свой сайт». Проверить в `bm_stats_classify_source()`, во что это превращается: вероятно, все заявки без utm/gclid уходят в `referral` или `direct`. С новым полем `attribution` эта логика должна использовать первое касание, а не referer запроса.
4. **Сводка ссылается на файлы, которых нет локально.** `bm-contact-leads.php` и `bm-v0-static-router.php` есть только на PROD. Без их кода нельзя проектировать таблицу лидов: возможно, лиды уже где-то сохраняются.
5. **Полный gclid не сохраняется**, только флаг. Для офлайн-импорта в Ads нужен полный.
6. **DEV не считает просмотры** из-за `PHP_AUTH_USER`. Тестировать придётся на PROD или снимать исключение на DEV временно.
7. **Ретро-данные.** Журнал лидов с 8 марта восстановим только из писем или из того, что хранит `bm-contact-leads.php`. Выяснить у владельца, куда уходят письма и есть ли архив.
8. **Стабильность деплоя.** `bm-internal-stats.php` untracked; версия на сервере не обязательно равна локальной. Первый шаг нового чата: `diff` локального файла с копией с PROD.

---

## 5a. Решение владельца 2026-09-04: v2 с нуля, v1 удалить

Данные `wp_bm_stats_daily` владелец признал не ценными. Итог:
- v1 (`bm-internal-stats.php`, таблица `wp_bm_stats_daily`, опция `bm_stats_daily_db_version`) удаляется с PROD и DEV; миграция данных не нужна.
- v2 = новый standalone MU-плагин (например `bm-stats.php`) с новой схемой из §6. Из v1 переиспользуются как проверенные куски: `bm_stats_is_trackable_path`, `bm_stats_is_bot`, `bm_stats_normalize_path`, приём заявки через `rest_post_dispatch` на `/bm/v1/contact` (в этом фильтре доступно всё тело запроса формы, поэтому `bm-contact-leads.php` не трогаем), `bm_stats_classify_source` как функция, применяемая при чтении.
- Серверный shutdown-хук просмотров не переносится: единственный канал просмотров — beacon (это закрывает риск двойного счёта, §5 п.1).
- Маршрут `POST /wp-json/bm-stats/v1/pageview` сохраняет имя и принимает старый payload `{url, referrer}`, чтобы не синхронизировать деплой фронтенда и PHP.
- Код PROD-версии v1 совпадает с локальной копией по структуре; подтверждено: referer с собственного домена → `direct`, UTM без платных маркеров → `referral`.

## 6. Целевая архитектура v2 (предложение, не решение)

```
фронтенд (формы, beacon)
        │
        ▼
bm_events   — сырой журнал: ts, type(page_view|form_submit|...), path, referrer,
              utm_*, gclid, source_type (вычисляется при чтении, не при записи),
              visitor_hash NULL (см. вопрос идентичности), is_bot, ua_class
bm_leads    — заявка: ts, source(contact_form|quote_modal), status, page_url, referrer,
              landing_url, utm_*, gclid, first_seen_at, service, city, name/phone/email/message
              (как хранит bm-contact-leads сейчас), turnstile_ok, honeypot_hit
        │
        ▼
bm_stats_daily — производная таблица, пересчитывается из bm_events (миграция: старые
                 строки остаются как «исторические, без event-слоя»)
        │
        ▼
REST GET (X-BM-Token из wp-config): /bm-stats/v1/leads, /pageviews, /summary
Админка: Tools → BM Stats + новая вкладка Leads с редактируемым статусом и экспортом CSV
```

Открытые проектные решения, каждое требует «да/нет» владельца:
- **Идентичность посетителя.** Вариант A: без идентификатора вообще, сессии не считаем, атрибуция лида целиком приходит с фронтенда из sessionStorage. Вариант B: `visitor_hash = sha256(IP + UA + соль дня)` только для подсчёта уникальных, без связи с лидом. Вариант A проще и чище по приватности; для нашей задачи (истина о лидах) его достаточно.
- **Retention сырых событий**: предложение 13 месяцев, дальше только агрегаты.
- **Дедупликация просмотров**: убрать серверный shutdown-хук и считать только beacon (тогда посетители без JS не считаются, их доля мала), либо оставить сервер и добавить в beacon защиту первого рендера. Решить после проверки риска 1.
- **Rate limiting** публичного `/pageview`: простой лимит по IP в transients.
- **Персональные данные в API**: `leads` отдаёт наружу только id, дату, статус, source, атрибуцию; без имени, телефона, email, текста.

---

## 7. Вопросы владельцу, без которых не начать

1. Версии WordPress и PHP; доступ к базе (phpMyAdmin или консоль хостинга).
2. Способ выкладки PHP-файлов на PROD и DEV.
3. Куда сейчас приходят заявки: адрес, отправитель, есть ли архив писем с 8 марта. Хранит ли `bm-contact-leads.php` что-то в базе.
4. Можно ли добавить константу-токен в `wp-config.php` на PROD и DEV.
5. Решение по §5 п.2 (sessionStorage) и по §6 (идентичность, retention).
6. Есть ли на `wp-json` какая-то защита кроме Turnstile у формы (WAF, лимиты хостинга).

---

## 8. Две линии деплоя, не путать

| Что меняется | Куда деплоить |
|---|---|
| PHP: `bm-internal-stats.php`, новые файлы плагина | `wp-content/mu-plugins/` на PROD и DEV вручную |
| Фронтенд: `pageview-beacon.tsx`, `lib/attribution.ts`, формы | новый static build → `wp-content/uploads/v0/<REL>/` через существующий workflow; прод-деплой в GitHub Actions ручной (`deploy-prod.yml`, workflow_dispatch) |

Сейчас [сегодня] фронтенд-изменения запушены в `origin/main`, но прод-деплой не запущен: на проде старый beacon и старые формы.

---

## 9. Что не ломать

- `bm-v0-static-router.php` и архитектуру статических релизов.
- `bm-contact-leads.php`: расширять через хуки или отдельным плагином, не переписывать без копии с PROD.
- GTM, GA4, Google Ads, CookieScript / Consent Mode.
- API формы: новые поля добавлять, существующие не переименовывать.
- Не возвращать stats в `bmklus-core.php` / `mu-plugins/bmklus/`.
- Не вводить cookie или fingerprinting без явного решения владельца.
- Не смешивать пути PROD и DEV.

---

## 10. Стартовый промпт для нового чата

```
Работаем над плагином статистики и лога заявок для bm-klus-bv.nl (WordPress MU-plugin).
Основа: docs/WP-STATS-V2-HANDOFF.md — прочитай целиком, там цель, реальный код v1, фронтенд и список расхождений.

Шаг 1, только чтение, ничего не менять:
- сравни D:\projects\bmklus-wpcontent\mu-plugins\bm-internal-stats.php с копией с PROD (я положу её в mu-plugins/_prod/), а также прочитай bm-contact-leads.php и bm-v0-static-router.php оттуда же;
- прочитай components/pageview-beacon.tsx, lib/attribution.ts, components/contact/ContactFormCard.tsx, components/quote-modal.tsx, app/layout.tsx;
- проверь риски из §5 handoff, в первую очередь двойной счёт просмотров и классификацию источника у отправки формы.

Шаг 2: отчёт — что реально стоит на проде vs handoff, точная схема, все хуки и эндпоинты, что хранит bm-contact-leads, и предложение архитектуры v2 по §6 с вопросами, на которые я должен ответить.

Миграция данных v1 не нужна (см. §5a handoff): v1 удаляем, v2 пишем с нуля. Код пишем только после моего «ок» по архитектуре. Ответы на русском, всё публичное на сайте только на nl-NL.
```

Перед стартом нового чата владелец: скачивает с PROD четыре MU-плагина в `D:\projects\bmklus-wpcontent\mu-plugins\_prod\` и отвечает на §7 хотя бы по пунктам 1–4.

---

## 11. Карта файлов

| Назначение | Путь |
|---|---|
| Плагин v1 (локальная копия, untracked) | `D:\projects\bmklus-wpcontent\mu-plugins\bm-internal-stats.php` |
| DEV-лоадер и модули | `D:\projects\bmklus-wpcontent\mu-plugins\bmklus-core.php`, `mu-plugins\bmklus\` |
| Beacon | `components/pageview-beacon.tsx` |
| Атрибуция первого касания | `lib/attribution.ts` |
| Формы | `components/contact/ContactFormCard.tsx`, `components/quote-modal.tsx` |
| CTA-события в dataLayer | `components/cta-click-tracker.tsx`, `components/gtm-provider.tsx` |
| Спецификация A1 и план | `seo-ops/reports/combined/action_plan_2026-09-04.md` |
| Аудит seo-ops | `seo-ops/reports/combined/seo_ops_system_audit_2026-09-04.md` |
| Загрузчик для seo-ops (будет) | `seo-ops/integrations/wp/stats_loader.py` |
