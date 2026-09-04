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
  Palette,
  Info,
  XCircle,
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
export const metadata = buildPageMetadata("/gevel-schilderen/keimen/")

const base = SITE.canonicalBase

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen%20voor%20het%20keimen%20van%20mijn%20gevel."

const HERO_IMAGE =
  "delft-willemstraat-gevelrenovatie-schilderwerk-2026/delft-willemstraat-gevelrenovatie-schilderwerk-2026-na-01"

/* ── Static data ── */

const heroBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  { label: "Keimen", href: "/gevel-schilderen/keimen/" },
]

const toc = [
  { id: "wat-is-keimen",  label: "Wat is keimen?" },
  { id: "wanneer-keimen", label: "Wanneer keimen (en wanneer niet)" },
  { id: "kostenfactoren", label: "Wat bepaalt de prijs?" },
  { id: "werkwijze",      label: "Werkwijze" },
  { id: "faq",            label: "Veelgestelde vragen" },
]

const begrippen = [
  {
    title: "Keimen (silicaatverf)",
    icon: Layers,
    text: "Silicaatverf, ook wel KEIM-verf, hecht door een chemische reactie (silificering) permanent aan minerale ondergronden. De verflaag blijft dampopen: vocht kan uit de muur ontsnappen, terwijl regen van buiten wordt geweerd.",
    points: ["Chemische hechting, geen filmlaag", "Sterk dampopen", "Kleurvast door minerale pigmenten"],
  },
  {
    title: "Schilderen (siloxaan of acryl)",
    icon: Paintbrush2,
    text: "Traditioneel buitenschilderwerk brengt een filmvormende verflaag aan bovenop de ondergrond. Siloxaan is waterafstotend en breed inzetbaar; acryl sluit goed aan bij gevels die al eerder geschilderd zijn.",
    points: ["Filmvormende laag", "Ook op eerder geschilderde gevels", "Overbrugt kleine haarscheurtjes"],
  },
  {
    title: "Kaleien (kalk)",
    icon: Palette,
    text: "Een oudere techniek waarbij een dunne kalkoplossing wordt aangebracht. Het geeft een transparant, 'oud' effect en wordt tegenwoordig minder toegepast, vooral nog bij monumentale panden.",
    points: ["Transparant, historisch beeld", "Minder gangbaar", "Eigen onderhoudsritme"],
  },
]

const geschikt = [
  "Onbehandeld baksteen of metselwerk",
  "Kalkpleister, minerale stuc en beton (na geschikte primer)",
  "Gevels die dampopen moeten blijven, bijvoorbeeld bij vocht van binnenuit",
  "Historische en beschermde panden waar een mineraal beeld gewenst is",
]

const nietGeschikt = [
  "Gevels die eerder met acrylverf zijn geschilderd: silicaat op acryl is technisch niet aanbevolen",
  "Poederend pleister dat niet eerst wordt gefixeerd",
  "Ondergronden met open voegen of scheuren die niet vooraf zijn hersteld",
  "Situaties waarin een waterafstotende filmlaag (siloxaan) beter past bij de ondergrond",
]

const kostenfactoren = [
  { groep: "Ondergrond & zuiging",  items: ["Type ondergrond: baksteen, pleister of beton", "Benodigde voorstrijk of primer (bij beton bestand tegen alkaliteit)"] },
  { groep: "Voorbereiding",          items: ["Reiniging van algen, mos en vuil", "Herstel van voegwerk en haarscheuren", "Fixeren van poederend pleister"] },
  { groep: "Lagenopbouw",            items: ["Grondlaag plus afwerklaag of -lagen", "Kleurdekking en gewenste tint"] },
  { groep: "Steiger & bereikbaarheid", items: ["Bouwhoogte en steiger of hoogwerker", "Opstelruimte rondom de woning"] },
  { groep: "Kleur & proefvlak",      items: ["Donkere tinten tonen vervuiling en UV-verwering eerder", "Proefvlak vóór definitieve kleurkeuze"] },
]

