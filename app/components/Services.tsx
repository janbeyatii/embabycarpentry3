import Image from 'next/image'

export default function Services() {
  const services = [
    { 
      img: '/images/service-1.png', 
      title: 'Building Construction', 
      desc: 'Complete construction services from foundation to finish. We handle residential and commercial projects with precision and quality craftsmanship.',
      icon: 'fas fa-building'
    },
    { 
      img: '/images/service-2.png', 
      title: 'House Renovation', 
      desc: 'Transform your existing space with our expert renovation services. Kitchen, bathroom, and whole-house renovations tailored to your vision.',
      icon: 'fas fa-home'
    },
    { 
      img: '/images/service-3.png', 
      title: 'Architecture Design', 
      desc: 'Professional architectural design services. From concept to completion, we bring your ideas to life with innovative and functional designs.',
      icon: 'fas fa-drafting-compass'
    },
    { 
      img: '/images/service-4.png', 
      title: 'Material Supply', 
      desc: 'Quality materials at competitive prices. We source the best materials and ensure timely delivery to keep your project on schedule.',
      icon: 'fas fa-truck'
    },
    { 
      img: '/images/service-5.png', 
      title: 'Construction Consulting', 
      desc: 'Expert consultation for your construction needs. Get professional advice on planning, budgeting, and project management.',
      icon: 'fas fa-clipboard-check'
    },
    { 
      img: '/images/service-6.png', 
      title: 'Interior Design', 
      desc: 'Beautiful interior spaces that reflect your style. Our design team creates functional and aesthetically pleasing interiors.',
      icon: 'fas fa-paint-roller'
    },
    { 
      img: '/images/service-7.png', 
      title: 'Building Maintenance', 
      desc: 'Regular maintenance to keep your property in top condition. Preventive care and repairs to extend the life of your building.',
      icon: 'fas fa-tools'
    },
    { 
      img: '/images/service-8.png', 
      title: 'Building Renovation', 
      desc: 'Comprehensive renovation services for commercial and residential buildings. Modernize and improve your property value.',
      icon: 'fas fa-hammer'
    },
  ]

  return (
    <section className="services" id="services">
      <h1 className="heading heading-center">Our Services</h1>
      <p className="subheading" style={{ textAlign: 'center', maxWidth: '60rem', margin: '0 auto 4rem' }}>
        Comprehensive construction and carpentry services to bring your vision to life
      </p>

      <div className="box-container">
        {services.map((service, index) => (
          <div key={index} className="box fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <Image src={service.img} alt={service.title} width={100} height={100} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '3rem',
                color: 'var(--yellow)',
                opacity: 0,
                transition: 'var(--transition)'
              }} className="service-icon">
                <i className={service.icon}></i>
              </div>
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a href="#quote" className="btn" style={{ marginTop: '1.5rem', fontSize: '1.4rem', padding: '0.8rem 2rem' }}>
              Learn More <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
