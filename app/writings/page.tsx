import { BlogPosts } from "app/components/posts";
import { getBlogPosts, getCaseStudyPosts } from "app/writings/utils";

export const metadata = {
    title: "Blog & Case Studies",
    description: "Read my blog posts and explore my case studies.",
};

export default function Page() {
    const blogPosts = getBlogPosts();
    const caseStudyPosts = getCaseStudyPosts();

    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
                Writings
            </h1>

            {/* Case Studies Section */}
            {caseStudyPosts.length > 0 && (
                <div className="mb-12">
                    <h2 className="font-semibold text-xl mb-6 tracking-tight text-neutral-800 dark:text-neutral-200">
                        Case Studies
                    </h2>
                    <BlogPosts posts={caseStudyPosts} />
                </div>
            )}

            {/* Blog Posts Section */}
            {blogPosts.length > 0 && (
                <div>
                    <h2 className="font-semibold text-xl mb-6 tracking-tight text-neutral-800 dark:text-neutral-200">
                        Blog Posts
                    </h2>
                    <BlogPosts posts={blogPosts} />
                </div>
            )}
        </section>
    );
}
