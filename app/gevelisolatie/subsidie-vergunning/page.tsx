import Link from "next/link"
import dynamic from "next/dynamic"
import ResponsiveImage from "@/components/responsive-image"
import {
  FileCheck,
  Euro,
  Check,
  ArrowRight,
  ChevronRight,
  Phone,
  ClipboardList,
  ShieldAlert,
  MapPin,
  Calendar,
  FileText,
  Home,
  CheckCircle2,
  Star,
  MessageCircle,
} from "lucide-react"

import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import TrustStrip from "@/components/trust-strip"
import FaqAccordion from "@/components/page/FaqAccordion"
import GoogleRatingBadge from "@/components/google-rating-badge"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StappenplanTimeline = dynamic(
  () => import("@/components/sections/gevelisolatie/stappenplan-timeline"),
)
const ChecklistInteractive = dynamic(
  () => import("@/components/sections/gevelisolatie/checklist-interactive"),
)

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — all copy lives here so the file stays readable
───────────────────────────────────────────────────────────────────────────── */

/* ── Metadata ── */
const base = SITE.canonicalBase

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20advies%20over%20subsidie%20en%20vergunning%20gevelisolatie."

const heroBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Subsidie & vergunning", href: "/gevelisolatie/subsidie-vergunning/" },
]

const tocItems = [
  { id: "vergunning-nodig", label: "Wanneer vergunning nodig?" },
  { id: "subsidie-hoofdlijnen", label: "Subsidie op hoofdlijnen" },
  { id: "stappenplan", label: "Stappenplan" },
  { id: "checklist", label: "Checklist" },
  { id: "faq", label: "Veelgestelde vragen" },
]

/* ── Stappenplan ── */
const stappen = [
  {
    num: "01",
    titel: "Gratis opname op locatie",
    tekst:
      "Wij komen ter plaatse om de gevel op te nemen en te beoordelen of een vergunning nodig is. Tegelijkertijd inventariseren we welke subsidiemogelijkheden van toepassing kunnen zijn.",
  },
  {
    num: "02",
    titel: "Vergunningscheck bij gemeente",
    tekst:
      "Wij controleren voor uw situatie bij de gemeente of een omgevingsvergunning vereist is. Speelt er een beschermd stadsgezicht of monument? Dan informeren we u over de procedure.",
  },
  {
    num: "03",
    titel: "Subsidiecheck & documentatie",
    tekst:
      "We beoordelen of uw woning en situatie in aanmerking kunnen komen voor ISDE of een andere regeling (check altijd de actuele voorwaarden bij RVO). We adviseren welke documentatie nodig is: facturen, foto's, RC-berekening.",
  },
  {
    num: "04",
    titel: "Vergunningsaanvraag (indien nodig)",
    tekst:
      "Indien vereist helpen wij u bij het indienen van de omgevingsvergunning. We leveren de benodigde tekeningen en omschrijvingen van de beoogde gevelwijziging aan.",
  },
  {
    num: "05",
    titel: "Uitvoering & vastlegging",
    tekst:
      "Tijdens de uitvoering maken we de foto's en houden we de benodigde administratie bij voor de subsidieaanvraag — inclusief materiaalspecificaties en bereikte RC-waarde.",
  },
  {
    num: "06",
    titel: "Subsidieaanvraag indienen",
    tekst:
      "Na afronding helpen we u bij het samenstellen van de subsidiedossier. De aanvraag zelf dient u (of een gemachtigde) in bij RVO. Wij leveren alle benodigde informatie.",
  },
]

