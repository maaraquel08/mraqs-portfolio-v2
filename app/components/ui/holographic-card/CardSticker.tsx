import Image from "next/image";

interface CardStickerProps {
    className?: string;
    size?: number;
}

export default function CardSticker({
    className = "",
    size = 80,
}: CardStickerProps) {
    return (
        <div
            className={`absolute bottom-4 left-4 z-[20] pointer-events-none ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <Image
                src="/images/Sticker.png"
                alt="Sticker"
                width={size}
                height={size}
                className="w-full h-full object-contain drop-shadow-lg"
            />
        </div>
    );
}

