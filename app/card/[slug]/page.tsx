import { PLACES } from '@/app/utils/constants'

import { default as PageClient } from './page-client'

// ⚠️ CACHING STRATEGY DECISION:
// This is a place/card page - content is shared across users and changes rarely
// Using "use cache" to enable static prerendering and instant navigation
//
// MIGRATION: Removed 'export const dynamic = "force-static"' (incompatible with Cache Components)
// Replaced with "use cache" directive below
//
// CACHE REVALIDATION DECISION NEEDED:
// Uncomment ONE of the following strategies based on your update frequency:
//
// Option A: Long-term caching (recommended for place pages)
// import { cacheLife } from 'next/cache';
// cacheLife('days');  // Revalidates daily, expires after 1 week
//
// Option B: Tag-based revalidation (when you update place data)
// import { cacheTag } from 'next/cache';
// cacheTag('places', `place-${params.slug}`);  // Manual revalidation via updateTag/revalidateTag

export default async function Page(
  props: { params: Promise<{ slug: string }> }
) {
  'use cache'

  const params = await props.params
  const place = PLACES.find((p) => p.slug === params.slug)!

  // User should uncomment and configure ONE of the cacheLife/cacheTag options above

  return <PageClient place={place} places={PLACES} />
}

export async function generateStaticParams() {
  return PLACES.map((place) => ({
    params: { slug: place.slug },
  }))
}
