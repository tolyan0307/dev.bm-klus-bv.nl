import Link from "next/link";
import dynamic from "next/dynamic";
import ResponsiveImage from "@/components/responsive-image";
import ContactFormCard from "@/components/contact/ContactFormCard";
import ContactOpeningHours from "@/components/contact/ContactOpeningHours";

const QuoteModal = dynamic(() => import("@/components/quote-modal"));
const TrustStrip = dynamic(() => import("@/components/trust-strip"));
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
);
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Home,
  PhoneCall,
  MessageSquare,
  AtSign,
  Hammer,
  Star,
} from "lucide-react"
import GoogleRatingBadge from "@/components/google-rating-badge";
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <ResponsiveImage
            baseName="rottekade-gevelisolatie-10cm-na-01"
            dir="/images/projects"
            preset="hero"
            alt="Gevelisolatie project — moderne woning aan de Rottekade"
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/40" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Contact", href: "/contact/" },
              ].map((item, i, arr) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
                  {i === arr.length - 1 ? (
                    <span className="font-medium text-white/90">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="text-white/60 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
            <div className="flex flex-col gap-5 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Contact &amp; offerte
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Neem contact op &amp;{" "}
                <span className="text-primary">vraag een offerte aan</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Heeft u een vraag of wilt u een vrijblijvende offerte? Vul het
                formulier in of neem direct contact op — wij reageren snel
                tijdens onze openingstijden.
              </p>

              <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {[
                  "Snel antwoord tijdens openingstijden",
                  "Duidelijke offerte met scope en planning",
                  "Regio Rotterdam en omgeving (±100 km)",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                <span>Rotterdam &amp; omgeving · Zuid-Holland</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#formulier" className="btn-hero">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/31612079808?text=Hallo%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-white/70">
                    <GoogleRatingBadge format="short" />
                  </span>
                </div>
                <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
                <a href="tel:+31612079808" className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white">
                  <Phone className="h-3 w-3" />
                  +31 6 12 07 98 08
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <section id="formulier" className="section-spacing">
        <div className="container-default">
          {/* Form header */}
          <div className="mb-6">
            <div className="section-header">
              <span className="section-header-line" />
              <span className="section-header-label">Formulier</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Offerte aanvragen
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Velden gemarkeerd met <span className="text-primary font-semibold">*</span> zijn verplicht.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-16 lg:items-stretch">

            {/* ── LEFT: Form ─────────────────────────────────────────────── */}
            <ContactFormCard />

            {/* ── RIGHT: Sidebar ──────────────────────────────────────────── */}
            <aside className="flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col h-full">

                {/* Header strip */}
                <div className="bg-foreground px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Direct contact
                    </p>
                  </div>
                  <p className="text-[10px] text-white/60 font-medium">ma – za · 9–18u</p>
                </div>

                {/* Contact rows */}
                <div className="bg-card divide-y divide-border">
                  <a
                    href="tel:+31612079808"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Bellen</p>
                      <p className="text-sm font-bold text-foreground">+31 6 12 07 98 08</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-border group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>

                  <a
                    href="https://wa.me/31612079808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-200">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">WhatsApp</p>
                      <p className="text-sm font-bold text-foreground">+31 6 12 07 98 08</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-border group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>

                  <a
                    href="mailto:info@bm-klus-bv.nl"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">E-mail</p>
                      <p className="text-sm font-bold text-foreground">info@bm-klus-bv.nl</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-border group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                </div>

                {/* WhatsApp tip */}
                <a
                  href="https://wa.me/31612079808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-secondary px-5 py-3.5 border-t border-border transition-colors hover:bg-muted"
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    <strong className="text-foreground">Snelste reactie:</strong>{" "}
                    {"stuur een WhatsApp met uw woonplaats + foto's"}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* Map */}
                <div className="relative h-32 overflow-hidden border-t border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.7!2d4.4663!3d51.9008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBonaventurastraat+58B%2C+3081+HE+Rotterdam!5e0!3m2!1snl!2snl!4v1"
                    className="absolute inset-0 w-full h-full border-0 grayscale"
                    loading="lazy"
                    title="BM klus BV locatie"
                    aria-label="Kaart met locatie BM klus BV"
                  />
                  <div className="absolute inset-0 bg-primary/8 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 rounded-lg bg-card/95 border border-border px-2.5 py-1.5 backdrop-blur-sm shadow-sm">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground">Rotterdam</span>
                  </div>
                  <a
                    href="https://www.google.com/maps?q=Bonaventurastraat+58B,+3081+HE+Rotterdam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-lg bg-card/95 border border-border px-2.5 py-1.5 backdrop-blur-sm shadow-sm text-[11px] font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Maps
                  </a>
                </div>

                {/* Address */}
                <div className="bg-card px-5 py-4 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Adres</p>
                  <p className="text-sm font-semibold text-foreground">Bonaventurastraat 58B</p>
                  <p className="text-sm text-muted-foreground">3081 HE Rotterdam</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">KVK</span>{" "}77356039
                  </p>
                </div>

                {/* Opening hours */}
                <ContactOpeningHours />

              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="below-fold">
      {/* ── Snelle afhandeling ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-secondary/30 section-spacing">
        <div className="container-default">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="section-header">
                <span className="section-header-line" />
                <span className="section-header-label">Snelle afhandeling</span>
              </div>
              <h2 className="section-title">
                Wat we nodig hebben voor{" "}
                <span className="text-primary">een snelle offerte</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs lg:text-right lg:pb-1">
              Stuur ons onderstaande gegevens mee — dan kunnen wij u binnen{" "}
              <strong className="text-foreground">één werkdag</strong> een
              duidelijke prijsindicatie geven.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border shadow-sm">
            {[
              { n: "01", title: "Uw woonplaats", desc: "Zodat we kunnen bevestigen dat we actief zijn in uw regio.", icon: <Home className="w-4 h-4" /> },
              { n: "02", title: "Type werkzaamheden", desc: "Gevelisolatie, schilderwerk, stucwerk of een combinatie?", icon: <Hammer className="w-4 h-4" /> },
              { n: "03", title: "Oppervlakte (m²)", desc: "Bij benadering — we kijken het altijd ter plaatse na.", icon: <MessageSquare className="w-4 h-4" /> },
              { n: "04", title: "2–4 foto's van de gevel", desc: "Van een afstand en van dichtbij, bij voorkeur bij daglicht.", icon: <MapPin className="w-4 h-4" /> },
              { n: "05", title: "Gewenste afwerking", desc: "Kleur, textuur, of specifieke voorkeur voor materiaal.", icon: <AtSign className="w-4 h-4" /> },
              { n: "06", title: "Gewenste planning", desc: "Wanneer zou u willen starten? Flexibel is ook prima.", icon: <PhoneCall className="w-4 h-4" /> },
            ].map(({ n, title, desc, icon }) => (
              <div
                key={n}
                className="group bg-card px-6 py-6 flex flex-col gap-4 hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black tracking-tighter text-border group-hover:text-primary/20 transition-colors select-none">
                    {n}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200">
                    {icon}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-snug">{title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Heeft u niet alles bij de hand?{" "}
            <strong className="text-foreground">Geen probleem</strong> — vul in wat u kunt, wij nemen contact op voor de rest.
          </p>
        </div>
      </section>
      </div>

      <div className="below-fold">
      {/* ── Meer weten ────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-card py-8">
        <div className="container-default">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary shrink-0">
              Meer weten?
            </p>
            <div className="h-px bg-primary flex-1 hidden sm:block" />
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Bekijk onze diensten", href: "/diensten/" },
                { label: "Gevelisolatie", href: "/gevelisolatie/" },
                { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
                { label: "Gevel schilderen", href: "/gevel-schilderen/" },
                { label: "Onze werken", href: "/onze-werken/" },
                { label: "Over ons", href: "/over-ons/" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-sm"
                >
                  {label}
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div>

      <StickyCTABar />
      <QuoteModal dienst="geveloplossingen" />
    </div>
  );
}
