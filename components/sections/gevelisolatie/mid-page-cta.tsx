import Link from "next/link"
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react"

const checks = [
  "Gratis en vrijblijvend",
  "Offerte binnen 2 werkdagen",
  "Geen verborgen kosten",
]

export default function MidPageCTA() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #252525 100%)" }}
    >
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      {/* Orange glow — top-right corner accent only */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8600A] opacity-[0.07] blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Left: message */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8600A]">
              Vrijblijvend advies · Rotterdam
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Klaar voor een warme,{" "}
              <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                goed geïsoleerde gevel?
                  </span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Wij beoordelen uw gevel ter plekke, adviseren de juiste RC-waarde en leveren binnen 2 werkdagen een vaste offerte zonder verrassingen.
            </p>

            {/* Trust signals */}
            <div className="mt-5 flex flex-col gap-2">
              {checks.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-[15px] w-[15px] shrink-0 text-[#E8600A]" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:hidden">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 bg-[#E8600A] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a] rounded-sm"
              >
                Plan gratis inspectie
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+31612079808"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                +31 6 1207 9808
              </a>
            </div>
          </div>

          {/* Right: buttons — desktop only */}
          <div className="hidden flex-col gap-3 lg:flex lg:min-w-[220px]">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#E8600A] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
            >
              Plan gratis inspectie
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+31612079808"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              +31 6 1207 9808
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
