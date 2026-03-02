import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  HardHat,
  CheckSquare,
  MapPin,
  FileCheck,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Phone,
  MessageCircle,
  Users,
} from "lucide-react"

import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import TrustStrip from "@/components/trust-strip"

const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

export const metadata = buildPageMetadata("/over-ons/")

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20meer%20weten%20over%20BM%20Klus%20BV.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

const base = SITE.canonicalBase

const heroChecks = [
  "Specialisatie: ETICS + afwerking (stuc, sierpleister, schilderwerk)",
  "Aandacht voor details (plint, dagkanten, profielen)",
  "Heldere communicatie en duidelijke scope",
]

const valueCards = [
  {
    icon: FileCheck,
    title: "Duidelijke offerte",
    body: "U weet exact wat wel en niet is inbegrepen — met duidelijke scope en heldere afspraken.",
  },
  {
    icon: Sparkles,
    title: "Nette detaillering",
    body: "Strakke aansluitingen bij kozijnen, hoeken en plint. Elk detail dat de kwaliteit bepaalt.",
  },
  {
    icon: Layers,
    title: "Kwaliteitsmaterialen",
    body: "Gecertificeerde materialen volgens ETICS-principes. Duurzame afwerking die jarenlang meegaat.",
  },
  {
    icon: ShieldCheck,
    title: "Rust op de werkplek",
    body: "Zorgvuldig afplakken en dagelijks opruimen. Wij respecteren uw woning en omgeving.",
  },
]

const steps = [
  {
    n: "01",
    title: "Opname & inventarisatie",
    icon: ClipboardList,
    body: "Wij beoordelen de ondergrond, de details en uw wensen op locatie, zodat we een volledig beeld hebben van de situatie.",
  },
  {
    n: "02",
    title: "Advies & offerte",
    icon: FileText,
    body: "Op basis van de opname stellen wij een duidelijke offerte op met keuze voor materiaal en afwerking, met duidelijke scope.",
  },
  {
    n: "03",
    title: "Uitvoering",
    icon: HardHat,
    body: "Zorgvuldige opbouw van het systeem met aandacht voor elke detaillering: plint, dagkanten, hoeken en profielen.",
  },
  {
    n: "04",
    title: "Oplevering",
    icon: CheckSquare,
    body: "Na afronding controleren wij alle aansluitingen en de afwerking, zodat het resultaat voldoet aan de afgesproken kwaliteit.",
  },
]

const faqItems = [
  {
    question: "In welke regio werken jullie?",
    answer:
      "Wij zijn actief in de regio Rotterdam en omgeving, met een werkgebied van circa 80–100 km. Dat omvat groot deel van Zuid-Holland en omliggende regio's. Neem contact op als u wilt weten of uw locatie binnen ons werkgebied valt.",
  },
  {
    question: "Doen jullie ook alleen afwerking zonder isolatie?",
    answer:
      "Ja, wij voeren ook afwerking uit op bestaande gevels zonder isolatie. Denk aan stucwerk, sierpleister (spachtelputz), crepi of schilderwerk.",
  },
  {
    question: "Welke afwerkingen zijn mogelijk na ETICS?",
    answer:
      "Na het aanbrengen van het ETICS-systeem zijn verschillende afwerklagen mogelijk: minerale stuc, sierpleister, crepi of steenstrips. De keuze hangt af van uw voorkeur en de situatie van de gevel.",
  },
  {
    question: "Hoe verloopt een offerteaanvraag?",
    answer:
      "U neemt contact met ons op via het contactformulier of telefonisch. Wij plannen een vrijblijvende opname op locatie en stellen een duidelijke offerte op met een heldere scope en prijs per m².",
  },
]

