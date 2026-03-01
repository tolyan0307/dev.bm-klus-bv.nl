import { Shield, Users, Clock, Award } from "lucide-react"

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
  subtitle = "BM Klus BV voert stucwerk, schilderwerk en gevelisolatie uit in de regio Rotterdam en omgeving.",
}: WaaromBmKlusSectionProps) {
  return (
    <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Waarom BM Klus?
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Waarom klanten voor{" "}
          <span className="text-primary">ons kiezen</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>

        {/* USP Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {usps.map((usp) => {
            const Icon = usp.icon
            return (
              <div
                key={usp.title}
                className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {usp.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {usp.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
