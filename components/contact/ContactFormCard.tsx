"use client"

import Link from "next/link"
import Script from "next/script"
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  CheckCircle2,
  Home,
  Hammer,
  Loader2,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  User,
} from "lucide-react"

import { trackEvent } from "@/components/gtm-provider"

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

interface FormState {
  naam: string
  telefoon: string
  email: string
  plaats: string
  dienst: string
  bericht: string
  consent: boolean
}

function FormField({
  label,
  required,
  children,
  id,
  error,
  icon,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  id: string
  error?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-foreground flex items-center gap-1.5"
      >
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
  )
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 hover:border-primary/40"

export default function ContactFormCard() {
  const [form, setForm] = useState<FormState>({
    naam: "",
    telefoon: "",
    email: "",
    plaats: "",
    dienst: "",
    bericht: "",
    consent: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")
  const [company, setCompany] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false)

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
      theme: "auto",
    })
  }, [])

  useEffect(() => {
    if (!turnstileScriptReady) return
    initTurnstile()
  }, [turnstileScriptReady, initTurnstile])

  function resetTurnstile() {
    setTurnstileToken("")
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (serverError) setServerError("")
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.naam.trim()) newErrors.naam = "Vul uw naam in."
    if (!form.plaats.trim()) newErrors.plaats = "Vul uw woonplaats in."
    if (!form.telefoon.trim()) newErrors.telefoon = "Vul uw telefoonnummer in."
    if (!form.bericht.trim()) newErrors.bericht = "Vul een omschrijving in."
    if (!form.consent) newErrors.consent = "U dient akkoord te gaan om verder te gaan."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    setServerError("")

    if (!validate()) return

    if (!TURNSTILE_SITE_KEY) {
      setServerError("Turnstile is niet geconfigureerd. Probeer later opnieuw.")
      return
    }

    if (!turnstileToken) {
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
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok === true) {
        setSubmitted(true)
        trackEvent("bm_lead_form_success", {
          form_variant: "contact_page",
          page_path: window.location.pathname,
        })
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setServerError(
          data?.message ||
            "Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.",
        )
        resetTurnstile()
      }
    } catch {
      setServerError(
        "Verbinding mislukt. Controleer uw internetverbinding en probeer het opnieuw.",
      )
      resetTurnstile()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            onReady={() => setTurnstileScriptReady(true)}
          />

          {serverError && (
            <div
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              id="naam"
              label="Naam"
              required
              error={errors.naam}
              icon={<User className="w-3.5 h-3.5" />}
            >
              <input
                id="naam"
                name="naam"
                type="text"
                autoComplete="name"
                placeholder="Uw naam"
                value={form.naam}
                onChange={handleChange}
                className={`${inputClass} ${
                  errors.naam ? "border-destructive focus:ring-destructive/40" : ""
                }`}
                aria-invalid={!!errors.naam}
              />
            </FormField>

            <FormField
              id="plaats"
              label="Woonplaats"
              required
              error={errors.plaats}
              icon={<Home className="w-3.5 h-3.5" />}
            >
              <input
                id="plaats"
                name="plaats"
                type="text"
                autoComplete="address-level2"
                placeholder="Bijv. Rotterdam, Delft…"
                value={form.plaats}
                onChange={handleChange}
                className={`${inputClass} ${
                  errors.plaats ? "border-destructive focus:ring-destructive/40" : ""
                }`}
                aria-invalid={!!errors.plaats}
              />
            </FormField>
          </div>

          <FormField
            id="telefoon"
            label="Telefoon"
            required
            error={errors.telefoon}
            icon={<PhoneCall className="w-3.5 h-3.5" />}
          >
            <input
              id="telefoon"
              name="telefoon"
              type="tel"
              autoComplete="tel"
              data-google-ads-phone="true"
              placeholder="+31 6 12 07 98 08"
              value={form.telefoon}
              onChange={handleChange}
              className={`${inputClass} ${
                errors.telefoon ? "border-destructive focus:ring-destructive/40" : ""
              }`}
              aria-invalid={!!errors.telefoon}
            />
          </FormField>

          <div className="border-t border-border" />

          <FormField
            id="bericht"
            label="Waar gaat het om?"
            required
            error={errors.bericht}
            icon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            <textarea
              id="bericht"
              name="bericht"
              rows={8}
              placeholder="Korte omschrijving + wat u wilt (bijv. gevelisolatie + afwerking) en eventueel m²."
              value={form.bericht}
              onChange={handleChange}
              className={`${inputClass} resize-y leading-relaxed ${
                errors.bericht ? "border-destructive focus:ring-destructive/40" : ""
              }`}
              aria-invalid={!!errors.bericht}
            />
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="w-3 h-3 shrink-0" />
              {"Foto's meesturen? Stuur ze via "}
              <a
                href="https://wa.me/31612079808"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
              {" of vermeld een link in uw bericht."}
            </p>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              id="email"
              label="E-mail"
              error={errors.email}
              icon={<AtSign className="w-3.5 h-3.5" />}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                data-google-ads-email="true"
                placeholder="Uw e-mailadres"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </FormField>

            <FormField
              id="dienst"
              label="Dienst"
              error={errors.dienst}
              icon={<Hammer className="w-3.5 h-3.5" />}
            >
              <select
                id="dienst"
                name="dienst"
                value={form.dienst}
                onChange={handleChange}
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

          <div className="flex flex-col gap-2">
            <label
              htmlFor="consent"
              className="flex items-start gap-3 cursor-pointer group"
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200
                  ${form.consent ? "border-primary bg-primary" : "border-border bg-background group-hover:border-primary/60"}
                  ${errors.consent ? "border-destructive" : ""}
                `}
              >
                {form.consent && (
                  <CheckCircle2
                    className="w-3 h-3 text-primary-foreground"
                    strokeWidth={3}
                  />
                )}
              </span>
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                className="sr-only"
                aria-invalid={!!errors.consent}
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                Ik ga akkoord dat BM klus BV mijn gegevens gebruikt om contact op
                te nemen over mijn aanvraag.
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

          {TURNSTILE_SITE_KEY && (
            <div ref={turnstileRef} className="flex justify-center" />
          )}

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
  )
}
