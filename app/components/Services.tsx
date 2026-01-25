import Image from 'next/image'

export default function Services() {
  const services = [
    { img: '/images/service-1.png', title: 'building construction', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-2.png', title: 'house renovation', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-3.png', title: 'architechture design', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-4.png', title: 'material supply', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-5.png', title: 'construction consultant', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-6.png', title: 'interior design', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-7.png', title: 'building maintenance', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
    { img: '/images/service-8.png', title: 'building renovation', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.' },
  ]

  return (
    <section className="services" id="services">
      <h1 className="heading"> our services </h1>

      <div className="box-container">
        {services.map((service, index) => (
          <div key={index} className="box">
            <Image src={service.img} alt={service.title} width={100} height={100} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
