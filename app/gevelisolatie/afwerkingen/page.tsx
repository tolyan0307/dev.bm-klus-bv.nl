import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  AlertCircle,
  Layers,
  Paintbrush,
  SquareStack,
  Droplets,
  Clock,
  ChevronRight,
  Star,
  MapPin,
  MessageCircle,
  Search,
  FileText,
  Hammer,
} from "lucide-react"

import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import TrustStrip from "@/components/trust-strip"
import TableOfContents from "@/components/page/TableOfContents"
import Section from "@/components/page/Section"
import Callout from "@/components/page/Callout"
import FaqAccordion from "@/components/page/FaqAccordion"
import RelatedLinks from "@/components/page/RelatedLinks"
import type { RelatedLinkItem } from "@/components/page/RelatedLinks"
import GoogleRatingBadge from "@/components/google-rating-badge"
import ResponsiveImage from "@/components/responsive-image"
import { projects } from "@/lib/content/projects"
import { ProjectCard as ProjectCardComponent } from "@/components/projects/ProjectCard"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))

/* ── Metadata ── */
export const metadata = buildPageMetadata("/gevelisolatie/afwerkingen/")
const base = SITE.canonicalBase

/* ── Static data ── */

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20advies%20over%20gevelafwerkingen."

const heroBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Afwerkingen", href: "/gevelisolatie/afwerkingen/" },
]

const toc = [
  { id: "overzicht",    label: "Overzicht afwerkingen" },
  { id: "projecten",    label: "Onze projecten" },
  { id: "stuc-vs-crepi", label: "Stucwerk vs sierpleister/crepi" },
  { id: "steenstrips",  label: "Steenstrips (baksteenlook)" },
  { id: "werkwijze",    label: "Werkwijze" },
  { id: "onderhoud",    label: "Onderhoud & levensduur" },
  { id: "prijs",        label: "Afwerking en prijs" },
  { id: "reviews",      label: "Reviews" },
  { id: "faq",          label: "Veelgestelde vragen" },
]

const featuredSlugs = [
  "halsteren-buitenstucwerk-sierpleister-schilderwerk-2025",
  "nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025",
  "dordrecht-gevelisolatie-10cm-sierpleister-2025",
]
const featuredProjects = featuredSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter(Boolean) as typeof projects

interface FinishOption {
  icon: React.ReactNode
  name: string
  baseName: string
  uitstraling: string
  onderhoud: string
  budget: string
  opmerking: string
  pros: string[]
  cons: string[]
}

const finishOptions: FinishOption[] = [
  {
    icon: <Paintbrush className="h-5 w-5" />,
    name: "Glad stucwerk",
    baseName: "dienst-stucwerk",
    uitstraling: "Strak, modern, egaal",
    onderhoud: "Schilderen elke 8–12 jaar",
    budget: "€ – €€",
    opmerking: "Populaire keuze bij nieuwbouw en renovatie",
    pros: [
      "Tijdloze, strakke uitstraling",
      "Breed kleurenpallet",
      "Goede vochtbarrière met juiste verf",
    ],
    cons: [
      "Zichtbaar bij krimpscheuren",
      "Regelmatig schilderonderhoud vereist",
    ],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    name: "Sierpleister / spachtelputz",
    baseName: "dienst-sierpleister",
    uitstraling: "Fijne structuur, levendig",
    onderhoud: "Laag – biocide variant mogelijk",
    budget: "€€",
    opmerking: "Een van de meest toegepaste afwerkingen op ETICS in Nederland",
    pros: [
      "Structuur camoufleert kleine oneffenheden",
      "Beschikbaar met ingebouwde biocide",
      "Duurzaam pigment, minder snel schilderen",
    ],
    cons: [
      "Minder strak dan glad stuc",
      "Moeilijker plaatselijk te repareren",
    ],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    name: "Crepi / gevelpleister",
    baseName: "afwerking-crepi",
    uitstraling: "Grove korrel, traditioneel",
    onderhoud: "Laag – biocide variant mogelijk",
    budget: "€",
    opmerking: "Snel te spuiten, kostenefficiënt",
    pros: [
      "Snelle applicatie, lagere arbeidskosten",
      "Traditionele uitstraling, past bij veel wijken",
      "Goede beschikbaarheid van aannemers",
    ],
    cons: [
      "Grovere korrel minder geschikt voor moderne stijlen",
      "Kleur kan verbleken bij slechte kwaliteit",
    ],
  },
  {
    icon: <SquareStack className="h-5 w-5" />,
    name: "Steenstrips (baksteenlook)",
    baseName: "afwerking-steenstrips",
    uitstraling: "Authentiek metselwerk",
    onderhoud: "Laag – voegen nalopen na 15–20 j.",
    budget: "€€€",
    opmerking: "Extra verankering nodig in ETICS-systeem",
    pros: [
      "Authentieke baksteenuitstraling",
      "Zeer duurzaam (doorgaans meerdere tientallen jaren)",
      "Nauwelijks schilderwerk nodig",
    ],
    cons: [
      "Zwaarder – extra systeemvereisten",
      "Hogere materiaal- en plaatsingskosten",
    ],
  },
]

