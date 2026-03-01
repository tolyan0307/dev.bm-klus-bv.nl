# BM Klus BV — Design System

> Referentiedocument voor alle pagina's en branches.  
> Volg deze patronen zodat elke pagina consistent is met de rest van de site.

---

## 1. Brand & Kleuren

| Token             | Hex       | Gebruik                                           |
|-------------------|-----------|---------------------------------------------------|
| `--primary`       | `#EA6C20` | Oranje — CTA-knoppen, labels, accenten, underlines |
| `--background`    | `#FFF9F2` | Warme crème — paginaachtergrond                   |
| `--foreground`    | `#2D2A26` | Donkerbruin — koppen en body tekst                |
| `--card`          | `#FFF9F2` | Zelfde als background — kaartenachtergrond        |
| `--secondary`     | `#FFF1E6` | Licht perzik — subtiele achtergronden, hover      |
| `--muted`         | `#F5EDE4` | Crème beige — gedempte elementen                  |
| `--muted-foreground` | `#6B655E` | Grijs-bruin — body tekst, subtitels             |
| `--border`        | `#E8DDD0` | Warme rand — alle borders                         |

**Hardcoded hero kleuren** (alleen in hero-gradients, niet elders):
- Donker: `#1A1A1A`, `#252525`, `#2A2A2A`
- Hero gradient: `linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)`
- Oranje accent: `#E8600A` (iets dieper dan primary — alleen in hero/dark-backgrounds)

**Regel:** Gebruik ALTIJD design tokens (`text-primary`, `bg-card`, `border-border`, etc.).  
Gebruik NOOIT directe hex-codes buiten hero-context.

---

## 2. Typografie

- **Font:** Inter (geladen via `next/font/google`)
- **Klasse:** `font-sans` voor alle tekst

| Element         | Classes                                                         |
|-----------------|-----------------------------------------------------------------|
| Paginatitel H1  | `text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl`    |
| Sectietitel H2  | `text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl`    |
| Kaart-titel H3  | `text-base font-bold sm:text-lg`                                |
| Body            | `text-sm leading-relaxed text-muted-foreground sm:text-base`   |
| Label/overline  | `text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary` |
| Genummerd       | `text-4xl font-black tabular-nums text-primary/20 sm:text-5xl` |

---

## 3. Sectie-header Patroon

Elke sectie begint met dit standaard patroon:

```tsx
{/* Label */}
<div className="mb-3 flex items-center gap-3">
  <div className="h-px w-10 bg-primary" />
  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
    Sectienaam
  </span>
</div>

{/* H2 met oranje accent-woord + underline */}
<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
  Normale tekst{" "}
  <span className="relative inline-block text-primary">
    accentwoord
    <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/40" />
  </span>
</h2>
```

---

## 4. Kaarten

### Standaard kaart
```tsx
<div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
```

### Grote kaart met foto (foto links, tekst rechts)
```tsx
<div className="overflow-hidden rounded-2xl border border-border bg-card">
  <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">
    {/* Foto */}
    <div className="relative overflow-hidden">
      <Image src="..." alt="..." fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
    </div>
    {/* Tekst */}
    <div className="flex flex-col justify-center p-6 lg:p-8">
      ...
    </div>
  </div>
</div>
```

### Genummerde lijst (FAQ / Voordelen stijl)
```tsx
<div className="space-y-3">
  {items.map((item, i) => (
    <div className={`overflow-hidden rounded-xl border transition-all ${
      isOpen ? "border-primary/40 bg-card shadow-md" : "border-border bg-card shadow-sm"
    }`}>
      {/* nummer: String(i+1).padStart(2,"0") */}
    </div>
  ))}
</div>
```

### Twee kolommen met gap-px divider (condities, prijzen etc.)
```tsx
<div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
  <div className="bg-card p-6">...</div>
  <div className="bg-muted/40 p-6">...</div>
</div>
```

---

## 5. CTA-knoppen

### Primair (oranje, `rounded-sm`)
```tsx
<Link
  href="/contact"
  className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
>
  Plan gratis inspectie
  <ArrowRight className="h-4 w-4" />
</Link>
```

### Ghost op wit/licht achtergrond
```tsx
<Link
  href="/contact"
  className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5"
>
  Bekijk onze diensten
</Link>
```

### Ghost op donker achtergrond (hero / dark CTA)
```tsx
<a
  href="tel:+31612079808"
  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
>
  <Phone className="h-4 w-4" />
  +31 6 1207 9808
</a>
```

**Tekst CTA's — altijd uniform:**
- Primair: `"Plan gratis inspectie"`
- Secondair: `"Bekijk onze diensten"`
- Telefoon: `"+31 6 1207 9808"` / `href="tel:+31612079808"`
- Gratis offerte (navbar): `"Gratis offerte"`

