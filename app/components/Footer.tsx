import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <h3 className="footer-logo">
              Embaby <span className="footer-logo-accent">Carpentry</span>
            </h3>
            <p className="footer-tagline">
              Ottawa contractor for construction, renovations, and custom carpentry. From concept to creation.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/our-work">Our Projects</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/woodworking">Woodworking</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Ottawa Services</h4>
            <ul className="footer-links">
              <li><Link href="/services/kitchens">Kitchen Renovations Ottawa</Link></li>
              <li><Link href="/services/bath">Bathroom Renovations Ottawa</Link></li>
              <li><Link href="/services/basement">Basement Finishing Ottawa</Link></li>
              <li><Link href="/services/decks">Deck Builder Ottawa</Link></li>
              <li><Link href="/services/fences">Fence Installation Ottawa</Link></li>
              <li><Link href="/services/sheds-gazebos-pergolas">Sheds &amp; Pergolas Ottawa</Link></li>
              <li><Link href="/woodworking">Custom Woodworking Ottawa</Link></li>
              <li><Link href="/contact">Free Quote</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-phone" aria-hidden />
                <a href="tel:+16138163764">+1 (613) 816-3764</a>
              </li>
              <li>
                <i className="fas fa-envelope" aria-hidden />
                <a href="mailto:embabycarpentry@gmail.com">embabycarpentry@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt" aria-hidden />
                <span>Ottawa, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-credit">
            © {currentYear} Embaby Carpentry. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/embabycarpentry?igsh=dWo1eXVjYWduYzgz" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="footer-social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
