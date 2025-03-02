'use client'

import { use, unstable_ViewTransition as ViewTransition } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import transitionStyles from '../transition.module.css'
import { cx } from '@/app/utils/cx'

interface Author {
  name: string
  handle: string
  avatar: string
}

const authors: Author[] = [
  { name: 'Jiachi Liu', handle: '@huozhi', avatar: '/placeholder.svg' },
  { name: 'Jiwon Choi', handle: '@devjiwonchoi', avatar: '/placeholder.svg' },
  { name: 'Jude Gao', handle: '@gao_jude', avatar: '/placeholder.svg' },
  { name: 'Maia Teegarden', handle: '@padmaia', avatar: '/placeholder.svg' },
  { name: 'Pranathi Peri', handle: '@pranathiperii', avatar: '/placeholder.svg' },
  { name: 'Rauno Freiberg', handle: '@raunofreiberg', avatar: '/placeholder.svg' },
  { name: 'Sebastian Silbermann', handle: '@sebsilbermann', avatar: '/placeholder.svg' },
  { name: 'Zack Tanner', handle: '@zt1072', avatar: '/placeholder.svg' },
]

const features = [
  {
    title: 'Redesigned error UI and improved stack traces',
    description: 'A redesigned debugging experience',
  },
  {
    title: 'Streaming metadata',
    description: 'Async metadata will no longer block page rendering or client-side page transitions',
  },
  {
    title: 'Turbopack performance improvements',
    description: 'Faster compile times and reduced memory usage',
  },
  {
    title: 'React View Transitions (experimental)',
    description: "Experimental support for React's new View Transitions API",
  },
  {
    title: 'Node.js Middleware (experimental)',
    description: 'Experimental support for using the Node.js runtime in Middleware',
  },
]

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <ViewTransition name="blog">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          {/* back to blog */}
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to blog
          </Link>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <ViewTransition name={'date-' + slug}>
              <time className={cx('text-gray-600')}>Wednesday, February 26th 2025</time>
            </ViewTransition>
            <ViewTransition name={'title-' + slug}>
              <h1 className={cx('text-5xl font-bold tracking-tight')}>Next.js 15.2</h1>
            </ViewTransition>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-600">Posted by</h2>
            <div className="flex flex-wrap gap-4">
              {authors.map((author) => (
                <div key={author.handle} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100"></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span>{author.name}</span>
                    <span className="text-gray-600">{author.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ViewTransition name={'summary-' + slug}>
              <p className={cx('text-xl')}>
                Next.js 15.2 includes updates for debugging errors, metadata, Turbopack, and more:
              </p>
            </ViewTransition>

            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.title}>
                  <Link href="#" className="text-blue-500 hover:underline">
                    {feature.title}
                  </Link>
                  : {feature.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </ViewTransition>
  )
}
