"use client";

import { FileText, X, ChevronRight, CornerUpLeft } from "lucide-react";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import Link from "next/link";

// --- Constants ---

const PANEL_ANIMATION_DURATION_SECONDS = 0.3;

const PANEL_BASE_STYLES =
    "absolute inset-0 w-[450px] h-[calc(100vh-3rem)] rounded-2xl bg-background shadow-lg flex flex-col overflow-hidden !pointer-events-auto";

const PANEL_TRANSITION: MotionProps["transition"] = {
    ease: "easeInOut",
    duration: PANEL_ANIMATION_DURATION_SECONDS,
};

/**
 * Interface representing the structure of an item displayed in the list.
 */
interface Item {
    id: string;
    title: string;
    description: string;
    category: string;
    color?: string;
}

/**
 * Interface representing the state of a single panel in the stack.
 */
interface PanelState {
    id: string; // Unique identifier for React keys and animations.
    level: number; // Depth level in the panel stack (0: list, 1: detail, 2+: subsequent panels).
    title: string; // Title displayed in the panel header.
    subTitle?: string; // Optional subtitle displayed below the title.
    content: React.ReactNode; // The main content React node for the panel body.
    itemData?: Item; // Optional item data associated with the panel (usually for level 1).
}

/**
 * Header for a single panel.
 */
function PanelHeader({
    title,
    subTitle,
    level,
    isActive,
    onBack,
    onClose,
}: {
    title: string;
    subTitle?: string;
    level: number;
    isActive: boolean;
    onBack: () => void;
    onClose: () => void;
}) {
    return (
        <div
            className={cn(
                "border-b border-gray-200 p-4 flex-none bg-gray-50 relative flex items-center justify-between h-16"
            )}
        >
            {/* Left Slot: Always Spacer */}
            <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                aria-hidden="true"
            />

            {/* Center Slot: Title and Subtitle */}
            <div className="flex-1 text-center px-2 overflow-hidden">
                <h2
                    className={cn("text-lg font-medium text-gray-800 truncate")}
                >
                    {title}
                </h2>
                {subTitle && (
                    <p className={cn("text-xs text-gray-500 mt-0.5 truncate")}>
                        {subTitle}
                    </p>
                )}
            </div>

            {/* Right Slot: Close (level 0 active) OR Back (level > 0) OR Spacer */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                {level === 0 && isActive ? (
                    // Close Button for active initial panel
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onClose}
                        className=" text-gray-500 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 !pointer-events-auto"
                        aria-label="Close dialog"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                ) : level > 0 ? (
                    // Back Button (using ChevronRight icon) for subsequent panels
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBack}
                        className="text-gray-500 border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 !pointer-events-auto"
                        aria-label="Back"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                ) : (
                    // Spacer for inactive initial panel
                    <div aria-hidden="true" />
                )}
            </div>
        </div>
    );
}

/**
 * Footer for a single active panel.
 */
function PanelFooter({
    level,
    itemToApply, // Pass the item data if applicable for the Apply button
    onBack,
    onApply, // The actual apply action callback
}: {
    level: number;
    itemToApply?: Item | null;
    onBack: () => void;
    onApply?: () => void; // Make apply optional based on props/panel type
}) {
    return (
        <div className="border-t border-gray-200 p-6 flex-none bg-gray-50 flex justify-end gap-3 w-full">
            {level > 0 && (
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="text-[#262b2b] border-[#d9dede] hover:bg-gray-100"
                >
                    Back
                </Button>
            )}
            {/* Apply button (if applicable and an item is ready) */}
            {onApply && itemToApply && (
                <Button
                    onClick={onApply}
                    className="bg-gray-900 text-white"
                    variant="default"
                >
                    Apply '{itemToApply.title}'
                </Button>
            )}
        </div>
    );
}

/**
 * Represents a single animated panel within the stack.
 */
