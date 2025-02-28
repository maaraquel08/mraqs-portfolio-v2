import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { serialize } from "next-mdx-remote/serialize";

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }> | { slug: string };
}) {
    const resolvedParams = await params;
    const posts = await getBlogPosts();
    const post = posts.find((post) => post.slug === resolvedParams.slug);

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
            url: `${baseUrl}/blog/${resolvedParams.slug}`,
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

export default async function Blog({
    params,
}: {
    params: Promise<{ slug: string }> | { slug: string };
}) {
    const resolvedParams = await params;
    const posts = await getBlogPosts();
    const post = posts.find((post) => post.slug === resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const mdxSource = await serialize(post.content, {
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
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
        url: `${baseUrl}/blog/${resolvedParams.slug}`,
        author: {
            "@type": "Person",
            name: "My Portfolio",
        },
    };

    return (
        <section className="max-w-2xl mx-auto py-8">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <h1 className="title font-semibold text-2xl tracking-tighter mb-4">
                {post.metadata.title}
            </h1>
            <div className="flex justify-between items-center mb-8 text-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt)}
                </p>
            </div>
            <article className="prose dark:prose-invert max-w-none">
                <CustomMDX source={mdxSource} />
            </article>
        </section>
    );
}
