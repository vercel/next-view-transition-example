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
              <button onClick={onPlay} />
            </div>
            <div className="control">
              <span className="label">Pause</span>
              <button onClick={onPause} />
            </div>
            <div className="control">
              <span className="label">Stop</span>
              <button onClick={onStop} />
            </div>
          </div>
        </div>
        <div className="side back" />
        <div className="plate" />
        <div className="recordSupport" />
        <div className="box lid">
          <div className="side top" />
          <div className="side left" />
          <div className="side right" />
          <div className="side front" />
          <div className="side back" />
        </div>
      </div>
      {/* <div className="record" />
      <div className="needle" />
      <div className="controls" /> */}
    </div>
  );
}
