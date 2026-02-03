import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Link from 'next/link'
import AboutVideo from '../components/AboutVideo'

import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'About Us | Ottawa Contractor Since 2019 | Embaby Carpentry',
  description:
    'Embaby Carpentry: Ottawa contractor for construction, renovations, and custom carpentry since 2019. Licensed, insured, serving Ottawa and the region. Quality craftsmanship and customer satisfaction.',
  openGraph: {
    title: 'About Us | Ottawa Contractor Since 2019 | Embaby Carpentry',
    description: 'Quality construction and carpentry in Ottawa since 2019. Licensed, insured. Serving Ottawa and the region.',
    url: `${SITE_URL}/about`,
  },
  alternates: { canonical: `${SITE_URL}/about` },
}

const VALUES = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured for your peace of mind. We take responsibility seriously so you can focus on the result.',
  },
  {
    icon: 'fas fa-tools',
    title: 'Quality Materials & Workmanship',
    desc: 'We source premium materials and apply skilled craftsmanship to every project. No shortcuts—just lasting results.',
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'On-Time Completion',
    desc: 'We respect your schedule. Clear timelines, reliable communication, and projects delivered when we promise.',
  },
]

const SERVICE_AREAS = [
  'Ottawa',
  'Greely',
  'Carleton Place',
  'Mississippi Mills',
  'Arnprior',
  'Almonte',
  'Dunrobin',
  'Kemptville',
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="main-content about-page">
        {/* Hero */}
        <section className="about-page-hero">
          <p className="about-page-hero__tagline">Serving Ottawa & the Region Since 2019</p>
          <h1 className="heading heading-center">About Us</h1>
          <p className="about-page-hero__lead">
            Quality craftsmanship and customer satisfaction at the heart of everything we build.
          </p>
        </section>

        {/* Our Story */}
        <section className="about-page-story">
          <div className="about-page-story__inner">
            <h2 className="about-page-section-title">Our Story</h2>
            <p className="about-page-story__p">
              Embaby Carpentry was founded with a simple belief: every project deserves attention to detail, honest communication, and work that lasts. What started as a small carpentry operation has grown into a trusted name across the Ottawa region—serving homeowners, architects, commercial builders, interior designers, general contractors, and real estate developers.
            </p>
            <p className="about-page-story__p">
              We don&apos;t just build—we partner. From concept to completion, we listen to your goals, advise on options, and deliver results that exceed expectations. Whether it&apos;s a kitchen renovation, a custom deck, or a commercial build-out, we bring the same dedication and professionalism to every job.
            </p>
          </div>
        </section>

        {/* Video + Content */}
        <section className="about about-page-main">
          <div className="row">
            <div className="video">
              <AboutVideo />
            </div>
            <div className="content">
              <h3>We will provide you the best work which you dreamt for!</h3>
              <p>
                With over a decade of experience in construction and carpentry, we bring expertise, quality craftsmanship, and attention to detail to every project. From custom homes to commercial buildings, we deliver results that exceed expectations.
              </p>
              <p>
                Our team combines traditional skills with modern techniques—ensuring your project is built to last and finished with care. We&apos;re proud to work with hundreds of satisfied clients across Ottawa and the surrounding communities.
              </p>
              <Link href="/services" className="btn">Our Services</Link>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-page-values">
          <h2 className="about-page-section-title">What We Stand For</h2>
          <div className="about-page-values__grid">
            {VALUES.map((v, i) => (
              <div key={i} className="about-page-value-card">
                <div className="about-page-value-card__icon">
                  <i className={v.icon} aria-hidden />
                </div>
                <h3 className="about-page-value-card__title">{v.title}</h3>
                <p className="about-page-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Area */}
        <section className="about-page-areas">
          <h2 className="about-page-section-title">Where We Work</h2>
          <p className="about-page-areas__lead">
            Proudly serving Ottawa and the surrounding region. Residential and commercial projects—wherever you are, we bring the same quality and reliability.
          </p>
          <div className="about-page-areas__list">
            {SERVICE_AREAS.map((area, i) => (
              <span key={i} className="about-page-areas__tag">{area}</span>
            ))}
          </div>
          <p className="about-page-areas__foot">…and everywhere in between.</p>
        </section>

        {/* Stats */}
        <section className="about-page-stats">
          <div className="about-page-stats__grid">
            <div className="about-page-stat">
              <span className="about-page-stat__num">7+</span>
              <span className="about-page-stat__label">Years Experience</span>
            </div>
            <div className="about-page-stat">
              <span className="about-page-stat__num">350</span>
              <span className="about-page-stat__label">Projects Completed</span>
            </div>
            <div className="about-page-stat">
              <span className="about-page-stat__num">100+</span>
              <span className="about-page-stat__label">Satisfied Clients</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-page-cta">
          <h2 className="about-page-cta__title">Ready to Start Your Project?</h2>
          <p className="about-page-cta__text">
            Get a free consultation and quote. No obligation—just straight talk and quality work.
          </p>
          <div className="about-page-cta__buttons">
            <Link href="/contact" className="btn">
              <i className="fas fa-calendar-alt" aria-hidden /> Get a Free Quote
            </Link>
            <Link href="/our-work" className="btn btn-outline">
              <i className="fas fa-images" aria-hidden /> View Our Projects
            </Link>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
