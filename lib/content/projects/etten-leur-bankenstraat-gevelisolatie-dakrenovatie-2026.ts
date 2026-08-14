// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026"
const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 31 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur Bankenstraat gevelisolatie en dakrenovatie – voor de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 17 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur Bankenstraat gevelisolatie en dakrenovatie – na de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
