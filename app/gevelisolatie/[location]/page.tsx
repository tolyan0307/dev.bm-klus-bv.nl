import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Star,
  ChevronRight,
  Thermometer,
  Shield,
  Paintbrush2,
  Clock,
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
  locations,
  getLocation,
  getAllLocationSlugs,
} from "@/lib/content/gevelisolatie-locations"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"

const KostenCalculator = dynamic(() => import("@/components/sections/gevelisolatie/kosten-calculator"))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const StickyCTABar = dynamic(() => import("@/components/sections/gevelisolatie/sticky-cta-bar"))

/* ── Static generation ── */
export function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }))
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location: slug } = await params
  const data = getLocation(slug)
  if (!data) return {}

  return buildPageMetadata(`/gevelisolatie/${slug}/`, {
    title: data.title,
    description: data.description,
  })
}

/* ── Voordelen (compact) ── */
const voordelen = [
  {
    icon: Thermometer,
    title: "Lagere energiekosten",
    text: "Minder warmteverlies via de gevel, lagere stookkosten.",
  },
  {
    icon: Paintbrush2,
    title: "Nieuwe uitstraling",
    text: "Stuc, sierpleister, crepi of steenstrips — u kiest.",
  },
  {
    icon: Shield,
    title: "Bescherming",
    text: "ETICS beschermt tegen regen, vorst en temperatuurschommelingen.",
  },
  {
    icon: Clock,
    title: "Snel resultaat",
    text: "Gemiddeld 1–2 weken voor een rijtjeshuis (±60 m²).",
  },
]

/* ── Werkwijze steps ── */
const werkwijzeSteps = [
  { num: "01", title: "Gratis opname", text: "Wij beoordelen uw gevel ter plekke en meten op." },
  { num: "02", title: "Offerte per m²", text: "Vaste prijs met RC-waarde, dikte en afwerking." },
  { num: "03", title: "Planning", text: "Startdatum in overleg, schriftelijk bevestigd." },
  { num: "04", title: "Uitvoering", text: "Isolatie + wapeningslaag + afwerking in één arbeidsgang." },
  { num: "05", title: "Oplevering", text: "Samen doorlopen en pas betalen na akkoord." },
]

