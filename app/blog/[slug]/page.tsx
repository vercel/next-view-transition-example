'use client'

import { use, unstable_ViewTransition as ViewTransition } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cx } from '@/app/utils/cx'
import { Avatar } from '@/components/ui/avatar'
import { POSTS, AUTHORS } from '@/app/utils/constants'

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = POSTS.find((item) => item.slug === slug)!

  return (
    <ViewTransition>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to blog
          </Link>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <ViewTransition name={`date-${slug}`}>
              <time className={cx('text-gray-600')}>{post.date}</time>
            </ViewTransition>
            <ViewTransition name={'title-' + slug}>
              <h1 className={cx('text-5xl font-bold tracking-tight')}>{post.title}</h1>
            </ViewTransition>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-600">Posted by</h2>
            <ViewTransition name={`authors-${slug}`}>
              <div className="flex flex-wrap gap-4">
                {post?.authors.map((authorSlug, i) => {
                  const author = AUTHORS[authorSlug]
                  return (
                    <div key={authorSlug} className="flex items-center gap-2">
                      <ViewTransition key={i} name={`avatar-${slug}-${authorSlug}`}>
                        <Avatar className="h-8 w-8">
                          <img src={author.avatar} />
                        </Avatar>
                      </ViewTransition>
                      <div className="flex flex-col text-sm">
                        <span>{author.name}</span>
                        <span className="text-gray-600">{author.handle}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ViewTransition>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            <ul className="space-y-4">
              {post.features &&
                post.features.map((feature) => (
                  <li key={feature.title}>
                    <Link href="#" className="text-blue-500 hover:underline">
                      {feature.title}
                    </Link>
                    : {feature.description}
                  </li>
                ))}
            </ul>

            <div className="prose max-w-none mt-8 whitespace-pre-wrap line-he text-md/1.75">
              {post.content}
            </div>

            <>
              {'image' in post && post.image ? (
                <div className="mt-8">
                  {/* @ts-ignore */}
                  <img src={post.image} className="w-full" />
                </div>
              ) : null}
            </>
          </motion.div>
        </div>
      </article>
    </ViewTransition>
  )
}
