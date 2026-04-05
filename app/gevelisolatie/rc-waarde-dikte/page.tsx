import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle2,
  Star,
  MessageCircle,
} from "lucide-react"

import GoogleRatingBadge from "@/components/google-rating-badge"
import RcWaardeDikteCalculator from "@/components/sections/gevelisolatie/rc-waarde-dikte-calculator"
import FaqAccordion from "@/components/page/FaqAccordion"
import { jsonLdScript } from "@/lib/seo/schema"

const TrustStrip = dynamic(() => import("@/components/trust-strip"))
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

/* ─── TOC ─────────────────────────────────────────────── */
const toc = [
  { id: "snel-antwoord",       label: "Snel antwoord" },
  { id: "rc-rd-lambda",        label: "Rc, Rd en lambda" },
  { id: "keuzehulp",           label: "Keuzehulp per situatie" },
  { id: "typische-ranges",     label: "Typische ranges" },
  { id: "dikte-per-materiaal", label: "Dikte per materiaal" },
  { id: "details-belang",      label: "Waarom details belangrijk zijn" },
  { id: "opname-checklist",    label: "Wat we checken bij de opname" },
  { id: "faq",                 label: "Veelgestelde vragen" },
]

/* ─── FAQ data ───────────────────────────────────────── */
const faqItems = [
  {
    vraag: "Is een Rc-waarde van 3,5 m²K/W voldoende voor mijn woning?",
    antwoord:
      "Niet altijd. Voor ISDE-subsidie bij gevelisolatie geldt een minimale Rd-waarde van 3,5 m²K/W voor het isolatiemateriaal. Bij veel woningen levert dit al een merkbare besparing op stookkosten op. Wilt u het maximale resultaat of een toekomstbestendige oplossing, dan adviseren wij een hogere isolatiewaarde — afhankelijk van uw woning en budget. Wij bepalen de optimale dikte tijdens de gratis opname op locatie.",
  },
  {
    vraag: "Kan de isolatielaag te dik worden?",
    antwoord:
      "Technisch gezien niet, maar er zijn praktische grenzen. Een dikke laag vraagt om langere bevestigingsankers, aandacht bij dagkanten (uitsprong van kozijnen) en soms een vergunning bij grotere overschrijdingen van de erfgrens. Boven Rc 5,0–6,0 neemt de extra besparing sterk af: u betaalt meer terwijl de return on investment afneemt. De ideale dikte is project- en budgetafhankelijk.",
  },
  {
    vraag: "Heeft de keuze van de afwerking invloed op de warmte-isolatie?",
    antwoord:
      "De afwerklaag (sierpleister, crepi, steenstrips) draagt vrijwel niet bij aan de Rc-waarde — haar dikte is slechts 1,5–15 mm. Wél speelt de kleur een rol in de zomerse warmtebelasting: donkere kleuren absorberen meer zonlicht. Lichte of witte afwerkingen verminderen dit effect. De thermische prestatie wordt vrijwel volledig bepaald door het isolatiemateriaal en de dikte daarvan.",
  },
  {
    vraag: "Wat is het verschil in dikte tussen EPS en PIR bij dezelfde Rc?",
    antwoord:
      "PIR heeft een lagere lambda-waarde (≈ 0,026 W/m·K) dan EPS (≈ 0,038 W/m·K), waardoor u bij dezelfde Rc-waarde een dunnere laag nodig heeft. Concreet: voor Rc 3,5 heeft EPS circa 135 mm nodig, PIR circa 90 mm — een verschil van ±45 mm. Dat maakt PIR aantrekkelijk waar de uitsprong beperkt moet blijven, al zijn de materiaalkosten iets hoger.",
  },
  {
    vraag: "Wat is het verschil tussen Rc en Rd?",
    antwoord:
      "Rd is de warmteweerstand van het isolatiemateriaal zelf (berekend als dikte gedeeld door lambda). Rc is de totale warmteweerstand van de volledige constructie: isolatie plus de aangrenzende lagen (gevel, pleisterwerk, luchtlagen). In de praktijk gaan we bij offerte en vergunning altijd uit van Rc, omdat dat de werkelijke isolatiekwaliteit van de gevelopbouw weergeeft.",
  },
  {
    vraag: "Heb ik een vergunning nodig en welke isolatiewaarde is vereist voor subsidie?",
    antwoord:
      "Voor ISDE-subsidie geldt een minimale Rd-waarde van 3,5 m²K/W voor het isolatiemateriaal. Wij geven bij de offerte aan of uw project in aanmerking komt en welke documentatie vereist is. Of een omgevingsvergunning nodig is, verschilt per situatie: het hangt af van uw gemeente, het geldende omgevingsplan en de mate waarin het uiterlijk van de gevel wijzigt. Bij ETICS is een vergunningcheck vrijwel altijd aan te raden. U kunt dit vooraf controleren via het Omgevingsloket, of wij nemen dit mee in ons advies.",
  },
  {
    vraag: "Waarom varieert de totale opbouwdikte zoveel (10–18 cm)?",
    antwoord:
      "De totale opbouw bestaat uit het isolatiepaneel plus de WDVS-lagen: hechtmortel, glasvlierwapening, primer en afwerklaag (samen ±25–40 mm). De isolatiedikte hangt af van de gewenste Rc en het gekozen materiaal. Bij Rc 3,5 met EPS: ±135 mm isolatie + 35 mm opbouw = ca. 17 cm totaal. Bij Rc 4,5 met PIR: ±120 mm + 30 mm = ca. 15 cm. De bandbreedte van 10–18 cm dekt de meeste woningprojecten.",
  },
  {
    vraag: "Kan ik de Rc-waarde achteraf nog verhogen?",
    antwoord:
      "In principe wel, maar het is ingrijpend: de bestaande WDVS-opbouw moet worden verwijderd of overplakt (overcoating is alleen mogelijk met specifieke systemen en tot beperkte diktes). Het is financieel gunstiger om direct de gewenste einddikte te bepalen. Wij adviseren u tijdens de opname over de toekomstbestendigste keuze, ook rekening houdend met eventuele subsidietrajecten.",
  },
]

