import { PLACES } from '@/app/utils/constants'

import { default as PageClient } from './page-client'

export default async function Page(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params
  const place = PLACES.find((p) => p.slug === params.slug)!

  return <PageClient place={place} />
}

export async function generateStaticParams() {
  return PLACES.map((place) => ({
    params: { slug: place.slug },
  }))
}

export const dynamic = 'force-static'
