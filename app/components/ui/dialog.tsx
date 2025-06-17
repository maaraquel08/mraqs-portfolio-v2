"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface CustomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children:
        | React.ReactNode
        | ((props: { handleClose: () => void }) => React.ReactNode);
    className?: string; // Allow custom classes for the content panel
}

export function Dialog({
    isOpen,
    onClose,
    children,
    className,
}: CustomDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    // Add a local state to control the animation
    const [isClosing, setIsClosing] = useState(false);

    // Close dialog on escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Basic focus management: focus the dialog when it opens
            dialogRef.current?.focus();
            // Reset closing state when dialog opens
            setIsClosing(false);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Handler for smooth closing
    const handleClose = () => {
        setIsClosing(true);
        // Delay the actual close to allow animation to complete
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300); // Match the animation duration
    };

    if (!isOpen) {
        return null;
    }

    // Determine if children is a function and pass handleClose
    const renderChildren = () => {
        if (typeof children === "function") {
            return children({ handleClose });
        }
        return children;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="p-6 fixed inset-0 z-50 flex justify-end"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Overlay - Animate opacity */}
                    <motion.div
                        className="fixed inset-0 bg-black/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isClosing ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                    />

                    {/* Content Panel Container */}
                    <motion.div
                        ref={dialogRef}
                        tabIndex={-1}
                        className={cn(
                            "relative z-10 flex flex-row-reverse gap-6 pointer-events-none",
                            className
                        )}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{
                            opacity: isClosing ? 0 : 1,
                            x: isClosing ? "100%" : 0,
                        }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        {renderChildren()}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Minimal placeholder components to avoid breaking existing imports immediately
// You'll need to replace DialogHeader, Footer, Title, Description usage
// with standard div/heading elements and Tailwind classes.
export const DialogHeader = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-6 border-b", className)} {...props}>
        {children}
    </div>
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("p-6 border-t flex justify-end space-x-2", className)}
        {...props}
    >
        {children}
    </div>
);
DialogFooter.displayName = "DialogFooter";

export const DialogTitle = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
        {children}
    </h2>
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
        {children}
    </p>
);
DialogDescription.displayName = "DialogDescription";

// You might not need Trigger, Portal, Close if managing state outside
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);
export const DialogPortal = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
); // No real portal here
export const DialogClose = ({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
);
