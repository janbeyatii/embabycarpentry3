import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { getPortfolioData } from '@/lib/portfolio-data'
import Link from 'next/link'
import PortfolioGallery from './PortfolioGallery'

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
      <div className="main-content">
        <section className="our-work-hero">
          <h1 className="heading heading-center">Our Projects</h1>
          <p>
            Explore our portfolio of construction, renovation, and custom carpentry projects across the Ottawa region.
          </p>
        </section>

        <section className="our-work-portfolio">
          {categories.length === 0 ? (
            <div className="our-work-empty">
              <p>No portfolio projects yet.</p>
              <p>Run the upload script to add your project images.</p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="our-work-category">
                <h2 className="our-work-category-title">{category}</h2>
                <div className="our-work-grid">
                  {byCategory[category].map((proj, idx) => {
                    const firstImg = proj.images[0]?.url
                    const title = proj.project ? `${category} - ${proj.project}` : category

                    return (
                      <PortfolioGallery
                        key={`${category}-${proj.project}-${idx}`}
                        title={title}
                        images={proj.images}
                        thumbnailUrl={firstImg}
                      />
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="our-work-cta">
          <h2>Need custom woodworking?</h2>
          <p>
            Browse our custom woodworking products or request a custom build.
          </p>
          <Link href="/woodworking" className="btn">
            View Woodworking
          </Link>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
