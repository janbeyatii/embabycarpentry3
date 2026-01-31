import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifySession, getSessionFromCookie } from '@/lib/auth'
import { cookies } from 'next/headers'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()
  const token = getSessionFromCookie(cookieHeader)

  if (!token) {
    redirect('/admin/login')
  }

  const session = await verifySession(token)

  if (!session || !session.isAuthenticated) {
    redirect('/admin/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--black)',
      color: 'var(--text-primary)'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-nav-link:hover { background: var(--black-light) !important; }
        .admin-nav-logout-btn:hover { transform: translateY(-2px); box-shadow: var(--box-shadow); }
      ` }} />
      <nav style={{
        background: 'var(--black-light)',
        padding: '1.5rem 2rem',
        borderBottom: 'var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Admin
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/admin/dashboard"
            className="admin-nav-link"
            style={{
              padding: '0.8rem 1.5rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              border: 'var(--border)',
              fontSize: '1.4rem',
              transition: 'var(--transition)'
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/construction"
            className="admin-nav-link"
            style={{
              padding: '0.8rem 1.5rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              border: 'var(--border)',
              fontSize: '1.4rem',
              transition: 'var(--transition)'
            }}
          >
            Construction
          </Link>
          <Link
            href="/admin/woodworking"
            className="admin-nav-link"
            style={{
              padding: '0.8rem 1.5rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              border: 'var(--border)',
              fontSize: '1.4rem',
              transition: 'var(--transition)'
            }}
          >
            Woodworking
          </Link>
          <a
            href="/"
            className="admin-nav-link"
            style={{
              padding: '0.8rem 1.5rem',
              background: 'var(--black)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              border: 'var(--border)',
              fontSize: '1.4rem',
              transition: 'var(--transition)'
            }}
          >
            View Site
          </a>
          <form action="/api/admin/auth" method="DELETE">
            <button
              type="submit"
              className="admin-nav-logout-btn"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'var(--yellow)',
                color: 'var(--black)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.4rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      <div style={{ padding: '2rem' }}>
        {children}
      </div>
    </div>
  )
}
