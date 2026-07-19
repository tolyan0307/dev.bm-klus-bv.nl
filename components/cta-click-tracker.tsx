"use client"

import { useEffect } from "react"
import { trackEvent } from "@/components/gtm-provider"

function resolveChannel(href: string): string | null {
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "bm_whatsapp_click"
  if (href.startsWith("tel:")) return "bm_phone_click"
  if (href.startsWith("mailto:")) return "bm_email_click"
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
      const event = resolveChannel(link.getAttribute("href") ?? "")
      if (!event) return
      trackEvent(event, {
        placement: resolvePlacement(link),
        page_path: window.location.pathname,
      })
    }
    document.addEventListener("click", onClick, { capture: true, passive: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
