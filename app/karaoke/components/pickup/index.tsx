import { useCallback, useState } from "react";
import "./style.scss";

export default function Pickup({
  onPlay,
  onPause,
  onStop,
}: {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}) {
  const [needleRotated, setNeedleRotated] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const onPlaying = useCallback(() => {
    setNeedleRotated(true);
    setSpinning(true);
    onPlay();
  }, [onPlay]);

  const onPaused = useCallback(() => {
    setNeedleLifted((prev) => !prev);
    if (needleLifted) {
      onPlay();
    } else {
      onPause();
    }
  }, [onPause, needleLifted]);

  const onStopped = useCallback(() => {
    setNeedleLifted(true);
    setTimeout(() => {
      setNeedleRotated(false);
    }, 1000);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
    setTimeout(() => {
      setNeedleLifted(false);
    }, 4000);
    onStop();
  }, [onStop]);

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
        <div className={`plate ${spinning ? "spinning" : ""}`} />
        <div className={`recordSupport ${spinning ? "spinning" : ""}`} />
        <div className="box lid">
          <div className="side top" />
          <div className="side left" />
          <div className="side right" />
          <div className="side front" />
          <div className="side back" />
        </div>
        <div
          className={`needle ${needleRotated ? "rotated" : ""} ${needleLifted ? "lifted" : ""}`}
        />
      </div>
      {/* <div className="record" />
      <div className="needle" />
      <div className="controls" /> */}
    </div>
  );
}
