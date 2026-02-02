import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: `${service.title} - Embaby Carpentry`,
    description: service.shortDesc,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const { content } = service

  return (
    <>
      <Header />
      <div className="main-content services-page">
        <section className="service-page-hero">
          <div className="service-page-hero-image">
            <Image src={service.img} alt={service.title} fill className="service-page-hero-img" sizes="100vw" />
            <div className="service-page-hero-overlay" />
          </div>
          <div className="service-page-hero-content">
            <h1 className="heading heading-center">{service.title}</h1>
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

            <div className="service-page-cta">
              <p className="service-page-cta-text">{content.cta}</p>
              <Link href="/contact" className="btn" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                Book a Free Consultation
              </Link>
            </div>

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