---

## 6. Lay-out

### Container
```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### Sectie-spacing
```tsx
<section className="py-12 sm:py-16">
  {/* of: py-16 sm:py-20 lg:py-24 voor grotere secties */}
```

### Sectie-afstand op pagina-niveau
```tsx
<div className="space-y-16">
  <SectieA />
  <SectieB />
  ...
</div>
```

### Sticky linker kolom + scrollende rechter kolom
```tsx
<div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
  <div className="lg:col-span-5">
    <div className="lg:sticky lg:top-32">
      {/* Koptekst, filters, uitleg */}
    </div>
  </div>
  <div className="lg:col-span-7">
    {/* Scrollende content */}
  </div>
</div>
```

---

## 7. Hero (dark gradient)

```tsx
<section style={{
  background: "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)"
}}>
  {/* Texture overlay */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
    style={{ backgroundImage: "url(\"data:image/svg+xml,...\")" }} />

  {/* Stats strip onderaan */}
  <div className="border-t border-white/10 bg-black/25 backdrop-blur-sm">
    {/* Statistieken: 200+ Projecten · 15 jr Ervaring · 5 jr Garantie */}
  </div>
</section>
```

---

## 8. Dark CTA-blok (mid-page)

```tsx
<div className="relative overflow-hidden rounded-2xl"
  style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #252525 100%)" }}>
  {/* Oranje glow accent rechtsbovenin */}
  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8600A] opacity-[0.07] blur-3xl" />
  ...
</div>
```

---

## 9. Foto's

- Alle foto's in `/public/images/`
- Altijd `next/image` met `alt` tekst
- Foto's in kaarten: `fill` + `object-cover` + gradient overlay
- Foto's naast tekst: `width`/`height` + `lg:sticky lg:top-32 lg:self-start`
- Overlay gradient: `bg-gradient-to-t from-black/50 via-transparent to-transparent`

---

## 10. Pillar-pagina structuur (diensten)

```
app/
  [dienst]/
    page.tsx          ← SEO metadata, layout, TOC, space-y-16
lib/
  content/
    [dienst].ts       ← Alle tekst/content (GEEN UI code)
components/
  sections/
    [dienst]/
      hero-[dienst].tsx
      wat-is-...-section.tsx
      voordelen-section.tsx
      kosten-section.tsx
      werkwijze-section.tsx
      afwerkingen-section.tsx
      materialen-section.tsx
      faq-section.tsx
      mid-page-cta.tsx
      sticky-cta-bar.tsx
      meer-informatie-section.tsx
```

**TOC patroon in page.tsx:**
```tsx
<nav aria-label="Inhoudsopgave">
  <div className="mb-4 flex items-center gap-3">
    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
    <span className="h-px flex-1 bg-primary/15" />
  </div>
  <div className="flex flex-wrap gap-2">
    {toc.map((item, i) => (
      <a href={`#${item.id}`}
        className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-all hover:border-primary hover:bg-primary/5">
        <span className="text-[9px] font-bold tabular-nums text-primary/40 group-hover:text-primary">
          {String(i+1).padStart(2,"0")}
        </span>
        <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
          {item.label}
        </span>
      </a>
    ))}
  </div>
</nav>
```

---

## 11. FAQ-patroon (met categoriefilters)

- Links sticky kolom: label + h2 + beschrijving + categorie-pills
- Rechts: genummerde accordion items met `grid-rows` animatie
- Actief item: `border-primary/40 shadow-md`
- Categorie-pill actief: `bg-primary text-primary-foreground`
- Schema.org FAQPage JSON-LD voor SEO

---

## 12. Iconen

- Bibliotheek: `lucide-react`
- Standaardmaten: `h-4 w-4` (inline), `h-5 w-5` (kaarten), `h-6 w-6` (prominent)
- Kleur primair: `text-primary`
- Kleur subtiel: `text-muted-foreground`
- Geen emoji's als iconen

---

## 13. Taal & Toon

- Taal: **uitsluitend Nederlands**
- Toon: professioneel, warm, geen superlatieven
- Energiebesparing: altijd voorwaardelijk — `"kan leiden tot"`, nooit `"leidt tot"`
- Juridisch veilig: vermijd absolute garanties over besparingen

---

## 14. SEO

- Elke pagina: `generateMetadata()` met `title`, `description`, `keywords`, `openGraph`, `alternates.canonical`
- Schema.org: `FAQPage` JSON-LD op pillar-pagina's
- Canonical URL: `https://bmklusbv.nl/[slug]`
- `scroll-mt-24` op alle sectie-ankers voor TOC-navigatie
