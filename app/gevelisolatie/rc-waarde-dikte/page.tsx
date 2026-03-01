"use client"

import Link from "next/link"
import Script from "next/script"
import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Phone,
} from "lucide-react"
import StickyCTABar from "@/components/sections/gevelisolatie/sticky-cta-bar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/* ─── TOC ─────────────────────────────────────────────── */
const toc = [
  { id: "rc-rd-lambda",      label: "Rc, Rd en lambda" },
  { id: "typische-ranges",   label: "Typische ranges" },
  { id: "dikte-per-materiaal", label: "Dikte per materiaal" },
  { id: "details-belang",    label: "Waarom details belangrijk zijn" },
  { id: "opname-checklist",  label: "Wat we checken bij de opname" },
  { id: "faq",               label: "Veelgestelde vragen" },
]

/* ─── Calculator constants ───────────────────────────── */
// lambda-D waarden voor WDVS (KOMO / fabrikant-gemiddelden NL)
const lambdaValues: Record<string, number> = {
  EPS:            0.038,
  PIR:            0.026,
  "Minerale wol": 0.035,
}
// extra opbouw WDVS: hechtlaag + wapeningslaag + afwerking ≈ 25–35 mm
const opbouwOpslag: Record<string, number> = { EPS: 3, PIR: 3, "Minerale wol": 4 }

const RC_MIN  = 1.5
const RC_MAX  = 6.0
const RC_STEP = 0.5
const RC_OPTIONS = Array.from(
  { length: Math.round((RC_MAX - RC_MIN) / RC_STEP) + 1 },
  (_, i) => +(RC_MIN + i * RC_STEP).toFixed(1),
)
const materialen = Object.keys(lambdaValues)

function calcDikte(rc: number, mat: string) {
  const lambda = lambdaValues[mat] ?? 0.038
  const mm = rc * lambda * 1000
  return Math.round(mm / 5) * 5
}

function rcLabel(rc: number): { label: string; cls: string } {
  if (rc < 2.5) return { label: "Renovatie min.", cls: "bg-muted text-muted-foreground" }
  if (rc < 3.5) return { label: "Basis",          cls: "bg-muted text-muted-foreground" }
  if (rc < 4.7) return { label: "Subsidie ✓",     cls: "bg-primary/10 text-primary" }
  if (rc < 5.5) return { label: "Nieuwbouw ✓",    cls: "bg-primary/20 text-primary" }
  return              { label: "Premium",          cls: "bg-primary text-primary-foreground" }
}

