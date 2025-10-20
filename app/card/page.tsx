'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { PLACES } from '../utils/constants'
import { DynamicBackground } from '@/components/ui/dynamic-background'

function LeftSideMenu() {
  return (
    <div className="w-full m-h-screen md:w-1/2 bg-emerald-200 overflow-hidden relative">
      <div className="md:fixed top-0 left-0 bottom-0 p-8 flex flex-col">
        <DynamicBackground />

        <div className="my-4 z-10">
          <ViewTransition name="experimental-label">
            <b className="text-gray-700 inline-block">{`<ViewTransition>`}</b>
          </ViewTransition>
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="text-blue-gray-500 hover:underline">
              ← Back
            </Link>
          </div>
        </div>
        

        {/* sticker icon */}
        <div className="flex items-center gap-2 text-gray-800 mb-4 z-10">
          <ViewTransition name="sticker-icon">
            <Link href="/card/overview">
              <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-150 hover:scale-120" />
            </Link>
          </ViewTransition>
          <span className="font-medium">Las Ciudades</span>
        </div>

        <div className="flex-1 flex flex-col justify-center z-10">
          <h1 className="text-6xl font-serif space-y-2">
            <div>
              Explore <span className="text-4xl font-serif block md:inline-block">The cities.</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    // make this locate on top of the page when it's on mobile
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Left Section */}
      <ViewTransition name="left-side-bar">
        <LeftSideMenu />
      </ViewTransition>

      {/* Right Section */}
      <ViewTransition name="right-side-bar">
        <div className="w-full md:w-1/2 p-2 md:p-8">
          <h2 className="text-xl font-medium px-2 text-gray-700 mt-4">Spots</h2>
          <div className="space-y-4 flex gap-8 p-2 flex-wrap">
            {PLACES.map((place) => (
              <Link
                key={place.id}
                href={`/card/${place.slug}`}
                className="hover:bg-gray-50 transition-colors w-full md:w-[300px] h-[300px] items-stretch"
              >
                <div className="relative w-full h-full flex-shrink-0 overflow-clip rounded-lg group">
                  <ViewTransition name={`place-image-${place.slug}`}>
                    <Image
                      loading="eager"
                      decoding="sync"
                      src={place.image || '/placeholder.svg'}
                      alt={place.name}
                      fill
                      className="object-cover flex-1 transition-transform  overflow-clip rounded-lg group-hover:scale-110"
                    />
                  </ViewTransition>
                  {/* name label */}
                  <ViewTransition name={`place-name-${place.slug}`}>
                    <div className="absolute bottom-4 right-4 text-gray-100 bg-opacity-50 rounded-xl text-3xl filter [text-shadow:0px_0px_8px_#111]">
                      {place.name}
                    </div>
                  </ViewTransition>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ViewTransition>
    </div>
  )
}
