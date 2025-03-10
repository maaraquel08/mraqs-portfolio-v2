import { Metadata } from "next";
import { ShowcaseProjects } from "../components/showcase-projects";

export const metadata: Metadata = {
    title: "Showcase",
    description: "A showcase of my featured projects and work.",
};

export default function ShowcasePage() {
    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
                Showcase
            </h1>
            <ShowcaseProjects />
        </section>
    );
}
