// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "almere-gevelisolatie-35m2"

export const beforeImages = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Almere gevelisolatie 35 m² sierpleister – voor de werken foto ${pad(i + 1)} (2024–2025)`,
  baseName: `${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 5 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Almere gevelisolatie 35 m² sierpleister – na de werken foto ${pad(i + 1)} (2024–2025)`,
  baseName: `${PREFIX}-na-${pad(i + 1)}`,
}))
