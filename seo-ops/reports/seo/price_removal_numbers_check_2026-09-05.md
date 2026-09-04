# Повторный прогон после удаления цен + сверка оставшихся цифр с источниками

**Дата:** 2026-09-05 · **Запрос:** «ещё раз всё прогони и если есть цифры, которые нужно оставить, привести в актуальное состояние по рынку»
**Метод:** grep по собранному `out/` (64 страницы) на `€`, `euro`, `%`, `kWh`, `m³`; затем сверка каждой оставшейся денежной/нормативной цифры с первоисточником через WebFetch (rvo.nl, milieucentraal.nl).

## 1. Что осталось в `out/` после волн 0–2

| Что | Где | Решение |
|-----|-----|---------|
| `priceRange: "€€"` в JSON-LD LocalBusiness | все страницы ×2 | Оставить — нечисловое стандартное поле schema.org |
| Шкала бюджета «€ / €€ / €€€» в таблице отделок | `/gevelisolatie/afwerkingen/` | Оставить — относительная, без сумм |
| `gemiddeldBesparing` «Indicatief €400–€900/jaar (bron: Milieu Centraal)» | 21 городская страница | **Устарело/завышено → обновлено** (см. §2) |
| Условия ISDE: мин. 10 m², Rd ≥ 3,5, заявка в течение 24 мес., при одной мере сумма ниже | `/gevelisolatie/subsidie-vergunning/`, subsidie-секция, rc-страница | **Подтверждено** (§3), без изменений |
| Streefwaarde gevel Rc 6 (RVO) | `lib/content/gevelisolatie.ts` | **Подтверждено** (§3) |
| Rc 4,7 «referentie nieuwbouw» | `/gevelisolatie/rc-waarde-dikte/` | Bbl-требование к новостройке для gevel; на странице RVO Standaard не упоминается, соответствует Bbl. Оставлено |
| Суммы ISDE в €/m² | нигде | На сайте не публикуются — добавлять не нужно |

Сумм с `€` за услуги BM klus в `out/` нет: 0 вхождений «Vanaf €», «richtprijzen … €», «Indicatie totaal», `AggregateOffer`.

## 2. Экономия на городских страницах — было / стало

**Источник:** Milieu Centraal, «Buitenmuur isoleren aan de buitenkant», *laatst gewijzigd 29 juni 2026*, gasprijs €1,37/m³ (verwachte prijs 2025–2040).

| Тип дома | Газ/год | €/год |
|----------|---------|-------|
| Tussenwoning | 240 m³ | €320 |
| Hoekwoning | 530 m³ | €750 |
| 2-onder-1-kap | 550 m³ | €750 |
| Vrijstaand | 800 m³ | €1.100 |

**Было на сайте:** «€600–€900/jaar bij een typisch rijtjeshuis» и варианты €400–€900 — для tussenwoning завышение в 2–3 раза, источник указан без даты.

**Стало (все 21 страница):** базовая фраза «Indicatief circa €320 per jaar bij een tussenwoning en circa €750 per jaar bij een hoekwoning of twee-onder-een-kapwoning (bron: Milieu Centraal, juni 2026, gasprijs €1,37/m³)» + локальное уточнение (appartement/bovenwoning — ниже; vrijstaand — до €1.100; groeikern — уже изолированная spouw; Carnisselande — новее) + «De werkelijke besparing hangt af van uw woning, isolatiedikte en stookgedrag».

Файл: `lib/content/gevelisolatie-locations.ts` (поле `gemiddeldBesparing`), рендер — callout «Gemiddelde besparing in {city}» на `app/gevelisolatie/[location]/page.tsx`.

## 3. Нормативные цифры — сверка

| Утверждение на сайте | Источник | Результат |
|----------------------|----------|-----------|
| ISDE: минимум 10 m² gevel | rvo.nl/isde/woningeigenaren/isolatiemaatregelen («U laat minimaal 10 m2 gevel isoleren») | ✅ |
| ISDE: максимум — не упомянут | тот же («maximaal 170 m2») | Не требуется, опционально |
| ISDE: Rd ≥ 3,5 m²K/W | тот же | ✅ |
| ISDE: заявка ná uitvoering, binnen 24 maanden | тот же | ✅ |
| ISDE: при одной мере сумма ниже, чем при 2+ | тот же: €20,25/m² при одной мере, ×2 = €40,50/m² при двух и более в течение 24 мес.; +€6/m² biobased («uitvoering in 2025 of later») | ✅ формулировка верна |
| RVO streefwaarde gevel Rc 6 | rvo.nl standaard-streefwaarden-woningisolatie («Gevel: Rc 6 m²K/W, ongeveer 26 cm isolatie») | ✅ |
| Vergunning beslistermijn «doorgaans 8 weken» | Omgevingswet, reguliere procedure | ✅ (общеизвестная норма, не перепроверялась отдельно) |

Сторонние сайты (isoguard, si-isolatie и т.п.) называют для 2026 другие суммы ISDE (€20/€26/€30 per m²) — это вторичные источники, на сайте суммы не публикуются, поэтому расхождение не влияет.

## 4. Рекомендация по поддержке

- `gemiddeldBesparing` теперь содержит дату источника. Пересверять раз в год (Milieu Centraal обновляет цены на газ) — добавить в чеклист weekly/monthly routine как «annual» пункт.
- Суммы ISDE на сайт не выносить: меняются ежегодно, RVO — единственный авторитетный источник, ссылка на rvo.nl уже есть.
