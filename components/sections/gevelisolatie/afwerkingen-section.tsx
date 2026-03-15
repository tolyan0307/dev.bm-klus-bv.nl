import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"
import { afwerkingenContent } from "@/lib/content/gevelisolatie"
import AfwerkingenInteractive, { type AfwerkingenItem } from "./afwerkingen-interactive"

const optieBaseNames: Record<string, string> = {
  "Stuc (glad)": "dienst-stucwerk",
  "Sierpleister / spachtelputz": "dienst-sierpleister",
  "Crepi": "afwerking-crepi",
  "Steenstrips": "afwerking-steenstrips",
}

export default function AfwerkingenSection() {
  const data = afwerkingenContent

  const items: AfwerkingenItem[] = data.opties.map((optie, i) => {
    const baseName = optieBaseNames[optie.h3] ?? "dienst-stucwerk"
    const rij = data.vergelijkingstabel.rijen[i]
    return {
      h3: optie.h3,
      omschrijving: optie.omschrijving,
      pastGoed: optie.pastGoed,
      letOp: optie.letOp,
      voordelen: optie.voordelen,
      imgSrc: getFallbackSrc(baseName, "/images", "serviceCard"),
      imgSrcSet: buildSrcSet(baseName, "/images", "serviceCard"),
      uiterlijk: rij?.uiterlijk ?? "",
      onderhoud: rij?.onderhoud ?? "",
      budget: rij?.budget ?? "",
    }
  })

  return <AfwerkingenInteractive id={data.id} intro={data.intro} items={items} />
}
