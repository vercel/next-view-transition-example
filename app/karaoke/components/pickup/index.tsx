"use client";

import { waitSeconds } from "@/app/utils/waitSeconds";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import "./style.scss";

export default function Pickup({
  onPlay,
  onPauseToggle,
  onStop,
}: {
  onPlay: () => void;
  onPauseToggle: () => void;
  onStop: () => void;
}) {
  const [needleRotated, setNeedleRotated] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showReverseRotation, setShowReverseRotation] = useState(false);

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
    onPlay();
  }, [onPlay]);

  const onPaused = useCallback(async () => {
    setNeedleLifted((prev) => !prev);
    // wait so the needle goes back down
    if (needleLifted) await waitSeconds(1);
    onPauseToggle();
  }, [onPauseToggle, needleLifted]);

  const onStopped = useCallback(async () => {
    setNeedleLifted(true);
    onStop();
    await waitSeconds(1);
    setNeedleRotated(false);
    setShowReverseRotation(true);
    await waitSeconds(1);
    setNeedleLifted(false);
    setShowReverseRotation(false);
    await waitSeconds(1);
    setSpinning(false);
  }, [onStop]);

  useEffect(() => {
    addEventListener("pickupStop", onStopped);

    return () => {
      removeEventListener("pickupStop", onStopped);
    };
  }, []);

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
        <div className="box lid">
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
      {/* <div className="record" /> */}
    </div>
  );
}
