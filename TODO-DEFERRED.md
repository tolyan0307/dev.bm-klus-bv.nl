# Отложенные задачи — BM Klus BV

## Фото (ожидают файлы от клиента)
- [ ] `/public/images/gevelisolatie-hero.webp` — фон hero (pillar + location pages)
- [ ] `/public/images/og-gevelisolatie.jpg` — OG-image 1200×630
- [ ] `/public/images/before-after/*.webp` — 6 фото (3 пары до/после) → подключить `BeforeAfterSection` в page.tsx
- [ ] Blur placeholders (`blurDataURL`) для всех `<Image>` компонентов
- [ ] Аналогичные hero/og фото для остальных service pages

## Google Ads / Analytics
- [ ] GTM ID → `NEXT_PUBLIC_GTM_ID` в `.env` (клиент предоставит код со старого сайта)
- [ ] Настроить conversion events в GTM: форма, WhatsApp клик, телефон клик
- [ ] Google Ads tag (AW- ID) через GTM
- [ ] Проверить работу Turnstile CAPTCHA на production

## QuoteModal — глобализация
- [ ] Перенести `QuoteModal` из `/gevelisolatie/page.tsx` в `layout.tsx` (site-wide)
- [ ] Или: добавить на каждую service page отдельно
- [ ] Footer CTA `#offerte` сейчас работает только на страницах где есть QuoteModal
- [ ] Navbar CTA `/contact/` — решить: оставить или тоже `#offerte`

## Location pages — расширение
- [ ] Добавить города: Schiedam, Vlaardingen, Leiden, Gouda (данные в `gevelisolatieIntro.steden`)
- [ ] Доработать дизайн location pages (клиент сказал "позже")
- [ ] Location pages для других услуг (buiten-stucwerk/rotterdam и т.д.)

## Дизайн location pages
- [ ] Клиент хочет вернуться и доработать визуал

## Фаза 4 — долгосрочное
- [ ] Case study шаблон для проектных страниц (нужны данные реальных проектов)
- [ ] Blog-контент (сезонность, bouwbesluit updates)
- [ ] Video контент (процесс монтажа ETICS)

## Контактная страница /contact/
- [ ] Привести в соответствие с новой стратегией (WhatsApp primary, смягчённые формулировки)
- [ ] Проверить что форма на /contact/ тоже использует мягкие обещания

## Service pages — проработка по шаблону /gevelisolatie/

### Общий чеклист для каждой service page:
- [ ] Исправить `<main>` дубликат → `<article>`
- [ ] Hero: фото bg + короткий h1 с keyword + ценовой тизер + WhatsApp (стекло) + форма CTA
- [ ] Breadcrumbs визуальные + BreadcrumbList JSON-LD
- [ ] TrustStrip после hero
- [ ] Service JSON-LD + LocalBusiness + FAQPage JSON-LD
- [ ] Блок "Waarom BM Klus?" (переиспользуется)
- [ ] ReviewsSection
- [ ] QuoteModal (#offerte)
- [ ] Sticky CTA bar (mobile + desktop light glass)
- [ ] WhatsApp primary, phone passive
- [ ] Все формулировки — мягкие (без "altijd", "garanderen", "binnen X uur")
- [ ] Все CTA → `#offerte` (кроме FAQ text link)
- [ ] Убрать MidPageCTA если есть
- [ ] Dynamic imports для below-fold секций
- [ ] OG-image уникальный

### /buiten-stucwerk/ — СЛЕДУЮЩАЯ
Текущие проблемы (по результатам аудита):
- `<main>` дубликат (строка 182)
- Hero: градиент без фото, `rounded-sm` на кнопке, `href="/contact/"` вместо `#offerte`
- Нет TrustStrip, Reviews, QuoteModal
- Нет JSON-LD (Service, BreadcrumbList, LocalBusiness)
- MidPageCTA блок присутствует (строка 422)
- CTA: "Plan gratis inspectie" + "Gratis offerte aanvragen" + "Gratis inspectie aanvragen" — всё ведёт на /contact/
- Формулировки: "Snelle reactie tijdens openingstijden", "heldere offerte — zonder verplichtingen"
- Нет WhatsApp нигде
- Нет Sticky CTA bar

### /sierpleister/ — после buiten-stucwerk
### /gevel-schilderen/ — после sierpleister
### /muren-stucen/ — после gevel-schilderen

## Технические
- [ ] `BeforeAfterSection` компонент готов (`components/sections/gevelisolatie/before-after-section.tsx`), не подключён
- [ ] `InlineQuoteForm` компонент (`components/inline-quote-form.tsx`) — не используется после перехода на popup, можно удалить
- [ ] `MidPageCTA` компонент gevelisolatie — убран со страницы, файл остался
