import Header from './components/Header'
import OffersBanner from './components/OffersBanner'
import Home from './components/Home'
import { getSlideshowImages } from '@/lib/portfolio-data'
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

export default function Page() {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="landing-view">
          <OffersBanner />
          <Home slideshowImages={getSlideshowImages(25)} />
        </div>
        <Stats />
        <About />
        <Services />
        <Projects previewCount={3} />
        <Reviews />
        <FAQ />
        <Blogs />
        <CTASection />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
