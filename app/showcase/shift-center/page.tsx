"use client";

import Link from "next/link";
import { CornerUpLeft, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useState } from "react";

// Video prototype showcase
const videoPrototype = {
    src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Timeline%201-aUjxn0rKhHNHJwMdh9ygbwnkH7EjfO.mov",
    alt: "Interactive Calendar Prototype",
};

// Gallery images for browsing
const galleryImages = [
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Calendar%20Side%20Panel-1PE3DC3gBnZA9kywMksGem3puIMMbl.png",
        alt: "Calendar Side Panel",
        title: "Shift Detailed View",
    },
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Calendar-kMS9fbw28IdhQOItkfrud58XMQYmKi.png",
        alt: "Calendar",
        title: "Calendar",
    },
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Shift%20Assignment-3-2a6V06lrkhmZI0aAv5DksUft1Gnfmf.png",
        alt: "Shift Assignment",
        title: "Shift Assignment",
    },
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Shift%20Builder-1-HSte2raBIjn9liZ4nhPrWGoIJbcKy7.png",
        alt: "Fixed Shift",
        title: "Fixed Shift",
    },
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Shift%20Builder-ZC8adRroEvJGk5iFcvyxeEX3BkCjCS.png",
        alt: "Flexible Shift",
        title: "Flexible Shift",
    },
    {
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Shift%20Center-g6GmmpA7adV8NHiHVRnXOfeUuRVQxX.png",
        alt: "Shift Center",
        title: "Shift Center",
    },
];

export default function ShiftCenterShowcase() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-8">
                <Link href="/showcase" className="inline-block mb-8">
                    <Button variant="ghost">
                        <CornerUpLeft className="mr-2 h-4 w-4" />
                        Back to Showcase
                    </Button>
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Shift Center Module
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        A comprehensive shift management system that allows
                        users to create custom shifts and assign them to
                        employees efficiently. Built for Sprout Solutions' HRIS
                        platform.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Video Prototype Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="w-full">
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        src={videoPrototype.src}
                                        className="w-full h-auto object-cover"
                                        style={{
                                            height: "auto",
                                        }}
                                    >
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-primary border-b-6 pb-1">
                            <span className="text-md font-medium p-2 bg-black text-white rounded-t-md">
                                Design Gallery
                            </span>
                        </h3>

                        <div className="space-y-4">
                            {/* Pinterest-style masonry gallery */}
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-2 gap-6 space-y-6">
                                {galleryImages.map((img, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        className="group cursor-pointer relative break-inside-avoid mb-6"
                                        onClick={() =>
                                            handleImageClick(imgIndex)
                                        }
                                    >
                                        <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={400}
                                                height={0}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                style={{
                                                    height: "auto",
                                                }}
                                                className="w-full h-auto object-cover"
                                            />
                                            {/* Optional: Add overlay with title */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p className="text-sm font-medium">
                                                        {img.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Close button - fixed to upper right of modal */}
                    <button
                        onClick={handleClose}
                        className="fixed top-4 right-4 p-2 text-white hover:text-neutral-300 transition-colors z-10 bg-black/50 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Title - fixed to lower left of modal */}
                    <div className="fixed bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                        <p className="text-sm font-medium">
                            {galleryImages[selectedImage].title}
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto">
                        <div
                            className="relative flex items-center justify-center max-h-[90vh] max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[selectedImage].src}
                                alt={galleryImages[selectedImage].alt}
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
        </div>
    );
}
