import Image from "next/image"
import { ArrowRight, Phone, Star, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[75vh] w-full overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-home.webp"
          alt="Professionele gevelisolatie door BM Klus BV in Rotterdam"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Base darkening layer */}
        <div className="absolute inset-0 bg-[rgba(14,10,6,0.38)]" />

        {/* Cinematic left vignette — wide, soft gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,10,6,0.88) 0%, rgba(14,10,6,0.72) 22%, rgba(14,10,6,0.44) 42%, rgba(14,10,6,0.12) 62%, transparent 80%)",
          }}
        />

        {/* Top band — navbar readability */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 160,
            background:
              "linear-gradient(to bottom, rgba(8,5,2,0.82) 0%, rgba(8,5,2,0.50) 45%, transparent 100%)",
          }}
        />

        {/* Bottom — clean dark edge, no white bleed */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 120,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(14,10,6,0.30) 100%)",
          }}
        />

        {/* Subtle warm-orange radial glow — brand accent depth */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "18%",
            left: "-6%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(232,96,10,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Film-grain noise overlay for premium texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Main content area — vertically centered */}
      <div className="relative z-10 flex min-h-[75vh] flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="max-w-xl">
            {/* Small label */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="h-px w-10 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
                Gevelspecialist regio Rotterdam
              </span>
            </div>

            {/* Heading - large, bold, with accent */}
            <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
              Uw gevel, perfect
              <br />
              <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                geïsoleerd
                  </span>
              {" "}& vernieuwd
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg lg:text-xl">
              Bespaar op energie en vergroot uw wooncomfort met professionele gevelisolatie
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-[#d45e18] hover:shadow-xl hover:shadow-primary/30 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Offerte aanvragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/diensten/"
                className="inline-flex items-center rounded-lg border-2 border-white/30 bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/25 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Bekijk onze diensten
              </Link>
            </div>

            {/* Trust signals */}
            <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {[
                "Gratis inspectie & offerte",
                "ETICS gecertificeerd systeem",
                "Regio Rotterdam (±100 km)",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Stars + phone */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-sm font-bold text-white/85">4.8 / 5</span>
              </div>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <a
                href="tel:+31612079808"
                className="flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                +31 6 12 07 98 08
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical region label — desktop only */}
      <div
        aria-hidden="true"
        className="absolute bottom-14 right-7 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="h-14 w-px bg-white/18" />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30"
          style={{ writingMode: "vertical-rl" }}
        >
          Rotterdam · Rijnmond · Drechtsteden
        </span>
      </div>
    </section>
  )
}
