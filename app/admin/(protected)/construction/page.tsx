import Link from 'next/link'
import { getOffers } from '@/lib/queries/offers'
import { getCarpentryPortfolio } from '@/lib/queries/carpentry-portfolio'
import { getQuotes } from '@/lib/queries/quotes'

export default async function ConstructionAdminPage() {
  const [offers, carpentryItems, quotes] = await Promise.all([
    getOffers(),
    getCarpentryPortfolio(),
    getQuotes()
  ])

  const stats = [
    { label: 'Offers & Coupons', value: offers.length, sub: `${offers.filter(o => o.is_active).length} active`, link: '/admin/offers', color: 'var(--yellow)' },
    { label: 'Carpentry Portfolio', value: carpentryItems.length, sub: 'Projects', link: '/admin/portfolio/carpentry', color: 'var(--yellow)' },
    { label: 'Quote Requests', value: quotes.length, sub: 'Construction quotes', link: '/admin/quotes', color: 'var(--yellow)' },
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
        Construction & Carpentry
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: 'var(--text-secondary)',
        marginBottom: '3rem'
      }}>
        Manage offers, carpentry portfolio, and quote requests
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
            href="/admin/offers/create"
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
            Create offer / coupon
          </Link>
          <Link
            href="/admin/portfolio/carpentry/create"
            style={{
              padding: '1rem 1.5rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              border: 'var(--border)'
            }}
          >
            Add carpentry project
          </Link>
        </div>
      </div>
    </div>
  )
}
