'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { preloadPortfolioPreview } from '@/lib/portfolio-preview-cache'

/**
 * Prefetches /our-work and starts loading portfolio preview data as soon as the user enters the site.
 * Runs only on the homepage to avoid unnecessary work on other pages.
 */
export default function PrefetchRoutes() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Prefetch Our Projects page whenever user is on the site (except when already there)
    if (pathname !== '/our-work') {
      router.prefetch('/our-work')
    }

    // On homepage: start loading the 3 preview projects immediately
    // (Projects component will use cached result when it mounts)
    if (pathname === '/') {
      preloadPortfolioPreview(3)
    }
  }, [pathname, router])

  return null
}
