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
  PaintBucket,
  Droplets,
  Clock,
  Wrench,
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
export const metadata = buildPageMetadata("/muren-stucen/sausklaar-behangklaar/")

const base = SITE.canonicalBase

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen%20voor%20het%20stucen%20van%20mijn%20binnenmuren."

const PROJECT_DIR = "spijkenisse-malledijk-stucwerk-schilderwerk-2024"
const HERO_IMAGE = `${PROJECT_DIR}/${PROJECT_DIR}-na-01`
const SIDE_IMAGE = `${PROJECT_DIR}/${PROJECT_DIR}-na-02`

/* ── Static data ── */

const heroBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Muren stucen", href: "/muren-stucen/" },
  { label: "Sausklaar of behangklaar", href: "/muren-stucen/sausklaar-behangklaar/" },
]

const toc = [
  { id: "verschil",      label: "Het verschil" },
  { id: "welk-niveau",   label: "Welk niveau kiest u?" },
  { id: "voorstrijken",  label: "Voorstrijken, schuren & droogtijd" },
  { id: "werkwijze",     label: "Werkwijze" },
  { id: "faq",           label: "Veelgestelde vragen" },
]

const verschilCards = [
  {
    title: "Behangklaar",
    subtitle: "Egaal, lichte textuur toegestaan",
    icon: Layers,
    bullets: [
      "Egale ondergrond waarbij een lichte textuur is toegestaan",
      "Bedoeld als basis voor behang of zwaar structuurbehang",
      "Minder arbeidsintensief, dus lagere prijs per m²",
      "Niet geschikt om direct te schilderen: verf toont elke oneffenheid",
    ],
    voor: "Behang",
  },
  {
    title: "Sausklaar",
    subtitle: "Volledig glad, direct te sauzen",
    icon: Paintbrush2,
    bullets: [
      "Volledig glad afgewerkt, zonder zichtbare structuur",
      "Noodzakelijk voor schilderen met matte of zijdeglansverf",
      "Hogere eisen aan vlakheid en eindafwerking, dus arbeidsintensiever",
      "Een schilder moet direct kunnen sauzen zonder extra plamuurwerk",
    ],
    voor: "Verf of latex",
  },
]

const keuzes = [
  {
    title: "U gaat schilderen of sauzen",
    keuze: "Sausklaar",
    icon: PaintBucket,
    text: "Matte en zijdeglansverf maken elke oneffenheid zichtbaar. Alleen een volledig gladde wand geeft een strak resultaat.",
  },
  {
    title: "U gaat behangen",
    keuze: "Behangklaar",
    icon: Layers,
    text: "Behang overbrugt een lichte textuur. Sausklaar is hier meerwerk dat u niet terugziet.",
  },
  {
    title: "Renovatie van bestaand stucwerk",
    keuze: "Spackspuitwerk of sausklaar",
    icon: Wrench,
    text: "Is het bestaande stucwerk in goede staat, dan kan een gespoten egalisatielaag volstaan. Bij beschadigingen eerst herstel, daarna het gewenste niveau.",
  },
  {
    title: "Nieuwbouw",
    keuze: "Sausklaar, met voorstrijk",
    icon: Droplets,
    text: "Nieuwe wanden zuigen sterk. Een voorstrijk of primer egaliseert de zuigkracht vóór de afwerklaag; de meeste nieuwbouwwanden worden sausklaar opgeleverd voor verf.",
  },
]

const praktijk = [
  {
    title: "Voorstrijken",
    icon: Droplets,
    text: "Op zuigende ondergronden (nieuwbouw, gipsblokken) en bij wisselende zuigkracht is een voorstrijk of primer sterk aanbevolen. Het egaliseert de zuigkracht en verbetert de hechting van het stucwerk.",
  },
  {
    title: "Schuren en plamuren",
    icon: Wrench,
    text: "Correct sausklaar stucwerk vraagt geen extra plamuurwerk vóór het sauzen. Licht afstoffen of het wegnemen van een enkele korrel hoort bij het normale schilderwerk. Behangklaar stucwerk zal wél extra afwerking nodig hebben als u het alsnog wilt schilderen.",
  },
  {
    title: "Droogtijd",
    icon: Clock,
    text: "Gipspleister is doorgaans na circa 1 tot 2 weken voldoende droog voor een eerste verflaag, afhankelijk van dikte, temperatuur en ventilatie. Behangen kan pas als de wand volledig droog is en de juiste primer is aangebracht.",
  },
]

