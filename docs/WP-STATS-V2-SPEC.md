# WP Stats v2 — спецификация

Дата: 2026-09-04. Статус: **v2 работает на PROD и DEV с 2026-09-04**, v1 удалён с обоих. См. §11.
Языки: интерфейс плагина на русском, всё публичное на сайте только nl-NL.
Основание: `docs/WP-STATS-V2-HANDOFF.md`, копии с PROD в `D:\projects\bmklus-wpcontent\mu-plugins\_prod\`.

Цель одной фразой: сайт становится ещё одним правдивым источником данных о трафике и заявках, независимым от GA4 и Ads.

---

## 1. Решения владельца (зафиксированы 2026-09-04)

| Тема | Решение |
|---|---|
| v1 (`bm-internal-stats.php`, таблица `wp_bm_stats_daily`, option `bm_stats_daily_db_version`) | Удаляется с DEV и PROD после проверки v2. Миграция данных не нужна |
| Просмотры | Только beacon из браузера. Серверный shutdown-хук не переносится |
| Заявки | Каноническая запись остаётся CPT `bm_lead` из `bm-contact-leads.php`. Статус, атрибуция и метаданные формы хранятся как post meta. Отдельной таблицы лидов нет |
| Идентичность посетителя | Вариант A: без идентификатора. Колонка `visitor_hash` зарезервирована, заполняется только при включённой константе, по умолчанию выключено |
| Retention | События 13 месяцев. Заявки без автоудаления |
| Rate limit `/pageview` и `/event` | 30 запросов в минуту по IP. IP = `REMOTE_ADDR`. Заголовки прокси учитываются только при константе `BM_STATS_TRUSTED_PROXY` |
| Токен API | Только для server-to-server GET и никогда не попадает в браузер. Разные значения на DEV и PROD. Добавляет владелец в `wp-config.php` по инструкции |
| Атрибуция первого касания | В памяти JS-модуля, без sessionStorage, localStorage и cookie. `lib/attribution.ts` переписывается |
| Вариант формы | Новое поле `formVariant` в payload обеих форм: `contact_form`, `quote_modal`. Сервер принимает белый список, неизвестное значение пишет как `other` |
| CTA-клики | События `cta_click` через beacon: whatsapp, phone, email. Правка в `components/cta-click-tracker.tsx` аддитивная, dataLayer не трогаем |
| Orderwaarde | Поле суммы заказа у статуса `won`, для выручки по источникам |
| Бэкфилл старых заявок | Только вручную, кнопкой, после сводки по `bm_lead` и dry-run |
| Админка | Отдельное меню верхнего уровня «BM Stats», интерфейс на русском (плагин только для владельца), доступ по capability `bm_stats_view` |
| Privacybeleid | Один абзац на nl-NL, см. §9. Публикует владелец |

Что не меняется: GTM, GA4, Ads, CookieScript и Consent Mode, `bm-v0-static-router.php`, `bm-contact-leads.php`, существующие поля API формы, `bmklus-core.php` и `mu-plugins/bmklus/`.

---

## 2. Факты, проверенные по коду

- `bm-contact-leads.php` создаёт CPT `bm_lead` (post_status `private`, меню «Leads»), meta: name, email, phone, service, city, source_url, ip, ua, turnstile_ok. Ответ 200 `{ok:true, id}`. Honeypot возвращает `{ok:true}` без `id` и без записи. Ошибки: 429 `rate_limited`, 400 `validation`, 400 `turnstile`, 500 `save_failed`.
- Роутер статики работает на `muplugins_loaded` приоритет 0 и делает exit для страниц. Хуки v2 срабатывают только на запросах `/wp-json/*` и `/wp-admin/*`.
- Beacon на PROD отправляет pageview и при hard load. С серверным хуком v1 просмотры двоятся.
- Форм две: `components/contact/ContactFormCard.tsx` и `components/quote-modal.tsx`. Модалка стоит и на `/contact/`, эвристика по пути не различает формы.
- DEV-деплой фронтенда: push в `main` и вручную. PROD: только `workflow_dispatch`. Turnstile-ключи DEV и PROD разные.
- На DEV `wp_mail` перенаправлен в никуда модулем dev-guards, тестовые заявки писем не дают.
- Коммит с sessionStorage-атрибуцией уже в `origin/main`, значит на DEV он задеплоен. На PROD нет.

## 3. Что владелец проверяет на сервере до деплоя

| Что | Где |
|---|---|
| Версия PHP, MySQL, object cache | wp-admin → Tools → Site Health → Info |
| Часовой пояс | Settings → General. Ожидается Europe/Amsterdam, при другом значении сообщить, не менять |
| Число заявок, самая ранняя дата, корзина | Меню Leads, включая фильтр Trash |
| `BM_CONTACT_TO`, `BM_TURNSTILE_SECRET` на DEV и PROD | `wp-config.php` |
| Разрешён ли `dev.bm-klus-bv.nl` в Turnstile | Панель Cloudflare Turnstile, sitekey DEV |
| Обновление ядра 6.9.7 → 7.1 и темы | Сначала DEV, затем PROD, до установки v2 |

---

## 4. Структура плагина

```
wp-content/mu-plugins/
  bm-stats.php                 загрузчик, единственный файл, который видит WordPress
  bm-stats/
    includes/
      schema.php               таблица, версия, dbDelta
      util.php                 normalize_path, is_trackable_path, is_bot, device_class, client_ip, classify_source
      events.php               запись событий, rate limit
      leads.php                хук rest_post_dispatch, meta заявки, бэкфилл
      rest-public.php          POST /pageview, POST /event
      rest-read.php            GET /leads, /pageviews, /events, /summary с токеном
      admin/                   меню, страницы, колонки Leads, метабокс, bulk, CSV
      cron.php                 retention
    assets/
      admin.css, admin.js      графики рисуются в PHP как inline SVG, внешних библиотек нет
```

Из v1 переиспользуются функции `normalize_path`, `is_trackable_path`, `is_bot`, `classify_source` с переносом в новое пространство имён `bm_stats2_*`, чтобы v1 и v2 могли недолго сосуществовать на одном сервере без конфликта имён.

Константы `wp-config.php`:

| Константа | Обязательна | Назначение |
|---|---|---|
| `BM_STATS_API_TOKEN` | для GET-эндпоинтов | Сравнение через `hash_equals` с заголовком `X-BM-Token`. Без константы GET-эндпоинты отвечают 403 |
| `BM_STATS_TRUSTED_PROXY` | нет | При `true` IP берётся из `CF-Connecting-IP`, затем первого элемента `X-Forwarded-For` |
| `BM_STATS_VISITOR_HASH` | нет | При `true` заполняется `visitor_hash`. По умолчанию выключено |
| `BM_STATS_RETENTION_MONTHS` | нет | По умолчанию 13 |

---

## 5. Схема данных

### 5.1 Таблица `wp_bm_events`

```
id            bigint unsigned  PK auto_increment
ts            datetime         UTC
stat_date     date             локальная дата по wp_timezone() на момент записи
type          varchar(20)      page_view | cta_click | lead | form_honeypot | form_rejected
path          varchar(255)     нормализованный путь страницы
referrer_host varchar(120)     '' если нет
referrer      varchar(512)     без query-строки
utm_source    varchar(100)     NULL
utm_medium    varchar(50)      NULL
utm_campaign  varchar(150)     NULL
utm_content   varchar(150)     NULL
utm_term      varchar(150)     NULL
has_gclid     tinyint(1)       0/1. Полный gclid в событиях не хранится, только у заявки
device        varchar(10)      mobile | tablet | desktop | other, по User-Agent, сам UA не хранится
cta           varchar(20)      NULL. whatsapp | phone | email для cta_click
form_variant  varchar(20)      NULL. contact_form | quote_modal | other для событий формы
lead_id       bigint unsigned  NULL. ID записи bm_lead для type=lead
reason        varchar(32)      NULL. rate_limited | validation | turnstile | save_failed для form_rejected
visitor_hash  char(64)         NULL. Заполняется только при BM_STATS_VISITOR_HASH
KEY (stat_date, type), KEY (type, ts), KEY (path, stat_date), KEY (lead_id), KEY (visitor_hash, stat_date)
```

Не хранится: IP, полный User-Agent, полный URL с query, gclid в событиях просмотра. Источник трафика не хранится, а вычисляется при чтении, чтобы правила можно было менять задним числом.

`visitor_hash` при включении = sha256(IP + UA + суточная соль). Соль = hash(AUTH_SALT + дата). Хэш не восстанавливается и не совпадает на следующий день. Нужен только для подсчёта уникальных за день.

### 5.2 Meta на записи `bm_lead`

| Ключ | Значение |
|---|---|
| `bm_status` | `new` по умолчанию, `spam`, `qualified`, `won`, `lost` |
| `bm_status_updated_at`, `bm_status_updated_by` | UTC, user_id |
| `bm_form_variant` | contact_form / quote_modal / other |
| `bm_page_path` | нормализованный путь страницы формы |
| `bm_referrer` | referrer страницы формы из payload |
| `bm_first_referrer` | referrer первого касания из `attribution`, используется для классификации источника |
| `bm_source` | кэш вычисленного источника для фильтров списка; пересчитывается кнопкой на «Обслуживании» |
| `bm_landing_url`, `bm_first_seen_at` | первое касание из `attribution` |
| `bm_utm_source`, `bm_utm_medium`, `bm_utm_campaign`, `bm_utm_content`, `bm_utm_term` | из первого касания |
| `bm_gclid` | полный, из первого касания. Нужен для сверки с Ads и будущего офлайн-импорта |
| `bm_consent` | 0/1 из payload |
| `bm_event_id` | id события `lead` |
| `bm_order_value` | decimal, «Сумма заказа», заполняется вручную у `won` |
| `bm_note` | внутренняя заметка |
| `bm_backfilled` | 1 для записей, обработанных бэкфиллом |

Источник лида вычисляется при чтении из первого касания, а не из referer HTTP-запроса.

### 5.3 Классификация источника при чтении

Порядок: gclid или utm_medium из cpc/ppc/paid → `ads`; utm_source задан → `campaign`; referrer_host из списка поисковиков → `organic`; referrer_host собственный или пустой → `direct`; иначе `referral`. Список поисковиков и платных маркеров в одном массиве, чтобы правки не требовали пересчёта данных. Отличие от v1: UTM без платных маркеров идёт в `campaign`, а не в `referral`, чтобы рассылки и GBP-посты с UTM не смешивались с ссылками с чужих сайтов.

---

## 6. Хуки и эндпоинты

### 6.1 Хуки

| Хук | Что делает |
|---|---|
| `rest_api_init` | регистрирует маршруты §6.2 |
| `rest_post_dispatch`, маршрут `/bm/v1/contact` | 200 с `id` → событие `lead` и meta по §5.2 из тела запроса; 200 без `id` → `form_honeypot`; 429/400/500 → `form_rejected` с `reason` |
| `admin_init` | dbDelta по версии в option `bm_stats2_db_version`; выдача capability администратору один раз; обработчики CSV и кнопок Onderhoud с nonce |
| `admin_menu` | меню «BM Stats» |
| `manage_bm_lead_posts_columns`, `manage_bm_lead_posts_custom_column`, `restrict_manage_posts`, `pre_get_posts` | колонки, фильтры списка Leads |
| `bulk_actions-edit-bm_lead`, `handle_bulk_actions-edit-bm_lead` | массовая смена статуса |
| `add_meta_boxes`, `save_post_bm_lead` | метабоксы «Путь клиента» и «Статус» с nonce |
| `wp_ajax_bm_stats_set_status` | смена статуса из списка без перезагрузки, nonce и capability |
| `before_delete_post` | у события `lead` обнуляется `lead_id` |
| cron `bm_stats2_daily` | удаление событий старше retention, кроме типа `lead` |

### 6.2 Публичные POST, без авторизации

`POST /wp-json/bm-stats/v1/pageview` — старый payload `{url, referrer}`, сохраняется для совместимости с уже задеплоенным beacon.

`POST /wp-json/bm-stats/v1/event` — `{type, url, referrer, cta?}`, type из `page_view | cta_click`.

Проверки в обоих, в этом порядке: размер тела до 4 КБ, UA не бот, host из `url` равен домену сайта, путь trackable, rate limit 30/мин по IP. Ответ всегда 200 `{ok:true}`, чтобы клиент не повторял запросы. Отказ никак не сигнализируется наружу.

### 6.3 Чтение, заголовок `X-BM-Token`

| Маршрут | Параметры | Отдаёт |
|---|---|---|
| `GET /bm-stats/v1/leads` | `from`, `to`, `status`, `source` | id, created_at, status, form_variant, service, city, page_path, referrer_host, landing_path, utm_*, gclid, source_type, turnstile_ok, order_value. Без имени, телефона, email, текста |
| `GET /bm-stats/v1/pageviews` | `from`, `to`, `group=day\|path\|source\|device` | агрегаты просмотров |
| `GET /bm-stats/v1/events` | `from`, `to`, `type`, `group=day\|path\|cta` | агрегаты cta_click и событий формы |
| `GET /bm-stats/v1/summary` | `days=28` | просмотры, cta, заявки по статусу и источнику, конверсии, сравнение с предыдущим периодом |

Даты в параметрах и ответах локальные. Максимальный интервал 400 дней. Без константы токена ответ 403, при неверном токене 403 без уточнений.

---

## 7. Админка «BM Stats»

Capability `bm_stats_view`, выдаётся роли administrator при первом `admin_init`. Владелец может выдать её другому пользователю плагином ролей. Все подписи, кнопки и сообщения плагина на русском. Существующие колонки списка Leads из `bm-contact-leads.php` (Naam, E-mail, Telefoon, Dienst, Plaats) остаются на нидерландском, этот файл не трогаем; новые колонки v2 на русском.

| Страница | Содержимое |
|---|---|
| **Обзор** | Пресеты периода 7, 28, 90 дней, текущий месяц, произвольный. Карточки со сравнением к прошлому периоду: просмотры, клики по CTA, заявки, из них квалифицированные и выигранные, конверсия просмотры → заявки, доля платного трафика, выручка по выигранным. График по дням: просмотры, CTA, заявки. Топ-10 страниц и топ источников |
| **Страницы** | Таблица по страницам: просмотры, CTA, заявки, конверсия, изменение. Сортировка, поиск по пути, фильтр «кластер gevelisolatie». Клик по строке раскрывает источники и кампании страницы |
| **Источники** | ads / campaign / organic / referral / direct с раскрытием до utm_campaign и referrer_host. Отдельный счётчик заявок с gclid |
| **Заявки** | Ссылка на существующий список `bm_lead`, расширенный колонками Статус, Источник, Страница, Кампания, Форма, Сумма заказа; фильтры по статусу, источнику, услуге, периоду; смена статуса в списке; массовые действия; метабоксы «Путь клиента» и «Статус» на записи |
| **Антиспам** | honeypot, rate limit, отказы Turnstile по дням и страницам |
| **Экспорт** | CSV с текущими фильтрами, UTF-8 BOM, разделитель `;` |
| **Обслуживание** | Здоровье: версия PHP и WP, часовой пояс, object cache, наличие констант, размер таблицы, статус cron. Сводка по `bm_lead` по post_status и датам. Кнопки: бэкфилл с датой «от» и dry-run, ретеншн сейчас, удаление таблицы и option v1 (кнопка видна только пока они существуют) |

Графики: inline SVG, генерируются в PHP, без внешних библиотек и CDN. Стили: стандартные компоненты wp-admin.

---

## 8. Правки фронтенда, все аддитивные

| Файл | Правка |
|---|---|
| `lib/attribution.ts` | Хранение первого касания в переменной модуля вместо sessionStorage. Логика апгрейда кампанийных параметров сохраняется. Ничего на устройство не пишется |
| `components/contact/ContactFormCard.tsx` | Поле `formVariant: "contact_form"` в payload |
| `components/quote-modal.tsx` | Поле `formVariant: "quote_modal"` в payload |
| `components/cta-click-tracker.tsx` | Помимо dataLayer отправка `{type:"cta_click", cta, url, referrer}` на `/bm-stats/v1/event` через sendBeacon |
| `components/pageview-beacon.tsx` | Без изменений |
| `app/privacybeleid/page.tsx` | Абзац из §9 |

Деплой: push в `main` даёт DEV автоматически, PROD через `deploy-prod.yml` вручную после проверки.

---

## 9. Абзац для privacybeleid (nl-NL, черновик)

> **Websitestatistieken zonder cookies.** Om te begrijpen welke pagina's en campagnes tot aanvragen leiden, houden wij op onze eigen server bij welke pagina's worden bekeken, via welke bron bezoekers binnenkomen en op welke contactknoppen wordt geklikt. Hiervoor plaatsen wij geen cookies en slaan wij niets op uw apparaat op. Wij bewaren geen IP-adres en geen individueel bezoekersprofiel; deze gegevens worden na 13 maanden verwijderd. Bij het versturen van een aanvraag bewaren wij, naast de door u ingevulde gegevens, de pagina en de campagne via welke u ons heeft gevonden, zodat wij uw aanvraag goed kunnen opvolgen. Grondslag: gerechtvaardigd belang (artikel 6 lid 1 sub f AVG).

При включении `BM_STATS_VISITOR_HASH` абзац дополняется предложением о суточном псевдонимном хэше для подсчёта уникальных посетителей.

---

## 10. План деплоя

### DEV

1. Владелец: обновление ядра и темы на DEV, проверка wp-admin и тестовой заявки.
2. В `bmklus-wpcontent`: закоммитить текущий v1 и папку `_prod` как baseline, затем v2.
3. Владелец: `BM_STATS_API_TOKEN` в wp-config DEV, загрузка `bm-stats.php` и папки `bm-stats/` по SFTP.
4. Проверка: меню «BM Stats» открывается, «Обслуживание» показывает здоровье; 10 hard load дают 10 событий; SPA-переходы считаются; заявка через обе формы попадает в Leads со статусом `new`, вариантом формы и атрибуцией; honeypot и rate limit дают отдельные события; клик по WhatsApp даёт `cta_click`; GET с токеном отвечает, без токена 403; бэкфилл dry-run на DEV-заявках; CSV.
5. Удалить `bm-internal-stats.php` с DEV, кнопкой снести таблицу и option v1.
6. Фронтенд из §8 пушится в `main`, DEV пересобирается, повторная проверка форм и CTA.

### PROD

1. Владелец: обновление ядра и темы на PROD, бэкап базы и файлов.
2. Токен в wp-config PROD, загрузка `bm-stats.php` и папки.
3. Открыть «BM Stats» → «Обслуживание», снять сводку по `bm_lead`, согласовать дату бэкфилла, dry-run, бэкфилл.
4. Удалить `bm-internal-stats.php`, кнопкой удалить таблицу и option v1. Файл остаётся в git для отката.
5. Запустить `deploy-prod.yml`.
6. Смоук: hard load, тестовая заявка, смена статуса на `spam`, клик по CTA, запрос API с токеном с рабочей машины.
7. Далее: `seo-ops/integrations/wp/stats_loader.py` и отчёт сверки «WP-лиды vs GA4 vs Ads».

Необратимые шаги выполняет владелец вручную: удаление файла v1, удаление таблицы v1, обновление ядра.

---

## 11. Журнал деплоя и найденные ловушки

**2026-09-04, DEV и PROD.** Ядро обновлено 6.9.7 → 7.1, тема Twenty Twenty-Five 1.4 → 1.5 (не используется роутером). PHP 8.2.33, MariaDB 10.11.18, object cache нет. Часовой пояс на обоих был +00:00, переведён на Europe/Amsterdam до бэкфилла. На PROD 50 заявок с 2026-03-11 (не с 8 марта), корзина пуста; бэкфилл выполнен по всем 50. Данные v1 удалены кнопкой, файл v1 удалён вручную. Фронтенд v2 на PROD в релизе `20260904T210852Z_c718c441d1a0`. API проверен с сервера и с рабочей машины.

Ловушки, которые стоили времени:
- **Один REST-маршрут у v1 и v2.** Пока оба файла лежат в `mu-plugins`, `/pageview` обрабатывает v1, так как грузится раньше по алфавиту. v2 теперь регистрирует маршруты с `override=true` и приоритетом 20; надёжнее удалять v1 до установки v2.
- **WordPress подключает только PHP-файлы верхнего уровня `mu-plugins`.** Папку `bm-stats/` без загрузчика `bm-stats.php` он не видит.
- **WP-CLI на этом сайте не работает для команд, загружающих WordPress** (`wp option`, `wp eval`): роутер статики срабатывает под CLI, отдаёт `index.html` и завершает процесс. Работает `wp db query` и `wp db export`. Починка роутера = проверка `defined('WP_CLI')`, отложена.
- **PowerShell:** вызывать `curl.exe`, а не `curl`, иначе заголовок `X-BM-Token` не доходит.
- На PROD есть `bm-mail-from.php`, которого нет в `_prod/`; версии `bm-v0-static-router.php` на PROD (3790 байт) и DEV (3981 байт) различаются. Оба факта записать в `_prod/` отдельной задачей.

Сделано 2026-09-05: загрузчик `seo-ops/integrations/wp/stats_loader.py`, снапшот `build_wp_snapshot.py`, сверка `run_lead_reconciliation_v1.py` (WP vs GA4 vs Ads API). Плагин 2.1.0: пресеты периода с «Сегодня» по умолчанию, почасовой график, переключаемые линии, матрица страница × источник, предупреждение о смешанном периоде.

Плагин 2.2.0 (2026-09-05): исключение собственных визитов меткой в браузере (кнопка на «Обслуживании», cookie `bm_stats_uit` на год, события пишутся типом `excluded`, тестовые заявки из исключённого браузера получают статус «Спам»), необязательная константа `BM_STATS_EXCLUDE_IPS`, нейтральный маршрут beacon `POST /wp-json/bm/v1/hit` (фронтенд переключён, старые маршруты работают), страница «Воронка» на агрегатах с доверительными интервалами.

Открытое решение: анализ пути посетителя (воронка по визитам). Разбор целесообразности, права и доверия к данным: `docs/WP-STATS-V2-FUNNEL-DECISION.md`. До решения обязательны меры доверия: исключение визитов владельца, нейтральный адрес beacon, калибровка по журналу Apache.

