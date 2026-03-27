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
    <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
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

        {/* Image + USPs */}
        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* Image — matches right column height */}
          <div className="relative min-h-[240px] sm:min-h-[280px]">
            <div className="absolute -bottom-3 -right-3 left-0 top-0 rounded-2xl bg-primary/[0.06]" />
            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]">
              <ResponsiveImage
                baseName="waarom-detail-stucwerk"
                preset="card"
                alt="Detaillering stucwerk na gevelisolatie"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.08]" />
              {/* Glass badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <div className="inline-flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#EA6C20]" />
                  <span className="text-[13px] font-medium text-white/90">
                    Vakmanschap &amp; oog voor detail
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* USPs stack */}
          <div className="flex flex-col justify-center space-y-6">
            {usps.map((usp) => {
              const Icon = usp.icon
              return (
                <div key={usp.title} className="group flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.07] transition-colors group-hover:bg-primary/[0.12]">
                    <Icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {usp.title}
                    </h3>
                    <p className="mt-1 text-sm leading-[1.7] text-foreground/45">
                      {usp.description}
                    </p>
                  </div>
                </div>
              )
            })}

            <div className="pt-2">
              <Link
                href="/over-ons/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline"
              >
                Meer over ons team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
