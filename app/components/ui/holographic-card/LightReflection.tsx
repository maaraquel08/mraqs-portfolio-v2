import type { MousePosition } from "./types";

interface LightReflectionProps {
  mousePosition: MousePosition;
  isHovering: boolean;
  cardWidth: number;
  cardHeight: number;
  opacity?: number;
}

export default function LightReflection({
  mousePosition,
  isHovering,
  cardWidth,
  cardHeight,
  opacity = 30,
}: LightReflectionProps) {
  const gradientX = (mousePosition.x / cardWidth) * 100;
  const gradientY = (mousePosition.y / cardHeight) * 100;

  return (
    <div
      className="absolute inset-0 z-[4]"
      style={{
        opacity: opacity / 100,
        background: `radial-gradient(
          ellipse at ${gradientX}% ${gradientY}%,
          rgba(255, 255, 255, 0.8) 0%,
          transparent 70%
        )`,
        transition: isHovering ? "none" : "background 0.3s ease",
      }}
    />
  );
}

