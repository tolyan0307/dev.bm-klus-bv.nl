import dynamic from "next/dynamic"

const QuoteModal = dynamic(() => import("@/components/quote-modal"))

export default function OnzeWerkenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <QuoteModal dienst="geveloplossingen" />
    </>
  )
}
