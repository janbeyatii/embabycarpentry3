import Header from './components/Header'
import OffersBanner from './components/OffersBanner'
import Home from './components/Home'
import { getSlideshowImages } from '@/lib/portfolio-data'
import { SITE_URL, buildFAQSchema } from '@/lib/seo'
import { FAQ_ITEMS } from '@/lib/faq-data'

export const metadata = {
  title: 'Ottawa Contractor | Renovations & Custom Carpentry | Embaby Carpentry',
  description:
    'Ottawa contractor for construction, renovations, and custom carpentry. Kitchen renovations, bathroom remodels, decks, fences, basement finishing. Licensed & insured. Free quote. Ottawa, Ontario.',
  openGraph: {
    title: 'Ottawa Contractor | Renovations & Custom Carpentry | Embaby Carpentry',
    description: 'Construction, renovations, and custom carpentry in Ottawa. Licensed & insured. Free quote.',
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
}
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Blogs from './components/Blogs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnimateIn from './components/AnimateIn'

export default function Page() {
  const faqSchema = buildFAQSchema(FAQ_ITEMS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="main-content home-page-animated">
        <div className="landing-view">
          <OffersBanner />
          <Home slideshowImages={getSlideshowImages(25)} />
        </div>
        <AnimateIn direction="up">
          <Stats />
        </AnimateIn>
        <AnimateIn direction="left">
          <About />
        </AnimateIn>
        <AnimateIn direction="right">
          <Services />
        </AnimateIn>
        <AnimateIn direction="up" delay={0.1}>
          <Projects previewCount={3} />
        </AnimateIn>
        <AnimateIn direction="down">
          <Reviews />
        </AnimateIn>
        <AnimateIn direction="left" delay={0.08}>
          <FAQ />
        </AnimateIn>
        <AnimateIn direction="right" delay={0.08}>
          <Blogs />
        </AnimateIn>
        <AnimateIn direction="up">
          <CTASection />
        </AnimateIn>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
