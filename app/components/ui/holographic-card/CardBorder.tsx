interface CardBorderProps {
    className?: string;
    borderColor?: string;
    borderWidth?: number;
}

export default function CardBorder({
    className = "",
    borderColor = "border-white/30",
    borderWidth = 6,
}: CardBorderProps) {
    return (
        <>
            {/* Outer border with subtle glow */}
            <div
                className={`absolute inset-0 z-[12] rounded-2xl border ${borderColor} ${className}`}
                style={{
                    borderWidth: `${borderWidth}px`,
                    boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
                }}
            />
            {/* Inner border for depth */}
            <div
                className="absolute inset-[1px] z-[12] rounded-2xl border border-white/10 pointer-events-none"
                style={{
                    boxShadow: `inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
                }}
            />
        </>
    );
}
