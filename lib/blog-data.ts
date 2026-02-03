export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'kitchen-renovation-costs-ottawa-2026',
    title: 'Kitchen Renovation Costs in Ottawa: What to Expect in 2026',
    excerpt: 'Planning a kitchen renovation in Ottawa? Learn about average price ranges, cost factors, timelines, and how to budget properly for your project in 2026.',
    image: '/images/blog-1.webp',
    date: '2026-01-15',
    readTime: '6 min read',
  },
  {
    slug: 'choose-right-contractor-ottawa',
    title: 'How to Choose the Right Contractor in Ottawa for Home Renovations',
    excerpt: 'Essential tips for hiring a home renovation contractor in Ottawa. Learn about licensing, insurance, red flags, and questions to ask before you sign.',
    image: '/images/blog-2.webp',
    date: '2026-01-08',
    readTime: '7 min read',
  },
  {
    slug: 'custom-carpentry-vs-prefab-ottawa',
    title: 'Custom Carpentry vs Prefab Solutions: Which Is Better for Ottawa Homes?',
    excerpt: 'Compare custom carpentry and prefab options for durability, fit, resale value, and long-term cost—especially for older Ottawa homes.',
    image: '/images/blog-3.jpg',
    date: '2026-01-01',
    readTime: '6 min read',
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((b) => b.slug)
}
