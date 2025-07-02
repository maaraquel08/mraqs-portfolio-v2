import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import {
    formatDate,
    getSortedBlogPosts,
    getPostBySlug,
    Post,
} from "app/writings/utils";
import { baseUrl } from "app/sitemap";
import { serialize } from "next-mdx-remote/serialize";
import { BlogPostNavigation } from "app/components/BlogPostNavigation";
import Link from "next/link";
import { Button } from "app/components/ui/button";
import { CornerUpLeft } from "lucide-react";
import DynamicPill from "app/components/ui/dynamic-pill/dynamic-pill";
import rehypeSlug from "rehype-slug";
import toc from "@jsdevtools/rehype-toc";

// Helper function to format seconds into MM:SS
function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
}

// Helper function to estimate reading time
function calculateReadingTime(content: string): string {
    if (!content) return "00:00";
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ""); // Basic HTML tag removal
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = wordCount / wordsPerMinute;
    const totalSeconds = minutes * 60;
    return formatTime(totalSeconds);
}

interface Section {
    id: string;
    text: string;
}

interface PageParams {
    slug: string;
}

interface GenerateMetadataParams {
    params: PageParams;
}

interface BlogPageProps {
    params: PageParams;
}

export async function generateStaticParams(): Promise<PageParams[]> {
    const sortedPosts = getSortedBlogPosts();
    return sortedPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist.",
        };
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata;

    const ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `${baseUrl}/writings/${params.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function Blog({ params }: BlogPageProps) {
    const sortedPosts = getSortedBlogPosts();

    const currentPostIndex = sortedPosts.findIndex(
        (p) => p.slug === params.slug
    );

    if (currentPostIndex === -1) {
        notFound();
    }

    const post: Post = sortedPosts[currentPostIndex];

    const previousPost: Post | undefined = sortedPosts[currentPostIndex + 1];
    const nextPost: Post | undefined = sortedPosts[currentPostIndex - 1];

    let tableOfContents: any[] = [];

    const mdxSource = await serialize(post.content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [
                    toc,
                    {
                        headings: ["h2", "h3"],
                        customizeTOC: (tocResult) => {
                            tableOfContents =
                                tocResult?.children?.[0]?.children || [];
                            return false;
                        },
                    },
                ],
            ],
        },
    });

    const sections: Section[] = tableOfContents
        .map((item: any, index: number): Section | null => {
            const linkElement = item?.children?.[0];
            if (linkElement?.tagName !== "a") return null;

            const text =
                linkElement?.children?.[0]?.value || "Untitled Section";
            const href = linkElement?.properties?.href;
            const id = href?.startsWith("#")
                ? href.substring(1)
                : `section-${index}`;

            if (text === "Untitled Section" || !href) return null;

            return {
                id: id,
                text: text,
            };
        })
        .filter((item): item is Section => item !== null);

    // Calculate total reading time
    const totalTime = calculateReadingTime(post.content);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.metadata.title,
        datePublished: post.metadata.publishedAt,
        dateModified: post.metadata.publishedAt,
        description: post.metadata.summary,
        image: post.metadata.image
            ? `${baseUrl}${post.metadata.image}`
            : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
        url: `${baseUrl}/writings/${params.slug}`,
        author: {
            "@type": "Person",
            name: "My Portfolio",
        },
    };

    return (
        <section>
            <Link
                href="/writings"
                className="inline-block mb-6 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label="Back to Writings list"
            >
                <Button variant="ghost" size="sm">
                    <CornerUpLeft className="mr-1 h-4 w-4" />
                    Back to Writings
                </Button>
            </Link>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                {post.metadata.title}
            </h1>
            <div className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
                <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt)}
                </time>
            </div>
            <article
                className="prose prose-neutral dark:prose-invert max-w-none lg:prose-lg"
                id="blog-content-article"
            >
                <CustomMDX source={mdxSource} />
            </article>

            <BlogPostNavigation
                previousPost={
                    previousPost
                        ? {
                              slug: previousPost.slug,
                              title: previousPost.metadata.title,
                          }
                        : undefined
                }
                nextPost={
                    nextPost
                        ? {
                              slug: nextPost.slug,
                              title: nextPost.metadata.title,
                          }
                        : undefined
                }
            />
            <DynamicPill
                className="fixed bottom-8 left-1/2 -translate-x-1/2"
                title={post.metadata.title}
                author="Michael Anthony Raquel"
                sections={sections}
                totalTime={totalTime}
            />
        </section>
    );
}
