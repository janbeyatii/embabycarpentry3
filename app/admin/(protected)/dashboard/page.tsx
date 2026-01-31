import Link from 'next/link'

export default function AdminDashboard() {
  const sections = [
    {
      title: 'Construction & Carpentry',
      description: 'Offers, carpentry portfolio, quote requests',
      href: '/admin/construction',
      color: 'var(--yellow)'
    },
    {
      title: 'Woodworking',
      description: 'Woodworking portfolio, customer inquiries',
      href: '/admin/woodworking',
      color: 'var(--yellow)'
    }
  ]

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard-section-link:hover {
          transform: translateY(-5px);
          box-shadow: var(--box-shadow-lg);
        }
      ` }} />
      <h1 style={{
        fontSize: '3rem',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem'
      }}>
        Admin dashboard
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: 'var(--text-secondary)',
        marginBottom: '3rem'
      }}>
        Choose a section to manage
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))',
        gap: '2rem'
      }}>
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="admin-dashboard-section-link"
            style={{
              background: 'var(--black-light)',
              padding: '2.5rem',
              borderRadius: '1rem',
              border: 'var(--border)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              display: 'block'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: section.color
            }}>
              →
            </div>
            <h2 style={{
              fontSize: '2.2rem',
              color: 'var(--text-primary)',
              marginBottom: '0.8rem',
              fontWeight: '700'
            }}>
              {section.title}
            </h2>
            <p style={{
              fontSize: '1.5rem',
              color: 'var(--text-secondary)'
            }}>
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