/* ── Checklist items ── */
const checklistItems = [
  {
    iconName: "ShieldAlert",
    label: "Beschermd stadsgezicht of monument",
    tekst:
      "Controleer of uw woning in een beschermd stads- of dorpsgezicht staat, of een monumentenstatus heeft. In beide gevallen gelden strengere regels en is een vergunningcheck altijd verstandig. Vaak is een omgevingsvergunning nodig.",
  },
  {
    iconName: "Home",
    label: "Voorgevel of zicht vanaf de straat",
    tekst:
      "Gaat het om de voorgevel of een zijgevel die zichtbaar is vanaf openbaar toegankelijk gebied? Dan gelden vaak strengere welstandseisen voor afwerking, kleur en structuur. Controleer het omgevingsplan en de welstandsnota van uw gemeente.",
  },
  {
    iconName: "MapPin",
    label: "Erfgrens en extra geveldikte",
    tekst:
      "Buitengevelisolatie kan de gevel circa 10–20 cm dikker maken. Controleer uw erfgrens en de beschikbare ruimte langs de gevel — met name bij smalle stegen, trottoirs of perceelgrenzen.",
  },
  {
    iconName: "FileText",
    label: "Meldcode en productgegevens",
    tekst:
      "Elk isolatiemateriaal dat in aanmerking komt voor ISDE heeft een meldcode uit de RVO-productenlijst. Vraag uw uitvoerder om de meldcode, productnaam, m² en Rd-waarde vóór de uitvoering te bevestigen.",
  },
  {
    iconName: "Calendar",
    label: "Planning en volgorde",
    tekst:
      "Is een vergunning nodig? Vraag die aan vóór de start (beslistermijn doorgaans 8 weken). ISDE-subsidie voor woningeigenaren vraagt u pas aan ná uitvoering, binnen 24 maanden via rvo.nl.",
  },
  {
    iconName: "ClipboardList",
    label: "Documentatie bewaren",
    tekst:
      "Bewaar vanaf het begin: de factuur (met m², productnaam, Rd-waarde en meldcode), het betaalbewijs, en duidelijke foto's van de woning en de uitgevoerde werkzaamheden.",
  },
]

/* ── FAQ ── */
const faqItems = [
  {
    vraag: "Wanneer heb ik een vergunning nodig voor buitengevelisolatie?",
    antwoord:
      "Dat hangt af van de gemeente en in hoeverre het gevelbeeld zichtbaar verandert. Bij woningen in een beschermd stadsgezicht of bij monumenten is een omgevingsvergunning nagenoeg altijd vereist. In andere situaties kan het afhangen van de welstandsnota. Wij voeren vooraf een vergunningscheck uit.",
  },
  {
    vraag: "Waar kan ik controleren of mijn pand in een beschermd stadsgezicht staat?",
    antwoord:
      "U kunt dit opzoeken via het Omgevingsloket (omgevingsloket.nl) of de kaarten van de Rijksdienst voor het Cultureel Erfgoed (RCE). Uw gemeente kan u hier ook over informeren. Wij doen dit standaard tijdens de opname.",
  },
  {
    vraag: "Welke documenten moet ik bewaren voor een subsidieaanvraag?",
    antwoord:
      "Minimaal: de factuur van de uitgevoerde werkzaamheden, de technische omschrijving met materiaalspecificaties (inclusief lambda-waarde en Rd-waarde), foto's van de uitvoering, en de RVO-meldcode van het gebruikte isolatiemateriaal. De subsidie wordt aangevraagd ná uitvoering, binnen 24 maanden. Raadpleeg altijd de actuele documentatievereisten bij RVO.",
  },
  {
    vraag: "Kan ik subsidie aanvragen als ik slechts één gevel isoleer?",
    antwoord:
      "In veel gevallen kan dat. De voorwaarden voor ISDE stellen een minimaal isolatieoppervlak van 10 m² en een minimale Rd-waarde van 3,5 m²K/W. Of één gevel voldoende is, hangt af van de oppervlakte. Houd er rekening mee dat bij één enkele maatregel het subsidiebedrag lager kan zijn dan bij twee of meer maatregelen binnen 24 maanden. Check de actuele voorwaarden bij RVO of vraag ons om advies.",
  },
  {
    vraag: "Wanneer moet ik de subsidie aanvragen: voor of na de uitvoering?",
    antwoord:
      "Bij ISDE dient u de aanvraag in ná uitvoering, binnen 24 maanden na afronding van de werkzaamheden. Controleer vóór de start of u aan de voorwaarden kunt voldoen en of een vergunning nodig is — de ISDE-aanvraag zelf doet u pas na uitvoering. Check altijd de actuele aanvraagprocedure bij RVO, want deze kan per regeling en jaar wijzigen.",
  },
  {
    vraag: "Hoe lang duurt een vergunningsprocedure?",
    antwoord:
      "Een standaard omgevingsvergunning (reguliere procedure) kent doorgaans een beslistermijn van 8 weken, met mogelijkheid tot verlenging. Check altijd de actuele procedure bij uw gemeente. Wij adviseren om dit ruim voor de gewenste startdatum aan te vragen.",
  },
  {
    vraag: "Helpen jullie ook bij de subsidieaanvraag zelf?",
    antwoord:
      "Wij ondersteunen u bij het verzamelen van de benodigde documenten en informatie. De formele indiening bij RVO doet u zelf of via een energieadviesbureau. Wij leveren altijd de technische specificaties die u nodig heeft.",
  },
  {
    vraag: "Geeft BM klus BV garantie dat ik subsidie ontvang?",
    antwoord:
      "Nee — het toekennen van subsidie is de verantwoordelijkheid van RVO en de betrokken overheden. Wij geven geen juridische of financiële garanties. Wij helpen u zo goed mogelijk om aan de technische en documentaire voorwaarden te voldoen: correcte factuur met m², dikte en Rd-waarde, meldcode, foto-documentatie en betaalbewijs.",
  },
]

