import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-[450px] w-full overflow-hidden sm:h-[500px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20%D1%84%D0%B5%D0%B2%D1%80.%202026%20%D0%B3.%2C%2018_43_19-ZDx9qUYt4qIyNNoM1sp2LraidxSx5r.png"
          alt="Modern huis met professionele gevelisolatie en warme verlichting"
          className="h-full w-full object-cover object-right-top"
        />
        {/* Gradient overlay - cinematic */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(45,42,38,0.85)_0%,rgba(45,42,38,0.6)_25%,rgba(45,42,38,0.15)_45%,transparent_60%)]" />
        {/* Top vignette for navbar blend */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(45,42,38,0.4)] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Decorative vertical line accent */}
      <div className="absolute left-4 top-28 z-10 hidden h-24 w-px bg-gradient-to-b from-transparent via-primary to-transparent sm:left-6 lg:left-8 lg:block" />

      {/* Main content area */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 pt-36 pb-6 sm:px-6 sm:pt-40 lg:px-8 lg:pt-52">
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
              <span className="relative inline-block text-primary">
                geïsoleerd
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/40" />
              </span>{" "}
              & vernieuwd
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg lg:text-xl">
              Bespaar op energie en vergroot uw wooncomfort met professionele gevelisolatie
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-[#d45e18] hover:shadow-xl hover:shadow-primary/30 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Plan gratis inspectie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#diensten"
                className="inline-flex items-center rounded-lg border-2 border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Bekijk onze diensten
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
