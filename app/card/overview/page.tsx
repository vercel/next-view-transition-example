'use client'

import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { PLACES } from '@/app/utils/constants'
import { DynamicBackground } from '@/components/ui/dynamic-background'

function LeftSideBar() {
  return (
    <div className="w-full m-h-screen md:w-[120px] bg-emerald-200 relative overflow-hidden">
      <div className='md:w-[120px] fixed top-0 left-0 right-0 bottom-0 p-4 pt-[80px] flex flex-col items-center overflow-hidden'>
        <DynamicBackground className='transform -translate-y-[50px] md:translate-y-[100px]' />
        <div className='flex items-center gap-2 text-gray-800 z-0 '>
          <div className='flex items-center gap-2 text-gray-800'>
            {/* sticker icon */}
            <ViewTransition name="sticker-icon">
              <Link href="/card">
                <span className='w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-150 hover:scale-120' />
              </Link>
            </ViewTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      {/* Left Section */}
      <ViewTransition name="left-side-bar">
        <LeftSideBar />
      </ViewTransition>

      {/* Right Section */}
      <ViewTransition name="right-side-bar">
        <div className="w-full p-2 md:w-4/5 md:p-8">
          <h2 className="text-xl font-medium mb-6">Spots</h2>
          <div className="space-y-4">
            {PLACES.map((place) => (
              <Link
                key={place.id}
                href={`/card/${place.slug}`}
                className="flex gap-4 p-2 transition-colors"
              >
                <ViewTransition name={`place-image-${place.slug}`}>
                  <div className="relative w-30 h-30 overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      loading="eager"
                      decoding="sync"
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform hover:scale-110"
                    />
                  </div>
                </ViewTransition>
                <div>
                  <h3 className="font-medium">{place.name}</h3>
                  <span className="text-gray-500 text-sm hover:text-gray-700">{place.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ViewTransition>
    </div>
  )
}
