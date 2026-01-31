import Link from 'next/link'
import { getInquiries } from '@/lib/queries/inquiries'

export default async function InquiriesAdminPage() {
  const inquiries = await getInquiries()

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
          Woodworking inquiries
        </h1>
        <Link
          href="/admin/woodworking"
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
          ← Woodworking
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'var(--black-light)',
          borderRadius: '1rem',
          border: 'var(--border)'
        }}>
          <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)' }}>
            No inquiries yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
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
                    {inquiry.customer_name}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                    <a href={`mailto:${inquiry.customer_email}`} style={{ color: 'var(--yellow)' }}>
                      {inquiry.customer_email}
                    </a>
                    {inquiry.customer_phone ? ` · ${inquiry.customer_phone}` : ''}
                  </p>
                  {inquiry.product_name && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Product: {inquiry.product_name}
                    </p>
                  )}
                  {inquiry.is_custom_build && inquiry.custom_build_description && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Custom: {inquiry.custom_build_description}
                    </p>
                  )}
                  {inquiry.delivery_type && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
                      Delivery: {inquiry.delivery_type}
                      {inquiry.delivery_address ? ` · ${inquiry.delivery_address}` : ''}
                    </p>
                  )}
                  {inquiry.message && (
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.8rem' }}>
                      {inquiry.message}
                    </p>
                  )}
                </div>
                <div style={{ fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
