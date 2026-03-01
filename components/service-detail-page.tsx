"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Shield,
  Droplet,
  Wrench,
  Brush,
  Clock,
  Euro,
  Phone,
  ChevronDown,
} from "lucide-react"
import { services } from "@/data/services"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function ServiceDetailPage() {
  const [activeService, setActiveService] = useState(0)
  const service = services[activeService]!

  const iconMap: Record<string, React.ReactNode> = {
    shield: <Shield className="h-6 w-6" />,
    droplet: <Droplet className="h-6 w-6" />,
    wrench: <Wrench className="h-6 w-6" />,
    brush: <Brush className="h-6 w-6" />,
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-foreground/95 pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Professionele Geveldiensten
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
              Complete zorg voor
              <br />
              <span className="text-primary">uw gevel</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-background/70 sm:text-xl">
              Van energiebesparende isolatie tot beschermende coating en complete
              renovaties. Wij leveren kwaliteit die jarenlang meegaat.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                Plan gratis inspectie
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+31612079808"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-background/20 bg-background/10 px-8 py-4 text-base font-semibold text-background backdrop-blur-sm transition-all hover:bg-background/20"
              >
                <Phone className="h-5 w-5" />
                +31 6 1207 9808
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="sticky top-16 z-40 border-b border-border bg-background/95 shadow-sm backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {services.map((srv, index) => (
              <button
                key={srv.id}
                onClick={() => setActiveService(index)}
                className={`whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                  activeService === index
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header with icon */}
          <div className="mb-12 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {service.icon && iconMap[service.icon]}
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">
                  {service.subtitle}
                </p>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {service.title}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {service.priceRange && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
                  <Euro className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vanaf</p>
                    <p className="font-semibold text-foreground">
                      {service.priceRange}
                    </p>
                  </div>
                </div>
              )}
              {service.duration && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duur</p>
                    <p className="font-semibold text-foreground">
                      {service.duration}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left column - Image + Description */}
            <div className="lg:col-span-2">
              {/* Image */}
              <div className="mb-8 overflow-hidden rounded-2xl border border-border shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-[400px] w-full object-cover"
                  width={800}
                  height={400}
                  fetchPriority="high"
                />
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  Over deze dienst
                </h3>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                  {service.fullDescription}
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-10">
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Kenmerken & voordelen
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-10 rounded-2xl border border-border bg-secondary/30 p-8">
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Wat levert het u op?
                </h3>
                <div className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <p className="flex-1 text-base leading-relaxed text-foreground">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="mb-10">
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Zo werken wij
                </h3>
                <div className="space-y-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 text-base font-bold text-foreground">
                          {step.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Veelgestelde vragen
                </h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {service.faq.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="rounded-lg border border-border bg-card px-5"
                    >
                      <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right column - CTA Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <Card className="border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-8">
                    <div className="mb-6 text-center">
                      <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                        Offerte aanvragen
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Gratis & vrijblijvend
                      </h3>
                    </div>

                    <div className="mb-6 space-y-4 rounded-lg bg-secondary/50 p-5">
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-foreground">
                          Gratis inspectie bij u thuis
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-foreground">
                          Transparante offerte op maat
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-foreground">
                          Energiebesparingsberekening
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-foreground">
                          Geen verplichtingen
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact/"
                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                      >
                        Plan gratis inspectie
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <a
                        href="tel:+31612079808"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-4 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        <Phone className="h-5 w-5" />
                        Direct bellen
                      </a>
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                      <p className="text-center text-xs text-muted-foreground">
                        Bereikbaar ma-vr 8:00 - 18:00
                        <br />
                        Gemiddelde reactietijd: 2 uur
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="text-2xl font-bold text-primary">15+</p>
                    <p className="text-xs text-muted-foreground">
                      Jaar ervaring
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-xs text-muted-foreground">
                      Projecten
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="text-2xl font-bold text-primary">4.9/5</p>
                    <p className="text-xs text-muted-foreground">
                      Klantbeoordeling
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-xs text-muted-foreground">
                      Garantie
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="border-t border-border bg-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Bekijk ook onze andere diensten
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((_, idx) => idx !== activeService)
              .map((srv) => (
                <button
                  key={srv.id}
                  onClick={() =>
                    setActiveService(services.findIndex((s) => s.id === srv.id))
                  }
                  className="group overflow-hidden rounded-xl border border-border bg-card text-left shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      width={400}
                      height={192}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  </div>

                  <div className="p-6">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {srv.subtitle}
                    </p>
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {srv.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {srv.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Meer informatie
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
