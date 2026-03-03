# BM klus BV - Полная структура сайта

_Документ создан 27.02.2026 с максимальной внимательностью к деталям каждой страницы._

---

## 📑 Оглавление

1. [Главная (Home) - `/`](#1-главная-страница)
2. [Diensten (Услуги) - `/diensten`](#2-diensten--услуги)
3. [Over ons (О нас) - `/over-ons`](#3-over-ons--о-нас)
4. [Onze werken (Наши работы) - `/onze-werken`](#4-onze-werken--наши-работы)
5. [Contact - `/contact`](#5-contact)
6. [Gevelisolatie (Изоляция фасада) - `/gevelisolatie`](#6-gevelisolatie--изоляция-фасада)
7. [Gevel schilderen (Покраска фасада) - `/gevel-schilderen`](#7-gevel-schilderen--покраска-фасада)
8. [Sierpleister - `/sierpleister`](#8-sierpleister)
9. [Privacybeleid (Политика конфиденциальности) - `/privacybeleid`](#9-privacybeleid--политика-конфиденциальности)
10. [Остальные подстраницы](#10-остальные-подстраницы)

---

## 1. Главная страница
**URL:** `/`  
**Title:** BM klus BV - Buitengevelisolatie & Renovatie  
**Description:** Профессиональная изоляция фасадов (ETICS) и ремонт фасадов в Роттердаме и окрестностях. Сэкономьте энергию и повысьте комфорт.

### Блоки (Components):
1. **HeroSection** - Главный герой-баннер с CTA
2. **TrustStrip** - Полоса доверия (социальные доказательства)
3. **EticsSection** - Раздел об ETICS системе
4. **ServicesSection** - Сетка услуг
5. **ProcessSection** - Процесс работы
6. **PortfolioSection** - Портфолио/примеры
7. **ReviewsSection** - Отзывы
8. **WorkAreaSection** - Область деятельности
9. **FaqSection** - Часто задаваемые вопросы

### Ссылки на странице:
- *Нет внешних навигационных ссылок (содержит только компоненты с внутренними CTA)*
- Внешние ссылки добавляются через компоненты (контакт, услуги и т.д.)

---

## 2. Diensten (Услуги)
**URL:** `/diensten`  
**Title:** Diensten voor een sterke en mooie gevel  
**Description:** Профессиональные решения для фасадов в регионе Роттердам и окрестностях (±80-100 км), Южная Голландия и соседние районы.

### Блоки (Sections):
1. **Premium Hero Section** - 
   - Фон: темный с градиентом и украшениями
   - Breadcrumbs: "Onze Diensten"
   - H1: "Diensten voor een [sterke] en [mooie] gevel"
   - Subtext: Описание компании и регионов
   - CTA buttons: 
     - "Gratis offerte aanvragen" (primary) → `/contact`
     - "Bekijk alle diensten" (secondary) → `#diensten`
   - Trust indicators: 5+ jaar garantie, gecertificeerde vakmannen, offerte binnen 24u
   - Animated decorative elements

2. **ServicesGrid** (`id="diensten"`)
   - Отображает основные услуги в виде сетки

3. **Process Section**
   - Header: "Ons proces" / "Zo [werken] wij"
   - Desktop: Горизонтальная "дорожка" с 4 шагами + интерактивная карточка
   - Mobile: Аккордеон с шагами
   - 4 шага:
     1. "Intake & advies" - бесплатная инспекция
     2. "Offerte op maat" - смета в течение 24 часов
     3. "Uitvoering & kwaliteit" - выполнение работ
     4. "Oplevering & nazorg" - гарантия и поддержка

4. **CTA Banner** - "Binnen 24 uur een duidelijke offerte"
   - Link: "Plan gratis inspectie" → `/contact`

5. **FAQ Section**
   - Left: Header "Veelgestelde vragen"
   - Right: Аккордеон с 5 вопросами
   - Link: "Neem contact op" → `/contact`
   - FAQ Items:
     1. Hoe snel kan het werk starten?
     2. Welke garantie krijg ik?
     3. Moet ik mijn huis voorbereiden?
     4. Hoe wordt de prijs bepaald?
     5. In welke regio's zijn jullie actief?

### Ссылки на странице:
- `/contact` - 3 раза (2 CTA кнопки + в FAQ)
- `#diensten` - якорь к сетке услуг
- Нет прямых ссылок на подстраницы услуг

---

## 3. Over ons (О нас)
**URL:** `/over-ons`  
**Title:** Over ons | BM klus BV  
**Description:** BM klus BV: специалист по внешней изоляции фасадов (ETICS) и отделке фасадов (штукатурка, декоративная штукатурка, покраска) в регионе Роттердам.

### Блоки (Sections):
1. **Dark Gradient Hero**
   - Background: линейный градиент от черного к бежевому
   - Breadcrumbs: Home > Over ons
   - H1: "Over [ons]"
   - Subtext: Описание компании (2 строки)
   - Hero checks (3 пункта):
     - Специализация: ETICS + отделка
     - Внимание к деталям
     - Четкая коммуникация
   - Region info: "Regio Rotterdam en omgeving (±80–100 km)..."
   - Footer links: Diensten • Contact

2. **Section: "Waarom BM klus BV"** (`id="waarom"`)
   - Header: "Onze kracht" / "Waarom [BM klus BV]"
   - 4 value cards:
     1. Duidelijke offerte
     2. Nette detaillering
     3. Kwaliteitsmaterialen
     4. Rust op de werkplek

3. **Section: "Waar wij in uitblinken"** (`id="diensten"`)
   - Header: "Kernactiviteiten" / "Waar wij in [uitblinken]"
   - 3 service cards с изображениями:
     1. **Buitengevelisolatie (ETICS)**
        - Image: `/images/etics-isolatie.jpg`
        - Link: "Meer over gevelisolatie" → `/gevelisolatie`
     2. **Gevelafwerking**
        - Image: `/images/gevelafwerking.jpg`
        - Описание типов: Stuc, Sierpleister, Crepi, Steenstrips
     3. **Gevel schilderen & details**
        - Image: `/images/gevel-schilderen.jpg`
        - Link: "Meer over gevel schilderen" → `/gevel-schilderen`

4. **Section: "Onze aanpak"** (`id="aanpak"`)
   - Header: "Werkwijze" / "Onze [aanpak]"
   - Desktop: Горизонтальная временная шкала с 4 шагами
   - Mobile: Вертикальная временная шкала
   - 4 шага с иконками и описаниями:
     1. Opname & inventarisatie
     2. Advies & offerte
     3. Uitvoering
     4. Oplevering

5. **Section: "Over BM klus BV"** (`id="bedrijf"`)
   - Header: "Het bedrijf" / "Over [BM klus BV]"
   - Описание компании (текст)

6. **FAQ Accordion** (`id="faq"`)
   - Component: OverOnsAccordion
   - Header (Left): "Veelgestelde vragen" с описанием
   - Link: "Neem contact op" → `/contact`
   - Accordion (Right): 4 вопроса

### Ссылки на странице:
- `/` - Home в breadcrumbs
- `/diensten` - в hero footer
- `/contact` - в hero footer и в FAQ
- `/gevelisolatie` - в service card "ETICS"
- `/gevel-schilderen` - в service card "Schilderen"

---

## 4. Onze werken (Наши работы)
**URL:** `/onze-werken`  
**Title:** Onze werken | BM klus BV  
**Description:** Посмотрите недавние проекты с внешней изоляцией фасадов (ETICS) и отделкой фасадов. По каждому проекту: место, подход и отделка. Регион Роттердам и окрестности.

### Блоки (Sections):
1. **Hero с градиентом**
   - Breadcrumbs: Home > Onze werken
   - H1: "Onze [werken]"
   - Descriptions (2 строки)
   - CTA buttons:
     - "Plan gratis inspectie" → `/contact`
     - "Bekijk onze diensten" → `/diensten`
   - Region info

2. **Table of Contents** (Навигация внутри страницы)
   - 3 якоря:
     - Onze projecten → `#projecten`
     - Veelgestelde vragen → `#faq`
     - Werkgebied → `#werkgebied`

3. **Section: "Wat u kunt verwachten"**
   - Header: "Per project" / "Wat u kunt [verwachten]"
   - 4 пункта (с нумерацией):
     1. Plaats en type woning
     2. Werkzaamheden en gekozen afwerking
     3. Belangrijke details (plint, dagkanten, profielen)
     4. Resultaat (voor/na)

4. **Section: "Onze projecten"** (`id="projecten"`)
   - Header: "Projecten" / "Onze [projecten]"
   - Component: ProjectsSection
   - Описание: "Voorbeelden van buitengevel renovatie, afwerking en schilderwerk."

5. **Section: FAQ** (`id="faq"`)
   - Component: OnzeWerkenFaq
   - Custom FAQ для страницы проектов

6. **Section: "Werkgebied"** (`id="werkgebied"`)
   - Header: "Werkgebied" / "Ons [werkgebied]"
   - Текст: описание региона деятельности
   - List of cities (с badges):
     - Rotterdam, Schiedam, Vlaardingen, Capelle a/d IJssel
     - Spijkenisse, Barendrecht, Ridderkerk, Dordrecht
     - "+ omliggende regio's"
   - Note: "Twijfelt u..." → `/contact`

7. **Bottom Micro-links** (Footer)
   - Links: Diensten • Gevelisolatie • Contact

### Ссылки на странице:
- `/` - Home в breadcrumbs
- `/contact` - 2 раза (CTA кнопка + в werkgebied section)
- `/diensten` - CTA "Bekijk onze diensten"
- `/gevelisolatie` - в footer micro-links
- Якоря на собственной странице: `#projecten`, `#faq`, `#werkgebied`

---

## 5. Contact
**URL:** `/contact`  
**Title:** Neem contact op & vraag een offerte aan  
**Description:** Вопрос или хотите получить бесплатную смету? Заполните форму или позвоните напрямую — мы ответим быстро в рабочее время.

### Блоки (Sections):
1. **Dark Gradient Hero**
   - Breadcrumbs: Home > Contact
   - H1: "Neem contact op & [vraag een offerte aan]"
   - Descriptions (2 строки)
   - Trust indicators (3 пункта):
     - Быстрый ответ в рабочее время
     - Четкая смета с объемом работ
     - Регион Роттердам и окрестности

2. **Section: "Offerte aanvragen"** (`id="formulier"`)
   - Header: "Formulier" / "Offerte aanvragen"
   - **Left: Contact Form (или Success message)**
     - Form fields:
       1. Naam (required)
       2. Plaats (required)
       3. Telefoon (required)
       4. Bericht (required)
       5. Email (optional)
       6. Dienst (optional) - dropdown:
          - Buitengevelisolatie (ETICS)
          - Gevel schilderen
          - Buitenstucwerk
          - Sierpleister
          - Muren stucen
          - Overig
       7. Consent checkbox (required)
     - Submit button: "Versturen"
     - Note under textarea: "Foto's meesturen? Stuur ze via [WhatsApp](https://wa.me/31612079808)"
     - Success message: "Bedankt! We nemen zo snel mogelijk contact met u op."
       - Link: "Terug naar home" → `/`
   
   - **Right Sidebar: "Direct contact"**
     - Opening hours: "ma – za · 9–18u"
     - Status badge: "Nu open" / "Gesloten" (динамический)
     - Contact rows:
       1. **Bellen** → `tel:+31612079808`
       2. **WhatsApp** → `https://wa.me/31612079808`
       3. **Mail** → `mailto:info@example.com`
     - Divider
     - **Openingstijden** (Schedule)
       - Maandag-Vrijdag: 9:00-18:00
       - Zaterdag: 9:00-18:00
       - Zondag: Gesloten
     - Footer text: "Snel antwoord garant..."

### Ссылки на странице:
- `/` - Home в breadcrumbs
- `tel:+31612079808` - Phone call link
- `https://wa.me/31612079808` - WhatsApp link (2 раза)
- `mailto:info@example.com` - Email link
- `/` - "Terug naar home" в success message

---

## 6. Gevelisolatie (Изоляция фасада)
**URL:** `/gevelisolatie`  
**Title:** Gevelisolatie: ETICS buitenwerk isolatie  
**Description:** Бризолятор для наружных стен, ETICS система, энергосбережение и модернизация. Кровля из полистирола, минеральной ваты. Допустимые варианты отделки.

### Блоки (Sections):
1. **GevelisolatieHero** - Специальный герой для страницы
2. **Table of Contents** - Навигация с якорями (из `gevelisolatieToc`)
3. **WatIsEticsSection** - "Что такое ETICS?"
4. **VoordelenSection** - Преимущества
5. **KostenSection** - Стоимость
6. **WerkwijzeSection** - Процесс работы
7. **MidPageCTA** - Mid-page call-to-action (полная ширина)
8. **AfwerkingenSection** - Варианты отделки
9. **MaterialenSection** - Материалы
10. **RcWaardeDikteSection** - RC-значение и толщина
11. **DetailsKoudebruggenSection** - Детали и тепловые мосты
12. **SubsidieVergunningSection** - Субсидии и разрешения
13. **FaqSection** - FAQ
14. **MeerInformatieSection** - Дополнительная информация
15. **StickyCTABar** - Прилипающая CTA панель внизу страницы

### Внутренние якоря (Table of Contents):
Все основные разделы имеют якоря для навигации (например, `#wat-is-etics`, `#voordelen`, `#kosten` и т.д.)

### Ссылки на странице:
- Различные подстраницы внутри gevelisolatie:
  - `/gevelisolatie/afwerkingen` - из AfwerkingenSection
  - `/gevelisolatie/materialen` - из MaterialenSection
  - `/gevelisolatie/rc-waarde-dikte` - из RcWaardeDikteSection
  - `/gevelisolatie/subsidie-vergunning` - из SubsidieVergunningSection
  - `/gevelisolatie/kosten` - из KostenSection
- `/contact` - CTA ссылки
- Якоря на собственной странице

---

## 7. Gevel schilderen (Покраска фасада)
**URL:** `/gevel-schilderen`  
**Title:** Gevel schilderen: professioneel buitenschilderwerk  
**Description:** Профессиональная покраска фасадов, подготовка поверхности, типы краски, техника нанесения. Защита и окончательная отделка для вашего дома.

### Блоки (Sections):
1. **Dark Gradient Hero** - Специальный герой
   - Breadcrumbs
   - H1: "Gevel schilderen"
   - Description
   - CTA buttons

2. **Table of Contents** - Якоря для навигации

3. Multiple content sections (получены из `/lib/content/gevel-schilderen`):
   - Core sections
   - Kosten (Стоимость)
   - Offerte (Смета)
   - Verfsoorten (Типы краски)
   - Voorbereiding (Подготовка)
   - Techniek (Техника)
   - Onderhoud (Уход)
   - Werkgebied (Область деятельности)
   - FAQ

4. **FaqAccordion** - Custom FAQ для этой страницы

### Ссылки на странице:
- `/` - Home в breadcrumbs
- `/contact` - CTA ссылки
- Якоря на собственной странице
- Возможные перекрестные ссылки на `/gevelisolatie`, `/sierpleister`

---

## 8. Sierpleister
**URL:** `/sierpleister`  
**Title:** Sierpleister: decoratieve afwerking voor uw gevel  
**Description:** Декоративная штукатурка (полиуретановая система Spachtelputz), варианты, стоимость, техника нанесения, уход, ETICS совместимость.

### Блоки (Sections):
1. **Dark Gradient Hero** - Специальный герой
   - Breadcrumbs
   - H1
   - Description
   - CTA buttons

2. **Table of Contents** - Якоря для навигации

3. Multiple content sections:
   - Wat is sierpleister
   - Soorten (Типы)
   - Korrelgrootte (Размер зерна)
   - Voordelen (Преимущества)
   - Kosten (Стоимость)
   - Werkwijze (Процесс работы)
   - Details
   - Onderhoud (Уход)
   - Reparatie (Ремонт)
   - ETICS compatibility
   - FAQ

4. **GevelSierpleisterFaq** - Custom FAQ accordion

5. **GevelAfwerkingGids** - Справочник по отделке фасадов

### Ссылки на странице:
- `/` - Home в breadcrumbs
- `/contact` - CTA ссылки
- `/gevelisolatie` - cross-links к системе ETICS
- Якоря на собственной странице

---

## 9. Privacybeleid (Политика конфиденциальности)
**URL:** `/privacybeleid`  
**Title:** Privacybeleid & Cookiebeleid | BM klus BV  
**Description:** Узнайте, как BM klus BV обращается с личными данными и файлами cookie. Информация о Google Analytics/Ads, предпочтения cookie, сроки хранения и ваши права.

### Блоки (Sections):
1. **Dark Hero Section**
   - Breadcrumbs: Home / Privacybeleid
   - H1: "Privacybeleid & Cookiebeleid"
   - Description (2 строки)
   - "Laatst bijgewerkt: 25 februari 2026"

2. **Main Content** (`<main className="bg-background">`)
   - Legal text sections
   - Table of contents or structured legal information
   - Sections covering:
     - Privacy policy
     - Cookie policy
     - Data processing
     - User rights
     - Google Analytics/Ads info
     - Contact for privacy issues

### Ссылки на странице:
- `/` - Home в breadcrumbs
- Внутренние якоря для разделов политики
- Возможные ссылки на форму контакта для privacy issues

---

## 10. Остальные подстраницы

### 10.1 Gevelisolatie > Afwerkingen
**URL:** `/gevelisolatie/afwerkingen`  
**Компоненты:** 
- Breadcrumbs
- Hero
- Content sections
- FAQ
- StickyCTABar

**Ссылки:**
- `/gevelisolatie` - родительская страница
- `/contact` - CTA
- Related links

### 10.2 Gevelisolatie > Materialen
**URL:** `/gevelisolatie/materialen`  
**Компоненты:**
- Breadcrumbs
- Hero
- Content sections (material types, properties)
- Sections from `gevelisolatieMeta`
- FAQ
- StickyCTABar

### 10.3 Gevelisolatie > Kosten
**URL:** `/gevelisolatie/kosten`  
**Компоненты:**
- Breadcrumbs
- Hero
- Content sections (pricing information)
- Calculators or pricing tables
- FAQ
- StickyCTABar

### 10.4 Gevelisolatie > RC-waarde & Dikte
**URL:** `/gevelisolatie/rc-waarde-dikte`  
**Компоненты:**
- Breadcrumbs
- Hero
- Content sections (RC-values, insulation thickness)
- FAQ (с JSON-LD schema)
- StickyCTABar

### 10.5 Gevelisolatie > Subsidie & Vergunning
**URL:** `/gevelisolatie/subsidie-vergunning`  
**Компоненты:**
- Breadcrumbs
- Hero
- Content sections (subsidies, permits, regulations)
- Table of contents with extensive FAQ
- StickyCTABar

### 10.6 Onze werken > Halsteren Project
**URL:** `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025`  
**Компоненты:**
- Breadcrumbs
- Project hero
- Project gallery carousel (ProjectGalleryCarousel)
- Project details sections
- Related projects
- CTA to contact

**Ссылки:**
- `/onze-werken` - parent page
- `/contact` - CTA
- `/diensten` - related services

### 10.7 Buiten-stucwerk, Muren-stucen (если они существуют)
Следуют тому же паттерну, что и другие service pages.

---

## 📊 Сводка навигационных ссылок

### Из главной страницы (`/`)
- Направления: компоненты содержат внутренние CTA

### Из Diensten (`/diensten`)
- `/contact` - 3 раза (основные CTA)
- Якоря внутри: `#diensten`, `#faq`

### Из Over ons (`/over-ons`)
- `/gevelisolatie` - в service card ETICS
- `/gevel-schilderen` - в service card покраски
- `/contact` - в hero footer и FAQ
- `/diensten` - в hero footer
- Якоря: `#waarom`, `#diensten`, `#aanpak`, `#bedrijf`, `#faq`

### Из Onze werken (`/onze-werken`)
- `/contact` - 2 раза
- `/diensten` - 1 раз
- `/gevelisolatie` - в footer micro-links
- Якоря: `#projecten`, `#faq`, `#werkgebied`

### Из Contact (`/contact`)
- `/` - success message
- Телефон, WhatsApp, Email - внешние контакты

### Из Gevelisolatie (`/gevelisolatie`)
- `/gevelisolatie/afwerkingen` - из AfwerkingenSection
- `/gevelisolatie/materialen` - из MaterialenSection
- `/gevelisolatie/rc-waarde-dikte` - из RcWaardeDikteSection
- `/gevelisolatie/subsidie-vergunning` - из SubsidieVergunningSection
- `/gevelisolatie/kosten` - из KostenSection
- `/contact` - CTA ссылки
- Якоры внутри страницы

### Из Gevel schilderen (`/gevel-schilderen`)
- `/` - breadcrumbs
- `/contact` - CTA
- Возможно: `/gevelisolatie`, `/sierpleister` (cross-links)

### Из Sierpleister (`/sierpleister`)
- `/` - breadcrumbs
- `/contact` - CTA
- `/gevelisolatie` - mentions/cross-links

---

## 🎯 Важные замечания

1. **Навигация:** Каждая страница имеет **Navbar** и **Footer** (добавлены в `app/layout.tsx`)
2. **Breadcrumbs:** Присутствуют на большинстве страниц для улучшения UX и SEO
3. **Table of Contents:** На длинных страницах (`/gevelisolatie`, `/sierpleister` и т.д.)
4. **CTA Buttons:** Основные CTA направляют на `/contact` для получения бесплатной сметы
5. **Якоры:** Используются для навигации внутри страницы (напр., `#faq`, `#projecten`)
6. **Service Cards:** На страницах услуг часто есть карточки с изображениями и описаниями
7. **FAQ:** Практически каждая страница содержит FAQ accordion
8. **Sticky CTA:** Некоторые страницы содержат прилипающую CTA панель (`StickyCTABar`)
9. **WhatsApp Integration:** Доступно на странице контакта и некоторых других местах
10. **SEO:** Каждая страница имеет метаданные, canonical URLs, breadcrumb schema

---

**Документ завершен: 27.02.2026**
