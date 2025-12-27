"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PillHeader } from "./pill-header";
import { PillBody } from "./pill-body";
import { PillProgressBar } from "./pill-progressBar";
import { cn } from "lib/utils";

// Define Section type (can be moved to a shared types file later)
interface Section {
    id: string;
    text: string;
}

interface DynamicPillProps {
    className?: string;
    title: string;
    author: string;
    sections: Section[];
    totalTime: string;
}

// Helper to convert MM:SS string to total seconds
function timeToSeconds(time: string): number {
    const [minutes, seconds] = (time || "00:00").split(":").map(Number);
    return minutes * 60 + seconds;
}

// Helper to format seconds to MM:SS (can be shared)
function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
}

function DynamicPill({
    className,
    title,
    author,
    sections,
    totalTime,
}: DynamicPillProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00");
    const [activeSectionId, setActiveSectionId] = useState<string | null>(
        sections[0]?.id || null
    );
    const [isCollapsed, setIsCollapsed] = useState(true);
    const totalSeconds = timeToSeconds(totalTime);
    const articleRef = useRef<HTMLElement | null>(null);
    const headingOffsets = useRef<{ id: string; offsetTop: number }[]>([]);
    const isClickScrolling = useRef<boolean>(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Toggle collapse state
    const toggleCollapse = useCallback(() => {
        setIsCollapsed((prev) => !prev);
    }, []);

    // Function to calculate heading offsets (run on mount and resize)
    const calculateOffsets = useCallback(() => {
        if (!articleRef.current) return;
        const articleTop = articleRef.current.offsetTop || 0;
        const headingElements =
            articleRef.current.querySelectorAll("h2[id], h3[id]");
        headingOffsets.current = Array.from(headingElements).map((el) => ({
            id: el.id,
            offsetTop: (el as HTMLElement).offsetTop + articleTop,
        }));
        if (headingOffsets.current.length > 0 && !activeSectionId) {
            setActiveSectionId(headingOffsets.current[0].id);
        }
    }, [activeSectionId]);

    // Effect to find article element and calculate initial offsets
    useEffect(() => {
        articleRef.current = document.getElementById("blog-content-article");
        calculateOffsets();
        window.addEventListener("resize", calculateOffsets);
        return () => window.removeEventListener("resize", calculateOffsets);
    }, [calculateOffsets]);

    // Handler for clicking a section link
    const handleSectionClick = useCallback((id: string) => {
        setActiveSectionId(id);
        isClickScrolling.current = true;

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            isClickScrolling.current = false;
        }, 700);
    }, []);

    const handleScroll = useCallback(() => {
        if (!articleRef.current) return;
        const articleElement = articleRef.current;

        // --- Progress bar logic ---
        const { top } = articleElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        let progress = 0;
        const scrollYRelativeToArticle =
            window.scrollY - (articleElement.offsetTop || 0);
        const scrollableDistance = articleElement.scrollHeight - viewportHeight;
        if (scrollableDistance > 0) {
            progress = Math.max(
                0,
                Math.min(
                    100,
                    (scrollYRelativeToArticle / scrollableDistance) * 100
                )
            );
        } else if (top < 0) {
            progress = 100;
        } else if (top >= 0 && articleElement.scrollHeight <= viewportHeight) {
            progress = 0;
        }

        progress = Math.max(0, Math.min(100, progress));

        setScrollProgress(progress);
        const currentSeconds = (progress / 100) * totalSeconds;
        setCurrentTime(formatTime(currentSeconds));
        // --- End Progress bar logic ---

        // --- Active section logic ---
        if (isClickScrolling.current) {
            return;
        }

        let currentActiveId: string | null = null;

        if (progress >= 99.9) {
            currentActiveId = sections[sections.length - 1]?.id || null;
        } else {
            const scrollY = window.scrollY;
            const scrollOffset = viewportHeight * 0.3;

            for (let i = headingOffsets.current.length - 1; i >= 0; i--) {
                const heading = headingOffsets.current[i];
                if (scrollY >= heading.offsetTop - scrollOffset) {
                    currentActiveId = heading.id;
                    break;
                }
            }
            if (currentActiveId === null && headingOffsets.current.length > 0) {
                currentActiveId = headingOffsets.current[0].id;
            }
        }

        setActiveSectionId(currentActiveId);
        // --- End Active section logic ---
    }, [totalSeconds, sections]);

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    // Find the text of the currently active section
    const activeSectionText = sections.find(
        (s) => s.id === activeSectionId
    )?.text;

    // Variants for the inner content container (height, opacity, margin)
    const contentVariants = {
        hidden: {
            height: 0,
            opacity: 0,
            marginTop: 0,
            transition: { duration: 0.3, ease: "easeIn" },
        },
        visible: {
            height: "auto",
            opacity: 1,
            marginTop: "1rem",
            transition: { duration: 0.3, ease: "easeIn" },
        },
    };

    return (
        <div
            className={cn(
                "bg-[rgba(17,15,15,0.95)] flex flex-col items-stretch rounded-3xl backdrop-blur-xl overflow-hidden p-4 w-full sm:w-auto min-w-[280px] max-w-[360px]",
                className
            )}
        >
            <PillHeader
                title={title}
                author={author}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
                activeSectionText={activeSectionText}
            />

            {/* Inner container for animating content visibility */}
            <motion.div
                variants={contentVariants}
                animate={isCollapsed ? "hidden" : "visible"}
                initial={false}
                style={{ overflow: "hidden" }}
            >
                <PillBody
                    sections={sections}
                    activeSectionId={activeSectionId}
                    onSectionClick={handleSectionClick}
                />
                <PillProgressBar
                    currentTime={currentTime}
                    totalTime={totalTime}
                    progress={scrollProgress}
                />
            </motion.div>
        </div>
    );
}

export default DynamicPill;
