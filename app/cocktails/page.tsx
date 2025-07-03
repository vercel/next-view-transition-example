"use client";

import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import ScrollArrow from "@/components/ScrollArrow";
import CocktailsClient from "./CocktailsClient";

export default function CocktailsPage() {
  return (
    <>
      <div className="min-h-screen bg-[#556D43]">
        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-white/80"
        >
          ← Back
        </Link>
        <div className="flex flex-col lg:flex-row">
          <div className="order-2 flex-2 lg:order-1">
            <div className="flex h-full flex-col justify-center p-12 backdrop-blur-sm">
              <ViewTransition name="cocktails-title">
                <h1 className="mb-6 font-bold text-4xl text-white">
                  Cocktails
                </h1>
              </ViewTransition>
              <div className="open-left space-y-4 text-lg text-white/90">
                <p>
                  I got into cocktails in my late 20s. It all started during a
                  night out in Canada, when a friend ordered an Old Fashioned. I
                  had no idea what it was, but I ordered one too - and instantly
                  got hooked. When I got back home, I tried making one... then
                  made another... and another.
                </p>
                <p>
                  It began with a basic bottle of whiskey, but you know how
                  these things go - one thing led to another, and now I've got
                  over 20 different spirits. Add in syrups, a shaker, strainer,
                  crushed ice bag, wooden mallet - yeah, it escalated quickly.
                </p>
                <p>
                  I love exploring new flavors, experimenting with techniques,
                  and chasing that perfect balance between boozy, sweet, and
                  bitter.
                </p>
              </div>
            </div>
          </div>

          <div className="relative order-1 min-h-screen flex-1 lg:order-2">
            <ViewTransition name="cocktails-photo">
              <div
                className={`absolute inset-0 bg-[#556D43] bg-[url(/cocktails.png)] bg-contain bg-position-[center_top_1rem] bg-no-repeat lg:bg-contain`}
              />
            </ViewTransition>
          </div>
        </div>
        <ScrollArrow />
      </div>
      <CocktailsClient />
    </>
  );
}
