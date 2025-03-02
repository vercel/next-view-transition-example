import { unstable_ViewTransition as ViewTransition } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cx } from '../utils/cx'

export default function NewsPage() {
  const news = [
    {
      date: 'February 26th, 2025',
      title: 'Next.js 15.2',
      slug: 'nextjs-15-2',
      description: 'Next.js 15.2 includes updates for debugging errors, metadata, Turbopack, and more:',
      features: [
        { text: 'Redesigned error UI and improved stack traces', link: '#' },
        { text: 'Streaming metadata', link: '#' },
        { text: 'Turbopack performance improvements', link: '#' },
        { text: 'React View Transitions (experimental)', link: '#' },
        { text: 'Node.js Middleware (experimental)', link: '#' },
      ],
      avatars: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    },
    {
      date: 'January 3rd, 2025',
      title: 'Composable Caching with Next.js',
      slug: 'composable-caching-with-nextjs',
      description:
        "We're working on a simple and powerful caching model for Next.js. In a previous post, we talked about our journey with caching and how we've arrived at the 'use cache'",

      avatars: ['/placeholder.svg'],
    },
    {
      date: 'December 10th, 2024',
      title: 'Next.js 15.1',
      slug: 'nextjs-15-1',
      description:
        'Next.js 15.1 introduces core upgrades, new APIs, and improvements to the developer experience including:',
      features: [
        { text: 'React 19 (stable)', link: '#' },
        { text: 'Improved Error Debugging', link: '#' },
        { text: 'after (stable)', code: true, link: '#' },
        { text: 'forbidden / unauthorized (experimental)', code: true, link: '#' },
      ],
      avatars: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    },
  ]

  return (
    <ViewTransition name="blog">
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold mb-8">The latest Next.js news</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <Card key={index} className="relative border-gray-200">
              <CardContent className="pt-6">
                <div className="absolute top-6 right-6 flex -space-x-2">
                  {item.avatars.map((avatar, i) => (
                    <Avatar key={i} className="border-2 border-white">
                      <AvatarFallback className="bg-gray-200" />
                    </Avatar>
                  ))}
                </div>

                <div className="space-y-4">
                  <ViewTransition name={'date-' + item.slug}>
                    <p className={cx('text-gray-600')}>{item.date}</p>
                  </ViewTransition>
                  <Link href={`/blog/${item.slug}`}>
                    <ViewTransition name={'title-' + item.slug}>
                      <h2 className={cx('text-2xl font-semibold')}>{item.title}</h2>
                    </ViewTransition>
                  </Link>
                  <ViewTransition name={'summary-' + item.slug}>
                    <p className={cx('text-gray-600')}>{item.description}</p>
                  </ViewTransition>

                  {item.features && (
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i}>
                          <Link href={feature.link} className="text-blue-500 hover:underline flex items-center">
                            {'code' in feature && feature.code ? (
                              <code className="text-blue-500">{feature.text}</code>
                            ) : (
                              feature.text
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Link href={`/blog/${item.slug}`} className="w-full">
                  <Button className="w-full bg-gray-100 cursor-pointer">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </ViewTransition>
  )
}
