import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Check,
  MapPin,
  Clock,
  Wrench,
  Layers,
  PaintBucket,
  Brush,
  AlignLeft,
  Home,
  Ruler,
  MoveVertical,
  AlertTriangle,
  Palette,
  Camera,
  Droplets,
  MessageCircle,
  Star,
  ChevronRight,
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
  core,
  kosten,
  offerte,
  verfsoorten,
  voorbereiding,
  techniek,
  onderhoud,
  werkgebied,
  faq as faqData,
  internalLinks,
} from "@/lib/content/gevel-schilderen"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"

const FaqAccordion = dynamic(() =>
  import("./faq-accordion").then((mod) => mod.FaqAccordion),
)
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20gevel%20schilderen.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

/* ── Metadata ── */
export const metadata = buildPageMetadata("/gevel-schilderen/", {
  image: "/images/og-gevel-schilderen.jpg",
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
    name: "Gevel schilderen (buitenmuur verven)",
    description:
      "Gevel schilderen in regio Rotterdam. Silicaatverf (KEIM), siloxaan, acryl. Dampopen systemen, voorbereiding, prijs per m² na gratis opname.",
    url: `${base}/gevel-schilderen/`,
    lowPrice: "25",
    highPrice: "50",
  })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\s?Voor advies op maat: \/contact\//g, ""),
      },
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

function SectionHeading({ plain, accent }: { plain: string; accent: string }) {
  return (
    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
      {plain}{" "}
      <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
        {accent}
      </span>
    </h2>
  )
}

