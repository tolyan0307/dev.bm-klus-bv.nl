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
import RelatedLinks from "@/components/page/RelatedLinks"
import type { RelatedLinkItem } from "@/components/page/RelatedLinks"
import GoogleRatingBadge from "@/components/google-rating-badge"

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
  { id: "wat-zit-erin",       label: "Wat zit er meestal in de prijs?" },
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
  "Opname en inmeting op locatie",
  "Werkvoorbereiding en materiaalbegroting",
  "Isolatieplaten inclusief bevestiging (lijm en/of pluggen)",
  "Wapeningslaag (mortel + glasvezelweefsel)",
  "Gekozen afwerklaag",
  "Profielen en detaillering (dagkanten, hoeken, plint)",
  "Oplevering en eindcontrole",
]

const scenarios = [
  {
    title: "Rijwoning – voorgevel",
    oppervlak: "ca. 30–50 m²",
    afwerking: "Stuc of sierpleister (ETICS)",
    indicatie: "€3.500 – €10.000",
    opmerking: "Brede bandbreedte door variaties in detaillering (dagkanten, plint) en steigerhoogte.",
  },
  {
    title: "Hoekwoning – meerdere gevels",
    oppervlak: "ca. 80–130 m²",
    afwerking: "Stuc of sierpleister (ETICS)",
    indicatie: "€9.000 – €26.000",
    opmerking: "Meer hoekprofielen en aansluitpunten; exact oppervlak en bereikbaarheid bepalen de eindprijs.",
  },
  {
    title: "Twee-onder-één-kapwoning – voorgevel + zijgevel",
    oppervlak: "ca. 60–90 m²",
    afwerking: "ETICS + steenstrips",
    indicatie: "€12.000 – €25.000",
    opmerking: "Steenstrips vragen meer arbeid; exacte prijs sterk afhankelijk van striptype en detaillering.",
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

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">

          {/* ── Table of Contents ── */}
          <TableOfContents items={toc} className="mb-2" />

          {/* ── Sections ── */}
          <div className="space-y-2 divide-y divide-border/40">

            {/* 1. Richtprijzen */}
            <Section
              id="richtprijzen"
              eyebrow="Prijsoverzicht"
              h2="Richtprijzen per m²"
              accentWord="per m²"
            >
              <PriceCards cards={priceCards} noteLines={priceNoteLines} />
              <Callout variant="orange" className="mt-6">
                <p>
                  <strong>Exacte prijs na opname op locatie:</strong> na een bezoek ter plaatse ontvangt u een heldere offerte met de specifieke RC-waarde, isolatiedikte en gekozen afwerking — zodat u precies weet wat de investering inhoudt.
                </p>
              </Callout>
            </Section>

            {/* 2. Kostenfactoren */}
            <Section
              id="kostenfactoren"
              eyebrow="Kostenfactoren"
              h2="Welke factoren bepalen de prijs?"
              accentWord="de prijs?"
              lead="De uiteindelijke prijs per m² hangt af van een combinatie van factoren. Hieronder vindt u de belangrijkste, gegroepeerd per categorie."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kostenfactoren.map((groep) => (
                  <div key={groep.groep} className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-primary">
                      {groep.groep}
                    </p>
                    <ul className="space-y-2">
                      {groep.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          <span className="text-sm leading-snug text-foreground/75">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* 3. Wat zit erin */}
            <Section
              id="wat-zit-erin"
              eyebrow="Inbegrepen"
              h2="Wat zit er meestal in de prijs?"
              accentWord="in de prijs?"
              lead="Een complete ETICS-offerte omvat doorgaans de onderstaande onderdelen. Posten zoals steigerhuur en herstelwerk worden apart inzichtelijk gemaakt, omdat deze sterk variëren per situatie."
            >
              <div className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {prijsopbouwItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-sm leading-snug text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Steigerhuur en -montage, alsmede uitgebreider herstelwerk aan de ondergrond, worden altijd afzonderlijk in de offerte vermeld. Zo weet u vooraf precies wat erbij komt.
                </p>
              </div>
            </Section>

            {/* 4. Voorbeeldscenario's */}
            <Section
              id="voorbeeldscenarios"
              eyebrow="Voorbeelden"
              h2="Voorbeeldscenario's"
              accentWord="Voorbeeldscenario's"
              lead="Onderstaande scenario's geven een indicatief beeld. De brede bandbreedtes weerspiegelen de invloed van detaillering, steigerhoogte en afwerking op de eindprijs."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                    <p className="mb-4 text-sm font-bold text-foreground">{scenario.title}</p>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">Oppervlak</dt>
                        <dd className="font-medium text-foreground">{scenario.oppervlak}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">Afwerking</dt>
                        <dd className="font-medium text-foreground text-right">{scenario.afwerking}</dd>
                      </div>
                      <div className="flex justify-between gap-2 border-t border-border/60 pt-2">
                        <dt className="font-semibold text-foreground">Indicatie totaal</dt>
                        <dd className="text-lg font-black text-primary">{scenario.indicatie}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
                      {scenario.opmerking}
                    </p>
                  </div>
                ))}
              </div>
              <Callout variant="warning" className="mt-6" title="Let op: indicaties, geen vaste prijzen">
                <p>
                  Bovenstaande bedragen zijn brede bandbreedtes ter oriëntatie. De exacte prijs is altijd maatwerk en volgt na de opname op locatie.
                </p>
              </Callout>
            </Section>

            {/* 5. Besparen */}
            <Section
              id="besparen"
              eyebrow="Bespaartips"
              h2="Besparen zonder kwaliteitsverlies"
              accentWord="kwaliteitsverlies"
              lead="Er zijn een aantal praktische keuzes die de kosten kunnen beïnvloeden, zonder afbreuk te doen aan de kwaliteit van het eindresultaat."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {besparenTips.map((tip, i) => (
                  <div key={tip.title} className="flex gap-4 rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                    <span className="mt-0.5 text-2xl font-black tabular-nums text-primary/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-foreground">{tip.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 6. FAQ */}
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
                <div className="lg:col-span-7 space-y-3">
                  {faqItems.map((faq, i) => (
                    <details
                      key={i}
                      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all open:border-primary/40 open:shadow-md"
                      {...(i === 0 ? { open: true } : {})}
                    >
                      <summary className="flex w-full cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20 [&::-webkit-details-marker]:hidden list-none">
                        <div className="flex min-w-0 items-start gap-4">
                          <span className="mt-0.5 shrink-0 text-lg font-bold text-border group-open:text-primary transition-colors">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 break-words text-base font-semibold text-foreground sm:text-lg">
                            {faq.vraag}
                          </span>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 rotate-90 group-open:rotate-270" />
                      </summary>
                      <div className="border-t border-border/50 px-6 pb-6 pt-4">
                        <p className="pl-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {faq.antwoord}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

          </div>{/* end sections */}

          {/* ── Related links ── */}
          <div className="mt-16 border-t border-border/40 pt-12">
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

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
