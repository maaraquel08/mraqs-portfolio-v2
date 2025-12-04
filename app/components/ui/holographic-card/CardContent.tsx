"use client";

import Image from "next/image";
import type { CardContentProps } from "./types";

export default function CardContent({
    topSection,
    middleSection,
    bottomSection,
    imageUrl,
    imageAlt = "Card image",
    className = "",
    mousePosition = { x: 0, y: 0 },
    isHovering = false,
    cardWidth = 400,
    cardHeight = 600,
}: CardContentProps) {
    const isExternalImage = imageUrl?.startsWith("http");

    // Calculate parallax offset for avatar (moves opposite to cursor for depth effect)
    const parallaxX = isHovering
        ? (mousePosition.x / cardWidth - 0.5) * -20
        : 0;
    const parallaxY = isHovering
        ? (mousePosition.y / cardHeight - 0.5) * -20
        : 0;

    // Calculate parallax offset for text (slightly different intensity for layered effect)
    const textParallaxX = isHovering
        ? (mousePosition.x / cardWidth - 0.5) * -15
        : 0;
    const textParallaxY = isHovering
        ? (mousePosition.y / cardHeight - 0.5) * -15
        : 0;

    return (
        <div
            className={`relative z-10 h-full flex flex-col justify-between p-8 text-white ${className}`}
        >
            {/* Top section with parallax effect */}
            {topSection && (
                <div
                    className="transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate(${textParallaxX}px, ${textParallaxY}px)`,
                    }}
                >
                    {topSection}
                </div>
            )}

            {/* Avatar - positioned at bottom right with parallax effect */}
            <div
                className="absolute bottom-0 right-0 w-full h-full transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                }}
            >
                <Image
                    src="/images/Avatar.png"
                    alt="Avatar"
                    fill
                    className="object-contain object-bottom-right"
                    priority
                />
            </div>

            {/* Bottom section */}
            {bottomSection && <div>{bottomSection}</div>}
        </div>
    );
}
