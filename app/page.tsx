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
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
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
        <div className="below-fold">
          <EticsSection />
        </div>
        <div className="below-fold">
          <ServicesSection />
        </div>
        <div className="below-fold">
          <ProcessSection />
        </div>
        <div className="below-fold">
          <PortfolioSection />
        </div>
        <ReviewsSection />
        <div className="below-fold">
          <WorkAreaSection />
        </div>
        <div className="below-fold">
          <FaqSection />
        </div>
        <StickyCTABar />
        <QuoteModal dienst="geveloplossingen" />
      </div>
    </>
  )
}
