"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface GallerySlideshowProps {
    images: {
        src: string;
        alt: string;
    }[];
    className?: string;
}

export function GallerySlideshow({ images, className }: GallerySlideshowProps) {
    const [selectedImage, setSelectedImage] = React.useState<number | null>(
        null
    );

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className={cn("w-full relative", className)}>
                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-none first:pl-4 last:pr-4 snap-center"
                            onClick={() => handleImageClick(index)}
                        >
                            <div className="relative cursor-pointer transition-transform hover:scale-[1.02] rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden max-h-[800px]">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={800}
                                    height={600}
                                    className="object-contain max-h-[800px] w-auto h-auto"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Zoom Modal */}
            {selectedImage !== null && (
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
                                src={images[selectedImage].src}
                                alt={images[selectedImage].alt}
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
