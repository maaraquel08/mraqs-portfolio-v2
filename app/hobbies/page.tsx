"use client";

import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { HobbyImage, HobbyImagesResponse } from "./types";

export default function HobbiesPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [hobbyImages, setHobbyImages] = useState<HobbyImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);

    const fetchHobbyImages = useCallback(
        async (pageNum: number, isLoadMore = false) => {
            try {
                if (!isLoadMore) setLoading(true);
                else setLoadingMore(true);

                const response = await fetch(
                    `/hobbies/api?page=${pageNum}&limit=10`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch hobby images");
                }

                const data: HobbyImagesResponse = await response.json();

                if (isLoadMore) {
                    setHobbyImages((prev) => [...prev, ...data.images]);
                } else {
                    setHobbyImages(data.images);
                }

                setHasMore(data.hasMore);
                setTotal(data.total);
                setPage(pageNum);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        []
    );

    // Initial load
    useEffect(() => {
        fetchHobbyImages(1);
    }, [fetchHobbyImages]);

    // Load more handler
    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            fetchHobbyImages(page + 1, true);
        }
    };

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-8">
                    <div className="mb-12">
                        <h1 className="text-2xl font-medium tracking-tight mb-4">
                            My Hobbies
                        </h1>
                        <p className="text-muted-foreground">
                            Loading hobby images...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-8">
                    <div className="mb-12 text-center">
                        <h1 className="text-2xl font-medium tracking-tight mb-4">
                            My Hobbies
                        </h1>
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-8">
                <div className="mb-12">
                    <h1 className="text-2xl font-medium tracking-tight mb-4">
                        My Hobbies
                    </h1>
                    <p className="text-muted-foreground max-w-2xl leading-relaxed">
                        A curated collection of my personal interests and
                        activities that bring joy and inspiration to my daily
                        life.
                    </p>
                    {total > 0 && (
                        <p className="text-sm text-muted-foreground mt-4">
                            Showing {hobbyImages.length} of {total} images
                        </p>
                    )}
                </div>

                {/* Masonry layout with CSS columns but controlled ordering */}
                <div
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
                    style={{
                        columnFill: "balance",
                    }}
                >
                    {hobbyImages.map((image, index) => (
                        <div
                            key={`${image.id}-${index}`}
                            className="group cursor-pointer relative break-inside-avoid mb-6 inline-block w-full"
                            onClick={() => handleImageClick(index)}
                            style={{
                                pageBreakInside: "avoid",
                                breakInside: "avoid",
                            }}
                        >
                            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={0}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    style={{
                                        height: "auto",
                                        width: "100%",
                                        display: "block",
                                    }}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m9T8GNlUqTBOr18eJLvTZ2ChCZF+z95C5c="
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">
                            Loading more images...
                        </span>
                    </div>
                )}

                {/* Show More Button */}
                {hasMore && !loadingMore && (
                    <div className="flex justify-center items-center py-8">
                        <Button
                            onClick={handleLoadMore}
                            variant="outline"
                            className="px-8 py-2"
                        >
                            Show More Photos
                        </Button>
                    </div>
                )}

                {/* End of Content */}
                {!hasMore && hobbyImages.length > 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            You've reached the end! 🎉
                        </p>
                    </div>
                )}
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

                    {/* Title and description - fixed to lower left of modal */}
                    <div className="fixed bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                        <p className="text-sm font-medium mb-1">
                            <a
                                href="https://www.instagram.com/micspov"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:text-blue-300 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                micsPOV
                            </a>
                        </p>
                        <p className="text-xs opacity-90">
                            Hi I am not a professional but I love to take
                            pictures.
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto">
                        <div
                            className="relative flex items-center justify-center max-h-[90vh] max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={hobbyImages[selectedImage].src}
                                alt={hobbyImages[selectedImage].alt}
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
