"use client"

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { useState } from "react"
import {
  FileCheck,
  Euro,
  Check,
  ArrowRight,
  ChevronDown,
  Phone,
  ClipboardList,
  ShieldAlert,
  MapPin,
  Calendar,
  FileText,
  Home,
} from "lucide-react"

import StickyCTABar from "@/components/sections/gevelisolatie/sticky-cta-bar"
import MidPageCTA from "@/components/sections/gevelisolatie/mid-page-cta"

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — all copy lives here so the file stays readable
───────────────────────────────────────────────────────────────────────────── */

const PAGE_TITLE = "Subsidie & vergunning gevelisolatie buiten | BM Klus BV"
const PAGE_DESCRIPTION =
  "ISDE-subsidie en vergunningen bij buitengevelisolatie: voorwaarden op hoofdlijnen, stappenplan en praktische checklist. Check altijd gemeente/RVO."
const CANONICAL = "https://bm-klus-bv.nl/gevelisolatie/subsidie-vergunning/"

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Subsidie & vergunning", href: "/gevelisolatie/subsidie-vergunning" },
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
    titel: "Gratis opname",
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
      "Dien bij ISDE de subsidieaanvraag in vóór de startdatum van de werkzaamheden, of check de actuele aanvraagprocedure bij RVO. Wacht met uitvoering tot u zekerheid heeft over de aanvraag.",
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
      "Minimaal: de factuur van de uitgevoerde werkzaamheden, de technische omschrijving met materiaalspecificaties (inclusief lambda-waarde en RC-waarde), foto's van voor en na de uitvoering, en bewijsstukken dat de maatregel nog niet gestart was bij de aanvraag. Raadpleeg altijd de actuele documentatievereisten bij RVO.",
  },
  {
    vraag: "Kan ik subsidie aanvragen als ik slechts één gevel isoleer?",
    antwoord:
      "In veel gevallen kan dat. De voorwaarden voor regelingen zoals ISDE stellen doorgaans een minimumisolatieopppervlak en een minimale RC-waarde. Of één gevel voldoende is, hangt af van de oppervlakte en de actuele subsidieregelgeving. Check de voorwaarden bij RVO of vraag ons om advies.",
  },
  {
    vraag: "Wanneer moet ik de subsidie aanvragen: voor of na de uitvoering?",
    antwoord:
      "Bij ISDE dient u de aanvraag in ná uitvoering maar binnen de gestelde termijn. De werkzaamheden mogen pas starten nadat u zeker bent over de procedure. Check altijd de actuele aanvraagprocedure bij RVO, want deze kan per regeling en jaar wijzigen.",
  },
  {
    vraag: "Hoe lang duurt een vergunningsprocedure?",
    antwoord:
      "Een standaard omgevingsvergunning (reguliere procedure) kent wettelijk een beslistermijn van 8 weken, met eventueel 6 weken verlenging. Wij adviseren om dit ruim voor de gewenste startdatum aan te vragen.",
  },
  {
    vraag: "Helpen jullie ook bij de subsidieaanvraag zelf?",
    antwoord:
      "Wij ondersteunen u bij het verzamelen van de benodigde documenten en informatie. De formele indiening bij RVO doet u zelf of via een energieadviesbureau. Wij leveren altijd de technische specificaties die u nodig heeft.",
  },
  {
    vraag: "Geeft BM Klus BV garantie dat ik subsidie ontvang?",
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
    href: "/gevelisolatie/materialen",
    description: "EPS, PIR of minerale wol — wat kiest u?",
  },
  {
    label: "Afwerkingen",
    href: "/gevelisolatie/afwerkingen",
    description: "Stuc, sierpleister, crepi of steenstrips",
  },
  {
    label: "RC-waarde & dikte",
    href: "/gevelisolatie/rc-waarde-dikte",
    description: "Welke isolatiewaarde heeft u nodig?",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION (client component)
───────────────────────────────────────────────────────────────────────────── */

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqItems.map((item, idx) => {
        const isOpen = openIndex === idx
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
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`mt-0.5 text-lg font-bold tabular-nums transition-colors ${
                    isOpen ? "text-primary" : "text-border"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {item.vraag}
                </span>
              </div>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
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
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function SubsidieVergunningPage() {
  /* JSON-LD: BreadcrumbList + FAQPage */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((bc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: bc.label,
      item: `https://bm-klus-bv.nl${bc.href}`,
    })),
  }
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
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-subsidie-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />


      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#1A1A1A]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/subsidie-vergunning.webp"
            alt="Documentatie voor subsidie en vergunning gevelisolatie"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/80" />
        </div>

        {/* Orange glow accent */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary opacity-[0.08] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">

          {/* Breadcrumbs */}
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-white/70">
              {breadcrumbs.map((bc, i) => (
                <li key={bc.href} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link
                      href={bc.href}
                      className="transition-colors hover:text-white"
                    >
                      {bc.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{bc.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Label */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Subsidie & vergunning
            </span>
          </div>

          {/* H1 */}
          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Subsidie en vergunning voor{" "}
            <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
              buitengevelisolatie
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/50" />
            </span>
          </h1>

          {/* Lead */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Buitengevelisolatie kan in aanmerking komen voor de ISDE-subsidie. Tegelijkertijd is er
            soms een omgevingsvergunning nodig. In regio Rotterdam en omgeving checken wij dit
            vooraf voor u — gratis en vrijblijvend.
          </p>

          {/* Disclaimer banner */}
          <div className="mt-6 inline-flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="text-xs leading-relaxed text-white/60">
              De informatie op deze pagina is op hoofdlijnen en zonder juridische of financiële
              garanties. Raadpleeg altijd uw gemeente en{" "}
              <span className="text-white/80 font-medium">rvo.nl</span> voor actuele
              voorwaarden en bedragen.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+31612079808"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              <Phone className="h-4 w-4" />
              Bel direct
            </a>
          </div>
        </div>
      </header>

      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">
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
              <div className="space-y-5 rounded-xl border border-border bg-card p-6 lg:p-8">
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
                <Image
                  src="/images/subsidie-vergunning.webp"
                  alt="Controleren van vergunningsvereisten voor gevelisolatie"
                  width={380}
                  height={460}
                  className="h-64 w-full object-cover lg:h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
              <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
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
                      "Minimale RC-waarde (Rd) van isolatiemateriaal — check rvo.nl voor actuele norm",
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
              <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
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
                  BM Klus BV ondersteunt u bij elke stap waar wij een bijdrage kunnen leveren.
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
                regelmatig. BM Klus BV geeft geen subsidie- of juridische garanties. Controleer
                altijd de actuele regelgeving via{" "}
                <strong>rvo.nl</strong> en uw gemeente.
              </p>
            </div>
          </section>
        </div>

        {/* ── Mid-page CTA ───────────────────────────────────────────────── */}
        <div className="mt-20">
          <MidPageCTA />
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
                  className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
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
                    className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
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
                Plan gratis inspectie
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

              {/* Right: accordion */}
              <div className="lg:col-span-7">
                <FaqAccordion />
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
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
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

              {/* Contact highlight */}
              <Link
                href="/contact/"
                className="group flex items-start gap-4 rounded-xl border border-primary bg-primary p-5 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Contact opnemen</p>
                  <p className="mt-0.5 text-xs leading-snug text-white/75">
                    Vraag een gratis inspectie of offerte aan
                  </p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </nav>

        </div>
      </main>

      <StickyCTABar />
    </>
  )
}
