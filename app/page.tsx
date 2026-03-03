import dynamic from "next/dynamic"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo/schema"
import HeroSection from "@/components/hero-section"
import TrustStrip from "@/components/trust-strip"
import EticsSection from "@/components/etics-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import PortfolioSection from "@/components/portfolio-section"
import ReviewsSection from "@/components/reviews-section"
import WorkAreaSection from "@/components/work-area-section"
import FaqSection from "@/components/faq-section"
import { homeFaqItems } from "@/lib/content/home-faq"

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

export const metadata = buildPageMetadata("/")

const base = SITE.canonicalBase

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${base}/#organization`,
  name: "BM klus BV",
  url: base,
  logo: {
    "@type": "ImageObject",
    url: `${base}/images/logo-bm-klus.webp`,
    width: 180,
    height: 60,
  },
  description:
    "Specialist in buitengevelisolatie (ETICS) en gevelafwerking in regio Rotterdam en Zuid-Holland.",
  telephone: "+31612079808",
  email: "info@bm-klus-bv.nl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bonaventurastraat 58B",
    postalCode: "3081 HE",
    addressLocality: "Rotterdam",
    addressRegion: "Zuid-Holland",
    addressCountry: "NL",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 51.9225,
      longitude: 4.4792,
    },
    geoRadius: "100000",
  },
  sameAs: [
    "https://www.instagram.com/bm_klus_bv",
    "https://www.facebook.com/profile.php?id=61556805434705",
    "https://www.linkedin.com/in/boris-mitov-a436902b9",
    "https://nl.pinterest.com/bmklusbv/",
    "https://www.youtube.com/@bm-klus-bv",
  ],
}

export default function Home() {
  return (
    <>
      {jsonLdScript(websiteSchema())}
      {jsonLdScript(localBusinessSchema())}
      {jsonLdScript(organizationSchema)}
      {jsonLdScript(faqSchema)}
      <div className="min-h-screen bg-background">
        <HeroSection />
        <TrustStrip />
        <EticsSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <ReviewsSection />
        <WorkAreaSection />
        <FaqSection />
        <StickyCTABar />
        <QuoteModal dienst="geveloplossingen" />
      </div>
    </>
  )
}
