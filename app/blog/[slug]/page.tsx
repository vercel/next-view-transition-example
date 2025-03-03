import { POSTS } from '@/app/utils/constants'
import { default as PageClient } from './page-client'

export default async function Page(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const post = POSTS.find((item) => item.slug === slug)!
  
  return <PageClient post={post} />
}



export async function generateStaticParams() {
  return POSTS.map((post) => ({
    params: { slug: post.slug },
  }))
}

export const dynamic = 'force-static'
