import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  CheckCircle2,
  Check,
  ArrowRight,
  Layers,
  Wrench,
  ShieldCheck,
  Paintbrush2,
  Sparkles,
  Palette,
  ChevronRight,
  RotateCcw,
  MessageCircle,
  Star,
  MapPin,
  Phone,
} from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
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
  voordelen,
  kosten,
  werkwijze,
  materialen,
  ondergronden,
  nadelen,
  reparatie,
  isolatie,
  faq,
  internalLinks,
} from "@/lib/content/buiten-stucwerk"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"

const WerkwijzeStepper = dynamic(() => import("./werkwijze-stepper"))
const AfwerkingKeuzehulp = dynamic(() => import("@/components/sections/buiten-stucwerk/AfwerkingKeuzehulp"))
const NadelenSwitcher = dynamic(() => import("./nadelen-switcher"))
const FaqAccordion = dynamic(() => import("./faq-accordion").then((mod) => mod.FaqAccordion))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StickyCTABar = dynamic(() => import("@/components/sections/gevelisolatie/sticky-cta-bar"))

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20buiten%20stucwerk.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

/* ── Metadata ── */
export const metadata = buildPageMetadata("/buiten-stucwerk/", {
  image: "/images/og-buiten-stucwerk.jpg",
})

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
    name: "Buiten stucwerk (gevel stucen)",
    description: "Buitenmuur stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Prijs per m² na gratis opname.",
    url: `${base}/buiten-stucwerk/`,
    lowPrice: "35",
    highPrice: "110",
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

