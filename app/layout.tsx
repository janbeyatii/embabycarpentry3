import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Construction Website',
  description: 'WeBuild - Construction Services',
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
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/js/lightgallery.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/swiper@7/swiper-bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
