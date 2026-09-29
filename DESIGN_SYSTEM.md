# BM klus BV — дизайн-система

Справочник по визуальному языку bm-klus-bv.nl: токены, классы из `app/globals.css`, раскладка страниц, премиум-паттерны, эталонные файлы. Сверено с кодом 2026-09-29; если документ расходится с кодом, прав код — документ нужно поправить.

Рядом: порядок дизайн-работы — `.claude/rules/design.md`; правила кода — `.claude/rules/code.md`; изображения — `docs/IMAGE-PIPELINE.md`; цены, контакты, факты о бизнесе — `CLAUDE.md`; открытый долг — `docs/BACKLOG.md`.

## 1. Назначение и принципы

- Вид — светлый, тёплый, сдержанно-премиальный: кремовый фон, оранжевый акцент в малых дозах, мягкие границы и тени, крупные заголовки, много воздуха.
- Тёмный фон — только у hero. Прочие тёмные поверхности — часть каркаса: футер (`bg-foreground`), шапка `QuoteModal`, видео-секция на страницах проектов (skill `add-project`).
- Дизайн-правка меняет только вид. Тексты (заголовки, описания, лейблы, FAQ, `alt`), данные (массивы, иконки, `href`) и SEO-структура остаются как были; публичный текст — только nl-NL.
- Контраст текста не снижать: прозрачность — для фонов, линий и декора, не для текста (цифры — в §2).
- Цвета — только токены. Hex в `className` не добавлять; значения вне палитры допустимы в `style={}` внутри hero (градиенты, виньетки, свечение).
- Шрифт и палитра зафиксированы; советы общего скилла `frontend-design` (сменить шрифт, смелые тёмные схемы) к сайту не относятся.
- Тёмной темы нет: класс `dark` нигде не ставится, поэтому `dark:`-варианты не срабатывают — их не писать.
- Tailwind v4: градиенты `bg-linear-to-*` (не `bg-gradient-to-*`), прозрачность сокращённо — `bg-primary/7`, `text-primary/4` (v4 собирает любые целые проценты).

## 2. Токены

Значения — в `:root` файла `app/globals.css`; `@theme inline` превращает их в утилиты (`bg-*`, `text-*`, `border-*`, `ring-*`, `from-*` …).

| Токен | Значение | Роль |
|---|---|---|
| `background` | `#FFF9F2` | фон страницы, тёплый крем |
| `foreground` | `#2D2A26` | заголовки и основной текст |
| `card` | `#FFF9F2` | фон карточек; равен фону страницы, поэтому карточку выделяют граница, тень и градиент |
| `primary` | `#EA6C20` | акцент: CTA, eyebrow, иконки, акцентное слово в H1/H2, линии |
| `primary-foreground` | `#ffffff` | текст на заливке `primary` |
| `secondary` | `#FFF1E6` | тёплые подложки секций и hover, обычно `bg-secondary/30` |
| `muted` | `#F5EDE4` | приглушённые подложки |
| `muted-foreground` | `#6B655E` | текст абзацев, подписи |
| `border`, `input` | `#E8DDD0` | границы; базовый слой задаёт `border-border` всем элементам |
| `ring` | `#EA6C20` | фокус: базовый слой задаёт `outline-ring/50` |
| `destructive` | `oklch(0.577 0.245 27.325)` | ошибки формы в `QuoteModal` |

Остальное — наследие шаблона shadcn, страницами не используется: `card-foreground`, `secondary-foreground`, `popover-foreground` (все `#2D2A26`), `popover` (`#FFF9F2`), `accent` и `accent-foreground` (дубль `primary`), `destructive-foreground` (равен `destructive`, как цвет текста на нём непригоден).

**Радиусы.** `--radius: 0.625rem`: `rounded-sm` 6px, `rounded-md` 8px, `rounded-lg` 10px, `rounded-xl` 14px; `rounded-2xl` — 16px, значение Tailwind по умолчанию. Крупные контейнеры — `rounded-2xl`, карточки и иконки — `rounded-xl`, кнопки — `rounded-lg`, чипы и пилюли — `rounded-full`.

**Тени.** Токенов нет. Премиум-контейнер — `shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]`, в hover — то же с `0.12`; мелкие элементы — `shadow-sm`, в hover `shadow-md`.

