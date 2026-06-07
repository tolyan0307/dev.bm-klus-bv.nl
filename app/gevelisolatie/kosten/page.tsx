import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Check,
  Phone,
  ChevronRight,
  CheckCircle2,
  Star,
  MapPin,
  MessageCircle,
  Layers,
  Paintbrush2,
  Building2,
  Wrench,
  Ruler,
  Info,
  type LucideIcon,
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
import PriceCards from "@/components/page/PriceCards"
import FaqAccordion from "@/components/page/FaqAccordion"
import RelatedLinks from "@/components/page/RelatedLinks"
import type { RelatedLinkItem } from "@/components/page/RelatedLinks"
import GoogleRatingBadge from "@/components/google-rating-badge"
import ResponsiveImage from "@/components/responsive-image"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

/* ── Metadata ── */
export const metadata = buildPageMetadata("/gevelisolatie/kosten/")

const base = SITE.canonicalBase

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen%20voor%20gevelisolatie."

/* ── Static data ── */

const heroBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Kosten", href: "/gevelisolatie/kosten/" },
]

const toc = [
  { id: "richtprijzen",       label: "Richtprijzen per m²" },
  { id: "kostenfactoren",     label: "Welke factoren bepalen de prijs?" },
  { id: "wat-zit-erin",       label: "Wat zit er in de prijs?" },
  { id: "voorbeeldscenarios", label: "Voorbeeldscenario's" },
  { id: "besparen",           label: "Besparen zonder kwaliteitsverlies" },
  { id: "faq",                label: "Veelgestelde vragen" },
]

const priceCards = [
  {
    title: "ETICS + pleisterafwerking (stuc, sierpleister of crepi)",
    range: "€110 – €200/m²",
    note: "Meest gekozen afwerking; exacte prijs afhankelijk van RC-waarde, dikte en details.",
  },
  {
    title: "ETICS + steenstrips",
    range: "€200 – €280/m²",
    note: "Zwaarder en arbeidsintensiever; prijs sterk situatie-afhankelijk.",
    highlighted: true,
  },
]

const priceNoteLines = [
  "Richtprijzen (indicatie), incl. arbeid & materiaal. Excl. steiger, eventueel herstelwerk en complexe detaillering.",
  "Dakoverstekken, dagkanten en aansluitdetails kunnen meerwerk geven; exacte prijs volgt na opname.",
]

const kostenfactoren = [
  { groep: "Materiaal & systeem", items: ["Type isolatiemateriaal (EPS, PIR of minerale wol)", "Isolatiedikte en gewenste RC-waarde"] },
  { groep: "Afwerking",           items: ["Gekozen afwerklaag: stuc, sierpleister, crepi of steenstrips", "Kleur en structuurkeuze"] },
  { groep: "Steiger & bereikbaarheid", items: ["Bouwhoogte en steigerhoogte", "Benodigde hijsconstructie of lastige opstelruimte"] },
  { groep: "Ondergrond & herstel",    items: ["Staat van het bestaande metselwerk", "Eventueel noodzakelijk herstelwerk vooraf"] },
  { groep: "Detaillering",           items: ["Dagkanten rondom ramen en deuren", "Hoekprofielen en aansluitprofielen", "Plintzone en spatwaterdetails", "Aansluitingen op dakrand, balkon of uitbouw"] },
]

const prijsopbouwItems = [
  { step: "Opname en inmeting", detail: "Bezoek op locatie" },
  { step: "Werkvoorbereiding", detail: "Materiaalbegroting & planning" },
  { step: "Isolatieplaten", detail: "Bevestiging met lijm en/of pluggen" },
  { step: "Wapeningslaag", detail: "Mortel + glasvezelweefsel" },
  { step: "Afwerklaag", detail: "Uw gekozen finish" },
  { step: "Detaillering", detail: "Dagkanten, hoeken & plint" },
  { step: "Oplevering", detail: "Eindcontrole & oplevering" },
]

