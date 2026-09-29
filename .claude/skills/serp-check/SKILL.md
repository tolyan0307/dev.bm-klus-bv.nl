---
name: serp-check
description: Живая выдача Google NL через DataForSEO — наша позиция, кто в топе, какой тип страниц Google считает ответом; local pack для города. Использовать при «проверь выдачу», «кто в топе по X», конкурентных вопросах.
---

# SERP check

DataForSEO — источник контекста: наши позиции и клики считаются по GSC (правила — `seo-ops/CLAUDE.md`). Около $0.002 за запрос.

## Как снять
- **Пачкой со снимком** (жёсткий лимит скрипта — 10 запросов; `--dry-run` показывает план без вызовов):
  ```bash
  cd D:/projects/bmklus/v0-site/site/seo-ops
  set -a && source integrations/.env.local && set +a
  PYTHONIOENCODING=utf-8 integrations/.venv/Scripts/python.exe analyzers/seo/run_dataforseo_serp_snapshot_v1.py --keywords "kw1,kw2" --limit 2
  ```
  Скрипт берёт топ-10 (depth 10). Результат — `snapshots/normalized/dataforseo/serp_snapshot_v1.json`: только органика, `keywords[].items[]`, `position` = `rank_absolute` (считает и SERP-фичи); наш домен — `'bm-klus' in domain`. Какие SERP-фичи были в выдаче — только в raw-файле `snapshots/raw/dataforseo/dataforseo_serp_snapshot_v1.json` (`…result[0].item_types`). Без `--keywords` — встроенный список из 5 запросов.
- **Разово через MCP `dataforseo`**: `api_request` POST `/v3/serp/google/organic/live/advanced`, `location_code` 2528 (Нидерланды) или `location_coordinate` центра города для локальной выдачи и local pack, `language_code` `nl`. В 2026-08 ответ MCP обрезался примерно до 10 элементов — для глубины больше 10 нужен свой запрос с `depth`.

## Сводка
- По каждому запросу: наша позиция или «нет в топе»; топ-5 доменов с типом игрока (платформа или лидген, производитель или магазин, местный подрядчик, госсайт); SERP-фичи (AI Overview, local pack, «Mensen vragen ook»).
- Главный вопрос — какой тип страницы Google считает ответом, а не только кто выше.
- Метка `[DataForSEO SERP, live <дата>, NL]`. С позициями GSC напрямую не сравнивать: GSC — среднее по показам и географии.
- Национальные информационные выдачи и «gevelisolatie kosten» заняты платформами — «дожимать контентом» не предлагать. Нишевые kosten-семейства с KPI (keimen kosten) — исключение (см. `seo-ops/knowledge.md`).
