"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Song } from "@/app/types";
import { waitSeconds } from "@/app/utils/waitSeconds";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import "./style.scss";

export default function Pickup({
  spotifyToken,
  song,
}: {
  spotifyToken: string | undefined;
  song: Song;
}) {
  const [lidOpen, setLidOpen] = useState(false);
  const [needleRotated, setNeedleRotated] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showReverseRotation, setShowReverseRotation] = useState(false);
  const [playingSong, setPlayingSong] = useState(song);
  const [tooltipShown, setTooltipShown] = useLocalStorage(
    "click-tooltip-shown",
    false,
  );
  const { play, pauseToggle, stop, playerState } = useSpotify(
    song,
    spotifyToken,
  );

  const onPlaying = useCallback(async () => {
    setSpinning(true);
    if (!needleLifted) {
      setNeedleLifted(true);
    }
    await waitSeconds(1);
    setNeedleRotated(true);
    await waitSeconds(1);
    setNeedleLifted(false);
    await waitSeconds(1);
    play();
  }, [play]);

  const onPaused = useCallback(async () => {
    setNeedleLifted((prev) => !prev);
    // wait so the needle goes back down
    if (needleLifted) await waitSeconds(1);
    pauseToggle();
  }, [pauseToggle, needleLifted]);

  const onStopped = useCallback(async () => {
    if (!needleRotated) {
      stop();
      return;
    }
    setNeedleLifted(true);
    stop();
    await waitSeconds(1);
    setNeedleRotated(false);
    setShowReverseRotation(true);
    await waitSeconds(1);
    setNeedleLifted(false);
    setShowReverseRotation(false);
    await waitSeconds(1);
    setSpinning(false);
  }, [stop, needleRotated]);

  useEffect(() => {
    const onTrackChange = async () => {
      await onStopped();
      setPlayingSong(song);
    };
    onTrackChange();
  }, [song]);

  return (
    <div className="scene" id="pickup">
      <div className="box base">
        <div className="side top" />
        <div className="side bottom" />
        <div className="side left" />
        <div className="side right" />
        <div className="side front">
          <p className="absolute bottom-1 left-1 flex gap-1 text-[10px] text-white">
            Powered by
            <Image
              src="/spotify-logo.svg"
              className="inline h-[10px] w-[10px]"
              width={10}
              height={10}
              alt="Spotify"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <span className="text-[#1CD760]">Spotify</span>
          </p>
          <div className="controls">
            <div className="control">
              <span className="label">Play</span>
              <button
                onClick={onPlaying}
                disabled={playerState === "playing"}
              />
            </div>
            <div className="control">
              <span className="label">Pause</span>
              <button onClick={onPaused} />
            </div>
            <div className="control">
              <span className="label">Stop</span>
              <button
                onClick={onStopped}
                disabled={playerState === "stopped"}
              />
            </div>
          </div>
        </div>
        <div className="side back" />
        <div className={cn("plate", spinning ? "spinning" : "")} />
        <div className={cn("recordSupport", spinning ? "spinning" : "")} />
        <div className={cn("record", spinning ? "spinning" : "")}>
          <Image
            src={playingSong.songImage}
            alt={playingSong.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            key={playingSong.name}
            className="rounded-full bg-[repeating-radial-gradient(#000_0px,#222_5px)] object-contain p-10 lg:mx-0"
          />
        </div>
        <div
          className={cn("box lid", lidOpen ? "open" : undefined)}
          onClick={() => setLidOpen((prev) => !prev)}
        >
          <div className="side top" />
          <div className="side left" />
          <div className="side right" />
          <div className="side front">
            {!spotifyToken && (
              <div className="align-center absolute inset-0 flex justify-center">
                <Link
                  href="/api/spotify/auth/login"
                  onClick={(e) => e.stopPropagation()}
                  className="h-fit w-fit transform cursor-pointer rounded-full bg-[#1DB954] p-1 text-[8px] font-bold text-white transition-all hover:scale-105 hover:bg-[#1ed760]"
                >
                  Login with Spotify to play music
                </Link>
              </div>
            )}
            {!tooltipShown && spotifyToken && (
              <button
                onClick={() => setTooltipShown(true)}
                className="absolute inset-0 h-fit transform cursor-pointer self-center justify-self-center rounded-full bg-[#1DB954] p-1 text-[8px] font-bold text-white transition-all hover:scale-105 hover:bg-[#1ed760]"
              >
                Click here to open/close
              </button>
            )}
          </div>
          <div className="side back" />
        </div>
        <div
          className={cn(
            "needle",
            needleRotated ? "rotated" : undefined,
            needleLifted ? "lifted" : undefined,
            showReverseRotation ? "reverseRotation" : undefined,
          )}
        />
      </div>
    </div>
  );
}
