import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"
import { materialenContent } from "@/lib/content/gevelisolatie"
import MaterialenInteractive, { type MaterialenItem } from "./materialen-interactive"

const materialBaseNames: Record<string, string> = {
  "EPS":          "materiaal-eps",
  "PIR":          "materiaal-pir",
  "Minerale wol": "materiaal-minerale-wol",
}

export default function MaterialenSection() {
  const data = materialenContent

  const items: MaterialenItem[] = data.vergelijkingstabel.rijen.map((rij) => {
    const baseName = materialBaseNames[rij.materiaal] ?? "materiaal-eps"
    return {
      ...rij,
      imgSrc: getFallbackSrc(baseName, "/images", "serviceCard"),
      imgSrcSet: buildSrcSet(baseName, "/images", "serviceCard"),
    }
  })

  return (
    <MaterialenInteractive
      id={data.id}
      intro={data.intro}
      items={items}
      systeemopbouwH3={data.systeemopbouw.h3}
      systeemopbouwLagen={data.systeemopbouw.lagen}
    />
  )
}
