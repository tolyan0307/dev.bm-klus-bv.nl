import dynamic from "next/dynamic"
import { buildPageMetadata } from "@/lib/seo/meta"
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

export default function Home() {
  return (
    <>
      {jsonLdScript(websiteSchema())}
      {jsonLdScript(localBusinessSchema())}
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