/* ── Page ── */
export default async function GevelisolatieLocationPage({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location: slug } = await params
  const data = getLocation(slug)
  if (!data) notFound()

  const base = SITE.canonicalBase

  const breadcrumbsData = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Diensten", item: `${base}/diensten/` },
    { name: "Gevelisolatie", item: `${base}/gevelisolatie/` },
    { name: data.city, item: `${base}/gevelisolatie/${slug}/` },
  ])

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: `Buitengevelisolatie (ETICS) ${data.city}`,
    description: data.description,
    url: `${base}/gevelisolatie/${slug}/`,
    lowPrice: "110",
    highPrice: "280",
  })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  }

  return (
    <>
      {jsonLdScript(breadcrumbsData)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {jsonLdScript(faqSchema)}

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src="/images/gevelisolatie-hero.webp"
            alt={`Buitengevelisolatie in ${data.city}`}
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
              {[
                { label: "Home", href: "/" },
                { label: "Diensten", href: "/diensten/" },
                { label: "Gevelisolatie", href: "/gevelisolatie/" },
                { label: data.city, href: `/gevelisolatie/${slug}/` },
              ].map((item, i, arr) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
                  {i === arr.length - 1 ? (
                    <span className="font-medium text-white/90">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="text-white/60 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-8 pb-14 pt-8 sm:pb-16 lg:grid-cols-[1fr_auto] lg:gap-12 lg:pb-20 lg:pt-10">
            {/* Left: text */}
            <div className="flex max-w-2xl flex-col gap-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#EA6C20]">
                Gevelisolatie specialist · {data.city}
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {data.h1}
                <br />
                <span className="text-white/90">prijs per m² na gratis opname</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                {data.intro}
              </p>

              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#EA6C20]/15 px-3 py-1.5 text-sm font-bold text-[#EA6C20] ring-1 ring-[#EA6C20]/25">
                  Vanaf €110/m²
                </span>
                <span className="text-xs text-white/50">incl. arbeid & materiaal</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={13} className="shrink-0 text-[#EA6C20]" />
                <span className="text-xs text-white/60">{data.afstanden}</span>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
                >
                  Gratis offerte aanvragen
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:+31612079808"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
                >
                  <Phone size={16} />
                  +31 6 1207 9808
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <span className="text-xs font-medium text-white/60">
                  4.8/5 op Google · 23+ beoordelingen
                </span>
              </div>
            </div>

            {/* Right: CTA card (desktop) */}
            <div className="hidden lg:flex lg:w-[320px] lg:flex-col lg:justify-end">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">
                  Gevelisolatie in {data.city}?
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                  Wij komen gratis langs, beoordelen uw gevel en leveren
                  binnen 2 werkdagen een heldere offerte per m².
                </p>
                <Link
                  href="/contact/"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d0540a]"
                >
                  Plan gratis inspectie
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:+31612079808"
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
                >
                  <Phone size={14} />
                  Direct bellen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <TrustStrip />

      {/* ══════════════════════════════════════════════════════════════════════
          ARTICLE CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <article className="bg-background pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">

          {/* ── Local context ── */}
          <section className="scroll-mt-24 py-12 sm:py-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                {data.city}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Gevelisolatie in <span className="text-primary">{data.city}</span>
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {data.localContext}
                </p>

                {/* Woningtypes */}
                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Geschikte woningtypes in {data.city}
                  </p>
                  <div className="space-y-2">
                    {data.woningTypes.map((type, i) => (
                      <div
                        key={type}
                        className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/20"
                      >
                        <span className="w-6 shrink-0 text-xs font-black tabular-nums text-primary/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-foreground/80">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side card */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-lg ring-1 ring-primary/5">
                  <div className="border-b border-border bg-primary/[0.03] px-6 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      Snelle feiten
                    </p>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      ["Prijs vanaf", "€110/m²"],
                      ["Doorlooptijd", "1–2 weken"],
                      ["Opname", "Gratis, binnen 48 uur"],
                      ["Offerte", "Vast per m²"],
                      ["Werkgebied", data.city],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between px-6 py-3">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <span className="text-sm font-bold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Voordelen (compact) ── */}
          <section className="scroll-mt-24 py-16 sm:py-20">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Voordelen
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Waarom{" "}
              <span className="text-primary">buitengevelisolatie?</span>
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {voordelen.map((v) => {
                const Icon = v.icon
                return (
                  <div
                    key={v.title}
                    className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

        </div>

        {/* ── Waarom BM Klus (own container) ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV is gespecialiseerd in buitengevelisolatie (ETICS) en gevelafwerking in de regio Rotterdam en omgeving." />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Kosten calculator ── */}
          <section className="scroll-mt-24 py-16 sm:py-20">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Kosten
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Wat kost gevelisolatie in{" "}
              <span className="text-primary">{data.city}?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              De kosten zijn afhankelijk van het woningtype, de oppervlakte en de
              gekozen afwerking. Gebruik de calculator voor een globale indicatie.
            </p>
            <KostenCalculator />
          </section>

          {/* ── Werkwijze (compact steps) ── */}
          <section className="scroll-mt-24 py-16 sm:py-20">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Werkwijze
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Van opname tot{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                oplevering
              </span>
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {werkwijzeSteps.map((step) => (
                <div key={step.num} className="rounded-xl border border-border bg-card p-5">
                  <span className="text-3xl font-black text-primary/20">{step.num}</span>
                  <h3 className="mt-2 text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Mid-page CTA ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #252525 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8600A] opacity-[0.07] blur-3xl" />
          <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8600A]">
                  Vrijblijvend advies · {data.city}
                </p>
                <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                  Benieuwd wat het kost{" "}
                  <span className="text-[#E8600A]">voor uw woning?</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  Wij komen gratis langs in {data.city}, beoordelen de gevel en
                  leveren binnen 2 werkdagen een heldere offerte per m².
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {["Vaste prijs per m²", "RC-waarde en dikte in de offerte", "Subsidie & vergunning check"].map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-[15px] w-[15px] shrink-0 text-[#E8600A]" />
                      <span className="text-sm text-white/70">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8600A] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
                >
                  Vraag uw offerte aan
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+31612079808"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  +31 6 1207 9808
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Cluster links ── */}
          <section className="py-16 sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Verdieping:{" "}
              <span className="text-primary">alles over gevelisolatie</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Kosten, materialen, afwerkingen en meer — per onderwerp uitgelegd.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Kosten & prijs per m²", href: "/gevelisolatie/kosten/" },
                { label: "Afwerkingen vergelijken", href: "/gevelisolatie/afwerkingen/" },
                { label: "Materialen (EPS, PIR, wol)", href: "/gevelisolatie/materialen/" },
                { label: "Rc-waarde & isolatiedikte", href: "/gevelisolatie/rc-waarde-dikte/" },
                { label: "Subsidie & vergunning", href: "/gevelisolatie/subsidie-vergunning/" },
                { label: "Alles over gevelisolatie", href: "/gevelisolatie/" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ── Reviews ── */}
        <ReviewsSection />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── FAQ ── */}
          <section className="scroll-mt-24 py-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-10 bg-primary" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      FAQ
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Veelgestelde vragen
                    <br />
                    <span className="text-primary">{data.city}</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Specifieke vragen over gevelisolatie in {data.city}? Hieronder vindt u de antwoorden.
                  </p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Staat uw vraag er niet tussen?{" "}
                    <Link href="/contact/" className="font-semibold text-primary hover:underline">
                      Neem contact op
                    </Link>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-3">
                  {data.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                      open={i === 0}
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 text-lg font-bold tabular-nums text-primary/30 group-open:text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-base font-semibold text-foreground">
                            {item.vraag}
                          </span>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                      </summary>
                      <div className="border-t border-border/50 px-6 pb-6 pt-4">
                        <div className="pl-12">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.antwoord}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="rounded-2xl bg-primary p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Gevelisolatie in {data.city}?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              Wij komen gratis bij u langs in {data.city}, beoordelen de gevel en leveren
              binnen 2 werkdagen een heldere offerte per m².
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                Gratis offerte aanvragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+31612079808"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                +31 6 1207 9808
              </a>
            </div>
          </section>

          {/* ── Other locations ── */}
          <section className="mt-12">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Ook actief in
            </p>
            <div className="flex flex-wrap gap-2">
              {locations
                .filter((l) => l.slug !== slug)
                .map((l) => (
                  <Link
                    key={l.slug}
                    href={`/gevelisolatie/${l.slug}/`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {l.city}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />
    </>
  )
}
