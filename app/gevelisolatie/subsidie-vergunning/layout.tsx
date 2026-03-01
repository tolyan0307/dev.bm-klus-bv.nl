import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/gevelisolatie/subsidie-vergunning/")

export default function SubsidieVergunningLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
