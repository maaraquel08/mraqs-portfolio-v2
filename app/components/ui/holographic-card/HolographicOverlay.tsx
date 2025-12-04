import type { MousePosition } from "./types";

interface HolographicOverlayProps {
    mousePosition: MousePosition;
    isHovering: boolean;
    cardWidth: number;
    cardHeight: number;
    opacity?: number;
}

export default function HolographicOverlay({
    mousePosition,
    isHovering,
    cardWidth,
    cardHeight,
    opacity = 60,
}: HolographicOverlayProps) {
    const gradientX = (mousePosition.x / cardWidth) * 100;
    const gradientY = (mousePosition.y / cardHeight) * 100;

    return (
        <div
            className="absolute inset-0 z-[2] mix-blend-overlay"
            style={{
                opacity: opacity / 100,
                background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, 
          rgba(0, 255, 255, 0.6) 25%, 
          rgba(150, 0, 255, 0.8) 50%, 
          rgba(255, 200, 0, 0.6) 75%, 
          transparent 100%)`,
                transition: isHovering ? "none" : "background 0.3s ease",
            }}
        />
    );
}
