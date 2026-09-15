# Аудит AI-изображений и план замены на реальные фото

**Дата:** 2026-09-15
**Статус:** анализ выполнен, замена выполнена 2026-09-15 (см. §0)
**Источники кандидатов:** `C:\Users\tolya\Downloads\Telegram Desktop\temp` (12 файлов) + `public/images/projects/` (391 фото проектов) + неиспользуемые реальные фото в `source-images/`

> Примечание: `docs/IMAGE-SLOT-AUDIT.md` (2026-03-13) утверждает «ноль AI-изображений». Это неверно и устарело.

---

## 0. Статус выполнения (2026-09-15, вечер)

**Выполнено:** заменены 44 baseName через пайплайн + 5 файлов `nadelen/` напрямую = **49 изображений, ~57 слотов**. Код не менялся (те же baseName). Волны 1–3 из §9 закрыты полностью, кроме позиций «нет реального материала».

| Что | Результат |
|-----|-----------|
| Кроп | под пропорцию заменяемой AI-картинки (1:1 / 16:9 / 4:5), smart-crop `attention` или ручная позиция |
| Пресеты | `serviceCard` для всех карточек; `process-hero` — `hero`, но обрезан до w768 (фон с opacity 6 %) |
| Ограничение веса | 10 текстурных картинок обрезаны до w466; максимальный отдаваемый вариант 57 KB, медиана 28 KB |
| Суммарный вес вариантов | 3133 KB (AI) → 3162 KB (реальные); nadelen 774 KB → 354 KB |
| Проверки | `tsc` 0 ошибок, `next build` exit 0, целостность манифеста 0 пропусков, визуальная проверка контактными листами |

**Отклонения от плана §4:** `gevel-sierpleister-silicaat` (была пустая заглушка) → общий кадр белой мелкой sierpleister (IMG_6111) — не «силикатная», но лучше серого квадрата. `materiaal-eps` → `gevelisolatie-montage-isolatieplaten` (графитовый EPS). `gevelisolatie-voordelen` (главная «Onze specialiteit» + pillar) → Etten-Leur Bankenstraat na-02 в 4:3 по замечанию владельца (IMG_3030 не подошло); `subsidie-vergunning` → Etten-Leur Strikolith na-02, чтобы не дублировать дом на pillar-странице. `process-hero` → Etten-Leur Bankenstraat voor-16. `etics-layer-insulation-ext` («Steenstrips» на главной) оставлен AI.

**Не заменено (ждёт фото от владельца):** см. §5 — 27 слотов.

**Откат:** старые AI-исходники лежат в `source-images/_ai-legacy/` (вне git); старые варианты восстанавливаются через `git checkout HEAD -- public/images data/image-manifest.json`. Оригиналы новых фото: `source-images/_originals/temp-2026-09-15/`.

---

## 1. Как определялись AI-изображения

Признаки, по которым файл отнесён к AI:

| Признак | Что означает |
|---------|--------------|
| Размер ровно 1024×1024 (или 1536×1024, 1200×1200), формат webp/jpg, без EXIF | Выход генератора изображений (DALL-E / GPT-image) |
| Размер 2752×1536 с EXIF | Выход Gemini / Imagen (16:9) |
| Визуально: идеальный свет, «стоковые» люди, английские надписи, нереалистичные детали | Подтверждение при просмотре контактных листов |

Реальные фото: телефонные размеры (1500×2000, 2000×1500, 4000×3000, 4284×5712), формат JPG/HEIC, часто EXIF (у пересланных через Telegram EXIF срезан — но размеры телефонные).

Все 119 не-проектных изображений просмотрены визуально на контактных листах. Все 391 фото проектов тоже просмотрены (для подбора замен).

---

## 2. Итог по цифрам

