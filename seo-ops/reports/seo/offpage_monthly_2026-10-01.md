# Off-page monthly — bm-klus-bv.nl · 2026-10-01

**Сбор:** 2026-10-01T11:08–11:11Z · **Стоимость прогона:** **$0.8234** (лимит $2 — не превышен) · [DataForSEO, 2026-10-01]
**Источник:** `run_dataforseo_final_audit_collect_2026_08.py --only backlinks --only serp_local --only gbp --only link_prospects`
**База сравнения:** `reports/seo/offpage_monthly_2026-09-04.md` и `reports/seo/link_prospects_2026-09-04.md` (27 дней).

Все цифры — оценки индекса DataForSEO: сравнивать между месяцами, не с GSC. Local pack — один срез, десктоп, `location_code=1010751` (Rotterdam), nl.

## Стоимость

| Стадия | $ |
|---|---:|
| backlinks (bulk ranks / referring domains / backlinks, summary own, refdomains own) | ≈0.122 |
| serp_rotterdam (12 запросов) | 0.0405 |
| gbp (2 запроса) | 0.0108 |
| link_prospects (own + 18 конкурентов) | 0.650 |
| **Итого** | **0.8234** (38 записей в `outputs/dataforseo_cost_log.json` за 2026-10-01) |

---

## 1. Referring domains — KPI

| Метрика | 2026-09-04 | 2026-10-01 | Δ |
|---|---:|---:|---:|
| Referring domains | 1 | **1** | 0 |
| Referring main domains | 1 | 1 | 0 |
| Backlinks | 13 | 13 | 0 |
| Domain rank | 23 | 23 | 0 |

Единственный донор по-прежнему `improuse.com` (rank 23, 13 ссылок, `ugc`, first seen 2024-12-09). **Новых доноров: 0. Потерянных: 0.**

| KPI | Цель | Сейчас | Разрыв | Дней осталось | Нужный темп |
|---|---:|---:|---:|---:|---|
| ≥12 RD к 2026-11-15 | 12 | 1 | **−11** | 45 | ~1 донор / 4 дня |
| ≥25 RD к 2027-02-15 | 25 | 1 | **−24** | 137 | ~1 донор / 5,7 дня |

**Статус: не выполняется, второй месяц подряд ноль.** Контрольная точка прошлого отчёта («≥5 RD к ~05.10, иначе KPI к 15.11 недостижим») не пройдена. KPI ≥12 к 2026-11-15 практически недостижим: даже начатые сейчас размещения появятся в индексе DataForSEO с задержкой в недели. Уверенность: высокая.

### Конкуренты за тот же период (referring domains)

| Домен | 09-04 | 10-01 | Δ |
|---|---:|---:|---:|
| takkenkamp.com | 734 | 901 | +167 |
| isolatiespecialist.nl | 3336 | 3381 | +45 |
| plusisolatie.nl | 1265 | 1302 | +37 |
| stuc-gigant.nl | 253 | 277 | +24 |
| stucadoorsbedrijfdevries.nl | 318 | 338 | +20 |
| si-isolatie.nl | 129 | 148 | +19 |
| pluimers.nl | 1102 | 1118 | +16 |
| metsel-gigant.nl | 362 | 377 | +15 |
| stucwerk-info.nl | 30 | 45 | +15 |
| jandeisolatieman.nl | 831 | 844 | +13 |
| gevelrenovatie-info.nl | 336 | 349 | +13 |
| munnekestukadoors.nl | 37 | 44 | +7 |
| cpgroenendijk.nl | 191 | 197 | +6 |
| vanginkelstukadoors.nl | 64 | 68 | +4 |
| batouz.nl | 10 | 12 | +2 |
| vanklassestukadoors.nl | 22 | 23 | +1 |
| stukadoor-ddziko.nl | 0 | 1 | +1 |
| rotterdamse-stukadoor.nl | 119 | 119 | 0 |
| **bm-klus-bv.nl** | **1** | **1** | **0** |

Локальные ориентиры (`batouz.nl` 12, `vanklassestukadoors.nl` 23) растут медленно — их уровень по-прежнему реалистичная цель.

---

## 2. Local pack Rotterdam — 5 основных запросов

