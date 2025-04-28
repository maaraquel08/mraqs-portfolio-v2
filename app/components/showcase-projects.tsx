import { Card, CardHeader, CardTitle, CardContent, CardImage } from "./ui/card";
import Link from "next/link";

interface Project {
    title: string;
    description: string;
    assetUrl: string;
    assetType: "image" | "video";
    imageAlt: string;
    projectUrl: string;
    date: string;
    isInternal?: boolean;
    slug?: string;
}

function parseDate(dateStr: string): Date {
    const [month, year] = dateStr.split(" ");
    const monthIndex = new Date(Date.parse(`${month} 1, 2000`)).getMonth();
    return new Date(parseInt(year), monthIndex);
}

const projects: Project[] = [
    {
        title: "Reports Builder",
        description:
            "A feature rich reports builder for an HRIS and Payroll System.",
        assetUrl: "https://i.imgur.com/tMl5IH7.png",
        assetType: "image" as const,
        imageAlt: "Reports Builder",
        projectUrl: "https://reports-builder.vercel.app/",
        date: "March 2025",
    },
    {
        title: "Referrly",
        description: "The intelligent employee Referral and Rewards Platform",
        assetUrl: "https://i.imgur.com/FpOE3B7.png",
        assetType: "image" as const,
        imageAlt: "Referrly",
        projectUrl: "https://www.referrly.co/",
        date: "November 2023",
    },
    {
        title: "Badyetly",
        description:
            "A platform for working people to track their finances better and achieve financial freedom.",
        assetUrl: "https://i.imgur.com/HD6YPeQ.png",
        assetType: "image" as const,
        imageAlt: "Badyetly - Financial Freedom Platform",
        projectUrl: "https://badyetly-mics.vercel.app/accounts",
        date: "January 2025",
    },
    {
        title: "Feliz Jewelry",
        description:
            "A Jewelry Portfolio website with a clean and modern design.",
        assetUrl: "https://i.imgur.com/LJ7Gyx8.png",
        assetType: "image" as const,
        imageAlt: "Feliz Jewelry",
        projectUrl: "https://feliz-jewelry.vercel.app/",
        date: "February 2025",
    },
    {
        title: "Datepicker",
        description: "A nice react datepicker",
        assetUrl: "https://i.imgur.com/D9Xl4mY.mp4",
        assetType: "video" as const,
        imageAlt: "React Datepicker",
        projectUrl: "/showcase/datepicker",
        date: "April 2025",
        isInternal: true,
        slug: "datepicker",
    },

    // Add more projects here as needed
].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

export function ShowcaseProjects() {
    return (
        <div className="grid grid-cols-1 gap-4">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="w-full flex-grow basis-full md:basis-[calc(50%-0.5rem)]"
                >
                    {project.isInternal ? (
                        <Link
                            href={project.projectUrl}
                            className="block w-full h-full no-underline transition-transform duration-300 hover:scale-[1.01]"
                        >
                            <ProjectCard project={project} />
                        </Link>
                    ) : (
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full no-underline transition-transform duration-300 hover:scale-[1.01]"
                        >
                            <ProjectCard project={project} />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="w-full h-full overflow-hidden rounded-lg border border-gray-200 bg-card text-card-foreground flex flex-col group transition-shadow duration-200 ease-in-out hover:shadow-md">
            <div className="aspect-video overflow-hidden">
                {project.assetType === "image" ? (
                    <img
                        src={project.assetUrl}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover"
                        width={1280}
                        height={720}
                    />
                ) : (
                    <video
                        src={project.assetUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={project.imageAlt}
                        width={1280}
                        height={720}
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <div className="border-t border-gray-200" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                </h3>
                <span className="text-md text-muted-foreground">
                    {project.date}
                </span>
                <p className="text-foreground text-md mt-2 flex-grow">
                    {project.description}
                </p>
            </div>
        </div>
    );
}
