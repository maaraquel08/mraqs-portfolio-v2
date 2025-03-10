import { BlogPosts } from "app/components/posts";
import SplineViewer from "./components/SplineViewer";
import AboutSection from "./components/AboutSection";
import { ShowcaseProjects } from "./components/showcase-projects";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                My Portfolio
            </h1>
            <div className="h-[500px] w-full pointer-events-none">
                <SplineViewer url="https://prod.spline.design/OayK2citpuxtj5YZ/scene.splinecode" />
            </div>
            <AboutSection />
            <div className="my-8">
                <h1 className="text-2xl font-semibold tracking-tighter mb-4">
                    Showcase
                </h1>
                <ShowcaseProjects />
            </div>
            <div className="my-8">
                <h1 className="text-2xl font-semibold tracking-tighter mb-4">
                    Case Studies
                </h1>
                <BlogPosts />
            </div>
        </section>
    );
}
