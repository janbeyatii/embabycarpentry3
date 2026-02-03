import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/lib/blog-data'

import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'Ottawa Renovation & Contractor Blog | Tips, Costs, Guides | Embaby Carpentry',
  description:
    'Expert tips on kitchen renovation costs Ottawa, choosing an Ottawa contractor, custom carpentry, and home renovations. Guides for Ottawa homeowners.',
  openGraph: {
    title: 'Ottawa Renovation & Contractor Blog | Embaby Carpentry',
    description: 'Tips on kitchen costs, contractor selection, and renovations in Ottawa.',
    url: `${SITE_URL}/blog`,
  },
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="main-content blog-page">
        <section className="blog-page-hero">
          <h1 className="heading heading-center">Ottawa Renovation &amp; Contractor Blog</h1>
          <p className="blog-page-hero__lead">
            Tips, cost guides, and insights for Ottawa homeowners—kitchen renovation costs, how to choose an Ottawa contractor, custom carpentry, and more.
          </p>
        </section>

        <section className="blog-page-list">
          <div className="blog-page-grid">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="blog-page-card">
                <Link href={`/blog/${post.slug}`} className="blog-page-card__link">
                  <div className="blog-page-card__image">
                    <Image
                      src={post.image}
                      alt={`${post.title} - Embaby Carpentry Ottawa blog`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    />
                  </div>
                  <div className="blog-page-card__body">
                    <h2 className="blog-page-card__title">{post.title}</h2>
                    <p className="blog-page-card__excerpt">{post.excerpt}</p>
                    <span className="blog-page-card__meta">
                      {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.readTime}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
