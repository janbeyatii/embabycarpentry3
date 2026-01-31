import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession } from '@/lib/auth'
import { checkLoginRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const rate = checkLoginRateLimit(request)
    if (!rate.allowed) {
      const retrySec = rate.retryAfterMs ? Math.ceil(rate.retryAfterMs / 1000) : 900
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retrySec),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0'
          }
        }
      )
    }

    const { password } = await request.json()
    const trimmedPassword = typeof password === 'string' ? password.trim() : ''

    if (!trimmedPassword) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Normalize: env may contain \$ if user escaped for .env; Vercel may pass through as-is
    let adminPasswordHash = (process.env.ADMIN_PASSWORD_HASH || '').trim().replace(/\\\$/g, '$')

    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const validPrefix = adminPasswordHash.startsWith('$2a$') || adminPasswordHash.startsWith('$2b$')
    if (!validPrefix) {
      console.error('ADMIN_PASSWORD_HASH is invalid (missing $2a$ or $2b$ prefix). Run: node scripts/generate-env.js and use the escaped ADMIN_PASSWORD_HASH= line it prints in Vercel / .env')
      return NextResponse.json(
        { error: 'Invalid server config: ADMIN_PASSWORD_HASH. Run `node scripts/generate-env.js`, then in Vercel (and .env) paste the full ADMIN_PASSWORD_HASH= line it prints (with backslashes before each $).' },
        { status: 500 }
      )
    }

    const isValid = await verifyPassword(trimmedPassword, adminPasswordHash)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    const token = await createSession()

    const response = NextResponse.json(
      { success: true, message: 'Authentication successful' },
      { status: 200 }
    )

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  )

  // Clear session cookie with same path/options as set on login so it is removed everywhere
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })

  return response
}
