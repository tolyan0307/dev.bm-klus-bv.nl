import Link from "next/link"
import dynamic from "next/dynamic"
import ResponsiveImage from "@/components/responsive-image"
import {
  MapPin,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
} from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import TrustStrip from "@/components/trust-strip"
import FaqAccordion from "@/components/page/FaqAccordion"
import { ProjectsSection } from "@/components/projects/ProjectsSection"
import { projects } from "@/lib/content/projects"
import GoogleRatingBadge from "@/components/google-rating-badge"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)

export const metadata = buildPageMetadata("/onze-werken/")

const base = SITE.canonicalBase

const expectations = [
  "Plaats en type woning",
  "Werkzaamheden en gekozen afwerking",
  "Belangrijke details (plint, dagkanten, profielen)",
  "Resultaat (voor/na)",
]

const heroChecks = [
  "Buitengevelisolatie, stucwerk, sierpleister, schilderwerk",
  "Per project: plaats, aanpak en afwerking",
  "Regio Rotterdam en omgeving (±100 km)",
]

const faqItems = [
  {
    question: "Welke werkzaamheden voert BM klus BV uit?",
    answer:
      "We voeren buitengevelisolatie (ETICS), gevelafwerking (sierpleister, stucwerk, crepi, steenstrips) en gevelrenovatie uit. De meeste projecten combineren meerdere diensten tegelijkertijd.",
  },
  {
    question: "In welk gebied werkt u?",
    answer:
      "Ons werkgebied is regio Rotterdam en omgeving — ruwweg een straal van 80–100 km. Denk aan Zuid-Holland, delen van Utrecht en Noord-Brabant. Twijfelt u? Neem gerust contact op.",
  },
  {
    question: "Kan ik een project indienen voor publicatie?",
    answer:
      "We publiceren projecten waarbij wij de werkzaamheden zelf hebben uitgevoerd. Bent u een van onze opdrachtgevers en wilt u uw project hier zien staan? Neem contact op.",
  },
  {
    question: "Worden de projecten gefilterd op type werk?",
    answer:
      "Voorlopig tonen we projecten per object zonder harde categoriefilter, omdat de meeste opdrachten een combinatie van diensten omvatten. Filteropties voegen we toe zodra er voldoende projecten staan.",
  },
  {
    question: "Hoe vraag ik een offerte aan?",
    answer:
      "U kunt via de contactpagina een gratis opname op locatie of offerte aanvragen. We nemen binnen één werkdag contact met u op.",
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-10 bg-primary" aria-hidden="true" />
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {children}
      </span>
    </div>
  )
}

function OrangeWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
      {children}
    </span>
  )
}

