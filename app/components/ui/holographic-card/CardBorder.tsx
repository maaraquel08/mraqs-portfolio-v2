interface CardBorderProps {
  className?: string;
  borderColor?: string;
  borderWidth?: number;
}

export default function CardBorder({
  className = "",
  borderColor = "border-white/20",
  borderWidth = 2,
}: CardBorderProps) {
  return (
    <div
      className={`absolute inset-0 z-[12] rounded-2xl ${borderColor} ${className}`}
      style={{
        borderWidth: `${borderWidth}px`,
      }}
    />
  );
}

