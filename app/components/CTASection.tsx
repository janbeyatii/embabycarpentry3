export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Start Your Project?</h2>
        <p>
          Get in touch with us today for a free consultation and quote. Let's build something amazing together!
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#quote" className="btn" style={{ background: 'var(--black)', color: 'var(--white)' }}>
            <i className="fas fa-calculator" style={{ marginRight: '1rem' }}></i>
            Get Free Quote
          </a>
          <a href="#contact" className="btn btn-outline" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>
            <i className="fas fa-phone" style={{ marginRight: '1rem' }}></i>
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}
