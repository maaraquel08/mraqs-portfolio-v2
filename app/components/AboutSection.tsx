"use client";

import { useState } from "react";
import { useSound } from "../hooks/useSound";

export default function AboutSection() {
    const [showMore, setShowMore] = useState(false);
    const { playArpeggio } = useSound();

    const handleClick = () => {
        playArpeggio({
            startFrequency: 400,
            endFrequency: 1200,
            noteCount: 8,
            noteDuration: 25,
            type: "sine",
            volume: 0.05,
        });
        setShowMore(!showMore);
    };

    return (
        <>
            <p className="mb-4">
                {`Hey, I'm Michael! I design, I code, and I obsess over how everything in a product connects like a beautifully engineered puzzle (or at least, how it should). As a Design Engineer, I live in Figma and Cursor, constantly validating ideas before they spiral into overcomplicated chaos. My mission? Build great products—the kind that don't just look nice but actually make sense to use.`}
            </p>
            <p className="mb-4">
                {`If you're STILL reading this, either you're genuinely interested, or you're just waiting for a reason to click away. Either way, I appreciate the effort. But if you really want to dive into my nerdy obsessions… `}
                <button
                    className="text-blue-500 underline cursor-pointer hover:text-blue-700 transition-colors"
                    onClick={handleClick}
                >
                    {showMore ? "Show Less" : "Click Here!"}
                </button>
            </p>
            <div
                className={`transition-all duration-300 overflow-hidden ${
                    showMore
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <p className="mb-4">
                    {`I'm deeply into design systems, systems thinking, and system interactions—basically, anything with "system" in it. I believe software shouldn't feel like a collection of random features duct-taped together. Instead, it should be a seamless, interconnected experience where every click, hover, and transition just works. If something feels off, trust me, I will notice (and probably lose sleep over it).`}
                </p>
                <p className="mb-4">
                    {`When I'm not nerding out over product ecosystems, you'll find me outdoors—hiking, doing calisthenics, or staring at the sky like I just discovered the meaning of life. And, of course, Coldplay is my background soundtrack to all of this, because dramatic thinking requires the right music.`}
                </p>
                <p className="mb-4">
                    {`If you love thoughtful design, elegant code, and not breaking user expectations, we'll probably get along. Let's build something that doesn't just work—but works beautifully.`}
                </p>
            </div>
        </>
    );
}
