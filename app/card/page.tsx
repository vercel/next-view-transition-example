'use client'

import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { PLACES } from '../utils/constants'
import { cx } from '../utils/cx'

function LeftSideMenu({
  isArrowOpen,
  ...props
}: {
  isArrowOpen: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-1/2 bg-emerald-200 p-8 flex flex-col" {...props}>
      {/* sticker icon */}
      <div className={cx('flex items-center gap-2 text-gray-800')}>
        <ViewTransition name="sticker-icon">
          <Link href="/card/overview">
            <span className={cx('w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center')} />
          </Link>
        </ViewTransition>
        <span className="font-medium">Las Ciudades</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-6xl font-serif space-y-2">
          <div>
            Explore <span className="text-4xl font-serif">The cities.</span>
          </div>
        </h1>
      </div>

      {/* Go to home page */}
      <div className="flex justify-between items-center">
        <Link href="/" className="text-blue-gray-500 hover:underline">
          ← Back
        </Link>
      </div>
    </div>
  )
}

export default function Page() {
  const isArrowOpen = false

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <ViewTransition name="left-side-bar">
        <LeftSideMenu isArrowOpen={isArrowOpen} />
      </ViewTransition>

      {/* Right Section */}
      <ViewTransition name="right-side-bar">
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-medium mb-6">Spots</h2>
          <div className="space-y-4 flex gap-8 p-2 flex-wrap">
            {PLACES.map((place) => (
              <Link key={place.id} href={`/card/${place.slug}`} className=" hover:bg-gray-50 transition-colors">
                <div className="relative min-w-[300px] min-h-[300px] w-full sm:w-[48%] flex-shrink-0 overflow-clip rounded-lg">
                
                  <ViewTransition name={`place-image-${place.slug}`}>
                    <Image
                      loading='eager'
                      decoding='sync'
                      src={place.image || '/placeholder.svg'}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform hover:scale-110 overflow-clip rounded-lg"
                    />
                  </ViewTransition>
                  {/* name label */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] hover:transparent hover:backdrop-blur-none transition-all duration-150 flex items-center justify-center">
                    <ViewTransition name={`place-name-${place.slug}`}>
                      <div className="absolute bottom-4 right-4 text-gray-100 bg-opacity-50 rounded-xl text-3xl drop-shadow-xs">
                        {place.name}
                      </div>
                    </ViewTransition>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ViewTransition>
    </div>
  )
}
