"use client";

import { waitSeconds } from "@/app/utils/waitSeconds";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { Song } from "../../types";
import "./style.scss";

export default function Pickup({
  spotifyToken,
  song,
}: {
  spotifyToken: string;
  song: Song;
}) {
  const [needleRotated, setNeedleRotated] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showReverseRotation, setShowReverseRotation] = useState(false);
  const [playingSong, setPlayingSong] = useState(song);
  const { play, pauseToggle, stop, login } = useSpotify(song, spotifyToken);

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
    <div className="scene">
      <div className="box base">
        <div className="side top" />
        <div className="side bottom" />
        <div className="side left" />
        <div className="side right" />
        <div className="side front">
          <div className="controls">
            <div className="control">
              <span className="label">Play</span>
              <button onClick={onPlaying} />
            </div>
            <div className="control">
              <span className="label">Pause</span>
              <button onClick={onPaused} />
            </div>
            <div className="control">
              <span className="label">Stop</span>
              <button onClick={onStopped} />
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
        <div className="box lid open">
          <div className="side top" />
          <div className="side left" />
          <div className="side right" />
          <div className="side front" />
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
