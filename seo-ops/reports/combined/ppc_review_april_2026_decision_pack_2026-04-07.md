# Decision Pack — PPC review April 2026

**Date:** 2026-04-07
**Scope:** Campaign 23271040037 (NL | Gevelisolatie | Search), 2026-03-07 – 2026-04-05 (29 days)
**Report mode:** preliminary
**Live API calls:** none

---

## 1. Objective

Поддержать ручное принятие решений по PPC-кампании в первые 30 дней после запуска сайта: что защищать, что поставить на паузу, что мониторить. Кампания в ранней стадии с очень низким объёмом конверсий — все выводы предварительные.

---

## 2. Data sources used

| Source | Artifact path | Freshness | Rows/records |
|--------|--------------|-----------|-------------|
| google_ads_csv | `D:/projects/bmklus/google/outputs/campaign_23271040037_last30d.csv` | export date unknown | 29 rows |
| google_ads_csv | `D:/projects/bmklus/google/outputs/keywords_23271040037_last30d.csv` | export date unknown | 186 rows |
| google_ads_csv | `D:/projects/bmklus/google/outputs/keywords_23271040037_last30d_flagged.csv` | export date unknown | 77 rows |
| google_ads_csv | `D:/projects/bmklus/google/outputs/search_terms_23271040037_last30d.csv` | export date unknown | 246 rows |
| google_ads_csv | `D:/projects/bmklus/google/outputs/search_terms_23271040037_last30d_flagged.csv` | export date unknown | 3 rows |
| google_ads_csv | `D:/projects/bmklus/google/outputs/campaign_23271040037_action_candidates_last30d.csv` | export date unknown | 82 rows |
| artifact | `seo-ops/snapshots/normalized/keyword_master/keyword_master_v2.csv` | generated 2026-04-07 | 1 032 rows |
| artifact | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv` | generated 2026-04-07 | 55 rows |
| artifact | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv` | generated 2026-04-07 | 129 rows |
| artifact | `seo-ops/snapshots/normalized/pages/page_inventory_v1.csv` | generated 2026-04-07 | 54 rows |

---

## 3. Current state

**Период анализа:** 2026-03-07 – 2026-04-05, 29 активных дней (source: google_ads_csv).

**Ключевые метрики кампании** (source: google_ads_csv, confidence: medium — <30 дней post-cutover, низкий объём):

| Метрика | Значение |
|---------|---------|
| Показы | 1 708 |
| Клики | 230 |
| Стоимость | €349.61 (google_ads_cost_eur) |
| CTR | 13.5% (source: calculated, clicks/impressions) |
| Avg CPC | €1.52 (google_ads_avg_cpc_eur) |
| Конверсии | 3 |
| CPA | €116.54 (source: calculated, cost/conv) |

**Бюджет:** 10 EUR/day (source: user_reported). Кампания работала 29 дней → ожидаемый spend ~€290. Фактический spend €349.61 — возможны дни с превышением дневного лимита.

**Период старта:** сайт перешёл на новый домен 2026-03-08. Данные campaign начинаются с 2026-03-07, то есть захватывают 1 день pre-cutover. Этот день следует считать шумом.

**Структура кампании:** 7 ad groups, 7 тем, 186 активных ключевых слов (source: google_ads_csv).

---

## 4. Key findings

1. **Все 3 конверсии — из одной темы (core_isolation)**
   - Evidence: core_isolation → 91 clicks, €138.05, 3 conv (source: google_ads_csv). Остальные 6 тем — 0 конверсий суммарно.
   - Confidence: medium (3 конверсии — крайне низкий объём; закономерность реальная, но не статистически значимая)
   - Impact: Если тему core_isolation урежут или перераспределят бюджет на не-конвертирующие темы, единственный работающий конверсионный путь ослабнет.

2. **55% бюджета потрачено на ключевые слова без ни одной конверсии (pause-risk bucket)**
   - Evidence: €193.42 / €349.61 = 55.3% spend на 7 pause-risk keywords (source: calculated из google_ads_csv). Топ: "gevel isoleren en bekleden" PHRASE €51.44, "buitenmuur isoleren en stucen" PHRASE €30.49, "buitengevelisolatie met steenstrips" EXACT €26.44.
   - Confidence: low (объём конверсий слишком мал для статистически надёжных выводов; 30 дней недостаточно для отсева)
   - Impact: При продолжении без действий ~€200/мес уходит на темы "bekleden / steenstrips / stucen", которые семантически дальше от прямого запроса на гавелизоляцию.

3. **Единственный конвертирующий search term — "voorgevel isolatie" (1 конверсия, €1.29 CPC)**
   - Evidence: source: google_ads_csv, search_terms_last30d. Один показ, 1 клик, 1 конверсия.
   - Confidence: low (единичное событие; может быть случайным)
   - Impact: Не делать агрессивных выводов. Зафиксировать как сигнал для наблюдения.

4. **Tracking gap: 10 paid sessions с (not set) landing page в GA4**
   - Evidence: source: ga4_api (artifact ga4_landing_pages_by_channel_last90d.csv), 10 paid sessions, engagement rate 0%.
   - Confidence: medium
   - Impact: Пока (not set) сессии не устранены, landing page data неполна. Решения о LP performance надо откладывать.

5. **18 ключевых слов присутствуют одновременно в PPC и в органике (GSC)**
   - Evidence: cross-source match keyword_master_v2 × gsc_query_page (source: calculated). Пример: "buitengevelisolatie" — GSC impressions 517, query-level position 28.7 (source: gsc_api, 90d), PPC cost €35.87, 1 конверсия.
   - Confidence: low (organic позиция 28+ = практически нет органического трафика; overlap существует, но PPC пока необходим)
   - Impact: Наблюдать динамику органики. Преждевременно сокращать PPC на эти слова.

