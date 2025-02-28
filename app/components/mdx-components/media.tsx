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
}: ImageBlockProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(true);
    };

    const handleClose = () => {
        setIsZoomed(false);
    };

    return (
        <>
            <figure className="my-8">
                <div
                    className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={handleImageClick}
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full h-auto"
                        priority
                    />
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
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className="object-contain"
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
                    className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 min-h-[635px] cursor-pointer transition-transform hover:scale-[1.02]"
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
