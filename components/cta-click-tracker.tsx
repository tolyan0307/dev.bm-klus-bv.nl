"use client"

import { useEffect } from "react"
import { trackEvent } from "@/components/gtm-provider"
import { sendStatsEvent, type StatsCta } from "@/lib/stats-beacon"

function resolveChannel(href: string): { event: string; cta: StatsCta } | null {
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
    return { event: "bm_whatsapp_click", cta: "whatsapp" }
  }
  if (href.startsWith("tel:")) return { event: "bm_phone_click", cta: "phone" }
  if (href.startsWith("mailto:")) return { event: "bm_email_click", cta: "email" }
  return null
}

function resolvePlacement(el: HTMLElement): string {
  if (el.closest("header, nav")) return "navbar"
  if (el.closest('[aria-label="Snelle contactbalk"]')) return "sticky_bar"
  if (el.closest('[role="dialog"]')) return "modal"
  if (el.closest("footer")) return "footer"
  if (el.closest('[aria-label="Hero"]')) return "hero"
  return "content"
}

/**
 * Delegated listener: fires a dataLayer event for every WhatsApp / phone /
 * email link click anywhere in the document (incl. server components like
 * the footer, where per-link onClick handlers are not possible).
 */
export function CtaClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest<HTMLAnchorElement>("a[href]")
      if (!link) return
      const channel = resolveChannel(link.getAttribute("href") ?? "")
      if (!channel) return
      trackEvent(channel.event, {
        placement: resolvePlacement(link),
        page_path: window.location.pathname,
      })
      sendStatsEvent("cta_click", channel.cta)
    }
    document.addEventListener("click", onClick, { capture: true, passive: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
