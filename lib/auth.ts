import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const WEAK_SECRET = 'your-secret-key-change-in-production'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim()
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'JWT_SECRET must be set in production and at least 32 characters. Generate one with: openssl rand -base64 32'
      )
    }
    return WEAK_SECRET
  }
  if (secret === WEAK_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must not be the default placeholder in production')
  }
  return secret
}

export interface AdminSession {
  isAuthenticated: boolean
  expiresAt: number
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(): Promise<string> {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const secret = getJwtSecret()

  const token = jwt.sign(
    { isAuthenticated: true, expiresAt },
    secret,
    { expiresIn: '24h' }
  )

  return token
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const secret = getJwtSecret()
    const decoded = jwt.verify(token, secret) as any
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null
    }

    return {
      isAuthenticated: true,
      expiresAt: (decoded.exp || 0) * 1000
    }
  } catch (error) {
    return null
  }
}

export function getSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(';').map(c => c.trim())
  const sessionCookie = cookies.find(c => c.startsWith('admin_session='))
  
  if (!sessionCookie) return null

  const value = sessionCookie.split('=').slice(1).join('=').trim()
  return value || null
}
