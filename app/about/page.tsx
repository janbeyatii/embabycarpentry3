import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Link from 'next/link'

export const metadata = {
  title: 'About Us - Embaby Carpentry',
  description: 'Learn about Embaby Carpentry - quality construction and carpentry services in the Ottawa area since 2019.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="main-content about-page">
        <section className="about-page-hero" style={{
          padding: '8rem 10% 5rem',
          background: 'var(--black)',
          textAlign: 'center',
        }}>
          <h1 className="heading heading-center">About Us</h1>
          <p style={{
            fontSize: '1.8rem',
            color: 'var(--text-secondary)',
            maxWidth: '60rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Quality craftsmanship and customer satisfaction since 2019.
          </p>
        </section>

        <section className="about">
          <div className="row">
            <div className="video">
              <video src="/images/about-vid.mp4" loop muted autoPlay playsInline></video>
            </div>
            <div className="content">
              <h3>We will provide you the best work which you dreamt for!</h3>
              <p>With over a decade of experience in construction and carpentry, we bring expertise, quality craftsmanship, and attention to detail to every project. From custom homes to commercial buildings, we deliver results that exceed expectations.</p>
              <div className="about-features" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--yellow)', fontSize: '2rem' }}></i>
                  <span>Licensed & Insured Professionals</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--yellow)', fontSize: '2rem' }}></i>
                  <span>Quality Materials & Workmanship</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--yellow)', fontSize: '2rem' }}></i>
                  <span>On-Time Project Completion</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--yellow)', fontSize: '2rem' }}></i>
                  <span>Comprehensive Warranty Coverage</span>
                </div>
              </div>
              <Link href="/services" className="btn" style={{ marginTop: '2rem' }}>Our Services</Link>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
