// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "vught-gevelisolatie-10cm"

// Note: files on disk use na-1, na-2, na-3 and voor-1..6 (no leading zero)
export const beforeImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-voor-${i + 1}.${IMAGE_EXT}`,
  alt: `Vught gevelisolatie 10 cm sierpleister – voor de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-voor-${i + 1}`,
}))

export const afterImages = Array.from({ length: 3 }, (_, i) => ({
  src: `/images/projects/${PREFIX}-na-${i + 1}.${IMAGE_EXT}`,
  alt: `Vught gevelisolatie 10 cm sierpleister – na de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}-na-${i + 1}`,
}))
