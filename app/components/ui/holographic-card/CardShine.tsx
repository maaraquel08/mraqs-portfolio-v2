import type { MousePosition } from "./types";

interface CardShineProps {
  mousePosition: MousePosition;
  isHovering: boolean;
  cardWidth: number;
  opacity?: number;
}

export default function CardShine({
  mousePosition,
  isHovering,
  cardWidth,
  opacity = 20,
}: CardShineProps) {
  const gradientX = (mousePosition.x / cardWidth) * 100;

  return (
    <div
      className="absolute inset-0 z-[11]"
      style={{
        opacity: opacity / 100,
        background: `linear-gradient(
          ${45 + (gradientX / 10)}deg,
          transparent 30%,
          rgba(255, 255, 255, 0.5) 50%,
          transparent 70%
        )`,
        transition: isHovering ? "none" : "background 0.3s ease",
      }}
    />
  );
}