**Шрифт.** Inter через `next/font/google` (`app/layout.tsx`, subset latin, CSS-переменная `--font-inter`); `body` получает `font-sans antialiased`. Объявленный в `@theme inline` `--font-mono` (Geist Mono) не подключён и не используется.

**Цвета без токена.** Тёмный фон hero `#1A1A1A`, зелёный WhatsApp `#25D366`, звёзды рейтинга `#FBBC05`, цвета логотипа Google в `components/google-reviews.tsx`. В коде они записаны arbitrary-значениями (§8). Новых мест с ними не заводить — переиспользовать готовую разметку hero, `StickyCTABar` и звёзд из эталонов (§9).

**Контраст** на `#FFF9F2` по WCAG: `foreground` 13.7:1; `muted-foreground` 5.5:1 (на `secondary` 5.2:1); `primary` 3.0:1; белый на `primary` 3.15:1; `muted-foreground/60` 2.5:1; `foreground/45` 2.6:1. Порог AA — 4.5:1 для обычного текста, 3:1 для крупного (от 24px или от 18.7px bold) и для иконок. Мелкий оранжевый текст (eyebrow, ссылки) формально ниже AA — так он устроен по всему сайту; светлее него (`text-primary/40`, `text-primary/45`) и светлее `text-muted-foreground` текст не делать.

## 3. Компонентные классы (`app/globals.css`)

Классы из `@layer components` попадают в CSS всегда, даже неиспользуемые. Неиспользуемые образцом не считать.

| Класс | Что задаёт | Где используется |
|---|---|---|
| `.container-default` | `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` | страницы проектов, `contact`, 404, `privacybeleid`; в остальных местах тот же набор записан инлайн |
| `.section-spacing` | `py-16 sm:py-20 lg:py-24` | страницы проектов, `contact`; в остальных местах — инлайн |
| `.section-header` | строка eyebrow: `mb-3 flex items-center gap-3` | страницы проектов, `contact` |
| `.section-header-line` | линия `h-px w-12 bg-primary` | там же |
| `.section-header-label` | `text-sm font-semibold uppercase tracking-wider text-primary` | там же |
| `.section-title` | `text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl` — размер H2 секции (комментарий «H1» в CSS неточен) | `<h2>` страниц проектов и `contact` |
| `.section-title-h2` | `text-2xl … sm:text-3xl` | не используется |
| `.section-title-h3` | `text-lg font-semibold tracking-tight` | не используется |
| `.section-description` | `mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg` | не используется |
| `.btn-hero` | главная кнопка на тёмном фоне: `border-primary/40 bg-primary/15 text-white backdrop-blur-sm`, в hover плотнее | hero подстраниц кластера, `keimen`, `sausklaar-behangklaar`, `/onze-werken/`, `contact` и всех страниц проектов; в `[location]`, `hero-gevelisolatie.tsx`, `hero-section.tsx` тот же набор инлайн |
| `.btn-primary` | заливка `primary`, `rounded-lg px-6 py-3`, тень | 404, `components/contact/ContactFormCard.tsx` |
| `.btn-secondary` | контурная кнопка для светлого фона | 404, `ContactFormCard.tsx` |
| `.card-premium` | старая карточка: `rounded-xl border border-border bg-card p-6 shadow-sm` + hover; премиум-языку §5 не соответствует, несмотря на имя | `ContactFormCard.tsx` |
| `.glass-card` | `rounded-xl border border-white/10 bg-white/10 backdrop-blur-md` | не используется |
| `.icon-container` | `h-12 w-12 rounded-lg bg-secondary/60` | не используется; актуальная иконка в контейнере — §5.3 |
| `.below-fold` | `content-visibility: auto; contain-intrinsic-size: auto 500px` | обёртки секций, §4 |
| `.no-scrollbar` | прячет полосу прокрутки | карусель отзывов в `components/google-reviews.tsx` |

## 4. Раскладка страницы

**Порядок блоков** (эталон — `app/gevelisolatie/page.tsx`):
1. Hero — тёмный, `<section aria-label="Hero">`.
2. `<TrustStrip />` на `bg-secondary/30` — без обёртки.
3. Секции контента — каждая в своём `<div className="below-fold">`.
4. Внизу — связанные страницы: `RelatedLinks` или строка ссылок в `<nav>`.
5. Оверлеи через `dynamic()`: `<StickyCTABar />`, `<QuoteModal dienst="…" />`; на хабе ещё `StickyToc` (виден от `2xl`).

