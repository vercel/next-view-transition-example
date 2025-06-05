import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";
import ScrollArrow from "../components/ScrollArrow";
import KaraokeContent from "./KaraokeContent";

export default async function KaraokePage() {
  const spotifyToken = (await cookies()).get("spotify_token")?.value;

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
          <div
            className={`flex-1 ${styles.viewTransitionWrapper} order-2 lg:order-1`}
          >
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-middle"]}`}
            >
              <ViewTransition name="karaoke-title">
                <h1 className="z-10 mb-6 text-4xl font-bold text-white">
                  Karaoke
                </h1>
              </ViewTransition>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  Karaoke is my ultimate form of self-expression and joy.
                  There's something magical about letting loose with a
                  microphone and sharing music with others.
                </p>
              </div>
            </div>
          </div>

          <ViewTransition name="karaoke-photo">
            <div className="relative order-1 flex-1 bg-[#E09E8E] px-8 pt-8 pb-0 lg:order-2">
              <div className="relative h-[100vh] w-full">
                <Image
                  src="/karaoke.png"
                  alt="Karaoke"
                  fill
                  className="object-contain"
                  sizes="33vw"
                  priority
                />
              </div>
            </div>
          </ViewTransition>

          <div
            className={`flex-1 ${styles.viewTransitionWrapper} order-3 lg:order-3`}
          >
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-middle"]}`}
            >
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  From classic rock anthems to modern pop hits, I love exploring
                  different genres and challenging myself with new songs. The
                  energy of a karaoke night, where everyone supports each other
                  regardless of skill level, is unmatched.
                </p>
                <p>
                  It's not just about singing – it's about creating memories,
                  building confidence, and connecting with people through the
                  universal language of music.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArrow />
      </div>
      <KaraokeContent spotifyToken={spotifyToken} />
    </>
  );
}
