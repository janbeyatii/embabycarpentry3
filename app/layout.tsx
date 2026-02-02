import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import PrefetchRoutes from './components/PrefetchRoutes'
import './globals.css'

export const metadata: Metadata = {
  title: 'Embaby Carpentry - Professional Construction & Carpentry Services',
  description: 'Embaby Carpentry - Your Vision, Our Expertise. Professional construction, carpentry, and renovation services with quality craftsmanship since 2019.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/css/lightgallery.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
      </head>
      <body>
        <PrefetchRoutes />
        {children}
        <Analytics />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/js/lightgallery.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/swiper@7/swiper-bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
