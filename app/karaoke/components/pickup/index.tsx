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
        <div className="side front" />
        <div className="side back" />
      </div>
      {/* <div className="plate" />
      <div className="record" />
      <div className="needle" />
      <div className="controls" /> */}
    </div>
  );
}