/* ── Page ── */
export default function BuitenStucwerkPage() {
  return (
    <>
      <PageJsonLd />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src="/images/buiten-stucwerk-hero.webp"
            alt="Buitenmuur stucen — stukadoor brengt pleisterlaag aan op gevel in Rotterdam"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {hero.breadcrumbs.map((item, i) => {
                const isLast = i === hero.breadcrumbs.length - 1
                return (
                  <li key={item.href} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
                    {isLast ? (
                      <span className="font-medium text-white/90">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="text-white/60 transition-colors hover:text-white">
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
              <p className="text-[#EA6C20] text-xs font-bold tracking-[0.25em] uppercase">
                Buiten stucwerk · Regio Rotterdam
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Buitenmuur stucen{" "}
                <span className="text-[#EA6C20]">(gevel stucen)</span>
                <br />
                <span className="text-white/90">prijs per m² na gratis opname</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                {hero.lead[0]}
              </p>

              {/* Price teaser */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#EA6C20]/15 px-3 py-1.5 text-sm font-bold text-[#EA6C20] ring-1 ring-[#EA6C20]/25">
                  Vanaf €35/m²
                </span>
                <span className="text-xs text-white/50">
                  incl. arbeid & materiaal · excl. steiger
                </span>
              </div>

              {/* Trust bullets */}
              <div className="flex flex-col gap-2">
                {hero.trustBullets.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="shrink-0 text-[#EA6C20]" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* Werkgebied */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <MapPin size={13} className="shrink-0 text-[#EA6C20]" />
                <span className="text-xs text-white/60">
                  Rotterdam, Den Haag, Delft, Dordrecht en omgeving (±80–100 km)
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
                  className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.08] px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/[0.14]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/15 transition-transform group-hover:scale-110">
                    <MessageCircle size={14} className="text-[#25D366]" strokeWidth={1.5} />
                  </span>
                  WhatsApp
                </a>
              </div>

              {/* Trust proof */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-white/60">4.8/5 · 23+ reviews</span>
                </div>
                <span className="h-3 w-px bg-white/20" />
                <a href="tel:+31612079808" className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80">
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
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {toc.map((item, i) => (
                <a key={item.id} href={`#${item.id}`} className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-all hover:border-primary hover:bg-primary/5">
                  <span className="text-[9px] font-bold tabular-nums text-primary/40 transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">{item.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ── WAT IS ── */}
        <section id={watIs.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Definitie</SectionTagline>
            <h2 className="mt-2 mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Wat is <span className="text-primary">buitenmuur stucen?</span>
            </h2>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid lg:grid-cols-[1fr_420px]">
              <div className="flex flex-col justify-center px-8 py-8 sm:px-10 lg:py-10">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{watIs.intro}</p>
                <div className="my-6 h-px bg-border" />
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">{watIs.wanneer.h3}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {watIs.wanneer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-secondary/50 px-5 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70">{watIs.buitenVsBinnen.h3}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{watIs.buitenVsBinnen.body}</p>
                </div>
              </div>
              <div className="relative h-52 w-full lg:h-auto">
                <Image src="/images/wat-is-buitenmuur-stucen.webp" alt="Stukadoor brengt cementpleister aan op de buitenmuur" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-card/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── VOORDELEN ── */}
        <section id={voordelen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Voordelen</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Voordelen van <span className="text-primary">buiten stucwerk</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Sparkles, ...voordelen.items[0] },
                { icon: ShieldCheck, ...voordelen.items[1] },
                { icon: Paintbrush2, ...voordelen.items[2] },
                { icon: Wrench, ...voordelen.items[3] },
                { icon: Palette, ...voordelen.items[4] },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="group relative flex gap-4 rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]">
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-transparent px-5 py-5 sm:col-span-2 lg:col-span-1">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs italic leading-relaxed text-muted-foreground">{voordelen.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAAROM BM KLUS ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV verzorgt professioneel buiten stucwerk, sierpleister en gevelafwerking voor woningen in de regio Rotterdam en omgeving." />

        {/* ── KOSTEN ── */}
        <section id={kosten.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Kosten</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Kosten buitenmuur stucen <span className="text-primary">(prijs per m²)</span>
            </h2>

            <div className="mb-6 rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-5 sm:px-8">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{kosten.intro}</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-secondary/40 sm:grid-cols-4">
                {kosten.prices.map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center py-4 px-3 text-center">
                    <span className="text-base font-bold text-primary sm:text-lg">{value}</span>
                    <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border bg-secondary/20 px-5 py-3 space-y-0.5">
                {kosten.disclaimer.map((line, i) => (
                  <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">{line}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">{kosten.priceFactors.h3}</p>
                <ul className="space-y-2">
                  {kosten.priceFactors.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">{kosten.inPrijs.h3}</p>
                  <ul className="space-y-2">
                    {kosten.inPrijs.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 sm:px-7">
                  <p className="text-sm leading-relaxed text-foreground">{kosten.callout}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WERKWIJZE ── */}
        <section id={werkwijze.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Werkwijze</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Van inspectie <span className="text-primary">tot oplevering</span>
            </h2>
            <WerkwijzeStepper />
          </div>
        </section>

        {/* ── MATERIALEN ── */}
        <section id={materialen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Materialen</SectionTagline>
            <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Materialen en <span className="text-primary">afwerkingen</span>
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{materialen.intro}</p>

            <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {materialen.subsections.map((s) => (
                <div key={s.h3} className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
                  <div className="px-4 pb-4 pt-4">
                    <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">{s.h3}</h3>
                    <ul className="space-y-1.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          <span className="text-xs leading-relaxed text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/8">
                    {materialen.table.headers.map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-semibold text-primary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {materialen.table.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-5 py-3 leading-relaxed ${j === 0 ? "font-medium text-foreground" : ""}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── KEUZEHULP ── */}
        <section id="keuzehulp" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Keuzehulp</SectionTagline>
            <h2 className="mt-2 mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Welke afwerking past <span className="text-primary">bij uw gevel?</span>
            </h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Beantwoord 5 korte vragen en ontvang een advies (indicatief).
            </p>
            <AfwerkingKeuzehulp />
          </div>
        </section>

        {/* ── ONDERGRONDEN ── */}
        <section id={ondergronden.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Techniek</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Ondergronden: <span className="text-primary">baksteen, beton & stucwerk</span>
            </h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              {ondergronden.cards.map(({ title, body }) => (
                <div key={title} className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
                  <div className="px-5 pb-5 pt-4">
                    <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
              <p className="text-sm leading-relaxed text-muted-foreground">{ondergronden.detaillering}</p>
            </div>
          </div>
        </section>

        {/* ── NADELEN ── */}
        <section id={nadelen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>{"Risico's"}</SectionTagline>
            <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Nadelen en hoe u <span className="text-primary">problemen voorkomt</span>
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{nadelen.intro}</p>
            <NadelenSwitcher />
          </div>
        </section>

        {/* ── REPARATIE ── */}
        <section id={reparatie.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Reparatie</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Stucwerk buiten <span className="text-primary">repareren & herstellen</span>
            </h2>
            <div className="grid gap-4 lg:grid-cols-[1fr_300px] lg:items-stretch">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex flex-col justify-center gap-5 px-7 py-7">
                  {reparatie.paragraphs.map((p, i) => (
                    <div key={i}>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p}</p>
                      {i < reparatie.paragraphs.length - 1 && <div className="mt-5 h-px bg-border" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border border-primary/25 bg-primary/5 px-6 py-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <RotateCcw className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Herstelwerkzaamheden</p>
                </div>
                <ul className="flex-1 space-y-3">
                  {reparatie.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ISOLATIE (cross-sell) ── */}
        <section id={isolatie.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>ETICS</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Buitenmuur isoleren <span className="text-primary">en stucen (ETICS)</span>
            </h2>
            <div className="rounded-2xl border border-border bg-card px-7 py-8 sm:px-10">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{isolatie.body}</p>
              <div className="mt-6 space-y-2">
                {[
                  { n: "1", label: "Bestaande gevel (baksteen / beton)", color: "bg-stone-400" },
                  { n: "2", label: "EPS isolatieplaten (hechtmiddel + ankers)", color: "bg-amber-200" },
                  { n: "3", label: "Glasvezelwapeningslaag (stucmortel + net)", color: "bg-primary/30" },
                  { n: "4", label: "Afwerklaag: sierpleister of betonstuc", color: "bg-primary" },
                ].map(({ n, label, color }) => (
                  <div key={n} className="flex items-center gap-3">
                    <div className={`h-5 w-5 shrink-0 rounded-sm ${color}`} />
                    <span className="text-xs font-medium text-foreground">{n}.</span>
                    <span className="text-xs leading-snug text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Meer weten?{" "}
                <Link href={isolatie.linkHref} className="font-semibold text-primary underline-offset-2 hover:underline">
                  {isolatie.linkLabel} →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <div className="relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
          <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde<br /><span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Alles wat u wilt weten over buitenmuur stucen.
                    </p>
                    <p className="mt-8 text-base text-muted-foreground">
                      Staat uw vraag er niet tussen?{" "}
                      <Link href="/contact/" className="font-semibold text-primary hover:underline">Neem contact op</Link>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <FaqAccordion />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── INTERNAL LINKS ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <nav aria-label="Gerelateerde pagina's">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Gerelateerde pagina&apos;s:</span>
              {internalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-border">•</span>}
                  <Link href={link.href} className="hover:text-primary hover:underline underline-offset-4 transition-colors">{link.label}</Link>
                </span>
              ))}
            </div>
          </nav>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />

      {/* ── Quote modal ── */}
      <QuoteModal dienst="buitenstucwerk" />
    </>
  )
}
