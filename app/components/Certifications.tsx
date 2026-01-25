export default function Certifications() {
  const certifications = [
    {
      icon: 'fas fa-certificate',
      title: 'Licensed & Bonded',
      description: 'Fully licensed contractors with comprehensive bonding for your protection'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Fully Insured',
      description: 'Complete liability and workers compensation insurance coverage'
    },
    {
      icon: 'fas fa-award',
      title: 'Award Winning',
      description: 'Recognized for excellence in construction and customer satisfaction'
    },
    {
      icon: 'fas fa-users',
      title: 'BBB Accredited',
      description: 'A+ rating with Better Business Bureau for outstanding service'
    },
    {
      icon: 'fas fa-tools',
      title: 'Master Craftsmen',
      description: 'Certified professionals with decades of combined experience'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Eco-Friendly',
      description: 'Committed to sustainable building practices and green construction'
    }
  ]

  return (
    <section className="certifications">
      <h1 className="heading heading-center">Our Credentials</h1>
      <p className="subheading" style={{ textAlign: 'center', maxWidth: '60rem', margin: '0 auto 4rem' }}>
        Trusted by homeowners and businesses for quality, reliability, and professionalism
      </p>

      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <i className={cert.icon}></i>
            <h3>{cert.title}</h3>
            <p>{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
