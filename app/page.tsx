import { BlogPosts } from "app/components/posts";
import SplineViewer from "./components/SplineViewer";
import AboutSection from "./components/AboutSection";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                My Portfolio
            </h1>
            <div className="h-[500px] w-full">
                <SplineViewer url="https://prod.spline.design/OayK2citpuxtj5YZ/scene.splinecode" />
            </div>
            <AboutSection />
            <div className="my-8">
                <BlogPosts />
            </div>
        </section>
    );
}
