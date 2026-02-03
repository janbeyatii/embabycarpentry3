/**
 * SEO constants and helpers for Ottawa-focused local search.
 * Use SITE_URL in production; fallback for dev.
 */
import { SERVICES } from '@/lib/services-data'

export const SITE_NAME = 'Embaby Carpentry'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.embabycarpentry.com'
export const DEFAULT_LOCALE = 'en-CA'
export const OTTAWA_REGION = 'Ottawa, Ontario, Canada'

/** LocalBusiness / Organization schema for JSON-LD */
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description: 'Professional construction, renovation, and custom carpentry services in Ottawa, Ontario. Kitchen renovations, bathroom remodels, decks, fences, basement finishing, and custom woodworking. Licensed and insured. Serving Ottawa and the surrounding region since 2019.',
  url: SITE_URL,
  telephone: '+1-613-816-3764',
  email: 'embabycarpentry@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ottawa',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4215,
    longitude: -75.6972,
  },
  areaServed: [
    { '@type': 'City', name: 'Ottawa', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
    { '@type': 'City', name: 'Greely' },
    { '@type': 'City', name: 'Carleton Place' },
    { '@type': 'City', name: 'Arnprior' },
    { '@type': 'City', name: 'Almonte' },
    { '@type': 'City', name: 'Kemptville' },
    { '@type': 'City', name: 'Dunrobin' },
    { '@type': 'City', name: 'Mississippi Mills' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.instagram.com/embabycarpentry',
  ],
  image: `${SITE_URL}/images/logo.png`,
  priceRange: '$$',
  foundingDate: '2019',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction and Carpentry Services',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
  },
  // When you have real review data, add aggregateRating. Example:
  // aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5' },
}

/** Build Service schema for a single service page */
export function buildServiceSchema(service: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image ? `${SITE_URL}${service.image}` : undefined,
    areaServed: {
      '@type': 'City',
      name: 'Ottawa',
      containedInPlace: { '@type': 'Province', name: 'Ontario' },
    },
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

/** Build FAQ schema from Q&A array */
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** Build Article/BlogPosting schema for blog posts */
export function buildArticleSchema(post: {
  title: string
  excerpt: string
  image: string
  date: string
  modifiedDate?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  }
}

/** Build BreadcrumbList schema */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** Default Open Graph config for pages */
export function defaultOpenGraph(
  title: string,
  description: string,
  path: string,
  imagePath = '/images/logo.png'
): { title: string; description: string; url: string; siteName: string; images: { url: string; width: number; height: number }[]; locale: string } {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}${imagePath}`, width: 1200, height: 630 }],
    locale: DEFAULT_LOCALE,
  }
}