export default function OverOnsPage() {
  const breadcrumbsData = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Over ons", item: `${base}/over-ons/` },
  ])

  const business = localBusinessSchema()

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BM Klus BV",
    url: base,
    logo: `${base}/images/logo-bm-klus.svg`,
    description:
      "Specialist in buitengevelisolatie (ETICS) en gevelafwerking in regio Rotterdam en Zuid-Holland.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rotterdam",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    telephone: "+31612079808",
    email: "info@bm-klus-bv.nl",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.9225, longitude: 4.4792 },
      geoRadius: "100000",
    },
    sameAs: [
      "https://www.instagram.com/bm_klus_bv",
      "https://www.facebook.com/profile.php?id=61556805434705",
      "https://www.linkedin.com/in/boris-mitov-a436902b9",
    ],
  }

  return (
    <>
      {jsonLdScript(breadcrumbsData)}
      {jsonLdScript(business)}
      {jsonLdScript(faqSchema)}
      {jsonLdScript(organizationSchema)}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,108,32,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,108,32,0.04)_0%,transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Over ons", href: "/over-ons/" },
              ].map((item, i, arr) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                  )}
                  {i === arr.length - 1 ? (
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
              ))}
            </ol>
          </nav>

          <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
            <div className="flex max-w-2xl flex-col gap-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#EA6C20]">
                Over ons · Regio Rotterdam
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Vakmanschap in{" "}
                <span className="text-[#EA6C20]">gevelisolatie</span>
                <br />
                <span className="text-white/90">en renovatie</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                BM Klus BV is gespecialiseerd in buitengevelisolatie (ETICS) en
                hoogwaardige gevelafwerking. Wij combineren vakmanschap met
                duidelijke afspraken en een nette oplevering.
              </p>

              <div className="flex flex-col gap-2.5">
                {heroChecks.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#EA6C20]"
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

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
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-7 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#EA6C20]/20 transition-all hover:bg-[#d0540a] hover:shadow-xl hover:shadow-[#EA6C20]/25"
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
      <article className="bg-background pb-16 sm:pb-20 lg:pb-24">
        {/* ── Over BM Klus BV ── */}
        <section className="py-16 sm:py-20 lg:py-24" id="bedrijf">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Het bedrijf
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Over{" "}
                  <span className="text-primary">BM Klus BV</span>
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                  <p>
                    BM Klus BV is een gespecialiseerd bedrijf in
                    buitengevelisolatie en renovatie, actief in de regio
                    Rotterdam en Zuid-Holland. Wij werken met eigen vakkundige
                    medewerkers — geen onderaannemers, één aanspreekpunt per
                    project.
                  </p>
                  <p>
                    Onze focus ligt op de buitenschil van de woning: isoleren,
                    afwerken en beschermen. Of het nu gaat om een compleet
                    ETICS-systeem, stucwerk, sierpleister of schilderwerk — wij
                    leveren kwalitatief werk met oog voor detail.
                  </p>
                  <p>
                    Duidelijke communicatie en transparante offertes staan bij
                    ons centraal. U weet vooraf precies wat er gaat gebeuren, wat
                    het kost en wanneer het klaar is. Geen verrassingen achteraf.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <Users size={18} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">Eigen team</p>
                      <p className="text-xs text-muted-foreground">Geen onderaannemers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <ShieldCheck size={18} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">KVK: 90826167</p>
                      <p className="text-xs text-muted-foreground">VCA* gecertificeerd</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <MapPin size={18} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">±80–100 km</p>
                      <p className="text-xs text-muted-foreground">Werkgebied Rotterdam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Onze kracht (values) ── */}
        <section className="py-16 sm:py-20 lg:py-24" id="waarom">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 lg:mb-12">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Onze kracht
                </span>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Waarom{" "}
                  <span className="text-primary">BM Klus BV</span>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
                  Elk project krijgt de aandacht die het verdient — van eerste
                  opname tot laatste hand.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {valueCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {card.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Kernactiviteiten ── */}
        <section className="py-16 sm:py-20 lg:py-24" id="diensten">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 lg:mb-14">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Kernactiviteiten
                </span>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Waar wij in{" "}
                  <span className="text-primary">uitblinken</span>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
                  Onze focus ligt op de buitenschil van de woning: isoleren,
                  afwerken en beschermen.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card: ETICS */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/etics-isolatie.webp"
                    alt="ETICS buitengevelisolatie — montage isolatieplaten op gevel"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                    Isolatie
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Buitengevelisolatie (ETICS)
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Volledig isolatiesysteem voor de buitengevel: minder
                    warmteverlies, lagere energierekening en een vernieuwde
                    uitstraling.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Isolatieplaten + wapening + afwerklaag",
                      "Advies RC-waarde en dikte isolatie",
                      "Afwerking naar keuze",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/gevelisolatie/"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:underline"
                  >
                    Meer over gevelisolatie
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card: Gevelafwerking */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/gevelafwerking.webp"
                    alt="Gevelafwerking — sierpleister aanbrengen op gevel"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                    Afwerking
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Gevelafwerking
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Na isolatie kiest u de gewenste afwerklaag. Wij werken met
                    diverse systemen afhankelijk van uw voorkeur en de situatie
                    van de gevel.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Stuc",
                      "Sierpleister (spachtelputz)",
                      "Crepi",
                      "Steenstrips",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-primary"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card: Schilderwerk */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/gevel-schilderen.webp"
                    alt="Gevel schilderen — professioneel buitenschilderwerk"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                    Schilderwerk
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Gevel schilderen &amp; details
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Voor bestaande gevels verzorgen wij professioneel
                    schilderwerk en detaillering bij kozijnen, hoeken en
                    dagkanten.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Gevel schilderen",
                      "Afwerking kozijnen & dagkanten",
                      "Gevelbescherming",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-primary"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/gevel-schilderen/"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:underline"
                  >
                    Meer over gevel schilderen
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Onze aanpak (werkwijze) ── */}
        <section className="py-16 sm:py-20 lg:py-24" id="aanpak">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-[#111] px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
              <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-10 bg-primary" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Werkwijze
                    </span>
                  </div>
                  <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Onze <span className="text-primary">aanpak</span>
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-white/70 lg:text-right">
                  Zo houden we het overzichtelijk en weet u vooraf waar u aan toe
                  bent.
                </p>
              </div>

              {/* Desktop: horizontal timeline */}
              <div className="hidden lg:block">
                <div className="relative mb-10 flex items-center">
                  <div className="absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-1/2 h-px bg-white/10" />
                  {steps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <div
                        key={step.n}
                        className="relative flex flex-1 flex-col items-center"
                      >
                        {i > 0 && (
                          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
                        )}
                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                          <Icon size={22} className="text-white" />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {steps.map((step) => (
                    <div key={step.n} className="flex flex-col gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[11px] font-black tracking-[0.2em] text-primary/50 tabular-nums">
                          {step.n}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <h3 className="text-base font-bold tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/70">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: vertical timeline */}
              <div className="flex flex-col gap-0 lg:hidden">
                {steps.map((step, i) => {
                  const Icon = step.icon
                  const isLast = i === steps.length - 1
                  return (
                    <div key={step.n} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                          <Icon size={20} className="text-white" />
                        </div>
                        {!isLast && (
                          <div className="mt-2 w-px flex-1 bg-white/10" />
                        )}
                      </div>
                      <div className="pb-8 pt-1">
                        <span className="text-[11px] font-black tracking-[0.2em] text-primary/50 tabular-nums">
                          {step.n}
                        </span>
                        <h3 className="mt-1 text-base font-bold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="scroll-mt-24 py-16 sm:py-20" id="faq">
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
                    Heeft u vragen over onze werkwijze of diensten? Hier vindt u
                    de antwoorden.
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
                <div className="space-y-3">
                  {faqItems.map((faq, i) => (
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
                            {faq.question}
                          </span>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                      </summary>
                      <div className="border-t border-border/50 px-6 pb-6 pt-4">
                        <div className="pl-12">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />

      {/* ── Quote modal ── */}
      <QuoteModal dienst="geveloplossingen" />
    </>
  )
}
