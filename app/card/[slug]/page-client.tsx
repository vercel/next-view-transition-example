'use client'

import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { PLACES } from '@/app/utils/constants'

export default function Place({ place }: { place: typeof PLACES[0] }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative">
        <ViewTransition name="back-button">
          <Link
            href="/card"
            className="absolute top-4 left-4 text-gray-600 bg-opacity-50 py-1 rounded-full hover:bg-opacity-75 transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </ViewTransition>

        <ViewTransition name={`place-image-main`}>
          <div
            className={`relative overflow-clip rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${'w-[70vw] h-[70vh]'}`}
          >
            <Image
              loading='eager'
              decoding='sync'
              src={place.image}
              alt={place.name}
              fill
              className="object-cover overflow-clip rounded-lg transition-transform duration-300 ease-in-out"
            />
          </div>
        </ViewTransition>

        <ViewTransition name={`place-name`}>
          <div className="absolute bottom-4 right-4 text-gray-100 bg-opacity-50 rounded-xl text-3xl drop-shadow-xs">
            {place.name}
          </div>
        </ViewTransition>
      </div>

      <ViewTransition name="right-side-bar">
        <div className="w-auto ml-8 p-8">
          <h3 className="text-xl font-medium mb-6">Spots</h3>
          <div className="space-y-4">
            {PLACES.map((place) => (
              <Link
                key={place.id}
                href={`/card/${place.slug}`}
                className="flex items-center gap-4 p-2 transition-colors"
              >
                <div className="relative w-20 h-20">
                  <ViewTransition name={`place-image-${place.slug}`}>
                    <Image
                      loading='eager'
                      decoding='sync'
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform hover:scale-110 overflow-hidden rounded-lg"
                    />
                    {/* name label */}
                  </ViewTransition>
                </div>
                <ViewTransition name={`place-name-${place.slug}`}>
                  <div className="text-gray-700 bg-opacity-50 rounded-xl text-sm">
                    {place.name}
                  </div>
                </ViewTransition>
              </Link>
            ))}
          </div>
        </div>
      </ViewTransition>
    </div>
  )
}
