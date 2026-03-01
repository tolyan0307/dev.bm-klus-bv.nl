import Link from "next/link"
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react"

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bm_klus_bv",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61556805434705",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/boris-mitov-a436902b9",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://nl.pinterest.com/bmklusbv/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24 18.635 24 24 18.633 24 12.013 24 5.393 18.635.028 12.017.028V0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bm-klus-bv",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const serviceLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
  { label: "Sierpleister", href: "/sierpleister/" },
  { label: "Muren stucen", href: "/muren-stucen/" },
]

const companyLinks = [
  { label: "Over ons", href: "/over-ons/" },
  { label: "Onze werken", href: "/onze-werken/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacybeleid", href: "/privacybeleid/" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground">
      <div className="h-px w-full bg-primary" />

      <div className="relative">
        {/* CTA block */}
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Klaar om te beginnen?
              </p>
              <h2 className="text-3xl font-bold leading-tight text-background sm:text-4xl lg:text-5xl">
                Laat uw gevel
                <br />
                <span className="text-primary">transformeren.</span>
              </h2>
            </div>

            <div className="flex shrink-0 gap-3">
              <a
                href="https://wa.me/31612079808"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-lg border-2 border-background/15 bg-background/[0.06] px-6 py-4 text-base font-semibold text-background/80 backdrop-blur-sm transition-all hover:border-background/25 hover:bg-background/[0.12] sm:w-auto"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/15 transition-transform group-hover:scale-110">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.5} />
                </span>
                WhatsApp
              </a>
              <a
                href="#offerte"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 sm:w-auto"
              >
                Offerte aanvragen
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-background/10" />
        </div>

        {/* Info grid */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:flex lg:justify-between">
            {/* Brand */}
            <div className="lg:max-w-[280px]">
              <div className="mb-5">
                <img
                  src="/images/logo-bm-klus.webp"
                  alt="BM Klus BV"
                  width={100}
                  height={24}
                  className="h-6 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm leading-relaxed text-background/70">
                Professionele gevelisolatie en renovatie in de regio Rotterdam.
                Vakmanschap, kwaliteit en persoonlijke service.
              </p>
              <div className="mt-5 flex flex-col gap-1.5 text-xs text-background/50">
                <span>KVK: 90826167</span>
                <span>VCA* gecertificeerd</span>
              </div>
            </div>

            {/* Diensten */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-background/60">
                Diensten
              </h3>
              <nav className="flex flex-col gap-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bedrijf */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-background/60">
                Bedrijf
              </h3>
              <nav className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact + Socials */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-background/60">
                Contact
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/31612079808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-background/70 transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" strokeWidth={1.5} />
                  <span>WhatsApp (snelste reactie)</span>
                </a>
                <a
                  href="mailto:info@bm-klus-bv.nl"
                  className="flex items-center gap-3 text-sm text-background/70 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@bm-klus-bv.nl</span>
                </a>
                <a
                  href="tel:+31612079808"
                  className="flex items-center gap-3 text-sm text-background/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                  <span>+31 6 1207 9808</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-background/70">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>Rotterdam, Nederland</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-background/10 text-background/50 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-background/10" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-xs text-background/50">
              &copy; {new Date().getFullYear()} BM Klus BV &mdash; Alle rechten voorbehouden
            </p>
            <Link
              href="/privacybeleid/"
              className="text-xs text-background/50 transition-colors hover:text-primary"
            >
              Privacybeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
