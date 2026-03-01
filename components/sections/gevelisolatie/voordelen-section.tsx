// FUTURE EXTRACTION TARGET: /gevelisolatie/
import Image from "next/image"
import { voordelenContent } from "@/lib/content/gevelisolatie"

export default function VoordelenSection() {
  const data = voordelenContent

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Voordelen
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        5 voordelen van{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          buitengevelisolatie
        </span>
      </h2>

      {/* ── Photo + numbered list side by side on lg ── */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-12">

        {/* Photo — sticky on desktop */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/gevelisolatie-voordelen.webp"
              alt="Mooi afgewerkte gevel na buitengevelisolatie"
              width={380}
              height={480}
              className="h-64 w-full object-cover lg:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">Eindresultaat</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">
                Fraaie gevel én lagere energierekening
              </p>
            </div>
          </div>
        </div>

        {/* Numbered list */}
        <div className="divide-y divide-border">
          {data.benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:gap-6"
            >
              {/* number */}
              <span className="text-4xl font-black leading-none tracking-tighter text-primary/20 transition-colors group-hover:text-primary/40 sm:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="self-center">
                <h3 className="text-base font-bold text-foreground sm:text-lg">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs italic text-muted-foreground/60">
        {data.note}
      </p>
    </section>
  )
}