| Категория | Кол-во |
|-----------|--------|
| AI-изображений в активном использовании (уникальных baseName) | **72** |
| Слотов на страницах, где они показываются | ~85 |
| Реальных не-проектных фото в использовании | 6 |
| Реальных фото, лежащих в репо, но нигде не используемых | 1 (`gevelisolatie-montage-isolatieplaten`) + `source-images/1–11.jpg` |
| AI-файлов в `public/images/`, которые нигде не используются (legacy) | 29 |
| Сломанных/ошибочных изображений на живых страницах | 4 (см. §6) |

---

## 3. Кандидаты на замену: папка temp (12 файлов)

| Файл | Размер | Что на фото | Куда подходит |
|------|--------|-------------|---------------|
| IMG_1841.JPG | 1500×2000 портрет | Фасад на лесах, смонтированные EPS-плиты вокруг окна, дюбели | `wat-is-gevelisolatie`, `service-isolatie`, `detail-koudebruggen`, `materiaal-eps` |
| IMG_1889.JPG | 1500×2000 портрет | То же, другой ракурс, плиты крупнее | `etics-isolatie` (over-ons), `dienst-isolatie`, `materiaal-eps` |
| IMG_2237.JPG | 1500×2000 портрет | Отслаивающаяся краска/штукатурка на стене | `nadelen/loslaten-hechting`, `gevel-voorbereiding`, `voorbereiding-bestaand` |
| IMG_2283.JPG | 720×1280 | Брендинг BM klus BV (плёнка с логотипом) | Низкое разрешение. Только маленькие карточки: `offerte-berekening` как «фирменная» заглушка |
| IMG_2286.JPG | 720×1280 | То же | То же |
| IMG_3030.JPG | 1500×2000 портрет | Белый оштукатуренный дом, улица, деревья, солнце (готовый результат) | `gevelisolatie-voordelen`, `subsidie-vergunning`, `scenario-*` |
| IMG_3405.JPG | 1500×2000 портрет | Крупный план crepi/sierpleister, угол с кирпичом позади | `afwerking-crepi`, `gevel-sierpleister-crepi`, `etics-layer-finish-ext` |
| IMG_3738.JPG | 4000×3000 (orient 6 → портрет) | Подоконник и откос окна в sierpleister | `detail-dagkanten`, `details-dagkanten` |
| IMG_3801.JPG | 2000×1500 ландшафт | Цементная штукатурка наносится на кирпичную стену (половина покрыта) | **`wat-is-buitenmuur-stucen`** (идеально), `gevelafwerking`, `service-renovatie`, `ondergrond-baksteen` |
| IMG_6111.JPG | 1536×2048 портрет | Белая sierpleister, угол дома, крыша | `dienst-sierpleister`, `service-stucwerk`, `ondergrond-pleister`, `gevel-sierpleister-spachtelputz` |
| IMG_6346.JPG | 2000×1500 ландшафт | Старая кирпичная кладка крупно, известковый шов | `ondergrond-baksteen`, `etics-layer-insulation-ext` (карточка «Steenstrips» — с оговоркой, это настоящий кирпич) |
| IMG_7503.HEIC | 4284×5712 портрет | Мелкая sierpleister, вентрешётка, тёмный цоколь | **`detail-plint`**, `details-plintzone`, `gevel-sierpleister-spachtelputz`, `etics-layer-finish-ext` |

Технические заметки:
- HEIC не читается `sharp` в проекте (нет libheif). Раскодировать через Windows WIC (PowerShell + `System.Windows.Media.Imaging`) в JPG перед пайплайном — проверено, работает.
- IMG_3738 имеет EXIF-orientation 6: перед `images:generate` нужно применить `rotate()` или предварительно повернуть, иначе вариант ляжет боком.
- IMG_2283/2286 (720×1280) не пройдут hero/gallery-пресеты, годятся только для card/serviceCard.

---

## 4. Полный реестр AI-слотов по страницам и предлагаемые замены

Легенда колонки «Замена»: **temp/…** — файл из папки temp; **proj/…** — фото проекта из `public/images/projects/`; **нет** — реального аналога нет (см. §5).

