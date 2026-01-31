import Link from 'next/link'
import { getCarpentryPortfolio } from '@/lib/queries/carpentry-portfolio'
import { DeleteCarpentryButton } from './DeleteCarpentryButton'

export default async function CarpentryPortfolioPage() {
  const items = await getCarpentryPortfolio()

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: 'var(--text-primary)'
        }}>
          Carpentry Portfolio
        </h1>
        <Link
          href="/admin/portfolio/carpentry/create"
          className="btn"
        >
          Add New Project
        </Link>
      </div>

      {items.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'var(--black-light)',
          borderRadius: '1rem',
          border: 'var(--border)'
        }}>
          <p style={{
            fontSize: '1.8rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            No projects yet. Create your first project!
          </p>
          <Link href="/admin/portfolio/carpentry/create" className="btn">
            Add First Project
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))',
          gap: '2rem'
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--black-light)',
                padding: '2rem',
                borderRadius: '1rem',
                border: 'var(--border)'
              }}
            >
              <h3 style={{
                fontSize: '2rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '1.4rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem'
              }}>
                Category: {item.category}
              </p>
              {item.description && (
                <p style={{
                  fontSize: '1.3rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem'
                }}>
                  {item.description.substring(0, 100)}...
                </p>
              )}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <Link
                  href={`/admin/portfolio/carpentry/${item.id}/edit`}
                  style={{
                    padding: '0.8rem 1.5rem',
                    background: 'var(--yellow)',
                    color: 'var(--black)',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1.4rem',
                    fontWeight: '600'
                  }}
                >
                  Edit
                </Link>
                <DeleteCarpentryButton itemId={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