const kostenfactorenIcons: Record<string, LucideIcon> = {
  "Ondergrond & zuiging": Layers,
  "Voorbereiding": Wrench,
  "Lagenopbouw": Paintbrush2,
  "Steiger & bereikbaarheid": Building2,
  "Kleur & proefvlak": Palette,
}

const werkwijzeStappen = [
  { step: "Opname op locatie", detail: "Beoordeling van ondergrond, bestaande verflaag en vochtsituatie" },
  { step: "Advies verfsysteem", detail: "Silicaat (keimen) of siloxaan, passend bij uw gevel" },
  { step: "Reiniging & herstel", detail: "Reinigen, voegen en scheuren herstellen, poederend pleister fixeren" },
  { step: "Voorstrijk / primer", detail: "Grondlaag afgestemd op het silicaatsysteem" },
  { step: "Keimlagen aanbrengen", detail: "Bij een geschikt weersvenster: geen regen, passende temperatuur en luchtvochtigheid" },
  { step: "Oplevering", detail: "Eindcontrole en onderhoudsadvies" },
]

const faqItems = [
  {
    vraag: "Wat kost gevel keimen per m²?",
    antwoord:
      "De prijs per m² hangt vooral af van de staat van de ondergrond en de benodigde voorbereiding: een stabiele minerale ondergrond met lichte reiniging is voordeliger dan een gevel die eerst gereinigd en voorgestreken moet worden. De prijs is inclusief arbeid en standaardmaterialen, exclusief steiger, herstelwerk en intensieve reiniging. Na een gratis opname op locatie ontvangt u een offerte met een duidelijke scope en prijs per m².",
  },
  {
    vraag: "Wat kost het keimen van een heel huis?",
    antwoord:
      "Dat hangt af van het totale geveloppervlak, het aantal gevels en de staat van de ondergrond. Meerdere gevels rekenen naar rato, waarbij hoekprofielen, steigerhoogte en herstelwerk de eindprijs bepalen. Tijdens de opname meten wij het oppervlak in en beoordelen wij de ondergrond; daarna ontvangt u een totaalprijs voor de hele woning.",
  },
  {
    vraag: "Keimen of schilderen: wat kies ik wanneer?",
    antwoord:
      "Keimen (silicaatverf) is de voorkeurskeuze bij minerale ondergronden die dampopen moeten blijven, zoals onbehandeld baksteen of kalkpleister, bijvoorbeeld bij historische panden of vocht van binnenuit. Traditioneel schilderwerk met siloxaan of acryl is breder inzetbaar en stelt minder strenge eisen aan de ondergrond, maar vormt een filmlaag. Wij beoordelen de situatie ter plaatse en adviseren het systeem dat bij uw gevel past.",
  },
  {
    vraag: "Kan ik keimen over een eerder geschilderde gevel?",
    antwoord:
      "Op een gevel die eerder met acrylverf is geschilderd, is keimen technisch niet aanbevolen: silicaat hecht chemisch aan minerale ondergronden en niet aan een filmlaag. Mengen van systemen kan leiden tot hechtings- en dampproblemen. In die situatie is een siloxaan- of acrylsysteem meestal de betere keuze. Tijdens de opname stellen wij vast wat er op uw gevel zit.",
  },
  {
    vraag: "Hoe lang gaat keimwerk mee?",
    antwoord:
      "Silicaatverf staat bekend om zijn hoge kleurvastheid door minerale pigmenten en bolt of bladdert niet af bij een vochtige ondergrond. De feitelijke levensduur hangt af van de ondergrond, de ligging en windrichting van de gevel, de gekozen kleur en het onderhoud. Jaarlijks licht reinigen en kleine beschadigingen tijdig bijwerken houdt het resultaat het langst in stand.",
  },
  {
    vraag: "Wat is het verschil tussen keimen en kaleien?",
    antwoord:
      "Keimen is het aanbrengen van silicaatverf: een minerale coating die chemisch hecht en dekkend kan worden aangebracht. Kaleien is een oudere techniek met een dunne kalkoplossing die een transparant, 'oud' effect geeft. Kaleien wordt tegenwoordig minder toegepast; de keuze hangt af van het gewenste beeld en of het pand beschermd erfgoed is.",
  },
  {
    vraag: "Uit hoeveel lagen bestaat keimwerk?",
    antwoord:
      "Keimwerk wordt opgebouwd uit een grondlaag (voorstrijk of primer afgestemd op silicaat) en één of meer afwerklagen. Het aantal afwerklagen hangt af van de zuiging van de ondergrond en de gewenste kleurdekking. In de offerte vermelden wij de lagenopbouw die wij voor uw gevel voorstellen.",
  },
  {
    vraag: "Is de steiger inbegrepen in de prijs?",
    antwoord:
      "Steigerhuur en -montage zijn niet inbegrepen in de prijs per m², omdat hoogte en opstelruimte per woning sterk verschillen. Wij vermelden steiger of hoogwerker altijd afzonderlijk in de offerte, zodat u precies weet wat wel en niet is inbegrepen.",
  },
  {
    vraag: "In welk gebied keimen jullie gevels?",
    antwoord:
      "Wij werken in de regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's, waaronder Den Haag, Delft, Leiden, Dordrecht, Schiedam, Vlaardingen en Gouda. Werkt u buiten dit gebied? Neem gerust contact op; in overleg is maatwerk mogelijk.",
  },
]

