"use client";

import { useEffect, useState } from "react";
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Responsive dimensions - use CSS for mobile, fixed for desktop
    const cardWidth = width;
    const cardHeight = height;

    // Reduce 3D rotation on mobile for better performance and UX
    const rotateX = isMobile || !isHovering ? 0 : mousePosition.y / 10 - 20;
    const rotateY = isMobile || !isHovering ? 0 : mousePosition.x / 10 - 20;

    return (
        <div
            ref={cardRef}
            className={`relative ${isMobile ? "" : "perspective-1000"} ${className} w-full max-w-full md:w-auto`}
            style={{
                width: isMobile ? "calc(100% - 2rem)" : `${cardWidth}px`,
                maxWidth: isMobile ? "100%" : `${cardWidth}px`,
                height: isMobile ? "auto" : `${cardHeight}px`,
                aspectRatio: isMobile ? `${width} / ${height}` : "auto",
                transformStyle: "preserve-3d",
                margin: isMobile ? "0 auto" : "0",
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
                {!isMobile && (
                    <HolographicOverlay
                        mousePosition={mousePosition}
                        isHovering={isHovering}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                    />
                )}

                {!isMobile && <AnimatedGradient />}

                {/* Layer 5: Light Reflection */}
                {!isMobile && (
                    <LightReflection
                        mousePosition={mousePosition}
                        isHovering={isHovering}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                    />
                )}

                {/* Layer 6: Content */}
                {children ||
                    (content && (
                        <CardContent
                            {...content}
                            mousePosition={mousePosition}
                            isHovering={isMobile ? false : isHovering}
                            cardWidth={cardWidth}
                            cardHeight={cardHeight}
                            isMobile={isMobile}
                        />
                    ))}

                {/* Layer 7: Shine Effect */}
                {!isMobile && (
                    <CardShine
                        mousePosition={mousePosition}
                        isHovering={isHovering}
                        cardWidth={cardWidth}
                    />
                )}

                {/* Layer 8: Border Glow */}
                <CardBorder />

                {/* Layer 9: Sticker - At the front */}
                <CardSticker isMobile={isMobile} />
            </div>
        </div>
    );
}
