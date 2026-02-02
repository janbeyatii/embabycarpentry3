import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { getPortfolioData } from '@/lib/portfolio-data'
import { getCategorySummary } from '@/lib/category-summaries'
import Link from 'next/link'
import LazyPortfolioCard from './LazyPortfolioCard'
import ProjectsTestimonials from './ProjectsTestimonials'

export const metadata = {
  title: 'Our Projects - Embaby Carpentry',
  description: 'Browse our portfolio of construction, renovation, and carpentry projects in the Ottawa area.',
}

export default function OurWorkPage() {
  const data = getPortfolioData()
  const projects = data?.byProject ?? []

  // Group by category
  const byCategory = projects.reduce<Record<string, typeof projects>>((acc, p) => {
    const cat = p.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const categories = Object.keys(byCategory).sort()

  return (
    <>
      <Header />
      <div className="main-content our-work-page">
        <section className="our-work-hero our-work-hero--premium">
          <div className="our-work-hero__bg" aria-hidden />
          <div className="our-work-hero__content">
            <p className="our-work-hero__tagline">Proof of What We Build</p>
            <h1 className="our-work-hero__title">Our Projects</h1>
            <p className="our-work-hero__lead">
              Quality craftsmanship you can trust. Every project reflects our commitment to precision, durability, and results that last.
            </p>
            <div className="our-work-hero__copy">
              <p>We don&apos;t just deliver work—we deliver outcomes. From kitchen renovations to custom outdoor structures, our portfolio showcases the level of care and expertise you can expect.</p>
              <p><strong>Residential and commercial.</strong> Ottawa and the surrounding region. Built to exceed expectations.</p>
            </div>
            <div className="our-work-hero__cta-wrap">
              <Link href="/contact" className="our-work-hero__cta">
                Get a Free Quote
              </Link>
              <span className="our-work-hero__cta-reassurance">No obligation · Response within 24 hours</span>
            </div>
          </div>
        </section>

        <section className="our-work-portfolio">
          {categories.length === 0 ? (
            <div className="our-work-empty">
              <p>No portfolio projects yet.</p>
              <p>Run the upload script to add your project images.</p>
            </div>
          ) : (
            (() => {
              let cardIndex = 0
              const PRIORITY_COUNT = 6
              return categories.map((category) => (
                <div key={category} className="our-work-category">
                  <div className="our-work-category-header">
                    <h2 className="our-work-category-title">{category}</h2>
                    <p className="our-work-category-summary">{getCategorySummary(category)}</p>
                  </div>
                  <div className="our-work-grid">
                    {byCategory[category].map((proj, idx) => {
                      const firstImg = proj.images[0]?.url
                      const title = proj.project ? `${category} - ${proj.project}` : category
                      const isPriority = cardIndex++ < PRIORITY_COUNT

                      return (
                        <LazyPortfolioCard
                          key={`${category}-${proj.project}-${idx}`}
                          title={title}
                          images={proj.images}
                          thumbnailUrl={firstImg}
                          priority={isPriority}
                        />
                      )
                    })}
                  </div>
                </div>
              ))
            })()
          )}
        </section>

        <ProjectsTestimonials />

        <section className="our-work-cta our-work-cta--final">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Get a free, no-obligation quote. We respond within 24 hours.
          </p>
          <div className="our-work-cta-buttons">
            <Link href="/contact" className="btn btn--gold">
              Get a Free Quote
            </Link>
            <Link href="/woodworking" className="btn btn--outline">
              View Custom Woodworking
            </Link>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
