interface AnimatedGradientProps {
    opacity?: number;
    duration?: number;
}

export default function AnimatedGradient({
    opacity = 40,
    duration = 3,
}: AnimatedGradientProps) {
    return (
        <div
            className="absolute inset-0 z-[3]"
            style={{
                opacity: opacity / 20,
                background: `linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 165, 0, 0.3) 25%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(59, 130, 246, 0.3) 75%,
          rgba(128, 128, 128, 0.3) 100%
        )`,
                backgroundSize: "200% 200%",
                animation: `gradientShift ${duration}s ease infinite`,
            }}
        />
    );
}
