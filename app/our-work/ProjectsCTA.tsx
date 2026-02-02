import Link from 'next/link'

type Props = {
  variant?: 'primary' | 'secondary'
}

export default function ProjectsCTA({ variant = 'primary' }: Props) {
  if (variant === 'secondary') {
    return (
      <div className="projects-cta-block projects-cta-block--secondary">
        <h3 className="projects-cta-block__title">Ready to Start Your Project?</h3>
        <p className="projects-cta-block__text">
          Join hundreds of satisfied homeowners and businesses. Get a free, no-obligation quote today.
        </p>
        <Link href="/contact" className="projects-cta-block__btn projects-cta-block__btn--outline">
          Get a Free Quote
        </Link>
      </div>
    )
  }

  return (
    <div className="projects-cta-block">
      <h3 className="projects-cta-block__title">Let&apos;s Build Something Amazing</h3>
      <p className="projects-cta-block__text">
        From concept to completion, we bring your vision to life with quality craftsmanship you can trust.
      </p>
      <Link href="/contact" className="projects-cta-block__btn">
        Request Free Quote
      </Link>
      <p className="projects-cta-block__sub">No obligation · Response within 24 hours</p>
    </div>
  )
}