const comparisonRows = [
  { finish: "Glad stucwerk",             uitstraling: "★★★★☆", onderhoud: "Gemiddeld", budget: "€ – €€",  opmerking: "Schilderwerk vereist" },
  { finish: "Sierpleister / spachtelputz", uitstraling: "★★★★☆", onderhoud: "Laag",     budget: "€€",     opmerking: "Een van de populairste keuzes ETICS" },
  { finish: "Crepi / gevelpleister",      uitstraling: "★★★☆☆", onderhoud: "Laag",     budget: "€",      opmerking: "Kostenefficiënt" },
  { finish: "Steenstrips (baksteenlook)", uitstraling: "★★★★★", onderhoud: "Zeer laag", budget: "€€€",    opmerking: "Extra verankering nodig" },
]

const onderhoudItems = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Levensduur pleister",
    body: "Kwalitatieve sierpleister of crepi gaat doorgaans 20–30 jaar mee zonder grote ingrepen, afhankelijk van kwaliteitsklasse, klimaatbelasting en onderhoud. Kleur kan iets vervagen, maar structuur en waterdichtheid blijven intact.",
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    title: "Algen & zwarte aanslag",
    body: "Gebruik een afwerking met biocide-toevoeging. Regelmatig schoonspuiten (lage druk) helpt. Zorg dat hemelwaterafvoer geen water langs de gevel laat lopen.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Levensduur steenstrips",
    body: "Steenstrips zijn keramisch en gaan doorgaans meerdere tientallen jaren mee. Voegen nalopen na 15–20 jaar houdt vochtinfiltratie buiten.",
  },
  {
    icon: <Paintbrush className="h-5 w-5" />,
    title: "Schilderonderhoud stucwerk",
    body: "Glad stucwerk vereist adembrekende gevelverf eens per 8–12 jaar. Kies altijd dampdoorlatende verf om schade aan de isolatielaag te voorkomen.",
  },
]

interface FaqItem {
  vraag: string
  antwoord: string
}