const scenarios = [
  {
    title: "Rijwoning – voorgevel",
    oppervlak: "ca. 30–50 m²",
    afwerking: "Stuc of sierpleister (ETICS)",
    indicatie: "€3.500 – €10.000",
    opmerking: "Brede bandbreedte door variaties in detaillering (dagkanten, plint) en steigerhoogte.",
    image: { baseName: "scenario-rijwoning-stucwerk", alt: "Rijwoning met stucwerk afwerking na gevelisolatie" },
    badge: "Rijwoning",
  },
  {
    title: "Hoekwoning – meerdere gevels",
    oppervlak: "ca. 80–130 m²",
    afwerking: "Stuc of sierpleister (ETICS)",
    indicatie: "€9.000 – €26.000",
    opmerking: "Meer hoekprofielen en aansluitpunten; exact oppervlak en bereikbaarheid bepalen de eindprijs.",
    image: { baseName: "scenario-hoekwoning-sierpleister", alt: "Hoekwoning met sierpleister afwerking op twee gevels" },
    badge: "Hoekwoning",
  },
  {
    title: "Twee-onder-één-kapwoning – voorgevel + zijgevel",
    oppervlak: "ca. 60–90 m²",
    afwerking: "ETICS + steenstrips",
    indicatie: "€12.000 – €25.000",
    opmerking: "Steenstrips vragen meer arbeid; exacte prijs sterk afhankelijk van striptype en detaillering.",
    image: { baseName: "scenario-tweekap-steenstrips", alt: "Twee-onder-één-kapwoning met steenstrips afwerking" },
    badge: "Twee-onder-één-kap",
  },
]

const besparenTips = [
  {
    title: "Kies een efficiënte afwerking",
    text: "Sierpleister en crepi zijn doorgaans voordeliger dan steenstrips. Ze bieden uitstekende isolatieresultaten bij een lagere m²-prijs.",
  },
  {
    title: "Zorg voor een goede bereikbaarheid",
    text: "Ruim de omgeving rondom uw woning voor de start vrij. Moeilijke opstelruimte voor de steiger leidt tot hogere steigerhuurkosten.",
  },
  {
    title: "Combineer werkzaamheden",
    text: "Als u toch schilderwerk of andere geveltoepassingen laat uitvoeren, kan het combineren van opdrachten de totale kosten per m² drukken — vraag ernaar bij uw offerte.",
  },
  {
    title: "Plan in het juiste seizoen",
    text: "Gevelisolatie wordt het beste uitgevoerd bij droog, niet te koud weer. Plannen in het voor- of naseizoen geeft doorgaans meer flexibiliteit.",
  },
]

const faqItems = [
  {
    vraag: "Wat kost gevelisolatie aan de buitenkant per m²?",
    antwoord:
      "De richtprijzen liggen tussen €110 en €200 per m² voor ETICS met een pleisterafwerking (stuc, sierpleister of crepi), en tussen €200 en €280 per m² voor ETICS met steenstrips. Dit zijn indicaties inclusief arbeid en materiaal, exclusief steiger, eventueel herstelwerk en complexe detaillering. Na een opname op locatie ontvangt u een exacte prijs.",
  },
  {
    vraag: "Waarom zijn steenstrips duurder dan stuc of sierpleister?",
    antwoord:
      "Steenstrips zijn zwaarder, vereisen een speciale bevestigingstechniek en kosten meer arbeidstijd per m². Bovendien moet de onderliggende constructie hierop berekend zijn. Stuc en sierpleister zijn lichter, sneller te verwerken en daardoor voordeliger per m².",
  },
  {
    vraag: "Is een steiger inbegrepen in de prijs?",
    antwoord:
      "In de meeste gevallen zijn steigerhuur en -montage niet inbegrepen in de standaard m²-prijs, omdat de hoogte en complexiteit sterk varieert per woning. Wij vermelden dit altijd duidelijk in de offerte, zodat u precies weet wat wel en niet inbegrepen is.",
  },
  {
    vraag: "Wordt herstelwerk aan het metselwerk meegenomen in de prijs?",
    antwoord:
      "Licht herstelwerk (kleine scheuren, losse voegen) nemen wij doorgaans mee in de voorbereiding. Uitgebreider herstelwerk of erg beschadigde gevels wordt apart in de offerte opgenomen. Tijdens de opname op locatie beoordelen wij de staat van uw ondergrond.",
  },
  {
    vraag: "Is het voordeliger om alleen de voorgevel te isoleren?",
    antwoord:
      "Één gevel isoleren is goedkoper in absolute kosten, maar de prijs per m² kan hoger liggen dan bij een grotere oppervlakte. Vanuit isolatieperspectief geeft het isoleren van alle buitengevels het meeste resultaat; vanuit budget kan het zinvol zijn om in fases te werken. Vraag ons advies tijdens de opname.",
  },
  {
    vraag: "Hoe snel ontvang ik een offerte na de opname?",
    antwoord:
      "Na de opname op locatie ontvangt u zo snel mogelijk een duidelijke offerte, met prijs per m², RC-waarde, materiaalkeuze en alle inbegrepen werkzaamheden.",
  },
  {
    vraag: "Is er subsidie beschikbaar voor buitengevelisolatie?",
    antwoord:
      "Er zijn mogelijkheden voor subsidie of fiscale voordelen, zoals de ISDE-regeling. De regelgeving en bedragen wijzigen regelmatig. Wij adviseren u dit bij aanvang van uw project te controleren via de website van RVO.nl of uw gemeente. Wij kunnen u hierover informeren tijdens de opname.",
  },
  {
    vraag: "Moet ik gevelisolatie regelmatig onderhouden?",
    antwoord:
      "ETICS-systemen zijn over het algemeen onderhoudsarm. Periodiek reinigen (bijv. bij mosvorming) is soms gewenst. De afwerklaag kan na meerdere jaren opnieuw geschilderd of behandeld worden. Steenstrips zijn zeer duurzaam en vragen minimaal onderhoud.",
  },
  {
    vraag: "Hoe lang duurt de uitvoering?",
    antwoord:
      "De uitvoeringstijd hangt af van het oppervlak, de afwerking en de weersomstandigheden. Voor een gemiddelde rijwoning (voorgevel) rekent u doorgaans op enkele werkdagen. Een grotere opdracht (meerdere gevels, steenstrips) duurt langer. Na de opname geven wij een indicatieve doorlooptijd.",
  },
  {
    vraag: "In welk gebied werkt BM klus BV?",
    antwoord:
      "Wij zijn actief in de regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's. Twijfelt u of uw locatie binnen ons werkgebied valt? Neem gerust contact op.",
  },
]

