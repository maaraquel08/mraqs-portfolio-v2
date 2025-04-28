"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface Section {
    id: string;
    text: string;
}

interface PillBodyProps {
    sections: Section[];
    activeSectionId: string | null;
    onSectionClick: (id: string) => void;
}

export const PillBody: React.FC<PillBodyProps> = ({
    sections,
    activeSectionId,
    onSectionClick,
}) => {
    useEffect(() => {
        if (activeSectionId) {
            const element = document.getElementById(
                `pill-section-${activeSectionId}`
            );
            element?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
        }
    }, [activeSectionId]);

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        event.preventDefault();
        onSectionClick(id);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const itemVariants = {
        active: {
            opacity: 1,
            scale: 1,
            color: "rgba(255, 255, 255, 1)",
            transition: { type: "tween", duration: 0.3, ease: "backInOut" },
        },
        inactive: {
            opacity: 0.5,
            scale: 1,
            color: "rgba(150, 153, 155, 1)",
            transition: { type: "tween", duration: 0.3, ease: "backInOut" },
        },
        inactiveHover: {
            opacity: 0.75,
            color: "rgba(225, 225, 225, 0.8)",
            scale: 1,
            transition: { type: "tween", duration: 0.3, ease: "backInOut" },
        },
    };

    return (
        <div className="flex w-full flex-col overflow-hidden text-[14px] font-normal mt-4">
            <nav
                className="relative z-10 max-w-full py-2 overflow-y-auto h-[120px] 
                           snap-y snap-mandatory scrollbar-hide 
                           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
                           [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]
                           [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]"
                aria-label="Article sections"
            >
                <div></div>
                {sections.map((section) => {
                    const isActive = section.id === activeSectionId;
                    return (
                        <motion.a
                            key={section.id}
                            id={`pill-section-${section.id}`}
                            href={`#${section.id}`}
                            onClick={(e) => handleClick(e, section.id)}
                            className="block cursor-pointer py-1.5 text-left focus:outline-none rounded-sm snap-center"
                            variants={itemVariants}
                            initial={false}
                            animate={isActive ? "active" : "inactive"}
                            whileHover={!isActive ? "inactiveHover" : ""}
                        >
                            {section.text}
                        </motion.a>
                    );
                })}
            </nav>
        </div>
    );
};