`aria-label="Hero"` нужен не для красоты: по нему `StickyCTABar` понимает, когда показываться, а `components/cta-click-tracker.tsx` ставит `placement: hero` в dataLayer-событиях кликов WhatsApp и телефона.

**Навбар** (`components/navbar.tsx`) фиксирован (`h-20`, после прокрутки `h-16`) и до прокрутки прозрачен: белые ссылки, белый логотип. Поэтому страница начинается с тёмного hero; на внутренних страницах контент hero идёт с отступа `pt-28 sm:pt-32 lg:pt-36` (там стоят хлебные крошки).

**Hero** страниц услуг, кластера и городов: `relative overflow-hidden` на тёмном `#1A1A1A`; фото `ResponsiveImage preset="hero" priority` растянуто `absolute inset-0 h-full w-full object-cover`; поверх два затемнения — горизонтальное (слева почти непрозрачное) и вертикальное. Колонка `flex max-w-2xl flex-col gap-5`: eyebrow → H1 `text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl` → интро `text-white/75` → тизер «Gratis opname & offerte» → кнопки (§6) → звёзды и телефон. Главная (`components/hero-section.tsx`) и страницы проектов используют вариант с виньетками в `style={}`.

**below-fold.** `content-visibility: auto` позволяет браузеру не отрисовывать секции вне экрана — это разгружает LCP и TBT на мобильных.
- Одна секция — одна обёртка. Обёртка вокруг всей статьи начинается в первом экране и поэтому ничего не пропускает.
- Hero и `TrustStrip` не оборачивать — это первый экран.
- Фиксированные оверлеи (`StickyCTABar`, `QuoteModal`, `StickyToc`) не оборачивать: `content-visibility` включает paint containment, и `position: fixed` внутри обёртки отсчитывается от неё, а не от окна.
- Секции потока, подключённые через `dynamic()` (`ReviewsSection`, `WerkwijzeSection` на хабе), оборачиваются как обычные.

**Сетка и ритм.** Контейнер — `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`, отступ секции — `py-16 sm:py-20 lg:py-24`, секция с якорем получает `id` и `scroll-mt-24`. Секции с фоном во всю ширину (`WaaromBmKlusSection`, `ReviewsSection`, тёплые обёртки) держат контейнер внутри себя. Ритм — чередование `bg-background` и `bg-secondary/30` (`app/gevelisolatie/kosten/page.tsx`: тёплые 2-я, 4-я и 6-я секции); на главной подложка бледнее — `bg-secondary/10`.

**Заголовок секции.** Eyebrow (линия `h-px w-10 bg-primary` + лейбл `text-sm font-semibold uppercase tracking-wider text-primary`) → H2 `text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl`, акцентное слово — в `<span className="text-primary">` → лид `mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base`. Кроме этого инлайн-варианта в коде есть компонент `Section` (линия `w-8`, лейбл `text-[11px] font-bold uppercase tracking-[0.22em]`) и классы `.section-header` на страницах проектов (линия `w-12`). На одной странице — один вариант.

**Блоки статейных страниц** — `components/page/`: `Section` (секция с eyebrow, H2 с `accentWord`, лидом и отступами), `TableOfContents` (оглавление в начале), `Callout` (варианты `info`, `warning`, `tip`, `orange`), `FaqAccordion`, `RelatedLinks`. Так собраны `kosten`, `afwerkingen`, `keimen`, `sausklaar-behangklaar`.

Страницы проектов собираются skill'ом `add-project` из готового шаблона; этот документ шаблон не переопределяет, расхождения с §4 перечислены в §8.

## 5. Премиум-паттерны

Утверждённый заказчиком вид — цель для новых и переделываемых блоков: тёплый градиент `from-card via-card to-secondary/30`, мягкая граница `border-border/50` (внутренние разделители `/30`, `/25`), 3px акцентная линия сверху крупных контейнеров, мягкая глубокая тень, отступы `p-6 sm:p-8`, плавные `transition-colors` / `transition-all`. Однотипные блоки одной страницы — в одном стиле.

