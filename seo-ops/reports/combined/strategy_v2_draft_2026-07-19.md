# Стратегия продвижения v2 — ЗАФИКСИРОВАНА

**Дата:** 2026-07-19 (утверждена владельцем в тот же день, решения — §5)
**Статус:** УТВЕРЖДЕНА — реализация начата с этапа 0
**База:** свежие данные всех 5 источников (GSC, GA4, Google Ads, DataForSEO, GBP) от 2026-07-19; SERP-снимки 2026-05-09; полная история Ads 2024–2026; аудит миграции, CTA-аудит.

---

## 1. Диагноз (что показали данные)

### 1.1. SEO не работало никогда — ни на старом сайте, ни на новом
- Год-к-году, тот же сезон (18.04–16.07): старый WP-сайт 2025 — 81 клик (51 бренд), новый Next.js 2026 — 58 кликов (44 бренд). Небрендовая органика оба года ≈ 10–30 кликов/квартал. [GSC, YoY, query-level]
- Новый сайт **улучшил** позиции: `/gevelisolatie/` 54.9 → 15.2, `/buiten-stucwerk/` 40.8 → 11.2, главная 24.5 → 9.9. Техническая пересборка — в плюс, но до топ-10 денежных запросов не дотянули. [GSC, YoY, page-level]
- Миграция марта-2026 капитал НЕ потеряла: 48 правил 301 задеплоены и работают через CI (Apache/Antagonist, root.htaccess), legacy-хвост показов затух до нуля к июлю, ключевые страницы проиндексированы с верными каноникалами. Остаточные мелочи — см. §5.

### 1.2. Ads: перестройка 2026-03-15 ухудшила экономику вдвое
- Старая кампания «BM klus BV конверсии» (2024–2025): €6 334, **144 конверсии, CPA €37–48**. [Ads API, campaign-level]
- Новая «NL | Gevelisolatie | Search» (с 15.03.2026): €1 277, 18 конверсий, **CPA €88**; июль — 121 клик, **0 конверсий**. [Ads API]
- Что конвертировало исторически (2024–2026-03): **фасадный комплекс**:
  - buiten stucwerk (ключ): 30.5 conv, CPA €26 — лучший конвертер за всю историю
  - pleisterwerk buiten: 10 conv, €30; gevel stucwerk: 6 conv, €22
  - gevel van buiten isoleren: 13 conv, €17; buitengevelisolatie: 7–9 conv, €11–25
  - gevel/buiten schilderen: ~5 conv, CPA €5–46
  - search terms с CPA €2–10: spachtelputz buitenmuur, buiten stukadoor, steenstrips-варианты, «stukadoor + город» (rotterdam, leiden, bergen op zoom)
- Что НЕ конвертировало: интерьер «Muren stucen» (€121, 0 conv), «dunpleister» (€97, 0), широкие DIY/info «huis isoleren buitenkant» (CPA €72), «buitenmuur isoleren en stucen» (€152 суммарно, ~0).
- Майский инцидент (24.04–08.05, конверсии 6→0) — смесь просадки спроса и подмены conversion action; техника исключена; восстановлен 10.05.