const werkwijzeStappen = [
  { step: "Opname op locatie", detail: "Ondergrond, oppervlak en gewenst afwerkingsniveau vastleggen" },
  { step: "Voorbereiding & afplakken", detail: "Vloer, kozijnen en aangrenzende vlakken afdekken; behang- en lijmresten verwijderen" },
  { step: "Herstel & voorstrijk", detail: "Scheuren behandelen, gaasband op kritieke zones, primer waar nodig" },
  { step: "Raapwerk (indien nodig)", detail: "Grove egalisatielaag op ruwe of ongelijke wanden" },
  { step: "Afwerklaag", detail: "Behangklaar of sausklaar egaal afwerken, nette hoeken en aansluitingen" },
  { step: "Oplevering & droogadvies", detail: "Wachttijd vóór schilderen of behangen voor uw situatie" },
]

const faqItems = [
  {
    vraag: "Wat betekent sausklaar stucen?",
    antwoord:
      "Sausklaar betekent letterlijk 'klaar om te sauzen': de wand is zo glad en egaal afgewerkt dat een schilder er direct muurverf of latex op kan aanbrengen, zonder eerst te plamuren. Het is het hoogste afwerkingsniveau van glad stucwerk. Omdat de term niet genormeerd is, leggen wij vooraf vast wat u mag verwachten: volledig glad, geen zichtbare structuur.",
  },
  {
    vraag: "Wat is het verschil tussen behangklaar en sausklaar?",
    antwoord:
      "Behangklaar stucwerk heeft een egale ondergrond waarbij een lichte textuur is toegestaan; het is bedoeld als basis voor behang. Sausklaar stucwerk is volledig glad afgewerkt zonder zichtbare structuur en is noodzakelijk voor schilderen met matte of zijdeglansverf. Sausklaar stelt hogere eisen aan de vlakheid en is daarmee arbeidsintensiever en duurder per m².",
  },
  {
    vraag: "Wat kost sausklaar stucen per m²?",
    antwoord:
      "De prijs per m² voor sausklaar stucwerk hangt af van de staat van de wand, het aantal lagen en het oppervlak; sausklaar vraagt meer arbeid dan behangklaar en is daardoor duurder per m². Ruwe of ongelijke wanden vragen eerst raapwerk, dat apart in de offerte staat. Kleine oppervlakken kunnen een starttarief hebben. De exacte prijs wordt na een gratis opname op locatie vastgesteld.",
  },
  {
    vraag: "Wat kost behangklaar stucen per m²?",
    antwoord:
      "Behangklaar stucwerk is voordeliger dan sausklaar omdat een lichte textuur is toegestaan en de afwerking minder arbeid vraagt. De prijs per m² hangt verder af van de staat van de ondergrond en het oppervlak. Ook hier geldt: exacte prijs na een gratis opname op locatie.",
  },
  {
    vraag: "Kan een stukadoor sausklaar stucen?",
    antwoord:
      "Ja. Sausklaar is een afwerkingsniveau van glad stucwerk dat de stukadoor aanbrengt; het is geen werk van de schilder. Wij leveren binnenmuren behangklaar of sausklaar op, afhankelijk van wat u er daarna mee wilt doen.",
  },
  {
    vraag: "Moet ik sausklaar stucwerk nog schuren voor het schilderen?",
    antwoord:
      "Bij correct sausklaar opgeleverd stucwerk is geen plamuurwerk meer nodig. Licht afstoffen of het wegnemen van een enkele korrel vóór het sauzen hoort bij het gewone schilderwerk. Is er wél veel schuur- of plamuurwerk nodig, dan was de wand feitelijk niet sausklaar.",
  },
  {
    vraag: "Kan een behangklare wand later alsnog sausklaar worden gemaakt?",
    antwoord:
      "Dat kan: de wand krijgt dan een extra dunne afwerklaag tot een volledig glad oppervlak. Het is arbeid bovenop het eerdere stucwerk, dus als u nu al weet dat u gaat schilderen, is direct sausklaar laten stucen voordeliger.",
  },
  {
    vraag: "Moet nieuwbouw worden voorgestreken vóór sausklaar stucwerk?",
    antwoord:
      "Ja, in vrijwel alle gevallen. Nieuwe wanden hebben een hoge zuigkracht; een voorstrijk of primer egaliseert die zuigkracht en zorgt voor een goede hechting van de afwerklaag. Zonder voorstrijk droogt het stucwerk te snel en ongelijk, met risico op vlekken en loslaten.",
  },
  {
    vraag: "Wat is het verschil tussen stucen en sauzen?",
    antwoord:
      "Stucen is het aanbrengen van een pleisterlaag op de wand door de stukadoor; het maakt de wand vlak en glad. Sauzen is het schilderen van die wand met muurverf of latex door de schilder. Sausklaar stucwerk is dus de stap vóór het sauzen.",
  },
  {
    vraag: "In welk gebied stucen jullie binnenmuren?",
    antwoord:
      "Wij werken in de regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's. Werkt u buiten dit gebied? Neem gerust contact op; in overleg is maatwerk mogelijk.",
  },
]

