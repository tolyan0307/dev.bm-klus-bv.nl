"use client"

import { useState } from "react"
import { Phone, FileText, Hammer, CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Gratis inspectie",
    description:
      "We komen langs voor een vrijblijvende opname en advies op maat.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Offerte binnen 48 uur",
    description:
      "U ontvangt een duidelijke offerte met alle kosten en werkzaamheden.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Professionele uitvoering",
    description:
      "Onze ervaren vakmensen zorgen voor een vlekkeloze afwerking.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Oplevering & garantie",
    description:
      "We leveren netjes op en bieden garantie op materiaal en uitvoering.",
  },
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Subtle background texture */}
      <div className="absolute inset-0">
        <img
          src="/images/process-hero.webp"
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background/40" />
        <div
          className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-primary/6 to-transparent"
          style={{ animation: "process-sweep 12s ease-in-out infinite" }}
        />
        <style>{`@keyframes process-sweep{0%,100%{transform:translateX(-100%)}50%{transform:translateX(400%)}}`}</style>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Ons proces
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Zo <span className="text-primary">werken</span> wij
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Van inspectie tot oplevering: transparant, professioneel en zonder
            verrassingen.
          </p>
        </div>

        {/* Desktop: Horizontal roadmap */}
        <div className="mt-16 hidden lg:mt-24 lg:block">
          {/* Progress bar */}
          <div className="relative mx-auto mb-16 max-w-5xl">
            {/* Background track */}
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-border/80" />
            {/* Active fill with shimmer */}
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            >
              <div
                className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: "track-shimmer 2.5s ease-in-out infinite" }}
              />
            </div>
            {/* Pulse at active edge */}
            {activeStep > 0 && (
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ left: `${(activeStep / (steps.length - 1)) * 100}%` }}
              >
                <span className="absolute -inset-1.5 animate-ping rounded-full bg-primary/30" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
              </div>
            )}
            <style>{`@keyframes track-shimmer{0%,100%{transform:translateX(-200%)}50%{transform:translateX(300%)}}`}</style>

            {/* Step nodes on the track */}
            <div className="relative flex items-center justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className="group relative flex flex-col items-center"
                >
                  {/* Node circle */}
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                      index <= activeStep
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "border-border/70 bg-card text-muted-foreground shadow-sm hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={2} />
                  </div>

                  {/* Title below */}
                  <span
                    className={`mt-4 text-sm font-bold transition-colors ${
                      index <= activeStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Expanded content for active step */}
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="flex items-center gap-6 p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  {(() => {
                    const Icon = steps[activeStep].icon
                    return (
                      <Icon
                        className="h-7 w-7 text-primary"
                        strokeWidth={1.5}
                      />
                    )
                  })()}
                </div>

                <div className="flex-1">
                  <div className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    Stap {steps[activeStep].number}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {steps[activeStep].title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked accordion style */}
        <div className="mt-12 space-y-3 lg:hidden">
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={`group w-full rounded-xl border text-left transition-all duration-300 ${
                activeStep === index
                  ? "border-primary/30 bg-card shadow-md"
                  : "border-border bg-card/60 hover:bg-card hover:shadow-sm"
              }`}
            >
              {/* Always visible header */}
              <div className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all ${
                    activeStep === index
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <span className="text-lg font-bold">{step.number}</span>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-base font-bold transition-colors ${
                      activeStep === index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>

                <step.icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    activeStep === index
                      ? "text-primary"
                      : "text-border group-hover:text-primary/40"
                  }`}
                  strokeWidth={2}
                />
              </div>

              {/* Expandable description */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeStep === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <div className="border-t border-border px-5 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
