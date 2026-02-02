import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const SQUARE_BOOKING_URL = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL || ''

export const metadata = {
  title: 'Book a Consultation - Embaby Carpentry',
  description: 'Book a free consultation for construction and carpentry services in the Ottawa area.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="main-content contact-page">
        <section className="contact-page-hero">
          <h1 className="heading heading-center">Book a Consultation</h1>
          <p className="contact-page-hero-text">
            Book a free consultation using the scheduler below.
          </p>
        </section>

        <section className="contact-page-content">
          <div className="contact-page-grid">
            <aside className="contact-page-sidebar">
              <h3 className="contact-page-sidebar-title">Contact Information</h3>
              <div className="contact-page-info-list">
                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">
                    <i className="fas fa-phone" aria-hidden />
                  </span>
                  <a href="tel:+16138163764">+1 (613) 816-3764</a>
                </div>
                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">
                    <i className="fas fa-envelope" aria-hidden />
                  </span>
                  <a href="mailto:embabycarpentry@gmail.com">embabycarpentry@gmail.com</a>
                </div>
                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">
                    <i className="fas fa-map-marker-alt" aria-hidden />
                  </span>
                  <span>Ottawa, ON, Canada</span>
                </div>
              </div>

              <h3 className="contact-page-sidebar-title contact-page-follow-title">Follow Us</h3>
              <div className="contact-page-social">
                <a href="https://www.instagram.com/embabycarpentry?igsh=dWo1eXVjYWduYzgz" target="_blank" rel="noopener noreferrer" className="contact-page-social-link" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              </div>

            </aside>

            <div className="contact-page-main">
              <div className="contact-page-booking-wrapper">
                {SQUARE_BOOKING_URL ? (
                  <iframe
                    className="contact-page-booking-embed"
                    src={SQUARE_BOOKING_URL}
                    allowFullScreen
                    loading="lazy"
                    title="Book a consultation"
                  />
                ) : (
                  <p className="contact-page-booking-placeholder">
                    Add <code>NEXT_PUBLIC_SQUARE_BOOKING_URL</code> to your <code>.env</code> file with your Square booking embed URL from the Appointments dashboard (Online Booking → Website Embed).
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
