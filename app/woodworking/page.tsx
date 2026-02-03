import { getWoodworkingPortfolio } from '@/lib/queries/woodworking-portfolio'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const SQUARE_WOODWORKING_URL = process.env.NEXT_PUBLIC_SQUARE_WOODWORKING_URL || ''

import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'Custom Woodworking Ottawa | Handcrafted Furniture & Carpentry | Embaby Carpentry',
  description:
    'Custom woodworking in Ottawa: handcrafted furniture, cutting boards, and custom builds. Browse our collection or request a custom piece. Ottawa, Ontario.',
  openGraph: {
    title: 'Custom Woodworking Ottawa | Embaby Carpentry',
    description: 'Handcrafted woodworking and custom furniture in Ottawa. Browse or request a custom build.',
    url: `${SITE_URL}/woodworking`,
  },
  alternates: { canonical: `${SITE_URL}/woodworking` },
}

export default async function WoodworkingPage() {
  const products = await getWoodworkingPortfolio()

  return (
    <>
      <Header />
      <div className="main-content woodworking-page">
        <section className="woodworking-hero">
          <h1 className="heading heading-center">Custom Woodworking in Ottawa</h1>
          <p className="woodworking-hero-text">
            Handcrafted woodworking and custom carpentry in Ottawa. Browse our collection or request a custom build tailored to your needs.
          </p>
        </section>

        <section className="woodworking-products">
          {products.length === 0 ? (
            <div className="woodworking-empty">
              <p className="woodworking-empty-text">No products available at the moment.</p>
              <p className="woodworking-empty-sub">Check back soon or request a custom build!</p>
              <Link href="/woodworking/inquire" className="btn woodworking-empty-btn">
                Request Custom Build
              </Link>
            </div>
          ) : (
            <>
              <div className="woodworking-grid">
                {products.map((product) => (
                  <div key={product.id} className="woodworking-product-card">
                    {product.images && product.images.length > 0 && (
                      <div className="woodworking-product-image">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="woodworking-product-body">
                      <h3 className="woodworking-product-title">{product.name}</h3>
                      {product.description && (
                        <p className="woodworking-product-desc">{product.description}</p>
                      )}
                      {product.dimensions && (
                        <p className="woodworking-product-dims">Dimensions: {product.dimensions}</p>
                      )}
                      {product.materials && (
                        <p className="woodworking-product-materials">Materials: {product.materials}</p>
                      )}
                      <Link
                        href={`/woodworking/inquire/${product.id}`}
                        className="btn woodworking-product-btn"
                      >
                        Inquire About This Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="woodworking-custom-cta">
                <h2 className="woodworking-custom-title">Need Something Custom?</h2>
                <p className="woodworking-custom-desc">
                  We specialize in custom woodworking projects tailored to your specific needs.
                </p>
                <Link href="/woodworking/inquire" className="btn btn-primary">
                  Request Custom Build
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="woodworking-booking">
          <div className="woodworking-booking-wrapper">
            {SQUARE_WOODWORKING_URL ? (
              <iframe
                className="woodworking-booking-embed"
                src={SQUARE_WOODWORKING_URL}
                allowFullScreen
                loading="lazy"
                title="Order woodworking products"
              />
            ) : (
              <p className="woodworking-booking-placeholder">
                Add <code>NEXT_PUBLIC_SQUARE_WOODWORKING_URL</code> to your <code>.env</code> file with your Square embed URL to display ordering or booking options here.
              </p>
            )}
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
