// FUTURE EXTRACTION TARGET: /gevelisolatie/kosten/
import Image from "next/image"
import Link from "next/link"
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
        <span className="text-foreground">(prijs per m²)</span>
      </h2>

      {/* ── Photo banner ── */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-rows-[180px_1fr] lg:grid-rows-none lg:grid-cols-[380px_1fr]">

          {/* Photo */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/gevelisolatie-kosten.webp"
              alt="Adviesgesprek over kosten gevelisolatie"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Gratis inspectie
              </span>
            </div>
          </div>

          {/* Intro paragraphs + richtprijzen */}
          <div className="flex flex-col justify-center gap-3 p-6 lg:p-8">
            <span className="hidden text-[11px] font-bold uppercase tracking-widest text-primary lg:block">
              Opname & offertes
            </span>
            {data.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {p}
              </p>
            ))}

            {/* Richtprijzen */}
            {data.richtprijzen && (
              <div className="mt-2">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {data.richtprijzen.label}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {data.richtprijzen.cards.map((card) => (
                    <div
                      key={card.title}
                      className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
                    >
                      <span className="text-xs leading-snug text-foreground/70">{card.title}</span>
                      <span className="shrink-0 text-sm font-black text-primary">{card.range}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 space-y-1">
                  {data.richtprijzen.noteLines.map((line) => (
                    <p key={line} className="text-[11px] leading-relaxed text-muted-foreground/70">
                      {line}
                    </p>
                  ))}
                  <p className="text-[11px] leading-relaxed text-muted-foreground/70">
                    De prijs wordt ook beïnvloed door de gekozen afwerking.{" "}
                    <Link href="/gevelisolatie/afwerkingen/" className="font-semibold text-primary underline-offset-2 hover:underline">
                      Afwerkingen vergelijken →
                    </Link>
                  </p>
                </div>
              </div>
            )}
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

          {/* Callout */}
          <div className="rounded-xl bg-primary p-6">
            <p className="text-sm font-semibold leading-relaxed text-primary-foreground sm:text-base">
              {data.callout}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                Plan gratis inspectie
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/gevelisolatie/kosten/"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
              >
                Kosten & prijs per m²
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
