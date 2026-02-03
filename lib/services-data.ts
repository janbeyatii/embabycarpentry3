export interface ServiceSection {
  h2: string
  body: string
  subs?: { h3: string; body: string }[]
}

export interface ServiceData {
  id: string
  slug: string
  title: string
  shortDesc: string
  metaTitle: string
  metaDescription: string
  img: string
  content: {
    intro: string
    highlights: string[]
    body: string
    cta: string
    sections?: ServiceSection[]
  }
}

export const SERVICES: ServiceData[] = [
  {
    id: 'kitchens',
    slug: 'kitchens',
    title: 'Kitchen Renovations',
    shortDesc: 'Complete kitchen renovation, design, and installation in Ottawa. Custom cabinets, countertops, and modern fixtures.',
    metaTitle: 'Kitchen Renovation Ottawa | Custom Cabinets & Remodels | Embaby Carpentry',
    metaDescription: 'Ottawa kitchen renovation contractor. Custom cabinets, countertops, islands, and full remodels. Licensed & insured. Free quote. Serving Ottawa, Ontario.',
    img: '/images/service-1.webp',
    content: {
      intro:
        'Transform your kitchen into the heart of your home with a custom renovation from Embaby Carpentry. As a trusted Ottawa contractor, we deliver kitchen renovations that combine quality craftsmanship and thoughtful design—whether you want a full remodel or targeted upgrades for your Ottawa home.',
      highlights: [
        'Custom cabinet design and installation',
        'Countertop installation (quartz, granite, laminate)',
        'New flooring and backsplash',
        'Island and pantry construction',
        'Fixture and hardware upgrades',
        'Electrical and plumbing coordination',
      ],
      body:
        'A well-designed kitchen improves daily life and adds lasting value to your home. We handle everything from layout planning and material selection to installation and finishing, working with your preferences and budget. Our team coordinates with trusted suppliers for countertops, cabinets, and fixtures so your Ottawa kitchen renovation runs smoothly from start to finish.',
      cta:
        'Ready to design your dream kitchen? Book a free consultation and we’ll discuss your vision and timeline for your Ottawa kitchen renovation.',
      sections: [
        {
          h2: 'Why Ottawa Homeowners Choose Us for Kitchen Renovations',
          body:
            'Ottawa renovations require a contractor who understands local permits, building codes, and the needs of Ontario homeowners. We bring years of experience in kitchen renovation Ottawa projects—from cosmetic refreshes to full gut-and-remodel jobs. Our focus is on clear communication, realistic timelines, and results that last.',
          subs: [
            {
              h3: 'Full-Service Kitchen Renovation in Ottawa',
              body:
                'From demolition to final trim, we manage your kitchen renovation so you don’t have to coordinate multiple trades. We work with licensed plumbers and electricians when needed and ensure all work meets Ottawa building standards.',
            },
            {
              h3: 'Custom Cabinets and Storage Solutions',
              body:
                'Whether you prefer stock, semi-custom, or fully custom cabinetry, we help you choose and install the right option for your space and budget. We build and install custom cabinets for Ottawa homes where standard sizes don’t fit.',
            },
          ],
        },
        {
          h2: 'What to Expect from Your Ottawa Kitchen Remodel',
          body:
            'Typical Ottawa kitchen renovation timelines range from a few weeks for a refresh to several months for a major remodel. We provide a clear schedule upfront and keep you updated throughout. Materials are sourced from reliable suppliers, and we stand behind our workmanship.',
        },
      ],
    },
  },
  {
    id: 'bath',
    slug: 'bath',
    title: 'Bathroom Renovations',
    shortDesc: 'Bathroom remodeling and renovation in Ottawa. Transform your space with quality fixtures and finishes.',
    metaTitle: 'Bathroom Renovation Ottawa | Full Remodels & Updates | Embaby Carpentry',
    metaDescription: 'Bathroom renovation contractor in Ottawa. Full remodels, tub-to-shower conversions, custom vanities, tile work. Licensed. Free quote. Ottawa, Ontario.',
    img: '/images/service-2.webp',
    content: {
      intro:
        'Upgrade your bathroom with a renovation that combines function and style. From small updates to full remodels, Embaby Carpentry delivers durable, well-finished bathrooms for Ottawa homeowners—so you get a space that fits your needs and stands up to daily use.',
      highlights: [
        'Full bathroom remodels',
        'Custom vanity and storage solutions',
        'Tile work for floors, walls, and showers',
        'Tub-to-shower conversions',
        'Fixtures and hardware installation',
        'Waterproofing and moisture control',
      ],
      body:
        'Bathrooms face constant use and moisture, so quality materials and installation matter. We focus on proper waterproofing, ventilation, and long-lasting finishes. Whether you want a spa-like ensuite or a practical family bath, we work within your layout and budget to create a bathroom you’ll enjoy for years in your Ottawa home.',
      cta:
        'Transform your bathroom into a space you’ll love. Get in touch for a free quote on your Ottawa bathroom renovation.',
      sections: [
        {
          h2: 'Bathroom Renovation Services in Ottawa',
          body:
            'As an Ottawa contractor specializing in bathroom renovations, we handle everything from simple fixture swaps to full gut remodels. We work with local suppliers and follow Ontario building codes so your project is done right.',
          subs: [
            {
              h3: 'Tile, Vanities, and Fixtures',
              body:
                'We install tile for floors, walls, and shower surrounds, and build or install custom vanities to maximize storage. Fixture and hardware installation is included so your Ottawa bathroom renovation is complete and functional.',
            },
            {
              h3: 'Tub-to-Shower Conversions and Accessibility',
              body:
                'Converting a tub to a shower can make your bathroom safer and easier to use. We install quality bases, surrounds, and glass enclosures, and can incorporate accessibility features for Ottawa homeowners planning to age in place.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'basement',
    slug: 'basement',
    title: 'Basement Finishing',
    shortDesc: 'Basement finishing and renovation in Ottawa. Create additional living space with professional craftsmanship.',
    metaTitle: 'Basement Finishing Ottawa | Basement Renovation Contractor | Embaby Carpentry',
    metaDescription: 'Basement finishing and renovation in Ottawa, Ontario. Rec rooms, home offices, guest suites. Framing, drywall, flooring. Licensed. Free quote.',
    img: '/images/service-3.webp',
    content: {
      intro:
        'Turn your unfinished basement into usable living space. We handle framing, insulation, drywall, flooring, and finishes so you can add a rec room, home office, guest suite, or more. Ottawa homeowners trust us for basement finishing that’s built to last.',
      highlights: [
        'Framing and insulation',
        'Drywall and painting',
        'Flooring (laminate, vinyl, carpet)',
        'Recreation rooms and home offices',
        'Bedrooms and bathrooms',
        'Egress windows for safety and light',
      ],
      body:
        'A finished basement increases usable square footage and home value. We start with moisture and water management, then build out the space to match your goals—whether that’s an open rec room, a private suite, or a dedicated home office. We ensure proper insulation, egress where needed, and finishes that fit your style for your Ottawa home.',
      cta:
        'Ready to maximize your basement? Let’s discuss your ideas and create a plan for your Ottawa basement finishing project.',
      sections: [
        {
          h2: 'Basement Renovation and Finishing in Ottawa',
          body:
            'Ottawa basements often need careful attention to moisture, insulation, and egress before finishing. We assess your space and recommend the right approach—so your finished basement stays comfortable and compliant with local codes.',
          subs: [
            {
              h3: 'From Unfinished to Livable Space',
              body:
                'We handle framing, insulation, drywall, and flooring so your Ottawa basement becomes a true extension of your home. Add a bathroom, bedroom, or home office with confidence that the work is done to a high standard.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'decks',
    slug: 'decks',
    title: 'Decks',
    shortDesc: 'Custom deck construction in Ottawa. Extend your living space outdoors with durable, quality-built decks.',
    metaTitle: 'Deck Builder Ottawa | Custom Deck Construction | Embaby Carpentry',
    metaDescription: 'Custom deck builder in Ottawa, Ontario. Wood and composite decks, railings, stairs. Built for Ottawa climate. Licensed. Free estimate.',
    img: '/images/service-4.webp',
    content: {
      intro:
        'Extend your living space outdoors with a custom deck from Embaby Carpentry. We design and build decks for Ottawa homeowners that fit your lot, lifestyle, and budget—using wood, composite, and other materials built to withstand the Ottawa climate.',
      highlights: [
        'Custom deck design and construction',
        'Composite and pressure-treated wood options',
        'Multi-level and wrap-around decks',
        'Stairs, railings, and built-in seating',
        'Covered decks and pergola integration',
        'Maintenance and repair work',
      ],
      body:
        'A well-built deck adds outdoor living space and value to your home. We handle everything from design and permits to construction and finishing, ensuring your deck is built to last in Ottawa’s four-season weather. Whether you want a simple ground-level patio or a multi-level entertaining space, we deliver quality craftsmanship you can count on.',
      cta:
        'Ready to enjoy your outdoor space? Contact us for a free estimate on your Ottawa deck project.',
      sections: [
        {
          h2: 'Custom Deck Construction in Ottawa',
          body:
            'Ottawa deck builders need to account for frost, snow load, and durable finishes. We build decks that are properly supported, well-drained, and finished with materials that hold up to Ontario weather.',
          subs: [
            {
              h3: 'Wood vs Composite Decks in Ottawa',
              body:
                'Pressure-treated wood is a cost-effective choice; composite decking offers low maintenance and long life. We help you choose the right option for your Ottawa deck and install it with care.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'fences',
    slug: 'fences',
    title: 'Fences',
    shortDesc: 'Quality fence installation in Ottawa. Privacy, boundary, and decorative fencing for your property.',
    metaTitle: 'Fence Installation Ottawa | Privacy & Decorative Fencing | Embaby Carpentry',
    metaDescription: 'Fence installation in Ottawa, Ontario. Privacy fences, gates, wood and vinyl. Professional installation. Free quote. Serving Ottawa and region.',
    img: '/images/service-6.webp',
    content: {
      intro:
        'Define your property and add privacy with a quality fence from Embaby Carpentry. We install privacy fences, boundary fencing, gates, and decorative options for Ottawa homeowners—matching your style and local requirements.',
      highlights: [
        'Privacy and boundary fencing',
        'Wood, vinyl, and composite options',
        'Gates and entry features',
        'Decorative and ornamental fencing',
        'Fence repair and replacement',
        'Post-and-rail installations',
      ],
      body:
        'A well-built fence provides privacy, security, and curb appeal. We design and install fences that match your property, Ottawa bylaws where applicable, and your aesthetic preferences. From classic wood privacy fences to modern vinyl or decorative styles, we deliver durable installations that stand up to Ottawa weather.',
      cta:
        'Need a new fence or gate? Get in touch for a free quote on your Ottawa fence installation.',
      sections: [
        {
          h2: 'Fence Installation and Repair in Ottawa',
          body:
            'We install new fences and repair or replace existing ones. Proper post depth and footings matter in Ottawa’s freeze-thaw cycle—we build fences that stay straight and secure for years.',
          subs: [
            {
              h3: 'Materials and Styles',
              body:
                'Choose from wood, vinyl, composite, or metal depending on your budget and look. We’ll outline the pros and cons for Ottawa conditions and install the option you prefer.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'sheds-gazebos-pergolas',
    slug: 'sheds-gazebos-pergolas',
    title: 'Sheds, Gazebos & Pergolas',
    shortDesc: 'Custom sheds, gazebos, and pergolas in Ottawa. Storage, shade, and outdoor structures tailored to your property.',
    metaTitle: 'Sheds, Gazebos & Pergolas Ottawa | Custom Outdoor Structures | Embaby Carpentry',
    metaDescription: 'Custom sheds, gazebos, and pergolas in Ottawa, Ontario. Storage sheds, backyard pergolas, gazebo construction. Built for Ottawa climate. Free quote.',
    img: '/images/service-5.webp',
    content: {
      intro:
        'Add function and style to your yard with custom sheds, gazebos, or pergolas from Embaby Carpentry. We design and build outdoor structures for Ottawa homeowners that fit your space and needs—whether for storage, shade, or outdoor entertaining.',
      highlights: [
        'Custom shed design and construction',
        'Garden, tool, and workshop sheds',
        'Gazebo design and installation',
        'Pergola and shade structures',
        'Doors, windows, shelving, and finishes',
        'Durable framing and roofing',
      ],
      body:
        'Sheds provide storage and workspace; gazebos and pergolas create inviting outdoor living areas. We build all three with quality materials and solid construction, tailored to your property and preferences. From a simple garden shed to an elegant backyard pergola, we deliver structures that enhance your Ottawa property and stand up to the local climate.',
      cta:
        'Ready to add a shed, gazebo, or pergola? Let’s discuss your vision and create a plan for your Ottawa property.',
      sections: [
        {
          h2: 'Custom Outdoor Structures in Ottawa',
          body:
            'Ottawa homeowners use sheds for tools and storage, and gazebos or pergolas for shade and gathering space. We build to your size and style, with durable framing and roofing suited to Ontario weather.',
          subs: [
            {
              h3: 'Sheds for Storage and Workspace',
              body:
                'From compact garden sheds to larger workshop-style buildings, we build sheds that last. Proper foundations and roofing protect your investment in Ottawa’s climate.',
            },
            {
              h3: 'Gazebos and Pergolas',
              body:
                'We design and build gazebos and pergolas that become the focal point of your yard. Whether you want full shade or an open structure for vines, we deliver craftsmanship that fits your Ottawa home.',
            },
          ],
        },
      ],
    },
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug)
}
