"use client"

import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { useState } from "react"
import {
  Check,
  AlertTriangle,
  Flame,
  Droplets,
  ChevronDown,
  ArrowRight,
  Phone,
  Info,
  Home,
  Layers,
  Ruler,
  ShieldCheck,
  Wind,
  Hammer,
} from "lucide-react"

import StickyCTABar from "@/components/sections/gevelisolatie/sticky-cta-bar"
import SharedBreadcrumbs from "@/components/seo/Breadcrumbs"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface MateriaalRij {
  materiaal: "EPS" | "PIR" | "Minerale wol"
  lambda: string
  lambdaRange: [number, number]
  brandklasse: string
  brandKey: "A1" | "B" | "E"
  dampopen: "Ja" | "Nee" | "Beperkt"
  wanneer: string
  pluspunt: string
  aandachtspunt: string
  imageSrc: string
  beschrijving: string
}

interface FaqItem {
  vraag: string
  antwoord: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const materialen: MateriaalRij[] = [
  {
    materiaal: "EPS",
    lambda: "0,031 – 0,038",
    lambdaRange: [0.031, 0.038],
    brandklasse: "E of B-s1,d0",
    brandKey: "E",
    dampopen: "Beperkt",
    wanneer: "Veelzijdig inzetbaar bij droge tot normale gevels; goede prijs-kwaliteitverhouding",
    pluspunt: "Licht, gemakkelijk te bewerken en breed verkrijgbaar",
    aandachtspunt: "Beperkte dampopenheid; controleer vochthuishouding bij vochtige gevels",
    imageSrc: "/images/materiaal-eps.webp",
    beschrijving:
      "EPS (geëxpandeerd polystyreen) is het meest toegepaste isolatiemateriaal voor ETICS in Nederland. De gesloten cellenstructuur zorgt voor goede isolatiewaarden, een lage wateropname en een stevige hechting voor de wapeningslaag. EPS is licht van gewicht, wat de verwerking vergemakkelijkt en de belasting op de bevestiging beperkt.",
  },
  {
    materiaal: "PIR",
    lambda: "0,022 – 0,028",
    lambdaRange: [0.022, 0.028],
    brandklasse: "B-s1,d0",
    brandKey: "B",
    dampopen: "Nee",
    wanneer: "Hoge isolatiewaarde bij beperkte opbouwdikte nodig; stadswoningen met krappe uitdagingen",
    pluspunt: "Laagste lambdawaarde van de drie: dunste opbouw voor dezelfde RC-waarde",
    aandachtspunt: "Niet dampopen; niet geschikt voor alle geveltypen — vochtcheck vereist",
    imageSrc: "/images/materiaal-pir.webp",
    beschrijving:
      "PIR (polyisocyanuraat) is een stijf schuimisolatiemateriaal met de beste thermische prestaties per centimeter dikte. Dat maakt het aantrekkelijk wanneer de beschikbare ruimte voor de isolatieopbouw beperkt is, zoals bij smalle dagkanten of strikte esthetische eisen. PIR is echter volledig dampdicht, waardoor de vochthuishouding van de gevel extra aandacht vraagt.",
  },
  {
    materiaal: "Minerale wol",
    lambda: "0,035 – 0,040",
    lambdaRange: [0.035, 0.04],
    brandklasse: "A1",
    brandKey: "A1",
    dampopen: "Ja",
    wanneer: "Dampopenheid vereist, hoge brandveiligheid gewenst of gevel heeft vochtproblemen",
    pluspunt: "Onbrandbaar (A1), uitstekende dampopenheid en goede geluidsabsorptie",
    aandachtspunt: "Iets hogere lambdawaarde: dikker pakket nodig voor dezelfde RC-waarde",
    imageSrc: "/images/materiaal-minerale-wol.webp",
    beschrijving:
      "Minerale wol (steenwol of glaswol in plaatsvorm) is dampopen en brandwerend (klasse A1 — onbrandbaar). Daarmee is het de voorkeursoplossing voor gevels met vochtproblemen, voor panden met hoge brandveiligheidseisen (bijv. VvE-appartementen, utiliteit) en voor constructies waarbij de gevel moet kunnen 'ademen'. De hogere lambdawaarde betekent dat een iets dikkere plaat nodig is om dezelfde RC te bereiken.",
  },
]

const brandBadge: Record<string, { label: string; cls: string }> = {
  A1: { label: "A1 — Onbrandbaar", cls: "bg-green-100 text-green-700" },
  B: { label: "B — Moeilijk ontvlambaar", cls: "bg-blue-100 text-blue-700" },
  E: { label: "E/B — Basis brandklasse", cls: "bg-orange-100 text-orange-700" },
}

const dampBadge: Record<string, { label: string; cls: string }> = {
  Ja: { label: "Dampopen", cls: "bg-teal-100 text-teal-700" },
  Beperkt: { label: "Beperkt dampopen", cls: "bg-yellow-100 text-yellow-700" },
  Nee: { label: "Niet dampopen", cls: "bg-muted text-muted-foreground" },
}

// lambda score for visual bar (higher = better per cm)
const lambdaScore: Record<string, number> = { EPS: 2, PIR: 3, "Minerale wol": 1 }

// ─────────────────────────────────────────────────────────────────────────────
// TOC
// ─────────────────────────────────────────────────────────────────────────────

const toc = [
  { id: "snelle-keuzehulp", label: "Snelle keuzehulp" },
  { id: "vergelijking", label: "Vergelijking" },
  { id: "materiaalkeuze-factoren", label: "Factoren materiaalkeuze" },
  { id: "materiaal-afwerking", label: "Materiaal & afwerking" },
  { id: "materiaal-kosten", label: "Materiaal & kosten" },
  { id: "faq", label: "Veelgestelde vragen" },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQ data (materialen-specific)
// ─────────────────────────────────────────────────────────────────────────────

const faqItems: FaqItem[] = [
  {
    vraag: "Wat is het verschil tussen EPS en PIR voor gevelisolatie?",
    antwoord:
      "EPS (geëxpandeerd polystyreen) heeft een lambdawaarde van circa 0,031–0,038 W/(m·K) en is dampbeperkt. PIR heeft een lagere lambda (0,022–0,028), waardoor bij dezelfde RC-waarde een dunnere plaat volstaat. PIR is volledig dampdicht. EPS is de meest toegepaste en prijstechnisch meest aantrekkelijke keuze; PIR past beter wanneer ruimte schaars is.",
  },
  {
    vraag: "Wat betekent dampopenheid en waarom is dat belangrijk?",
    antwoord:
      "Dampopenheid geeft aan in hoeverre waterdamp door het materiaal kan diffunderen. Bij een dampopen gevel (bijvoorbeeld minerale wol) kan vocht dat in de constructie terechtkomt makkelijker naar buiten ontwijken. EPS is beperkt dampopen en PIR is volledig dampdicht. Voor gevels met bestaande vochtproblemen of houtskeletbouw is een dampopen oplossing (minerale wol) vaak de veiligste keuze.",
  },
  {
    vraag: "Is minerale wol veiliger bij brand dan EPS of PIR?",
    antwoord:
      "Ja. Minerale wol heeft brandklasse A1 (onbrandbaar). EPS valt in klasse E of B-s1,d0 en PIR in klasse B-s1,d0. Bij appartementencomplexen of panden met hoge brandveiligheidseisen schrijven verzekeraars of overheden soms klasse A1 voor. Controleer altijd de specifieke projecteisen.",
  },
  {
    vraag: "Welke dikte heb ik nodig voor RC 3,5 of RC 5?",
    antwoord:
      "De benodigde dikte verschilt per materiaal. Als indicatie: voor RC 3,5 m²K/W heeft u met EPS (λ≈0,036) circa 12–13 cm nodig, met PIR (λ≈0,025) circa 9 cm en met minerale wol (λ≈0,038) circa 13–14 cm. Voor RC 5 komen die diktes op circa 18, 12 en 19 cm respectievelijk. Exacte waarden volgen na berekening op basis van uw specifieke productkeuze.",
  },
  {
    vraag: "Zijn steenstrips geschikt op alle drie de materialen?",
    antwoord:
      "Steenstrips zijn relatief zwaar (circa 20–35 kg/m²). Niet alle isolatieplaten zijn direct geschikt als drager voor steenstrips — de opbouw (bevestiging, wapeningslaag) moet hierop worden berekend. EPS in een hogere dichtheid en minerale wol worden het meest toegepast voor steenstrips-ETICS. PIR is minder gebruikelijk in combinatie met steenstrips. Wij berekenen de draagkracht per situatie.",
  },
  {
    vraag: "Hoe lang gaan EPS, PIR en minerale wol mee?",
    antwoord:
      "Bij correct aangebrachte ETICS met een goed onderhouden afwerklaag is de technische levensduur van alle drie de materialen minimaal 25–40 jaar. Minerale wol rot niet en is onbrandbaar; EPS en PIR kunnen bij directe UV-blootstelling verouderen, maar zijn in een ETICS-opbouw volledig afgeschermd. De afwerklaag (stuc, sierpleister) bepaalt grotendeels het visuele onderhoud.",
  },
  {
    vraag: "Wat is de invloed van het materiaal op de totale prijs?",
    antwoord:
      "EPS is doorgaans het goedkoopste isolatiemateriaal; minerale wol en PIR zijn duurder in aanschaf. Bij PIR kan een dunnere plaat het prijsverschil gedeeltelijk compenseren (minder materiaalvolume, lichtere steiger). Minerale wol vraagt vaak iets meer arbeidstijd door het gewicht. Het exacte effect op de totaalprijs varieert per project; na opname geven wij een vergelijkend overzicht.",
  },
  {
    vraag: "Mag ik zelf het materiaal kiezen?",
    antwoord:
      "In overleg absoluut. Wij adviseren op basis van uw gevel, uw wensen (RC-doel, budget, brandklasse, dampopenheid) en de specifieke projectsituatie. Sommige ETICS-systemen schrijven het te gebruiken materiaal voor, maar binnen die keuze bespreken wij de opties met u.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({
  overline,
  title,
  titleAccent,
  subtitle,
}: {
  overline: string
  title: string
  titleAccent?: string
  subtitle?: string
}) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">{overline}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}{" "}
        {titleAccent && <span className="text-primary">{titleAccent}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function MaterialenPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const current = materialen[activeTab]
  const brand = brandBadge[current.brandKey]
  const damp = dampBadge[current.dampopen]
  const score = lambdaScore[current.materiaal] ?? 2

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
      <Script
        id="faq-materialen-schema"
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
                  Gevelisolatie · Materialen · Regio Rotterdam
                </p>
                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  Materialen voor buitengevelisolatie:{" "}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    EPS, PIR of minerale wol
                          </span>
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Vergelijk isolatieplaten voor ETICS op diktes, brandklasse, dampopenheid en afwerking. Persoonlijk advies op locatie in de regio Rotterdam en Zuid-Holland.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center gap-2 bg-[#E8600A] text-white font-semibold px-7 py-4 text-sm tracking-wide hover:bg-[#d0540a] transition-colors rounded-sm"
                  >
                    Plan gratis inspectie
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

      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">

          {/* Breadcrumbs */}
          <SharedBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Diensten", href: "/diensten/" },
              { label: "Gevelisolatie", href: "/gevelisolatie/" },
              { label: "Materialen" },
            ]}
            className="mb-6"
          />

          {/* TOC */}
          <nav aria-label="Inhoudsopgave" className="relative mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
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

          <div className="space-y-20">

            {/* ── 1. Snelle keuzehulp ── */}
            <section id="snelle-keuzehulp" className="scroll-mt-24">
              <SectionHeader
                overline="Keuzehulp"
                title="Snelle keuzehulp:"
                titleAccent="welk materiaal past bij u?"
                subtitle="Beantwoord drie vragen en u weet al in welke richting u moet zoeken. Wij bevestigen de keuze altijd tijdens de opname ter plaatse."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Droplets,
                    vraag: "Heeft de gevel vochtproblemen of moet de constructie kunnen ademen?",
                    antwoord: "Kies minerale wol — dampopen en vochtbestendig.",
                  },
                  {
                    icon: Ruler,
                    vraag: "Is de beschikbare opbouwdikte beperkt (bijv. krappe dagkanten)?",
                    antwoord: "Overweeg PIR — de dunste opbouw voor dezelfde RC-waarde.",
                  },
                  {
                    icon: ShieldCheck,
                    vraag: "Gelden er strikte brandveiligheidseisen (VvE, utiliteit)?",
                    antwoord: "Kies minerale wol — brandklasse A1, onbrandbaar.",
                  },
                  {
                    icon: Hammer,
                    vraag: "Wilt u de beste prijs-kwaliteitverhouding voor een normale gevel?",
                    antwoord: "EPS is de standaard keuze — licht, bewerkbaar en breed inzetbaar.",
                  },
                  {
                    icon: Wind,
                    vraag: "Speelt geluidsisolatie ook een rol?",
                    antwoord: "Minerale wol absorbeert geluid beter dan EPS of PIR.",
                  },
                  {
                    icon: Layers,
                    vraag: "Wilt u steenstrips als afwerking?",
                    antwoord: "EPS (hoge dichtheid) of minerale wol — berekening draagkracht vereist.",
                  },
                ].map(({ icon: Icon, vraag, antwoord }) => (
                  <div
                    key={vraag}
                    className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{vraag}</p>
                    <div className="mt-auto flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                      <p className="text-xs leading-snug text-muted-foreground">{antwoord}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[11px] text-muted-foreground/60 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 shrink-0" />
                Twijfelt u nog? Wij beoordelen de optimale keuze altijd tijdens de gratis opname ter plaatse.
              </p>
            </section>

            {/* ── 2. Vergelijking (tabs + kaart) ── */}
            <section id="vergelijking" className="scroll-mt-24">
              <SectionHeader
                overline="Materialen"
                title="EPS, PIR"
                titleAccent="of minerale wol?"
                subtitle="De keuze hangt af van RC-doel, vochtgedrag, brandklasse en afwerking. Klik op een materiaal voor alle details."
              />

              {/* Mobile: 1×3 photo grid */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:hidden">
                {materialen.map((mat, i) => (
                  <button
                    key={mat.materiaal}
                    onClick={() => setActiveTab(i)}
                    className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${activeTab === i ? "border-primary" : "border-transparent"}`}
                  >
                    <Image
                      src={mat.imageSrc}
                      alt={mat.materiaal}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className={`absolute inset-0 transition-colors ${activeTab === i ? "bg-primary/50" : "bg-black/45"}`} />
                    <span className="absolute inset-0 flex items-end justify-center pb-2 text-xs font-bold text-white">
                      {mat.materiaal}
                    </span>
                    {activeTab === i && (
                      <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop: pill tabs */}
              <div className="mt-6 hidden gap-2 sm:flex">
                {materialen.map((mat, i) => (
                  <button
                    key={mat.materiaal}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      activeTab === i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span className={`text-[10px] font-black tabular-nums ${activeTab === i ? "text-white/70" : "text-border"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {mat.materiaal}
                  </button>
                ))}
              </div>

              {/* Active card */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">
                  {/* Photo */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={current.imageSrc}
                      alt={current.materiaal}
                      fill
                      className="object-cover transition-all duration-500"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 lg:hidden">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {current.materiaal}
                      </span>
                      <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white">
                        λ {current.lambda}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 p-6 lg:p-8">
                    <div>
                      <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.materiaal}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {current.beschrijving}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${brand.cls}`}>
                          <Flame className="h-3 w-3" />
                          {brand.label}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${damp.cls}`}>
                          <Droplets className="h-3 w-3" />
                          {damp.label}
                        </span>
                        <span className="ml-auto flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">λ {current.lambda}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 3 }, (_, di) => (
                              <div key={di} className={`h-2 w-5 rounded-full ${di < score ? "bg-primary" : "bg-border"}`} />
                            ))}
                          </div>
                        </span>
                      </div>
                    </div>

                    {/* Wanneer kiezen */}
                    <div>
                      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Wanneer kiezen</p>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{current.wanneer}</p>
                    </div>

                    {/* Plus/aandacht */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Pluspunt</p>
                          <p className="mt-1 text-sm leading-snug text-foreground/70">{current.pluspunt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500/70" />
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Aandachtspunt</p>
                          <p className="mt-1 text-sm leading-snug text-foreground/70">{current.aandachtspunt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison table */}
              <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[600px] text-sm">
                  <caption className="sr-only">Vergelijking isolatiematerialen voor ETICS gevelisolatie</caption>
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {["Materiaal", "Lambda (indicatie)", "Brandklasse (indicatie)", "Dampopen", "Sterkte per cm"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {materialen.map((mat) => {
                      const bb = brandBadge[mat.brandKey]
                      const db = dampBadge[mat.dampopen]
                      const sc = lambdaScore[mat.materiaal] ?? 2
                      return (
                        <tr key={mat.materiaal} className="bg-card transition-colors hover:bg-primary/5">
                          <td className="px-4 py-3 font-bold text-foreground">{mat.materiaal}</td>
                          <td className="px-4 py-3 text-foreground/70 tabular-nums">{mat.lambda}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${bb.cls}`}>
                              {mat.brandklasse}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${db.cls}`}>
                              {mat.dampopen}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {Array.from({ length: 3 }, (_, di) => (
                                <div key={di} className={`h-2 w-5 rounded-full ${di < sc ? "bg-primary" : "bg-border"}`} />
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p className="border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground/70 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  Indicatieve waarden en klassen — waarden en klassen verschillen per product/systeem. Exacte specificaties volgen na productselectie en projectbeoordeling.
                </p>
              </div>
            </section>

            {/* ── 3. Factoren materiaalkeuze ── */}
            <section id="materiaalkeuze-factoren" className="scroll-mt-24">
              <SectionHeader
                overline="Keuze"
                title="Waar let u op bij"
                titleAccent="materiaalkeuze?"
                subtitle="Een goede materiaalkeuze is meer dan alleen de lambdawaarde. Hieronder de zes belangrijkste aspecten die wij meewegen tijdens de opname."
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "RC-waarde & dikte",
                    icon: Ruler,
                    tekst:
                      "Het RC-doel (comfortisolatie vs. maximale besparing) bepaalt de benodigde dikte. PIR bereikt dezelfde RC met minder centimeters, wat gunstig is bij krappe details. EPS en minerale wol hebben iets meer ruimte nodig.",
                  },
                  {
                    title: "Vocht & dampopenheid",
                    icon: Droplets,
                    tekst:
                      "Een dampopen gevelopbouw laat waterdamp vrijuit ontwijken. Bij een vochtige of capillaire ondergrond, of bij houtskeletbouw, is minerale wol de veiligste keuze. EPS is beperkt dampopen; PIR is volledig dampdicht.",
                  },
                  {
                    title: "Brandveiligheid",
                    icon: Flame,
                    tekst:
                      "Minerale wol (A1) is onbrandbaar en is vaak vereist bij appartementen, utiliteitsgebouwen of panden waarbij de verzekeraar of gemeente hogere brandklassen voorschrijft. EPS en PIR vallen in lagere brandklassen.",
                  },
                  {
                    title: "Conditie van de gevel",
                    icon: Home,
                    tekst:
                      "Bij sterk verweerd of beschadigd metselwerk moet de ondergrond eerst worden hersteld. De staat van de gevel bepaalt ook welk bevestigingssysteem (lijm vs. mechanisch) het beste past, wat de materiaalkeuze kan beïnvloeden.",
                  },
                  {
                    title: "Impactbestendigheid",
                    icon: ShieldCheck,
                    tekst:
                      "Op begane grondniveau, rondom deuren of bij garages is de wapeningslaag aan extra belasting blootgesteld. EPS en minerale wol in hogere dichtheid bieden meer weerstand. In de plintsone wordt soms XPS toegepast.",
                  },
                  {
                    title: "Afwerking (stuc vs. steenstrips)",
                    icon: Layers,
                    tekst:
                      "Steenstrips zijn zwaarder dan stuc of sierpleister. Niet alle materiaalcombinaties zijn gecertificeerd voor steenstrips-ETICS. EPS (hoge dichtheid) en minerale wol worden het meest toegepast; PIR is minder gebruikelijk als drager voor steenstrips.",
                  },
                ].map(({ title, icon: Icon, tekst }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 4. Materiaal × afwerking ── */}
            <section id="materiaal-afwerking" className="scroll-mt-24">
              <SectionHeader
                overline="Combinaties"
                title="Materiaal en afwerking:"
                titleAccent="welke combinaties werken?"
                subtitle="Niet elk isolatiemateriaal past bij elke afwerking. Onderstaand overzicht laat zien welke combinaties gangbaar zijn."
              />

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[520px] text-sm">
                  <caption className="sr-only">Combinaties isolatiemateriaal en gevelafwerking</caption>
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Afwerking
                      </th>
                      {materialen.map((m) => (
                        <th key={m.materiaal} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {m.materiaal}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        afwerking: "Stuc (glad)",
                        eps: "✓ Gangbaar",
                        pir: "✓ Mogelijk",
                        wol: "✓ Gangbaar",
                        epsCls: "text-green-700",
                        pirCls: "text-green-700",
                        wolCls: "text-green-700",
                      },
                      {
                        afwerking: "Sierpleister / crepi",
                        eps: "✓ Meest gebruikt",
                        pir: "✓ Mogelijk",
                        wol: "✓ Gangbaar",
                        epsCls: "text-green-700 font-semibold",
                        pirCls: "text-green-700",
                        wolCls: "text-green-700",
                      },
                      {
                        afwerking: "Steenstrips",
                        eps: "✓ (hoge dichtheid)",
                        pir: "○ Minder gebruikelijk",
                        wol: "✓ Gangbaar",
                        epsCls: "text-green-700",
                        pirCls: "text-amber-700",
                        wolCls: "text-green-700",
                      },
                    ].map((row) => (
                      <tr key={row.afwerking} className="bg-card hover:bg-primary/5 transition-colors">
                        <td className="px-4 py-3 font-semibold text-foreground">{row.afwerking}</td>
                        <td className={`px-4 py-3 text-sm ${row.epsCls}`}>{row.eps}</td>
                        <td className={`px-4 py-3 text-sm ${row.pirCls}`}>{row.pir}</td>
                        <td className={`px-4 py-3 text-sm ${row.wolCls}`}>{row.wol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground/70 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  Toepasbaarheid hangt af van de systeemcertificering, opbouwdikte en projectspecifieke eisen. ✓ = gangbaar binnen ETICS; ○ = minder gangbaar — altijd project-specifiek beoordelen.
                </p>
              </div>

              {/* ETICS system stack */}
              <div className="mt-8">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  ETICS-systeemopbouw (kort)
                </p>
                <div className="space-y-1.5">
                  {[
                    "Bestaande gevel (draagconstructie)",
                    "Lijmlaag en/of mechanische bevestiging (pluggen)",
                    "Isolatieplaten (EPS, PIR of minerale wol) ← materiaalkeuze hier",
                    "Wapeningslaag (lijmmortel + glasvezelweefsel)",
                    "Afwerklaag (stuc, sierpleister, crepi of steenstrips)",
                  ].map((laag, i) => {
                    const isIsolatie = i === 2
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-4 rounded-lg px-4 py-3 ${
                          isIsolatie ? "border-2 border-primary bg-primary/5" : "border border-border bg-muted/20"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                            isIsolatie ? "bg-primary text-white" : "bg-border text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className={`text-sm ${isIsolatie ? "font-semibold text-foreground" : "text-foreground/70"}`}>
                          {laag}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* ── 5. Materiaal & kosten ── */}
            <section id="materiaal-kosten" className="scroll-mt-24">
              <SectionHeader
                overline="Kosten"
                title="Materiaal en kosten:"
                titleAccent="kwalitatieve vergelijking"
                subtitle="De materiaalkeuze beïnvloedt de totaalprijs, maar is slechts één factor. Onderstaand overzicht geeft een kwalitatieve indicatie — géén exacte prijzen."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    mat: "EPS",
                    materiaalkosten: "Laag",
                    arbeidskosten: "Laag",
                    dikteEffect: "Normaal",
                    totaalIndicatie: "Meest economisch",
                    highlight: false,
                  },
                  {
                    mat: "PIR",
                    materiaalkosten: "Hoog",
                    arbeidskosten: "Laag – gemiddeld",
                    dikteEffect: "Dunner = minder volume",
                    totaalIndicatie: "Duurder in aanschaf; dunnere opbouw compenseert deels",
                    highlight: false,
                  },
                  {
                    mat: "Minerale wol",
                    materiaalkosten: "Gemiddeld – hoog",
                    arbeidskosten: "Gemiddeld (zwaarder)",
                    dikteEffect: "Normaal – iets dikker",
                    totaalIndicatie: "Vergelijkbaar of iets hoger dan EPS",
                    highlight: false,
                  },
                ].map((item) => (
                  <div key={item.mat} className="rounded-xl border border-border bg-card p-6">
                    <p className="mb-4 text-base font-bold text-foreground">{item.mat}</p>
                    <div className="space-y-3">
                      {[
                        { label: "Materiaalkosten", value: item.materiaalkosten },
                        { label: "Arbeidskosten", value: item.arbeidskosten },
                        { label: "Dikteeffect op opbouw", value: item.dikteEffect },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-2 text-sm">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-semibold text-foreground text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/5 px-3 py-2.5 border border-primary/15">
                      <p className="text-xs leading-snug text-foreground/70">{item.totaalIndicatie}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Exacte prijs na gratis opname ter plaatse</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Bovenstaande is een kwalitatieve indicatie. De totaalprijs wordt bepaald door het te isoleren oppervlak, de detaillering (dagkanten, plint, hoeken), de afwerking en de toegankelijkheid van de gevel. Na de opname ontvangt u een heldere offerte per m² inclusief RC-waarde, dikte en materiaalkeuze.
                  </p>
                  <Link
                    href="/gevelisolatie/kosten/"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Meer over kosten & richtprijzen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* ── 6. FAQ ── */}
            <section id="faq" className="scroll-mt-24">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

                {/* Left: sticky header */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde
                      <br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Alles wat u wilt weten over EPS, PIR en minerale wol als gevelisolatiemateriaal — van keuze en prestaties tot kosten en compatibiliteit.
                    </p>
                    <p className="mt-8 text-sm text-muted-foreground">
                      Staat uw vraag er niet tussen?{" "}
                      <Link href="/contact/" className="font-semibold text-primary hover:underline">
                        Neem contact op
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Right: accordion */}
                <div className="lg:col-span-7">
                  <div className="space-y-3">
                    {faqItems.map((item, idx) => {
                      const isOpen = openFaq === idx
                      return (
                        <div
                          key={idx}
                          className={`overflow-hidden rounded-xl border transition-all ${
                            isOpen ? "border-primary/40 bg-card shadow-md" : "border-border bg-card shadow-sm"
                          }`}
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                            aria-expanded={isOpen}
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

            {/* ── Related links ── */}
            <nav aria-label="Gerelateerde pagina's" className="mt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Meer informatie
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    label: "Gevelisolatie — overzicht",
                    description: "Alles over ETICS, werkwijze, voordelen en meer",
                    href: "/gevelisolatie/",
                    highlight: false,
                  },
                  {
                    label: "Kosten gevelisolatie",
                    description: "Richtprijzen per m², kostenfactoren en prijsopbouw",
                    href: "/gevelisolatie/kosten/",
                    highlight: false,
                  },
                  {
                    label: "Afwerkingen",
                    description: "Stuc, sierpleister, crepi of steenstrips — keuze en vergelijking",
                    href: "/gevelisolatie/afwerkingen",
                    highlight: false,
                  },
                  {
                    label: "RC-waarde & dikte",
                    description: "Benodigde RC-waarde berekenen en isolatiedikte kiezen",
                    href: "/gevelisolatie/rc-waarde-dikte",
                    highlight: false,
                  },
                  {
                    label: "Subsidie & vergunning",
                    description: "Vergunningplicht en subsidiemogelijkheden voor isolatie",
                    href: "/gevelisolatie/subsidie-vergunning",
                    highlight: false,
                  },
                  {
                    label: "Plan gratis inspectie",
                    description: "Vraag een gratis opname en offerte aan op locatie",
                    href: "/contact/",
                    highlight: true,
                  },
                ].map((link) => (
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
