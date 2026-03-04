// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")

// Note: files on disk use na-1, na-2, na-3 and voor-1..6 (no leading zero)
export const beforeImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/projects/vught-gevelisolatie-10cm-voor-${i + 1}.${IMAGE_EXT}`,
  alt: `Vught gevelisolatie 10 cm sierpleister – voor de werken foto ${pad(i + 1)} (2024)`,
}))

export const afterImages = Array.from({ length: 3 }, (_, i) => ({
  src: `/images/projects/vught-gevelisolatie-10cm-na-${i + 1}.${IMAGE_EXT}`,
  alt: `Vught gevelisolatie 10 cm sierpleister – na de werken foto ${pad(i + 1)} (2024)`,
}))
