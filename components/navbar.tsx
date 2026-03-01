"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Onze werken", href: "/onze-werken/" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact/" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Top accent line */}
      <div className={`h-[3px] w-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <img
              src="/images/logo-bm-klus.webp"
              alt="BM Klus BV"
              width={120}
              height={28}
              className={`h-7 w-auto transition-all duration-500 ${
                scrolled ? "brightness-100" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-500 ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {/* Hover underline */}
                <span className="absolute inset-x-2 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
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
              {/* Shine effect on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">Gratis offerte</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm transition-all md:hidden ${
              scrolled
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
        className={`h-px transition-opacity duration-500 ${
          scrolled ? "bg-border/60 opacity-100" : "bg-white/10 opacity-50"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border/30 bg-background/95 px-4 pb-5 pt-3 backdrop-blur-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile phone + CTA */}
          <div className="mt-4 space-y-3 border-t border-border/30 pt-4">
            <a
              href="tel:+31612079808"
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-foreground/70"
            >
              <Phone className="h-4 w-4 text-primary" />
              +31 6 1207 9808
            </a>
            <Link
              href="/contact/"
              className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm"
              onClick={() => setMobileOpen(false)}
            >
              Gratis offerte
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
