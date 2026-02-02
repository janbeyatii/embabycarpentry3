import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'

export const metadata = {
  title: 'Services - Embaby Carpentry',
  description: 'Construction and carpentry services including kitchens, bathrooms, basements, decks, fences, sheds, gazebos, pergolas, and custom woodworking.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <div className="main-content services-page">
        <section style={{
          padding: '8rem 10% 5rem',
          background: 'var(--black)',
          textAlign: 'center',
        }}>
          <h1 className="heading heading-center">Services</h1>
          <p style={{
            fontSize: '1.8rem',
            color: 'var(--text-secondary)',
            maxWidth: '60rem',
            margin: '0 auto 4rem',
            lineHeight: 1.7,
          }}>
            From construction to custom woodworking, we offer a full range of services to bring your vision to life.
          </p>
        </section>

        <section className="services services-grid-style" style={{ background: 'var(--black-light)' }} id="services">
          <div className="services-grid">
            {SERVICES.map((service) => (
              <article key={service.id} className="service-card" id={service.id}>
                <div className="service-card-image">
                  <Image src={service.img} alt={service.title} width={400} height={240} className="service-card-img" />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.shortDesc}</p>
                  <Link href={`/services/${service.slug}`} className="service-card-btn">Learn more</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{
          padding: '4rem 10%',
          background: 'var(--black)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Ready to get started?</h2>
          <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Contact us today for a free consultation and quote.
          </p>
          <Link href="/contact" className="btn" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
            Contact Us
          </Link>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
