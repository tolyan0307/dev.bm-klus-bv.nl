// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "vlaardingen-gevelisolatie-6cm"

export const beforeImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Vlaardingen gevelisolatie 6 cm sierpleister – voor de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 3 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Vlaardingen gevelisolatie 6 cm sierpleister – na de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-na-${pad(i + 1)}`,
}))