**BM klus BV в local pack: 0 из 5. Было 0 из 5.** В органике top-20 по этим пяти запросам нас тоже нет.

⚠ **Методическая оговорка:** в этот раз DataForSEO вернул в local pack только 3 позиции на запрос (видимый 3-pack), в прошлом срезе было 9–12. Сравнение возможно только по топ-3; перестановки на позициях 4–12 этим срезом не видны.

| Запрос | BM klus 09-04 → 10-01 | Топ-3 пака сейчас (рейтинг / отзывов) |
|---|---|---|
| stukadoor rotterdam | нет → нет | Stukadoor Rotterdam (4.8/13) · Rotterdam Stukadoor (4.9/17) · Van Klasse Stukadoors & Schilders (4.8/203) |
| gevelisolatie rotterdam | нет → нет | Rotterdam Vloerisolatie (4.9/19) · Kruipruimte Isolatie Rotterdam (5.0/1) · Spouwmuurisolatie Rotterdam (5.0/8) |
| isolatiebedrijf rotterdam | нет → нет | Kruipruimte Isolatie Rotterdam (5.0/1) · Spouwmuurisolatie Rotterdam (5.0/8) · Rotterdam Vloerisolatie (4.9/19) |
| buitenmuur stucen rotterdam | нет → нет | Stukadoor Rotterdam (4.8/13) · AT Stukadoor Rotterdam (4.9/31) · Van Klasse (4.8/203) |
| gevelrenovatie rotterdam | нет → нет | Gevel Specialisatie Rotterdam (4.9/20) · KH Gevelrenovatie Rotterdam (4.8/76) · Gevelrenovatie en Onderhoud Rijnmond (5.0/7) |

Примечания:
- `buitenmuur stucen rotterdam`: задача вернулась со статусом 40106 (частичный результат, только top-10 органики). Нормализатор такие задачи отбрасывает, данные взяты из raw напрямую.
- Isolatie-паки занимают однотипные гео-профили категории «Aannemer voor isolatie» — той же, что теперь у нас основная. Несколько профилей сидят на одних адресах (`Hofplein 20` у «Rotterdam Stukadoor» и «Rotterdam Vloerisolatie»), похоже на lead-gen-сеть. Вход возможен даже с 1 отзывом — барьер в гео-релевантности и названии профиля, а не только в отзывах. Уверенность: средняя (один срез).
- Смена основной категории на `Aannemer voor isolatie` (сентябрь) за месяц входа в пак не дала. Уверенность в причине: низкая — точка измерения (центр города) и близость профиля к ней тоже влияют.

### Побочно (органика top-20, остальные 7 запросов набора)

| Запрос | 09-04 | 10-01 |
|---|---|---|
| sierpleister rotterdam | #4 | **#6** (`/onze-werken/`) |
| gevel schilderen rotterdam | #7 | **нет в top-18** |
| остальные (gevelisolatie, buitenmuur isoleren, gevel stucen, buiten stucwerk, gevelisolatie bedrijf) | нет | нет |

Обе позиции — разовые срезы с AI Overview в выдаче; подтверждать по GSC, а не по этому снимку. Уверенность: низкая.

---

## 3. GBP — BM klus BV

| Поле | 2026-09-04 | 2026-10-01 |
|---|---|---|
| Основная категория | Aannemer voor isolatie | Aannemer voor isolatie (без изменений) |
| Доп. категории | Bouwbedrijf, Aannemer, Schilder, Stukadoorsbedrijf | без изменений |
| Отзывов | 19 | **20** (+1) |
| Рейтинг | 4.9 | **≈4.95** (API отдаёт 5; распределение 19×5★, 1×4★) |
| Фото | — | 73 |
| Claimed | да | да |
| Адрес / сайт | Bonaventurastraat 58B / bm-klus-bv.nl | без изменений |

+1 отзыв за 27 дней — контрольная точка «≥25 отзывов» не пройдена. Конкуренты в паках: от 1 до 203 отзывов; по количеству мы в середине, а не в хвосте.

Темы отзывов: gevel 10, stucwerk 8 (было 7), communicatie 4, taalbarrière 3. Тема `isolatie` (была 7) в топ-10 тем API в этот раз не попала — вероятно, вытеснена мелкими темами; не сигнал.

---

