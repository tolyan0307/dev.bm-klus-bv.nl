// FUTURE EXTRACTION TARGET: /gevelisolatie/
import Image from "next/image"
import { watIsEticsContent } from "@/lib/content/gevelisolatie"
import { Check, AlertTriangle, Layers, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

const layers = [
  {
    label: "Afwerklaag",
    sub: "Stuc, sierpleister of steenstrips",
    color: "bg-primary",
    barWidth: "100%",
    thickness: "14–20 mm",
  },
  {
    label: "Wapeningslaag",
    sub: "Mortel + glasvezelweefsel",
    color: "bg-primary/70",
    barWidth: "88%",
    thickness: "5–8 mm",
  },
  {
    label: "Isolatieplaten",
    sub: "EPS, PIR of minerale wol",
    color: "bg-primary/45",
    barWidth: "76%",
    thickness: "80–160 mm",
  },
  {
    label: "Lijm / bevestiging",
    sub: "Lijmmortel en/of pluggen",
    color: "bg-primary/25",
    barWidth: "64%",
    thickness: "10–20 mm",
  },
  {
    label: "Bestaande gevel",
    sub: "Baksteen, beton of cellenbeton",
    color: "bg-muted-foreground/15",
    barWidth: "52%",
    thickness: "—",
  },
]

export default function WatIsEticsSection() {
  const data = watIsEticsContent

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Section header ── */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          Wat is het?
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Wat is{" "}
        <span className="text-primary decoration-primary/30 underline decoration-[3px] underline-offset-4">
          buitengevelisolatie?
        </span>
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {data.intro}
      </p>

      {/* ── Hero image with floating badge ── */}
      <div className="relative mt-10 overflow-hidden rounded-2xl shadow-xl">
        <div className="aspect-[21/9] w-full">
          <Image
            src="/images/wat-is-gevelisolatie.webp"
            alt="Montage van buitengevelisolatie op een woning"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        {/* Floating info strip */}
        <div className="absolute bottom-0 inset-x-0 flex items-end justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">ETICS systeem</p>
              <p className="text-[11px] text-white/60">Gecertificeerd &amp; bewezen</p>
            </div>
          </div>
          <span className="hidden rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-md ring-1 ring-white/10 sm:inline-flex">
            Regio Rotterdam e.o.
          </span>
        </div>
      </div>

      {/* ── Two-column: Layer diagram + When to choose ── */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">

        {/* ── LEFT: ETICS layer diagram ── */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Diagram header */}
          <div className="flex items-center gap-2.5 bg-secondary/40 px-6 py-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-3.5 w-3.5 text-primary" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
                ETICS opbouw
              </p>
              <p className="text-[10px] text-muted-foreground">Van buiten naar binnen</p>
            </div>
          </div>

          {/* Layer rows */}
          <div className="divide-y divide-border/50">
            {layers.map((layer, i) => (
              <div
                key={layer.label}
                className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/30"
              >
                {/* Number */}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold tabular-nums text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {i + 1}
                </span>

                {/* Bar visualisation */}
                <div className="w-24 shrink-0 sm:w-28">
                  <div
                    className={`h-5 rounded ${layer.color} transition-all duration-300`}
                    style={{ width: layer.barWidth }}
                  />
                </div>

                {/* Label */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug text-foreground">
                    {layer.label}
                  </p>
                  <p className="text-[11px] leading-snug text-muted-foreground">
                    {layer.sub}
                  </p>
                </div>

                {/* Thickness badge */}
                <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1 text-[10px] font-semibold tabular-nums text-muted-foreground">
                  {layer.thickness}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: When to choose / when not + CTA ── */}
        <div className="flex flex-col gap-5">

          {/* Wanneer kiezen */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 shadow-sm">
                <Check className="h-4 w-4 text-primary" strokeWidth={3} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {data.wanneerKiezen.h3}
              </p>
            </div>
            <ul className="space-y-3.5">
              {data.wanneerKiezen.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Wanneer anders */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-transparent p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted shadow-sm">
                <AlertTriangle className="h-4 w-4 text-muted-foreground/60" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                {data.wanneerAnders.h3}
              </p>
            </div>
            <ul className="space-y-3.5">
              {data.wanneerAnders.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">
                  Benieuwd wat ETICS kost voor uw woning?
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Gratis opname — offerte binnen 24–48 uur
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-[#d46218] hover:shadow-md"
                >
                  Gratis opname plannen
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/gevelisolatie/kosten/"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Kosten
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
