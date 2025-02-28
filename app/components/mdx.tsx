"use client";

import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { highlight } from "sugar-high";
import { createElement } from "react";
import { ImageBlock, VideoBlock } from "./mdx-components/media";
import { ImageCarousel } from "./ImageCarousel";
import { ChallengeCard } from "./ChallengeCard";
import { SolutionCard } from "./SolutionCard";
import { GallerySlideshow } from "./GallerySlideshow";

function Table({ data }) {
    let headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function CustomLink({ href, ...props }) {
    if (href?.startsWith("/")) {
        return (
            <Link
                href={href}
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-800 transition-all"
            >
                {props.children}
            </Link>
        );
    }

    if (href?.startsWith("#")) {
        return (
            <a
                href={href}
                {...props}
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-800 transition-all"
            />
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-800 transition-all"
            {...props}
        />
    );
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
    let codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
    const Heading = ({ children }) => {
        let slug = slugify(children);
        return createElement(`h${level}`, { id: slug }, [
            createElement("a", {
                href: `#${slug}`,
                key: `link-${slug}`,
                className: "anchor",
            }),
            children,
        ]);
    };

    Heading.displayName = `Heading${level}`;

    return Heading;
}

const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    code: Code,
    Table,
    ImageBlock,
    VideoBlock,
    ImageCarousel,
    ChallengeCard,
    SolutionCard,
    GallerySlideshow,
};

export function CustomMDX({ source }) {
    return <MDXRemote {...source} components={components} />;
}
