export interface ServiceData {
  id: string
  slug: string
  title: string
  shortDesc: string
  img: string
  content: {
    intro: string
    highlights: string[]
    body: string
    cta: string
  }
}

export const SERVICES: ServiceData[] = [
  {
    id: 'kitchens',
    slug: 'kitchens',
    title: 'Kitchen Renovations',
    shortDesc: 'Complete kitchen renovation, design, and installation. Custom cabinets, countertops, and modern fixtures.',
    img: '/images/service-1.webp',
    content: {
      intro: 'Transform your kitchen into the heart of your home with a custom renovation from Embaby Carpentry. Whether you’re looking for a full remodel or targeted upgrades, we deliver quality craftsmanship and thoughtful design.',
      highlights: [
        'Custom cabinet design and installation',
        'Countertop installation (quartz, granite, laminate)',
        'New flooring and backsplash',
        'Island and pantry construction',
        'Fixture and hardware upgrades',
        'Electrical and plumbing coordination',
      ],
      body: 'A well-designed kitchen improves daily life and adds lasting value to your home. We handle everything from layout planning and material selection to installation and finishing, working with your preferences and budget. Our team coordinates with trusted suppliers for countertops, cabinets, and fixtures so your project runs smoothly from start to finish.',
      cta: 'Ready to design your dream kitchen? Book a free consultation and we’ll discuss your vision and timeline.',
    },
  },
  {
    id: 'bath',
    slug: 'bath',
    title: 'Bathroom Renovations',
    shortDesc: 'Bathroom remodeling and renovation services. Transform your space with quality fixtures and finishes.',
    img: '/images/service-2.webp',
    content: {
      intro: 'Upgrade your bathroom with a renovation that combines function and style. From small updates to full remodels, Embaby Carpentry delivers durable, well-finished spaces that fit your needs.',
      highlights: [
        'Full bathroom remodels',
        'Custom vanity and storage solutions',
        'Tile work for floors, walls, and showers',
        'Tub-to-shower conversions',
        'Fixtures and hardware installation',
        'Waterproofing and moisture control',
      ],
      body: 'Bathrooms face constant use and moisture, so quality materials and installation matter. We focus on proper waterproofing, ventilation, and long-lasting finishes. Whether you want a spa-like ensuite or a practical family bath, we work within your layout and budget to create a space you’ll enjoy for years.',
      cta: 'Transform your bathroom into a space you’ll love. Get in touch for a free quote.',
    },
  },
  {
    id: 'basement',
    slug: 'basement',
    title: 'Basement Finishing',
    shortDesc: 'Basement finishing and renovation. Create additional living space with professional craftsmanship.',
    img: '/images/service-3.webp',
    content: {
      intro: 'Turn your unfinished basement into usable living space. We handle framing, insulation, drywall, flooring, and finishes so you can add a rec room, home office, guest suite, or more.',
      highlights: [
        'Framing and insulation',
        'Drywall and painting',
        'Flooring (laminate, vinyl, carpet)',
        'Recreation rooms and home offices',
        'Bedrooms and bathrooms',
        'Egress windows for safety and light',
      ],
      body: 'A finished basement increases usable square footage and home value. We start with moisture and water management, then build out the space to match your goals—whether that’s an open rec room, a private suite, or a dedicated home office. We ensure proper insulation, egress where needed, and finishes that fit your style.',
      cta: 'Ready to maximize your basement? Let’s discuss your ideas and create a plan.',
    },
  },
  {
    id: 'decks',
    slug: 'decks',
    title: 'Decks',
    shortDesc: 'Custom deck construction. Extend your living space outdoors with durable, quality-built decks.',
    img: '/images/service-4.webp',
    content: {
      intro: 'Extend your living space outdoors with a custom deck from Embaby Carpentry. We design and build decks that fit your lot, lifestyle, and budget using wood, composite, and other quality materials.',
      highlights: [
        'Custom deck design and construction',
        'Composite and pressure-treated wood options',
        'Multi-level and wrap-around decks',
        'Stairs, railings, and built-in seating',
        'Covered decks and pergola integration',
        'Maintenance and repair work',
      ],
      body: 'A well-built deck adds outdoor living space and value to your home. We handle everything from design and permits to construction and finishing, ensuring your deck is built to last in the Ottawa climate. Whether you want a simple ground-level patio or a multi-level entertaining space, we deliver quality craftsmanship you can count on.',
      cta: 'Ready to enjoy your outdoor space? Contact us for a free estimate on your deck.',
    },
  },
  {
    id: 'fences',
    slug: 'fences',
    title: 'Fences',
    shortDesc: 'Quality fence installation. Privacy, boundary, and decorative fencing for your property.',
    img: '/images/service-6.webp',
    content: {
      intro: 'Define your property and add privacy with a quality fence from Embaby Carpentry. We install privacy fences, boundary fencing, gates, and decorative options to suit your needs and style.',
      highlights: [
        'Privacy and boundary fencing',
        'Wood, vinyl, and composite options',
        'Gates and entry features',
        'Decorative and ornamental fencing',
        'Fence repair and replacement',
        'Post-and-rail installations',
      ],
      body: 'A well-built fence provides privacy, security, and curb appeal. We design and install fences that match your property, local codes, and aesthetic preferences. From classic wood privacy fences to modern vinyl or decorative styles, we deliver durable installations that stand up to Ottawa weather.',
      cta: 'Need a new fence or gate? Get in touch for a free quote.',
    },
  },
  {
    id: 'sheds-gazebos-pergolas',
    slug: 'sheds-gazebos-pergolas',
    title: 'Sheds, Gazebos & Pergolas',
    shortDesc: 'Custom sheds, gazebos, and pergolas. Storage, shade, and outdoor structures tailored to your property.',
    img: '/images/service-5.webp',
    content: {
      intro: 'Add function and style to your yard with custom sheds, gazebos, or pergolas. We design and build outdoor structures that fit your space and needs—whether for storage, shade, or outdoor entertaining.',
      highlights: [
        'Custom shed design and construction',
        'Garden, tool, and workshop sheds',
        'Gazebo design and installation',
        'Pergola and shade structures',
        'Doors, windows, shelving, and finishes',
        'Durable framing and roofing',
      ],
      body: 'Sheds provide storage and workspace; gazebos and pergolas create inviting outdoor living areas. We build all three with quality materials and solid construction, tailored to your property and preferences. From a simple garden shed to an elegant backyard pergola, we deliver structures that enhance your outdoor space and stand up to the Ottawa climate.',
      cta: 'Ready to add a shed, gazebo, or pergola? Let’s discuss your vision and create a plan.',
    },
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug)
}
