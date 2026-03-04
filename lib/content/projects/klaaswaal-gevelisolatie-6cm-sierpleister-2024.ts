// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")

export const beforeImages = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/projects/klaaswaal-gevelisolatie-6cm-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Klaaswaal gevelisolatie 6 cm sierpleister – voor de werken foto ${pad(i + 1)} (2025)`,
}))

export const afterImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/projects/klaaswaal-gevelisolatie-6cm-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Klaaswaal gevelisolatie 6 cm sierpleister – na de werken foto ${pad(i + 1)} (2025)`,
}))
