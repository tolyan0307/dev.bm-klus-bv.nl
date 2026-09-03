// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "strijen-schenkeldijk-gevelisolatie-sierpleister-2026"
const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 8 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Strijen Schenkeldijk gevelisolatie en sierpleister – voor de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 14 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Strijen Schenkeldijk gevelisolatie en sierpleister – na de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
