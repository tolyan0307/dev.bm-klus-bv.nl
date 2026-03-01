import { buildPageMetadata } from "@/lib/seo/meta"
import { gevelisolatieToc } from "@/lib/content/gevelisolatie"

import GevelisolatieHero from "@/components/sections/gevelisolatie/hero-gevelisolatie"
import WatIsEticsSection from "@/components/sections/gevelisolatie/wat-is-etics-section"
import VoordelenSection from "@/components/sections/gevelisolatie/voordelen-section"
import KostenSection from "@/components/sections/gevelisolatie/kosten-section"
import WerkwijzeSection from "@/components/sections/gevelisolatie/werkwijze-section"
import AfwerkingenSection from "@/components/sections/gevelisolatie/afwerkingen-section"
import MaterialenSection from "@/components/sections/gevelisolatie/materialen-section"
import RcWaardeDikteSection from "@/components/sections/gevelisolatie/rc-waarde-dikte-section"
import DetailsKoudebruggenSection from "@/components/sections/gevelisolatie/details-koudebruggen-section"
import SubsidieVergunningSection from "@/components/sections/gevelisolatie/subsidie-vergunning-section"
import FaqSection from "@/components/sections/gevelisolatie/faq-section"
import MeerInformatieSection from "@/components/sections/gevelisolatie/meer-informatie-section"
import MidPageCTA from "@/components/sections/gevelisolatie/mid-page-cta"
import StickyCTABar from "@/components/sections/gevelisolatie/sticky-cta-bar"
import VerdiepingSection from "@/components/sections/gevelisolatie/verdieping-section"

/* ── Meta ── */
export const metadata = buildPageMetadata("/gevelisolatie/")

/* ── Page ── */
export default function GevelisolatiePage() {
  const toc = gevelisolatieToc

  return (
    <>
      {/* ── Hero G ── */}
      <GevelisolatieHero />

      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">
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

          {/* ── Content Sections — part 1 ── */}
          <div>
            <WatIsEticsSection />
            <VoordelenSection />
            <KostenSection />
            <WerkwijzeSection />
          </div>
        </div>

        {/* ── Mid-page CTA — full viewport width ── */}
        <MidPageCTA />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Content Sections — part 2 ── */}
          <div>
            <AfwerkingenSection />
            <MaterialenSection />
            <RcWaardeDikteSection />
            <DetailsKoudebruggenSection />
            <SubsidieVergunningSection />
            <VerdiepingSection />
            <FaqSection />
            <MeerInformatieSection />
          </div>
        </div>
      </main>

      {/* ── Sticky mobile CTA bar ── */}
      <StickyCTABar />
    </>
  )
}
