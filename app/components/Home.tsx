'use client'

export default function Home() {
  return (
    <section className="home home-static" id="home">
      <div className="hero-bg">
        <img
          src="/images/home-slide-1.jpg"
          alt=""
          className="hero-bg-img"
        />
        <div className="hero-overlay" aria-hidden />
      </div>
      <div className="hero-content">
        <p className="hero-subtitle" aria-hidden>Since 2019</p>
        <h1 className="hero-headline">
          We offer Construction Services for Residential or Commercial use.
        </h1>
        <p className="hero-body">
          For over 7 years, the locally owned and operated Embaby Carpentry has worked with hundresds of residential homeowners, architects, commercial builders, interior designers, general contractors, carpenters, real estate developers and realtors.
        </p>
        <div className="hero-ctas">
          <a href="#services" className="btn hero-btn-primary">
            Our Services
          </a>
          <a href="tel:+16138221200" className="hero-phone-box">
            <i className="fas fa-phone" aria-hidden />
            <span>1-613-822-1200</span>
          </a>
        </div>
      </div>
    </section>
  )
}
