import { Metadata } from "next";
import { ShowcaseProjects } from "../components/showcase-projects";

export const metadata: Metadata = {
    title: "Showcase",
    description: "A showcase of my featured projects and work.",
};

export default function ShowcasePage() {
    return (
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-8">
                <h1 className="font-semibold text-2xl mb-8 tracking-tighter ">
                    Showcase Projects
                </h1>
                <ShowcaseProjects />
            </div>
        </div>
    );
}