export default function OnzeWerkenPage() {
  const breadcrumbsData = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Onze werken", item: `${base}/onze-werken/` },
  ])

  const business = localBusinessSchema()

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Onze werken",
    description:
      "Bekijk recente projecten met buitengevelisolatie (ETICS) en gevelafwerking. Per project: plaats, aanpak en afwerking.",
    url: `${base}/onze-werken/`,
    provider: { "@id": `${base}/#business` },
  }

  return (
    <>
      {jsonLdScript(breadcrumbsData)}
      {jsonLdScript(business)}
      {jsonLdScript(faqSchema)}
      {jsonLdScript(collectionSchema)}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <ResponsiveImage
            baseName="bruinisse-gevelisolatie-6cm-na-04"
            dir="/images/projects"
            preset="hero"
            alt="Gevelisolatie project — afgewerkt resultaat in Bruinisse"
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/40" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Onze werken", href: "/onze-werken/" },
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
            <div className="flex flex-col gap-5 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Projecten &amp; portfolio
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Onze <span className="text-primary">werken</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Bekijk recente projecten met buitengevelisolatie (ETICS) en
                gevelafwerking. Per project ziet u plaats, aanpak en afwerking.
              </p>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {heroChecks.map((text) => (
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
                <Link href="/contact/" className="btn-hero">
                  Plan gratis opname op locatie
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/diensten/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  Bekijk onze diensten
                </Link>
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
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">

          {/* Table of contents */}
          <nav aria-label="Inhoud" className="relative mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "projecten", label: "Onze projecten" },
                { id: "faq", label: "Veelgestelde vragen" },
                { id: "werkgebied", label: "Werkgebied" },
              ].map((item, i) => (
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

          <div className="space-y-16">

            {/* Wat u kunt verwachten */}
            <section className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
                <div className="lg:w-72 lg:shrink-0">
                  <SectionLabel>Per project</SectionLabel>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Wat u kunt <OrangeWord>verwachten</OrangeWord>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Elke projectpagina toont een volledig beeld van de uitgevoerde werkzaamheden.
                  </p>
                </div>
                <div className="flex-1 divide-y divide-border">
                  {expectations.map((item, i) => (
                    <div key={item} className="group flex items-center gap-4 py-3">
                      <span className="w-6 shrink-0 text-right text-xs font-bold tabular-nums text-primary/30 transition-colors group-hover:text-primary/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-3.5 w-px shrink-0 bg-border" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                  <p className="pt-3 text-[11px] italic text-muted-foreground/50">
                    Projecten worden stap voor stap toegevoegd.
                  </p>
                </div>
              </div>
            </section>

            {/* Projecten */}
            <div className="below-fold">
            <section id="projecten" className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <SectionLabel>Projecten</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Onze <OrangeWord>projecten</OrangeWord>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Voorbeelden van buitengevel renovatie, afwerking en schilderwerk.
              </p>
              <ProjectsSection projects={projects} />
            </section>
            </div>

            {/* Populaire diensten */}
            <div className="below-fold">
            <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <SectionLabel>Populaire diensten</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Onze <OrangeWord>diensten</OrangeWord>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Bekijk de diensten die wij het meest uitvoeren in regio Rotterdam en omgeving.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Buitengevelisolatie (ETICS)", sub: "Energiebesparing & comfort", href: "/gevelisolatie/" },
                  { label: "Gevel schilderen", sub: "Bescherming & uitstraling", href: "/gevel-schilderen/" },
                  { label: "Buiten stucwerk", sub: "Strakke gevelafwerking", href: "/buiten-stucwerk/" },
                  { label: "Sierpleister", sub: "Decoratieve afwerking", href: "/sierpleister/" },
                  { label: "Muren stucen", sub: "Binnen & buiten", href: "/muren-stucen/" },
                  { label: "Alle diensten", sub: "Volledig overzicht", href: "/diensten/" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-border transition-colors group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </section>
            </div>

            {/* FAQ */}
            <div className="below-fold">
            <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde<br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Heeft u een vraag over onze projecten of aanpak? Hier vindt u de meest gestelde vragen.
                    </p>
                    <p className="mt-8 text-base text-muted-foreground">
                      Staat uw vraag er niet tussen?{" "}
                      <Link href="/contact/" className="font-semibold text-primary hover:underline">
                        Neem contact op
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <FaqAccordion items={faqItems.map(f => ({ vraag: f.question, antwoord: f.answer }))} defaultOpen={0} />
                </div>
              </div>
            </section>
            </div>

            {/* Werkgebied */}
            <div className="below-fold">
            <section id="werkgebied" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
                <div className="lg:w-72 lg:shrink-0">
                  <SectionLabel>Werkgebied</SectionLabel>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Ons <OrangeWord>werkgebied</OrangeWord>
                  </h2>
                </div>
                <div className="flex-1 space-y-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Wij werken voornamelijk in de regio Rotterdam en omgeving — Zuid-Holland en aangrenzende regio&apos;s, tot circa 80–100&nbsp;km.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Rotterdam", "Schiedam", "Vlaardingen", "Capelle a/d IJssel", "Spijkenisse", "Barendrecht", "Ridderkerk", "Dordrecht"].map((city) => (
                      <span
                        key={city}
                        className="rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground"
                      >
                        {city}
                      </span>
                    ))}
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary">
                      + omliggende regio&apos;s
                    </span>
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Twijfelt u of uw locatie binnen ons werkgebied valt?{" "}
                      <Link href="/contact/" className="font-medium text-primary underline-offset-4 hover:underline">
                        Neem contact op
                      </Link>
                      {" "}— we denken graag mee.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            </div>

          </div>
        </div>

        {/* Bottom micro-links */}
        <div className="below-fold">
        <div className="border-t border-border py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Gerelateerde pagina&apos;s:</span>
              {[
                { label: "Diensten", href: "/diensten/" },
                { label: "Gevelisolatie", href: "/gevelisolatie/" },
                { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
                { label: "Sierpleister", href: "/sierpleister/" },
                { label: "Gevel schilderen", href: "/gevel-schilderen/" },
                { label: "Muren stucen", href: "/muren-stucen/" },
                { label: "Over ons", href: "/over-ons/" },
                { label: "Contact", href: "/contact/" },
              ].map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-border">•</span>}
                  <Link href={link.href} className="hover:text-primary hover:underline underline-offset-4 transition-colors">{link.label}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      <StickyCTABar />
    </>
  )
}
