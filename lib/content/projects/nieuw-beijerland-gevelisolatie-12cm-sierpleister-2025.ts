// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")

export const beforeImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/projects/zuidzijdsedijk-nieuw-beijerland-gevelisolatie-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Nieuw-Beijerland gevelisolatie 12 cm sierpleister – voor de werken foto ${pad(i + 1)} (2025)`,
}))

export const afterImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/projects/zuidzijdsedijk-nieuw-beijerland-gevelisolatie-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Nieuw-Beijerland gevelisolatie 12 cm sierpleister – na de werken foto ${pad(i + 1)} (2025)`,
}))