const relatedLinks: RelatedLinkItem[] = [
  {
    label: "Gevel schilderen (overzicht)",
    description: "Verfsoorten, voorbereiding, techniek per ondergrond en onderhoud van geschilderde gevels.",
    href: "/gevel-schilderen/",
  },
  {
    label: "Buiten stucwerk",
    description: "Buitenmuur stucen als ondergrond vóór het keimen of schilderen.",
    href: "/buiten-stucwerk/",
  },
  {
    label: "Afwerkingen na gevelisolatie",
    description: "Stuc, sierpleister, crepi of steenstrips op een geïsoleerde gevel.",
    href: "/gevelisolatie/afwerkingen/",
  },
  {
    label: "Project: Delft Willemstraat",
    description: "Gevelherstel en schilderwerk aan een woning in Delft (2026), met foto's voor en na.",
    href: "/onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/",
  },
  {
    label: "Onze werken",
    description: "Bekijk uitgevoerde gevelprojecten in de regio.",
    href: "/onze-werken/",
  },
]

/* ── Page Component ── */
export default function GevelKeimenPage() {
  const breadcrumbsSchema = breadcrumbSchema(
    heroBreadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Gevel keimen (silicaatverf)",
    description:
      "Gevel keimen met silicaatverf: kostenfactoren, keimen of schilderen en wanneer keimen past. Opname op locatie in regio Rotterdam.",
    url: `${base}/gevel-schilderen/keimen/`,
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
            alt="Gevelherstel en schilderwerk aan een woning in Delft — geschilderde gevel na de werken"
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
                  Gevel keimen · Kosten &amp; advies · Regio Rotterdam
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gevel keimen:{" "}
                <span className="text-primary">kosten per m²</span>{" "}
                en wanneer het past
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Keimen met silicaatverf is de dampopen keuze voor minerale gevels.
                Hier leest u welke factoren de prijs bepalen en wanneer keimen
                wél of juist niet geschikt is voor uw gevel.
              </p>

              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary ring-1 ring-primary/25">
                  Gratis opname & offerte
                </span>
                <span className="text-xs text-white/50">
                  prijs na opname op locatie
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {["Opname op locatie", "Advies: silicaat of siloxaan", "Offerte met duidelijke scope"].map((text) => (
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


        {/* ── 2. Wat is keimen (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="wat-is-keimen"
              eyebrow="Begrippen"
              h2="Wat is keimen? Keimen, schilderen en kaleien"
              accentWord="keimen?"
              lead="Drie technieken die vaak door elkaar worden gebruikt, maar technisch wezenlijk verschillen. Het verschil zit in hoe de laag aan de gevel hecht."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {begrippen.map((b, i) => {
                  const Icon = b.icon
                  return (
                    <div
                      key={b.title}
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
                        <h3 className="mb-3 text-base font-bold text-foreground">{b.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                        <ul className="mt-4 space-y-1.5 border-t border-border/30 pt-4">
                          {b.points.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-xs text-foreground/70">
                              <Check className="h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Meer over de verfsystemen, voorbereiding en techniek per ondergrond leest u op{" "}
                <Link href="/gevel-schilderen/" className="font-semibold text-primary hover:underline">
                  gevel schilderen
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>

        {/* ── 3. Wanneer keimen ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="wanneer-keimen"
            eyebrow="Geschiktheid"
            h2="Wanneer keimen wél past, en wanneer niet"
            accentWord="en wanneer niet"
            lead="Keimen werkt alleen als de silicaatverf chemisch kan hechten. De ondergrond bepaalt dus de keuze, niet de wens alleen."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                <div className="h-[3px] bg-linear-to-r from-green-500/70 via-green-500/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <p className="mb-4 text-sm font-bold text-foreground">Geschikt voor keimen</p>
                  <ul className="space-y-3">
                    {geschikt.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span className="text-sm leading-snug text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                <div className="h-[3px] bg-linear-to-r from-amber-500/70 via-amber-500/25 to-transparent" />
                <div className="p-6 sm:p-8">
                  <p className="mb-4 text-sm font-bold text-foreground">Niet of pas na voorbereiding</p>
                  <ul className="space-y-3">
                    {nietGeschikt.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <span className="text-sm leading-snug text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Callout variant="warning" className="mt-8" title="Systemen niet mengen">
              <p>
                De keuze van het verfsysteem hangt altijd af van de bestaande verflaag en de
                compatibiliteit met de ondergrond. Silicaat op acryl kan leiden tot hechtings- en
                dampproblemen. Twijfelt u wat er op uw gevel zit? Dat stellen wij vast tijdens de opname.
              </p>
            </Callout>
          </Section>
        </div>

        {/* ── 4. Kostenfactoren (warm bg) ── */}
        <div className="bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Section
              id="kostenfactoren"
              eyebrow="Kostenfactoren"
              h2="Wat bepaalt de prijs van keimwerk?"
              accentWord="de prijs"
              lead="De m²-prijs verschuift binnen de bandbreedte door een combinatie van factoren. Dit zijn de belangrijkste."
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
                        <p className="mb-4 text-sm font-bold text-foreground">{groep.groep}</p>
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

        {/* ── 5. Werkwijze ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section
            id="werkwijze"
            eyebrow="Werkwijze"
            h2="Zo pakken wij keimwerk aan"
            accentWord="keimwerk"
            lead="Van opname tot oplevering in vaste stappen, zodat u vooraf weet wat er gebeurt en wat er in de prijs zit."
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
                      Steiger of hoogwerker en uitgebreider herstelwerk aan de ondergrond worden altijd afzonderlijk in de offerte vermeld.
                    </p>
                  </div>
                </div>
                <div className="relative hidden lg:col-span-2 lg:block">
                  <ResponsiveImage
                    baseName="delft-willemstraat-gevelrenovatie-schilderwerk-2026/delft-willemstraat-gevelrenovatie-schilderwerk-2026-na-02"
                    dir="/images/projects"
                    preset="serviceCard"
                    alt="Gevelherstel en schilderwerk in Delft — resultaat na de werken"
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
                      De meest gestelde vragen over kosten en geschiktheid van gevel keimen. Staat uw vraag er niet bij?
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
      <QuoteModal dienst="gevel-schilderen" />
    </>
  )
}
