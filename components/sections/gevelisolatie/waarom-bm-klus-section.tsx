import Link from "next/link"
import ResponsiveImage from "@/components/responsive-image"
import { Shield, Users, Clock, Award, ArrowRight } from "lucide-react"

const usps = [
  {
    icon: Award,
    title: "Vakmanschap & detaillering",
    description:
      "Jarenlange ervaring in stucwerk, schilderwerk en gevelisolatie. Juist de details — hoeken, naden, aansluitingen — maken het verschil voor een duurzaam resultaat.",
  },
  {
    icon: Users,
    title: "Persoonlijke begeleiding",
    description:
      "Duidelijke communicatie via WhatsApp of e-mail. U weet altijd waar u aan toe bent gedurende het project.",
  },
  {
    icon: Clock,
    title: "Gratis opname ter plaatse",
    description:
      "Wij komen bij u langs om de situatie te beoordelen en stellen daarna een heldere offerte op met een vaste prijs per m².",
  },
  {
    icon: Shield,
    title: "Gecertificeerd & betrouwbaar",
    description:
      "Wij werken met gecertificeerde materialen en volgen de geldende normen. U krijgt een duidelijke scope vooraf — geen verrassingen achteraf.",
  },
]

interface WaaromBmKlusSectionProps {
  subtitle?: string
}

export default function WaaromBmKlusSection({
  subtitle = "BM klus BV voert stucwerk, schilderwerk en gevelisolatie uit in de regio Rotterdam en omgeving.",
}: WaaromBmKlusSectionProps) {
  return (
    <section className="scroll-mt-24 bg-secondary/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Waarom BM klus?
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Waarom klanten voor{" "}
          <span className="text-primary">ons kiezen</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>

        {/* Bento grid: image + USP cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Image — spans 2 rows on lg */}
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] sm:min-h-[320px] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0">
            <ResponsiveImage
              baseName="waarom-detail-stucwerk"
              preset="card"
              alt="Detaillering stucwerk na gevelisolatie"
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/8" />
            {/* Glass badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
              <div className="inline-flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-[#EA6C20]" />
                <span className="text-[13px] font-medium text-white/90">
                  Vakmanschap &amp; oog voor detail
                </span>
              </div>
            </div>
          </div>

          {/* USP cards */}
          {usps.map((usp, i) => {
            const Icon = usp.icon
            return (
              <div
                key={usp.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
              >
                <div className="h-[2px] bg-linear-to-r from-primary/50 via-primary/15 to-transparent" />
                <div className="relative p-6">
                  {/* Decorative number */}
                  <span
                    className="pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none text-primary/4 transition-colors group-hover:text-primary/7"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10 transition-all group-hover:bg-primary/12 group-hover:ring-primary/25 group-hover:shadow-[0_0_16px_rgba(234,108,32,0.1)]">
                      <Icon className="h-5 w-5 text-primary/70 transition-colors group-hover:text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {usp.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.7] text-muted-foreground">
                      {usp.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-5">
          <Link
            href="/over-ons/"
            className="group inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
          >
            Meer over ons team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="hidden h-px flex-1 bg-linear-to-r from-primary/15 to-transparent sm:block" />
        </div>
      </div>
    </section>
  )
}
