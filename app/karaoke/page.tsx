import ScrollArrow from "@/components/ScrollArrow";
import { cookies as nextCookies } from "next/headers";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import KaraokeClient from "./KaraokeClient";

export default async function KaraokePage() {
  const cookies = await nextCookies();
  const spotifyToken = cookies.get("spotify_token")?.value;

  return (
    <>
      <div className="min-h-screen bg-[#E09E8E]">
        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-white/80"
        >
          ← Back
        </Link>
        <div className="flex flex-col lg:flex-row">
          <div className="order-2 flex-1 lg:order-1">
            <div className="flex h-full flex-col justify-center p-12 backdrop-blur-sm">
              <ViewTransition name="karaoke-title">
                <h1 className={`z-10 mb-6 text-4xl font-bold text-white`}>
                  Karaoke
                </h1>
              </ViewTransition>
              <div className="open-left space-y-4 text-lg text-white/90">
                <p>
                  Karaoke is my ultimate form of self-expression and joy.
                  There's something magical about letting loose with a
                  microphone and sharing music with others.
                </p>
              </div>
            </div>
          </div>

          <div className="relative order-1 min-h-screen flex-1 lg:order-2">
            <ViewTransition name="karaoke-photo">
              <div
                className={`absolute inset-0 bg-[#E09E8E] bg-[url(/karaoke.png)] bg-contain bg-position-[center_top_1rem] bg-no-repeat lg:bg-contain`}
              />
            </ViewTransition>
          </div>

          <div className="order-3 flex-1 lg:order-3">
            <div className="open-right flex h-full flex-col justify-center p-12 backdrop-blur-sm">
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  From classic rock anthems to modern pop hits, I love exploring
                  different genres and challenging myself with new songs. The
                  energy of a karaoke night, where everyone supports each other
                  regardless of skill level, is unmatched.
                </p>
                <p>
                  It's not just about singing - it's about creating memories,
                  building confidence, and connecting with people through the
                  universal language of music.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArrow />
      </div>
      <KaraokeClient spotifyToken={spotifyToken} />
    </>
  );
}
