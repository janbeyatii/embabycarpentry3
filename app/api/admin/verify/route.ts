import { NextRequest, NextResponse } from 'next/server'
import { verifySession, getSessionFromCookie } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie')
    const token = getSessionFromCookie(cookieHeader)

    if (!token) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      )
    }

    const session = await verifySession(token)

    if (!session || !session.isAuthenticated) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { isAuthenticated: true, expiresAt: session.expiresAt },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 401 }
    )
  }
}
