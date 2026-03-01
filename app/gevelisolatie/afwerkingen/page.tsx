import Link from "next/link"
import {
  ArrowRight,
  Check,
  Phone,
  CheckCircle2,
  AlertCircle,
  Layers,
  Paintbrush,
  SquareStack,
  Droplets,
  Clock,
} from "lucide-react"

import { buildPageMetadata } from "@/lib/seo/meta"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import TableOfContents from "@/components/page/TableOfContents"
import Section from "@/components/page/Section"
import Callout from "@/components/page/Callout"
import FAQAccordion from "@/components/page/FAQAccordion"
import RelatedLinks from "@/components/page/RelatedLinks"
import type { FaqItem } from "@/components/page/FAQAccordion"
import type { RelatedLinkItem } from "@/components/page/RelatedLinks"

/* ── Metadata ── */
export const metadata = buildPageMetadata("/gevelisolatie/afwerkingen/")

/* ── Static data ── */

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Afwerkingen" },
]

const toc = [
  { id: "overzicht",    label: "Overzicht afwerkingen" },
  { id: "stuc-vs-crepi", label: "Stucwerk vs sierpleister/crepi" },
  { id: "steenstrips",  label: "Steenstrips (baksteenlook)" },
  { id: "onderhoud",    label: "Onderhoud & levensduur" },
  { id: "prijs",        label: "Afwerking en prijs" },
  { id: "faq",          label: "Veelgestelde vragen" },
]

