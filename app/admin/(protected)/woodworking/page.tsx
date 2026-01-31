import Link from 'next/link'
import { getWoodworkingPortfolio } from '@/lib/queries/woodworking-portfolio'
import { getInquiries } from '@/lib/queries/inquiries'

export default async function WoodworkingAdminPage() {
  const [products, inquiries] = await Promise.all([
    getWoodworkingPortfolio(),
    getInquiries()
  ])

  const stats = [
    { label: 'Woodworking Products', value: products.length, sub: 'Portfolio items', link: '/admin/portfolio/woodworking', color: 'var(--yellow)' },
    { label: 'Inquiries', value: inquiries.length, sub: 'Customer inquiries', link: '/admin/inquiries', color: 'var(--yellow)' },
  ]

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-section-link:hover { transform: translateY(-4px); box-shadow: var(--box-shadow-lg); }
      ` }} />
      <h1 style={{
        fontSize: '3rem',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem'
      }}>
        Woodworking
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: 'var(--text-secondary)',
        marginBottom: '3rem'
      }}>
        Manage woodworking portfolio and customer inquiries
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(22rem, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.link}
            className="admin-section-link"
            style={{
              background: 'var(--black-light)',
              padding: '2rem',
              borderRadius: '1rem',
              border: 'var(--border)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              display: 'block'
            }}
          >
            <div style={{ fontSize: '3rem', fontWeight: '800', color: stat.color, marginBottom: '0.5rem' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
              {stat.sub}
            </div>
          </Link>
        ))}
      </div>

      <div style={{
        background: 'var(--black-light)',
        padding: '2rem',
        borderRadius: '1rem',
        border: 'var(--border)'
      }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Quick actions
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            href="/admin/portfolio/woodworking/create"
            style={{
              padding: '1rem 1.5rem',
              background: 'var(--yellow)',
              color: 'var(--black)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}
          >
            Add woodworking product
          </Link>
        </div>
      </div>
    </div>
  )
}
