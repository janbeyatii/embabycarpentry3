import { getWoodworkingPortfolio } from '@/lib/queries/woodworking-portfolio'
import Link from 'next/link'
import Image from 'next/image'

export default async function WoodworkingPage() {
  const products = await getWoodworkingPortfolio()

  return (
    <>
      <section style={{
        padding: '8rem 10% 5rem',
        background: 'var(--black)',
        textAlign: 'center'
      }}>
        <h1 className="heading heading-center" style={{
          color: 'var(--text-primary)',
          marginBottom: '2rem'
        }}>
          Woodworking Products
        </h1>
        <p style={{
          fontSize: '1.8rem',
          color: 'var(--text-secondary)',
          maxWidth: '60rem',
          margin: '0 auto 4rem'
        }}>
          Custom woodworking products crafted with precision and care. 
          Browse our collection or request a custom build tailored to your needs.
        </p>
      </section>

      <section style={{
        padding: '5rem 10%',
        background: 'var(--black-light)'
      }}>
        {products.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ fontSize: '1.8rem' }}>No products available at the moment.</p>
            <p style={{ fontSize: '1.4rem', marginTop: '1rem' }}>
              Check back soon or request a custom build!
            </p>
            <Link
              href="/woodworking/inquire"
              className="btn"
              style={{
                marginTop: '2rem',
                display: 'inline-block'
              }}
            >
              Request Custom Build
            </Link>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  style={{
                    background: 'var(--black)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: 'var(--box-shadow)',
                    border: 'var(--border)',
                    transition: 'var(--transition)'
                  }}
                >
                  {product.images && product.images.length > 0 && (
                    <div style={{
                      height: '30rem',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '2rem',
                      color: 'var(--text-primary)',
                      marginBottom: '1rem'
                    }}>
                      {product.name}
                    </h3>
                    {product.description && (
                      <p style={{
                        fontSize: '1.4rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        lineHeight: '1.8'
                      }}>
                        {product.description}
                      </p>
                    )}
                    {product.dimensions && (
                      <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--yellow)',
                        marginBottom: '0.5rem'
                      }}>
                        Dimensions: {product.dimensions}
                      </p>
                    )}
                    {product.materials && (
                      <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem'
                      }}>
                        Materials: {product.materials}
                      </p>
                    )}
                    <Link
                      href={`/woodworking/inquire/${product.id}`}
                      className="btn"
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'block'
                      }}
                    >
                      Inquire About This Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '4rem',
              padding: '3rem',
              background: 'var(--black)',
              borderRadius: '1rem',
              border: 'var(--border)'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                Need Something Custom?
              </h2>
              <p style={{
                fontSize: '1.6rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                We specialize in custom woodworking projects tailored to your specific needs.
              </p>
              <Link
                href="/woodworking/inquire"
                className="btn btn-primary"
              >
                Request Custom Build
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  )
}
