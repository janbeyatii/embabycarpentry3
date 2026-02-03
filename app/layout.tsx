import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import PrefetchRoutes from './components/PrefetchRoutes'
import { SITE_NAME, SITE_URL, LOCAL_BUSINESS_SCHEMA } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Ottawa Contractor – Renovations & Custom Carpentry`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Ottawa contractor for construction, renovations, and custom carpentry. Kitchen renovations, bathroom remodels, decks, fences, basement finishing, and woodworking in Ottawa, Ontario. Licensed & insured. Free quotes.',
  keywords: [
    'Ottawa contractor',
    'Ottawa renovations',
    'custom carpentry Ottawa',
    'kitchen renovation Ottawa',
    'bathroom renovation Ottawa',
    'deck builder Ottawa',
    'construction Ottawa',
    'carpentry Ottawa',
    'renovation company Ottawa',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Ottawa Contractor – Renovations & Custom Carpentry`,
    description:
      'Ottawa contractor for construction, renovations, and custom carpentry. Kitchen renovations, bathroom remodels, decks, and more. Licensed & insured. Free quotes.',
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: `${SITE_NAME} - Ottawa construction and carpentry` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Ottawa Contractor – Renovations & Custom Carpentry`,
    description: 'Ottawa contractor for construction, renovations, and custom carpentry. Licensed & insured. Free quotes.',
    images: [`${SITE_URL}/images/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  verification: {
    // Add when you have them: google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
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
