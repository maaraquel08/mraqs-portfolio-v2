interface CardBackgroundProps {
    className?: string;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
}

export default function CardBackground({
    className = "",
    gradientFrom = "from-slate-900",
    gradientVia = "via-gray-900",
    gradientTo = "to-white-900",
}: CardBackgroundProps) {
    return (
        <div
            className={`absolute inset-0 z-0 bg-linear-to-br ${gradientFrom} ${gradientVia} ${gradientTo} ${className}`}
        />
    );
}
