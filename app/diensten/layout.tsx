import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/diensten/")

export default function DienstenLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
