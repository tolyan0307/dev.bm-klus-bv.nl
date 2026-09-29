---
name: seo-refresh
description: Еженедельный сбор данных (GSC 28/90 дней, GA4, WP-лог заявок, сверка лидов, расход и CPA Ads) и недельная сводка с проверкой решений из журнала. Использовать при «обнови данные», «собери статистику», «что за неделю», в еженедельной рутине.
---

# SEO refresh — сбор данных и недельная сводка

Сначала прочитай `seo-ops/CLAUDE.md` (правила анализа) и `seo-ops/knowledge.md` (факты, границы данных).

## 1. Сбор
Перед запуском скопируй текущий `seo-ops/data/processed/latest_combined_snapshot.json` во временную папку сессии (scratchpad) — это прошлый прогон для сравнения; файл будет перезаписан.

Весь блок — одним вызовом Git Bash: переменные окружения и `$PY` между вызовами не сохраняются.
```bash
cd D:/projects/bmklus/v0-site/site/seo-ops
set -a && source integrations/.env.local && set +a
export PYTHONIOENCODING=utf-8 PYTHONUTF8=1
PY=integrations/.venv/Scripts/python.exe
$PY analyzers/pages/build_page_inventory.py
$PY integrations/run_combined_snapshot.py
$PY analyzers/seo/build_gsc_query_page_snapshot.py
$PY analyzers/seo/build_gsc_query_page_snapshot.py --days 28
$PY analyzers/pages/build_ga4_landing_page_snapshot.py
$PY analyzers/pages/build_ga4_landing_page_snapshot.py --days 28
$PY analysis/run_analysis_report.py
$PY analyzers/pages/build_wp_snapshot.py
$PY analyzers/pages/build_wp_snapshot.py --days 28
$PY analyzers/pages/run_lead_reconciliation_v1.py --days 56
$PY integrations/google_ads/campaign_daily_loader.py
```
- Если скрипт GSC открывает браузер или висит на входе — токен протух: прерви, останови рутину и напиши владельцу, что нужен повторный вход (`integrations/test_gsc_access.py` при нём).
- `build_page_inventory.py` — локальный, без API: пересобирает список страниц сайта, по которому сборщики сопоставляют URL.
- `run_combined_snapshot.py` при ошибке печатает ERROR и выходит с кодом 1, но снапшот может уже перезаписаться неполным. `run_analysis_report.py` выносит такие проблемы в раздел «Data issues» в начале `reports/weekly/latest_analysis_report.md` — проверь его; `_generated_at` должен быть сегодняшним.
- Что уже есть в сводном снапшоте (`data/processed/latest_combined_snapshot.json`): окна GSC кончаются «сегодня − 3» (последняя дата данных — `gsc_page_comparison.current_range.end`); URL с параметрами, в т. ч. UTM-ссылка из GBP, склеены со своей страницей (`merged_variants`); `ga4_key_events_by_channel` — ключевые события по каналам за 28 дней и прошлые 28; брендовые запросы помечены `is_brand`, мусорные рефереры — `junk`.
- `campaign_daily_loader.py` печатает клики, конверсии и расход Ads за 28 дней до вчера; CPA = расход / конверсии.

## 2. Сводка → `seo-ops/reports/weekly/weekly_<YYYY-MM-DD>.md` и в ответ
Шапка: дата запуска, окна и последняя дата данных по каждому источнику. Если с прошлой `weekly_*.md` прошло больше 8 дней — строка «предыдущий плановый запуск пропущен».
1. **GSC 28d против прошлых 28d**: клики, показы, CTR. В сводном снапшоте главная уже склеена с UTM-URL из GBP; в query-level CSV эти URL ещё раздельные — там считай суммой.
2. **Движения**: топ-3 страницы вверх и вниз (без артефактов раздвоения URL). Позиция: меньше — лучше; рост числа — ухудшение.
3. **Кластер `/gevelisolatie/`**: хаб, 5 кластерных страниц, города суммой и заметные по отдельности.
4. **Новые и дочерние страницы** (`/gevel-schilderen/keimen/`, `/muren-stucen/sausklaar-behangklaar/`): показы, клики, позиция по семействам их запросов, пересечение с родителем — по критерию каннибализации из `seo-ops/CLAUDE.md`.
5. **Лиды**: WP 28d против прошлых 28d — всего, без спама, по статусам, по источнику первого касания, по формам; CTA-клики WP. GA4: ключевые события по каналам из `ga4_key_events_by_channel` (органика отдельно). Доля `Contact_Form_Site` от форм WP — по 56-дневной сверке. Ads: расход, конверсии, CPA.
6. **Измерение**: мусорные рефереры, `(not set)`, расхождения между источниками.
7. **Журнал решений** (`seo-ops/data/decision_log_v1.csv`): по каждой строке `done` с наступившим `review_after` — «работает / рано / не сработало» с цифрами до и после; граница до/после — дата выката на прод, а не коммита. Просроченные `pending` — списком.
8. **Что делать в ближайшие 7–14 дней**: 3–6 пунктов, без уже сделанного.

Каждая цифра — с меткой источника, выводы — с уверенностью, гипотезы помечены.

## Границы
- Пишем только в `seo-ops/`; сайт, GBP и Ads не трогаем. Не коммитить — владелец решает сам.
- Находки `rules.py` (`latest_analysis_report.*`) — подсказки с порогами шума, не выводы: перепроверяй по снапшотам и query-level данным.
- Сводки до 2026-09-29 считались по окну GSC «до вчера» и с раздвоенной главной — сравнивая с ними, делай поправку (`seo-ops/knowledge.md`, календарь).
