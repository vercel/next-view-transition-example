"use client";
import Image from "next/image";
import { useState } from "react";
import Pickup from "./components/pickup";
import songs from "./songs.json";
import { Song } from "./types";

interface KaraokeContentProps {
  spotifyToken: string | undefined;
  tooltipShown: boolean;
}

export default function KaraokeContent({
  spotifyToken,
  tooltipShown,
}: KaraokeContentProps) {
  const [activeSong, setActiveSong] = useState<Song>(songs[0]);

  return (
    <div className="min-h-screen bg-[#E09E8E]">
      <div className="flex items-center justify-center gap-0 py-12 lg:gap-4">
        {songs.map((song) => (
          <button
            onClick={() => setActiveSong(song)}
            className="-mx-10 lg:mx-0"
            key={song.name}
          >
            <Image
              src={song.songImage}
              alt={song.name}
              priority
              width={200}
              height={200}
              className="rounded-full bg-[repeating-radial-gradient(#000_0px,#222_5px)] object-contain p-10"
            />
          </button>
        ))}
      </div>
      <div className="flex min-h-[calc(100vh-200px-48px-48px)] flex-col items-center justify-around gap-4 lg:flex-row">
        <div className="flex w-1/2 flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold">{activeSong.name}</p>
          <p className="text-lg">{activeSong.artist}</p>
        </div>
        <div className="relative mt-20 flex w-1/2 items-center justify-center lg:my-0">
          <Pickup
            song={activeSong}
            spotifyToken={spotifyToken}
            tooltipShown={tooltipShown}
          />
        </div>
      </div>
    </div>
  );
}
