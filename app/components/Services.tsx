import Image from 'next/image'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      img: '/images/service-1.png',
      title: 'Kitchens',
      desc: 'Complete kitchen renovation, design, and installation. Custom cabinets, countertops, and modern fixtures.',
      category: 'kitchens',
    },
    {
      img: '/images/service-2.png',
      title: 'Bath',
      desc: 'Bathroom remodeling and renovation services. Transform your space with quality fixtures and finishes.',
      category: 'bath',
    },
    {
      img: '/images/service-3.png',
      title: 'Basement',
      desc: 'Basement finishing and renovation. Create additional living space with professional craftsmanship.',
      category: 'basement',
    },
    {
      img: '/images/service-4.png',
      title: 'Deck and Fences',
      desc: 'Custom deck construction and fence installation. Enhance your outdoor living space with durable materials.',
      category: 'deck-fences',
    },
    {
      img: '/images/service-5.png',
      title: 'Sheds',
      desc: 'Custom shed design and construction. Functional storage solutions tailored to your needs.',
      category: 'sheds',
    },
  ]

  return (
    <section className="services services-grid-style" id="services">
      <h1 className="heading">Services</h1>

      <div className="services-grid">
        {services.map((service, index) => (
          <article key={index} className="service-card">
            <div className="service-card-image">
              <Image
                src={service.img}
                alt={service.title}
                width={400}
                height={240}
                className="service-card-img"
              />
            </div>
            <div className="service-card-body">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <Link
                href={`#quote?service=${service.category}`}
                className="service-card-btn"
              >
                Learn more
              </Link>
            </div>
          </article>
        ))}

        <article className="service-card service-card-cta">
          <div className="service-card-body">
            <h3 className="service-card-title service-card-cta-title">Get A Quote</h3>
            <p className="service-card-desc service-card-cta-desc">
              Embaby Carpentry&apos;s commitment to quality and customer satisfaction has built a strong reputation. Contact us today for construction and carpentry services you&apos;ll be pleased with, guaranteed.
            </p>
            <Link href="#quote" className="service-card-btn service-card-cta-btn">
              Get a quote
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
