"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    id: "01",
    title: "Gevelisolatie",
    subtitle: "ETICS systeem",
    description:
      "Professionele buitengevelisolatie voor optimale energiebesparing. Wij plaatsen ETICS-systemen die uw energiekosten drastisch verlagen en het wooncomfort verhogen.",
    image: "/images/service-isolatie.webp",
    href: "/gevelisolatie/",
    features: ["Energielabel verbetering", "Vochtwerend", "Geluidsdemping"],
  },
  {
    id: "02",
    title: "Gevel schilderen",
    subtitle: "Bescherming & uitstraling",
    description:
      "Vakkundig schilderwerk voor een frisse uitstraling en langdurige bescherming tegen weersinvloeden. Keuze uit diverse kleuren.",
    image: "/images/service-coating.webp",
    href: "/gevel-schilderen/",
    features: ["UV-bestendig", "Waterafstotend", "Nette detaillering"],
  },
  {
    id: "03",
    title: "Buiten stucwerk",
    subtitle: "Strakke gevelafwerking",
    description:
      "Duurzaam buitenstucwerk voor een strakke, moderne gevelafwerking. Onderhoudsarm en bestand tegen alle weersomstandigheden.",
    image: "/images/service-renovatie.webp",
    href: "/buiten-stucwerk/",
    features: ["Scheurherstel", "Voegwerk", "Nieuwe afwerking"],
  },
  {
    id: "04",
    title: "Sierpleister",
    subtitle: "Vakmanschap op maat",
    description:
      "Vakkundig sierpleister voor een strakke, moderne gevelafwerking. Van sierpleister tot glad stucwerk — altijd een perfect resultaat.",
    image: "/images/service-stucwerk.webp",
    href: "/sierpleister/",
    features: ["Sierpleister", "Glad stucwerk", "Spachtelputz"],
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const current = services[activeService]

  return (
    <section className="bg-secondary/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Onze Diensten
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Van isolatie tot
            <br />
            <span className="text-primary">renovatie</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Wij zorgen voor een gevel die er mooi uitziet en efficiënt
            presteert.
          </p>
        </div>

        {/* Desktop: Interactive showcase layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-10">
            {/* Left: Navigation tabs + active description + CTA */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-1.5">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className={`group relative flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 ${
                      activeService === index
                        ? "bg-card shadow-md border border-border"
                        : "hover:bg-card/60"
                    }`}
                  >
                    {/* Number */}
                    <span
                      className={`text-xl font-bold transition-colors ${
                        activeService === index
                          ? "text-primary"
                          : "text-border group-hover:text-primary/40"
                      }`}
                    >
                      {service.id}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`text-base font-bold transition-colors ${
                          activeService === index
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-0.5 text-xs transition-colors ${
                          activeService === index
                            ? "text-primary"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Active indicator line */}
                    {activeService === index && (
                      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Active service description + CTA */}
              <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {current.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Link
                  href={current.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  Meer informatie
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Image only - clean visual */}
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
              <img
                src={current.image}
                alt={current.title}
                width={640}
                height={480}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                {/* Number overlay */}
                <span className="absolute bottom-3 right-4 text-4xl font-bold text-background/30">
                  {service.id}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {service.subtitle}
                </p>
                <h3 className="text-lg font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Meer info
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center lg:mt-16">
          <Link
            href="/diensten/"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Alle diensten bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
