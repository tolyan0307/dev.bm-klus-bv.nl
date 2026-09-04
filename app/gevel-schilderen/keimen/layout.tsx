import type { ReactNode } from "react"
import { buildSrcSet } from "@/lib/responsive-image"

const heroSrcSet = buildSrcSet(
  "delft-willemstraat-gevelrenovatie-schilderwerk-2026/delft-willemstraat-gevelrenovatie-schilderwerk-2026-na-01",
  "/images/projects",
  "hero",
)

export default function KeimenLayout({
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