### 4.1 Главная `/`

| Слот | Компонент | Текущее (AI) | Замена |
|------|-----------|--------------|--------|
| Карточка «Gevelisolatie» | services-section | service-isolatie | temp/IMG_1841 |
| Карточка «Gevel schilderen» | services-section | service-coating | proj/delft-willemstraat na-01 |
| Карточка «Buiten stucwerk» | services-section | service-renovatie | temp/IMG_3801 |
| Карточка «Sierpleister» | services-section | service-stucwerk | temp/IMG_6111 |
| Карточка «Muren stucen» | services-section | dienst-muren | **нет** (интерьер) |
| Блок ETICS, главное фото | etics-section | gevelisolatie-voordelen | temp/IMG_3030 или proj/etten-leur-bankenstraat na-01 |
| Мини-карточка «Stucwerk» | etics-section | etics-layer-wall-ext | proj/rotterdam-buitenstucwerk na-03 |
| Мини-карточка «Steenstrips» | etics-section | etics-layer-insulation-ext | **нет** (нет проектов со steenstrips) |
| Мини-карточка «Schilderwerk» | etics-section | etics-layer-mesh-ext (кисть) | proj/delft-willemstraat na-05 |
| Мини-карточка «Sierpleister» | etics-section | etics-layer-finish-ext | temp/IMG_7503 |
| Фон блока «Werkwijze» (alt="") | process-section | process-hero (люди над чертежами) | proj/rottekade voor-10 (мастер на лесах) или proj/strijen na-07 (бус с логотипом) |

### 4.2 `/diensten/` (ServicesRail)

| Карточка | Текущее (AI) | Замена |
|----------|--------------|--------|
| Buitengevelisolatie | dienst-isolatie | temp/IMG_1889 |
| Gevel schilderen | dienst-schilderen | proj/delft-willemstraat na-01 |
| Buiten stucwerk | dienst-stucwerk | proj/rotterdam-buitenstucwerk na-02 |
| Sierpleister | dienst-sierpleister (орнаментальный барельеф — не по теме) | temp/IMG_6111 |
| Muren stucen | dienst-muren | **нет** |
| Schoonmaak | dienst-schoonmaak | **нет** |

### 4.3 `/gevelisolatie/` (pillar — стратегический приоритет)

| Слот | Текущее (AI) | Замена |
|------|--------------|--------|
| «Wat is ETICS» | wat-is-gevelisolatie | temp/IMG_1841 или `gevelisolatie-montage-isolatieplaten` (реальное, уже в репо, не используется) |
| «Voordelen» | gevelisolatie-voordelen | temp/IMG_3030 |
| «Kosten» (adviesgesprek) | gevelisolatie-kosten (люди с планшетом) | proj/strijen na-07 (бус BM klus у дома) — либо убрать картинку |
| «Subsidie & vergunning» | subsidie-vergunning (макет дома на столе) | proj/rottekade na-04 (дом 272, уже есть на subsidie-hero) |
| Details: dagkanten | detail-dagkanten | temp/IMG_3738 |
| Details: plint | **detail-plint — на живой странице показывается граффити-мурал, ошибка** | temp/IMG_7503 |
| Details: hoeken | detail-hoeken | proj/rotterdam-julianastraat na-04 |
| Details: koudebruggen | detail-koudebruggen | proj/vlaardingen-6cm voor-04 (EPS вокруг окна) или temp/IMG_1841 |

Реальные и остаются: `verdieping-gevelwerk-proces`, `waarom-detail-stucwerk`, hero (Dordrecht).

### 4.4 `/gevelisolatie/[location]/` (21 страница)

Все три фото реальные (Dordrecht hero, `gevelisolatie-eindresultaat-stucwerk`, `verdieping-gevelwerk-proces`). Замен не требуется.

### 4.5 `/gevelisolatie/afwerkingen/`

