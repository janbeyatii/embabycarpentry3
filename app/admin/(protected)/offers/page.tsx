import Link from 'next/link'
import { getOffers } from '@/lib/queries/offers'
import { DeleteOfferButton } from './DeleteOfferButton'

export default async function OffersAdminPage() {
  const offers = await getOffers()

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
          Offers & Coupons
        </h1>
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
          Create offer
        </Link>
      </div>

      {offers.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'var(--black-light)',
          borderRadius: '1rem',
          border: 'var(--border)'
        }}>
          <p style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            No offers yet.
          </p>
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
            Create first offer
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              style={{
                background: 'var(--black-light)',
                padding: '2rem',
                borderRadius: '1rem',
                border: 'var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {offer.title}
                </h3>
                <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                  {offer.discount_type === 'percentage'
                    ? `${offer.discount_value}% off`
                    : `$${offer.discount_value} off`}
                  {offer.code ? ` · Code: ${offer.code}` : ''}
                  {!offer.is_active ? ' · Inactive' : ''}
                </p>
                {offer.description && (
                  <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {offer.description.substring(0, 120)}
                    {offer.description.length > 120 ? '...' : ''}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <Link
                  href={`/admin/offers/${offer.id}/edit`}
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
                <DeleteOfferButton offerId={offer.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
