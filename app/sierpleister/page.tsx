import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  CheckCircle2,
  Check,
  ArrowRight,
  Layers,
  Wrench,
  Shield,
  Ruler,
  Droplets,
  Leaf,
  Palette,
  LayoutGrid,
  ArrowUp,
  ShieldCheck,
  Paintbrush2,
  Wind,
  ExternalLink,
  Info,
  MessageCircle,
  Star,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import {
  hero,
  toc,
  watIs,
  soorten,
  korrelgrootte,
  voordelen,
  kosten,
  werkwijze,
  details,
  onderhoud,
  reparatie,
  etics,
  faq,
  internalLinks,
} from "@/lib/content/sierpleister"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"

const WerkwijzeStepper = dynamic(() => import("./werkwijze-stepper"))
const GevelAfwerkingGids = dynamic(
  () => import("@/components/sections/sierpleister/GevelAfwerkingGids"),
)
const SierpleisterFaq = dynamic(() =>
  import("./sierpleister-faq").then((mod) => mod.SierpleisterFaq),
)
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20sierpleister%20voor%20de%20gevel.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

/* ── Structured Data ── */
function PageJsonLd() {
  const base = SITE.canonicalBase

  const breadcrumbs = breadcrumbSchema(
    hero.breadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Gevel sierpleister (spachtelputz / crepi)",
    description:
      "Gevel sierpleister aanbrengen in regio Rotterdam. Spachtelputz, crepi, korrel 1,5–3 mm. Prijs per m² na gratis opname.",
    url: `${base}/sierpleister/`,
    lowPrice: "50",
    highPrice: "105",
  })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {jsonLdScript(faqSchema)}
    </>
  )
}

/* ── Shared helpers ── */
function SectionTagline({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-10 bg-primary" />
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {children}
      </span>
    </div>
  )
}

const ICON_MAP: Record<string, React.ElementType> = {
  Ruler,
  Layers,
  Wrench,
  Droplets,
  Leaf,
  LayoutGrid,
  Shield,
  ShieldCheck,
  ArrowUp,
  Palette,
  Paintbrush2,
  Wind,
}

