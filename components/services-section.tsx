"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"

const services = [
  {
    id: "01",
    title: "Gevelisolatie",
    subtitle: "ETICS systeem",
    description:
      "Professionele buitengevelisolatie voor optimale energiebesparing. Wij plaatsen ETICS-systemen die uw energiekosten drastisch verlagen en het wooncomfort verhogen.",
    baseName: "service-isolatie",
    href: "/gevelisolatie/",
    features: ["Energielabel verbetering", "Vochtwerend", "Geluidsdemping"],
  },
  {
    id: "02",
    title: "Gevel schilderen",
    subtitle: "Bescherming & uitstraling",
    description:
      "Vakkundig schilderwerk voor een frisse uitstraling en langdurige bescherming tegen weersinvloeden. Keuze uit diverse kleuren.",
    baseName: "service-coating",
    href: "/gevel-schilderen/",
    features: ["UV-bestendig", "Waterafstotend", "Nette detaillering"],
  },
  {
    id: "03",
    title: "Buiten stucwerk",
    subtitle: "Strakke gevelafwerking",
    description:
      "Duurzaam buitenstucwerk voor een strakke, moderne gevelafwerking. Onderhoudsarm en bestand tegen alle weersomstandigheden.",
    baseName: "service-renovatie",
    href: "/buiten-stucwerk/",
    features: ["Scheurherstel", "Voegwerk", "Nieuwe afwerking"],
  },
  {
    id: "04",
    title: "Sierpleister",
    subtitle: "Vakmanschap op maat",
    description:
      "Vakkundig sierpleister voor een strakke, moderne gevelafwerking. Van sierpleister tot glad stucwerk — altijd een perfect resultaat.",
    baseName: "service-stucwerk",
    href: "/sierpleister/",
    features: ["Sierpleister", "Glad stucwerk", "Spachtelputz"],
  },
  {
    id: "05",
    title: "Muren stucen",
    subtitle: "Binnen strak & sausklaar",
    description:
      "Professioneel stucwerk voor binnenwanden. Behangklaar of sausklaar opgeleverd — ideaal bij renovatie, verbouwing of nieuwbouw.",
    baseName: "dienst-muren",
    href: "/muren-stucen/",
    features: ["Sausklaar", "Strakke wanden", "Renovatie"],
  },
]

function ServiceImage({
  baseName,
  alt,
  className,
  loading = "lazy",
}: {
  baseName: string
  alt: string
  className?: string
  loading?: "lazy" | "eager"
}) {
  const dir = "/images/services"
  return (
    <img
      src={getFallbackSrc(baseName, dir, "serviceCard")}
      srcSet={buildSrcSet(baseName, dir, "serviceCard") || undefined}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
      alt={alt}
      width={640}
      height={480}
      loading={loading}
      decoding="async"
      className={className}
    />
  )
}

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const current = services[activeService]

  const [isLg, setIsLg] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    setIsLg(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsLg(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return (
    <section className="bg-secondary/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Onze Diensten
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
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
            <Link
              href="/diensten/"
              className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
            >
              Alle diensten bekijken
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Desktop: Interactive showcase layout */}
        {isLg !== false && (
        <div className={isLg === null ? "hidden lg:block" : ""}>
          <div className="grid grid-cols-2 gap-10 items-stretch">
            {/* Left: Navigation tabs + active description */}
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
                    <span
                      className={`text-xl font-bold transition-colors ${
                        activeService === index
                          ? "text-primary"
                          : "text-muted-foreground/40 group-hover:text-primary/40"
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
                            : "text-muted-foreground/80"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                      <Link
                        href={service.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-1.5 inline-flex items-center gap-1 text-xs font-medium underline-offset-2 transition-colors hover:underline ${
                          activeService === index
                            ? "text-primary"
                            : "text-muted-foreground/70 group-hover:text-primary/70"
                        }`}
                      >
                        Meer info <ArrowRight size={11} />
                      </Link>
                    </div>

                    {activeService === index && (
                      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Active service description */}
              <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-md">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {current.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-secondary/80 px-3 py-1.5 text-xs font-semibold text-foreground ring-1 ring-border/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Image crossfade — all 5 stacked, opacity toggles */}
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
              {services.map((service, index) => (
                <ServiceImage
                  key={service.id}
                  baseName={service.baseName}
                  alt={service.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    activeService === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Mobile/Tablet: Stacked cards — lazy loaded, below the fold */}
        {isLg !== true && (
        <div className={`grid gap-6 sm:grid-cols-2 ${isLg === null ? "lg:hidden" : ""}`}>
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <ServiceImage
                  baseName={service.baseName}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                <span className="absolute bottom-3 right-4 text-4xl font-bold text-background/30">
                  {service.id}
                </span>
              </div>

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
        )}

        {/* Mobile-only bottom CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/diensten/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Alle diensten bekijken
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
