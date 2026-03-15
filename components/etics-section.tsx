import { ArrowRight, Check, Zap, TrendingUp, Shield } from "lucide-react"
import ResponsiveImage from "@/components/responsive-image"
import Link from "next/link"

const benefits = [
  "Energierekening tot 40% lager (bron: Milieu Centraal)",
  "Verhoogt de waarde van uw woning",
  "Duurzaam en onderhoudsarm",
]

const stats = [
  { icon: Zap, value: "tot 40%", label: "energiebesparing*" },
  { icon: TrendingUp, value: "2–4×", label: "meer woningwaarde" },
  { icon: Shield, value: "25 jr", label: "systeemlevensduur" },
]

const finishes = [
  { name: "Stucwerk", baseName: "etics-layer-wall-ext", href: "/buiten-stucwerk/" },
  { name: "Steenstrips", baseName: "etics-layer-insulation-ext", href: "/gevelisolatie/afwerkingen/" },
  { name: "Schilderwerk", baseName: "etics-layer-mesh-ext", href: "/gevel-schilderen/" },
  { name: "Sierpleister", baseName: "etics-layer-finish-ext", href: "/sierpleister/" },
]

export default function EticsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Hero area ── */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left — content */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Onze specialiteit
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Buitengevelisolatie{" "}
              <span className="text-primary">(ETICS)</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Een bewezen isolatiemethode waarbij we isolatieplaten aan de
              buitenkant van uw gevel aanbrengen. Optimale energiebesparing
              en een frisse uitstraling — voor tientallen jaren.
            </p>

            <div className="mt-7 space-y-2.5 border-l-2 border-primary/25 pl-5">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                  <span className="text-sm font-medium text-foreground sm:text-base">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href="/gevelisolatie/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                Meer over gevelisolatie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right — warm, soft image */}
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-4 rounded-3xl bg-primary/4 sm:-inset-5" />

            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/40">
              <ResponsiveImage
                baseName="gevelisolatie-voordelen"
                dir="/images"
                preset="serviceCard"
                alt="Buitengevelisolatie (ETICS) — professioneel resultaat"
                className="aspect-4/3 w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">ETICS gecertificeerd · 25 jr garantie</span>
              </div>
              <span className="text-xs font-bold text-foreground/60">1200+ gevels</span>
            </div>
          </div>
        </div>

        {/* ── Stats ── (asterisk footnote rendered below the grid) */}
        <div className="mt-12 hidden grid-cols-3 gap-4 sm:mt-12 sm:grid lg:mt-14">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-border/60 bg-card/80 px-6 py-5 shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
            >
              <Icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
              <span className="mt-2 block text-3xl font-black tracking-tight text-foreground">
                {value}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 hidden text-[11px] leading-snug text-muted-foreground/60 sm:block">
          * Indicatief; werkelijke besparing verschilt per woning (bron: Milieu Centraal).
        </p>

        {/* ── Finishes ── */}
        <div className="mt-12 lg:mt-14">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Afwerking
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Afwerkingsmogelijkheden
              </h3>
            </div>
            <Link
              href="/gevelisolatie/afwerkingen/"
              className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
            >
              Alle afwerkingen
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {finishes.map((finish) => (
              <Link
                key={finish.name}
                href={finish.href}
                className="group overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm transition-all hover:border-primary/25 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-4/5 overflow-hidden">
                  <ResponsiveImage
                    baseName={finish.baseName}
                    dir="/images"
                    preset="serviceCard"
                    alt={finish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <p className="text-sm font-bold text-foreground">{finish.name}</p>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/gevelisolatie/afwerkingen/"
            className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:hidden"
          >
            Alle afwerkingen
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
