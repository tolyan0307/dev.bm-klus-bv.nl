// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "rottekade-gevelisolatie-10cm"

export const beforeImages = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rottekade gevelisolatie 10 cm – voor de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rottekade gevelisolatie 10 cm – na de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-na-${pad(i + 1)}`,
}))