**5.1. Контейнер-карточка** — основной паттерн:
```tsx
<div className="overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
  <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
  <div className="p-6 sm:p-8">{/* контент */}</div>
</div>
```
В сетке карточек добавляются `group relative` и `transition-all hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]`.

**5.2. Тёплая секция** для ритма:
```tsx
<section className="bg-secondary/30 py-16 sm:py-20 lg:py-24">
```

**5.3. Иконка в контейнере** (внутри элемента с `group`):
```tsx
<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10 transition-all group-hover:bg-primary/12 group-hover:ring-primary/25">
  <Icon className="h-5 w-5 text-primary/70 group-hover:text-primary" strokeWidth={1.5} />
</div>
```

**5.4. Строки-ссылки** внутри контейнера (список `divide-y divide-border/25`):
```tsx
<Link href="…" className="group flex items-center gap-4 px-5 py-[18px] transition-colors hover:bg-primary/4 sm:px-7">
```
Слева иконка 5.3 размером `h-10 w-10` (сама иконка `h-[18px] w-[18px]`), справа `ArrowRight` `text-primary/25` → `group-hover:translate-x-1 group-hover:text-primary`.

**5.5. Стеклянный бейдж на фото** (`absolute bottom-4 left-4` внутри `relative`-обёртки фото):
```tsx
<div className="inline-flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/10">
  <span className="h-2 w-2 rounded-full bg-primary" />
  <span className="text-[13px] font-medium text-white/90">Label</span>
</div>
```
В существующем коде точка записана как `bg-[#EA6C20]` — это тот же `primary`.

**5.6. CTA-ссылка в стиле карточки** (без заливки):
```tsx
<Link href="…" className="group inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
```

**5.7. Номер-водяной знак** (карточка с `group relative`, контент поверх — в `relative`-обёртке):
```tsx
<span className="pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none text-primary/4 transition-colors group-hover:text-primary/7" aria-hidden="true">01</span>
```

**5.8. Фото + контент** (`verdieping-section.tsx`; в карточке города на `[location]` пропорция `1fr / 1.2fr`): контейнер 5.1 → `grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`; половина с фото — `relative min-h-[260px] sm:min-h-[320px] lg:min-h-0`, фото `absolute inset-0 h-full w-full object-cover`, затемнение `bg-linear-to-t from-black/20 via-transparent to-transparent`, бейдж 5.5; вторая половина — строки 5.4, граница между половинами `border-t border-border/30 lg:border-l lg:border-t-0`.

## 6. CTA и контакты

Иерархия: заявка через форму → WhatsApp → телефон. WhatsApp — основной канал, телефон вторичен: владелец не может обслуживать звонки из-за языкового барьера.

- **Hero:** «Offerte aanvragen» → `#offerte` (вид `.btn-hero`) и «WhatsApp» (`border-white/15 bg-white/5 text-white/80`, иконка `MessageCircle` в зелёном WhatsApp). Над кнопками тизер «Gratis opname & offerte» (`rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary ring-1 ring-primary/25`) и приписка «prijs na opname op locatie»; под ними звёзды, `<GoogleRatingBadge format="short" />` и телефон мелкой текстовой ссылкой.
- **Навбар:** ссылка WhatsApp и кнопка «Offerte aanvragen» → `/contact/` (страница, не модалка); телефона нет.
- **`StickyCTABar`** (`components/sections/gevelisolatie/sticky-cta-bar.tsx`; нет на страницах проектов, `privacybeleid` и 404): появляется после hero, прячется у футера, закрывается крестиком. Мобильный — круглые WhatsApp и телефон + пилюля «Offerte aanvragen» → `#offerte`; десктоп — «WhatsApp ons», приглушённый номер, контурная «Offerte aanvragen».
- **`QuoteModal`** (`components/quote-modal.tsx`) перехватывает клики по `a[href="#offerte"]` и открывается по хешу `#offerte`, поэтому должен быть смонтирован на странице; страницам проектов его даёт `app/onze-werken/layout.tsx`. Внизу формы — телефон и WhatsApp.
- **Страницы проектов:** кнопка hero `.btn-hero` ведёт на `/contact/` (так в шаблоне).
- **Внутри секций** допустима контекстная ссылка на `#offerte` («Gratis opname aanvragen» в блоке Kosten на `[location]`, «Vraag een offerte aan →» на страницах услуг). Отдельных CTA-блоков и баннеров между секциями нет — хватает hero и `StickyCTABar`; `components/cta-section.tsx` — такой блок, он не подключён.
- В CTA и тизерах — без цифр: ни цен, ни счётчиков вроде «N+ проектов». Рейтинг и число отзывов — только через `GoogleRatingBadge`.
- Ссылки: WhatsApp `https://wa.me/31612079808?text=…` (текст сообщения зависит от страницы), телефон `tel:+31612079808`.
- По контейнеру клика `components/cta-click-tracker.tsx` определяет `placement`: `header`/`nav` → navbar, `aria-label="Snelle contactbalk"` → sticky_bar, `role="dialog"` → modal, `footer`, `aria-label="Hero"` → hero. Эти метки не переименовывать, CTA не вкладывать в `<nav>`.