| Опция | Текущее (AI) | Замена |
|-------|--------------|--------|
| Glad stucwerk | dienst-stucwerk | proj/rotterdam-buitenstucwerk na-03 или proj/halsteren na-05 |
| Sierpleister / spachtelputz | dienst-sierpleister | temp/IMG_6111 |
| Crepi / gevelpleister | afwerking-crepi | temp/IMG_3405 |
| Steenstrips (2 слота) | afwerking-steenstrips | **нет** |

### 4.6 `/gevelisolatie/kosten/`

| Слот | Текущее (AI, Gemini 2752×1536) | Замена |
|------|-------------------------------|--------|
| Сценарий «Rijwoning + stucwerk» | scenario-rijwoning-stucwerk | proj/vlaardingen-6cm na-01 (рядный дом, stucwerk) |
| Сценарий «Hoekwoning + sierpleister» | scenario-hoekwoning-sierpleister | proj/vlaardingen-10cm na-01 (угловой дом) |
| Сценарий «Tweekap + steenstrips» | scenario-tweekap-steenstrips | **нет** |
| «Stucwerk resultaat» | afwerking-stucwerk-resultaat | proj/rotterdam-julianastraat na-01 |
| «Steenstrips resultaat» | afwerking-steenstrips-resultaat | **нет** |

Hero (11.jpg) и Vught voor-6 реальные.

### 4.7 `/gevelisolatie/materialen/`

| Материал | Текущее (AI) | Замена |
|----------|--------------|--------|
| EPS | materiaal-eps | temp/IMG_1889 (белые EPS-плиты) |
| PIR | materiaal-pir | **нет** |
| Minerale wol | materiaal-minerale-wol | **нет** |

### 4.8 `/gevelisolatie/subsidie-vergunning/`

Hero и `subsidie-resultaat-gevel` реальные. `subsidie-vergunning` (макет дома) — см. 4.3.

### 4.9 `/gevel-schilderen/`

| Слот | Текущее (AI) | Замена |
|------|--------------|--------|
| Voordelen | gevel-schilderen-voordelen | proj/delft-willemstraat na-01 |
| Offerte | offerte-berekening (**английская надпись «QUOTE ESTIMATOR»**) | убрать или temp/IMG_2286 (брендинг) |
| Verfsoorten | verfsoorten-silicaat-siloxaan (**фейковые банки с английскими этикетками**) | proj/delft-willemstraat na-05 (окрашенная поверхность) или убрать |
| Voorbereiding | gevel-voorbereiding | proj/delft-willemstraat voor-04 или temp/IMG_2237 |
| Ondergrond: baksteen | ondergrond-baksteen | temp/IMG_6346 |
| Ondergrond: pleister | ondergrond-pleister | temp/IMG_6111 или proj/halsteren na-08 |
| Ondergrond: beton | ondergrond-beton | proj/vlaardingen-10cm voor-04 (голая бетонная стена) |

`/gevel-schilderen/keimen/` — полностью реальные (Delft).

### 4.10 `/sierpleister/`

| Слот | Текущее (AI) | Замена |
|------|--------------|--------|
| «Wat is» | wat-is-gevel-sierpleister | proj/rottekade voor-10 (мастер наносит на лесах) |
| Spachtelputz close-up | gevel-sierpleister-spachtelputz | temp/IMG_7503 |
| Offerte | offerte-berekening | как в 4.9 |
| Details: plintzone | details-plintzone | temp/IMG_7503 или proj/rotterdam-julianastraat na-05 |
| Details: dagkanten | details-dagkanten | temp/IMG_3738 |
| Details: hoekprofielen | details-hoekprofielen | proj/rotterdam-julianastraat na-04 |
| Details: wapening (2 слота) | details-wapening | proj/spijkenisse voor-05 (сетка в растворе) |
| Gids: spachtelputz | gevel-sierpleister-spachtelputz | temp/IMG_7503 |
| Gids: crepi | gevel-sierpleister-crepi | temp/IMG_3405 |
| Gids: siliconenhars | gevel-sierpleister-siliconenhars | **нет** |
| Gids: silicaat | **gevel-sierpleister-silicaat — файл 4 KB, пустая заглушка, на странице пусто** | **нет**, но заглушку надо убрать в любом случае |
| Gids: krabpleister | gevel-sierpleister-krabpleister | **нет** |
| Gids: kalei | gevel-sierpleister-kalei | **нет** |

