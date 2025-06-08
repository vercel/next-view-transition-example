"use client";

import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";
import ScrollArrow from "../components/ScrollArrow";
import CocktailsView from "./CocktailsView";

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
          <div
            className={`flex-2 ${styles.viewTransitionWrapper} order-2 lg:order-1`}
          >
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-left"]}`}
            >
              <ViewTransition name="cocktails-title">
                <h1 className="mb-6 text-4xl font-bold text-white">
                  Cocktails
                </h1>
              </ViewTransition>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  Crafting cocktails is where science meets artistry. Each drink
                  is an opportunity to experiment with flavors, textures, and
                  presentations, creating unique experiences for every glass.
                </p>
                <p>
                  I love diving deep into the history of classic cocktails while
                  also pushing the boundaries with modern techniques and
                  unexpected ingredient combinations. The precision required in
                  measuring, the timing of preparation, and the final garnish -
                  every detail matters.
                </p>
                <p>
                  Whether I'm perfecting a traditional Manhattan or inventing
                  something new, the joy of sharing these creations with friends
                  and seeing their reactions makes every experiment worthwhile.
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
      <CocktailsView />
    </>
  );
}
