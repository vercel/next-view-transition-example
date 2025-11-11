"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { type Place } from "@/app/utils/constants";

export default function Place({
  place,
  places,
}: {
  place: Place;
  places: Place[];
}) {
  return (
    <ViewTransition>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="min-h-screen flex items-center justify-center flex-col md:flex-row w-full px-0 md:px-8">
          <div className="relative w-full sm:w-auto group">
            <ViewTransition name="back-button">
              <Link
                href="/card"
                className="absolute top-4 left-4 text-gray-100 bg-opacity-50 py-1 rounded-full hover:bg-opacity-75 transition-colors z-10 filter drop-shadow-[2px_2px_6px_#666]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
            </ViewTransition>

            <ViewTransition name={`place-image-main`}>
              <div className="relative md:rounded-lg overflow-clip transition-all duration-300 ease-in-out cursor-pointer w-full y-full md:w-[70vw] h-[70vh]">
                <Image
                  loading="eager"
                  decoding="sync"
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover overflow-clip md:rounded-lg transition-all duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </ViewTransition>

            <ViewTransition name="place-name">
              <div className="absolute w-full h-full inset-0 md:rounded-lg overflow-clip transition-all duration-300 ease-out filter drop-shadow-[2px_2px_12px_#333]">
                <div className="absolute bottom-4 right-4 text-gray-100 bg-opacity-50 rounded-xl text-3xl drop-shadow-xs">
                  {place.name}
                </div>
              </div>
            </ViewTransition>
          </div>

          <ViewTransition name="right-side-bar">
            <div className="w-full my-8 p-2 md:w-auto md:ml-8 md:p-8">
              <h3 className="hidden sm:block text-xl font-medium mb-6">
                Spots
              </h3>
              <div className="space-y-4">
                {places.map((place) => (
                  <Link
                    key={place.id}
                    href={`/card/${place.slug}`}
                    className="flex items-center gap-4 p-2 transition-colors"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <ViewTransition name={`place-image-${place.slug}`}>
                        <Image
                          loading="eager"
                          decoding="sync"
                          src={place.image}
                          alt={place.name}
                          fill
                          className="object-cover transition-transform filter hover:scale-105 overflow-hidden rounded-lg flex-1"
                        />
                        {/* name label */}
                      </ViewTransition>
                    </div>
                    <div className="text-gray-700 bg-opacity-50 rounded-xl text-sm">
                      {place.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ViewTransition>
        </div>
      </div>
    </ViewTransition>
  );
}
