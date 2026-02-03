import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import { getServiceBySlug, getAllServiceSlugs, SERVICES } from '@/lib/services-data'
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/seo'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  const serviceUrl = `${SITE_URL}/services/${slug}`
  const ogImage = { url: `${SITE_URL}${service.img}`, width: 1200, height: 630, alt: `${service.title} Ottawa - Embaby Carpentry` }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: serviceUrl,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${SITE_URL}${service.img}`],
    },
    alternates: { canonical: serviceUrl },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const { content } = service
  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)
  const serviceUrl = `${SITE_URL}/services/${slug}`
  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.metaDescription,
    url: serviceUrl,
    image: service.img,
  })
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: service.title, url: serviceUrl },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <div className="main-content services-page">
        <section className="service-page-hero">
          <div className="service-page-hero-image">
            <Image
              src={service.img}
              alt={`${service.title} in Ottawa - Embaby Carpentry`}
              fill
              className="service-page-hero-img"
              sizes="100vw"
              priority
            />
            <div className="service-page-hero-overlay" />
          </div>
          <div className="service-page-hero-content">
            <h1 className="heading heading-center">{service.title} in Ottawa</h1>
            <p className="service-page-hero-desc">{service.shortDesc}</p>
          </div>
        </section>

        <section className="service-page-content">
          <div className="service-page-inner">
            <p className="service-page-intro">{content.intro}</p>

            <h2 className="service-page-section-title">What We Offer</h2>
            <ul className="service-page-highlights">
              {content.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className="service-page-body">{content.body}</p>

            {content.sections?.map((sec, i) => (
              <div key={i} className="service-page-section">
                <h2 className="service-page-section-title">{sec.h2}</h2>
                <p className="service-page-body">{sec.body}</p>
                {sec.subs?.map((sub, j) => (
                  <div key={j} className="service-page-subsection">
                    <h3 className="service-page-subtitle">{sub.h3}</h3>
                    <p className="service-page-body">{sub.body}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="service-page-cta">
              <p className="service-page-cta-text">{content.cta}</p>
              <Link href="/contact" className="btn" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                Book a Free Consultation
              </Link>
            </div>

            <nav className="service-page-related" aria-label="Related services and resources">
              <h2 className="service-page-section-title">Explore More Services in Ottawa</h2>
              <ul className="service-page-related-list">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
              <p className="service-page-related-links">
                <Link href="/services">View all services</Link>
                {' · '}
                <Link href="/blog">Ottawa renovation tips &amp; guides</Link>
                {' · '}
                <Link href="/our-work">See our projects</Link>
              </p>
            </nav>

            <div className="service-page-back">
              <Link href="/services" className="service-page-back-link">
                ← Back to All Services
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
