import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'

export default function Services() {

  return (
    <section className="services services-grid-style" id="services">
      <h1 className="heading">Services</h1>

      <div className="services-grid">
        {SERVICES.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-card-image">
              <Image
                src={service.img}
                alt={`${service.title} Ottawa - Embaby Carpentry`}
                width={400}
                height={240}
                className="service-card-img"
              />
            </div>
            <div className="service-card-body">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.shortDesc}</p>
              <Link
                href={`/services/${service.slug}`}
                className="service-card-btn"
              >
                Learn more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