/* ─── FAQ data ───────────────────────────────────────── */
const faqItems = [
  {
    vraag: "Is een Rc-waarde van 3,5 m²K/W voldoende voor mijn woning?",
    antwoord:
      "Rc 3,5 is de gangbare drempelwaarde voor energiesubsidies (ISDE/SEEH) en levert al een merkbare besparing op stookkosten. Voor oudere woningen met een slechte beginsituatie is Rc 3,5 een uitstekend startpunt. Wilt u het maximale resultaat of voldoen aan nieuwbouwprestaties, dan adviseren wij Rc 4,5 of hoger. Wij bepalen de optimale waarde tijdens de gratis opname.",
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
      "PIR heeft een lagere lambda-waarde (≈ 0,026 W/m·K) dan EPS (≈ 0,038 W/m·K), waardoor u bij dezelfde Rc-waarde een dunnere laag nodig heeft. Concreet: voor Rc 3,5 heeft EPS circa 135 mm nodig, PIR circa 95 mm — een verschil van ±40 mm. Dat maakt PIR aantrekkelijk waar de uitsprong beperkt moet blijven, al zijn de materiaalkosten iets hoger.",
  },
  {
    vraag: "Wat is het verschil tussen Rc en Rd?",
    antwoord:
      "Rd is de warmteweerstand van het isolatiemateriaal zelf (berekend als dikte gedeeld door lambda). Rc is de totale warmteweerstand van de volledige constructie: isolatie plus de aangrenzende lagen (gevel, pleisterwerk, luchtlagen). In de praktijk gaan we bij offerte en vergunning altijd uit van Rc, omdat dat de werkelijke isolatiekwaliteit van de gevelopbouw weergeeft.",
  },
  {
    vraag: "Geldt er een subsidie- of vergunningsvereiste voor een minimale Rc?",
    antwoord:
      "Voor subsidies (zoals ISDE of SEEH) geldt doorgaans een minimale Rd-waarde voor het isolatiepakket. Wij geven bij de offerte aan of uw project in aanmerking komt en welke documentatie vereist is. Een omgevingsvergunning is in de meeste gevallen niet nodig bij isolatie aan de eigen buitengevel, maar afhankelijk van gemeente en monument status kan dit afwijken.",
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
  { label: "Materialen",             href: "/gevelisolatie/materialen",       description: "EPS, PIR en minerale wol vergeleken" },
  { label: "Afwerkingen",            href: "/gevelisolatie/afwerkingen",      description: "Sierpleister, crepi, steenstrips en meer" },
  { label: "Subsidie & vergunning",  href: "/gevelisolatie/subsidie-vergunning", description: "ISDE, SEEH en wat u moet regelen" },
  { label: "Gratis inspectie",       href: "/contact/",                        description: "Plan een vrijblijvende opname", highlight: true },
]

/* ─── Schema ─────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.vraag,
    acceptedAnswer: { "@type": "Answer", text: item.antwoord },
  })),
}

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
  const [rc, setRc]           = useState(3.5)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const badge = rcLabel(rc)
  const pct   = ((rc - RC_MIN) / (RC_MAX - RC_MIN)) * 100

  return (
    <>
      <Script
        id="faq-rc-waarde-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)",
        }}
      >
        {/* Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-36 pb-16 sm:px-6 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-white/70 hover:text-white text-xs transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/diensten/" className="text-white/70 hover:text-white text-xs transition-colors">
                    Diensten
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/gevelisolatie/" className="text-white/70 hover:text-white text-xs transition-colors">
                    Gevelisolatie
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/80 text-xs">
                  Rc-waarde &amp; dikte
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Gevelisolatie · Rotterdam en omgeving
            </p>
            <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
              Rc-waarde en dikte:{" "}
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                hoeveel buitengevelisolatie heb je nodig?
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Van lambda-waarde tot totale opbouwdikte — begrijp welke Rc past bij uw woning in de regio Rotterdam en waarom details het verschil maken.
            </p>

            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-xs text-white/70">
                Actief in Rotterdam en omgeving (±80–100 km) · Zuid-Holland en omliggende regio's
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
              >
                Plan gratis inspectie
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/gevelisolatie/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
              >
                Terug naar gevelisolatie
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <a
                href="tel:+31612079808"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                +31 6 1207 9808
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">
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

          <div className="mt-16 space-y-20">

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
                      "De warmtegeleidingscoëfficiënt van het isolatiemateriaal. Hoe lager, hoe slechter het warmte geleidt — dus hoe beter de isolatie. EPS: λ ≈ 0,038 · PIR: λ ≈ 0,026 · Minerale wol: λ ≈ 0,035.",
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
                      "De totale warmteweerstand van de gehele gevelconstructie: isolatie + gevelmetselwerk + luchtlagen + binnenpleister. Rc is de maatstaf voor vergunningen, subsidies en energieberekeningen. Praktisch: Rc ≈ Rd + 0,20–0,40 voor een standaard WDVS-gevel.",
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
                  Voor subsidieaanvragen en bouwvergunningen gebruikt u altijd de Rc-waarde van de gehele gevelopbouw, niet de Rd van het isolatiemateriaal afzonderlijk. Wij vermelden beide in onze offerte.
                </p>
              </div>
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
                  <div key={item.label} className="rounded-xl border border-border bg-card p-6">
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
                  { rc: "Rc 1,3",   kleur: "bg-muted",       label: "Wettelijk renovatie minimum (Bouwbesluit)" },
                  { rc: "Rc 2,5",   kleur: "bg-muted",       label: "Basis verbetering — merkbare besparing, geen subsidie" },
                  { rc: "Rc 3,5+",  kleur: "bg-primary/10",  label: "Subsidiedrempel ISDE/SEEH (check actuele voorwaarden)" },
                  { rc: "Rc 4,7+",  kleur: "bg-primary/20",  label: "Nieuwbouwnorm — hoog comfortniveau" },
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

              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* Slider header */}
                <div className="border-b border-border px-6 py-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Gewenste Rc-waarde
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-5xl font-black tabular-nums text-foreground">
                          {rc.toFixed(1)}
                        </span>
                        <span className="text-lg font-semibold text-muted-foreground">m²K/W</span>
                        <span className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    <p className="hidden max-w-xs text-right text-xs leading-relaxed text-muted-foreground sm:block">
                      Indicatief — exacte dikte afhankelijk van woning, doel en detaillering
                    </p>
                  </div>

                  <div className="mt-5">
                    <input
                      type="range"
                      min={RC_MIN}
                      max={RC_MAX}
                      step={RC_STEP}
                      value={rc}
                      onChange={(e) => setRc(+e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--border)) ${pct}%)`,
                      }}
                      aria-label="RC-waarde selecteren"
                    />
                    <div className="mt-1.5 flex justify-between">
                      {RC_OPTIONS.map((v) => (
                        <span
                          key={v}
                          className={`text-[11px] font-semibold tabular-nums ${v === rc ? "text-primary" : "text-muted-foreground/50"}`}
                        >
                          {v.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Per materiaal */}
                <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {materialen.map((mat) => {
                    const dikte_mm  = calcDikte(rc, mat)
                    const opslag_cm = opbouwOpslag[mat] ?? 3
                    const totaal_cm = Math.round(dikte_mm / 10) + opslag_cm
                    const barPct    = Math.min(100, (dikte_mm / 240) * 100)
                    return (
                      <div key={mat} className="flex flex-col gap-3 p-5">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          {mat}
                        </p>
                        <p className="text-[11px] text-muted-foreground/60">
                          λ = {lambdaValues[mat].toFixed(3)} W/m·K
                        </p>
                        <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300"
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-black tabular-nums text-foreground">{dikte_mm}</span>
                          <span className="mb-0.5 text-sm font-semibold text-muted-foreground">mm isolatie</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Totale WDVS-opbouw: ca.{" "}
                          <span className="font-semibold text-foreground">{totaal_cm} cm</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Diktes afgerond op 5 mm (gangbare fabrikantmaten). Totale opbouw inclusief hechtlaag, wapeningslaag en afwerklaag. Afhankelijk van woning, doel en detaillering.
              </p>
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
                      "De overgang van buitengevelisolatie naar de fundering of begane grondvloer is een klassiek zwakke plek. Vorstbestand plintprofiel en een doorloopschuim tot onderaan de gevel voorkomen dat warmte wegvloeit via de betonnen of gemetselde constructie.",
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
                  <div key={sub.h3} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="mb-2 text-base font-bold text-foreground">{sub.h3}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{sub.tekst}</p>
                    <BulletList items={sub.bullets} />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm leading-relaxed text-foreground/80">
                  <span className="font-semibold text-primary">Let op:</span>{" "}
                  Een WDVS-systeem is zo goed als zijn zwakste detail. Wij werken met gecertificeerde ETICS-systemen waarbij alle aansluitingen in het systeemdossier zijn vastgelegd. Zo behoudt u de garantie op het gehele systeem.
                </p>
              </div>
            </section>

            {/* ══ 5. Opname checklist ══ */}
            <section id="opname-checklist" className="scroll-mt-24">
              <SectionHeader
                eyebrow="Gratis opname"
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
                      "Subsidiegeschiktheid (ISDE/SEEH drempelwaarden)",
                      "Vergunningplicht op basis van monument of bestemmingsplan",
                      "Combinatie met zonnepanelen of warmtepomp (warmtevraag)",
                    ]}
                  />
                </div>
              </div>

              {/* Mini CTA */}
              <div
                className="relative mt-6 overflow-hidden rounded-xl"
                style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2E2016 100%)" }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary opacity-[0.08] blur-3xl" />
                <div className="relative z-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      Vrijblijvend · Geen verplichtingen
                    </p>
                    <p className="mt-1 text-base font-bold text-white">
                      Gratis opname ter plaatse — reactie binnen 24–48 uur
                    </p>
                  </div>
                  <Link
                    href="/contact/"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d0540a]"
                  >
                    Plan inspectie
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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

                {/* Right accordion */}
                <div className="lg:col-span-7">
                  <div className="space-y-3">
                    {faqItems.map((item, idx) => {
                      const isOpen = openFaq === idx
                      return (
                        <div
                          key={idx}
                          className={`overflow-hidden rounded-xl border transition-all ${
                            isOpen
                              ? "border-primary/40 bg-card shadow-md"
                              : "border-border bg-card shadow-sm"
                          }`}
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                          >
                            <div className="flex items-start gap-4">
                              <span className={`mt-0.5 text-lg font-bold tabular-nums transition-colors ${isOpen ? "text-primary" : "text-border"}`}>
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-base font-semibold text-foreground sm:text-lg">
                                {item.vraag}
                              </span>
                            </div>
                            <ChevronDown
                              className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div className="overflow-hidden">
                              <div className="border-t border-border/50 px-6 pb-6 pt-4">
                                <div className="pl-12">
                                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {item.antwoord}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
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
                    className={`group flex items-start gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      link.highlight
                        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${link.highlight ? "text-white" : "text-foreground"}`}>
                        {link.label}
                      </p>
                      <p className={`mt-0.5 text-xs leading-snug ${link.highlight ? "text-white/75" : "text-muted-foreground"}`}>
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight
                      className={`mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        link.highlight ? "text-white/70" : "text-muted-foreground/40 group-hover:text-primary"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </nav>

          </div>
        </div>
      </main>

      <StickyCTABar />
    </>
  )
}
