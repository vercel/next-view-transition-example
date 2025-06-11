"use client";

import "./FloatingBall.css";

export default function FloatingBall({
  content,
  onClick,
  size,
}: {
  content: React.ReactNode;
  onClick: () => void;
  size?: number;
}) {
  return (
    <div
      className="ball"
      onClick={onClick}
      style={size ? { width: size, height: size } : {}}
    >
      <div className="ball-content">{content}</div>
    </div>
  );
}