### 4.11 `/buiten-stucwerk/`

| Слот | Текущее (AI) | Замена |
|------|--------------|--------|
| «Wat is» | wat-is-buitenmuur-stucen | **temp/IMG_3801** (цементная штукатурка на кирпич — точное попадание) |
| Nadelen: vocht-opgesloten | nadelen/vocht-opgesloten | proj/rotterdam-buitenstucwerk voor-04 (пятна влаги) |
| Nadelen: scheurvorming | nadelen/scheurvorming | proj/delft-willemstraat voor-05 (трещина) |
| Nadelen: vervuiling-algen | nadelen/vervuiling-algen | proj/rotterdam-buitenstucwerk voor-05 или proj/klaaswaal voor-08 |
| Nadelen: loslaten-hechting | nadelen/loslaten-hechting | temp/IMG_2237 или proj/halsteren voor-05 |
| Nadelen: plintschade-spatwater | nadelen/plintschade-spatwater | proj/halsteren voor-06 или voor-09 |

### 4.12 `/muren-stucen/` — 12 AI-слотов, замен нет

Hero `muren-stucen-renovatie` (AI, потрескавшаяся штукатурка, alt «Vakman brengt stucwerk aan» — не совпадает с картинкой), `muren-stucen-wat-is`, `-nieuwbouw`, `-behang-verwijderen`, `-schilderen`, `-voordelen`, `voorbereiding-nieuwbouw/-bestaand/-behang`, `droogtijd-drying/-schilderen/-behangen`.

В репозитории нет ни одного реального фото интерьерных штукатурных работ. Единственный вариант — новые фото от владельца. До этого страницу трогать не стоит.

### 4.13 `/over-ons/`

| Слот | Текущее (AI) | Замена |
|------|--------------|--------|
| ETICS | etics-isolatie | temp/IMG_1889 |
| Gevelafwerking | gevelafwerking | temp/IMG_3801 |
| Gevel schilderen | gevel-schilderen | proj/delft-willemstraat na-01 |

### 4.14 Прочее

- `og-default.png` (OG-картинка по умолчанию для всех страниц) содержит AI-рендер дома. Пересобрать с реальным фото (например, Bruinisse na-03 — тот же hero главной). Отдельная задача.
- `/contact/`, `/onze-werken/`, `/muren-stucen/sausklaar-behangklaar/`, все `/onze-werken/[slug]/` — реальные.

---

## 5. Где реальных фото нет (нужно решение владельца)

| Тема | Слотов | Варианты |
|------|--------|----------|
| Интерьер (muren stucen) | 13 (12 + dienst-muren ×2 на главной и /diensten) | Снять 6–8 фото на ближайшем интерьерном объекте: голая стена, нанесение, гладкая стена, покраска |
| Steenstrips | 5 | Компания не показывает ни одного проекта со steenstrips. Либо снять на объекте, либо убрать визуал и оставить текст |
| Типы sierpleister (siliconenhars, silicaat, krabpleister, kalei) | 4 | Макро-фото образцов/каталога поставщика (Strikolith) — или свести гид к 2 реальным текстурам |
| Материалы PIR, minerale wol | 2 | Фото плит на складе/объекте |
| Schoonmaak (диенст) | 1 | Фото мойки фасада |
| «Offerte / adviesgesprek» | 3 | Нет смысла в фото; можно убрать картинку или использовать брендинг |

