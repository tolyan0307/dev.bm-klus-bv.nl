# Возможности SEO / Analytics оператора

Этот документ описывает, что Claude уже умеет анализировать для bm-klus-bv.nl,
что умеет частично, и чего пока нет.

---

## Что уже реализовано

### Общий обзор сайта
Claude читает unified snapshot (GSC + GA4) и analysis report, и может:
- показать top страницы по кликам и впечатлениям
- показать top поисковые запросы
- показать сессии по landing pages
- показать ключевые события (Contact_Form_Site, Phone, Whatsapp) по страницам
- показать источники трафика
- показать дневную динамику сессий за 28 дней

### SEO opportunities
- Страницы в striking distance (позиция 4–15) с низким CTR
- Запросы с высокими впечатлениями, но низким CTR
- Страницы, набирающие обороты (рост кликов/впечатлений vs предыдущий период)

### SEO risks
- Страницы, теряющие клики и впечатления по сравнению с предыдущим периодом

### Conversion opportunities
- Страницы с сессиями, но без ключевых событий (лидов)
- Разрыв между трафиком и конверсиями

### Measurement issues
- Landing pages с `(not set)` в GA4
- Отсутствие ключевых событий по всем страницам (возможная проблема трекинга)
- Подозрительные источники трафика с низким engagement

### Кластер `/gevelisolatie/`
- Отдельный обзор всех страниц кластера
- Обнаружение слабо видимых страниц кластера
- Отслеживание потерь кликов внутри кластера

### Лог заявок и серверная статистика сайта (WP, с 2026-09-04)
Плагин BM Stats v2 на сайте — первичная истина о лидах. Claude через `analyzers/pages/build_wp_snapshot.py` и `run_lead_reconciliation_v1.py` может:
- показать заявки по статусам (new / qualified / won / lost / spam) и по источнику первого касания (ads / campaign / organic / referral / direct)
- показать просмотры, клики по WhatsApp/телефону/e-mail и заявки по страницам без cookies и consent-фильтра
- сверить заявки WP с ключевыми событиями GA4 и конверсиями Ads по неделям и посчитать коэффициент недоучёта GA4
- оценить антиспам: honeypot, лимиты, отказы Turnstile
Ограничение: просмотры и клики есть только с 2026-09-04, заявки — с 2026-03-11 (бэкфилл).

### Сравнение периодов
- 28 дней vs предыдущие 28 дней по страницам
- Дельты по кликам, впечатлениям, позиции

### Приоритеты и действия
- Список страниц для наблюдения (medium/high confidence)
- Список рекомендуемых действий на 7–14 дней

---

## Что умеет частично

### Аудит отдельных страниц
Данные по страницам есть в snapshot, но глубокий аудит (контент, CTA, внутренние ссылки)
требует ручной интерпретации. Claude может помочь, но уровень детализации ограничен
доступными метриками.

### Анализ запросов по intent
Запросы из GSC доступны, но автоматического классификатора intent нет.
Claude может интерпретировать intent вручную на основе текста запроса.

### Приоритизация по confidence
Правила присваивают confidence (low / medium / high), но это эвристика,
а не статистическая модель. При малом объёме данных confidence может быть занижен.

---

## Что пока не реализовано

- **Google Ads API как MCP** — нет; через SDK (`google-ads`, конфиг `google/google-ads.yaml`) подключён и используется: `integrations/google_ads/campaign_daily_loader.py`, утилиты в `D:/projects/bmklus/google/`
- **Полный движок каннибализации** — есть базовые проверки, но не полный анализ
- **Автоматическое расписание** — нет cron, нет автозапуска отчётов

## MCP-слой (подключено 2026-08-15, local scope Claude Code)

| Сервер | Что даёт | Auth |
|--------|----------|------|
| `dataforseo` (официальный, v3, `--mode stdio`) | Live SERP, keyword data, Labs, backlinks, on-page — через `api_request` + встроенную документацию (`docs_search`) | `DATAFORSEO_LOGIN`/`PASSWORD` из `.env.local` |
| `google-analytics` (официальный Google) | GA4 отчёты в диалоге: run_report, funnel, realtime, custom dimensions | GA4 service account |
| `gsc` (`mcp-server-gsc`) | Search analytics запросы в диалоге | Тот же service account — **требуется добавить его email как пользователя в GSC property** |

Скрипты `integrations/` и анализаторы остаются основным воспроизводимым слоем;
MCP — интерактивный слой для ad-hoc анализа. Правила source hierarchy действуют без изменений
(DataForSEO = enrichment only).

Проектные слэш-команды (`.claude/skills/`, добавлены 2026-08-15): `/seo-refresh` (полный
рефреш снапшотов + сводка), `/serp-check` (живая выдача NL + конкуренты), `/page-diagnosis`
(диагноз одной страницы по контракту). Обёртки над существующими анализаторами, read-only.

- **DataForSEO** — подключён: скриптовый слой (`analyzers/seo/run_dataforseo_serp_snapshot_v1.py`, enrichment кластера gevelisolatie) + MCP
- **Competitor intelligence** — частично: live SERP через DataForSEO; нет backlink-профилей конкурентов в регулярном процессе

---

## Какие вопросы можно задавать уже сейчас

| Вопрос | Что Claude сделает |
|--------|-------------------|
| "Проанализируй сайт" | Проверит свежесть данных → покажет 3–5 главных выводов → предложит углубить |
| "Какие возможности для анализа?" | Перечислит реализованные, частичные, и нереализованные возможности |
| "Что сейчас важнее всего?" | Даст приоритизированный список по категориям SEO / CRO / Measurement / Cluster |
| "Покажи кластер gevelisolatie" | Отдельный обзор всех страниц `/gevelisolatie/` с метриками и findings |
| "Какие страницы теряют трафик?" | Из comparison данных покажет declining pages |
| "Какие конверсионные проблемы?" | Покажет страницы с трафиком без лидов + measurement issues |
| "Что делать на этой неделе?" | Покажет next actions из analysis report |

---

## Как Claude отвечает на "проанализируй сайт"

1. Проверяет, есть ли свежий snapshot и report
2. Кратко описывает доступные данные и их свежесть
3. Даёт 3–5 главных выводов из analysis report
4. Группирует выводы по категориям (SEO / CRO / Measurement / Cluster)
5. Перечисляет направления для углублённого анализа:
   - общий обзор
   - money pages
   - кластер gevelisolatie
   - conversion gaps
   - measurement health

---

## Приоритеты для bm-klus-bv.nl сейчас

1. **Кластер `/gevelisolatie/`** — стратегический приоритет, всегда включать в анализ
2. **Money pages** — `/gevelisolatie/`, `/gevel-schilderen/`, `/buiten-stucwerk/`, `/sierpleister/`, `/muren-stucen/`
3. **Конверсионный путь** — `/contact/` и формы на всех страницах
4. **Measurement health** — убедиться, что ключевые события корректно отслеживаются

---

## Источники данных

| Файл | Что содержит |
|------|-------------|
| `seo-ops/data/processed/latest_combined_snapshot.json` | Unified snapshot GSC + GA4 |
| `seo-ops/data/processed/latest_analysis_report.json` | Findings analysis report |
| `seo-ops/reports/weekly/latest_analysis_report.md` | Markdown-версия отчёта |
| `seo-ops/config/priority-pages.yaml` | Списки приоритетных страниц |
| `seo-ops/config/conversions.yaml` | Ключевые события и правила |
