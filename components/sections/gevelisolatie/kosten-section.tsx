// FUTURE EXTRACTION TARGET: /gevelisolatie/kosten/
import Link from "next/link"
import ResponsiveImage from "@/components/responsive-image"
import { kostenContent } from "@/lib/content/gevelisolatie"
import { Check, ArrowRight } from "lucide-react"

export default function KostenSection() {
  const data = kostenContent

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Kosten & prijs
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Kosten van{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          buitengevelisolatie
        </span>{" "}
        <span className="text-foreground">(wat bepaalt de prijs?)</span>
      </h2>

      {/* ── Photo banner ── */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-rows-[180px_1fr] lg:grid-rows-none lg:grid-cols-[380px_1fr]">

          {/* Photo */}
          <div className="relative overflow-hidden">
            <ResponsiveImage
              baseName="gevelisolatie-kosten"
              dir="/images"
              preset="serviceCard"
              alt="Adviesgesprek over kosten gevelisolatie"
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Kosten & prijs
              </span>
            </div>
          </div>

          {/* Intro paragraphs */}
          <div className="flex flex-col justify-center gap-3 p-6 lg:p-8">
            <span className="hidden text-[11px] font-bold uppercase tracking-widest text-primary lg:block">
              Opname & offertes
            </span>
            {data.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {p}
              </p>
            ))}

          </div>
        </div>
      </div>

      {/* ── Main two-column grid ── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* LEFT — kostenfactoren als numbered list */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {data.kostenfactoren.h3}
          </p>
          <div className="divide-y divide-border">
            {data.kostenfactoren.bullets.map((b, i) => (
              <div key={b} className="flex items-center gap-4 py-3">
                <span className="w-6 shrink-0 text-xs font-black tabular-nums text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground/80">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — prijsopbouw + callout */}
        <div className="flex flex-col gap-4">

          {/* Prijsopbouw checklist */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              {data.prijsopbouw.h3}
            </p>
            <ul className="space-y-2.5">
              {data.prijsopbouw.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-snug text-foreground/70">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Callout — informational, no hard CTA */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
              {data.callout}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Vraag een gratis opname aan voor een prijs op maat, of{" "}
              <Link href="/gevelisolatie/kosten/" className="font-semibold text-primary underline-offset-2 hover:underline">
                bekijk alle kostenfactoren →
              </Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
