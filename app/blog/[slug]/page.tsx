import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import {
    formatDate,
    getSortedBlogPosts,
    getPostBySlug,
    Post,
} from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { serialize } from "next-mdx-remote/serialize";
import { BlogPostNavigation } from "app/components/BlogPostNavigation";
import Link from "next/link";
import { Button } from "app/components/ui/button";
import { CornerUpLeft } from "lucide-react";

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
            url: `${baseUrl}/blog/${params.slug}`,
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

    const mdxSource = await serialize(post.content, {
        // Add parseFrontmatter: false if frontmatter is already parsed
        // parseFrontmatter: false,
        // Add any MDX options if needed
        // mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    });

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
        url: `${baseUrl}/blog/${params.slug}`,
        author: {
            "@type": "Person",
            name: "My Portfolio",
        },
    };

    return (
        <section>
            <Link
                href="/blog"
                className="inline-block mb-6 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label="Back to Blog list"
            >
                <Button variant="ghost" size="sm">
                    <CornerUpLeft className="mr-1 h-4 w-4" />
                    Back to Blog
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
            <article className="prose prose-neutral dark:prose-invert max-w-none lg:prose-lg">
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
        </section>
    );
}
