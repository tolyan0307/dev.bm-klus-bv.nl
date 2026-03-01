import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const benefits = [
  "Energierekening tot 40% lager",
  "Verhoogt de waarde van uw woning",
  "Duurzaam en onderhoudsarm",
]

const finishes = [
  {
    name: "Stucwerk",
    image: "/images/etics-layer-wall-ext.webp",
  },
  {
    name: "Steenstrips",
    image: "/images/etics-layer-insulation-ext.webp",
  },
  {
    name: "Schilderwerk",
    image: "/images/etics-layer-mesh-ext.webp",
  },
  {
    name: "Sierpleister",
    image: "/images/etics-layer-finish-ext.webp",
  },
]

export default function EticsSection() {
  return (
    <section className="bg-secondary/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: Two-column layout -- text left, image right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Header + description + benefits + CTA */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Onze specialiteit
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Buitengevelisolatie{" "}
              <span className="text-primary">(ETICS)</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Een bewezen isolatiemethode waarbij we isolatieplaten aan de
              buitenkant van uw gevel aanbrengen. Optimale energiebesparing en
              een frisse uitstraling.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-foreground sm:text-base">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/gevelisolatie/"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Meer over gevelisolatie
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Main image */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="/images/etics-detail.webp"
              alt="ETICS gevelisolatie systeem detail"
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
          </div>
        </div>

        {/* Bottom: Finish options in a full-width row */}
        <div className="mt-16 lg:mt-24">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Afwerkingsmogelijkheden
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {finishes.map((finish) => (
              <div
                key={finish.name}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={finish.image}
                    alt={finish.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Name overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-4 pb-4 pt-12">
                  <p className="text-base font-semibold text-background sm:text-lg">
                    {finish.name}
                  </p>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
