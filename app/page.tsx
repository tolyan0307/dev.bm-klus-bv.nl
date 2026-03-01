import { buildPageMetadata } from "@/lib/seo/meta"
import HeroSection from "@/components/hero-section"
import TrustStrip from "@/components/trust-strip"
import EticsSection from "@/components/etics-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import PortfolioSection from "@/components/portfolio-section"
import ReviewsSection from "@/components/reviews-section"
import WorkAreaSection from "@/components/work-area-section"
import FaqSection from "@/components/faq-section"

export const metadata = buildPageMetadata("/")

export default function Home() {
  return (
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
    </main>
  )
}
