/**
 * Shared cache for portfolio preview API.
 * Start the fetch early (e.g. on homepage load) so data is ready when Projects section mounts.
 */

let cache: unknown[] | null = null
let promise: Promise<unknown[]> | null = null

export function getPortfolioPreview(count: number): Promise<unknown[]> {
  if (cache) return Promise.resolve(cache)
  if (promise) return promise
  promise = fetch(`/api/portfolio/preview?count=${count}`)
    .then((res) => res.json())
    .then((data) => {
      const arr = Array.isArray(data) ? data : []
      cache = arr
      return arr
    })
    .catch(() => [])
  return promise
}

/** Call this early to start loading in background. Idempotent. */
export function preloadPortfolioPreview(count = 3): void {
  getPortfolioPreview(count)
}
