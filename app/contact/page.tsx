"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useRef, useCallback, useEffect, type FormEvent, type ChangeEvent } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  Loader2,
  User,
  Home,
  PhoneCall,
  MessageSquare,
  AtSign,
  Hammer,
} from "lucide-react";

// ─── Turnstile global type ────────────────────────────────────────────────────

interface TurnstileInstance {
  render: (
    el: string | HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "compact";
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
// Leave NEXT_PUBLIC_CONTACT_API_BASE empty for same-origin requests on dev/prod.
// Setting a cross-origin domain will cause CORS failures from localhost.
const CONTACT_API_BASE =
  process.env.NEXT_PUBLIC_CONTACT_API_BASE?.replace(/\/+$/, "") ?? "";
const CONTACT_ENDPOINT = `${CONTACT_API_BASE}/wp-json/bm/v1/contact`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  naam: string;
  telefoon: string;
  email: string;
  plaats: string;
  dienst: string;
  bericht: string;
  consent: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumbs({ dark = false }: { dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center gap-1.5 text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
        <li>
          <Link href="/" className={`transition-colors ${dark ? "hover:text-white" : "hover:text-primary"}`}>
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li>
          <span className={dark ? "text-white font-medium" : "text-foreground font-medium"}>Contact</span>
        </li>
      </ol>
    </nav>
  );
}

function FormField({
  label,
  required,
  children,
  id,
  error,
  icon,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
        {required && <span className="text-primary">*</span>}
        {!required && (
          <span className="text-muted-foreground font-normal text-xs ml-0.5">
            (optioneel)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Openingstijden ────────────────────────────────────────────────────────────
const SCHEDULE = [
  { day: "Maandag",   jsDay: 1, open: "9:00", close: "18:00" },
  { day: "Dinsdag",   jsDay: 2, open: "9:00", close: "18:00" },
  { day: "Woensdag",  jsDay: 3, open: "9:00", close: "18:00" },
  { day: "Donderdag", jsDay: 4, open: "9:00", close: "18:00" },
  { day: "Vrijdag",   jsDay: 5, open: "9:00", close: "18:00" },
  { day: "Zaterdag",  jsDay: 6, open: "9:00", close: "18:00" },
  { day: "Zondag",    jsDay: 0, open: null,   close: null     },
] as const;

function OpenStatusBadge() {
  const now = new Date();
  const todayJs = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const today = SCHEDULE.find((s) => s.jsDay === todayJs);
  const isOpenNow = (() => {
    if (!today?.open || !today?.close) return false;
    const [oh, om] = today.open.split(":").map(Number);
    const [ch, cm] = today.close.split(":").map(Number);
    return currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm;
  })();

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
      isOpenNow ? "bg-green-500/12 text-green-700" : "bg-muted text-muted-foreground"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isOpenNow ? "bg-green-500 animate-pulse" : "bg-muted-foreground/40"}`} />
      {isOpenNow ? "Nu open" : "Gesloten"}
    </span>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 hover:border-primary/40";

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    naam: "",
    telefoon: "",
    email: "",
    plaats: "",
    dienst: "",
    bericht: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
      theme: "auto",
    });
  }, [TURNSTILE_SITE_KEY]);

  useEffect(() => {
    if (!turnstileScriptReady) return;
    initTurnstile();
  }, [turnstileScriptReady, initTurnstile]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError("");
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.naam.trim()) newErrors.naam = "Vul uw naam in.";
    if (!form.plaats.trim()) newErrors.plaats = "Vul uw woonplaats in.";
    if (!form.telefoon.trim()) newErrors.telefoon = "Vul uw telefoonnummer in.";
    if (!form.bericht.trim()) newErrors.bericht = "Vul een omschrijving in.";
    if (!form.consent) newErrors.consent = "U dient akkoord te gaan om verder te gaan.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setServerError("");

    if (!validate()) return;

    if (!TURNSTILE_SITE_KEY) {
      setServerError("Turnstile is niet geconfigureerd. Probeer later opnieuw.");
      return;
    }

    if (!turnstileToken) {
      setServerError("Bevestig a.u.b. dat u geen robot bent.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: form.naam.trim(),
          city: form.plaats.trim(),
          phone: form.telefoon.trim(),
          email: form.email.trim(),
          service: form.dienst,
          message: form.bericht.trim(),
          consent: form.consent,
          sourceUrl: window.location.href,
          company,
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok === true) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError(
          data?.message ||
            "Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.",
        );
        resetTurnstile();
      }
    } catch {
      setServerError(
        "Verbinding mislukt. Controleer uw internetverbinding en probeer het opnieuw.",
      );
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-end"
        style={{
          background:
            "linear-gradient(175deg, #0D0D0D 0%, #1A1009 30%, #3D1F08 55%, #7A4520 75%, #C47A3A 92%, #F5EFE6 100%)",
        }}
      >
        {/* Dark vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 w-full container-default pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
          <Breadcrumbs dark />
          <div className="section-header mt-4">
            <span className="h-px w-8 bg-primary" />
            <span className="section-header-label">Gratis offerte</span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Neem contact op &amp;{" "}
            <span className="text-primary">vraag een offerte aan</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Heeft u een vraag of wilt u een vrijblijvende offerte? Vul het
            formulier in of neem direct contact op — wij reageren snel tijdens
            onze openingstijden.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4 sm:gap-6">
            {[
              "Snel antwoord tijdens openingstijden",
              "Duidelijke offerte met scope en planning",
              "Regio Rotterdam en omgeving (±100 km)",
            ].map((text) => (
              <li key={text} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
            <div className="flex flex-col">
              {submitted ? (
                <div className="card-premium flex flex-col items-center py-14 text-center">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </span>
                  <p className="text-2xl font-bold text-foreground mb-2">Bedankt!</p>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">
                    We nemen zo snel mogelijk contact met u op.
                  </p>
                  <Link href="/" className="btn-secondary mt-8 inline-flex">
                    Terug naar home
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="card-premium flex flex-col gap-6 h-full"
                >
                  {/* Turnstile script */}
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="afterInteractive"
                    onReady={() => setTurnstileScriptReady(true)}
                  />

                  {/* Server error banner */}
                  {serverError && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>{serverError}</p>
                    </div>
                  )}

                  {/* Honeypot — hidden from real users */}
                  <div className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="company">Bedrijf</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  {/* Naam + Woonplaats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id="naam" label="Naam" required error={errors.naam} icon={<User className="w-3.5 h-3.5" />}>
                      <input
                        id="naam" name="naam" type="text" autoComplete="name"
                        placeholder="Uw naam" value={form.naam} onChange={handleChange}
                        className={`${inputClass} ${errors.naam ? "border-destructive focus:ring-destructive/40" : ""}`}
                        aria-invalid={!!errors.naam}
                      />
                    </FormField>

                    <FormField id="plaats" label="Woonplaats" required error={errors.plaats} icon={<Home className="w-3.5 h-3.5" />}>
                      <input
                        id="plaats" name="plaats" type="text" autoComplete="address-level2"
                        placeholder="Bijv. Rotterdam, Delft…" value={form.plaats} onChange={handleChange}
                        className={`${inputClass} ${errors.plaats ? "border-destructive focus:ring-destructive/40" : ""}`}
                        aria-invalid={!!errors.plaats}
                      />
                    </FormField>
                  </div>

                  {/* Telefoon */}
                  <FormField id="telefoon" label="Telefoon" required error={errors.telefoon} icon={<PhoneCall className="w-3.5 h-3.5" />}>
                    <input
                      id="telefoon" name="telefoon" type="tel" autoComplete="tel"
                      placeholder="+31 6 12 07 98 08" value={form.telefoon} onChange={handleChange}
                      className={`${inputClass} ${errors.telefoon ? "border-destructive focus:ring-destructive/40" : ""}`}
                      aria-invalid={!!errors.telefoon}
                    />
                  </FormField>

                  <div className="border-t border-border" />

                  {/* Bericht */}
                  <FormField id="bericht" label="Waar gaat het om?" required error={errors.bericht} icon={<MessageSquare className="w-3.5 h-3.5" />}>
                    <textarea
                      id="bericht" name="bericht" rows={8}
                      placeholder="Korte omschrijving + wat u wilt (bijv. gevelisolatie + afwerking) en eventueel m²."
                      value={form.bericht} onChange={handleChange}
                      className={`${inputClass} resize-y leading-relaxed ${errors.bericht ? "border-destructive focus:ring-destructive/40" : ""}`}
                      aria-invalid={!!errors.bericht}
                    />
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MessageCircle className="w-3 h-3 shrink-0" />
                      {'Foto\'s meesturen? Stuur ze via '}
                      <a
                        href="https://wa.me/31612079808"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        WhatsApp
                      </a>
                      {' of vermeld een link in uw bericht.'}
                    </p>
                  </FormField>

                  {/* E-mail + Dienst */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id="email" label="E-mail" error={errors.email} icon={<AtSign className="w-3.5 h-3.5" />}>
                      <input
                        id="email" name="email" type="email" autoComplete="email"
                        placeholder="Uw e-mailadres" value={form.email} onChange={handleChange}
                        className={inputClass}
                      />
                    </FormField>

                    <FormField id="dienst" label="Dienst" error={errors.dienst} icon={<Hammer className="w-3.5 h-3.5" />}>
                      <select
                        id="dienst" name="dienst" value={form.dienst} onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">— Selecteer —</option>
                        <option value="buitengevelisolatie">Buitengevelisolatie (ETICS)</option>
                        <option value="gevel-schilderen">Gevel schilderen</option>
                        <option value="buitenstucwerk">Buitenstucwerk</option>
                        <option value="sierpleister">Sierpleister</option>
                        <option value="muren-stucen">Muren stucen</option>
                        <option value="overig">Overig</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="border-t border-border" />

                  {/* Consent */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer group">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200
                        ${form.consent ? "border-primary bg-primary" : "border-border bg-background group-hover:border-primary/60"}
                        ${errors.consent ? "border-destructive" : ""}
                      `}>
                        {form.consent && <CheckCircle2 className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                      </span>
                      <input
                        id="consent" name="consent" type="checkbox"
                        checked={form.consent} onChange={handleChange}
                        className="sr-only" aria-invalid={!!errors.consent}
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Ik ga akkoord dat BM Klus BV mijn gegevens gebruikt om
                        contact op te nemen over mijn aanvraag.
                        <span className="text-primary font-semibold ml-0.5">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="flex items-center gap-1.5 text-xs font-medium text-destructive ml-8">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Turnstile widget */}
                  {TURNSTILE_SITE_KEY && (
                    <div ref={turnstileRef} className="flex justify-center" />
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verzenden…
                      </>
                    ) : (
                      <>
                        Versturen
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

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
                    title="BM Klus BV locatie"
                    aria-label="Kaart met locatie BM Klus BV"
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
                <div className="bg-secondary/40 px-5 pt-3 pb-4 border-t border-border flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Openingstijden</p>
                    <OpenStatusBadge />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {SCHEDULE.map(({ day, jsDay, open, close }) => {
                      const isToday = jsDay === new Date().getDay();
                      return (
                        <div
                          key={day}
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            isToday ? "bg-primary/8 ring-1 ring-primary/20" : "hover:bg-secondary"
                          }`}
                        >
                          <span className={`font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                            {day}
                            {isToday && (
                              <span className="ml-1.5 text-[9px] uppercase tracking-wide text-primary/60">vandaag</span>
                            )}
                          </span>
                          <span className={`tabular-nums font-semibold ${
                            open ? (isToday ? "text-primary" : "text-muted-foreground") : "text-muted-foreground/40"
                          }`}>
                            {open ? `${open} – ${close}` : "Gesloten"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

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

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              Heeft u niet alles bij de hand?{" "}
              <strong className="text-foreground">Geen probleem</strong> — vul in wat u kunt, wij nemen contact op voor de rest.
            </p>
            <a href="#formulier" className="btn-primary shrink-0">
              Offerte aanvragen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

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
                { label: "Onze werken", href: "/onze-werken/" },
                { label: "Over ons", href: "/over-ons" },
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
  );
}
