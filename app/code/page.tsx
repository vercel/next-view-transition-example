"use client";

import ScrollArrow from "@/components/ScrollArrow";
import dynamic from "next/dynamic";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

const CodeClient = dynamic(() => import("./CodeClient"), { ssr: false });

export default function CodePage() {
  return (
    <>
      <div className="min-h-screen bg-[#64A2BA]">
        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-white/80"
        >
          ← Back
        </Link>
        <div className="flex flex-col lg:flex-row">
          <div className="relative order-2 min-h-screen flex-1 lg:order-1">
            <ViewTransition name="code-photo">
              <div
                className={`absolute inset-0 bg-[#64A2BA] bg-[url(/code.png)] bg-contain bg-position-[center_top_1rem] bg-no-repeat lg:bg-contain`}
              />
            </ViewTransition>
          </div>

          <div className="order-2 flex-2 lg:order-1">
            <div className="flex h-full flex-col justify-center p-12 backdrop-blur-sm">
              <ViewTransition name="code-title">
                <h1 className="mb-6 text-4xl font-bold text-white">Code</h1>
              </ViewTransition>
              <div className="open-right space-y-4 text-lg text-white/90">
                <h2 className="text-2xl font-bold">How I got into code</h2>
                <p>
                  Coding came into my life as a normal extension to my
                  curiosity. It all began when I tried to figure out how to set
                  up a private MMORPG server. After that, I stumbled into the
                  .tk boom and, at 17, launched my own site:
                  phpandhtmllearning.tk. Realistically, I was the one doing the
                  learning, not the teaching - but it got me hooked.
                </p>
                <p>
                  I was lucky enough to have a teacher who reignited my passion
                  for coding at a time I let it fade. Without her, there's a
                  good chance I'd be doing something entirely different today.
                </p>
                <p>
                  Now, coding is both how I earn a living and what I love doing.
                  I try to stay in the loop by watching tech YouTubers and
                  occasionally scrolling the tech side of Twitter (X).
                </p>
                <h2 className="text-2xl font-bold">About this website</h2>
                This site is my little masterpiece - a playground where I've
                learned and built a bunch of things I'd been meaning to explore:
                <ul className="list-disc ps-6">
                  <li>
                    The new{" "}
                    <Link
                      href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API"
                      target="_blank"
                      className="font-medium text-cyan-300 hover:underline"
                    >
                      View Transition API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/watch?v=NdftnCDwKaU"
                      target="_blank"
                      className="font-medium text-cyan-300 hover:underline"
                    >
                      3D CSS
                    </Link>
                    , especially on the karaoke page with the vinyl player
                    (fully built with css)
                  </li>
                  <li>Youtube API integration for the karaoke page</li>
                  <li>
                    Some light Blender modeling for the spinning laptops on the
                    code page
                  </li>
                  <li>
                    A full-on dive into TailwindCSS (finally understood what the
                    hype was about)
                  </li>
                  <li>
                    And a shift in mindset: thinking in the new Next.js App
                    Router paradigm
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ScrollArrow />
      </div>
      <CodeClient />
    </>
  );
}