const relatedLinks: RelatedLinkItem[] = [
  {
    label: "Gevelisolatie (overzicht)",
    description: "Alles over ETICS buitengevelisolatie: werkwijze, materialen en afwerkingen.",
    href: "/gevelisolatie/",
  },
  {
    label: "Afwerkingen",
    description: "Stuc, sierpleister, crepi of steenstrips — wat past bij uw woning?",
    href: "/gevelisolatie/afwerkingen/",
  },
  {
    label: "Materialen",
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
    label: "Onze werken",
    description: "Bekijk uitgevoerde gevelisolatie- en afwerkingsprojecten in de regio.",
    href: "/onze-werken/",
  },
]

const kostenfactorenIcons: Record<string, LucideIcon> = {
  "Materiaal & systeem": Layers,
  "Afwerking": Paintbrush2,
  "Steiger & bereikbaarheid": Building2,
  "Ondergrond & herstel": Wrench,
  "Detaillering": Ruler,
}

/* ── Page Component ── */
export default function KostenGevelisolatiePage() {
  const breadcrumbsSchema = breadcrumbSchema(
    heroBreadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Buitengevelisolatie (ETICS) – kosten",
    description:
      "Wat kost buitengevelisolatie per m²? Kostenfactoren, afwerking (stuc/steenstrips) en voorbeeldranges. Opname op locatie in regio Rotterdam.",
    url: `${base}/gevelisolatie/kosten/`,
    lowPrice: "110",
    highPrice: "280",
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
            baseName="gevelisolatie-kosten-stucwerk-resultaat"
            preset="hero"
            alt="Afgewerkte gevelisolatie met stucwerk — kostenoverzicht"
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
                  Kosten &amp; prijzen · Regio Rotterdam
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gevelisolatie kosten:{" "}
                <span className="text-primary">prijs per m² uitgelegd</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Eerlijke richtprijzen per m², de belangrijkste kostenfactoren en
                handige voorbeeldscenario&apos;s. Na een opname op locatie ontvangt u een
                heldere offerte met prijs per m² en RC-waarde.
              </p>

              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary ring-1 ring-primary/25">
                  Vanaf €110/m²
                </span>
                <span className="text-xs text-white/50">
                  incl. arbeid &amp; materiaal · excl. steiger
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Opname op locatie", "Heldere offerte per m²", "Netjes detailwerk (dagkanten/plint)"].map((text) => (
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
                <a
                  href="#offerte"
                  className="btn-hero"
                >
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
                  <span className="ml-1 text-xs font-semibold text-white/70">
                    <GoogleRatingBadge format="short" />
                  </span>
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

        {/* ── Table of Contents ── */}
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <TableOfContents items={toc} className="mb-2" />
        </div>

        {/* ── 1. Richtprijzen ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="richtprijzen"
            eyebrow="Prijsoverzicht"
            h2="Richtprijzen per m²"
            accentWord="per m²"
          >
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className="p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Pleisterafwerking */}
                  <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/80 transition-all hover:border-primary/20 hover:shadow-md">
                    <div className="relative h-44 w-full overflow-hidden">
                      <ResponsiveImage
                        baseName="afwerking-stucwerk-resultaat"
                        preset="serviceCard"
                        alt="Stucwerk afwerking op geïsoleerde gevel — glad en duurzaam resultaat"
                        sizes="(max-width: 639px) calc(100vw - 32px), calc(50vw - 40px)"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-card/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 shadow-sm backdrop-blur-md">
                        <CheckCircle2 className="h-3 w-3 text-white drop-shadow-sm" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">
                          Meest gekozen
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="mb-3 text-sm font-semibold leading-snug text-foreground">
                        {priceCards[0].title}
                      </p>
                      <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                        {priceCards[0].range}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {priceCards[0].note}
                    </p>
                      <ul className="mt-4 space-y-1.5 border-t border-border/30 pt-4">
                        {["Onderhoudsarm", "Snelle verwerking", "Breed kleurenpalet"].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                            <Check className="h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Steenstrips */}
                  <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/80 transition-all hover:border-primary/20 hover:shadow-md">
                    <div className="relative h-44 w-full overflow-hidden">
                      <ResponsiveImage
                        baseName="afwerking-steenstrips-resultaat"
                        preset="serviceCard"
                        alt="Steenstrips afwerking op buitengevelisolatie — authentieke baksteenlook"
                        sizes="(max-width: 639px) calc(100vw - 32px), calc(50vw - 40px)"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-card/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 shadow-sm backdrop-blur-md">
                        <Star className="h-3 w-3 fill-white text-white drop-shadow-sm" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">
                          Premium optie
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="mb-3 text-sm font-semibold leading-snug text-foreground">
                        {priceCards[1].title}
                      </p>
                      <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                        {priceCards[1].range}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {priceCards[1].note}
                    </p>
                      <ul className="mt-4 space-y-1.5 border-t border-border/30 pt-4">
                        {["Authentieke uitstraling", "Jarenlang kleurvast", "Maximale duurzaamheid"].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                            <Check className="h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex gap-3 rounded-lg border border-border/30 bg-secondary/15 px-4 py-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                  <div className="space-y-1">
                    {priceNoteLines.map((line, i) => (
                      <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Callout variant="orange" className="mt-8">
              <p>
                <strong>Exacte prijs na opname op locatie:</strong> na een bezoek ter plaatse ontvangt u een heldere offerte met de specifieke RC-waarde, isolatiedikte en gekozen afwerking — zodat u precies weet wat de investering inhoudt.
              </p>
            </Callout>
          </Section>
        </div>

        {/* ── 2. Kostenfactoren (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="kostenfactoren"
              eyebrow="Kostenfactoren"
              h2="Welke factoren bepalen de prijs?"
              accentWord="de prijs?"
              lead="De uiteindelijke prijs per m² hangt af van een combinatie van factoren. Hieronder vindt u de belangrijkste, gegroepeerd per categorie."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {kostenfactoren.map((groep, i) => {
                  const Icon = kostenfactorenIcons[groep.groep]
                  return (
                    <div
                      key={groep.groep}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
                    >
                      <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
                      <div className="relative p-6 sm:p-8">
                        <span
                          className="pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none text-primary/4 transition-colors group-hover:text-primary/7"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {Icon && (
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10 transition-all group-hover:bg-primary/12 group-hover:ring-primary/25">
                            <Icon className="h-5 w-5 text-primary/70 group-hover:text-primary" strokeWidth={1.5} />
                          </div>
                        )}
                        <p className="mb-4 text-sm font-bold text-foreground">
                          {groep.groep}
                        </p>
                        <ul className="space-y-2.5">
                          {groep.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                              <span className="text-sm leading-snug text-foreground/75">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>
          </div>
        </div>

        {/* ── 3. Wat zit erin ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="wat-zit-erin"
            eyebrow="Inbegrepen"
            h2="Wat zit er in de prijs?"
            accentWord="in de prijs?"
            lead="Een complete ETICS-offerte doorloopt vaste stappen — van opname tot oplevering. Hieronder ziet u wat er standaard inbegrepen is."
          >
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className="grid lg:grid-cols-5">
                <div className="p-6 sm:p-8 lg:col-span-3">
                  <ol className="space-y-0">
                    {prijsopbouwItems.map((item, i) => (
                      <li key={item.step} className="group/step relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20">
                            {i + 1}
                          </div>
                          {i < prijsopbouwItems.length - 1 && (
                            <div className="mt-1 w-px grow bg-border/50" />
                          )}
                        </div>
                        <div className={i < prijsopbouwItems.length - 1 ? "pb-5" : ""}>
                          <p className="text-sm font-semibold text-foreground">{item.step}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex items-start gap-2 rounded-lg border border-border/30 bg-secondary/15 px-4 py-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Steigerhuur en -montage, alsmede uitgebreider herstelwerk aan de ondergrond, worden altijd afzonderlijk in de offerte vermeld.
                    </p>
                  </div>
                </div>
                <div className="relative hidden lg:col-span-2 lg:block">
                  <ResponsiveImage
                    baseName="projects/vught-gevelisolatie-10cm-voor-6"
                        preset="serviceCard"
                        alt="ETICS gevelisolatie werkproces — stucwerk en steiger in Vught"
                        sizes="33vw"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ── 4. Voorbeeldscenario's (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="voorbeeldscenarios"
              eyebrow="Voorbeelden"
              h2="Voorbeeldscenario's"
              accentWord="Voorbeeldscenario's"
              lead="Onderstaande scenario's geven een indicatief beeld. De brede bandbreedtes weerspiegelen de invloed van detaillering, steigerhoogte en afwerking op de eindprijs."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.title}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/80 transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <ResponsiveImage
                        baseName={scenario.image.baseName}
                        preset="serviceCard"
                        alt={scenario.image.alt}
                        sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 36px), calc(33vw - 32px)"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-card/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 shadow-sm backdrop-blur-md">
                        <Building2 className="h-3 w-3 text-white drop-shadow-sm" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">
                          {scenario.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="mb-3 text-sm font-semibold text-foreground">{scenario.title}</p>
                      <dl className="space-y-2.5 text-sm">
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Oppervlak</dt>
                          <dd className="font-medium text-foreground">{scenario.oppervlak}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Afwerking</dt>
                          <dd className="font-medium text-foreground text-right">{scenario.afwerking}</dd>
                        </div>
                      </dl>
                      <div className="mt-4 rounded-lg bg-primary/5 px-4 py-3 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Indicatie totaal</p>
                        <p className="mt-1 text-2xl font-black tracking-tight text-primary">{scenario.indicatie}</p>
                      </div>
                      <div className="mt-3 flex items-start gap-2">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" strokeWidth={1.5} />
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {scenario.opmerking}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Callout variant="warning" className="mt-8" title="Let op: indicaties, geen vaste prijzen">
                <p>
                  Bovenstaande bedragen zijn brede bandbreedtes ter oriëntatie. De exacte prijs is altijd maatwerk en volgt na de opname op locatie.
                </p>
              </Callout>
            </Section>
          </div>
        </div>

        {/* ── 5. Bespaartips ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="besparen"
            eyebrow="Bespaartips"
            h2="Besparen zonder kwaliteitsverlies"
            accentWord="kwaliteitsverlies"
            lead="Er zijn een aantal praktische keuzes die de kosten kunnen beïnvloeden, zonder afbreuk te doen aan de kwaliteit van het eindresultaat."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {besparenTips.map((tip, i) => (
                <div
                  key={tip.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
                >
                  <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
                  <div className="relative p-6 sm:p-8">
                    <span
                      className="pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none text-primary/4 transition-colors group-hover:text-primary/7"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mb-2 text-sm font-bold text-foreground">{tip.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* ── 6. FAQ ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-8 bg-primary" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde<br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      De meest gestelde vragen over kosten en prijzen van buitengevelisolatie. Staat uw vraag er niet bij?
                    </p>
                    <p className="mt-8 text-base text-muted-foreground">
                      <Link href="/contact/" className="font-semibold text-primary hover:underline">
                        Neem contact op
                      </Link>{" "}
                      — wij helpen u graag.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <FaqAccordion items={faqItems} defaultOpen={0} variant="premium" />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── Related links ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-4">
            <RelatedLinks items={relatedLinks} />
          </div>

          {/* ── Internal links ── */}
          <nav aria-label="Overige pagina's" className="pb-20 pt-4">
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

      </div>{/* end below-fold */}

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
