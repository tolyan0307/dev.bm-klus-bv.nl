import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/gevelisolatie/rc-waarde-dikte/")

export default function RcWaardeDikteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
