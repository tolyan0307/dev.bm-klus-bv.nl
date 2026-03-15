export const IMAGE_EXT = "webp"

const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "etten-leur-gevelisolatie-6cm-strikolith-2025"

const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 10 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur gevelisolatie 6 cm Strikolith – voor de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 9 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur gevelisolatie 6 cm Strikolith – na de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
