"use client";

import dynamic from "next/dynamic";
import { formatDate, Post } from "app/writings/utils";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { ImageCarousel } from "./ImageCarousel";
import { ChallengeCard } from "./ChallengeCard";
import { SolutionCard } from "./SolutionCard";

const CustomMDX = dynamic(
    () => import("app/components/mdx").then((mod) => mod.CustomMDX),
    {
        ssr: false,
    }
);

const components = {
    ImageCarousel,
    ChallengeCard,
    SolutionCard,
};

interface BlogContentProps {
    post: Post;
    mdxSource: MDXRemoteSerializeResult;
}

export function BlogContent({ post, mdxSource }: BlogContentProps) {
    return (
        <section className="max-w-2xl mx-auto py-8">
            <h1 className="title font-semibold text-2xl tracking-tighter mb-4">
                {post.metadata.title}
            </h1>
            <div className="flex justify-between items-center mb-8 text-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt)}
                </p>
            </div>
            <article className="prose dark:prose-invert max-w-none">
                <MDXRemote {...mdxSource} components={components} />
            </article>
        </section>
    );
}
