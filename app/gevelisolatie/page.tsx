import { buildPageMetadata } from "@/lib/seo/meta"
import { gevelisolatieToc, gevelisolatieIntro, faqContent } from "@/lib/content/gevelisolatie"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import GevelisolatieHero from "@/components/sections/gevelisolatie/hero-gevelisolatie"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"
import WatIsEticsSection from "@/components/sections/gevelisolatie/wat-is-etics-section"
import VoordelenSection from "@/components/sections/gevelisolatie/voordelen-section"
import KostenSection from "@/components/sections/gevelisolatie/kosten-section"
import WerkwijzeSection from "@/components/sections/gevelisolatie/werkwijze-section"

const AfwerkingenSection = dynamic(() => import("@/components/sections/gevelisolatie/afwerkingen-section"))
const MaterialenSection = dynamic(() => import("@/components/sections/gevelisolatie/materialen-section"))
const RcWaardeDikteSection = dynamic(() => import("@/components/sections/gevelisolatie/rc-waarde-dikte-section"))
const DetailsKoudebruggenSection = dynamic(() => import("@/components/sections/gevelisolatie/details-koudebruggen-section"))
const SubsidieVergunningSection = dynamic(() => import("@/components/sections/gevelisolatie/subsidie-vergunning-section"))
const VerdiepingSection = dynamic(() => import("@/components/sections/gevelisolatie/verdieping-section"))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const FaqSection = dynamic(() => import("@/components/sections/gevelisolatie/faq-section"))
const MeerInformatieSection = dynamic(() => import("@/components/sections/gevelisolatie/meer-informatie-section"))
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StickyCTABar = dynamic(() => import("@/components/sections/gevelisolatie/sticky-cta-bar"))
const StickyToc = dynamic(() => import("@/components/sections/gevelisolatie/sticky-toc"))

/* ── Meta ── */
export const metadata = buildPageMetadata("/gevelisolatie/", {
  image: "/images/og-gevelisolatie.jpg",
})

/* ── Structured Data ── */
function PageJsonLd() {
  const base = SITE.canonicalBase

  const breadcrumbs = breadcrumbSchema(
    gevelisolatieIntro.breadcrumbs.map((b) => ({
      name: b.label,
      item: `${base}${b.href}`,
    })),
  )

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Buitengevelisolatie (ETICS)",
    description:
      "Gevelisolatie aan de buitenkant (ETICS) met afwerking in stuc, sierpleister, crepi of steenstrips. Energiebesparend, duurzaam en direct zichtbaar resultaat.",
    url: `${base}/gevelisolatie/`,
    lowPrice: "110",
    highPrice: "280",
  })

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  }

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {jsonLdScript(faq)}
    </>
  )
}

/* ── Breadcrumbs ── */
function Breadcrumbs() {
  const items = gevelisolatieIntro.breadcrumbs
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
              )}
              {isLast ? (
                <span className="font-medium text-white/90">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ── Page ── */
export default function GevelisolatiePage() {
  const toc = gevelisolatieToc

  return (
    <>
      <PageJsonLd />

      {/* ── Hero ── */}
      <GevelisolatieHero breadcrumbs={<Breadcrumbs />} />

      {/* ── Trust Strip ── */}
      <TrustStrip />

      {/* ── Article content ── */}
      <article className="bg-background pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">

          {/* ── Table of Contents ── */}
          <nav aria-label="Inhoudsopgave" className="relative">
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

          {/* ── Content Sections — part 1a ── */}
          <div>
            <WatIsEticsSection />
            <VoordelenSection />
          </div>
        </div>

        {/* ── WAAROM BM KLUS (own container) ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV is gespecialiseerd in buitengevelisolatie (ETICS) en gevelafwerking in de regio Rotterdam en omgeving." />

        {/* ── Content Sections — part 1b ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <KostenSection />
            <WerkwijzeSection />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Content Sections — part 2 ── */}
          <div>
            <AfwerkingenSection />
            <MaterialenSection />
            <RcWaardeDikteSection />
            <DetailsKoudebruggenSection />
            <SubsidieVergunningSection />
            <VerdiepingSection />
          </div>
        </div>

        {/* ── Reviews ── */}
        <ReviewsSection />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqSection />
          <MeerInformatieSection />
        </div>
      </article>

      {/* ── Sticky TOC (desktop xl) ── */}
      <StickyToc items={toc} />

      {/* ── Sticky CTA bar (mobile + desktop) ── */}
      <StickyCTABar />

      {/* ── Quote modal popup ── */}
      <QuoteModal />
    </>
  )
}
