import Link from "next/link";
import { formatDate, getSortedBlogPosts, Post } from "app/writings/utils";

interface BlogPostsProps {
    posts?: Post[];
}

export function BlogPosts({ posts }: BlogPostsProps = {}) {
    let sortedBlogs = posts || getSortedBlogPosts();

    return (
        <div>
            {sortedBlogs.map((post) => (
                <Link
                    key={post.slug}
                    className="flex flex-col space-y-1 mb-4"
                    href={`/writings/${post.slug}`}
                >
                    <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                        <p className="text-neutral-600 dark:text-neutral-400 w-[160px] tabular-nums shrink-0">
                            {formatDate(post.metadata.publishedAt, false)}
                        </p>
                        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                            {post.metadata.title}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
