"use client"

import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[85vh] w-full overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-home.webp"
          alt="Professionele gevelisolatie door BM Klus BV in Rotterdam"
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
          draggable={false}
        />

        {/* Base darkening layer */}
        <div className="absolute inset-0" style={{ background: "rgba(14,10,6,0.42)" }} />

        {/* Primary content gradient — left-heavy vignette for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, rgba(14,10,6,0.96) 0%, rgba(14,10,6,0.84) 26%, rgba(14,10,6,0.58) 48%, rgba(14,10,6,0.20) 68%, transparent 88%)",
          }}
        />

        {/* Top band — deep dark for the transparent navbar so white text reads clearly */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 180,
            background:
              "linear-gradient(to bottom, rgba(8,5,2,0.90) 0%, rgba(8,5,2,0.62) 40%, transparent 100%)",
          }}
        />

        {/* Subtle warm-orange radial glow — brand accent depth */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "15%",
            left: "-8%",
            width: 440,
            height: 440,
            background:
              "radial-gradient(circle, rgba(232,96,10,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Bottom fade into page background */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 160,
            background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
          }}
        />

        {/* Right-edge vignette */}
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "30%",
            background: "linear-gradient(to left, rgba(14,10,6,0.28), transparent)",
          }}
        />
      </div>

      {/* Main content area */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 pt-36 pb-12 sm:px-6 sm:pt-40 sm:pb-16 lg:px-8 lg:pt-44 lg:pb-20">
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
                Plan gratis inspectie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/diensten/"
                className="inline-flex items-center rounded-lg border-2 border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Bekijk onze diensten
              </Link>
            </div>

            {/* Phone */}
            <a
              href="tel:+31612079808"
              className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white/80"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              Of bel direct: +31 6 1207 9808
            </a>
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
