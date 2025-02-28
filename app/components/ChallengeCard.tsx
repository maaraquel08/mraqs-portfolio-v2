"use client";

import { Flag } from "lucide-react";

interface ChallengeCardProps {
    number: number;
    title: string;
    description: string;
}

export function ChallengeCard({
    number,
    title,
    description,
}: ChallengeCardProps) {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                    Challenge #{number}
                </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                {title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
