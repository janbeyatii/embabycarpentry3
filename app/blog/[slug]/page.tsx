import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogBySlug, getAllBlogSlugs, BLOG_POSTS } from '@/lib/blog-data'
import { SITE_URL, buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo'
import BlogPostContent from './BlogPostContent'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  const postUrl = `${SITE_URL}/blog/${slug}`
  const ogImage = { url: `${SITE_URL}${post.image}`, width: 1200, height: 630, alt: post.title }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedDate ?? post.date,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}${post.image}`],
    },
    alternates: { canonical: postUrl },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

  const articleSchema = buildArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    date: post.date,
    modifiedDate: post.modifiedDate,
    slug,
  })
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className="main-content blog-post-page">
        <article className="blog-post">
          <header className="blog-post__header">
            <div className="blog-post__image-wrap">
              <Image
                src={post.image}
                alt={`${post.title} - Embaby Carpentry Ottawa blog`}
                fill
                sizes="100vw"
                priority
              />
            </div>
            <div className="blog-post__header-content">
              <h1 className="blog-post__title">{post.title}</h1>
              <p className="blog-post__meta">
                {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.readTime}
              </p>
            </div>
          </header>

          <div className="blog-post__body">
            <BlogPostContent slug={slug} />
          </div>

          <footer className="blog-post__footer">
            <Link href="/contact" className="btn">
              Get a Free Quote
            </Link>
            <div className="blog-post__nav">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="blog-post__nav-link blog-post__nav-prev">
                  ← {prevPost.title}
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="blog-post__nav-link blog-post__nav-next">
                  {nextPost.title} →
                </Link>
              )}
            </div>
          </footer>
        </article>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
