/**
 * In-memory rate limiter for admin login.
 * Use per-instance; for multi-instance production consider Redis or Vercel KV.
 */

const windowMs = 15 * 60 * 1000 // 15 minutes
const maxAttempts = 5

const store = new Map<
  string,
  { count: number; resetAt: number }
>()

function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

export function checkLoginRateLimit(request: Request): { allowed: boolean; retryAfterMs?: number } {
  const id = getClientId(request)
  const now = Date.now()
  const entry = store.get(id)

  if (!entry) {
    store.set(id, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (now >= entry.resetAt) {
    store.set(id, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  entry.count += 1
  return { allowed: true }
}

/** Remove old entries periodically to avoid unbounded memory use */
function prune() {
  const now = Date.now()
  Array.from(store.entries()).forEach(([key, value]) => {
    if (now >= value.resetAt) store.delete(key)
  })
}
if (typeof setInterval !== 'undefined') {
  setInterval(prune, 60 * 1000)
}
