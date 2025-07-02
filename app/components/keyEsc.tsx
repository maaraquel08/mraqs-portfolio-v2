"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { useSound } from "@/app/hooks/useSound";

// Define props interface
interface KeyEscProps {
    context?: "fixed" | "mobileHeader";
}

export function KeyEsc({ context = "fixed" }: KeyEscProps) {
    // Default context to 'fixed'
    const router = useRouter();
    const pathname = usePathname();
    const { playArpeggio } = useSound();
    const [isKeyPressed, setIsKeyPressed] = useState(false);
    const [isActionDebounced, setIsActionDebounced] = useState(false);

    // Function for sound + navigation wrapped in useCallback
    const triggerAction = useCallback(() => {
        if (isActionDebounced) return;

        setIsActionDebounced(true);

        playArpeggio({
            startFrequency: 1000,
            noteCount: 1,
            noteDuration: 16,
            type: "sine",
            volume: 0.1,
        });
        router.push("/");

        setTimeout(() => {
            setIsActionDebounced(false);
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActionDebounced, playArpeggio, router]);

    // Add useEffect for keyboard listener (only when not on home page)
    useEffect(() => {
        // Don't set up listeners if we're on the home page
        if (pathname === "/") {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                if (!isKeyPressed) {
                    setIsKeyPressed(true);
                }
            }
        }

        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsKeyPressed(false);
                triggerAction();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isKeyPressed, triggerAction, pathname]);

    // Base classes for appearance (size, color, shadow, etc.)
    const baseClasses =
        "h-10 w-10 rounded-lg border border-black/10 dark:border-white/10 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-offset-black transition-transform duration-75 ease-in-out shadow-[0_3px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] font-medium text-xs";

    // Active state classes (from the original active: pseudo-classes)
    const activeClasses =
        "shadow-[0_1px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] translate-y-[2px]";

    // Positioning classes based on context
    const positionClasses =
        context === "fixed" ? "fixed top-4 left-4 z-50" : "relative"; // Use relative for mobile header context to flow correctly

    // Don't render if we're on the home page
    if (pathname === "/") {
        return null;
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={triggerAction}
            className={`${positionClasses} ${baseClasses} ${
                isKeyPressed ? activeClasses : ""
            }`}
            aria-label="Go to homepage (Esc)"
        >
            esc
        </Button>
    );
}