---

## 6. Ошибки на живых страницах (исправить в первой волне)

1. `/gevelisolatie/` details → `detail-plint` показывает граффити-мурал вместо цоколя.
2. `/sierpleister/` GevelAfwerkingGids → `gevel-sierpleister-silicaat` — пустая заглушка 4 KB (серый квадрат).
3. `/gevel-schilderen/` → `verfsoorten-silicaat-siloxaan` — фейковые банки краски с английскими этикетками («Profesional Mineral Silicate»).
4. `/gevel-schilderen/`, `/sierpleister/` → `offerte-berekening` — планшет с английским «QUOTE ESTIMATOR».

---

## 7. Legacy-файлы в `public/images/` без использования (AI, кандидаты на удаление)

`boris-mitov.webp`, `brick-texture.webp`, `contact-hero.webp`, `etics-detail.webp`, `etics-isolatie-stucwerk.webp`, `etics-system.webp`, `hero-facade.webp`, `hero-facade-2.webp`, `hero-home.png` (2.7 MB), `hero-house.jpg`, `hero-house.png`, `house-insulated.webp`, `house-scarf.webp`, `portfolio-hero.webp`, `stucwerk-reparatie.webp`, `sierpleister/{crepi-gescheurd, egel-rolstructuur, kosten-offerte, mineraalpleister, mozaiekpleister, spachtelputz-fijn, spachtelputz-grof}.webp`, `swatches/*` (7 файлов).

Плюс одиночные single-res копии (`dienst-*.webp`, `service-*.webp`, `*-voordelen.webp` и т.д.) — они ещё читаются `data/services.ts`, проверить перед удалением.

---

## 8. Прочие находки

- `source-images/4.jpg` повреждён (Invalid SOS parameters), не декодируется.
- `source-images/etics-layer-*.png` продублированы в `source-images/general/`.
- `source-images/1–11.jpg` — реальные фото (Etten-Leur, Hendrik-Ido-Ambacht и др.), лежат без имён и не подключены; 11.jpg = `gevelisolatie-kosten-stucwerk-resultaat`.
- `gevelisolatie-montage-isolatieplaten` — реальное фото, варианты сгенерированы, но нигде не используется.
- `source-images/` в `.gitignore`: оригиналы не версионируются, при замене нужно класть источники туда вручную.

---

## 9. Рекомендуемый порядок замены (волны)

**Волна 1 — ошибки + gevelisolatie-кластер (≈14 слотов, всё есть):**
detail-plint, detail-dagkanten, detail-hoeken, detail-koudebruggen, wat-is-gevelisolatie, gevelisolatie-voordelen (pillar + главная), afwerkingen (3 из 4), kosten (3 из 5), materiaal-eps, silicaat-заглушка (убрать).

**Волна 2 — money pages buiten-stucwerk / sierpleister / gevel-schilderen (≈20 слотов):**
wat-is-buitenmuur-stucen, 5 nadelen, sierpleister details ×4 + wat-is + spachtelputz, gids crepi/spachtelputz, gevel-schilderen ×6 (verfsoorten и offerte — убрать или заменить).

**Волна 3 — главная, diensten, over-ons (≈15 слотов):**
service cards ×4, etics-layer ×3, process-hero, ServicesRail ×4, over-ons ×3.

**Отложено до новых фото:** muren-stucen (12), steenstrips (5), типы sierpleister (4), PIR/minerale wol (2), schoonmaak (1), dienst-muren (2).

**Отдельно:** og-default.png, чистка legacy-файлов (§7), обновление `docs/IMAGE-SLOT-AUDIT.md`.

Процедура замены по каждому слоту — `docs/IMAGE-WORKFLOW-SOP.md`, сценарий C (тот же baseName → без правок кода) либо сценарий B (новый baseName → правка `baseName` в компоненте). HEIC и повёрнутые JPG подготовить заранее (см. §3).
