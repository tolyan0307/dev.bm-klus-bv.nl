"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"

const dienstenSubs = [
  { label: "Gevelisolatie (ETICS)", href: "/gevelisolatie/" },
  { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
  { label: "Sierpleister", href: "/sierpleister/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  { label: "Muren stucen (binnen)", href: "/muren-stucen/" },
  { label: "Alle diensten →", href: "/diensten/" },
]

const navLinks = [
  { label: "Diensten", href: "/diensten/", hasSubs: true },
  { label: "Onze werken", href: "/onze-werken/" },
  { label: "Over ons", href: "/over-ons/" },
  { label: "Contact", href: "/contact/" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dienstenOpen, setDienstenOpen] = useState(false)
  const dienstenRef = useRef<HTMLDivElement>(null)
  const dienstenTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pathname = usePathname()

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const openDiensten = useCallback(() => {
    clearTimeout(dienstenTimeout.current)
    setDienstenOpen(true)
  }, [])

  const closeDiensten = useCallback(() => {
    dienstenTimeout.current = setTimeout(() => setDienstenOpen(false), 150)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // M3: Body scroll lock
  useEffect(() => {
    document.body.style.overflowY = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflowY = "" }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white/75 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-[1.6]"
            : "bg-transparent"
        }`}
      >
        {/* Noise grain overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-0 mix-blend-multiply transition-opacity duration-500 ${
            scrolled || mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Top accent line */}
        <div className={`relative z-10 h-[3px] w-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-opacity duration-500 ${scrolled || mobileOpen ? "opacity-100" : "opacity-0"}`} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
            {/* Logo */}
            <Link href="/" className="relative flex items-center">
              <img
                src="/images/logo-bm-klus.webp"
                alt="BM klus BV"
                width={120}
                height={28}
                fetchPriority="low"
                className={`h-7 w-auto transition-all duration-500 ${
                  scrolled || mobileOpen ? "brightness-100" : "brightness-0 invert"
                }`}
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-2 md:flex">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href)
                const isDiensten = "hasSubs" in link && link.hasSubs

                if (isDiensten) {
                  return (
                    <div
                      key={link.label}
                      ref={dienstenRef}
                      className="relative"
                      onMouseEnter={openDiensten}
                      onMouseLeave={closeDiensten}
                    >
                      <Link
                        href={link.href}
                        className={`group relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          active
                            ? scrolled ? "text-foreground bg-foreground/[0.05]" : "text-white bg-white/[0.08]"
                            : scrolled
                              ? "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04]"
                              : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="relative">
                          {link.label}
                          <span className={`pointer-events-none absolute -bottom-[11px] -inset-x-1 transition-opacity duration-300 ${
                            active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                          }`}>
                            <span className="block h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                            <span className="mx-auto block h-3 w-8 -translate-y-1 bg-primary/25 blur-[6px]" />
                          </span>
                        </span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dienstenOpen ? "rotate-180" : ""}`} />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                          dienstenOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className={`min-w-[260px] overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
                          scrolled
                            ? "border border-border/60 bg-background/90"
                            : "border border-white/[0.08] bg-[#1A1A1A]/85"
                        }`}>
                          <div className={`border-b px-4 py-2.5 transition-colors duration-500 ${
                            scrolled ? "border-border/40" : "border-white/[0.06]"
                          }`}>
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                              scrolled ? "text-muted-foreground/50" : "text-white/30"
                            }`}>
                              Onze diensten
                            </p>
                          </div>
                          <div className="p-1.5">
                            {dienstenSubs.map((sub) => {
                              const isLast = sub.href === "/diensten/"
                              const active = isActive(pathname, sub.href)
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setDienstenOpen(false)}
                                  className={`group relative flex items-center gap-2.5 overflow-hidden rounded-xl px-3.5 py-2.5 text-sm transition-all ${
                                    isLast
                                      ? `mt-1 border-t pt-3 ${scrolled ? "border-border/40" : "border-white/[0.06]"}`
                                      : ""
                                  } ${
                                    active
                                      ? "bg-primary/10 font-semibold text-primary"
                                      : scrolled
                                        ? "text-foreground/70 hover:bg-secondary hover:text-foreground"
                                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  <span className={`pointer-events-none absolute inset-y-1.5 left-0 w-px transition-opacity duration-300 ${
                                    active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                                  }`}>
                                    <span className="block h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                                    <span className="absolute left-0 top-1/2 h-5 w-3 -translate-x-1 -translate-y-1/2 bg-primary/30 blur-[5px]" />
                                  </span>
                                  <span className="flex-1">{sub.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`group relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? scrolled ? "text-foreground bg-foreground/[0.05]" : "text-white bg-white/[0.08]"
                        : scrolled
                          ? "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                    <span className={`pointer-events-none absolute inset-x-3 -bottom-0.5 transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}>
                      <span className="block h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <span className="mx-auto block h-3 w-8 -translate-y-1 bg-primary/25 blur-[6px]" />
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Right side: phone + CTA */}
            <div className="hidden items-center gap-5 md:flex">
              <a
                href="tel:+31612079808"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${
                  scrolled
                    ? "text-foreground/70 hover:text-primary"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">+31 6 1207 9808</span>
              </a>

              <Link
                href="/contact/"
                className="group relative inline-flex items-center overflow-hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-lg"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative">Offerte aanvragen</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm transition-all md:hidden ${
                scrolled || mobileOpen
                  ? "border-border/50 bg-background/60 text-foreground hover:bg-secondary"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className={`relative z-10 h-px transition-opacity duration-500 ${
            scrolled || mobileOpen ? "bg-black/[0.06] opacity-100" : "bg-white/10 opacity-50"
          }`}
        />

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
            mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background px-5 pb-6 pt-2">
            {/* M5: Section label */}
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/40">
              Navigatie
            </p>

            {/* Nav links with diensten sub-items */}
            <div className="space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href)
                const isDiensten = "hasSubs" in link && link.hasSubs
                const delay = mobileOpen ? `${i * 60}ms` : "0ms"
                return (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className={`relative flex items-center justify-between rounded-lg px-4 py-3.5 text-[15px] font-medium transition-all duration-300 ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
                      }`}
                      style={{
                        transitionDelay: delay,
                        opacity: mobileOpen ? 1 : 0,
                        transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
                      }}
                      onClick={closeMobile}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      <span className={active ? "font-semibold" : ""}>{link.label}</span>
                      <ArrowRight className={`h-4 w-4 transition-all duration-200 ${
                        active ? "text-primary/60" : "text-foreground/20"
                      }`} />
                    </Link>

                    {/* Sub-items under Diensten */}
                    {isDiensten && (
                      <div
                        className="ml-4 space-y-0.5 border-l-2 border-border/50 pl-3 pt-1"
                        style={{
                          transitionDelay: mobileOpen ? `${i * 60 + 40}ms` : "0ms",
                          opacity: mobileOpen ? 1 : 0,
                          transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
                          transition: "opacity 300ms, transform 300ms",
                        }}
                      >
                        {dienstenSubs.filter((s) => s.href !== "/diensten/").map((sub) => {
                          const subActive = isActive(pathname, sub.href)
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={closeMobile}
                              className={`relative flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                                subActive
                                  ? "bg-primary/10 font-semibold text-primary"
                                  : "text-foreground/55 hover:bg-secondary/60 hover:text-foreground/80"
                              }`}
                            >
                              {subActive && (
                                <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-primary" />
                              )}
                              {sub.label}
                              {subActive && (
                                <ArrowRight className="h-3.5 w-3.5 text-primary/60" />
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* M5: Separator + section label */}
            <div className="my-4 h-px bg-border/40" />
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/40">
              Contact
            </p>

            {/* M6: Phone + CTA */}
            <a
              href="tel:+31612079808"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary/80 hover:text-foreground"
              style={{
                transitionDelay: mobileOpen ? `${navLinks.length * 60 + 30}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </span>
              +31 6 1207 9808
            </a>

            {/* M6: CTA with shine effect */}
            <Link
              href="/contact/"
              className="group relative mt-3 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
              style={{
                transitionDelay: mobileOpen ? `${navLinks.length * 60 + 90}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(8px)",
              }}
              onClick={closeMobile}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Offerte aanvragen</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* M4: Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />
    </>
  )
}
