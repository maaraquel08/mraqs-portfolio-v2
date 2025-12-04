"use client";

import Image from "next/image";

interface CardWatermarkProps {
    isHovering: boolean;
    opacity?: number;
}

export default function CardWatermark({
    isHovering,
    opacity = 100,
}: CardWatermarkProps) {
    return (
        <div
            className="watermark absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-2xl"
            style={{
                opacity: isHovering ? opacity / 100 : 0.4,
                transition: "opacity 0.3s ease",
            }}
        >
            {/* Base watermark SVG - always visible, shows white/default parts */}
            <div
                className="absolute inset-0 flex items-center justify-center z-0"
                style={{
                    opacity: isHovering ? 0.5 : 0.4,
                    transition: "opacity 0.3s ease",
                }}
            >
                <Image
                    src="/images/Watermark.svg"
                    alt="Watermark"
                    width={665}
                    height={925}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Refraction layer 1 - follows cursor */}
            <div className="refraction z-10" />

            {/* Refraction layer 2 - follows cursor with offset */}
            <div className="refraction z-10" />

            {/* Refraction layer 3 - green gradient */}
            <div className="refraction z-10" />
        </div>
    );
}
