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
          className="h-full w-full object-cover opacity-[0.03]"
        />
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
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-border" />
            {/* Active fill */}
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

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
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50"
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
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div className="flex items-center gap-8 p-10">
                {/* Large number */}
                <span className="text-8xl font-bold leading-none text-primary/10">
                  {steps[activeStep].number}
                </span>

                <div className="flex-1">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    Stap {steps[activeStep].number}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {steps[activeStep].title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Icon */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  {(() => {
                    const Icon = steps[activeStep].icon
                    return (
                      <Icon
                        className="h-10 w-10 text-primary"
                        strokeWidth={1.5}
                      />
                    )
                  })()}
                </div>
              </div>

              {/* Step indicators */}
              <div className="flex border-t border-border">
                {steps.map((step, index) => (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                      index === activeStep
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                    }`}
                  >
                    <span className="font-bold">{step.number}</span>
                    <span className="hidden xl:inline">{step.title}</span>
                  </button>
                ))}
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
                      : "bg-secondary/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
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