## 7. FAQ, изображения, иконки

**FAQ.** Раскладка: `grid gap-12 lg:grid-cols-12 lg:gap-16`; слева `lg:col-span-5` с `lg:sticky lg:top-32` (eyebrow, H2, лид, ссылка «Neem contact op» на `/contact/`), справа `lg:col-span-7` — пункты с номерами `01`, `02`…, первый открыт. Что где:
- `components/page/FaqAccordion.tsx` (client, проп `variant`: `default` или `premium`) — подстраницы кластера, `keimen`, `sausklaar-behangklaar`, `/onze-werken/`, `/over-ons/`; `premium` пока только на `kosten`, `keimen`, `sausklaar-behangklaar`;
- свои client-аккордеоны money-страниц: `app/buiten-stucwerk/faq-accordion.tsx`, `app/gevel-schilderen/faq-accordion.tsx`, `app/muren-stucen/faq-accordion.tsx`, `app/sierpleister/sierpleister-faq.tsx`; хаб — `components/sections/gevelisolatie/faq-section.tsx` (с фильтром по категориям); главная — `components/faq-section.tsx`;
- нативный `<details>` остался только на `[location]` и `/diensten/`.

Новый или переделываемый FAQ — `<FaqAccordion items={…} variant="premium" />`. Вопросы и ответы берутся из того же массива, что и JSON-LD `FAQPage` страницы.

**Изображения.** Только `<ResponsiveImage baseName="…" preset="…" sizes="…" alt="…" />` (`components/responsive-image.tsx`); `next/image` не используется. Пресеты: `hero`, `card`, `serviceCard`, `gallery`, `thumbnail`. `priority` — только у фото hero; `sizes` — по реальной ширине слота (`100vw` только для полноэкранного hero). Фото-фон карточки: `absolute inset-0 h-full w-full object-cover` + затемнение `bg-linear-to-t from-black/20 via-transparent to-transparent`. В `"use client"`-компонентах `ResponsiveImage` не использовать — `src`/`srcSet` считает серверный родитель (пример в §9). Логотипы — обычный `<img>`. Остальное — `docs/IMAGE-PIPELINE.md`.

**Иконки.** Только `lucide-react`, эмодзи в интерфейсе нет. Размеры: `h-4 w-4` в кнопках и мелких строках, `h-5 w-5` в иконочных контейнерах, `h-[18px] w-[18px]` в строках-ссылках 5.4. В премиум-блоках — `strokeWidth={1.5}` и `text-primary/70` → `group-hover:text-primary`. WhatsApp — `MessageCircle`, телефон — `Phone`.

## 8. Известные отклонения в коде

Состояние на 2026-09-29. Это долг, а не образец: новых таких мест не добавлять; когда блок всё равно переделывается — перевести его на токены и паттерны §5.

