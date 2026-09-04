# Desktop routines — готовые задачи для Claude Code Desktop (локальные)

Создаются в Desktop: вкладка **Code → Routines → New routine → Local**
(нужна версия Desktop ≥ 1.1.5368). Или в любой Desktop-сессии обычным текстом:
«создай локальную задачу … по понедельникам в 13:00». Хранятся в
`~/.claude/scheduled-tasks/<name>/SKILL.md`; расписание, папка и модель — только через UI.

В поле Instructions вставляй только текст между тремя кавычками, без самих кавычек и без пояснений после блока.

Общие настройки для всех трёх задач:

| Поле | Значение |
|---|---|
| Working folder | `D:\projects\bmklus\v0-site\site` |
| Permission mode | auto (задачи read-only по отношению к сайту; пишут только в `seo-ops/`) |
| Worktree | выключить (нужны локальные `.env.local`, venv, снапшоты) |
| После создания | нажать **Run now**, на каждый запрос разрешения выбрать «always allow» |

Правило проекта остаётся: задачи собирают данные и пишут отчёты. Никаких правок сайта, GBP, Ads.
Пропущенный запуск (компьютер спал) Desktop догоняет один раз при пробуждении — в промптах есть защита от устаревшей даты.

---

## 1. `seo-weekly-refresh` — понедельник 13:00 (Weekly, или Custom cron `0 13 * * 1`)

**Description:** Еженедельный сбор GSC + GA4, analysis report и операторская сводка.

**Instructions:**

```
Запусти skill /seo-refresh полностью (все шаги, включая GA4 90d/28d и GSC 28d).
Перед стартом проверь дату: если сегодня не понедельник или вторник, всё равно выполняй, но в сводке первой строкой напиши «Запуск догоняющий, плановая дата пропущена».
Сводку сохрани в seo-ops/reports/weekly/weekly_<YYYY-MM-DD>.md (дата запуска) и покажи её в ответе.
Обязательно в сводке: клики/показы 28d vs prev 28d, ключевые события GA4 по каналам (organic отдельно), кластер /gevelisolatie/, статус двух новых страниц /gevel-schilderen/keimen/ и /muren-stucen/sausklaar-behangklaar/ (показы, клики, позиция по семействам «keimen kosten» и «sausklaar stucen»), топ-3 movers вверх/вниз.
Сверь с seo-ops/data/decision_log_v1.csv: по каждому действию со статусом done и датой review_after ≤ сегодня дай оценку «работает / рано / не сработало» с цифрами до и после.
Ничего не редактируй в app/, components/, lib/, data/. Не коммить.
```

## 2. `seo-monthly-offpage` — 1-е число месяца, 13:00

**Description:** Ежемесячный снимок ссылок, local pack Rotterdam, GBP и список доноров (~$0.85 DataForSEO).

**Instructions:**

```
Из папки seo-ops выполни:
integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_final_audit_collect_2026_08.py --only backlinks --only serp_local --only gbp --only link_prospects
Затем сравни с предыдущим состоянием и напиши отчёт seo-ops/reports/seo/offpage_monthly_<YYYY-MM-DD>.md:
- referring domains bm-klus-bv.nl сейчас vs прошлый месяц vs KPI плана (≥12 к 2026-11-15, ≥25 к 2027-02-15); список новых доноров;
- присутствие в local pack Rotterdam по 5 основным запросам (stukadoor rotterdam, gevelisolatie rotterdam, isolatiebedrijf rotterdam, buitenmuur stucen rotterdam, gevelrenovatie rotterdam) vs прошлый месяц;
- GBP: категория, число отзывов, рейтинг vs прошлый месяц;
- изменения в списке доноров tier A/B (появились/исчезли).
Стоимость возьми из seo-ops/outputs/dataforseo_cost_log.json за сегодняшний запуск и укажи в отчёте. Если стоимость запуска превысила $2 — остановись и напиши почему.
Ничего не редактируй вне seo-ops/. Не коммить.
```

Schedule → **Custom**, cron: `0 13 1 * *` (первого числа каждого месяца, 13:00).

## 3. `gbp-weekly-post` — четверг 13:00 (Weekly, или Custom cron `0 13 * * 4`)

**Description:** Черновик одного поста для Google Business Profile по реальному кейсу; публикует человек.

**Instructions:**

```
Запусти skill /gbp-weekly-post. Соблюдай все его правила: один пост, только nl-NL, факты только со страницы-источника, лог seo-ops/gbp-posts/log.jsonl.
Если у последней записи лога published: false — новый пост не готовь, напомни опубликовать предыдущий и покажи его текст.
В ответе выведи путь к файлу, текст поста, URL кнопки и какое фото взять.
```

---

## Разовая задача (не повторяется): проверка индексации новых страниц — 2026-09-18, 13:00

**Instructions:**

```
Через MCP gsc (siteUrl https://bm-klus-bv.nl/) выполни index_inspect для
https://bm-klus-bv.nl/gevel-schilderen/keimen/ и https://bm-klus-bv.nl/muren-stucen/sausklaar-behangklaar/ (languageCode nl).
Затем search_analytics за последние 14 дней с dimensions=page,query и pageFilter на каждую страницу (filterOperator contains).
Напиши коротко: проиндексированы ли обе (verdict, coverageState, lastCrawlTime), первые показы/позиции по семействам «keimen» и «sausklaar/behangklaar», и что делать, если не проиндексированы (повторный запрос в Search Console, проверка внутренних ссылок).
Добавь строку в seo-ops/data/decision_log_v1.csv со статусом проверки. Ничего больше не редактируй.
```
