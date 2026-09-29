---
name: seo-offpage
description: Ежемесячный платный снимок внешних факторов через DataForSEO (~$0.85) — ссылающиеся домены, local pack Роттердама, GBP, список доноров — со сравнением с прошлым месяцем и KPI. Использовать в ежемесячной рутине или по явной просьбе («ссылки / local pack / доноры за месяц»).
---

# Off-page снимок за месяц

Платно: около $0.8–0.9 за прогон. Запускать только из ежемесячной рутины или по явной просьбе владельца. Правила анализа — `seo-ops/CLAUDE.md`, KPI — `seo-ops/knowledge.md`.

## Сбор
```bash
cd D:/projects/bmklus/v0-site/site/seo-ops
set -a && source integrations/.env.local && set +a
PYTHONIOENCODING=utf-8 integrations/.venv/Scripts/python.exe analyzers/seo/run_dataforseo_final_audit_collect_2026_08.py --only backlinks --only serp_local --only gbp --only link_prospects
```
Встроенный денежный лимит есть только у стадии `link_prospects`, итоговая стоимость видна после прогона — поэтому запускать ровно эти четыре стадии. Стоимость — из последних записей `outputs/dataforseo_cost_log.json`; больше $2 — не повторять и объяснить в отчёте.
Сырые данные и `reports/seo/link_prospects_latest.md` перезаписываются, поэтому «прошлый месяц» берём из предыдущего отчёта `reports/seo/offpage_monthly_*.md` и прошлого датированного `reports/seo/link_prospects_<дата>.md`.

## Отчёт → `seo-ops/reports/seo/offpage_monthly_<YYYY-MM-DD>.md`
- Ссылающиеся домены bm-klus-bv.nl: сейчас / месяц назад / KPI (≥ 12 к 2026-11-15, ≥ 25 к 2027-02-15); новые доноры.
- Local pack Роттердама по 5 запросам (stukadoor rotterdam, gevelisolatie rotterdam, isolatiebedrijf rotterdam, buitenmuur stucen rotterdam, gevelrenovatie rotterdam): где мы есть, сравнение с прошлым месяцем.
- GBP: основная категория, число отзывов, рейтинг — против прошлого месяца.
- Доноры tier A/B (`reports/seo/link_prospects_latest.md` против прошлого датированного файла): кто появился и кто пропал.
- Стоимость прогона.

Метки `[DataForSEO, <дата>]`. Это оценки индекса DataForSEO: сравнивать между месяцами, не с GSC. Local pack — один день, десктоп, центр города.

Ничего не менять вне `seo-ops/`. Не коммитить.
