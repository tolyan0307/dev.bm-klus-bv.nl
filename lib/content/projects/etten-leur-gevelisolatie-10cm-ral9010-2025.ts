export const IMAGE_EXT = "webp"

const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "etten-leur-gevelisolatie-10cm-ral9010-2025"

const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 17 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur gevelisolatie 10 cm RAL 9010 - voor de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 7 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur gevelisolatie 10 cm RAL 9010 - na de werken foto ${pad(i + 1)} (2025)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
