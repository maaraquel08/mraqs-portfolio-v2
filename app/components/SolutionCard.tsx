"use client";

import { Lightbulb } from "lucide-react";

interface SolutionCardProps {
    number: number;
    title: string;
    description: string;
}

export function SolutionCard({
    number,
    title,
    description,
}: SolutionCardProps) {
    return (
        <div className="bg-neutral-50 rounded-xl p-6 shadow-sm ">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-neutral-600 text-sm font-medium">
                    Solution #{number}
                </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900">
                {title}
            </h3>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
    );
}
