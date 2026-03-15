import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"
import { detailsKoudebruggenContent } from "@/lib/content/gevelisolatie"
import DetailsKoudebruggenInteractive, { type DetailsSubsection } from "./details-koudebruggen-interactive"

const subsectionBaseNames: string[] = [
  "detail-dagkanten",
  "detail-plint",
  "detail-hoeken",
  "detail-koudebruggen",
]

export default function DetailsKoudebruggenSection() {
  const data = detailsKoudebruggenContent

  const subsections: DetailsSubsection[] = data.subsections.map((sub, i) => {
    const baseName = subsectionBaseNames[i]
    return {
      h3: sub.h3,
      tekst: sub.tekst,
      bullets: sub.bullets,
      imgSrc: getFallbackSrc(baseName, "/images", "serviceCard"),
      imgSrcSet: buildSrcSet(baseName, "/images", "serviceCard"),
    }
  })

  return (
    <DetailsKoudebruggenInteractive
      id={data.id}
      intro={data.intro}
      subsections={subsections}
    />
  )
}