interface FinishOption {
  icon: React.ReactNode
  name: string
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
    uitstraling: "Fijne structuur, levendig",
    onderhoud: "Laag – biocide variant mogelijk",
    budget: "€€",
    opmerking: "Meest toegepast op ETICS in Nederland",
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
    uitstraling: "Authentiek metselwerk",
    onderhoud: "Laag – voegen nalopen om 15 j.",
    budget: "€€€",
    opmerking: "Extra verankering nodig in ETICS-systeem",
    pros: [
      "Authentieke baksteenuitstraling",
      "Zeer duurzaam (>30 jaar)",
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
  { finish: "Sierpleister / spachtelputz", uitstraling: "★★★★☆", onderhoud: "Laag",     budget: "€€",     opmerking: "Populairste keuze ETICS" },
  { finish: "Crepi / gevelpleister",      uitstraling: "★★★☆☆", onderhoud: "Laag",     budget: "€",      opmerking: "Kostenefficiënt" },
  { finish: "Steenstrips (baksteenlook)", uitstraling: "★★★★★", onderhoud: "Zeer laag", budget: "€€€",    opmerking: "Extra verankering nodig" },
]

const onderhoudItems = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Levensduur pleister",
    body: "Kwalitatieve sierpleister of crepi gaat 20–30 jaar mee zonder grote ingrepen. Kleur kan iets vervagen, maar structuur en waterdichtheid blijven intact.",
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    title: "Algen & zwarte aanslag",
    body: "Gebruik een afwerking met biocide-toevoeging. Regelmatig schoonspuiten (lage druk) helpt. Zorg dat hemelwaterafvoer geen water langs de gevel laat lopen.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Levensduur steenstrips",
    body: "Steenstrips zijn keramisch en gaan meer dan 30 jaar mee. Voegen nalopen na 15–20 jaar houdt vochtinfiltratie buiten.",
  },
  {
    icon: <Paintbrush className="h-5 w-5" />,
    title: "Schilderonderhoud stucwerk",
    body: "Glad stucwerk vereist adembrekende gevelverf eens per 8–12 jaar. Kies altijd dampdoorlatende verf om schade aan de isolatielaag te voorkomen.",
  },
]

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
  return (
    <>
      {/* JSON-LD FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.vraag,
              acceptedAnswer: { "@type": "Answer", text: item.antwoord },
            })),
          }),
        }}
      />

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
                  Gevelisolatie (ETICS) · Afwerkingen · Regio Rotterdam
                </p>
                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  Afwerking na gevelisolatie:{" "}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    stuc, crepi of steenstrips?
                  </span>
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Na het aanbrengen van buitengevelisolatie bepaalt de afwerking het definitieve uiterlijk. Glad stucwerk, structuurrijke sierpleister, crepi of authentieke steenstrips — elke optie heeft eigen eigenschappen, onderhoudsvereisten en prijs.
                </p>
                {/* Trust bullets */}
                <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                  {["Gratis opname & advies", "Alle afwerkingen leverbaar", "Regio Rotterdam (±80–100 km)"].map((bullet) => (
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
                    className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-primary/40 hover:shadow-md transition-all"
                  >
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

            {/* 2. Stucwerk vs sierpleister/crepi */}
            <Section
              id="stuc-vs-crepi"
              eyebrow="Stuc & sierpleister"
              h2="Stucwerk vs sierpleister / crepi"
              accentWord="sierpleister / crepi"
            >
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  <strong className="text-foreground">Glad stucwerk</strong> — ook wel gevelplamuur
                  met topcoat — geeft een strakke, egale afwerking die sterk associeert met
                  hedendaagse architectuur. Het is een tweestappenproces: een basislaag van
                  fijne plamuur gevolgd door een adembrekende gevelverf. Het nadeel is dat
                  fijne scheuren direct zichtbaar zijn en dat u eens per 8–12 jaar moet
                  herschilderen om de vochtbeschermende werking te behouden.
                </p>
                <p>
                  <strong className="text-foreground">Sierpleister (spachtelputz)</strong> is in
                  Nederland de meest gebruikte afwerking op ETICS. Handmatig aangebracht met een
                  roestvrij stalen spatel, legt dit product een subtiele korrelstructuur vast die
                  kleine oneffenheden maskeert. Beschikbaar in tientallen kleuren en met
                  optionele biocide-toevoeging die algengroei langdurig remt.
                </p>
                <p>
                  <strong className="text-foreground">Crepi (gevelpleister)</strong> wordt gespoten
                  of gewalst en heeft een grovere korrel. De applicatietijd is korter, wat de
                  arbeidskosten verlaagt. Crepi past goed bij traditionele rijwoningen en
                  wederopbouwwijken in Rotterdam, maar minder bij strakke, moderne gevels.
                </p>
              </div>
            </Section>

            {/* 3. Steenstrips */}
            <Section
              id="steenstrips"
              eyebrow="Steenstrips"
              h2="Steenstrips (baksteenlook)"
              accentWord="(baksteenlook)"
              lead="Steenstrips zijn dunne kleikeramische plakjes (4–15 mm) die op de afwerklaag van het ETICS-systeem worden aangebracht voor een authentieke baksteenuitstraling."
            >
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Doordat steenstrips zwaarder zijn dan pleisterlagen, is extra mechanische
                verankering nodig — via langere pluggen die door de isolatie heen in de
                draagmuur gaan. Niet alle bestaande ETICS-systemen zijn hier direct op
                berekend; een constructieve check is altijd nodig voor aanvang.
              </p>
              <Callout variant="warning" className="mt-6" title="Let op: detailafwerking dagkanten en plint">
                <p>
                  Bij elke gevelisolatie zijn de <strong>dagkanten</strong> (rondom kozijnen, deuren en vensterbanken) en de <strong>plintzone</strong> (de onderste 20–30 cm boven het maaiveld) kritische zones. Een slordig afgewerkte dagkant zorgt voor koudlekkage en vochtinfiltratie. Wij verwerken de dagkanten altijd met glasvezelwapening en een passend profiel, zodat aansluitingen waterdicht en stabiel blijven.
                </p>
              </Callout>
            </Section>

            {/* 4. Onderhoud & levensduur */}
            <Section
              id="onderhoud"
              eyebrow="Onderhoud"
              h2="Onderhoud & levensduur"
              accentWord="levensduur"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {onderhoudItems.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
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

            {/* 5. Afwerking en prijs */}
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

            {/* 6. FAQ — two-column layout matching home page */}
            <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <FAQAccordion
                items={faqItems}
                layout="two-col"
                eyebrow="FAQ"
                heading="Veelgestelde vragen"
                lead="Heeft u vragen over afwerkingen bij gevelisolatie? Hier vindt u de antwoorden op de meest gestelde vragen."
                contactHref="/contact/"
              />
            </section>

          </div>{/* end sections */}

          {/* ── Related links ── */}
          <div className="mt-16 border-t border-border/40 pt-12">
            <RelatedLinks items={relatedLinks} />
          </div>

        </div>{/* end container */}


      </main>
    </>
  )
}