- **Hex в `className`** — ≈210 вхождений в 28 файлах: `#1A1A1A` (90, hero), `#EA6C20` (60 — это `primary`), `#25D366` (32, WhatsApp), `#FBBC05` (19, звёзды); по одному — `#E8DDD0` и `#6B655E` (это `border` и `muted-foreground`), `#D0540A`, `#D46218`, `#252525`, `#111` и цвета Google.
- **`bg-gradient-to-*`** (синтаксис v3) — 29 в 15 файлах, 6 из них в `components/navbar.tsx`. Tailwind v4 их пока собирает, но в новом коде — `bg-linear-to-*`.
- **Жёсткий `border-border`** без прозрачности — ≈516 вхождений в 73 файлах против ≈125 смягчённых `border-border/NN`. Премиум-паттернов §5 пока нет на `buiten-stucwerk`, `sierpleister`, `gevel-schilderen`, `muren-stucen`, `materialen`, `rc-waarde-dikte`, `diensten`, `over-ons`, `onze-werken`, `contact`.
- **Одна `below-fold` на весь контент** — `kosten`, `materialen`, `rc-waarde-dikte`, `keimen`, `sausklaar-behangklaar` и все 20 страниц проектов.
- **`aria-label="Hero"`** есть только в `components/hero-section.tsx`, `hero-gevelisolatie.tsx` и на `afwerkingen`. На остальных страницах `StickyCTABar` появляется по запасному порогу (80% высоты окна), а dataLayer-события кликов из hero получают `placement: content` (метка пока нигде не сохраняется).
- **Тёмные блоки в контенте:** три `bg-foreground`-блока на `sierpleister`, «Onze aanpak» на `over-ons` (`bg-[#111]`), активное состояние в `components/sections/gevelisolatie/checklist-interactive.tsx`.
- **Белое:** навбар после прокрутки — `bg-white/75`; hero страниц проектов растворяется в `#ffffff` (inline `style`, так в шаблоне) при фоне страницы `#FFF9F2`; на фото в `afwerkingen`, `kosten`, `subsidie-vergunning` — второй, светлый вариант бейджа (`border-white/30 bg-white/20`). Сплошной `bg-white` — только у мелких элементов (ручка слайдера, переключатели).
- **Бледный текст:** `text-muted-foreground/60` — 26 раз (≈2.5:1), в том числе подписи строк в `verdieping-section.tsx` и на `[location]`; метки фактов на `[location]` — `text-primary/45` при размере 10px.
- **Палитра Tailwind вместо токенов:** `Callout` в вариантах `info`, `warning`, `tip` (синий, янтарный, зелёный); карточки «Lokale informatie» на `[location]` (зелёный, синий, янтарный, фиолетовый + hex-свечение в `style`); звёзды рейтинга двух цветов — `fill-amber-400` (10 файлов) и `fill-[#FBBC05]` (9 файлов).
- **404 без тёмного hero** (`app/not-found.tsx`): до прокрутки прозрачный навбар с белыми ссылками стоит на кремовом фоне.
- **Мёртвое:** `components/cta-section.tsx`, `app/onze-werken/faq.tsx`, `styles/globals.css`, `@keyframes shimmer` в `app/globals.css`, неиспользуемые классы из §3; `components/ui/` исключён из сканирования Tailwind (`@source not "../components/ui"`), поэтому его классы в CSS не попадают.

## 9. Эталонные файлы

| Что | Где |
|---|---|
| Премиум-страница целиком | `app/gevelisolatie/[location]/page.tsx`, `app/gevelisolatie/kosten/page.tsx` |
| Премиум вне кластера | `app/gevel-schilderen/keimen/page.tsx`, `app/muren-stucen/sausklaar-behangklaar/page.tsx` |
| Bento с фото и USP-карточками, CTA-ссылка 5.6 | `components/sections/gevelisolatie/waarom-bm-klus-section.tsx` |
| Фото + строки-ссылки (5.8) | `components/sections/gevelisolatie/verdieping-section.tsx` |
| Hero с `aria-label="Hero"` | `components/sections/gevelisolatie/hero-gevelisolatie.tsx`, `components/hero-section.tsx` |
| Порядок секций и `below-fold` | `app/gevelisolatie/page.tsx` |
| CTA-слой | `components/sections/gevelisolatie/sticky-cta-bar.tsx`, `components/quote-modal.tsx`, `components/navbar.tsx` |
| Полоса доверия | `components/trust-strip.tsx` |
| Блоки статей и FAQ | `components/page/Section.tsx`, `components/page/FaqAccordion.tsx` и соседи в `components/page/` |
| Картинка в client-компоненте | `components/sections/gevelisolatie/materialen-section.tsx` → `materialen-interactive.tsx` |

Общие компоненты меняют сразу много страниц: `app/gevelisolatie/[location]/page.tsx` — все 21 городская страница, `WaaromBmKlusSection` — 7 страниц (текст через проп `subtitle`), `FaqAccordion` — 9, `TrustStrip` и `StickyCTABar` — почти все основные страницы.
