import { getAllBlogPosts } from "app/writings/utils";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default async function sitemap() {
    let blogs = getAllBlogPosts().map((post) => ({
        url: `${baseUrl}/writings/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }));

    let routes = ["", "/writings"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes, ...blogs];
}
