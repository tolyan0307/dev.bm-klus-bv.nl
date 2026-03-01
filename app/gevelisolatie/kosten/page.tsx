import Link from "next/link"
import { ArrowRight, Check, Phone } from "lucide-react"

import { buildPageMetadata } from "@/lib/seo/meta"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import TableOfContents from "@/components/page/TableOfContents"
import Section from "@/components/page/Section"
import Callout from "@/components/page/Callout"
import PriceCards from "@/components/page/PriceCards"
import FAQAccordion from "@/components/page/FAQAccordion"
import RelatedLinks from "@/components/page/RelatedLinks"
import type { FaqItem } from "@/components/page/FAQAccordion"
import type { RelatedLinkItem } from "@/components/page/RelatedLinks"

/* ── Metadata ── */
export const metadata = buildPageMetadata("/gevelisolatie/kosten/")

/* ── Static data ── */

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Kosten" },
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
  "Gratis opname en inmeting ter plaatse",
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

const faqItems: FaqItem[] = [
  {
    vraag: "Wat kost gevelisolatie aan de buitenkant per m²?",
    antwoord:
      "De richtprijzen liggen tussen €110 en €200 per m² voor ETICS met een pleisterafwerking (stuc, sierpleister of crepi), en tussen €200 en €280 per m² voor ETICS met steenstrips. Dit zijn indicaties inclusief arbeid en materiaal, exclusief steiger, eventueel herstelwerk en complexe detaillering. Na een gratis opname ter plaatse ontvangt u een exacte prijs.",
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
      "Licht herstelwerk (kleine scheuren, losse voegen) nemen wij doorgaans mee in de voorbereiding. Uitgebreider herstelwerk of erg beschadigde gevels wordt apart in de offerte opgenomen. Tijdens de gratis opname beoordelen wij de staat van uw ondergrond.",
  },
  {
    vraag: "Is het voordeliger om alleen de voorgevel te isoleren?",
    antwoord:
      "Één gevel isoleren is goedkoper in absolute kosten, maar de prijs per m² kan hoger liggen dan bij een grotere oppervlakte. Vanuit isolatieperspectief geeft het isoleren van alle buitengevels het meeste resultaat; vanuit budget kan het zinvol zijn om in fases te werken. Vraag ons advies tijdens de opname.",
  },
  {
    vraag: "Hoe snel ontvang ik een offerte na de opname?",
    antwoord:
      "Na de gratis opname ter plaatse streven wij ernaar om binnen 24 tot 48 uur een duidelijke offerte te bezorgen, met prijs per m², RC-waarde, materiaalkeuze en alle inbegrepen werkzaamheden.",
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
    vraag: "In welk gebied werkt BM Klus BV?",
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
]

/* ── Page Component ── */
export default function KostenGevelisolatiePage() {
  return (
    <>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10 flex-1 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44">
            <div className="flex">
              <div className="flex flex-col gap-5 pb-16 sm:pb-20 lg:pb-24 max-w-2xl">
                <p className="text-[#E8600A] text-xs font-bold tracking-[0.25em] uppercase">
                  Gevelisolatie · Kosten & prijzen · Regio Rotterdam
                </p>
                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  Gevelisolatie kosten (buiten):{" "}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    prijs per m² uitgelegd
                          </span>
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Eerlijke richtprijzen per m², de belangrijkste kostenfactoren en handige voorbeeldscenario's. Na een gratis opname ontvangt u een heldere offerte met prijs per m² en RC-waarde.
                </p>
                {/* Trust bullets */}
                <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                  {["Gratis opname", "Heldere offerte per m²", "Netjes detailwerk (dagkanten/plint)"].map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8600A]/20">
                        <Check className="h-3 w-3 text-[#E8600A]" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-white/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center gap-2 bg-[#E8600A] text-white font-semibold px-7 py-4 text-sm tracking-wide hover:bg-[#d0540a] transition-colors rounded-sm"
                  >
                    Offerte aanvragen
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/gevelisolatie/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 tracking-wide"
                  >
                    Terug naar Gevelisolatie
                  </Link>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Phone size={14} className="text-[#E8600A]" />
                  <a
                    href="tel:+31612079808"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    +31 6 1207 9808
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">

          {/* ── Breadcrumbs ── */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

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
                  <strong>Exacte prijs na gratis opname:</strong> na een bezoek ter plaatse ontvangt u een heldere offerte met de specifieke RC-waarde, isolatiedikte en gekozen afwerking — zodat u precies weet wat de investering inhoudt.
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
                  <div key={groep.groep} className="rounded-xl border border-border bg-card p-5">
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
              <div className="rounded-xl border border-border bg-card p-6">
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
                  <div key={scenario.title} className="rounded-xl border border-border bg-card p-5">
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
                  Bovenstaande bedragen zijn brede bandbreedtes ter oriëntatie. De exacte prijs is altijd maatwerk en volgt na de gratis opname ter plaatse.
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
                  <div key={tip.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
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

            {/* 6. FAQ — two-column layout matching home page */}
            <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <FAQAccordion
                items={faqItems}
                layout="two-col"
                eyebrow="FAQ"
                heading="Veelgestelde vragen"
                lead="De meest gestelde vragen over kosten en prijzen van buitengevelisolatie. Staat uw vraag er niet bij? Neem gerust contact op."
                contactHref="/contact/"
              />
            </section>

          </div>{/* end sections */}

          {/* ── Related links ── */}
          <div className="mt-16 border-t border-border/40 pt-12">
            <RelatedLinks items={relatedLinks} />
          </div>

        </div>{/* end container */}

        {/* ── Bottom CTA strip ── */}
        <div className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-bold text-primary-foreground sm:text-xl">
                  Klaar voor een exacte prijs voor uw woning?
                </p>
                <p className="mt-1 text-sm text-primary-foreground/75">
                  Gratis opname ter plaatse — duidelijke offerte binnen 24–48 uur.
                </p>
              </div>
              <Link
                href="/contact/"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 text-sm font-bold text-primary shadow-md transition-all hover:bg-primary-foreground/90 hover:shadow-lg"
              >
                Gratis opname plannen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </main>

    </>
  )
}
