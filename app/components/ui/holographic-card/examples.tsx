/**
 * Example usage patterns for the HolographicCard component
 *
 * Copy and paste these examples into your pages/components
 */

import { HolographicCard } from "@/components/holographic-card";

// Example 1: Basic card with text content
export function BasicCardExample() {
    return (
        <HolographicCard
            content={{
                topSection: (
                    <>
                        <div className="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-2">
                            Trading Card
                        </div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Holographic
                        </h2>
                    </>
                ),
                bottomSection: (
                    <>
                        <div className="text-sm text-gray-300 mb-2">
                            Rarity: Legendary
                        </div>
                        <div className="text-xs text-gray-400">
                            Card description
                        </div>
                    </>
                ),
            }}
        />
    );
}

// Example 2: Card with image
export function CardWithImageExample() {
    return (
        <HolographicCard
            width={400}
            height={600}
            content={{
                imageUrl: "/your-image.jpg", // or "https://example.com/image.jpg"
                imageAlt: "Trading card image",
                topSection: (
                    <div className="text-white font-bold">Card Title</div>
                ),
                bottomSection: (
                    <div className="text-white text-sm">Card Info</div>
                ),
            }}
        />
    );
}

// Example 3: Custom sized card
export function CustomSizedCardExample() {
    return (
        <HolographicCard
            width={500}
            height={700}
            content={{
                topSection: <div>Custom Size</div>,
                middleSection: <div className="text-6xl">🎴</div>,
                bottomSection: <div>Bottom content</div>,
            }}
        />
    );
}

// Example 4: Custom background gradient
export function CustomGradientCardExample() {
    return (
        <HolographicCard
            backgroundGradient={{
                from: "from-blue-900",
                via: "via-indigo-900",
                to: "to-purple-900",
            }}
            content={{
                topSection: <div className="text-white">Custom Gradient</div>,
                bottomSection: <div className="text-white">Card info</div>,
            }}
        />
    );
}

// Example 5: Card with custom middle section
export function CustomMiddleSectionExample() {
    return (
        <HolographicCard
            content={{
                topSection: <div className="text-white font-bold">Title</div>,
                middleSection: (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full" />
                        <div className="text-white text-center">
                            <div className="text-2xl font-bold">Custom</div>
                            <div className="text-sm">Middle Section</div>
                        </div>
                    </div>
                ),
                bottomSection: <div className="text-white">Footer</div>,
            }}
        />
    );
}
