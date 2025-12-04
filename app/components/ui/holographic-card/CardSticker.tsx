import Image from "next/image";

interface CardStickerProps {
    className?: string;
    size?: number;
    isMobile?: boolean;
}

export default function CardSticker({
    className = "",
    size = 80,
    isMobile = false,
}: CardStickerProps) {
    const stickerSize = isMobile ? size * 0.6 : size;
    return (
        <div
            className={`absolute bottom-2 left-2 md:bottom-4 md:left-4 z-[20] pointer-events-none ${className}`}
            style={{
                width: `${stickerSize}px`,
                height: `${stickerSize}px`,
            }}
        >
            <Image
                src="/images/Sticker.png"
                alt="Sticker"
                width={stickerSize}
                height={stickerSize}
                className="w-full h-full object-contain drop-shadow-lg"
            />
        </div>
    );
}

