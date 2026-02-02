'use client'

const testimonials = [
  {
    name: 'Mostafa Youssef',
    text: 'Omar did an exceptional job building our deck! From start to finish, his professionalism, attention to detail, and on-time delivery exceeded our expectations. The craftsmanship is outstanding.',
    project: 'Custom Deck',
  },
  {
    name: 'Sara Maxx',
    text: 'We hired Omar to build a custom 10x12 shed for our backyard. Passionate about his work and thorough in the details, we could not be happier with the end result.',
    project: 'Custom Shed',
  },
  {
    name: 'Donna Anderton',
    text: 'Omar came and did an amazing job of taking our tired old deck apart and replacing it with a very beautiful new deck very efficiently. We could not be happier with the results.',
    project: 'Deck Replacement',
  },
]

export default function ProjectsTestimonials() {
  return (
    <section className="projects-testimonials">
      <h2 className="projects-testimonials__title">What Our Clients Say</h2>
      <p className="projects-testimonials__subtitle">
        Real feedback from homeowners and businesses we&apos;ve had the pleasure to work with.
      </p>
      <div className="projects-testimonials__grid">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="projects-testimonial-card">
            <div className="projects-testimonial-card__stars">
              {[...Array(5)].map((_, j) => (
                <i key={j} className="fas fa-star" aria-hidden />
              ))}
            </div>
            <p className="projects-testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
            <footer className="projects-testimonial-card__footer">
              <cite className="projects-testimonial-card__name">{t.name}</cite>
              <span className="projects-testimonial-card__project">{t.project}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