/* ── Page ── */
export default function GevelSchilderenPage() {
  return (
    <>
      <PageJsonLd />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src="/images/gevel-schilderen-hero.webp"
            alt="Vakkundig gevel schilderen — buitenmuur verven in Rotterdam"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/35" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        {/* Gradient fallback (shown when image not loaded) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #1A1A1A 100%)",
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
                Gevel schilderen & buitenmuur verven · Rotterdam
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gevel schilderen{" "}
                <span className="text-[#EA6C20]">(buitenmuur verven)</span>
                <br />
                <span className="text-white/90">vakkundig & beschermd</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                {hero.lead[0]}
              </p>

              {/* Price teaser */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#EA6C20]/15 px-3 py-1.5 text-sm font-bold text-[#EA6C20] ring-1 ring-[#EA6C20]/25">
                  Vanaf €25/m²
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
                  Rotterdam, Den Haag, Delft, Dordrecht en omgeving (±80–100
                  km)
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
              {toc.items.map((item, i) => (
                <a
                  key={item.anchor}
                  href={item.anchor === "#offerte" ? "#offerte-info" : item.anchor}
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

        {/* ── VOORDELEN (core) ── */}
        <section id={core.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Voordelen</SectionTagline>
            <SectionHeading
              plain="Gevel schilderen —"
              accent="wat levert het op?"
            />
            <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm lg:grid lg:grid-cols-[42%_58%]">
              <div className="relative min-h-64 lg:min-h-0">
                <Image
                  src="/images/gevel-schilderen-voordelen.webp"
                  alt="Vakkundig gevel schilderen — bescherming en uitstraling"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/20" />
                <div className="absolute bottom-5 left-5">
                  <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                    Resultaat
                  </span>
                  <p className="mt-2 text-sm font-semibold leading-snug text-white drop-shadow">
                    Fraaie gevel én
                    <br />
                    duurzame bescherming
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 bg-card p-7 sm:p-10">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {core.paragraph}
                </p>
                <div className="grid gap-3 sm:grid-cols-1">
                  {[
                    { icon: Droplets, text: core.bullets[0] },
                    { icon: Palette, text: core.bullets[1] },
                    { icon: Clock, text: core.bullets[2] },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-start gap-3 rounded-xl border border-border px-4 py-3.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="self-center text-sm leading-relaxed text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
                  <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
                  <p className="text-xs italic leading-relaxed text-muted-foreground sm:text-sm">
                    {core.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KOSTEN ── */}
        <section
          id={kosten.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Kosten</SectionTagline>
            <SectionHeading
              plain="Kosten gevel schilderen"
              accent="(prijs per m²)"
            />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {kosten.paragraphs[0]}
            </p>

            {/* Price tier cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Basis",
                  price: "€25–40",
                  desc: "Lichte reiniging, directe verfbaarheid — geen herstelwerk vereist.",
                  highlight: false,
                },
                {
                  label: "Standaard",
                  price: "€30–50",
                  desc: "Reiniging + primer/voorstrijk — de meest gevraagde situatie.",
                  highlight: true,
                },
                {
                  label: "Intensief",
                  price: "Op aanvraag",
                  desc: "Herstel van voegwerk of scheuren + volledige voorbereiding.",
                  highlight: false,
                },
              ].map(({ label, price, desc, highlight }) => (
                <div
                  key={label}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md ${
                    highlight
                      ? "border-2 border-primary shadow-sm"
                      : "border-border"
                  }`}
                >
                  {highlight && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Meest gekozen
                    </span>
                  )}
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${highlight ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-foreground">
                    {price}
                    {price !== "Op aanvraag" && (
                      <span className="ml-1 text-sm font-semibold text-muted-foreground">
                        /m²
                      </span>
                    )}
                  </p>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 whitespace-pre-line text-xs text-muted-foreground">
              {kosten.table.note}
            </p>

            {/* Price factors */}
            <div className="mt-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-10 bg-primary/30" />
                <p className="text-sm font-semibold text-foreground">
                  {kosten.priceFactors.label}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Layers,
                    text: "Bereikbaarheid (begane grond, steiger of hoogwerker)",
                  },
                  {
                    icon: Droplets,
                    text: "Mate en methode van reiniging (softwash, stoomreiniging)",
                  },
                  {
                    icon: Wrench,
                    text: "Herstel van scheuren, losse voegen of beschadigingen",
                  },
                  {
                    icon: PaintBucket,
                    text: "Primer, voorstrijk of fixeermiddel (type en hoeveelheid)",
                  },
                  {
                    icon: AlignLeft,
                    text: "Afplakken van kozijnen, plinten en aangrenzende vlakken",
                  },
                  {
                    icon: Brush,
                    text: "Gekozen verfsoort (silicaat, siloxaan of acryl)",
                  },
                  { icon: Clock, text: "Aantal verflagen dat benodigd is" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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
        </section>

        {/* ── OFFERTE INFO ── */}
        <section
          id="offerte-info"
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Offerte</SectionTagline>
            <SectionHeading plain="Offerte voor" accent="gevel schilderen" />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-stretch">
              {/* Left — intro + icon grid + CTA band */}
              <div className="flex flex-col gap-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {offerte.paragraph}
                </p>

                {/* "Wat hebben wij nodig?" */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-10 bg-primary/30" />
                    <p className="text-sm font-semibold text-foreground">
                      Wat hebben wij nodig?
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        {
                          icon: Home,
                          label: "Type gevel",
                          desc: "Baksteen, pleister/stuc of beton",
                        },
                        {
                          icon: Ruler,
                          label: "Oppervlak",
                          desc: "Indicatie van het te schilderen m²",
                        },
                        {
                          icon: MoveVertical,
                          label: "Hoogte & toegang",
                          desc: "Begane grond, 1e verdieping, steiger?",
                        },
                        {
                          icon: AlertTriangle,
                          label: "Staat van de gevel",
                          desc: "Afbladderen, scheuren, loszittend?",
                        },
                        {
                          icon: Palette,
                          label: "Gewenste kleur",
                          desc: "Kleur of kleurrichting",
                        },
                        {
                          icon: Camera,
                          label: "Foto's (optioneel)",
                          desc: "Versnelt onze beoordeling aanzienlijk",
                        },
                      ] as const
                    ).map(({ icon: Icon, label, desc }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {label}
                          </p>
                          <p className="text-xs leading-snug text-muted-foreground">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA band */}
                <div className="mt-auto overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="border-b border-border bg-secondary/40 px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Vrijblijvend
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {[
                        "Snelle reactie tijdens openingstijden",
                        "Opname ter plaatse",
                        "Duidelijke offerte met scope",
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-2">
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check
                              className="h-2.5 w-2.5 text-primary"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <a
                        href="#offerte"
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                      >
                        Offerte aanvragen
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — image */}
              <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border shadow-sm">
                <Image
                  src="/images/offerte-berekening.webp"
                  alt="Gevel schilderen offerte — berekening en planning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    Transparant
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug text-white">
                    Heldere offerte zonder verrassingen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VERFSOORTEN ── */}
        <section
          id={verfsoorten.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Verfsoorten</SectionTagline>
            <SectionHeading
              plain="Silicaat (KEIM) of"
              accent="siloxaan — welke verf?"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[280px_1fr]">
              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/verfsoorten-silicaat-siloxaan.webp"
                  alt="Silicaatverf en siloxaanverf voor gevels"
                  width={280}
                  height={360}
                  className="h-52 w-full object-cover lg:h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    Systeemkeuze
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug text-white">
                    Passend bij uw ondergrond
                  </p>
                </div>
              </div>

              {/* Two comparison cards */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-card">
                  <div className="border-b border-primary/15 bg-primary/5 px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Mineraal · Dampopen
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-foreground">
                      {verfsoorten.subsections[0].h3.split("—")[0].trim()}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {verfsoorten.subsections[0].body}
                    </p>
                    <ul className="space-y-2">
                      {verfsoorten.subsections[0].bullets?.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check
                              className="h-3 w-3 text-primary"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-xs leading-snug text-foreground/70 sm:text-sm">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="border-b border-border bg-muted/50 px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Waterafstotend · Flexibel
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-foreground">
                      {verfsoorten.subsections[1].h3.split("—")[0].trim()}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {verfsoorten.subsections[1].body}
                    </p>
                    <ul className="space-y-2">
                      {verfsoorten.subsections[1].bullets?.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-border">
                            <Check
                              className="h-3 w-3 text-muted-foreground"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-xs leading-snug text-foreground/70 sm:text-sm">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Third subsection */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid sm:grid-cols-[4px_1fr]">
                <div className="hidden bg-primary/30 sm:block" />
                <div className="px-6 py-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Begrippen uitgelegd
                  </p>
                  <h3 className="mt-1 text-base font-bold text-foreground">
                    {verfsoorten.subsections[2].h3}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {verfsoorten.subsections[2].body}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                {verfsoorten.caution}
              </p>
            </div>
          </div>
        </section>

        {/* ── VOORBEREIDING ── */}
        <section
          id={voorbereiding.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Voorbereiding</SectionTagline>
            <SectionHeading
              plain="Voorbereiding en primer:"
              accent="zo blijft het lang mooi"
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-stretch lg:gap-12">
              {/* Numbered steps */}
              <ol className="flex flex-col gap-4">
                {voorbereiding.cards.map((card, i) => (
                  <li
                    key={card.title}
                    className="flex gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <span className="mt-0.5 shrink-0 text-xl font-black tabular-nums leading-none text-primary/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {card.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {card.body}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {card.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 h-3 w-3 shrink-0 text-primary"
                              strokeWidth={3}
                            />
                            <span className="text-xs text-muted-foreground">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div className="relative min-h-56 flex-1 overflow-hidden rounded-2xl border border-border shadow-sm">
                  <Image
                    src="/images/gevel-voorbereiding.webp"
                    alt="Voorbereiding gevel schilderen — reiniging en herstel"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      Vakmanschap
                    </p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug text-white">
                      Goede voorbereiding is het halve werk
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
                  <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
                  <p className="text-xs italic leading-relaxed text-muted-foreground">
                    Wij slaan nooit voorbereidingsstappen over — een degelijke
                    basis vormt het fundament voor een duurzaam eindresultaat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNIEK ── */}
        <section
          id={techniek.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Techniek</SectionTagline>
            <SectionHeading
              plain="Baksteen, pleister"
              accent="en beton: aanpak per ondergrond"
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                {
                  sub: techniek.subsections[0],
                  tag: "Dampopen systeem vereist",
                  img: "/images/ondergrond-baksteen.webp",
                  imgAlt: "Baksteen gevel textuur close-up",
                },
                {
                  sub: techniek.subsections[1],
                  tag: "Haarscheuren fixeren",
                  img: "/images/ondergrond-pleister.webp",
                  imgAlt: "Pleister stucwerk gevel textuur close-up",
                },
                {
                  sub: techniek.subsections[2],
                  tag: "Alkalische primer nodig",
                  img: "/images/ondergrond-beton.jpg",
                  imgAlt: "Betonnen gevel textuur close-up",
                },
              ].map(({ sub, tag, img, imgAlt }) => (
                <div
                  key={sub.h3}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={img}
                      alt={imgAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-base font-bold leading-snug text-foreground">
                      {sub.h3}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {sub.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Weather band */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid sm:grid-cols-[auto_1fr]">
                <div className="flex items-center justify-center border-b border-border bg-muted/60 px-6 py-5 sm:border-b-0 sm:border-r sm:px-8">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="h-10 w-10 text-primary/60"
                      aria-hidden
                    >
                      <circle
                        cx="24"
                        cy="20"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity=".08"
                      />
                      <path
                        d="M24 4v4M24 32v4M8 20H4M44 20h-4M12.7 8.7l-2.8-2.8M38.1 34.1l-2.8-2.8M12.7 31.3l-2.8 2.8M38.1 5.9l-2.8 2.8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {techniek.weather.label}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {["Geen regen", "RV niet te hoog", "5°C – 30°C"].map(
                      (cond) => (
                        <span
                          key={cond}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          {cond}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {techniek.weather.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ONDERHOUD ── */}
        <section
          id={onderhoud.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Onderhoud</SectionTagline>
            <SectionHeading plain="Onderhoud &" accent="levensduur" />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {onderhoud.paragraph}
            </p>

            <div className="mt-10 grid gap-5 lg:grid-cols-[300px_1fr] lg:items-stretch">
              {/* Lifespan card */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border bg-secondary/40 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Verwachte levensduur
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    Per verfsysteem
                  </p>
                </div>
                <div className="flex-1 divide-y divide-border">
                  {[
                    {
                      label: "Silicaatverf (KEIM)",
                      years: "15–25",
                      pct: 90,
                      note: "Mineraal, UV-bestendig",
                    },
                    {
                      label: "Siloxaanverf",
                      years: "10–15",
                      pct: 65,
                      note: "Waterafstotend, flexibel",
                    },
                    {
                      label: "Acrylverf",
                      years: "7–12",
                      pct: 48,
                      note: "Breed inzetbaar",
                    },
                  ].map(({ label, years, pct, note }) => (
                    <div key={label} className="px-5 py-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {label}
                        </p>
                        <p className="shrink-0 text-base font-black text-primary">
                          {years}
                          <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                            {" "}
                            jr
                          </span>
                        </p>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {note}
                      </p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary/60"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-secondary/30 px-5 py-3">
                  <p className="text-[10px] italic text-muted-foreground">
                    Afhankelijk van ligging, onderhoud en ondergrond.
                  </p>
                </div>
              </div>

              {/* Maintenance tips card */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border bg-secondary/40 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Onderhoudstips
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    Zo houdt u de verf lang mooi
                  </p>
                </div>
                <div className="flex-1 divide-y divide-border">
                  {[
                    { icon: Brush, tip: onderhoud.bullets[0] },
                    { icon: Wrench, tip: onderhoud.bullets[1] },
                    { icon: Layers, tip: onderhoud.bullets[2] },
                    { icon: AlignLeft, tip: onderhoud.bullets[3] },
                    { icon: Clock, tip: onderhoud.bullets[4] },
                  ].map(({ icon: Icon, tip }, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/30"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="self-center text-sm leading-snug text-muted-foreground">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro tip */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5">
              <div className="grid sm:grid-cols-[auto_1fr]">
                <div className="flex items-center justify-center bg-primary/10 px-5 py-5 sm:px-6">
                  <div className="text-center">
                    <Palette className="mx-auto h-6 w-6 text-primary" />
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      Pro tip
                    </p>
                  </div>
                </div>
                <div className="px-5 py-5">
                  <p className="text-sm font-semibold text-foreground">
                    Kleurkeuze & UV-verwering
                  </p>
                  <p className="mt-1.5 text-sm italic leading-relaxed text-muted-foreground">
                    {onderhoud.colorNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAAROM BM KLUS ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV verzorgt professioneel gevel schilderen en buitenschilderwerk voor woningen in de regio Rotterdam en omgeving." />

        {/* ── WERKGEBIED ── */}
        <section
          id={werkgebied.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
              <svg
                viewBox="0 0 340 400"
                fill="none"
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-[300px] w-auto opacity-[0.06]"
              >
                <path
                  d="M170 20 C190 22 210 18 228 28 C246 38 260 55 268 72 C278 92 275 115 272 136 C269 157 260 175 258 196 C256 217 262 238 255 257 C248 276 232 290 218 306 C204 322 192 340 175 352 C158 364 138 370 120 362 C102 354 90 336 78 320 C66 304 54 288 48 270 C42 252 44 232 42 212 C40 192 34 172 36 152 C38 132 48 114 58 96 C68 78 80 62 96 50 C112 38 132 24 150 20 C156 19 163 19 170 20Z"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  fill="#1A1A1A"
                />
                <circle cx="175" cy="185" r="10" fill="#E8600A" opacity="0.8" />
                <circle
                  cx="175"
                  cy="185"
                  r="22"
                  stroke="#E8600A"
                  strokeWidth="1.5"
                  opacity="0.35"
                />
                <circle
                  cx="175"
                  cy="185"
                  r="36"
                  stroke="#E8600A"
                  strokeWidth="1"
                  opacity="0.18"
                />
              </svg>
              <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/50" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Werkgebied
                  </p>
                </div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Wij werken in{" "}
                  <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                    regio Rotterdam
                  </span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {werkgebied.geoSentence}
                </p>
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Steden & gemeenten
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {werkgebied.cityChips.map((city, i) => (
                      <span
                        key={city}
                        className={
                          i === 0
                            ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white"
                            : "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                        }
                      >
                        {i === 0 && (
                          <svg
                            viewBox="0 0 8 8"
                            className="h-2 w-2 fill-white"
                            aria-hidden
                          >
                            <circle cx="4" cy="4" r="4" />
                          </svg>
                        )}
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="my-8 h-px bg-border" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {werkgebied.outsideNote}
                  </p>
                  <a
                    href="#offerte"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                  >
                    Offerte aanvragen
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <section
          id={faqData.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <SectionTagline>FAQ</SectionTagline>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Veelgestelde
                    <br />
                    <span className="text-primary">vragen</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Alles wat u wilt weten over gevel schilderen — van kosten en
                    verfkeuze tot voorbereiding en onderhoud.
                  </p>
                  <p className="mt-6 text-sm text-muted-foreground">
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
                <FaqAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS ── */}
        <div className="border-t border-border bg-muted/30 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {"Gerelateerde pagina's"}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />

      {/* ── Quote modal ── */}
      <QuoteModal dienst="gevel-schilderen" />
    </>
  )
}
