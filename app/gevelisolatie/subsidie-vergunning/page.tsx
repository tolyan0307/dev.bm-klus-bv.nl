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
import GoogleRatingBadge from "@/components/google-rating-badge"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

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
    icon: ShieldAlert,
    label: "Beschermd stadsgezicht of monument",
    tekst:
      "Controleer of uw woning of pand in een beschermd stads- of dorpsgezicht staat, of een monumentenstatus heeft. In beide gevallen gelden strengere regels voor gevelwijzigingen.",
  },
  {
    icon: Home,
    label: "Gevelbeeld en straatbeeld",
    tekst:
      "Buitengevelisolatie voegt dikte toe aan de gevel en kan de afwerking wijzigen. Of dit vergunningsplichtig is, hangt af van de mate van zichtbare verandering en de gemeentelijke welstandsnormen.",
  },
  {
    icon: MapPin,
    label: "Erfgrens en overstek",
    tekst:
      "Door de toegevoegde isolatiedikte kan de gevel dichter bij de erfgrens of het trottoir komen. Check of de nieuwe geveldikte binnen de wettelijke grenzen blijft.",
  },
  {
    icon: ClipboardList,
    label: "Afwerking, kleur en structuur",
    tekst:
      "Sommige gemeenten stellen eisen aan kleur en structuur van de afwerking, met name in welstandsgebieden. Vraag de lokale welstandsnota op of laat ons dit voor u navragen.",
  },
  {
    icon: Calendar,
    label: "Planning en volgorde",
    tekst:
      "Bij ISDE dient u de aanvraag in ná de uitvoering, binnen de gestelde termijn bij RVO. Check altijd de actuele aanvraagprocedure bij RVO, want deze kan wijzigen.",
  },
  {
    icon: FileText,
    label: "Documentatie bewaren",
    tekst:
      "Bewaar facturen, materiaalspecificaties (inclusief lambda-waarde en RC-berekening), foto's van voor/tijdens/na de uitvoering en uw goedkeuring van de offerte.",
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
      "In veel gevallen kan dat. De voorwaarden voor ISDE stellen een minimaal isolatieoppervlak van 10 m² en een minimale Rd-waarde van 3,5 m²K/W. Of één gevel voldoende is, hangt af van de oppervlakte. Check de actuele voorwaarden bij RVO of vraag ons om advies.",
  },
  {
    vraag: "Wanneer moet ik de subsidie aanvragen: voor of na de uitvoering?",
    antwoord:
      "Bij ISDE dient u de aanvraag in ná uitvoering maar binnen de gestelde termijn. De werkzaamheden mogen pas starten nadat u zeker bent over de procedure. Check altijd de actuele aanvraagprocedure bij RVO, want deze kan per regeling en jaar wijzigen.",
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
      "Nee — het toekennen van subsidie is de verantwoordelijkheid van RVO en de betrokken overheden. Wij geven geen juridische of financiële garanties. Wij helpen u zo goed mogelijk om aan de technische en documentaire voorwaarden te voldoen.",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,108,32,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,108,32,0.04)_0%,transparent_40%)]" />

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
      <div className="bg-background pb-16 sm:pb-20 lg:pb-24">
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
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Vergunning
              </span>
            </div>
            <h2
              id="h2-vergunning"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Wanneer heb je een{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                vergunning nodig?
                  </span>
            </h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Text block */}
              <div className="space-y-5 rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm lg:p-8">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Buitengevelisolatie (ETICS) verandert het uiterlijk van uw gevel: de dikte neemt
                  toe en de afwerking wijzigt. In sommige situaties is hiervoor een{" "}
                  <strong className="font-semibold text-foreground">
                    omgevingsvergunning (activiteit bouwen of handelen in strijd met
                    bestemmingsplan)
                  </strong>{" "}
                  vereist.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Of u een vergunning nodig heeft, hangt af van drie factoren: de lokale
                  bestemmingsplanregels en welstandsnota, of het pand een monumentale of
                  cultuurhistorische status heeft, en de mate van de gevelwijziging.
                </p>

                {/* Wanneer WEL vergunning */}
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Wanneer is een vergunning vaak wel nodig?
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Beschermd stadsgezicht of rijks-/gemeentelijk monument",
                      "Welstandsgebied met strikte eisen aan geveluiterlijk",
                      "Overschrijding van de erfgrens door de extra dikte",
                      "Wijziging van de voorgevel in het straatgericht zichtbaar",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wanneer NIET vergunning */}
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Wanneer is een vergunning soms niet nodig?
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Woning buiten beschermd stads- of dorpsgezicht",
                      "Gevelwijziging blijft binnen de erfrooilijn",
                      "Afwerking past binnen de bestaande welstandscriteria",
                      "Geen monument of cultureel erfgoed",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                          <Check className="h-3 w-3 text-muted-foreground" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs leading-relaxed text-amber-800">
                    <strong>Belangrijk:</strong> Controleer altijd bij uw gemeente. Wij voeren deze
                    check standaard uit tijdens de gratis opname, maar de uiteindelijke beoordeling
                    ligt bij de gemeente.
                  </p>
                </div>
              </div>

              {/* Image card */}
              <div className="relative overflow-hidden rounded-2xl">
                <ResponsiveImage
                  baseName="subsidie-vergunning"
                  dir="/images"
                  preset="serviceCard"
                  alt="Controleren van vergunningsvereisten voor gevelisolatie"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="h-64 w-full object-cover lg:h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Wist u dat
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-white">
                    Wij vooraf controleren of een vergunning nodig is — zonder extra kosten.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 2: Subsidie ──────────────────────────────────────── */}
          <section
            id="subsidie-hoofdlijnen"
            aria-labelledby="h2-subsidie"
            className="mt-20 scroll-mt-24"
          >
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Subsidie
              </span>
            </div>
            <h2
              id="h2-subsidie"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Subsidie op{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                hoofdlijnen
                  </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Er bestaan meerdere regelingen voor woningisolatie. De bekendste voor
              buitengevelisolatie is de{" "}
              <strong className="font-semibold text-foreground">ISDE (Investeringssubsidie
              Duurzame Energie en Energiebesparing)</strong>. Hieronder vindt u de voorwaarden op
              hoofdlijnen — raadpleeg altijd{" "}
              <strong className="font-semibold text-foreground">rvo.nl</strong> voor actuele
              bedragen en exacte eisen.
            </p>

            {/* Two info cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {/* ISDE card */}
              <div className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Euro className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">ISDE-subsidie</h3>
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                      Isolatie woning
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  De ISDE is een rijkssubsidie voor woningeigenaren die hun woning verduurzamen.
                  Gevelisolatie aan de buitenkant valt hieronder als aan de minimale
                  isolatiewaarde wordt voldaan.
                </p>

                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Voorwaarden op hoofdlijnen
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Minimale Rd-waarde van isolatiemateriaal (3,5 m²K/W) — check rvo.nl voor actuele norm",
                      "Minimaal te isoleren oppervlak (m²) — afhankelijk van actuele regelgeving",
                      "Woning is in bezit van particuliere eigenaar (geen verhuurder of VvE zonder aanvraagrecht)",
                      "Aanvraag indienen na afronding, binnen de gestelde termijn bij RVO",
                      "Bewijsdocumenten: factuur, materiaalspecificatie, foto's",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vergunning card */}
              <div className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">Wat wij regelen</h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                      Gratis service
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  BM klus BV ondersteunt u bij elke stap waar wij een bijdrage kunnen leveren.
                  Zo hoeft u niet zelf alles uit te zoeken.
                </p>

                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Onze ondersteuning
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Vergunningscheck bij gemeente tijdens opname",
                      "Advies over toepasselijke subsidieregeling(en)",
                      "Leveren van technische specificaties en RC-berekening",
                      "Foto-documentatie tijdens uitvoering",
                      "Assistentie bij samenstellen subsidiedossier",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-snug text-foreground/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="text-xs leading-relaxed text-amber-800">
                <strong>Disclaimer:</strong> Subsidiebedragen en exacte voorwaarden wijzigen
                regelmatig. BM klus BV geeft geen subsidie- of juridische garanties. Controleer
                altijd de actuele regelgeving via{" "}
                <strong>rvo.nl</strong> en uw gemeente.
              </p>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Section 3: Stappenplan ───────────────────────────────────── */}
          <section
            id="stappenplan"
            aria-labelledby="h2-stappenplan"
            className="mt-20 scroll-mt-24"
          >
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Stappenplan
              </span>
            </div>
            <h2
              id="h2-stappenplan"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Van{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                opname tot aanvraag
                  </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Zo verlopen vergunning en subsidie in de praktijk — van het eerste contact tot het
              indienen van het subsidiedossier.
            </p>

            {/* Steps */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stappen.map((stap) => (
                <div
                  key={stap.num}
                  className="relative flex flex-col gap-4 rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm"
                >
                  {/* Step number */}
                  <span className="text-4xl font-black leading-none tabular-nums text-primary/10">
                    {stap.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{stap.titel}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {stap.tekst}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 4: Checklist ─────────────────────────────────────── */}
          <section
            id="checklist"
            aria-labelledby="h2-checklist"
            className="mt-20 scroll-mt-24"
          >
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Checklist
              </span>
            </div>
            <h2
              id="h2-checklist"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Praktische{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                checklist
                  </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Loop deze punten door voordat de werkzaamheden starten. Wij helpen u bij elk punt
              tijdens de gratis opname.
            </p>

            {/* Checklist grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {checklistItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[10px] font-black tabular-nums text-primary/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{item.label}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.tekst}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA strip */}
            <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-foreground/80">
                Wilt u weten wat er in uw situatie speelt? Wij checken gratis of een vergunning
                nodig is en welke subsidie van toepassing kan zijn.
              </p>
              <Link
                href="/contact/"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Plan gratis opname
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* ── Section 5: FAQ ───────────────────────────────────────────── */}
          <section
            id="faq"
            aria-labelledby="h2-faq"
            className="mt-20 scroll-mt-24"
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

              {/* Right: FAQ items */}
              <div className="lg:col-span-7 space-y-3">
                {faqItems.map((item, idx) => (
                  <details
                    key={idx}
                    className="group overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm transition-all open:border-primary/40 open:shadow-md"
                    {...(idx === 0 ? { open: true } : {})}
                  >
                    <summary className="flex w-full cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20 [&::-webkit-details-marker]:hidden list-none">
                      <div className="flex min-w-0 items-start gap-4">
                        <span className="mt-0.5 shrink-0 text-lg font-bold tabular-nums text-border transition-colors group-open:text-primary">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 break-words text-base font-semibold text-foreground sm:text-lg">
                          {item.vraag}
                        </span>
                      </div>
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <div className="border-t border-border/50 px-6 pb-6 pt-4">
                      <p className="pl-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.antwoord}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── Related links ───────────────────────────────────────────── */}
          <nav aria-label="Gerelateerde pagina's" className="mt-20">
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

      </div>{/* end below-fold */}

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
