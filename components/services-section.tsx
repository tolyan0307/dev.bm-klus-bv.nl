import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"
import ServicesShowcase, { type ServiceItem } from "@/components/services-showcase"

const servicesData = [
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

const DIR = "/images/services"

function resolveServices(): ServiceItem[] {
  return servicesData.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    description: s.description,
    href: s.href,
    features: s.features,
    imgSrc: getFallbackSrc(s.baseName, DIR, "serviceCard"),
    imgSrcSet: buildSrcSet(s.baseName, DIR, "serviceCard"),
  }))
}

export default function ServicesSection() {
  const services = resolveServices()

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

        <ServicesShowcase services={services} />
      </div>
    </section>
  )
}