const faqItems: FaqItem[] = [
  {
    vraag: "Wat is het verschil tussen crepi en sierpleister?",
    antwoord:
      "Crepi (ook wel gevelpleister of spuitpleister) wordt gespoten of met een rolaggregaat aangebracht en heeft een grove, korrelachtige structuur. Sierpleister of spachtelputz wordt handmatig met een staalspatel aangebracht en heeft een fijnere, meer speelse structuur. Beide zijn minerale afwerkingen op ETICS-isolatiesystemen, maar crepi is vaak iets goedkoper door de snellere applicatie.",
  },
  {
    vraag: "Is steenstrips altijd mogelijk op gevelisolatie?",
    antwoord:
      "Niet automatisch. Steenstrips zijn zwaarder dan pleisterlagen, waardoor het isolatiepakket extra verankering nodig heeft. Bij ETICS-systemen met minerale wol of EPS is steenstrips goed mogelijk, mits het systeem is gedimensioneerd op het gewicht. Wij controleren dit altijd voor de offerte, zodat u niet voor verrassingen staat.",
  },
  {
    vraag: "Hoeveel onderhoud vraagt een stucwerk gevel?",
    antwoord:
      "Glad stucwerk vraagt eens per 8–12 jaar opnieuw schilderen om de vochtwerend eigenschappen te behouden. Kies voor een adembrekende gevelverf die dampen doorlaat maar water buiten houdt. Regelmatige inspectie van scheuren of loszittende plekken is verstandig, met name na vorstperiodes.",
  },
  {
    vraag: "Hoe voorkom ik algengroei op mijn gevel?",
    antwoord:
      "Algen en zwarte aanslag ontstaan op plekken die langdurig vochtig blijven, zoals onder overhangschilderingen en in de schaduw. Kies voor een afwerking met ingebouwde biocide (fungicide sierpleister), zorg voor goede waterafvoer en houd overhangende begroeiing op afstand. Crepi-afwerkingen met biocide-toevoeging zijn het meest algenresistent in ons klimaat.",
  },
  {
    vraag: "Kan een beschadigde pleisterlaag plaatselijk worden gerepareerd?",
    antwoord:
      "Kleine reparaties zijn mogelijk, maar kleurovereenkomst is soms lastig bij verouderd stucwerk. Voor grote beschadigingen of herstel na lekkage adviseren wij een volledige terugvloeiing. Bij steenstrips is plaatselijke vervanging over het algemeen goed te realiseren, omdat de strips per stuk worden aangebracht.",
  },
  {
    vraag: "Welke afwerking past bij een moderne woning?",
    antwoord:
      "Voor moderne architectuur kiest u doorgaans glad wit of donker stucwerk (gevelplamuur + gevelverf) of een fijn-gestructureerde sierpleister. Dit geeft de strakke uitstraling die past bij hedendaagse bouwstijlen. Steenstrips in een donkere kleur (antraciet of leisteengrijs) combineren goed met een strakke moderne gevel.",
  },
  {
    vraag: "Welke afwerking past bij een klassieke of jaren-30 woning?",
    antwoord:
      "Bij traditionele woningen past een crepi of sierpleister met warme aardtinten het best in de omgeving. Steenstrips in een rood of oranje baksteentoon benaderen het oorspronkelijke metselwerkuiterlijk het meest, wat populair is in Rotterdam-wijken met historische gevelbeelden.",
  },
  {
    vraag: "Moet ik voor de afwerking al een kleur kiezen?",
    antwoord:
      "Tijdens de offerte is een definitieve keuze nog niet nodig, maar het heeft invloed op de prijs en planningsduur. Donkere tinten zijn dikwijls duurder vanwege de aanvullende verflagen. Wij adviseren u graag op basis van de oriëntatie van uw gevel, buurbebouwing en eventuele gemeentelijke welstandseisen.",
  },
]

const relatedLinks: RelatedLinkItem[] = [
  {
    label: "Gevelisolatie (overzicht)",
    description: "Alles over ETICS buitengevelisolatie: werkwijze, materialen en afwerkingen.",
    href: "/gevelisolatie/",
  },
  {
    label: "Kosten gevelisolatie",
    description: "Richtprijzen per m², kostenfactoren en voorbeeldscenario's.",
    href: "/gevelisolatie/kosten/",
  },
  {
    label: "Materialen (EPS, PIR, wol)",
    description: "EPS, PIR of minerale wol: welk isolatiemateriaal kiest u?",
    href: "/gevelisolatie/materialen/",
  },
  {
    label: "RC-waarde & dikte",
    description: "Hoeveel centimeter isolatie heeft u nodig voor uw gewenste RC-waarde?",
    href: "/gevelisolatie/rc-waarde-dikte/",
  },
  {
    label: "Subsidie & vergunning",
    description: "Overzicht van subsidie, fiscale voordelen en vergunningsvereisten.",
    href: "/gevelisolatie/subsidie-vergunning/",
  },
  {
    label: "Gevel schilderen",
    description: "Verflaag als bescherming en opfrisbeurt voor de gevel.",
    href: "/gevel-schilderen/",
  },
]

