import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Blogs from './components/Blogs'
import LogoSlider from './components/LogoSlider'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Services />
      <Projects />
      <Reviews />
      <Pricing />
      <Contact />
      <Blogs />
      <LogoSlider />
      <Footer />
    </>
  )
}
