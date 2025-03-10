import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardProps = {
    href?: string;
    className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "href">;

function Card({ className, href, ...props }: CardProps) {
    const baseStyles =
        "bg-card text-card-foreground flex flex-col rounded-xl border border-gray-200 transition-all hover:shadow-sm";

    if (href) {
        return (
            <Link href={href} className={cn(baseStyles, className)}>
                <div {...props} />
            </Link>
        );
    }

    return (
        <div
            data-slot="card"
            className={cn(baseStyles, className)}
            {...props}
        />
    );
}

function CardImage({
    src,
    alt,
    className,
    ...props
}: React.ComponentProps<typeof Image>) {
    return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl mb-4">
            <Image
                className={cn("object-cover", className)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={95}
                priority
                {...props}
                alt={alt || "Card image"}
                src={src}
            />
        </div>
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn("flex flex-col gap-1.5 px-6", className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("text-lg leading-none font-semibold", className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6 py-4", className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6", className)}
            {...props}
        />
    );
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardImage,
};