/* ── Page Component ── */
export default function AfwerkingenPage() {
  const breadcrumbsSchema = breadcrumbSchema(
    heroBreadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )
  const business = localBusinessSchema()
  const service = serviceSchema({
    name: "Gevelafwerkingen — stuc, sierpleister, crepi & steenstrips",
    description:
      "Afwerking na buitengevelisolatie: glad stucwerk, sierpleister, crepi of steenstrips. Vergelijk eigenschappen, onderhoud en prijs.",
    url: `${base}/gevelisolatie/afwerkingen/`,
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
      <section aria-label="Hero" className="relative overflow-hidden bg-[#1A1A1A]">
        <ResponsiveImage
          baseName="bruinisse-gevelisolatie-6cm-na-04"
          dir="/images/projects"
          preset="hero"
          alt=""
          sizes="(max-width: 1920px) 100vw, 1920px"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(14,10,6,0.38)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,10,6,0.88) 0%, rgba(14,10,6,0.72) 22%, rgba(14,10,6,0.44) 42%, rgba(14,10,6,0.12) 62%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 120,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(14,10,6,0.30) 100%)",
          }}
        />

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
                  Afwerkingen · Regio Rotterdam
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Afwerking na gevelisolatie:{" "}
                <span className="text-primary">stuc, crepi of steenstrips?</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Glad stucwerk, sierpleister, crepi of steenstrips — elke afwerking heeft eigen
                eigenschappen, onderhoud en prijs. Wij adviseren op locatie.
              </p>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Gratis opname op locatie & advies", "Alle afwerkingen leverbaar", "Gecertificeerde ETICS-systemen"].map((text) => (
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

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">

          {/* ── Table of Contents ── */}
          <TableOfContents items={toc} className="mb-2" />

          {/* ── Sections ── */}

          <div className="below-fold">
            {/* 1. Overzicht */}
            <Section
              id="overzicht"
              eyebrow="Overzicht"
              h2="Overzicht afwerkingen"
              accentWord="afwerkingen"
              lead="Bij buitengevel isoleren en bekleden via het ETICS-systeem is de afwerklaag het laatste — en meest zichtbare — onderdeel van het isolatiepakket. De vier meest toegepaste varianten in Nederland zijn glad stucwerk, sierpleister/spachtelputz, crepi/gevelpleister en steenstrips in baksteenlook."
            >

              {/* Finish option cards */}
              <div className="grid gap-5 sm:grid-cols-2">
                {finishOptions.map((opt) => (
                  <div
                    key={opt.name}
                    className="overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm flex flex-col hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-muted/60">
                      <ResponsiveImage
                        baseName={opt.baseName}
                        dir="/images"
                        preset="serviceCard"
                        alt={opt.name}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {opt.name}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shrink-0">
                        {opt.icon}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{opt.name}</h3>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Uitstraling</dt>
                        <dd className="mt-0.5 font-medium text-foreground">{opt.uitstraling}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Onderhoud</dt>
                        <dd className="mt-0.5 font-medium text-foreground">{opt.onderhoud}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Budget</dt>
                        <dd className="mt-0.5 font-bold text-primary">{opt.budget}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Opmerking</dt>
                        <dd className="mt-0.5 text-foreground/70">{opt.opmerking}</dd>
                      </div>
                    </dl>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/60">
                      <ul className="space-y-1.5">
                        {opt.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-1.5">
                        {opt.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>{/* end p-5 content wrapper */}
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="mt-10">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Vergelijking op een rij
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        {["Afwerking", "Uitstraling", "Onderhoud", "Budget", "Opmerking"].map((col) => (
                          <th key={col} className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {comparisonRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                          <td className="px-4 py-3 font-semibold text-foreground">{row.finish}</td>
                          <td className="px-4 py-3 text-primary">{row.uitstraling}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.onderhoud}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{row.budget}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.opmerking}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>
          </div>

          <div className="below-fold">
            {/* 2. Onze projecten */}
            <section id="projecten" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                  Onze projecten
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Afwerkingen in de{" "}
                <span className="text-primary">praktijk</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Bekijk hoe verschillende afwerkingen eruitzien op recente projecten in de regio.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <ProjectCardComponent key={project.slug} project={project} />
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Meer bekijken?{" "}
                <Link href="/onze-werken/" className="font-semibold text-primary underline-offset-2 hover:underline">
                  Bekijk al onze projecten →
                </Link>
              </p>
            </section>
          </div>

          <div className="below-fold">
            {/* 3. Stucwerk vs sierpleister/crepi */}
            <Section
              id="stuc-vs-crepi"
              eyebrow="Stuc & sierpleister"
              h2="Stucwerk vs sierpleister / crepi"
              accentWord="sierpleister / crepi"
              lead="Drie afwerkingsmethoden die onderling sterk verschillen in applicatie, textuur en onderhoud. Wanneer kiest u welke?"
            >
              <div className="space-y-6">
                {([
                  {
                    name: "Glad stucwerk",
                    when: "Moderne architectuur, strakke gevels, nieuwbouw",
                    body: "Ook wel gevelplamuur met topcoat — geeft een strakke, egale afwerking die sterk associeert met hedendaagse architectuur. Het is een tweestappenproces: een basislaag van fijne plamuur gevolgd door een adembrekende gevelverf. Het nadeel is dat fijne scheuren direct zichtbaar zijn en dat u eens per 8–12 jaar moet herschilderen om de vochtbeschermende werking te behouden.",
                    accent: "border-l-primary",
                  },
                  {
                    name: "Sierpleister (spachtelputz)",
                    when: "Allround — een van de meest toegepaste ETICS-afwerkingen in Nederland",
                    body: "Handmatig aangebracht met een roestvrij stalen spatel, legt dit product een subtiele korrelstructuur vast die kleine oneffenheden maskeert. Beschikbaar in tientallen kleuren en met optionele biocide-toevoeging die algengroei langdurig remt. Moeilijker plaatselijk te repareren dan glad stucwerk.",
                    accent: "border-l-primary",
                  },
                  {
                    name: "Crepi (gevelpleister)",
                    when: "Traditionele rijwoningen, wederopbouwwijken, budgetbewust",
                    body: "Wordt gespoten of gewalst en heeft een grovere korrel. De applicatietijd is korter, wat de arbeidskosten verlaagt. Crepi past goed bij traditionele rijwoningen en wederopbouwwijken in Rotterdam, maar minder bij strakke, moderne gevels. Kleur kan verbleken bij slechte kwaliteit.",
                    accent: "border-l-primary",
                  },
                ] as const).map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-xl border border-border/60 bg-card/80 ${item.accent} border-l-[3px] p-5 sm:p-6 shadow-sm`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                      <div className="sm:flex-1">
                        <h3 className="text-base font-bold text-foreground sm:text-lg">{item.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.body}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:w-56 shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Ideaal voor</p>
                        <p className="text-sm font-semibold text-primary leading-snug">{item.when}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="below-fold">
            {/* 4. Steenstrips */}
            <Section
              id="steenstrips"
              eyebrow="Steenstrips"
              h2="Steenstrips (baksteenlook)"
              accentWord="(baksteenlook)"
            >
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
                <div className="grid grid-rows-[220px_1fr] sm:grid-rows-none sm:grid-cols-[320px_1fr]">
                  <div className="relative overflow-hidden bg-muted/60">
                    <ResponsiveImage
                      baseName="afwerking-steenstrips"
                      dir="/images"
                      preset="serviceCard"
                      alt="Steenstrips baksteenlook op gevelisolatie"
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent sm:bg-linear-to-r sm:from-transparent sm:to-black/10" />
                    <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Authentiek metselwerk
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Steenstrips zijn dunne kleikeramische plakjes (4–15 mm) die op de afwerklaag van het ETICS-systeem worden aangebracht voor een authentieke baksteenuitstraling. Doordat steenstrips zwaarder zijn dan pleisterlagen, is extra mechanische verankering nodig — via langere pluggen die door de isolatie heen in de draagmuur gaan.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Levensduur", value: "Tientallen jaren" },
                        { label: "Onderhoud", value: "Zeer laag" },
                        { label: "Uitstraling", value: "Authentiek" },
                        { label: "Budget", value: "€€€" },
                      ].map((spec) => (
                        <div key={spec.label} className="rounded-lg bg-muted/40 px-3 py-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{spec.label}</p>
                          <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {["Keramisch materiaal", "Extra verankering vereist", "Constructieve check nodig"].map((tag) => (
                        <span key={tag} className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Callout variant="warning" className="mt-6" title="Let op: detailafwerking dagkanten en plint">
                <p>
                  Bij elke gevelisolatie zijn de <strong>dagkanten</strong> (rondom kozijnen, deuren en vensterbanken) en de <strong>plintzone</strong> (de onderste 20–30 cm boven het maaiveld) kritische zones. Een slordig afgewerkte dagkant zorgt voor koudlekkage en vochtinfiltratie. Wij verwerken de dagkanten altijd met glasvezelwapening en een passend profiel, zodat aansluitingen waterdicht en stabiel blijven.
                </p>
              </Callout>
            </Section>
          </div>

          <div className="below-fold">
            {/* 5. Werkwijze */}
            <Section
              id="werkwijze"
              eyebrow="Werkwijze"
              h2="Van advies tot oplevering"
              accentWord="oplevering"
              lead="Hoe verloopt een afwerkingsproject bij BM klus BV? In drie stappen van eerste inspectie tot een volledig afgewerkte gevel."
            >
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: <Search className="h-5 w-5" />,
                    step: "01",
                    title: "Inspectie op locatie",
                    body: "Wij komen gratis langs, beoordelen de ondergrond, meten de gevel op en bespreken uw wensen voor de afwerking. U ontvangt een helder advies over welk type het beste past bij uw situatie.",
                  },
                  {
                    icon: <FileText className="h-5 w-5" />,
                    step: "02",
                    title: "Advies & offerte",
                    body: "Op basis van de opname stellen wij een gedetailleerde offerte op: materiaal, afwerkingstype, kleur, planning en totaalprijs. Geen verborgen kosten.",
                  },
                  {
                    icon: <Hammer className="h-5 w-5" />,
                    step: "03",
                    title: "Uitvoering & oplevering",
                    body: "Onze vakmensen brengen de gekozen afwerking aan conform ETICS-normen. Na oplevering loopt u samen met de uitvoerder het resultaat door.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm"
                  >
                    <span className="absolute -right-2 -top-3 text-6xl font-black tabular-nums text-primary/6">
                      {item.step}
                    </span>
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-4">
                      {item.icon}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
                      Stap {item.step}
                    </p>
                    <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="below-fold">
            {/* 6. Onderhoud & levensduur */}
            <Section
              id="onderhoud"
              eyebrow="Onderhoud"
              h2="Onderhoud & levensduur"
              accentWord="levensduur"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {onderhoudItems.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="below-fold">
            {/* 6. Afwerking en prijs */}
            <Section
              id="prijs"
              eyebrow="Prijsinvloed"
              h2="Afwerking en prijs"
              accentWord="prijs"
            >
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  De keuze voor een afwerking heeft een directe invloed op de totale projectkosten.
                  Crepi is de meest budgetvriendelijke optie; steenstrips zijn de duurste keuze
                  vanwege materiaalkosten en extra arbeidsintensiviteit. Sierpleister zit er
                  comfortabel tussenin.
                </p>
                <p>
                  Houd er rekening mee dat de kleur van de afwerking meeweegt in de prijs: donkere
                  kleuren vereisen soms meerdere lagen en UV-bestendiger pigmenten. Professionele
                  detailafwerking rondom kozijnen en bij de plintzone verhoogt de materiaalhoeveelheid,
                  maar is niet een post die u wilt bezuinigen.
                </p>
              </div>
              <Callout variant="orange" className="mt-6">
                <p>
                  Wilt u een volledig kostenoverzicht voor gevelisolatie inclusief afwerking?{" "}
                  <Link href="/gevelisolatie/kosten/" className="font-semibold underline underline-offset-2 hover:text-primary">
                    Bekijk onze kostenpagina voor gevelisolatie →
                  </Link>
                </p>
              </Callout>
              <Callout variant="orange" className="mt-4">
                <p>
                  <strong>Gratis vrijblijvende offerte:</strong> wij bezoeken uw woning, meten op en adviseren welke afwerking het beste past bij uw gevelsituatie en budget.{" "}
                  <Link href="/contact/" className="font-semibold underline underline-offset-2 hover:text-primary">
                    Offerte aanvragen →
                  </Link>
                </p>
              </Callout>
            </Section>
          </div>

        </div>{/* end container */}

      </div>

      {/* ── Reviews ── */}
      <div className="below-fold">
        <div id="reviews" className="scroll-mt-24">
          <ReviewsSection />
        </div>
      </div>

      {/* ── FAQ + Related links ── */}
      <div className="below-fold">
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

          <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-10 bg-primary" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Veelgestelde<br />
                    <span className="text-primary">vragen</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Heeft u vragen over afwerkingen bij gevelisolatie? Hier vindt u de antwoorden op de meest gestelde vragen.
                  </p>
                  <p className="mt-8 text-sm text-muted-foreground">
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

          {/* ── Related links ── */}
          <div className="border-t border-border/40 pt-12">
            <RelatedLinks items={relatedLinks} />
          </div>

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

        </div>{/* end container */}

      </div>
      </div>{/* end below-fold FAQ */}

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
