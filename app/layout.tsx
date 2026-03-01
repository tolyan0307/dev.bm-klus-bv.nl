import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { AnalyticsProvider } from '@/components/analytics-provider'
import { GtmProvider } from '@/components/gtm-provider'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'BM Klus BV - Gevelisolatie & Renovatie',
  description: 'Uw gevel, perfect geïsoleerd & vernieuwd. Bespaar op energie en vergroot uw wooncomfort.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={_inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Naar hoofdinhoud
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <AnalyticsProvider />
        <GtmProvider />
      </body>
    </html>
  )
}
