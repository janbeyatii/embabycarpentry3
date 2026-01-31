import Image from 'next/image'

export default function Services() {
  const services = [
    { 
      img: '/images/service-1.png', 
      title: 'Kitchens', 
      desc: 'Complete kitchen renovation, design, and installation. Custom cabinets, countertops, and modern fixtures.',
      icon: 'fas fa-utensils',
      category: 'kitchens'
    },
    { 
      img: '/images/service-2.png', 
      title: 'Bath', 
      desc: 'Bathroom remodeling and renovation services. Transform your space with quality fixtures and finishes.',
      icon: 'fas fa-bath',
      category: 'bath'
    },
    { 
      img: '/images/service-3.png', 
      title: 'Basement', 
      desc: 'Basement finishing and renovation. Create additional living space with professional craftsmanship.',
      icon: 'fas fa-home',
      category: 'basement'
    },
    { 
      img: '/images/service-4.png', 
      title: 'Deck and Fences', 
      desc: 'Custom deck construction and fence installation. Enhance your outdoor living space with durable materials.',
      icon: 'fas fa-th',
      category: 'deck-fences'
    },
    { 
      img: '/images/service-5.png', 
      title: 'Sheds', 
      desc: 'Custom shed design and construction. Functional storage solutions tailored to your needs.',
      icon: 'fas fa-warehouse',
      category: 'sheds'
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
            <a href={`#quote?service=${service.category}`} className="btn" style={{ marginTop: '1.5rem', fontSize: '1.4rem', padding: '0.8rem 2rem' }}>
              Get Quote <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
