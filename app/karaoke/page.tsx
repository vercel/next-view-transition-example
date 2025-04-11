import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";

export default function KaraokePage() {
  return (
    <div className="min-h-screen bg-[#E09E8E]">
      <Link
        href="/life"
        className="absolute top-8 left-8 text-white hover:text-white/80 flex items-center gap-2 z-10"
      >
        ← Back
      </Link>
      <div className="grid grid-cols-3 h-screen">
        {/* Left Description */}
        <ViewTransition name="karaoke-description">
          <div className={`${styles.viewTransitionWrapper}`}>
            <div
              className={`backdrop-blur-sm p-12 flex flex-col justify-center h-full ${styles["open-middle"]}`}
            >
              <ViewTransition name="karaoke-title">
                <h1 className="text-4xl font-bold mb-6 text-white">Karaoke</h1>
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
        </ViewTransition>

        {/* Photo Section */}
        <ViewTransition name="karaoke-photo">
          <div className="relative h-full bg-[#E09E8E] flex items-center justify-center pb-0 pt-8 px-8">
            <div className="relative w-full h-full">
              <Image
                src="/life/karaoke.png"
                alt="Karaoke"
                fill
                className="object-contain"
                sizes="33vw"
                priority
              />
            </div>
          </div>
        </ViewTransition>

        {/* Right Description */}
        <ViewTransition name="karaoke-description-right">
          <div className={`${styles.viewTransitionWrapper}`}>
            <div
              className={`backdrop-blur-sm p-12 flex flex-col justify-center h-full ${styles["open-middle"]}`}
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
        </ViewTransition>
      </div>
    </div>
  );
}
