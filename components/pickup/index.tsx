"use client";

import { Song } from "@/app/types";
import useYoutube from "@/hooks/useYoutube";
import { cn, waitSeconds } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import "./style.scss";

export default function Pickup({ song }: { song: Song }) {
  const [lidOpen, setLidOpen] = useState(false);
  const [needleRotated, setNeedleRotated] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showReverseRotation, setShowReverseRotation] = useState(false);
  const [playingSong, setPlayingSong] = useState(song);
  const [tooltipShown, setTooltipShown] = useState<boolean | null>(null);
  const {
    playerReady,
    play,
    stop,
    mute,
    muteToggle,
    pauseToggle,
    playerState,
    iframeRef,
    autoplayBlocked,
    setAutoplayBlocked,
  } = useYoutube(song.youtubeId);

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

  const onPlaying = async () => {
    await playAnimation();
    play();
  };

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

  const shouldShowTooltip = tooltipShown !== null && tooltipShown === false;

  const onAutoplayButtonClick = useCallback(() => {
    setAutoplayBlocked(false);
    play();
  }, []);

  return (
    <>
      {autoplayBlocked && (
        <div className="absolute top-0 -right-24 bottom-10 -left-24 z-10 flex flex-col items-center justify-center bg-black/50">
          <p className="text-center text-sm text-white">Autoplay blocked</p>
          <button
            onClick={onAutoplayButtonClick}
            className="mt-2 h-fit w-fit transform cursor-pointer rounded-full bg-[#F00] p-1 text-sm font-bold text-white transition-all hover:scale-105"
          >
            Try again
          </button>
        </div>
      )}
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
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                className="inline h-[10px] w-[10px] align-middle"
                width={10}
                height={10}
                alt="Youtube"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              Youtube
            </p>
            <div className={cn("controls", !playerReady && "disabled")}>
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
                {shouldShowTooltip && (
                  <button
                    onClick={onTooltipClick}
                    className="h-fit w-fit transform cursor-pointer rounded-full bg-[#F00] p-1 text-[8px] font-bold text-white transition-all hover:scale-105"
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
        <div ref={iframeRef} style={{ display: "none" }} />
      </div>
    </>
  );
}
