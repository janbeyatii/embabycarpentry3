import Header from './components/Header'
import OffersBanner from './components/OffersBanner'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Reviews from './components/Reviews'
import QuoteRequest from './components/QuoteRequest'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Blogs from './components/Blogs'
import LogoSlider from './components/LogoSlider'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function Page() {
  return (
    <>
      <Header />
      <OffersBanner />
      <Home />
      <Stats />
      <About />
      <Services />
      <Certifications />
      <Projects />
      <Reviews />
      <QuoteRequest />
      <FAQ />
      <Contact />
      <Blogs />
      <LogoSlider />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </>
  )
}