/* ─── Related links ──────────────────────────────────── */
const relatedLinks = [
  { label: "Gevelisolatie",          href: "/gevelisolatie/",                  description: "Alles over buitengevelisolatie (ETICS)" },
  { label: "Kosten gevelisolatie",   href: "/gevelisolatie/kosten/",           description: "Prijzen, factoren en voorbeeldberekeningen" },
  { label: "Materialen",             href: "/gevelisolatie/materialen/",      description: "EPS, PIR en minerale wol vergeleken" },
  { label: "Afwerkingen",            href: "/gevelisolatie/afwerkingen/",     description: "Sierpleister, crepi, steenstrips en meer" },
  { label: "Subsidie & vergunning",  href: "/gevelisolatie/subsidie-vergunning/", description: "ISDE-subsidie en omgevingsvergunning" },
  { label: "Onze werken",            href: "/onze-werken/",                   description: "Uitgevoerde gevelisolatie- en afwerkingsprojecten in de regio." },
]

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20advies%20over%20Rc-waarde%20en%20isolatiedikte."

/* ─── Sub-components ─────────────────────────────────── */
function SectionHeader({
  eyebrow,
  heading,
  accent,
  lead,
}: {
  eyebrow: string
  heading: string
  accent?: string
  lead?: string
}) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {heading}{" "}
        {accent && (
          <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
            {accent}
          </span>
        )}
      </h2>
      {lead && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lead}
        </p>
      )}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-3 w-3 text-primary" strokeWidth={3} />
          </div>
          <span className="text-sm leading-relaxed text-foreground/70">{b}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function RcWaardeDiktePage() {
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
      {jsonLdScript(faqSchema)}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,108,32,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,108,32,0.04)_0%,transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Gevelisolatie", href: "/gevelisolatie/" },
                { label: "Rc-waarde & dikte", href: "/gevelisolatie/rc-waarde-dikte/" },
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

          <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
            <div className="flex max-w-2xl flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Rc-waarde & dikte · Regio Rotterdam
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Rc-waarde en dikte:{" "}
                <span className="text-primary">hoeveel isolatie heeft u nodig?</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Van lambda-waarde tot totale opbouwdikte — begrijp welke Rc past bij uw
                woning en waarom details het verschil maken.
              </p>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Gratis opname op locatie", "Rc-berekening per woning", "Subsidieadvies inbegrepen"].map((text) => (
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

          {/* ── TOC ── */}
          <nav aria-label="Inhoudsopgave">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Inhoud
              </span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {toc.map((item, i) => (
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

          <div className="mt-16 space-y-20">

            {/* ══ Snel antwoord ══ */}
            <section id="snel-antwoord" className="scroll-mt-24">
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    In het kort
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Snel antwoord
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    titel: "Subsidiedrempel (ISDE)",
                    tekst:
                      "De minimale eis is Rd 3,5 m²K/W — dat is de warmteweerstand van het isolatiemateriaal, niet van de hele gevel.",
                  },
                  {
                    titel: "Gehele gevel vergelijken",
                    tekst:
                      "Wilt u de prestatie van de volledige gevelopbouw vergelijken of beoordelen, dan kijkt u naar de Rc-waarde.",
                  },
                  {
                    titel: "Beperkte ruimte",
                    tekst:
                      "Is de uitsprong bij kozijnen of dagkanten krap, dan kan een materiaal met een lagere lambda dezelfde isolatiewaarde in minder centimeters bereiken.",
                  },
                  {
                    titel: "Toekomstbestendig",
                    tekst:
                      "Overweegt u een warmtepomp of een beter energielabel, dan is het verstandig om hoger te mikken dan alleen de subsidiedrempel.",
                  },
                ].map((card) => (
                  <div
                    key={card.titel}
                    className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm"
                  >
                    <p className="mb-2 text-sm font-bold text-foreground">{card.titel}</p>
                    <p className="text-sm leading-relaxed text-foreground/70">{card.tekst}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Exacte waarden zijn afhankelijk van uw woning, doel en detaillering.
              </p>
            </section>

            {/* ══ 1. Rc, Rd en lambda ══ */}
            <section id="rc-rd-lambda" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Begrippen"
                heading="Rc, Rd en lambda"
                accent="simpel uitgelegd"
                lead="Drie begrippen die u tegenkomt bij elke offerte — maar wat betekenen ze precies en hoe hangen ze samen?"
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    term: "λ (lambda)",
                    unit: "W/m·K",
                    kleur: "bg-primary/8",
                    tekst:
                      "De warmtegeleidingscoëfficiënt van het isolatiemateriaal. Hoe lager de lambda-waarde, hoe minder warmte het materiaal doorlaat — en hoe beter het isoleert. EPS: λ ≈ 0,038 · PIR: λ ≈ 0,026 · Minerale wol: λ ≈ 0,035.",
                  },
                  {
                    term: "Rd",
                    unit: "m²K/W",
                    kleur: "bg-primary/5",
                    tekst:
                      "De warmteweerstand van het isolatiepakket zelf: Rd = dikte (m) ÷ λ. Een isolatieplaat van 100 mm PIR geeft Rd = 0,10 ÷ 0,026 ≈ 3,85 m²K/W. Rd meet het materiaal, niet de volledige constructie.",
                  },
                  {
                    term: "Rc",
                    unit: "m²K/W",
                    kleur: "bg-primary/5",
                    tekst:
                      "De totale warmteweerstand van de gehele gevelconstructie: isolatie + gevelmetselwerk + luchtlagen + binnenpleister. Rc wordt gebruikt bij vergunningen en energieberekeningen. Voor subsidies (ISDE) is de Rd van het isolatiemateriaal de toetswaarde. Praktisch: Rc ≈ Rd + 0,20–0,40 voor een standaard WDVS-gevel.",
                  },
                ].map((card) => (
                  <div
                    key={card.term}
                    className={`rounded-xl border border-border ${card.kleur} p-6`}
                  >
                    <div className="mb-3 flex items-end gap-2">
                      <span className="text-2xl font-black text-foreground">{card.term}</span>
                      <span className="mb-0.5 text-xs font-semibold text-muted-foreground">{card.unit}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70">{card.tekst}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm leading-relaxed text-foreground/80">
                  <span className="font-semibold text-primary">Praktijkregel:</span>{" "}
                  Voor bouwvergunningen en energieberekeningen wordt de Rc-waarde van de gehele gevelopbouw gebruikt. Voor subsidieaanvragen (ISDE) toetst de overheid op de Rd-waarde van het isolatiemateriaal. Wij vermelden beide waarden in onze offerte.
                </p>
              </div>
            </section>

            {/* ══ Keuzehulp per situatie ══ */}
            <section id="keuzehulp" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Welke situatie past bij u?"
                heading="Keuzehulp per"
                accent="situatie"
                lead="Uw ideale isolatiewaarde hangt af van uw doel, woning en budget. Hieronder vier veelvoorkomende scenario's als startpunt."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    h3: "Subsidie als hoofddoel",
                    voorWie:
                      "U wilt de ISDE-subsidie benutten en zoekt de meest kostenefficiënte aanpak.",
                    logisch:
                      "Richt op minimaal Rd 3,5 voor het isolatiemateriaal. Welk materiaal en welke dikte daarbij passen, hangt af van de beschikbare ruimte en ondergrond.",
                    letten:
                      "Controleer vooraf de actuele ISDE-voorwaarden, het vereiste materiaaltype en de benodigde documentatie — de regeling kan wijzigen.",
                  },
                  {
                    h3: "Weinig ruimte bij dagkanten",
                    voorWie:
                      "Uw kozijnen zitten dicht op de erfgrens of dagkanten, waardoor een dik pakket niet past.",
                    logisch:
                      "Een materiaal met een lage lambda-waarde bereikt dezelfde isolatiewaarde in minder centimeters.",
                    letten:
                      "Dagkanten moeten mee-geïsoleerd worden — een dun vlakpakket met ongeïsoleerde dagkanten levert een koudebrug op.",
                  },
                  {
                    h3: "Comfortverbetering",
                    voorWie:
                      "U wilt een merkbaar warmer huis en lagere stookkosten, maar niet het dikst mogelijke pakket.",
                    logisch:
                      "Zoek een balans tussen isolatiewaarde, beschikbare dikte en budget. Meer isolatie levert meer op, maar het rendement per extra centimeter neemt af.",
                    letten:
                      "De detaillering (plint, hoeken, aansluitingen) bepaalt mede hoeveel van de theoretische waarde u in de praktijk behaalt.",
                  },
                  {
                    h3: "Maximaal toekomstbestendig",
                    voorWie:
                      "U combineert gevelisolatie met een warmtepomp, zonnepanelen of een traject naar een hoger energielabel.",
                    logisch:
                      "Mik hoger dan alleen de subsidiedrempel — bij een warmtepomp profiteert u extra van een goed geïsoleerde schil.",
                    letten:
                      "Boven een bepaald punt neemt de meerwaarde per extra centimeter af. De optimale balans is woningafhankelijk.",
                  },
                ].map((card) => (
                  <div
                    key={card.h3}
                    className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm"
                  >
                    <h3 className="mb-3 text-base font-bold text-foreground">{card.h3}</h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="font-semibold text-foreground/80">Voor wie</dt>
                        <dd className="leading-relaxed text-foreground/70">{card.voorWie}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground/80">Wat meestal logisch is</dt>
                        <dd className="leading-relaxed text-foreground/70">{card.logisch}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground/80">Waar op te letten</dt>
                        <dd className="leading-relaxed text-foreground/70">{card.letten}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Gebruik de calculator hieronder om de dikte per materiaal te zien bij uw gewenste Rc-waarde.
              </p>
            </section>

            {/* ══ 2. Typische ranges ══ */}
            <section id="typische-ranges" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Richtwaarden"
                heading="Typische diktes en"
                accent="Rc-ranges"
                lead="De meeste woningprojecten vallen binnen vaste bandbreedtes — afhankelijk van woning, doel en detaillering."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Isolatiedikte",
                    value: "8 – 15 cm",
                    sub: "isolatiemateriaal",
                    note: "Meeste projecten vallen in dit bereik, afhankelijk van materiaal en Rc-doel.",
                  },
                  {
                    label: "Totale opbouw",
                    value: "10 – 18 cm",
                    sub: "gevel tot buitenkant pleister",
                    note: "Inclusief hechtlaag, wapeningslaag, primer en afwerklaag (±25–40 mm extra).",
                  },
                  {
                    label: "Rc-waarde",
                    value: "3,5 – 6,0",
                    sub: "m²K/W",
                    note: "Doorgaans Rc 3,5–6,0 — afhankelijk van woning, doel en detaillering.",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <div className="mt-2 flex items-end gap-1.5">
                      <span className="text-3xl font-black tabular-nums text-primary">{item.value}</span>
                      <span className="mb-0.5 text-xs font-semibold text-muted-foreground">{item.sub}</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>

              {/* Rc milestones */}
              <div className="mt-6 space-y-3">
                {[
                  { rc: "Rc 2,5",   kleur: "bg-muted",       label: "Basis verbetering — merkbare besparing, geen subsidie" },
                  { rc: "Rd 3,5+",  kleur: "bg-primary/10",  label: "Subsidiedrempel ISDE (Rd isolatiemateriaal, check actuele voorwaarden)" },
                  { rc: "Rc 4,7+",  kleur: "bg-primary/20",  label: "Referentie voor nieuwbouw of ingrijpende renovatie" },
                  { rc: "Rc 5,5+",  kleur: "bg-primary/30",  label: "Premium isolatie — optimaal voor bijna-energieneutrale renovatie" },
                ].map((row) => (
                  <div key={row.rc} className={`flex items-center gap-4 rounded-lg border border-border ${row.kleur} px-5 py-3`}>
                    <span className="w-16 shrink-0 text-sm font-black tabular-nums text-foreground">{row.rc}</span>
                    <span className="text-sm text-foreground/70">{row.label}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                * Bovenstaande grenswaarden zijn indicatief en kunnen wijzigen. Controleer altijd de actuele subsidievoorwaarden of vraag ons om advies.
              </p>
            </section>

            {/* ══ 3. Interactieve calculator ══ */}
            <section id="dikte-per-materiaal" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Rekentool"
                heading="Dikte per materiaal"
                accent="(indicatief)"
                lead="Schuif de gewenste Rc-waarde en zie direct hoeveel millimeter isolatie elk materiaal nodig heeft. Exacte diktes worden bepaald tijdens de opname."
              />

              <RcWaardeDikteCalculator />
            </section>

            {/* ══ 4. Waarom details belangrijk zijn ══ */}
            <section id="details-belang" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Koudebruggen & details"
                heading="Waarom details"
                accent="belangrijk zijn"
                lead="Een goede Rc-waarde in het vlak is pas het halve werk. Koudebruggen op kritieke aansluitpunten kunnen een groot deel van de thermische winst tenietdoen."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    h3: "Dagkanten (kozijnlijsten)",
                    tekst:
                      "Rondom ramen en deuren liggen dagkanten bloot aan de buitentemperatuur. Zonder isolatie op de dagkant ontstaat een koudebrug direct naast het kozijn. Wij isoleren dagkanten met een minimale dikte van 20–30 mm EPS of PIR, aansluitend op het kozijn met kitnaden.",
                    bullets: [
                      "Minimaal 20 mm isolatie op de dagkant",
                      "Kitnaden rondom het kozijn voor luchtdichtheid",
                      "Aansluiting op het kozijn-profiel zonder breuk",
                    ],
                  },
                  {
                    h3: "Plint en fundering",
                    tekst:
                      "De overgang van buitengevelisolatie naar de fundering of begane grondvloer is een klassiek zwakke plek. Een vorstbestendig plintprofiel en een doorlopende isolatielaag tot onderaan de gevel helpen te voorkomen dat warmte wegvloeit via de betonnen of gemetselde constructie.",
                    bullets: [
                      "Vorstbestendige plintprofielen en startprofiel",
                      "Isolatie minimaal 30 cm onder maaiveld doorlopen",
                      "XPS voor de ondergrondse zone (vochtbestendig)",
                    ],
                  },
                  {
                    h3: "Hoeken en gevelvlakken",
                    tekst:
                      "Bij hoeken van de woning wordt de isolatielaag dunner als de detaillering niet klopt. Verankering, diagonale wapeningsnetten en hoekprofielen zorgen voor doorlopende isolatiewaarde zonder knik of koudebrug.",
                    bullets: [
                      "Diagonale wapeningsstroken in hoeken",
                      "Hoekprofielen voor bescherming en uitlijning",
                      "Doorlopende isolatielaag zonder onderbrekingen",
                    ],
                  },
                  {
                    h3: "Kozijn-aansluitingen",
                    tekst:
                      "Waar kozijnen vastzitten in de gevel is de overgang kritiek. Een flexibele kitnaat en isolatieband achter het kozijnprofiel voorkomen luchtlekkage en condensatie — zeker bij oudere kozijnen die niet volledig aanliggen.",
                    bullets: [
                      "Compriband en voorgevormde isolatieband",
                      "Flexibele kit in bewegingsnaden",
                      "Aansluiting op bestaand kozijn of nieuw kozijn",
                    ],
                  },
                ].map((sub) => (
                  <div key={sub.h3} className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-sm">
                    <h3 className="mb-2 text-base font-bold text-foreground">{sub.h3}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{sub.tekst}</p>
                    <BulletList items={sub.bullets} />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm leading-relaxed text-foreground/80">
                  <span className="font-semibold text-primary">Let op:</span>{" "}
                  Een WDVS-systeem is zo goed als zijn zwakste detail. Wij werken met gecertificeerde ETICS-systemen waarbij alle aansluitingen in het systeemdossier zijn vastgelegd. Zo blijft de systeemcertificering van het gehele ETICS-pakket intact.
                </p>
              </div>
            </section>

            {/* ══ 5. Opname checklist ══ */}
            <section id="opname-checklist" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Gratis opname op locatie"
                heading="Wat we checken bij"
                accent="de opname"
                lead="Bij de gratis opname beoordelen wij uw woning op alle factoren die de juiste Rc-keuze en detaillering bepalen. Dat voorkomt verrassingen achteraf."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-muted/20 p-6">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Gevel & constructie
                  </p>
                  <BulletList
                    items={[
                      "Huidige gevelopbouw en dikte buitenspouwblad",
                      "Staat van bestaand metselwerk of stucwerk",
                      "Aanwezigheid van spouwmuurisolatie",
                      "Overstekken, dakranden en bestaande profielen",
                      "Uitsprong van kozijnen (ruimte voor dagkanten)",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-border bg-muted/20 p-6">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Energie & subsidie
                  </p>
                  <BulletList
                    items={[
                      "Huidige energielabel of energieverbruik",
                      "Gewenste Rc-waarde op basis van doel en budget",
                      "Subsidiegeschiktheid (ISDE drempelwaarden)",
                      "Vergunningplicht op basis van monument of omgevingsplan",
                      "Combinatie met zonnepanelen of warmtepomp (warmtevraag)",
                    ]}
                  />
                </div>
              </div>

            </section>

            {/* ══ 6. FAQ ══ */}
            <section id="faq" className="scroll-mt-24">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

                {/* Left sticky header */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                        FAQ
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      Veelgestelde
                      <br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Alles over Rc-waarden, isolatiediktes, materialen en details bij buitengevelisolatie.
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
                  <FaqAccordion items={faqItems} defaultOpen={0} />
                </div>
              </div>
            </section>

            {/* ══ Related links ══ */}
            <nav aria-label="Gerelateerde pagina's">
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
                    className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card/80 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{link.label}</p>
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
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
      </div>

      </div>{/* end below-fold */}

      <StickyCTABar />
      <QuoteModal dienst="gevelisolatie" />
    </>
  )
}
