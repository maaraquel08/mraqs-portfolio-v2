"use client";

import { useMouseTracking } from "./useMouseTracking";
import CardBackground from "./CardBackground";
import HolographicOverlay from "./HolographicOverlay";
import AnimatedGradient from "./AnimatedGradient";
import LightReflection from "./LightReflection";
import CardShine from "./CardShine";
import CardBorder from "./CardBorder";
import CardContent from "./CardContent";
import CardWatermark from "./CardWatermark";
import CardSticker from "./CardSticker";
import type { HolographicCardProps, CardContentProps } from "./types";

interface ExtendedHolographicCardProps extends HolographicCardProps {
    content?: CardContentProps;
    backgroundGradient?: {
        from?: string;
        via?: string;
        to?: string;
    };
}

export default function HolographicCard({
    width = 400,
    height = 600,
    children,
    className = "",
    content,
    backgroundGradient,
}: ExtendedHolographicCardProps) {
    const { cardRef, mousePosition, isHovering } = useMouseTracking();

    const rotateX = isHovering ? mousePosition.y / 10 - 20 : 0;
    const rotateY = isHovering ? mousePosition.x / 10 - 20 : 0;

    return (
        <div
            ref={cardRef}
            className={`relative perspective-1000 ${className}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-300 ease-out"
                style={{
                    transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Layer 1: Base Background */}
                <CardBackground
                    gradientFrom={backgroundGradient?.from}
                    gradientVia={backgroundGradient?.via}
                    gradientTo={backgroundGradient?.to}
                />

                {/* Layer 2: Watermark - Always at the back */}
                <CardWatermark isHovering={isHovering} />

                {/* Layer 3: Holographic Overlay */}
                <HolographicOverlay
                    mousePosition={mousePosition}
                    isHovering={isHovering}
                    cardWidth={width}
                    cardHeight={height}
                />

                <AnimatedGradient />

                {/* Layer 5: Light Reflection */}
                <LightReflection
                    mousePosition={mousePosition}
                    isHovering={isHovering}
                    cardWidth={width}
                    cardHeight={height}
                />

                {/* Layer 6: Content */}
                {children ||
                    (content && (
                        <CardContent
                            {...content}
                            mousePosition={mousePosition}
                            isHovering={isHovering}
                            cardWidth={width}
                            cardHeight={height}
                        />
                    ))}

                {/* Layer 7: Shine Effect */}
                <CardShine
                    mousePosition={mousePosition}
                    isHovering={isHovering}
                    cardWidth={width}
                />

                {/* Layer 8: Border Glow */}
                <CardBorder />

                {/* Layer 9: Sticker - At the front */}
                <CardSticker />
            </div>
        </div>
    );
}
