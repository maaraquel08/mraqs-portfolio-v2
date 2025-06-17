import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "lib/utils";

interface PillHeaderProps {
    title: string;
    author: string;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    activeSectionText?: string;
}

export const PillHeader: React.FC<PillHeaderProps> = ({
    title,
    author,
    isCollapsed,
    onToggleCollapse,
    activeSectionText,
}) => {
    // Animation variants for the text carousel effect
    const textVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <header
            className={cn(
                "flex items-center gap-2 cursor-pointer justify-between w-full"
            )}
            onClick={onToggleCollapse}
            role="button"
            aria-expanded={!isCollapsed}
        >
            <div className="flex items-center gap-2 overflow-hidden mr-2">
                <div
                    className={cn(
                        "self-stretch shrink-0 my-auto bg-gradient-to-br from-purple-500 to-pink-500 transition-all duration-300 ease-in-out",
                        isCollapsed
                            ? "w-6 h-6 rounded-full"
                            : "w-10 h-10 rounded-lg"
                    )}
                    aria-hidden="true"
                ></div>
                <div className="self-stretch flex flex-col items-start justify-center my-auto overflow-hidden">
                    {isCollapsed ? (
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.h2
                                key={activeSectionText || title}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-white text-sm font-medium truncate"
                                title={activeSectionText}
                            >
                                {activeSectionText || title}
                            </motion.h2>
                        </AnimatePresence>
                    ) : (
                        <>
                            <h2 className="text-white text-sm font-medium truncate">
                                {title}
                            </h2>
                            <p className="text-[rgba(150,153,155,1)] text-[13px] font-normal truncate">
                                {author}
                            </p>
                        </>
                    )}
                </div>
            </div>
            {isCollapsed ? (
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
            ) : (
                <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
            )}
        </header>
    );
};