6. **Основная landing page /gevelisolatie/ работает нормально по engagement**
   - Evidence: 116 paid sessions, engagement rate 76.0%, avg duration 172s (source: ga4_api, 90d). Вторая по трафику /gevelisolatie/afwerkingen/ — 51 sessions (source: ga4_api, 90d), engagement 63%, avg duration 156s.
   - Confidence: medium
   - Impact: LP side не требует срочных изменений. Engagement метрики в норме для сервисной страницы.

---

## 5. Recommended actions

| Приоритет | Действие | Категория | Confidence | Ожидаемый эффект |
|-----------|---------|-----------|-----------|-----------------|
| Do now | Проверить, что все конверсионные события (Contact_Form_Site, Phone, WhatsApp) реально триггерятся в GA4 | Tracking | high | Устранить возможное занижение конверсий; без этого все keyword-level выводы потенциально искажены |
| Do now | Защитить 3 конвертирующих ключевых слова: buitengevelisolatie, gevel van buiten isoleren, buitenmuur isoleren — проверить их бюджет и ставки | Keyword | high | Сохранить единственный работающий конверсионный путь |
| Do now | Вручную просмотреть топ pause-risk keywords: "gevel isoleren en bekleden" PHRASE (€51.44), "buitenmuur isoleren en stucen" PHRASE (€30.49), "buitengevelisolatie met steenstrips" EXACT (€26.44). Принять решение: ещё 2 недели или пауза | Keyword | low | Освободить ~€130/мес при паузе; риск — потеря слов, которые могут конвертировать |
| Monitor | Мониторить 8 search terms как кандидатов в negatives (топ: "gevelisolatie buitenkant" €21.07, 10 кликов, 0 conv) — повторно оценить через 2 недели | Search terms | medium | Не добавлять преждевременно; ждать больше данных |
| Monitor | Расследовать (not set) landing page tracking gap (10 paid sessions) — проверить тег GA4 на всех страницах | Tracking | medium | Устранить пробел в LP данных |
| Monitor | Отслеживать 6 review-bucket keywords (€70.71, 0 conv) ещё 2 недели до следующего review | Keyword | medium | Избежать преждевременного отсева |
| Do later | Очистить 67 zero-impression enabled keywords — низкий приоритет, не тратят бюджет | Account hygiene | low | Снизить account clutter |
| Do later | Рассмотреть untapped planner keywords (gevelisolatie buitenkant ~590/mo, buiten gevelisolatie ~480/mo) только после стабилизации текущей кампании | Expansion | low | Без срочности; сначала починить efficiency |

---

## 6. What should NOT be changed

- **Landing page /gevelisolatie/** — engagement 76%, 116 paid sessions, топовая LP. Не трогать структуру или контент.
- **Budget потолок 10 EUR/day** — при 3 конверсиях за 30 дней нет оснований для увеличения бюджета. Сначала нужно улучшить efficiency.
- **3 конвертирующих ключевых слова** — не менять match type, не снижать ставки, не объединять в другие ad groups пока не накопится больше данных.
- **Структура campaign/ad groups** — не реструктурировать кампанию пока не накопится ≥20–30 конверсий для надёжного анализа.
- **DataForSEO enrichment** — не запускать при текущем объёме данных; не обоснован.

---

## 7. Risks and uncertainties

- **Крайне низкий объём конверсий (3 за 30 дней)**: все выводы на уровне отдельных ключевых слов — provisional. При паузе "неправильных" слов можно случайно отключить будущие конвертеры.
- **Tracking неполнота**: если conversion events не все настроены, реальных конверсий может быть больше. Все CPA-выводы под вопросом до верификации tracking.
- **Пересечение с pre-cutover периодом**: кампания стартовала 2026-03-07, сайт мигрировал 2026-03-08. Первый день данных — шум.
- **GA4 landing page window (90d) vs PPC window (30d)**: сессии за прошлые 90 дней включают время до полной миграции сайта. Engagement метрики за 90d не идентичны текущему 30-дневному PPC периоду.
- **Google Ads CSVs — ручной экспорт**: дата экспорта не зафиксирована в артефакте. Данные могут быть не самыми свежими.
- **Conversion attribution**: Google Ads и GA4 считают конверсии по разным моделям (last-click vs data-driven). Цифра "3 конверсии" — из Google Ads CSV, не из GA4.

---

## 8. Provenance

- **Generated:** 2026-04-07
- **Report mode:** preliminary
- **Data sources used:**
  - google_ads_csv: campaign, keywords, search_terms (export date unverified)
  - artifact keyword_master_v2 (generated 2026-04-07, 1 032 rows)
  - artifact ga4_landing_pages_last90d (generated 2026-04-07, 55 rows)
  - artifact page_inventory_v1 (generated 2026-04-07, 54 rows)
  - source: gsc_api (via keyword_master_v2 cross-source section, 90d snapshot)
- **Live API calls made:** none
- **Numeric confidence cap:** low — site is 1m post-cutover (<6m); PPC budget 10 EUR/day; per-keyword volume below reporting threshold
- **Known limitations:**
  1. Очень низкий объём конверсий (3 за 30 дней) — все keyword-level выводы provisional
  2. GA4 window 90d не совпадает с PPC window 30d
  3. Нет Google Ads API — только ручные CSV exports, дата неизвестна
  4. Нет ad copy / Quality Score / audience данных
  5. (not set) landing pages (10 sessions, source: ga4_api, 90d) искажают LP engagement data
  6. Conversion attribution: Google Ads vs GA4 — разные модели