/* ── Page ── */
export default function SierpleisterPage() {
  return (
    <>
      <PageJsonLd />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        {/* Background: gradient as base, image on top when available */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, #1A1A1A 0%, #2A1C0E 35%, #6B3D1A 60%, #BF722A 78%, #1A1A1A 100%)",
          }}
        />
        <div className="absolute inset-0">
          <Image
            src="/images/sierpleister-hero.webp"
            alt="Stukadoor brengt gevelsierpleister aan op een Nederlandse woning in Rotterdam"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/30" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        {/* Subtle texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {hero.breadcrumbs.map((item, i) => {
                const isLast = i === hero.breadcrumbs.length - 1
                return (
                  <li key={item.href} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                    )}
                    {isLast ? (
                      <span className="font-medium text-white/90">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
            <div className="flex max-w-2xl flex-col gap-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#EA6C20]">
                Gevelafwerking · sierpleister & crepi
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gevel sierpleister:{" "}
                <span className="text-[#EA6C20]">spachtelputz of crepi</span>
                <br />
                <span className="text-white/90">prijs per m² na opname</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                {hero.lead[0]}
              </p>

              {/* Price teaser */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#EA6C20]/15 px-3 py-1.5 text-sm font-bold text-[#EA6C20] ring-1 ring-[#EA6C20]/25">
                  Vanaf €50/m²
                </span>
                <span className="text-xs text-white/50">
                  incl. arbeid & materiaal · excl. steiger
                </span>
              </div>

              {/* Trust bullets */}
              <div className="flex flex-col gap-2">
                {hero.trustBullets.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#EA6C20]"
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* Werkgebied */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <MapPin size={13} className="shrink-0 text-[#EA6C20]" />
                <span className="text-xs text-white/60">
                  {hero.geoSentence}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <a
                  href="#offerte"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
                >
                  Offerte aanvragen
                  <ArrowRight size={16} />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/8 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/14"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/15 transition-transform group-hover:scale-110">
                    <MessageCircle
                      size={14}
                      className="text-[#25D366]"
                      strokeWidth={1.5}
                    />
                  </span>
                  WhatsApp
                </a>
              </div>

              {/* Trust proof */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-white/60">
                    4.8/5 · 23+ reviews
                  </span>
                </div>
                <span className="h-3 w-px bg-white/20" />
                <a
                  href="tel:+31612079808"
                  className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
                >
                  <Phone size={12} />
                  +31 6 1207 9808
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <TrustStrip />

      {/* ══ ARTICLE ══ */}
      <article className="overflow-hidden bg-background pb-16 sm:pb-20 lg:pb-24">

        {/* ── TOC ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <nav aria-label="Inhoudsopgave">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Inhoud
              </span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {toc.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-all hover:border-primary hover:bg-primary/5"
                >
                  <span className="text-[9px] font-bold tabular-nums text-primary/40 transition-colors group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ── WAT IS GEVEL SIERPLEISTER ── */}
        <section
          id={watIs.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{watIs.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Wat is{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                gevel sierpleister?
              </span>
            </h2>

            {/* Hero band: image + intro side by side */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[480px_1fr]">
              {/* Image */}
              <div className="relative h-60 lg:h-auto">
                <Image
                  src="/images/wat-is-gevel-sierpleister.webp"
                  alt="Stukadoor brengt gevelsierpleister aan op een Nederlandse woning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-card/20" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Spachtelputz op gevelvlak
                  </span>
                </div>
              </div>

              {/* Intro + toepassingen */}
              <div className="flex flex-col justify-center px-8 py-8 sm:px-10">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {watIs.intro}
                </p>
                <div className="my-5 h-px bg-border" />
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
                  Wanneer toegepast
                </p>
                <ul className="grid gap-y-2 sm:grid-cols-2">
                  {watIs.toepassingen.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                        strokeWidth={3}
                      />
                      <span className="text-sm leading-snug text-muted-foreground">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Korrelgrootte row */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {korrelgrootte.chips.map(({ size, label }, i) => (
                <div
                  key={size}
                  className="relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary/15"
                    style={{ height: `${(i + 1) * 4}px` }}
                  />
                  <p className="text-lg font-black text-primary sm:text-xl">
                    {size}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs italic text-muted-foreground">
              {korrelgrootte.note}
            </p>

            {/* Soorten: 3 cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {soorten.types.map(({ name, badge, description }) => (
                <div
                  key={name}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:border-primary/40"
                >
                  {badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {badge}
                    </span>
                  )}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary/25 transition-colors group-hover:bg-primary/60" />
                  <p className="mb-2 pr-20 text-sm font-bold leading-snug text-foreground">
                    {name}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            {/* Verschil callout strip */}
            <div className="mt-4 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70">
                  {watIs.verschil.label}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {watIs.verschil.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── GEVEL AFWERKING GIDS ── */}
        <GevelAfwerkingGids />

        {/* ── VOORDELEN ── */}
        <section
          id={voordelen.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{voordelen.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Voordelen van{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                sierpleister op de gevel
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Gevel sierpleister combineert een aantrekkelijk uiterlijk met
              technische bestandheid — de ideale eindlaag voor renovatie én
              nieuwbouw.
            </p>

            {/* Bento grid */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Hero card — spans 2 cols */}
              <div className="group relative overflow-hidden rounded-2xl bg-foreground lg:col-span-2">
                <div className="absolute inset-0">
                  <Image
                    src="/images/gevel-sierpleister-spachtelputz.webp"
                    alt="Spachtelputz gevelafwerking close-up"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/55 to-foreground/10" />
                </div>
                <div className="relative flex h-full flex-col justify-between px-8 py-8 sm:px-10 sm:py-10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-sm">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-24 sm:mt-32">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary/80">
                      Voordeel 01
                    </p>
                    <h3 className="mb-3 text-balance text-xl font-bold text-white sm:text-2xl">
                      {voordelen.items[0].title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {voordelen.items[0].body}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stat card — top right */}
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-card px-7 py-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Wind className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-8">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
                    Voordeel 03
                  </p>
                  <h3 className="mb-2 text-base font-bold leading-snug text-foreground">
                    {voordelen.items[2].title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {voordelen.items[2].body}
                  </p>
                  <div className="mt-5 space-y-2.5">
                    {[
                      { label: "Regenwering", pct: 92 },
                      { label: "Vorstbestendig", pct: 85 },
                      { label: "Winddruk", pct: 88 },
                    ].map(({ label, pct }) => (
                      <div key={label}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground">
                            {label}
                          </span>
                          <span className="text-[11px] font-semibold text-foreground">
                            {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Three smaller cards */}
              {[
                { num: "02", icon: Layers, item: voordelen.items[1] },
                { num: "04", icon: Palette, item: voordelen.items[3] },
                { num: "05", icon: Paintbrush2, item: voordelen.items[4] },
              ].map(({ num, icon: Icon, item }) => (
                <div
                  key={num}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-6 transition-colors hover:border-primary/40"
                >
                  <div className="absolute right-4 top-4 text-foreground opacity-[0.04]">
                    <Icon className="h-16 w-16" strokeWidth={1.5} />
                  </div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <p className="mb-1.5 text-sm font-bold leading-snug text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl bg-primary/0 transition-colors group-hover:bg-primary/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KOSTEN ── */}
        <section
          id={kosten.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{kosten.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Kosten gevel sierpleister{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                (prijs per m²)
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {kosten.intro}
            </p>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Left: price cards + disclaimer + prijsfactoren */}
              <div className="flex flex-col gap-5">
                {/* Price cards */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {kosten.priceCards.map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`relative overflow-hidden rounded-2xl border px-6 py-7 transition-colors ${
                        i === 0
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      {i === 0 && (
                        <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          Populair
                        </span>
                      )}
                      <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-primary/30" />
                      <p className="text-2xl font-black text-foreground sm:text-3xl">
                        {value}
                      </p>
                      <p className="mt-1.5 pr-14 text-xs leading-snug text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Disclaimer row */}
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                  <div className="space-y-0.5">
                    {kosten.disclaimer.map((line, i) => (
                      <p
                        key={i}
                        className="text-xs leading-relaxed text-muted-foreground"
                      >
                        {line}
                      </p>
                    ))}
                    <p className="text-xs italic leading-relaxed text-muted-foreground">
                      {kosten.eticsNote}
                    </p>
                  </div>
                </div>

                {/* Prijsfactoren */}
                <div className="rounded-2xl border border-border bg-card px-6 py-6 sm:px-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
                    {kosten.priceFactors.h3}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {kosten.priceFactors.items.map(({ icon, label }) => {
                      const Icon = ICON_MAP[icon] ?? Check
                      return (
                        <li key={label} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <Icon className="h-3 w-3 text-primary" />
                          </span>
                          <span className="text-xs leading-snug text-muted-foreground">
                            {label}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {/* Right: inPrijs */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative h-48 w-full shrink-0">
                  <Image
                    src="/images/offerte-berekening.webp"
                    alt="Offerte berekening voor gevel sierpleister"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
                    {kosten.inPrijs.h3}
                  </p>
                  <ul className="space-y-3">
                    {kosten.inPrijs.bullets.map((b, i) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-xs leading-snug text-muted-foreground">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Benieuwd wat uw gevel kost?{" "}
                    <a
                      href="#offerte"
                      className="font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      Vraag een offerte aan →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAAROM BM KLUS ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV verzorgt sierpleister en decoratieve gevelafwerkingen voor woningen en appartementen in de regio Rotterdam en omgeving." />

        {/* ── WERKWIJZE ── */}
        <section
          id={werkwijze.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{werkwijze.tagline}</SectionTagline>
            <h2 className="mt-2 mb-8 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Van voorbereiding{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                tot oplevering
              </span>
            </h2>
            <WerkwijzeStepper />

            {/* What to expect */}
            <div className="mt-10 rounded-2xl border border-border bg-card px-7 py-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
                Wat kunt u verwachten
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {werkwijze.verwachten.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                      strokeWidth={3}
                    />
                    <span className="text-sm leading-snug text-muted-foreground">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── DETAILS: PLINT, HOEKEN, DAGKANTEN ── */}
        <section
          id={details.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{details.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Details die het verschil maken:{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                plint, hoeken en dagkanten
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {details.intro}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.cards.map(({ num, title, body, image, imageAlt }) => (
                <div
                  key={num}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-card to-transparent" />
                  </div>
                  <div className="px-5 pb-5 pt-3">
                    <h3 className="mb-1.5 text-sm font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                  <div className="h-[3px] w-full origin-left scale-x-0 bg-primary/50 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ONDERHOUD & REINIGEN ── */}
        <section
          id={onderhoud.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{onderhoud.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Onderhoud:{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                reinigen, algen en levensduur
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {onderhoud.intro}
            </p>

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              {/* Left: levensduur stat card */}
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-2xl bg-foreground px-7 py-8 text-center">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-20 border-primary/10" />
                  <p className="whitespace-nowrap text-5xl font-black leading-none text-primary">
                    {onderhoud.levensduur.years}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                    {onderhoud.levensduur.label}
                  </p>
                  <div className="my-4 h-px bg-white/10" />
                  <p className="text-xs leading-relaxed text-white/70">
                    {onderhoud.levensduur.note}
                  </p>
                </div>

                {/* Quick tips */}
                <div className="rounded-2xl border border-border bg-card px-6 py-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
                    Snelle tips
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Reiniging: lage druk (geen agressieve hogedruk)",
                      "Jaarlijkse visuele inspectie",
                      "Impregneren meestal elke 6–10 jaar (afhankelijk van product en ligging)",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                          strokeWidth={3}
                        />
                        <span className="text-xs leading-snug text-muted-foreground">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: 3 category cards */}
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
                {onderhoud.categories.map(({ title, icon, bullets }) => {
                  const Icon = ICON_MAP[icon] ?? Check
                  return (
                    <div
                      key={title}
                      className="group flex gap-5 rounded-2xl border border-border bg-card px-6 py-5 transition-colors hover:border-primary/40"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-bold text-foreground">
                          {title}
                        </p>
                        <ul className="space-y-1.5">
                          {bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                              <span className="text-xs leading-relaxed text-muted-foreground">
                                {b}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── REPARATIE & HERSTEL ── */}
        <section
          id={reparatie.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{reparatie.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Gevel sierpleister{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                repareren en herstellen
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {reparatie.intro}
            </p>

            {/* Schadetypen — 3 cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              {reparatie.schadetypen.map(({ icon, title, body }) => {
                const Icon = ICON_MAP[icon] ?? Check
                return (
                  <div
                    key={title}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-6 transition-colors hover:border-primary/40"
                  >
                    <div className="absolute right-4 top-4 text-foreground opacity-[0.04]">
                      <Icon className="h-16 w-16" strokeWidth={1.5} />
                    </div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-sm font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 rounded-b-2xl bg-primary/40 transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                )
              })}
            </div>

            {/* Bottom row: note callout + softened CTA */}
            <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
              {/* Note callout */}
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-7 py-6">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-bold text-foreground">
                    Let op: kleur- en structuurverschil
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reparatie.note}
                  </p>
                  <div className="mt-4 space-y-2">
                    {reparatie.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                          strokeWidth={3}
                        />
                        <span className="text-xs leading-snug text-muted-foreground">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Soft CTA card */}
              <div className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 px-6 py-7">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70">
                    Schade aan uw gevel?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Wij beoordelen de situatie en adviseren de meest duurzame
                    hersteloplossing — zonder verplichtingen.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#offerte"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-background px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                  >
                    Offerte aanvragen
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Geen verplichtingen · Reactie per WhatsApp of e-mail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ETICS KOPPELING ── */}
        <section
          id={etics.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{etics.tagline}</SectionTagline>
            <h2 className="mt-2 mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Sierpleister als afwerking bij{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                gevelisolatie (ETICS)
              </span>
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {etics.intro}
            </p>

            <div className="overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[320px_1fr]">
              {/* Left: dark photo panel */}
              <div className="relative flex min-h-[280px] flex-col justify-between bg-foreground p-7 lg:min-h-0">
                <Image
                  src="/images/sierpleister/details-wapening.webp"
                  alt="ETICS glasvezeldoek wapening"
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover opacity-25"
                />
                <span className="pointer-events-none absolute -bottom-4 -right-3 select-none text-[88px] font-black leading-none tracking-tighter text-white/5">
                  ETICS
                </span>

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                    Buitengevelisolatie
                  </span>
                  <p className="mt-4 text-2xl font-black leading-tight text-white">
                    Systeem&shy;gebonden eindlaag
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    {etics.note}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                  {etics.highlights.map(({ icon, label }) => {
                    const Icon = ICON_MAP[icon] ?? Check
                    return (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-[11px] text-white/70">{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: timeline */}
              <div className="px-7 py-7">
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Opbouw — stap voor stap
                </p>
                <div className="relative flex flex-col gap-0">
                  <div className="absolute left-[17px] bottom-9 top-9 w-px bg-border" />
                  {etics.opbouw.map(({ n, title, body }, i) => (
                    <div
                      key={n}
                      className="group relative flex gap-5 pb-6 last:pb-0"
                    >
                      <div
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          i === etics.opbouw.length - 1
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-card text-muted-foreground group-hover:border-primary/50"
                        }`}
                      >
                        <span className="text-[11px] font-black">{n}</span>
                      </div>
                      <div className="pt-1">
                        <p
                          className={`mb-1 text-sm font-bold ${
                            i === etics.opbouw.length - 1
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {title}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    href={etics.linkHref}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10"
                  >
                    {etics.linkLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <div className="relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-background">
          <section id={faq.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                        FAQ
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde
                      <br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Alles wat u wilt weten over gevel sierpleister,
                      spachtelputz en crepi.
                    </p>
                    <p className="mt-8 text-base text-muted-foreground">
                      Staat uw vraag er niet tussen?{" "}
                      <Link
                        href="/contact/"
                        className="font-semibold text-primary hover:underline"
                      >
                        Neem contact op
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <SierpleisterFaq />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── INTERNAL LINKS ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <nav aria-label="Gerelateerde pagina's">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                Gerelateerde pagina&apos;s:
              </span>
              {internalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-border">
                      •
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </nav>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />

      {/* ── Quote modal ── */}
      <QuoteModal dienst="sierpleister" />
    </>
  )
}
