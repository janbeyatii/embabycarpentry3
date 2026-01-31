export default function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading"> about us </h1>

      <div className="row">
        <div className="video">
          <video src="/images/about-vid.mp4" loop muted autoPlay></video>
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
          <a href="#services" className="btn" style={{ marginTop: '2rem' }}>Our Services</a>
        </div>
      </div>

      <div className="box-container">
        <div className="box">
          <h3>10+</h3>
          <p>years of experience</p>
        </div>

        <div className="box">
          <h3>1500+</h3>
          <p>project completed</p>
        </div>

        <div className="box">
          <h3>790+</h3>
          <p>satiesfied clients</p>
        </div>

        <div className="box">
          <h3>450+</h3>
          <p>active workers</p>
        </div>
      </div>
    </section>
  )
}
