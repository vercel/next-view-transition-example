import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";
import ScrollArrow from "../components/ScrollArrow";
import songs from "./songs.json";

export default function KaraokePage() {
  return (
    <>
      <div className="min-h-screen bg-[#E09E8E]">
        <Link
          href="/"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-white/80"
        >
          ← Back
        </Link>
        <div className="grid h-screen grid-cols-3">
          <div className={`${styles.viewTransitionWrapper}`}>
            <div
              className={`flex h-full flex-col justify-center p-12 backdrop-blur-sm ${styles["open-middle"]}`}
            >
              <ViewTransition name="karaoke-title">
                <h1 className="mb-6 text-4xl font-bold text-white">Karaoke</h1>
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
            <div className="relative flex h-full items-center justify-center bg-[#E09E8E] px-8 pt-8 pb-0">
              <div className="relative h-full w-full">
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

          <div className={`${styles.viewTransitionWrapper}`}>
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
      <div className="min-h-screen bg-[#E09E8E]">
        <div className="flex items-center justify-center gap-4 py-12">
          {songs.map((song) => (
            <Image
              src={song.songImage}
              alt={song.name}
              width={200}
              height={200}
              key={song.name}
              className="rounded-full border-40 border-black"
            />
          ))}
        </div>
      </div>
    </>
  );
}