/* ── Related links ── */
const relatedLinks = [
  {
    label: "Gevelisolatie (pillar)",
    href: "/gevelisolatie/",
    description: "Alles over ETICS, werkwijze en afwerkingen",
  },
  {
    label: "Kosten per m²",
    href: "/gevelisolatie/kosten/",
    description: "Richtprijzen en kostenfactoren op een rij",
  },
  {
    label: "Materialen",
    href: "/gevelisolatie/materialen/",
    description: "EPS, PIR of minerale wol — wat kiest u?",
  },
  {
    label: "Afwerkingen",
    href: "/gevelisolatie/afwerkingen/",
    description: "Stuc, sierpleister, crepi of steenstrips",
  },
  {
    label: "RC-waarde & dikte",
    href: "/gevelisolatie/rc-waarde-dikte/",
    description: "Welke isolatiewaarde heeft u nodig?",
  },
  {
    label: "Onze werken",
    href: "/onze-werken/",
    description: "Uitgevoerde gevelisolatie- en afwerkingsprojecten in de regio.",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function SubsidieVergunningPage() {
  const breadcrumbsSchema = breadcrumbSchema(
    heroBreadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )
  const business = localBusinessSchema()
  const service = serviceSchema({
    name: "Subsidie & vergunning gevelisolatie",
    description:
      "ISDE-subsidie en vergunningen bij buitengevelisolatie: voorwaarden, stappenplan en checklist.",
    url: `${base}/gevelisolatie/subsidie-vergunning/`,
  })
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  }

  return (
    <>
      {jsonLdScript(breadcrumbsSchema)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {jsonLdScript(faqSchema)}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <ResponsiveImage
            baseName="subsidie-vergunning-hero"
            preset="hero"
            alt="Woning met afgewerkte buitengevelisolatie — subsidie en vergunning"
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="absolute inset-0 h-full w-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/35" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {heroBreadcrumbs.map((item, i, arr) => (
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

          <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
            <div className="flex max-w-2xl flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Subsidie & vergunning
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Subsidie en vergunning voor{" "}
                <span className="text-primary">buitengevelisolatie</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Buitengevelisolatie kan in aanmerking komen voor ISDE-subsidie. Soms is een
                omgevingsvergunning nodig. Wij checken dit vooraf — gratis en vrijblijvend.
              </p>

              <div className="inline-flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs leading-relaxed text-white/60">
                  Informatie op hoofdlijnen — raadpleeg altijd uw gemeente en{" "}
                  <span className="font-medium text-white/80">rvo.nl</span> voor actuele voorwaarden.
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Gratis vergunningscheck", "Advies over subsidie", "Hulp bij documentatie"].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                <span>Rotterdam &amp; omgeving · Zuid-Holland</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#offerte" className="btn-hero">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-white/70"><GoogleRatingBadge format="short" /></span>
                </div>
                <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
                <a href="tel:+31612079808" className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white">
                  <Phone className="h-3 w-3" />
                  +31 6 12 07 98 08
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">

          {/* ── Table of Contents ─────────────────────────────────────────── */}
          <nav aria-label="Inhoudsopgave" className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Inhoud
              </span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {tocItems.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3.5 shadow-sm py-1.5 transition-all hover:border-primary/40 hover:shadow-md"
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

          {/* ── Section 1: Vergunning ────────────────────────────────────── */}
          <section
            id="vergunning-nodig"
            aria-labelledby="h2-vergunning"
            className="mt-16 scroll-mt-24"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Vergunning
              </span>
            </div>
            <h2
              id="h2-vergunning"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Wanneer heeft u een{" "}
              <span className="text-primary">vergunning nodig?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Buitengevelisolatie verandert het uiterlijk van uw gevel. Of u een vergunning nodig
              heeft, hangt af van het lokale omgevingsplan, monumentenstatus en de mate van de
              gevelwijziging.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-6">
                {/* WEL vergunning */}
                <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                  <div className="h-[3px] bg-linear-to-r from-amber-500/70 via-amber-500/25 to-transparent" />
                  <div className="p-6 sm:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
                        <ShieldAlert className="h-5 w-5 text-amber-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Vergunning vaak wél nodig</p>
                        <p className="text-[11px] text-muted-foreground">Let op bij deze situaties</p>
                      </div>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Beschermd stadsgezicht of rijks-/gemeentelijk monument",
                        "Welstandsgebied met strikte eisen aan geveluiterlijk",
                        "Overschrijding van de erfgrens door de extra dikte",
                        "Wijziging van de voorgevel in het straatgericht zichtbaar",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
                            <ShieldAlert className="h-2.5 w-2.5 text-amber-600" />
                          </div>
                          <span className="text-sm leading-snug text-foreground/75">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* NIET vergunning */}
                <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                  <div className="h-[3px] bg-linear-to-r from-green-500/70 via-green-500/25 to-transparent" />
                  <div className="p-6 sm:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20">
                        <CheckCircle2 className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Vergunning soms niet nodig</p>
                        <p className="text-[11px] text-muted-foreground">Vergunningsvrij onder deze voorwaarden</p>
                      </div>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Woning buiten beschermd stads- of dorpsgezicht",
                        "Gevelwijziging blijft binnen de erfrooilijn",
                        "Afwerking past binnen de bestaande welstandscriteria",
                        "Geen monument of cultureel erfgoed",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
                            <Check className="h-2.5 w-2.5 text-green-600" strokeWidth={3} />
                          </div>
                          <span className="text-sm leading-snug text-foreground/75">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 rounded-xl border border-border/30 bg-secondary/15 px-5 py-4">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={1.5} />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="font-semibold text-foreground">Belangrijk:</strong> Controleer
                    altijd bij uw gemeente. Wij voeren deze check standaard uit tijdens de gratis
                    opname, maar de uiteindelijke beoordeling ligt bij de gemeente.
                  </p>
                </div>
              </div>

              {/* Image card */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/80">
                <ResponsiveImage
                  baseName="subsidie-vergunning"
                  dir="/images"
                  preset="serviceCard"
                  alt="Controleren van vergunningsvereisten voor gevelisolatie"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 backdrop-blur-md">
                    <FileCheck className="h-3 w-3 text-white drop-shadow-sm" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">
                      Gratis service
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug text-white">
                    Wij controleren vooraf of een vergunning nodig is — zonder extra kosten.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>{/* end below-fold: TOC + Vergunning */}

      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Section 2: Subsidie ──────────────────────────────────────── */}
          <section
            id="subsidie-hoofdlijnen"
            aria-labelledby="h2-subsidie"
            className="pt-20 scroll-mt-24"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Subsidie
              </span>
            </div>
            <h2
              id="h2-subsidie"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Subsidie op{" "}
              <span className="text-primary">hoofdlijnen</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Er bestaan meerdere regelingen voor woningisolatie. De bekendste voor
              buitengevelisolatie is de{" "}
              <strong className="font-semibold text-foreground">ISDE (Investeringssubsidie
              Duurzame Energie en Energiebesparing)</strong>. Hieronder vindt u de voorwaarden op
              hoofdlijnen — raadpleeg altijd{" "}
              <strong className="font-semibold text-foreground">rvo.nl</strong> voor actuele
              bedragen en exacte eisen.
            </p>

            {/* Two info cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {/* ISDE card */}
              <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                <div className="h-[3px] bg-linear-to-r from-green-500/70 via-green-500/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20">
                      <Euro className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">ISDE-subsidie</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">
                        Isolatie woning
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    De ISDE is een rijkssubsidie voor eigenaar-bewoners die hun woning verduurzamen.
                    Gevelisolatie aan de buitenkant valt hieronder als aan de minimale
                    isolatiewaarde wordt voldaan. Controleer altijd de actuele voorwaarden
                    op rvo.nl.
                  </p>

                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Voorwaarden op hoofdlijnen
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Minimale Rd-waarde van het isolatiemateriaal: 3,5 m²K/W",
                      "Minimaal 10 m² te isoleren geveloppervlak (max. 170 m²)",
                      "Bestaande woning met bouwjaar vóór 1 januari 2019 (of omgevingsvergunning aangevraagd vóór 1 juli 2018)",
                      "Aanvrager is eigenaar-bewoner van de woning",
                      "Aanvraag indienen ná uitvoering, binnen 24 maanden",
                      "Bewijsdocumenten: factuur, betaalbewijs, meldcode, foto's",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
                          <Check className="h-2.5 w-2.5 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/75">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Wat wij regelen card */}
              <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10">
                      <FileCheck className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">Wat wij regelen</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Gratis service
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    BM klus BV ondersteunt u bij elke stap waar wij een bijdrage kunnen leveren.
                    Zo hoeft u niet zelf alles uit te zoeken.
                  </p>

                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Onze ondersteuning
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Vergunningscheck bij gemeente tijdens opname",
                      "Advies over toepasselijke subsidieregeling(en)",
                      "Leveren van technische specificaties en RC-berekening",
                      "Foto-documentatie tijdens uitvoering",
                      "Assistentie bij samenstellen subsidiedossier",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
                          <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/75">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Voor wie? */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/40 bg-card/80">
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className="p-6 sm:p-8">
                <h3 className="text-base font-bold text-foreground">Voor wie is ISDE-subsidie bedoeld?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  De ISDE richt zich op eigenaar-bewoners. Bent u geen eigenaar-bewoner? Dan gelden andere regelingen:
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Eigenaar-bewoner",
                      badge: "ISDE",
                      badgeCls: "bg-green-500/10 text-green-600 ring-1 ring-green-500/20",
                      tekst: "U woont zelf in uw woning en bent eigenaar. U kunt rechtstreeks ISDE-subsidie aanvragen via rvo.nl.",
                    },
                    {
                      label: "VvE",
                      badge: "Apart",
                      badgeCls: "bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20",
                      tekst: "Verenigingen van Eigenaren hebben een aparte aanvraagprocedure. Raadpleeg rvo.nl voor de actuele VvE-regeling.",
                    },
                    {
                      label: "Verhuurder",
                      badge: "SVOH",
                      badgeCls: "bg-purple-500/10 text-purple-600 ring-1 ring-purple-500/20",
                      tekst: "Particuliere verhuurders kunnen terecht bij de Subsidieregeling Verduurzaming en Onderhoud Huurwoningen (SVOH).",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2.5 rounded-xl border border-border/30 bg-background/60 p-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{item.label}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${item.badgeCls}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.tekst}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual break — result photo */}
            <div className="group relative mt-6 overflow-hidden rounded-2xl">
              <ResponsiveImage
                baseName="subsidie-resultaat-gevel"
                preset="serviceCard"
                alt="Woning met afgewerkte buitengevelisolatie — resultaat na ETICS"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="h-48 w-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105 sm:h-[22rem] sm:object-[center_90%] lg:h-96 lg:object-[center_90%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 backdrop-blur-md">
                  <Check className="h-3 w-3 text-white drop-shadow-sm" strokeWidth={3} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">
                    Resultaat
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug text-white">
                  Buitengevelisolatie met stucwerk afwerking — woning verduurzaamd en klaar voor subsidieaanvraag.
                </p>
              </div>
            </div>

            {/* Twee maatregelen + Uitsluitingen */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Twee maatregelen */}
              <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                <div className="h-[3px] bg-linear-to-r from-green-500/70 via-green-500/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20">
                    <Euro className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Twee maatregelen? Dubbel subsidiebedrag</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Voert u binnen 24 maanden meer dan één isolatiemaatregel uit (bijvoorbeeld gevel + dak of vloer)?
                    Dan verdubbelt het subsidiebedrag per m² voor de isolatiemaatregelen. Combineren met een warmtepomp
                    of zonneboiler telt ook mee. Controleer de actuele voorwaarden op rvo.nl.
                  </p>
                </div>
              </div>

              {/* Uitsluitingen */}
              <div className="group overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:shadow-md">
                <div className="h-[3px] bg-linear-to-r from-red-500/70 via-red-500/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 ring-1 ring-red-500/20">
                    <ShieldAlert className="h-5 w-5 text-red-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Waar geldt de subsidie niet voor?</h3>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Aanbouw, nieuwe verdieping of dakkapel",
                      "Nieuw bijgebouw of garage",
                      "Binnenwanden of scheidingsmuren",
                      "Woningen met bouwjaar ná 1 januari 2019",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20">
                          <span className="text-[10px] font-bold text-red-500">✕</span>
                        </div>
                        <span className="text-sm leading-snug text-foreground/75">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Documenten checklist */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/40 bg-card/80">
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className="p-6 sm:p-8">
                <h3 className="text-base font-bold text-foreground">Welke documenten heeft u nodig?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Voor een complete subsidieaanvraag bij RVO heeft u de volgende documenten nodig. Wij leveren de technische onderdelen.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Factuur met: m², dikte, Rd-waarde, type isolatiemateriaal en uitvoerder",
                    "Betaalbewijs (bankafschrift of screenshot van overboeking)",
                    "Meldcode van het isolatiemateriaal (uit de RVO-productenlijst)",
                    "Foto's van de uitvoering (adres herkenbaar, materiaal zichtbaar)",
                    "Gegevens van de uitvoerder (naam, KvK-nummer)",
                    "Eventueel: RC-berekening bij afwijkende opbouw",
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-3 rounded-xl border border-border/30 bg-background/60 px-4 py-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
                        <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-sm leading-snug text-foreground/75">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border/30 bg-secondary/15 px-5 py-4">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={1.5} />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">Disclaimer:</strong> Subsidiebedragen en exacte voorwaarden wijzigen
                regelmatig. BM klus BV geeft geen subsidie- of juridische garanties. Controleer
                altijd de actuele regelgeving via{" "}
                <strong className="font-semibold text-foreground">rvo.nl</strong> en uw gemeente.
              </p>
            </div>
          </section>
        </div>
      </div>
      </div>{/* end below-fold: Subsidie */}

      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Section 3: Stappenplan ───────────────────────────────────── */}
          <section
            id="stappenplan"
            aria-labelledby="h2-stappenplan"
            className="pt-20 scroll-mt-24"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Stappenplan
              </span>
            </div>
            <h2
              id="h2-stappenplan"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Van{" "}
              <span className="text-primary">opname tot aanvraag</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Zo verlopen vergunning en subsidie in de praktijk — van het eerste contact tot het
              indienen van het subsidiedossier.
            </p>

            <StappenplanTimeline stappen={stappen} />
          </section>
        </div>
      </div>
      </div>{/* end below-fold: Stappenplan */}

      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Section 4: Checklist ─────────────────────────────────────── */}
          <section
            id="checklist"
            aria-labelledby="h2-checklist"
            className="pt-20 scroll-mt-24"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Checklist
              </span>
            </div>
            <h2
              id="h2-checklist"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Praktische{" "}
              <span className="text-primary">checklist</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Loop deze punten door voordat de werkzaamheden starten. Wij helpen u bij elk punt
              tijdens de gratis opname.
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground/60">
              Deze checklist is bedoeld voor woningeigenaren die ISDE voor gevelisolatie willen voorbereiden. Voor VvE&apos;s en verhuurders gelden andere subsidieregelingen.
            </p>

            <ChecklistInteractive items={checklistItems} />

          </section>
        </div>
      </div>
      </div>{/* end below-fold: Checklist */}

      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Section 5: FAQ ───────────────────────────────────────────── */}
          <section
            id="faq"
            aria-labelledby="h2-faq"
            className="pt-20 scroll-mt-24"
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

              {/* Left: sticky header */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-10 bg-primary" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      FAQ
                    </span>
                  </div>
                  <h2
                    id="h2-faq"
                    className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                  >
                    Veelgestelde
                    <br />
                    <span className="text-primary">vragen</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Alles wat u wilt weten over vergunningen en subsidie bij buitengevelisolatie.
                  </p>
                  <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-xs leading-relaxed text-amber-800">
                      Geen juridische of financiële garanties. Raadpleeg altijd uw gemeente en
                      rvo.nl voor actuele informatie.
                    </p>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Staat uw vraag er niet tussen?{" "}
                    <Link href="/contact/" className="font-semibold text-primary hover:underline">
                      Neem contact op
                    </Link>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <FaqAccordion items={faqItems} defaultOpen={0} />
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>{/* end below-fold: FAQ */}

      <div className="below-fold">
      <div className="bg-background pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Related links ───────────────────────────────────────────── */}
          <nav aria-label="Gerelateerde pagina's" className="pt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Meer informatie
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{link.label}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}

            </div>
          </nav>

          {/* ── Internal links ── */}
          <nav aria-label="Overige pagina's" className="mt-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Overige pagina&apos;s:</span>
              {[
                { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
                { label: "Sierpleister", href: "/sierpleister/" },
                { label: "Gevel schilderen", href: "/gevel-schilderen/" },
                { label: "Muren stucen", href: "/muren-stucen/" },
                { label: "Onze werken", href: "/onze-werken/" },
                { label: "Diensten", href: "/diensten/" },
                { label: "Contact", href: "/contact/" },
              ].map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-border">•</span>}
                  <Link href={link.href} className="hover:text-primary hover:underline underline-offset-4 transition-colors">{link.label}</Link>
                </span>
              ))}
            </div>
          </nav>

        </div>
      </div>
      </div>{/* end below-fold: Related links */}

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
