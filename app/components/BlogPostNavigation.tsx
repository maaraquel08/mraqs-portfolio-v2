import Link from "next/link";
import React from "react";

interface PostLink {
    slug: string;
    title: string;
}

interface BlogPostNavigationProps {
    previousPost?: PostLink;
    nextPost?: PostLink;
}

export function BlogPostNavigation({
    previousPost,
    nextPost,
}: BlogPostNavigationProps) {
    if (!previousPost && !nextPost) {
        return null; // Don't render if there's no prev or next
    }

    return (
        <nav className="mt-12 border-t border-neutral-200 dark:border-neutral-700 pt-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="text-left">
                    {previousPost ? (
                        <Link
                            href={`/blog/${previousPost.slug}`}
                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            <span className="block text-sm mb-1">Previous</span>
                            <span className="font-medium">
                                {previousPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div /> // Placeholder for grid layout
                    )}
                </div>
                <div className="text-right">
                    {nextPost ? (
                        <Link
                            href={`/blog/${nextPost.slug}`}
                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            <span className="block text-sm mb-1">Next</span>
                            <span className="font-medium">
                                {nextPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div /> // Placeholder for grid layout
                    )}
                </div>
            </div>
        </nav>
    );
}