const relatedLinks: RelatedLinkItem[] = [
  {
    label: "Muren stucen (overzicht)",
    description: "Alle afwerkingsniveaus, werkwijze, voorbereiding en droogtijd van binnenstucwerk.",
    href: "/muren-stucen/",
  },
  {
    label: "Project: Spijkenisse Malledijk",
    description: "Binnenwanden opnieuw opgebouwd, strak afgewerkt en geschilderd (2024), met foto's voor en na.",
    href: "/onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/",
  },
  {
    label: "Buitenmuur stucen",
    description: "Zoekt u stucwerk voor de gevel in plaats van binnen? Dat is buiten stucwerk.",
    href: "/buiten-stucwerk/",
  },
  {
    label: "Onze werken",
    description: "Bekijk uitgevoerde stuc- en gevelprojecten in de regio.",
    href: "/onze-werken/",
  },
]

/* ── Page Component ── */
export default function SausklaarBehangklaarPage() {
  const breadcrumbsSchema = breadcrumbSchema(
    heroBreadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Sausklaar of behangklaar stucen",
    description:
      "Sausklaar of behangklaar stucen: het verschil, wanneer u welk niveau kiest, wat de prijs bepaalt, voorstrijken, schuren en droogtijd. Opname in regio Rotterdam.",
    url: `${base}/muren-stucen/sausklaar-behangklaar/`,
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
            baseName={HERO_IMAGE}
            dir="/images/projects"
            preset="hero"
            alt="Strak gestucte en geschilderde binnenwanden in een woning in Spijkenisse — na de werken"
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
                  Binnenmuren stucen · Afwerkingsniveau · Regio Rotterdam
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sausklaar of behangklaar stucen:{" "}
                <span className="text-primary">het verschil</span>{" "}
                en wat de prijs bepaalt
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Gaat u schilderen, dan heeft u sausklaar nodig; gaat u behangen, dan volstaat
                behangklaar. Hier leest u wat beide niveaus inhouden, wat de prijs bepaalt en hoe u
                de juiste keuze maakt vóór de stukadoor begint.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary ring-1 ring-primary/25">
                  Gratis opname & offerte
                </span>
                <span className="text-xs text-white/50">
                  prijs na opname op locatie
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Opname op locatie", "Afwerkingsniveau vooraf vastgelegd", "Offerte met duidelijke scope"].map((text) => (
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


        {/* ── 2. Het verschil (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="verschil"
              eyebrow="Het verschil"
              h2="Behangklaar of sausklaar: wat is het verschil?"
              accentWord="het verschil?"
              lead="Beide niveaus zijn glad stucwerk; het verschil zit in hoe glad. Behangklaar mag een lichte textuur hebben, sausklaar niet."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {verschilCards.map((c) => {
                  const Icon = c.icon
                  return (
                    <div
                      key={c.title}
                      className="overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]"
                    >
                      <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
                      <div className="p-6 sm:p-8">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10">
                            <Icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                          </div>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                            Voor {c.voor}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{c.subtitle}</p>
                        <ul className="mt-5 space-y-2.5 border-t border-border/30 pt-5">
                          {c.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                              <span className="text-sm leading-snug text-foreground/80">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Callout variant="warning" className="mt-8" title="'Sausklaar' is geen genormeerde term">
                <p>
                  De brancheorganisatie voor stukadoors (NOA) wijst erop dat 'sausklaar' geen vastgelegde
                  norm is. Leg daarom vooraf vast wat u verwacht: volledig glad, geen zichtbare structuur en
                  direct te sauzen zonder extra plamuurwerk. Zo staat het ook in onze offerte.
                </p>
              </Callout>
            </Section>
          </div>
        </div>

        {/* ── 3. Welk niveau kiest u ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="welk-niveau"
            eyebrow="Keuzehulp"
            h2="Welk afwerkingsniveau kiest u?"
            accentWord="kiest u?"
            lead="De eindafwerking bepaalt het stucniveau. Kies op basis van wat er ná het stucen op de wand komt."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {keuzes.map((k, i) => {
                const Icon = k.icon
                return (
                  <div
                    key={k.title}
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
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10 transition-all group-hover:bg-primary/12 group-hover:ring-primary/25">
                        <Icon className="h-5 w-5 text-primary/70 group-hover:text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-bold text-foreground">{k.title}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">→ {k.keuze}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{k.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Alle afwerkingsniveaus, inclusief spackspuitwerk en raapwerk, staan op{" "}
              <Link href="/muren-stucen/" className="font-semibold text-primary hover:underline">
                muren stucen
              </Link>
              .
            </p>
          </Section>
        </div>

        {/* ── 4. Voorstrijken, schuren, droogtijd (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="voorstrijken"
              eyebrow="Praktijk"
              h2="Voorstrijken, schuren en droogtijd"
              accentWord="droogtijd"
              lead="Drie vragen die bij sausklaar stucwerk het vaakst terugkomen."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {praktijk.map((p) => {
                  const Icon = p.icon
                  return (
                    <div
                      key={p.title}
                      className="overflow-hidden rounded-2xl border border-border/50 bg-card"
                    >
                      <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
                      <div className="p-6 sm:p-8">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10">
                          <Icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>
          </div>
        </div>

        {/* ── 5. Werkwijze ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="werkwijze"
            eyebrow="Werkwijze"
            h2="Zo leveren wij behangklaar of sausklaar op"
            accentWord="sausklaar"
            lead="Van opname tot droogadvies in vaste stappen, zodat het afgesproken niveau ook het opgeleverde niveau is."
          >
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className="grid lg:grid-cols-5">
                <div className="p-6 sm:p-8 lg:col-span-3">
                  <ol className="space-y-0">
                    {werkwijzeStappen.map((item, i) => (
                      <li key={item.step} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20">
                            {i + 1}
                          </div>
                          {i < werkwijzeStappen.length - 1 && (
                            <div className="mt-1 w-px grow bg-border/50" />
                          )}
                        </div>
                        <div className={i < werkwijzeStappen.length - 1 ? "pb-5" : ""}>
                          <p className="text-sm font-semibold text-foreground">{item.step}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex items-start gap-2 rounded-lg border border-border/30 bg-secondary/15 px-4 py-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Een gemiddelde kamer is doorgaans in één tot twee werkdagen gestuct; de planning wordt bij de opname besproken.
                    </p>
                  </div>
                </div>
                <div className="relative hidden lg:col-span-2 lg:block">
                  <ResponsiveImage
                    baseName={SIDE_IMAGE}
                    dir="/images/projects"
                    preset="serviceCard"
                    alt="Strak afgewerkte binnenwand in Spijkenisse — resultaat na stucwerk en schilderwerk"
                    sizes="33vw"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
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
                      De meest gestelde vragen over sausklaar en behangklaar stucwerk. Staat uw vraag er niet bij?
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
                { label: "Gevelisolatie", href: "/gevelisolatie/" },
                { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
                { label: "Sierpleister", href: "/sierpleister/" },
                { label: "Gevel schilderen", href: "/gevel-schilderen/" },
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
      <QuoteModal dienst="muren-stucen" />
    </>
  )
}
