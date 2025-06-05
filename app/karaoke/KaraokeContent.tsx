"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, unstable_ViewTransition as ViewTransition } from "react";
import styles from "../animations.module.css";
import ScrollArrow from "../components/ScrollArrow";
import Pickup from "./components/pickup";
import useSpotify from "./hooks/useSpotify";
import songs from "./songs.json";
import { Song } from "./types";

export default function KaraokeContent({
  spotifyToken,
}: {
  spotifyToken?: string;
}) {
  const [activeSong, setActiveSong] = useState<Song>(songs[0]);
  const { play, pause, stop, isAuthenticated, login } = useSpotify(
    activeSong,
    spotifyToken,
  );

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
      <div className="min-h-screen bg-[#E09E8E]">
        <div className="flex items-center justify-center gap-0 py-12 lg:gap-4">
          {songs.map((song) => (
            <Image
              src={song.songImage}
              alt={song.name}
              width={200}
              height={200}
              key={song.name}
              className="-mx-10 rounded-full bg-[repeating-radial-gradient(#000_0px,#222_5px)] object-contain p-10 lg:mx-0"
              onClick={() => setActiveSong(song)}
            />
          ))}
        </div>
        <div className="flex min-h-[calc(100vh-200px-48px-48px)] flex-col items-center justify-around gap-4 lg:flex-row">
          <div className="flex w-1/2 flex-col items-center justify-center gap-4">
            <p className="text-2xl font-bold">{activeSong.name}</p>
            <p className="text-lg">{activeSong.artist}</p>
          </div>
          <div className="relative flex w-1/2 items-center justify-center">
            {!isAuthenticated && (
              <>
                <div className="absolute -top-20 right-10 -bottom-0 -left-10 z-10 flex items-center justify-center bg-black/30">
                  <button
                    onClick={login}
                    className="transform cursor-pointer rounded-full bg-[#1DB954] px-2 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[#1ed760]"
                  >
                    Login with Spotify to play music
                  </button>
                </div>
              </>
            )}
            <Pickup onPlay={play} onPause={pause} onStop={stop} />
          </div>
        </div>
      </div>
    </>
  );
}
