"use client"

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type FormEvent,
} from "react"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Phone,
  MessageCircle,
  Shield,
  X,
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

export const QUOTE_MODAL_EVENT = "open-quote-modal"

export function openQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(QUOTE_MODAL_EVENT))
  }
}

interface QuoteModalProps {
  dienst?: string
}

export default function QuoteModal({
  dienst = "buitengevelisolatie",
}: QuoteModalProps) {
  const [open, setOpen] = useState(false)

  const [naam, setNaam] = useState("")
  const [telefoon, setTelefoon] = useState("")
  const [email, setEmail] = useState("")
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
  const panelRef = useRef<HTMLDivElement>(null)

  // Listen for open event
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(QUOTE_MODAL_EVENT, handler)
    return () => window.removeEventListener(QUOTE_MODAL_EVENT, handler)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#offerte") {
        setOpen(true)
        history.replaceState(null, "", window.location.pathname)
      }
    }

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href="#offerte"]')
      if (anchor) {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("hashchange", onHash)
    document.addEventListener("click", onClick, true)

    onHash()

    return () => {
      window.removeEventListener("hashchange", onHash)
      document.removeEventListener("click", onClick, true)
    }
  }, [])

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
    if (turnstileReady && open) initTurnstile()
  }, [turnstileReady, open, initTurnstile])

  function resetTurnstile() {
    setTurnstileToken("")
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!naam.trim()) e.naam = "Vul uw naam in."
    if (!email.trim()) e.email = "Vul uw e-mailadres in."
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
          email: email.trim(),
          service: dienst,
          message: bericht.trim() || `Offerte-aanvraag voor ${dienst}`,
          consent,
          sourceUrl:
            typeof window !== "undefined" ? window.location.href : "",
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

  function handleClose() {
    setOpen(false)
    if (submitted) {
      setSubmitted(false)
      setNaam("")
      setTelefoon("")
      setEmail("")
      setPlaats("")
      setBericht("")
      setConsent(false)
      setErrors({})
      setServerError("")
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all hover:border-primary/40"

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onReady={() => setTurnstileReady(true)}
        />
      )}

      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed inset-0 z-[61] flex items-center justify-center p-4 transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Offerte aanvragen"
          className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Sluiten"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="bg-foreground px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Gratis & vrijblijvend
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              Offerte aanvragen
            </h2>
            <p className="mt-1 text-xs text-white/50">
              Laat uw gegevens achter — wij nemen zo snel mogelijk contact met u op.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Bedankt!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Wij nemen zo snel mogelijk contact met u op.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="px-6 pb-6 pt-5"
            >
              {serverError && (
                <div
                  className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                  role="alert"
                >
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  <p>{serverError}</p>
                </div>
              )}

              {/* Honeypot */}
              <div
                className="absolute h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="qm-company">Bedrijf</label>
                <input
                  id="qm-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Naam */}
                <div>
                  <label
                    htmlFor="qm-naam"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Naam <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qm-naam"
                    type="text"
                    autoComplete="name"
                    placeholder="Uw naam"
                    value={naam}
                    onChange={(e) => {
                      setNaam(e.target.value)
                      if (errors.naam) setErrors((p) => ({ ...p, naam: "" }))
                    }}
                    className={`${inputClass} ${errors.naam ? "border-destructive" : ""}`}
                  />
                  {errors.naam && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.naam}
                    </p>
                  )}
                </div>

                {/* Woonplaats */}
                <div>
                  <label
                    htmlFor="qm-plaats"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Woonplaats <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qm-plaats"
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
                    <p className="mt-1 text-xs text-destructive">
                      {errors.plaats}
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <label
                    htmlFor="qm-email"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    E-mail <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qm-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Voor de offerte per mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email)
                        setErrors((p) => ({ ...p, email: "" }))
                    }}
                    className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefoon */}
                <div>
                  <label
                    htmlFor="qm-telefoon"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Telefoon{" "}
                    <span className="font-normal text-muted-foreground">(optioneel)</span>
                  </label>
                  <input
                    id="qm-telefoon"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+31 6 …"
                    value={telefoon}
                    onChange={(e) => setTelefoon(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Omschrijving — optioneel */}
              <div className="mt-4">
                <label
                  htmlFor="qm-bericht"
                  className="mb-1.5 block text-xs font-semibold text-foreground"
                >
                  Omschrijving{" "}
                  <span className="font-normal text-muted-foreground">(optioneel)</span>
                </label>
                <textarea
                  id="qm-bericht"
                  rows={2}
                  placeholder="Bijv. rijtjeshuis, ±60 m², sierpleister gewenst…"
                  value={bericht}
                  onChange={(e) => setBericht(e.target.value)}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {/* Consent */}
              <label className="mt-5 flex cursor-pointer items-start gap-2.5">
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
              {TURNSTILE_SITE_KEY && (
                <div ref={turnstileRef} className="mt-4" />
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-[#d0540a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
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
            </form>
          )}

          {/* Trust footer */}
          {!submitted && (
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border bg-secondary/30 px-6 py-3">
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                Gegevens veilig
              </span>
              <a
                href="tel:+31612079808"
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" />
                +31 6 1207 9808
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold text-[#25D366] hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
