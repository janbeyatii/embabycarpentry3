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

    const adminPasswordHash = (process.env.ADMIN_PASSWORD_HASH || '').trim()

    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Next.js expands $ in .env — if hash was corrupted it won't start with $2b$
    if (!adminPasswordHash.startsWith('$2b$')) {
      console.error('ADMIN_PASSWORD_HASH is invalid (missing $2b$ prefix). In .env escape dollar signs: ADMIN_PASSWORD_HASH=\\$2b\\$10\\$...')
      return NextResponse.json(
        { error: 'Invalid server config: ADMIN_PASSWORD_HASH. In .env escape each $ with backslash, e.g. \\$2b\\$10\\$...' },
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
