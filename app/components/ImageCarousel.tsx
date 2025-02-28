"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageCarouselProps {
    images: {
        src: string;
        alt: string;
    }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
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
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <div
                                    className="aspect-video relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-transform hover:scale-[1.02]"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

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
