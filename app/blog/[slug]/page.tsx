import { POSTS } from '@/app/utils/constants'
import { default as PageClient } from './page-client'

// ⚠️ CACHING STRATEGY DECISION:
// This is a blog post page - content is shared across users and changes rarely
// Using "use cache" to enable static prerendering and instant navigation
//
// MIGRATION: Removed 'export const dynamic = "force-static"' (incompatible with Cache Components)
// Replaced with "use cache" directive below
//
// CACHE REVALIDATION DECISION NEEDED:
// Uncomment ONE of the following strategies based on your update frequency:
//
// Option A: Long-term caching (recommended for blog posts)
// import { cacheLife } from 'next/cache';
// cacheLife('days');  // Revalidates daily, expires after 1 week
//
// Option B: Tag-based revalidation (when you publish new posts via CMS)
// import { cacheTag } from 'next/cache';
// cacheTag('blog-posts', `post-${slug}`);  // Manual revalidation via updateTag/revalidateTag

export default async function Page(
  props: { params: Promise<{ slug: string }> }
) {
  'use cache'

  const { slug } = await props.params
  const post = POSTS.find((item) => item.slug === slug)!

  // User should uncomment and configure ONE of the cacheLife/cacheTag options above

  return <PageClient post={post} />
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    params: { slug: post.slug },
  }))
}
