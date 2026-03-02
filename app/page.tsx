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

const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

export const metadata = buildPageMetadata("/")

const base = SITE.canonicalBase

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is buitengevelisolatie (ETICS)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ETICS staat voor External Thermal Insulation Composite System. Dit is een isolatiemethode waarbij isolatieplaten aan de buitenkant van uw gevel worden aangebracht, gevolgd door een wapening en een decoratieve afwerklaag zoals stucwerk of sierpleister. Het zorgt voor uitstekende isolatie en een frisse uitstraling.",
      },
    },
    {
      "@type": "Question",
      name: "Hoeveel kan ik besparen met gevelisolatie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemiddeld kunt u tot 40% besparen op uw energiekosten. De precieze besparing hangt af van de huidige staat van uw woning en de gekozen isolatiewaarde. Daarnaast verhoogt gevelisolatie het wooncomfort en de waarde van uw woning.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt het aanbrengen van gevelisolatie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor een gemiddelde woning duurt het project 2 tot 4 weken, afhankelijk van de grootte en complexiteit. We plannen het werk zorgvuldig en houden u tijdens het proces volledig op de hoogte.",
      },
    },
    {
      "@type": "Question",
      name: "Krijg ik garantie op het werk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wij bieden garantie op zowel het materiaal als de uitvoering. De duur van de garantie varieert per type isolatie en afwerking. Dit bespreken we vooraf in de offerte.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik subsidie krijgen voor gevelisolatie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, er zijn verschillende subsidieregelingen beschikbaar voor gevelisolatie. We denken graag met u mee over de mogelijkheden en helpen u bij het aanvragen van subsidies.",
      },
    },
  ],
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${base}/#organization`,
  name: "BM Klus BV",
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
      <main className="min-h-screen bg-background">
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
      </main>
    </>
  )
}
