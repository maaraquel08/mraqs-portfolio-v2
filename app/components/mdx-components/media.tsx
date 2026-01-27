"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    containerHeight,
}: ImageBlockProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<string | null>(null);

    const handleImageClick = () => {
        setIsZoomed(true);
    };

    const handleClose = () => {
        setIsZoomed(false);
    };

    // Load image to get natural dimensions and calculate aspect ratio
    useEffect(() => {
        if (containerHeight) {
            return;
        }

        // Use props as fallback aspect ratio
        const fallbackAspectRatio = `${width} / ${height}`;
        setAspectRatio(fallbackAspectRatio);

        const img = new window.Image();
        img.onload = () => {
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                const naturalAspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
                setAspectRatio(naturalAspectRatio);
            }
        };
        img.onerror = () => {
            // If image fails to load, keep fallback aspect ratio
        };
        img.src = src;
    }, [src, width, height, containerHeight]);

    // Get container style
    const getContainerStyle = () => {
        if (containerHeight) {
            if (typeof containerHeight === "number" || !isNaN(Number(containerHeight))) {
                return { height: `${containerHeight}px` };
            }
            return { height: containerHeight };
        }
        if (aspectRatio) {
            return { aspectRatio };
        }
        return { aspectRatio: `${width} / ${height}` };
    };

    return (
        <>
            <figure className="my-4 md:my-8 w-full max-w-full">
                <div
                    className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02] w-full bg-neutral-50 dark:bg-neutral-900"
                    onClick={handleImageClick}
                >
                    <div
                        className="relative w-full"
                        style={getContainerStyle()}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain"
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
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="fixed top-4 right-4 p-2 text-white hover:text-neutral-300 transition-colors z-10 bg-black/50 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Caption/Title */}
                    {caption && (
                        <div className="fixed bottom-4 left-4 bg-black/70 text-white pl-2 pr-4 py-2 rounded-lg z-10 w-fit h-fit" style={{ width: 'fit-content', height: 'fit-content' }}>
                            <p className="text-sm font-medium" style={{ color: '#ffffff' }}>{caption}</p>
                        </div>
                    )}

                    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto">
                        <div
                            className="relative flex items-center justify-center max-h-[90vh] max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={src}
                                alt={alt}
                                width={1200}
                                height={0}
                                style={{
                                    height: "auto",
                                    maxHeight: "90vh",
                                    width: "auto",
                                    maxWidth: "100%",
                                }}
                                className="object-contain rounded-lg"
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
            <figure className="my-4 md:my-8 w-full max-w-full">
                <div
                    className="relative w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02] bg-neutral-50 dark:bg-neutral-900"
                    onClick={handleVideoClick}
                >
                    <div className="relative w-full aspect-video">
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
                    <div className="relative w-full max-w-7xl mx-auto px-4">
                        <button
                            onClick={handleClose}
                            className="absolute -top-8 md:-top-12 right-4 p-2 text-white hover:text-neutral-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div
                            className="relative w-full aspect-video"
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
