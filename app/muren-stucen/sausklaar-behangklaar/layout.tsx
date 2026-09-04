import type { ReactNode } from "react"
import { buildSrcSet } from "@/lib/responsive-image"

const heroSrcSet = buildSrcSet(
  "spijkenisse-malledijk-stucwerk-schilderwerk-2024/spijkenisse-malledijk-stucwerk-schilderwerk-2024-na-01",
  "/images/projects",
  "hero",
)

export default function SausklaarBehangklaarLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={heroSrcSet}
        imageSizes="100vw"
      />
      {children}
    </>
  )
}