function Panel({
    panel,
    isActive,
    isPrevious,
    onBack,
    onClose,
    onApply,
    itemToApply, // Pass potential item for the footer
}: {
    panel: PanelState;
    isActive: boolean;
    isPrevious: boolean;
    onBack: () => void;
    onClose: () => void; // Dialog close handler
    onApply?: (item: Item) => void; // External apply handler
    itemToApply?: Item | null; // Item derived from the active panel state
}) {
    // Calculate horizontal position for animation
    let xPosition = "-100%"; // Default: off-screen left
    if (isActive) {
        xPosition = "0%"; // Active panel slides into view
    } else if (isPrevious) {
        // Previous panel slides slightly off-screen right
        xPosition = "calc(100% + 16px)"; // Adjusted for potential gap/visual
    } else {
        // Older panels are pushed fully off-screen right
        xPosition = "100%";
    }

    const handleApplyClick = React.useCallback(() => {
        if (itemToApply && onApply) {
            onApply(itemToApply);
        }
        onClose(); // Close dialog after applying
    }, [itemToApply, onApply, onClose]);

    return (
        <motion.div
            key={panel.id}
            className={cn(PANEL_BASE_STYLES)}
            initial={{
                x: panel.level === 0 ? "100%" : "-100%",
                opacity: 0,
            }}
            animate={{
                x: xPosition,
                opacity: isActive ? 1 : isPrevious ? 0.7 : 0,
                transition: PANEL_TRANSITION,
                transitionEnd: {
                    display: isActive || isPrevious ? "flex" : "none",
                },
            }}
            exit={{
                x: "-100%",
                opacity: 0,
                transition: PANEL_TRANSITION,
            }}
            style={{
                zIndex: panel.level + 10,
                pointerEvents: isActive ? "auto" : "none",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks reaching overlay
        >
            <PanelHeader
                title={panel.title}
                subTitle={panel.subTitle}
                level={panel.level}
                isActive={isActive}
                onBack={onBack}
                onClose={onClose}
            />

            {/* Panel Content Area */}
            {panel.content}

            {/* Panel Footer (only on active panel) */}
            {isActive && (
                <PanelFooter
                    level={panel.level}
                    itemToApply={itemToApply}
                    onBack={onBack}
                    // Pass the actual apply *action* callback here
                    onApply={
                        onApply && itemToApply ? handleApplyClick : undefined
                    }
                />
            )}
        </motion.div>
    );
}

/**
 * Reusable card component to display individual item information.
 */
function ItemCard({
    title,
    description,
    category,
    color = "blue",
    onClick,
    className,
}: {
    title: string;
    description: string;
    category: string;
    color?: string;
    onClick: () => void;
    className?: string;
}) {
    return (
        <div className={cn("p-4 rounded-lg", className)} onClick={onClick}>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex items-center mt-2">
                <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                />
                <span className="text-xs">{category}</span>
            </div>
        </div>
    );
}

/**
 * Sample data used for the item list.
 */
const sampleItems: Item[] = [
    {
        id: "1",
        title: "Item One",
        description: "Description for item one",
        category: "Category A",
        color: "#4CAF50",
    },
    {
        id: "2",
        title: "Item Two",
        description: "Description for item two",
        category: "Category B",
        color: "#2196F3",
    },
    {
        id: "3",
        title: "Item Three",
        description: "Description for item three",
        category: "Category C",
        color: "#9C27B0",
    },
];

/**
 * The main Drawer component handling panel navigation and state.
 */
function Drawer({
    isOpen,
    onClose,
    onApplyItem,
    activeContext,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApplyItem?: (item: Item) => void;
    activeContext?: string | null;
}) {
    const [panelStack, setPanelStack] = React.useState<PanelState[]>([]);

    /**
     * Callback to handle navigating back one level in the panel stack.
     * Removes the last panel from the stack.
     */
    const handleBack = React.useCallback(() => {
        setPanelStack((prev) => prev.slice(0, -1));
    }, []);

    /**
     * Callback to handle opening a new panel (either detail level 1 or subsequent levels).
     * If `currentItem` is provided, it creates a level 1 panel.
     * Otherwise, it creates a panel at the next level based on the current stack size.
     */
    const handleOpenNextPanel = React.useCallback(
        (currentItem?: Item) => {
            setPanelStack((prevStack) => {
                const currentStackSize = prevStack.length;
                const newPanelLevel =
                    currentItem !== undefined ? 1 : currentStackSize; // Level 1 if item, else next level
                const openerLevel = Math.max(0, newPanelLevel - 1); // Ensure openerLevel isn't negative
                const openerTitle =
                    currentItem?.title ||
                    prevStack[openerLevel]?.title ||
                    (activeContext ? `Select Item` : `Panel ${openerLevel}`); // Fallback for level 0

                // Determine title and potential itemData for the new panel
                let newTitle: string;
                let newItemData: Item | undefined = undefined;
                if (newPanelLevel === 1 && currentItem) {
                    newTitle = `Details: ${currentItem.title}`; // More specific title for level 1
                    newItemData = currentItem; // Associate item data with level 1 panel
                } else {
                    newTitle = `Panel ${newPanelLevel}`; // Generic title for level > 1
                }

                const newPanel: PanelState = {
                    id: `panel-${newPanelLevel}-${Date.now()}`,
                    level: newPanelLevel,
                    title: newTitle,
                    subTitle: `Opened from ${openerTitle}`,
                    itemData: newItemData, // Set itemData here
                    content: (
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                            <p>This is Panel {newPanelLevel}.</p>
                            {newPanelLevel === 1 && currentItem && (
                                <p>Context from item: '{currentItem.title}'.</p>
                            )}
                            <Button
                                variant="outline"
                                className="border border-gray-300 hover:bg-gray-100"
                                onClick={() => handleOpenNextPanel()}
                            >
                                Open Next Panel ({newPanelLevel + 1})
                            </Button>
                        </div>
                    ),
                };

                return [...prevStack, newPanel];
            });
        },
        [activeContext] // Dependency on activeContext for initial subtitle logic
    );

    /**
     * Callback triggered when an item card is clicked in the list view.
     * Calls `handleOpenNextPanel` with the selected item to open the first detail panel.
     */
    const handleItemSelect = React.useCallback(
        (item: Item) => {
            handleOpenNextPanel(item); // Delegates opening and state setting
        },
        [handleOpenNextPanel] // Depends on the panel opening handler
    );

    /**
     * Factory function to create the state for the initial (level 0) list panel.
     * Uses `activeContext` for the subtitle and maps `sampleItems` to `ItemCard` components.
     */
    const createInitialPanel = React.useCallback((): PanelState => {
        return {
            id: `list-${Date.now()}`,
            level: 0,
            title: "Select Item",
            subTitle: activeContext
                ? `Choose an item for ${activeContext}`
                : "Choose an item from the list",
            content: (
                <div className="flex-1 overflow-y-auto p-6 space-y-3 relative bg-white">
                    {/* Header for the list section */}
                    <div className="text-sm font-medium text-[#262b2b] mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-[#158039]" />
                        Available Items
                    </div>
                    {/* List of items */}
                    <div className="relative z-10">
                        {sampleItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                category={item.category}
                                color={item.color}
                                onClick={() => handleItemSelect(item)} // Use the item select handler
                                className="cursor-pointer hover:scale-[1.02] transition-transform hover:shadow-md border border-gray-200 mb-3"
                            />
                        ))}
                    </div>
                </div>
            ),
        };
    }, [activeContext, handleItemSelect]);

    /**
     * Effect to set the initial panel in the stack when the drawer is opened.
     * Relies on `createInitialPanel` to generate the initial state.
     */
    React.useEffect(() => {
        if (isOpen && panelStack.length === 0) {
            // Only set initial panel if drawer is open AND stack is currently empty
            const initialPanel = createInitialPanel();
            setPanelStack([initialPanel]);
        }
    }, [isOpen, panelStack.length, createInitialPanel]); // Depends on visibility, stack length, and panel creator

    /**
     * Effect to clear the panel stack when the drawer closes (with delay)
     */
    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!isOpen) {
            // Use the defined constant directly for the delay calculation
            const durationMs = PANEL_ANIMATION_DURATION_SECONDS * 1000;
            // Delay clearing stack slightly longer than animation duration
            timeoutId = setTimeout(() => {
                setPanelStack([]);
            }, durationMs + 100);
        }
        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or if isOpen changes
    }, [isOpen]); // Only dependent on drawer visibility.

    /**
     * Derive the item to apply from the *active* panel's state
     */
    const activePanel = panelStack[panelStack.length - 1];
    const potentialItemToApply =
        activePanel?.level === 1 ? activePanel.itemData : null;

    /**
     * Render function for the drawer's content, passed as a child to the Dialog component.
     * Manages the animation and rendering of the panel stack.
     * @param handleClose - The close handler provided by the Dialog component.
     */
    const renderDrawerContent = ({
        handleClose,
    }: {
        handleClose: () => void;
    }) => (
        <div className="relative w-[450px] h-[calc(100vh-3rem)] !pointer-events-none">
            <AnimatePresence initial={false} mode="popLayout">
                {panelStack.map((panel, index) => {
                    const isActive = index === panelStack.length - 1;
                    const isPrevious = index === panelStack.length - 2;

                    return (
                        <Panel
                            key={panel.id}
                            panel={panel}
                            isActive={isActive}
                            isPrevious={isPrevious}
                            onBack={handleBack}
                            onClose={handleClose}
                            onApply={onApplyItem}
                            itemToApply={
                                isActive ? potentialItemToApply : undefined
                            }
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );

    // Render the Dialog component, passing the render function for its content.
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            {renderDrawerContent}
        </Dialog>
    );
}

/**
 * The main page component that demonstrates the usage of the DrawerComponent.
 */
export default function DrawerPage() {
    // State to control the visibility of the drawer on the page.
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    /**
     * Callback function passed to the DrawerComponent.
     * Triggered when the 'Apply' button is clicked inside the drawer.
     * @param item - The item data that was applied.
     */
    const handleItemApply = (item: Item) => {
        console.log("Applied item:", item);
        // TODO: Implement logic to handle the applied item (e.g., update page state)
        setIsDrawerOpen(false); // Example: Close drawer on apply
    };

    return (
        <section>
            <Link href="/showcase" className="inline-block mb-8">
                <Button variant="ghost">
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Back to Showcase
                </Button>
            </Link>

            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
                Dynamic Side Panel Drawer
            </h1>

            <div className="space-y-12">
                {/* Video Showcase Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-medium mb-4">
                            Real Use Cases
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            See the dynamic side panel drawer in action across
                            different contexts and workflows.
                        </p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            src="https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Sidepanel-LxobKClvOvuo6sCu3fNNtU5AUqv5Nu.mov"
                            className="w-full h-auto object-cover"
                            style={{
                                height: "auto",
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                {/* Interactive Example Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-medium mb-4">
                            Interactive Example
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Try the drawer component yourself with this
                            interactive demo.
                        </p>
                    </div>

                    <div className="mb-8">
                        <Button
                            variant="default"
                            onClick={() => setIsDrawerOpen(true)}
                            className="bg-gray-900 text-white"
                        >
                            Open Drawer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Render the DrawerComponent, passing necessary props and callbacks */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onApplyItem={handleItemApply}
                activeContext="this refactored example"
            />
        </section>
    );
}
