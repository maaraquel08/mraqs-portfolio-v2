"use client";

import Link from "next/link";
import { CornerUpLeft, X, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Instagram-like feed items
interface FeedItem {
    type: "video" | "image";
    src: string;
    alt: string;
    title: string;
    description?: string;
}

const feedItems: FeedItem[] = [
    {
        type: "video",
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Badyetly/Calendar%20Hover%20Action.mov",
        alt: "Calendar Action Hover",
        title: "Calendar Action Hover",
        description: "Interactive calendar with hover actions for managing bills and subscriptions.",
    },
    {
        type: "video",
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Badyetly/Adding%20New%20Bill.mov",
        alt: "Adding New Bill",
        title: "Adding New Bill",
        description: "Streamlined process for adding new bills and subscriptions to track.",
    },
    {
        type: "video",
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Badyetly/Paid%20Bill.mov",
        alt: "Paid Bill",
        title: "Paid Bill",
        description: "Marking bills as paid and updating subscription status.",
    },
    {
        type: "video",
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Badyetly/Financial%20Reports.mov",
        alt: "Financial Reports",
        title: "Financial Reports",
        description: "Comprehensive financial reports and insights for better money management.",
    },
    {
        type: "video",
        src: "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Badyetly/Config.mov",
        alt: "Config",
        title: "Config",
        description: "Configuration settings for customizing your financial tracking experience.",
    },
];

export default function BadyetlyShowcase() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
    const [aspectRatios, setAspectRatios] = useState<Record<number, string>>({});
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [liked, setLiked] = useState<Record<number, boolean>>({});
    const [showHeartAnimation, setShowHeartAnimation] = useState<Record<number, boolean>>({});
    const lastClickTimeRef = useRef<Record<number, number>>({});

    // Initialize random likes on mount
    useEffect(() => {
        const initialLikes: Record<number, number> = {};
        feedItems.forEach((_, index) => {
            initialLikes[index] = Math.floor(Math.random() * 500) + 10;
        });
        setLikes(initialLikes);
    }, []);

    const handleImageClick = (index: number) => {
        if (feedItems[index].type === "image") {
            setSelectedImage(index);
        } else if (feedItems[index].type === "video") {
            setSelectedVideo(index);
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
        setSelectedVideo(null);
    };

    const handleLike = (index: number) => {
        const isCurrentlyLiked = liked[index];
        setLiked((prev) => ({ ...prev, [index]: !isCurrentlyLiked }));
        setLikes((prev) => ({
            ...prev,
            [index]: isCurrentlyLiked
                ? Math.max(0, (prev[index] || 0) - 1)
                : (prev[index] || 0) + 1,
        }));
    };

    const handleDoubleClick = (index: number) => {
        const now = Date.now();
        const lastClick = lastClickTimeRef.current[index] || 0;
        const timeDiff = now - lastClick;

        if (timeDiff < 300) {
            // Double click detected - only like if not already liked
            if (!liked[index]) {
                handleLike(index);
                setShowHeartAnimation((prev) => ({ ...prev, [index]: true }));
                setTimeout(() => {
                    setShowHeartAnimation((prev) => ({ ...prev, [index]: false }));
                }, 1000);
            }
        }

        lastClickTimeRef.current[index] = now;
    };

    // Load images to get natural dimensions and calculate aspect ratios
    useEffect(() => {
        feedItems.forEach((item, index) => {
            if (item.type === "image") {
                const img = new window.Image();
                img.onload = () => {
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                        const aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
                        setAspectRatios((prev) => ({
                            ...prev,
                            [index]: aspectRatio,
                        }));
                    }
                };
                img.src = item.src;
            }
        });
    }, []);

    return (
        <section>
            <Link href="/showcase" className="inline-block mb-8">
                <Button variant="ghost">
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Back to Showcase
                </Button>
            </Link>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <h1 className="font-semibold text-2xl tracking-tighter">
                        Badyetly
                    </h1>
                    <a
                        href="https://v0-monthly-dues-tracker.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center transition-colors hover:text-foreground text-muted-foreground"
                    >
                        <ExternalLink className="h-5 w-5" />
                    </a>
                </div>
                <p className="text-muted-foreground">
                    A platform for working people to track their subscriptions
                    better and achieve financial freedom.
                </p>
            </div>

            {/* Instagram-like Feed */}
            <div className="space-y-8">
                {feedItems.map((item, index) => (
                    <div key={index} className="space-y-3">
                        <div
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                        >
                            {/* Post Header - Title */}
                            <div className="px-4 py-3 border-b border-gray-200">
                                <h2 className="text-base font-semibold text-foreground">
                                    {item.title}
                                </h2>
                            </div>

                            {/* Media Content */}
                            <div
                                className="relative w-full cursor-pointer"
                                onClick={() => handleImageClick(index)}
                                onDoubleClick={() => handleDoubleClick(index)}
                                style={
                                    item.type === "image" && aspectRatios[index]
                                        ? { aspectRatio: aspectRatios[index] }
                                        : item.type === "video"
                                          ? { aspectRatio: "16 / 9" }
                                          : undefined
                                }
                            >
                                {item.type === "video" ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        src={item.src}
                                        className="w-full h-full object-contain"
                                    >
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 576px"
                                        className="object-contain"
                                    />
                                )}
                                {/* Heart Animation on Double Click */}
                                {showHeartAnimation[index] && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <Heart
                                            className="w-20 h-20 text-red-500 fill-red-500 animate-ping"
                                            style={{
                                                animation: "ping 1s cubic-bezier(0, 0, 0.2, 1)",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Post Caption - Description */}
                            {item.description && (
                                <div className="px-4 py-3 border-t border-gray-200">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Actions - Like Button (Outside Card) */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleLike(index)}
                                className="transition-transform active:scale-95"
                            >
                                <Heart
                                    className={`w-6 h-6 transition-colors ${
                                        liked[index]
                                            ? "text-red-500 fill-red-500"
                                            : "text-foreground"
                                    }`}
                                />
                            </button>
                            <span className="text-sm font-semibold text-foreground">
                                {likes[index]?.toLocaleString() || "0"} likes
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Zoom Modal for Images */}
            {selectedImage !== null && feedItems[selectedImage].type === "image" && (
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

                    {/* Title */}
                    <div className="fixed bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                        <p className="text-sm font-medium">
                            {feedItems[selectedImage].title}
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto">
                        <div
                            className="relative flex items-center justify-center max-h-[90vh] max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={feedItems[selectedImage].src}
                                alt={feedItems[selectedImage].alt}
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

            {/* Zoom Modal for Videos */}
            {selectedVideo !== null && feedItems[selectedVideo].type === "video" && (
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
                                <source src={feedItems[selectedVideo].src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
