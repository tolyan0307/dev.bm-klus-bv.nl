// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "dordrecht-gevelisolatie-10cm"

export const beforeImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Dordrecht gevelisolatie 10 cm sierpleister – voor de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Dordrecht gevelisolatie 10 cm sierpleister – na de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}-na-${pad(i + 1)}`,
}))
