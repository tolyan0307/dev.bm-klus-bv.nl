import type { ReactNode } from "react"
import { buildSrcSet } from "@/lib/responsive-image"

const heroSrcSet = buildSrcSet("gevelisolatie-kosten-stucwerk-resultaat", "/images", "hero")

export default function KostenLayout({
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
