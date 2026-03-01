"use client"

import { useState, useRef, useCallback, useEffect, type FormEvent } from "react"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Phone,
  MessageCircle,
  Shield,
} from "lucide-react"

interface TurnstileInstance {
  render: (
    el: string | HTMLElement,
    opts: {
      sitekey: string
      callback: (token: string) => void
      "expired-callback"?: () => void
      "error-callback"?: () => void
      theme?: "light" | "dark" | "auto"
      size?: "normal" | "compact"
    },
  ) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""
const CONTACT_API_BASE =
  process.env.NEXT_PUBLIC_CONTACT_API_BASE?.replace(/\/+$/, "") ?? ""
const CONTACT_ENDPOINT = `${CONTACT_API_BASE}/wp-json/bm/v1/contact`

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20gevelisolatie.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

interface InlineQuoteFormProps {
  dienst?: string
  heading?: string
  subheading?: string
}

export default function InlineQuoteForm({
  dienst = "buitengevelisolatie",
  heading = "Gratis offerte aanvragen",
  subheading = "Vul onderstaand formulier in — wij nemen binnen 1 werkdag contact met u op.",
}: InlineQuoteFormProps) {
  const [naam, setNaam] = useState("")
  const [telefoon, setTelefoon] = useState("")
  const [plaats, setPlaats] = useState("")
  const [bericht, setBericht] = useState("")
  const [consent, setConsent] = useState(false)
  const [company, setCompany] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")

  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileReady, setTurnstileReady] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileRef.current || widgetIdRef.current)
      return
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
      theme: "auto",
      size: "compact",
    })
  }, [])

  useEffect(() => {
    if (turnstileReady) initTurnstile()
  }, [turnstileReady, initTurnstile])

  function resetTurnstile() {
    setTurnstileToken("")
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!naam.trim()) e.naam = "Vul uw naam in."
    if (!telefoon.trim()) e.telefoon = "Vul uw telefoonnummer in."
    if (!plaats.trim()) e.plaats = "Vul uw woonplaats in."
    if (!consent) e.consent = "Vereist."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (isSubmitting) return
    setServerError("")

    if (!validate()) return

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setServerError("Bevestig a.u.b. dat u geen robot bent.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: naam.trim(),
          city: plaats.trim(),
          phone: telefoon.trim(),
          email: "",
          service: dienst,
          message: bericht.trim() || `Inline offerte-aanvraag voor ${dienst}`,
          consent,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          company,
          turnstileToken,
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok === true) {
        setSubmitted(true)
      } else {
        setServerError(
          data?.message ||
            "Er is iets misgegaan. Probeer het opnieuw of bel ons.",
        )
        resetTurnstile()
      }
    } catch {
      setServerError("Verbinding mislukt. Probeer het opnieuw.")
      resetTurnstile()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Bedankt!</h3>
          <p className="mt-2 text-muted-foreground">
            Wij nemen zo snel mogelijk contact met u op.
          </p>
        </div>
      </section>
    )
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all hover:border-primary/40"

  return (
    <section id="offerte" className="scroll-mt-24 py-16 sm:py-20">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* Header */}
        <div className="border-b border-border bg-foreground px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                {heading}
              </h2>
              <p className="mt-0.5 text-xs text-white/60">{subheading}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
          {TURNSTILE_SITE_KEY && (
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
              onReady={() => setTurnstileReady(true)}
            />
          )}

          {serverError && (
            <div
              className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
              <p>{serverError}</p>
            </div>
          )}

          {/* Honeypot */}
          <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="iqf-company">Bedrijf</label>
            <input
              id="iqf-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Naam */}
            <div>
              <label
                htmlFor="iqf-naam"
                className="mb-1.5 block text-xs font-semibold text-foreground"
              >
                Naam <span className="text-primary">*</span>
              </label>
              <input
                id="iqf-naam"
                type="text"
                autoComplete="name"
                placeholder="Uw naam"
                value={naam}
                onChange={(e) => {
                  setNaam(e.target.value)
                  if (errors.naam)
                    setErrors((p) => ({ ...p, naam: "" }))
                }}
                className={`${inputClass} ${errors.naam ? "border-destructive" : ""}`}
              />
              {errors.naam && (
                <p className="mt-1 text-xs text-destructive">{errors.naam}</p>
              )}
            </div>

            {/* Woonplaats */}
            <div>
              <label
                htmlFor="iqf-plaats"
                className="mb-1.5 block text-xs font-semibold text-foreground"
              >
                Woonplaats <span className="text-primary">*</span>
              </label>
              <input
                id="iqf-plaats"
                type="text"
                autoComplete="address-level2"
                placeholder="Bijv. Rotterdam, Delft…"
                value={plaats}
                onChange={(e) => {
                  setPlaats(e.target.value)
                  if (errors.plaats)
                    setErrors((p) => ({ ...p, plaats: "" }))
                }}
                className={`${inputClass} ${errors.plaats ? "border-destructive" : ""}`}
              />
              {errors.plaats && (
                <p className="mt-1 text-xs text-destructive">{errors.plaats}</p>
              )}
            </div>

            {/* Telefoon */}
            <div>
              <label
                htmlFor="iqf-telefoon"
                className="mb-1.5 block text-xs font-semibold text-foreground"
              >
                Telefoon <span className="text-primary">*</span>
              </label>
              <input
                id="iqf-telefoon"
                type="tel"
                autoComplete="tel"
                placeholder="+31 6 …"
                value={telefoon}
                onChange={(e) => {
                  setTelefoon(e.target.value)
                  if (errors.telefoon)
                    setErrors((p) => ({ ...p, telefoon: "" }))
                }}
                className={`${inputClass} ${errors.telefoon ? "border-destructive" : ""}`}
              />
              {errors.telefoon && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.telefoon}
                </p>
              )}
            </div>

            {/* Omschrijving */}
            <div>
              <label
                htmlFor="iqf-bericht"
                className="mb-1.5 block text-xs font-semibold text-foreground"
              >
                Korte omschrijving{" "}
                <span className="font-normal text-muted-foreground">
                  (optioneel)
                </span>
              </label>
              <input
                id="iqf-bericht"
                type="text"
                placeholder="Bijv. rijtjeshuis, ±60 m², sierpleister"
                value={bericht}
                onChange={(e) => setBericht(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Consent + Turnstile + Submit */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                    consent
                      ? "border-primary bg-primary"
                      : "border-border hover:border-primary/60"
                  } ${errors.consent ? "border-destructive" : ""}`}
                >
                  {consent && (
                    <CheckCircle2
                      className="h-3 w-3 text-primary-foreground"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    if (errors.consent)
                      setErrors((p) => ({ ...p, consent: "" }))
                  }}
                  className="sr-only"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  Ik ga akkoord met het verwerken van mijn gegevens.{" "}
                  <span className="text-primary">*</span>
                </span>
              </label>

              {/* Turnstile */}
              {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-[#d0540a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verzenden…
                </>
              ) : (
                <>
                  Versturen
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border bg-secondary/30 px-6 py-3">
          {[
            { icon: Shield, text: "Gegevens veilig & alleen voor uw aanvraag" },
            { icon: Phone, text: "Of bel: +31 6 1207 9808" },
            { icon: MessageCircle, text: "WhatsApp" },
          ].map((item) => {
            const Icon = item.icon
            const isWa = item.text === "WhatsApp"
            const El = isWa ? "a" : "span"
            return (
              <El
                key={item.text}
                {...(isWa
                  ? {
                      href: WA_URL,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className={`flex items-center gap-1.5 text-xs text-muted-foreground ${
                  isWa
                    ? "font-semibold text-[#25D366] hover:underline"
                    : ""
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.text}
              </El>
            )
          })}
        </div>
      </div>
    </section>
  )
}