### 1.3. SERP: где реально пробиться (снимки 2026-05-09, NL)
- **Города (gevelisolatie {stad})** — самый пробиваемый кластер: топ-10 из локальных подрядчиков с шаблонными city-страницами, агрегаторов 1–2. **Local pack на 12 мест во всех 6 городских SERP, выше органики** → GBP решает.
- **Фасадная штукатурка** — пробиваема точечными статьями («buitenmuur stucen nadelen» — в топе мелкие подрядчики).
- **Интерьерная штукатурка (sausklaar/behangklaar)** — выигрывают статьи-объяснялки «verschil …», не страницы услуг; наша /muren-stucen/ (#27, #51) — страница услуги, потому и не растёт.
- **Kosten-кластер забетонирован**: eigenhuis.nl, homedeal.nl, лидген-сеть Concurrent/Gigant + AI Overview. Не тратим контент-силы; kosten-страницы — только поддержка.
- «gevel sierpleister» — товарный интент (магазины/производители), подрядчику там делать нечего.
- Мы №12 по «buitengevelisolatie rotterdam» — **главной страницей**, собственная city-страница `/gevelisolatie/rotterdam/` слабее и каннибализирована.
- Прямые конкуренты-подрядчики (для competitors.yaml): lsgi.nl, kooyisolatie.nl, plusisolatie.nl, takkenkamp.com, pluimers.nl, javo-isolatie.nl, isolatiespecialist.nl, devriesisolatie.nl, ijsselmonde.org (Rotterdam, прямейший), 040stucadoor.nl, vanginkelstukadoors.nl, wandenplafondspuiten.nl.

### 1.4. Конверсионный путь противоречит бизнес-констрейнту
Констрейнт: звонки обслуживать нельзя (нет языка); рабочие каналы — форма (email) и WhatsApp.
- **Телефон — единственный контакт в шапке на всех страницах** (navbar.tsx:221, 355; WhatsApp в шапке нет), первый в desktop sticky-баре (sticky-cta-bar.tsx:90), первая строка сайдбара /contact/ (page.tsx:186).
- Тексты ошибок форм шлют в телефон («Probeer het opnieuw of bel ons»).
- Клики tel:/wa.me/mailto **не инструментированы в коде** — Phone=0 в GA4 означает «не измеряется», а не «не звонят». Объём лидов, утекающих в мёртвый канал, невидим.
- Хорошее: hero money-страниц уже WhatsApp-friendly (форма → WA с prefill → пассивный tel), форма на своём WP-endpoint с Turnstile, событие `bm_lead_form_success` есть.

### 1.5. Measurement
- 28 дней: 4 key events всего. Conversion actions в Ads менялись в мае (swap 6769425725 → 6790076058).
- GA4 (not set): 48 сессий, eng rate 0.06 — consent/бот-гигиена.
- GBP: 19 отзывов, 4.9 — сильный актив; 719 показов/90д — профиль недоиспользован; в API verificationState=UNVERIFIED.

---

## 2. Стратегическое ядро (главные решения)

**Р1. Позиционирование: «Gevelspecialist регион Rotterdam / Zuid-Holland» — фасадный комплекс.**
Одна семантическая крыша: gevelisolatie + buiten stucwerk/sierpleister + gevel schilderen. Это подтверждено конверсиями за 2.5 года. Интерьер (muren stucen) — не приоритет: трафик есть, лидов нет (0 conv в Ads).

**Р2. SEO — local-first, не info-first.**
Ошибка прошлой стратегии: ставка на национальные info/kosten-запросы, где топ занят агрегаторами и AI Overview. Новая ставка: (а) city-страницы фасадного комплекса в реальной зоне обслуживания, (б) GBP/local pack, (в) точечные фасадные статьи. Национальный kosten-контент — только как поддержка E-E-A-T.

**Р3. Ads — вернуть проверенную смешанную структуру, а не «только gevelisolatie».**
Структура из трёх тем фасадного комплекса + точные соответствия исторически конвертящих запросов. Ожидание по истории: CPA €35–50 вместо текущих €88.

**Р4. Конверсионный путь — WhatsApp-first everywhere.**
Телефон убрать из приоритетных позиций (шапка, sticky, sidebar), ошибки форм — на WhatsApp. Обязательно инструментировать ВСЕ клики (включая tel — чтобы видеть утечку).

**Р5. Решения — только от данных.**
Еженедельный snapshot, ежемесячный пересмотр приоритетов через seo-ops. Никаких «переписали тексты и ждём».

---

## 3. План работ

### Этап 0 — Измерения + CRO-фиксы (неделя 1) — БЛОКИРУЕТ ВСЁ
1. Инструментировать в коде: `bm_whatsapp_click`, `bm_phone_click`, `bm_mailto_click` (+placement) на все CTA; события в GA4 → key events → импорт в Ads.
2. WhatsApp-first: navbar (tel → WA), sticky desktop (WA первым), сайдбар /contact/ («Bellen» вниз), ошибки форм → WA-ссылка, WA в hero главной.
3. Ads: проверить единственность/корректность активного conversion action (6790076058) + добавить Whatsapp-конверсию как secondary (позже primary, когда наберёт объём).
4. GBP: верифицировать аккаунт.
5. Гигиена: (not set) в GA4 (consent mode), удалить мёртвый inline-quote-form.tsx.

### Этап 1 — Ads-реструктуризация (неделя 1–2)
1. Вернуть смешанную структуру: 3 группы — (а) Gevelisolatie exact-core (buitengevelisolatie, gevelisolatie met stucwerk, steenstrips, crepi), (б) Buiten stucwerk (buiten stucwerk, gevel stucen, stukadoor buitengevel, spachtelputz buitenmuur, pleisterwerk buiten), (в) Gevel schilderen (gevel laten schilderen/verven, buitenmuur schilderen kosten).
2. Негативы: интерьер (muren stucen, dunpleister, behangklaar, sausklaar), DIY (zelf, roller, gamma/hornbach/praxis), широкие info («huis isoleren buitenkant» и пр.).
3. Лендинги: группа (а) → /gevelisolatie/, (б) → /buiten-stucwerk/, (в) → /gevel-schilderen/. НЕ на /afwerkingen/.
4. Тест «stukadoor + город» (rotterdam, leiden и зона обслуживания) — исторически CPA €9–18.
5. Бюджет: подтвердить у владельца (сейчас ~€10/день; май показал Lost-IS-rank 74% при €1–6).

### Этап 2 — SEO local-first (недели 2–8)
1. **City-страницы фасадного комплекса**: пересобрать по образцу лидеров SERP (lsgi.nl, javo-isolatie.nl): H1 «Gevelisolatie {stad}», локальные проекты из /onze-werken/, отзывы этого города, ссылка на муниципальные субсидии, FAQ + LocalBusiness/Service schema. Только реальная зона обслуживания (~10–15 городов), выкатка постепенная. Решить каннибализацию главная vs /gevelisolatie/rotterdam/.
2. **GBP-конвейер**: еженедельные посты (проекты), ответы на все отзывы (AI-черновик → ручное утверждение), просить клиентов упоминать услугу+город; фото проектов. Цель — local pack.
3. **Фасадные статьи** (по одной в 1–2 недели): «buitenmuur stucen nadelen» (проверенный формат), «verschil sausklaar/behangklaar» (перехват интерьерного инфо-трафика статьёй, не страницей услуги), ETICS-темы (уже поз. 6–8!).
4. **CTR-фикс striking distance**: title/meta для etics-запросов (поз. 6–8), gevelisolatie leiden (7.1), buitengevelisolatie rotterdam (6.3).
5. **Ссылочный профиль**: NL-каталоги, NAP-консистентность, отраслевые площадки, поставщики (Strikolith — уже в SERP), локальные упоминания. Backlink-аудит стартово (никогда не делался).

### Этап 3 — Инструментальный контур (недели 3–6, параллельно)
1. Keyword Bank: банк ключей из GSC + Ads search terms + DataForSEO с кластерами/интентом/статусами и очередью контента (расширение keyword_master v3).
2. Content Refresher: ежемесячная GSC-петля (просевшие/невидимые страницы → rewrite/merge/keep).
3. Еженедельный автозапуск combined snapshot + analysis report (cron), месячный SERP-чек приоритетных запросов через DataForSEO (бюджет $47.9 хватит надолго — SERP-снимок ≈ $0.002/запрос).
4. DataForSEO MCP для Claude Code (было в роадмапе seo-ops).
5. Заполнить competitors.yaml (список §1.3), обновить capabilities.md/CLAUDE.md.

### Этап 4 — Техдолг миграции (низкий приоритет, по ходу)
1. Живой curl-чек всех 48 редиректов (один раз, зафиксировать артефакт).
2. `/object-11/` vs `/object11/` в root.htaccess:85.
3. Двойное состояние /schoonmaak-na-verbouwing/ (1 143 показа — крупнейший legacy-актив).
4. Декомиссия WordPress → блокировка wp-путей (после переноса формы или осознанно оставить WP как form-backend).
5. project_state_v1.yaml: убрать ложный «Vercel hosting».

---

## 4. KPI и контрольные точки

| Метрика | Сейчас (июль 2026) | 4 недели | 8 недель | 12 недель |
|---|---|---|---|---|
| Лиды/мес, все каналы (форма+WA, после починки измерений) | ~4 видимых | базлайн честный | +30% | +60% |
| Ads CPA | €88 (июль: 0 conv) | < €60 | < €50 | €35–50 |
| Небрендовые клики GSC/28д | ~10 | +50% | ×2 | ×3 |
| Запросы в топ-10 (целевые кластеры) | ~5 | +5 | +10 | +20 |
| Local pack появления (GBP insights) | базлайн | — | рост | рост |

Еженедельно: snapshot + отчёт. Ежемесячно: пересмотр приоритетов, keyword-ран, refresher.

---

## 5. Зафиксированные решения владельца (2026-07-19)

1. **Зона обслуживания: радиус 80–100 км от Роттердама.** Города берём ярусами, каждый подтверждаем объёмом (DataForSEO) и реальными проектами:
   - Tier 1 (ядро, ~0–30 км): Rotterdam, Vlaardingen, Schiedam, Spijkenisse, Barendrecht, Ridderkerk, Capelle a/d IJssel, Delft, Dordrecht, Zoetermeer
   - Tier 2 (~30–60 км): Den Haag, Leiden, Gouda, Hoeksche Waard (Klaaswaal, Nieuw-Beijerland), Breda, Bergen op Zoom
   - Tier 3 (~60–100 км): Etten-Leur, Halsteren, Katwijk, Vught, Almere — в первую очередь там, где есть проекты в /onze-werken/
2. **Фокус: только наружные работы** (фасадный комплекс). Интерьер (muren stucen) — без инвестиций; максимум статья-перехват информационного трафика.
3. **Бюджет Ads: €13/день** (~€395/мес). При историческом CPA €35–50 целевой ориентир — 8–11 лидов/мес.
4. **WhatsApp — обычный** (не Business). Работаем с ним; переход на WA Business — опциональное улучшение на потом, не блокер.
5. **WordPress остаётся бэкендом формы** (`/wp-json/bm/v1/contact`), деплой-цепочка (git → CI → Apache) не меняется. Пункт «декомиссия WP + блокировка wp-путей» из этапа 4 снят.
