import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import TrustStrip from "@/components/trust-strip"
import EticsSection from "@/components/etics-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import PortfolioSection from "@/components/portfolio-section"
import ReviewsSection from "@/components/reviews-section"
import WorkAreaSection from "@/components/work-area-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

import type { Metadata } from "next"

import { makeMetadata } from "@/lib/seo/meta"
import { NAV } from "@/lib/seo/routes"
import { jsonLdScript, localBusinessSchema, websiteSchema } from "@/lib/seo/schema"

export const metadata: Metadata = makeMetadata({
  title: "Buitengevelisolatie & Renovatie",
  description:
    "Professionele buitengevelisolatie (ETICS) en gevelrenovatie in Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio’s.",
  path: NAV.home.path,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {jsonLdScript(localBusinessSchema())}
      {jsonLdScript(websiteSchema())}
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <EticsSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <ReviewsSection />
      <WorkAreaSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
