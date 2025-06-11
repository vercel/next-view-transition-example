"use client";

import { Song } from "@/app/types";
import useSpotify from "@/hooks/useSpotify";
import { cn, waitSeconds } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
  const [tooltipShown, setTooltipShown] = useState<boolean | null>(null);
  const { play, pauseToggle, stop, playerState, seek, player } = useSpotify(
    song,
    spotifyToken,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("click-tooltip-shown");
      setTooltipShown(item ? JSON.parse(item) : false);
    }
  }, []);

  const playAnimation = useCallback(async () => {
    setSpinning(true);
    if (!needleLifted) {
      setNeedleLifted(true);
    }
    await waitSeconds(1);
    setNeedleRotated(true);
    await waitSeconds(1);
    setNeedleLifted(false);
    await waitSeconds(1);
  }, []);

  const onPlaying = useCallback(async () => {
    await player?.activateElement();
    await playAnimation();
    play();
  }, [play]);

  const pauseAnimation = useCallback(async () => {
    setNeedleLifted((prev) => !prev);
    // wait so the needle goes back down
    if (needleLifted) await waitSeconds(1);
  }, []);

  const onPaused = useCallback(async () => {
    await pauseAnimation();
    pauseToggle();
  }, [pauseToggle, needleLifted]);

  const stopAnimation = useCallback(async () => {
    console.log("stop animation called");
    setNeedleLifted(true);
    await waitSeconds(1);
    setNeedleRotated(false);
    setShowReverseRotation(true);
    await waitSeconds(1);
    setNeedleLifted(false);
    setShowReverseRotation(false);
    await waitSeconds(1);
    setSpinning(false);
  }, []);

  const onStopped = useCallback(async () => {
    console.log("on stopped called");
    if (!needleRotated) {
      stop();
      return;
    }
    stop();
    await stopAnimation();
  }, [stop, needleRotated]);

  useEffect(() => {
    const onTrackChange = async () => {
      await onStopped();
      setPlayingSong(song);
    };
    onTrackChange();
  }, [song]);

  const onTooltipClick = useCallback(() => {
    setTooltipShown(true);
    localStorage.setItem("click-tooltip-shown", "true");
  }, []);

  const shouldShowTooltip =
    tooltipShown !== null && tooltipShown === false && spotifyToken;

  return (
    <div className="scene" id="pickup">
      <div className="box base">
        <div className="side top" />
        <div className="side bottom" />
        <div className="side left" />
        <div className="side right" />
        <div className="side front">
          <p className="absolute bottom-1 left-1 flex items-center gap-1 text-[10px] text-white">
            Powered by
            <Image
              src="/spotify-logo.svg"
              className="inline h-[10px] w-[10px] align-middle"
              width={10}
              height={10}
              alt="Spotify"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <span className="text-[#1CD760]" onClick={() => seek(199)}>
              Spotify
            </span>
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
            <div className="align-center absolute inset-0 flex justify-center">
              {!spotifyToken && (
                <Link
                  href="/api/spotify/auth/login"
                  onClick={(e) => e.stopPropagation()}
                  className="h-fit w-fit transform cursor-pointer rounded-full bg-[#1DB954] p-1 text-[8px] font-bold text-white transition-all hover:scale-105 hover:bg-[#1ed760]"
                >
                  Login with Spotify to play music
                </Link>
              )}
              {shouldShowTooltip && (
                <button
                  onClick={onTooltipClick}
                  className="h-fit w-fit transform cursor-pointer rounded-full bg-[#1DB954] p-1 text-[8px] font-bold text-white transition-all hover:scale-105 hover:bg-[#1ed760]"
                >
                  Click here to open/close
                </button>
              )}
            </div>
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
