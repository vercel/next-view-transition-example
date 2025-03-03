import { unstable_ViewTransition as ViewTransition } from 'react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cx } from '@/app/utils/cx'
import { POSTS } from '../utils/constants'

export default async function NewsPage() {
  return (
    <ViewTransition>
      <div className="container mx-auto px-4 py-8 mt-8">
        <h1 className="text-4xl font-bold mb-8">The latest Next.js news</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((item, index) => (
            <Card key={index} className="relative border-gray-200">
              <CardContent className="pt-6">
                <div className="absolute top-6 right-6 flex -space-x-2">
                  {item.authors.map((author, i) => (
                    <ViewTransition key={i} name={`avatar-${item.slug}-${author}`}>
                      <Avatar className="border-2 border-white">
                        <img src={`/avatars/${author}.jpg`} />
                      </Avatar>
                    </ViewTransition>
                  ))}
                </div>

                <div className="space-y-4">
                  <ViewTransition name={`date-${item.slug}`}>
                    <p className={cx('text-gray-600')}>{item.date}</p>
                  </ViewTransition>
                  <ViewTransition name={`title-${item.slug}`}>
                    <Link href={`/blog/${item.slug}`}>
                      <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                    </Link>
                  </ViewTransition>
                  <ViewTransition name={`authors-${item.slug}`}>{null}</ViewTransition>
                  
                  <p className={'text-gray-600'}>{item.description}</p>

                  {/* actually displayed features */}
                  <div className="space-y-2">
                    {item.features?.map((feature) => (
                      <div key={feature.title}>
                        <Link href={`#`} className="text-blue-500 hover:underline">
                          {feature.title}
                        </Link>
                      </div>
                    ))}
                  </div>
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