## 4. Доноры tier A/B

`link_prospects_2026-10-01.md` против `link_prospects_2026-09-04.md` — первый настоящий месячный diff.

| | 09-04 | 10-01 |
|---|---:|---:|
| Tier A | 41 | **43** |
| Tier B | 35 | **37** |
| Tier C | 46 | 48 |
| Уникальных доноров у конкурентов | 3211 | 3425 |

**Появились:**

| Tier | Домен | Категория | Конкурентов | rank | spam | score |
|---|---|---|---:|---:|---:|---:|
| A | klantenvertellen.nl | reviews | 1 (takkenkamp) | 185 | 0 | 203 |
| A | vattenfall.nl | editorial_or_partner | 1 (takkenkamp) | 148 | 0 | 166 |
| B | vakman-indebuurt.nl | directory | 4 (batouz, munnekestukadoors, stukadoor-ddziko, vanklassestukadoors) | 23 | 0 | 75 |
| B | vlwonen.nl | editorial_or_partner | 3 (jandeisolatieman, pluimers, stucadoorsbedrijfdevries) | 41 | 0 | 85 |

**Пропали:** нет. Переходов между tier: нет. Топ-10 tier A по score почти тот же (`isocoat-isolatie.nl` 217 → 214).

Самые практичные новинки:
- **`vakman-indebuurt.nl`** — каталог, где есть 4 локальных стукадора из наших паков. Бесплатная регистрация профиля — самый быстрый кандидат в первый донор.
- **`klantenvertellen.nl`** — платформа отзывов (ссылки с профиля компании). Требует решения владельца: платная подписка.
- `vattenfall.nl` — партнёрская программа энергетика, получить ссылку маловероятно.

Категории — эвристика по имени домена; `editorial_or_partner` = «не распознано», проверять вручную.

---

## Выводы

1. **Ссылки: 1 донор, второй месяц без изменений; KPI ≥12 к 2026-11-15 практически недостижим.** Конкуренты за месяц прибавили +1…+167 доменов. Список целей есть (43 A + 37 B), аутрич не начат. Приоритет: высокий. Уверенность: высокая.
2. **Local pack 0/5, без изменений.** Смена категории пока не помогла. В этот раз видны только топ-3 пака (раньше 9–12 позиций) — сравнение глубже топ-3 невозможно.
3. **GBP: +1 отзыв (20), рейтинг ≈4.95.** Темп отзывов — около 1 в месяц.
4. **Новые доноры:** `vakman-indebuurt.nl` (каталог с 4 локальными конкурентами) — быстрый первый шаг; `klantenvertellen.nl` — по решению владельца.

## Решения для владельца

- Пересмотреть KPI ≥12 RD к 2026-11-15 (перенести срок или оставить как недостижимый ориентир) — и решить, кто и когда начинает регистрации в каталогах tier B/C. Без этого следующий срез снова покажет 0.
- `klantenvertellen.nl`: стоит ли платить за профиль ради ссылки и отзывов — `[CLAIM_NEEDS_CONFIRMATION]` по цене, не проверялось.

## Что сравнивать в следующем срезе (~2026-11-01)

- referring domains: любое движение > 1;
- отзывы GBP: ≥ 22;
- присутствие в паках `isolatiebedrijf rotterdam` / `gevelisolatie rotterdam`; проверить, сколько позиций пака отдаёт DataForSEO (3 или 9–12);
- diff tier A/B против `link_prospects_2026-10-01.md`.

## Provenance

- Raw: `snapshots/raw/dataforseo/final_audit_2026-08/{backlinks,serp_local,gbp,link_prospects}.json` (перезаписаны 2026-10-01)
- Normalized: `snapshots/normalized/dataforseo/final_audit_2026-08_summary.json` (`_generated_at` 2026-10-01T11:11:51Z)
- Доноры: `reports/seo/link_prospects_2026-10-01.md` (= `link_prospects_latest.md`), база — `link_prospects_2026-09-04.md`
- Cost log: `outputs/dataforseo_cost_log.json`, 38 записей с timestamp 2026-10-01T11:08–11:11Z
- Значения за 2026-09-04 — из `reports/seo/offpage_monthly_2026-09-04.md` (снапшоты в git не хранятся)
