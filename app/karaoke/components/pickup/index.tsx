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
      <div className="base">
        <div className="side top" />
        <div className="side bottom" />
        <div className="side left" />
        <div className="side right" />
        <div className="side front">
          <div className="controls">
            <button onClick={onPlay}>Play</button>
            <button onClick={onPause}>Pause</button>
            <button onClick={onStop}>Stop</button>
          </div>
        </div>
        <div className="side back" />
        <div className="plate" />
        <div className="recordSupport" />
        <div className="lid">
          <div className="side top" />
          <div className="side bottom" />
          <div className="side left" />
          <div className="side right" />
          <div className="side front" />
        </div>
      </div>
      {/* <div className="record" />
      <div className="needle" />
      <div className="controls" /> */}
    </div>
  );
}
