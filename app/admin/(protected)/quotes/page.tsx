import Link from 'next/link'
import { getQuotes } from '@/lib/queries/quotes'

export default async function QuotesAdminPage() {
  const quotes = await getQuotes()

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)' }}>
          Quote requests
        </h1>
        <Link
          href="/admin/construction"
          style={{
            padding: '0.8rem 1.5rem',
            background: 'var(--black)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.4rem',
            border: 'var(--border)'
          }}
        >
          ← Construction
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'var(--black-light)',
          borderRadius: '1rem',
          border: 'var(--border)'
        }}>
          <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)' }}>
            No quote requests yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {quotes.map((quote) => (
            <div
              key={quote.id}
              style={{
                background: 'var(--black-light)',
                padding: '2rem',
                borderRadius: '1rem',
                border: 'var(--border)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {quote.customer_name}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                    <a href={`mailto:${quote.customer_email}`} style={{ color: 'var(--yellow)' }}>
                      {quote.customer_email}
                    </a>
                    {quote.customer_phone ? ` · ${quote.customer_phone}` : ''}
                  </p>
                  {quote.project_type && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Project: {quote.project_type}
                      {quote.budget_range ? ` · Budget: ${quote.budget_range}` : ''}
                      {quote.timeline ? ` · ${quote.timeline}` : ''}
                    </p>
                  )}
                  {quote.message && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.8rem' }}>
                      {quote.message}
                    </p>
                  )}
                </div>
                <div style={{ fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
                  {new Date(quote.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
