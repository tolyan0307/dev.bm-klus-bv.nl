// FUTURE EXTRACTION TARGET: /gevelisolatie/
import Image from "next/image"
import { watIsEticsContent } from "@/lib/content/gevelisolatie"
import { Check, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

const layers = [
  {
    num: "01",
    label: "Afwerklaag",
    detail: "Stuc / sierpleister / steenstrips",
    mm: "14–20 mm",
    bar: "w-full",
    accent: "bg-[#EA6C20]",
    fill: "bg-[#EA6C20]/10",
  },
  {
    num: "02",
    label: "Wapeningslaag",
    detail: "Mortel + glasvezelweefsel",
    mm: "5–8 mm",
    bar: "w-[50%]",
    accent: "bg-[#EA6C20]/60",
    fill: "bg-[#EA6C20]/[0.05]",
  },
  {
    num: "03",
    label: "Isolatieplaten",
    detail: "EPS · PIR · minerale wol",
    mm: "80–160 mm",
    bar: "w-[88%]",
    accent: "bg-[#EA6C20]/35",
    fill: "bg-muted/60",
  },
  {
    num: "04",
    label: "Lijm & pluggen",
    detail: "Lijmmortel + mechanische verankering",
    mm: "10–20 mm",
    bar: "w-[38%]",
    accent: "bg-[#E8DDD0]",
    fill: "bg-muted/35",
  },
  {
    num: "05",
    label: "Bestaande gevel",
    detail: "Baksteen · beton · cellenbeton",
    mm: "—",
    bar: "w-[65%]",
    accent: "bg-[#6B655E]/25",
    fill: "bg-muted/20",
  },
]

export default function WatIsEticsSection() {
  const data = watIsEticsContent

  return (
    <section id={data.id} className="scroll-mt-24 py-12 sm:py-16">

      {/* ── Eyebrow + heading + intro ── */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          Wat is het?
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Wat is{" "}
        <span className="relative inline-block text-primary">
          buitengevelisolatie?
          <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/30" />
        </span>
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {data.intro}
      </p>

      {/* ── Single framed panel ── */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-lg ring-1 ring-primary/5">

        {/* Row 1: Photo — full width, cinematic */}
        <div className="relative h-56 w-full sm:h-72 lg:h-80">
          <Image
            src="/images/wat-is-gevelisolatie.webp"
            alt="Montage van buitengevelisolatie op een woning in regio Rotterdam"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-[#EA6C20]/20" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            <span className="mb-2.5 inline-block self-start rounded-sm bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-sm">
              ETICS systeem
            </span>
            <p className="max-w-sm text-sm font-semibold leading-snug text-white sm:text-base">
              Isolatie aan de buitenzijde —{" "}
              <span className="font-normal text-white/70">gevel én comfort in één arbeidsgang.</span>
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Row 2: Three equal columns */}
        <div className="grid divide-y divide-primary/10 sm:divide-x sm:divide-y-0 lg:grid-cols-3">

          {/* Col A: Wandopbouw */}
          <div className="flex flex-col p-5 lg:p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Wandopbouw — buiten → binnen
            </p>
            <div className="flex flex-1 flex-col gap-px overflow-hidden rounded-xl border border-primary/15 shadow-sm">
              {layers.map((layer) => (
                <div
                  key={layer.num}
                  className={`relative flex items-center gap-0 overflow-hidden transition-all hover:brightness-[0.97] ${layer.fill}`}
                >
                  <div className={`h-full w-[3px] shrink-0 self-stretch ${layer.accent}`} />

                  <div className="relative flex-1 px-3 py-3">
                    <div
                      className={`absolute inset-y-0 left-0 ${layer.accent} opacity-[0.10] ${layer.bar}`}
                    />
                    <div className="relative flex items-center gap-2">
                      <span className="w-5 shrink-0 text-[10px] font-bold tabular-nums text-primary/60">
                        {layer.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[12px] font-semibold leading-tight text-foreground">
                          {layer.label}
                        </span>
                        <span className="block text-[10px] leading-snug text-muted-foreground/70">
                          {layer.detail}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-full bg-card px-2 py-0.5 text-[9px] font-semibold tabular-nums text-muted-foreground/60 ring-1 ring-primary/15">
                        {layer.mm}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[10px] text-muted-foreground/40">
              Diktes indicatief — exacte opbouw na opname ter plaatse.
            </p>
          </div>

          {/* Col B: Wanneer kiezen */}
          <div className="flex flex-col bg-primary/[0.025] p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/10">
                <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Wanneer kiezen
              </p>
            </div>
            <ul className="flex-1 space-y-2.5">
              {data.wanneerKiezen.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-primary/5">
                  <span className="mt-[6px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[8px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/75">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col C: Eerst regelen + CTA */}
          <div className="flex flex-col p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border">
                <AlertTriangle className="h-3 w-3 text-muted-foreground/60" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
                Eerst regelen
              </p>
            </div>
            <ul className="flex-1 space-y-2.5">
              {data.wanneerAnders.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              Benieuwd wat dit kost?{" "}
              <Link
                href="/gevelisolatie/kosten/"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Bekijk de kosten per m² →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
