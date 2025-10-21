import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Cache Components enabled for Next.js 16 canary
  // Provides explicit opt-in caching with "use cache" directive
  // Replaces traditional route segment config (dynamic, revalidate, etc.)
  cacheComponents: true,
}

export default nextConfig
