import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { getPortfolioData } from '@/lib/portfolio-data'
import { getCategorySummary } from '@/lib/category-summaries'
import Link from 'next/link'
import LazyPortfolioCard from './LazyPortfolioCard'
import BeforeAfterSlider from './BeforeAfterSlider'
import ProjectsCTA from './ProjectsCTA'
import ProjectsTestimonials from './ProjectsTestimonials'

export const metadata = {
  title: 'Our Projects - Embaby Carpentry',
  description: 'Browse our portfolio of construction, renovation, and carpentry projects in the Ottawa area.',
}

export default function OurWorkPage() {
  const data = getPortfolioData()
  const projects = data?.byProject ?? []

  // Projects with 2+ images for before/after (take first 3)
  const beforeAfterProjects = projects
    .filter((p) => p.images.length >= 2)
    .slice(0, 3)

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
            <h1 className="our-work-hero__title">Our Projects</h1>
            <p className="our-work-hero__lead">
              These are the projects we&apos;re proud to showcase—each one reflects our commitment to quality craftsmanship and attention to detail.
            </p>
            <p className="our-work-hero__desc">
              Explore our portfolio of construction, renovation, and custom carpentry work across the Ottawa region. Residential and commercial—we deliver results that exceed expectations.
            </p>
            <div className="our-work-hero-badges">
              <div className="our-work-hero-badge">
                <i className="fas fa-home our-work-hero-badge-icon" aria-hidden />
                <span className="our-work-hero-badge-text">Residential</span>
                <span className="our-work-hero-badge-desc">Homes, renovations, custom builds</span>
              </div>
              <div className="our-work-hero-badge">
                <i className="fas fa-building our-work-hero-badge-icon" aria-hidden />
                <span className="our-work-hero-badge-text">Commercial</span>
                <span className="our-work-hero-badge-desc">Offices, retail, institutional</span>
              </div>
            </div>
            <Link href="/contact" className="our-work-hero__cta">
              Get a Free Quote
            </Link>
          </div>
        </section>

        <ProjectsCTA />

        {beforeAfterProjects.length > 0 && (
          <section className="our-work-before-after">
            <h2 className="our-work-section-title">Before & After</h2>
            <p className="our-work-section-subtitle">
              See the transformation. Drag the slider to compare.
            </p>
            <div className="our-work-before-after-grid">
              {beforeAfterProjects.map((proj, i) => (
                <div key={i} className="our-work-before-after-item">
                  <BeforeAfterSlider
                    beforeUrl={proj.images[0].url}
                    afterUrl={proj.images[proj.images.length - 1].url}
                    title={`${proj.category} - ${proj.project}`}
                  />
                  <p className="our-work-before-after-caption">
                    {proj.category} — {proj.project}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ProjectsCTA variant="secondary" />

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
