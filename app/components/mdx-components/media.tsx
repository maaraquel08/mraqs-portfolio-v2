"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

interface ImageBlockProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    caption?: string;
    containerHeight?: string;
}

interface VideoBlockProps {
    src: string;
    title?: string;
    caption?: string;
}

export function ImageBlock({
    src,
    alt,
    width = 1200,
    height = 630,
    caption,
    containerHeight = "500px",
}: ImageBlockProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(true);
    };

    const handleClose = () => {
        setIsZoomed(false);
    };

    // Handle height value with or without units
    const getHeightValue = (height: string) => {
        if (typeof height === "number" || !isNaN(Number(height))) {
            return `${height}px`;
        }
        return height;
    };

    // Calculate aspect ratio for responsive sizing
    const aspectRatio = (height / width) * 100;

    return (
        <>
            <figure className="my-4 md:my-8 w-full">
                <div
                    className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02] w-full bg-neutral-50 dark:bg-neutral-900"
                    onClick={handleImageClick}
                >
                    <div
                        className="relative w-full"
                        style={{
                            height: `min(${getHeightValue(
                                containerHeight
                            )}, calc(100vw * ${aspectRatio / 100}))`,
                            maxHeight: getHeightValue(containerHeight),
                        }}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            priority
                        />
                    </div>
                </div>
                {caption && (
                    <figcaption className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
                        {caption}
                    </figcaption>
                )}
            </figure>

            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4"
                    onClick={handleClose}
                >
                    <div className="relative w-full max-w-7xl mx-auto">
                        <button
                            onClick={handleClose}
                            className="absolute -top-8 md:-top-12 right-0 p-2 text-white hover:text-neutral-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="relative w-full h-[80vh] md:h-[90vh]">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export function VideoBlock({ src, title, caption }: VideoBlockProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleVideoClick = () => {
        setIsZoomed(true);
    };

    const handleClose = () => {
        setIsZoomed(false);
    };

    return (
        <>
            <figure className="my-8">
                <div
                    className="relative w-full aspect-video min-h-[635px] overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={handleVideoClick}
                >
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                {caption && (
                    <figcaption className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
                        {caption}
                    </figcaption>
                )}
            </figure>

            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                    onClick={handleClose}
                >
                    <div className="relative w-full max-w-7xl mx-4">
                        <button
                            onClick={handleClose}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-neutral-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div
                            className="relative aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                className="w-full h-full"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            >
                                <source src={src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
