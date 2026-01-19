import { Card, CardHeader, CardTitle, CardContent, CardImage } from "./ui/card";
import Link from "next/link";

type Category = "Component" | "Mobile App" | "Website" | "Web App";

interface Project {
    title: string;
    description: string;
    assetUrl: string;
    assetType: "image" | "video";
    imageAlt: string;
    projectUrl: string;
    date: string;
    category: Category;
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
        assetUrl:
            "https://i.imgur.com/WahCp1L.png",
        assetType: "image" as const,
        imageAlt: "Reports Builder",
        projectUrl: "https://reports-builder.vercel.app/",
        date: "March 2025",
        category: "Web App" as const,
    },

    {
        title: "Referrly",
        description: "The intelligent employee Referral and Rewards Platform",
        assetUrl: "https://i.imgur.com/FpOE3B7.png",
        assetType: "image" as const,
        imageAlt: "Referrly",
        projectUrl: "https://www.referrly.co/",
        date: "November 2023",
        category: "Web App" as const,
    },
    {
        title: "Badyetly",
        description:
            "A platform for working people to track their subscriptions better and achieve financial freedom.",
        assetUrl:
            "https://i.imgur.com/jQlhJto.png",
        assetType: "image" as const,
        imageAlt: "Badyetly - Financial Freedom Platform",
        projectUrl: "https://v0-monthly-dues-tracker.vercel.app",
        date: "July 2025",
        category: "Web App" as const,
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
        category: "Website" as const,
    },
    {
        title: "Datepicker",
        description: "A nice react datepicker.",
        assetUrl: "https://i.imgur.com/D9Xl4mY.mp4",
        assetType: "video" as const,
        imageAlt: "React Datepicker",
        projectUrl: "/showcase/datepicker",
        date: "April 2025",
        category: "Component" as const,
        isInternal: true,
        slug: "datepicker",
    },
    {
        title: "Dynamic Drawer",
        description: "A newly improved interaction for nested drawers.",
        assetUrl: "https://i.imgur.com/j3GWMnX.png",
        assetType: "image" as const,
        imageAlt: "Dynamic Drawer",
        projectUrl: "/showcase/drawer",
        date: "May 2025",
        category: "Component" as const,
        isInternal: true,
        slug: "drawer",
    },
    {
        title: "Shift Center Module",
        description:
            "A comprehensive shift management system that allows users to create custom shifts and assign them to employees efficiently.",
        assetUrl:
            "https://qlvb7icylt05jsqd.public.blob.vercel-storage.com/Portfolio/Timeline%201-aUjxn0rKhHNHJwMdh9ygbwnkH7EjfO.mov",
        assetType: "video" as const,
        imageAlt: "Shift Center Module - Employee Shift Management",
        projectUrl: "/showcase/shift-center",
        date: "October 2025",
        category: "Web App" as const,
        isInternal: true,
        slug: "shift-center",
    },
    {
        title: "Sprout Design System",
        description:
            "A design system for a company that provides a set of guidelines for creating consistent and user-friendly interfaces. Made in Vue.",
        assetUrl:
            "https://i.imgur.com/7Wl1K3o.png",
        assetType: "image" as const,
        imageAlt: "Sprout Design System",
        projectUrl: "https://jolly-rock-0e7e9fa00.5.azurestaticapps.net/",
        date: "June 2025",
        category: "Component" as const,
    },

    // Add more projects here as needed
].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

// Category color mapping for chips
const categoryColors: Record<Category, string> = {
    Component: "bg-blue-100 text-blue-800",
    "Mobile App": "bg-green-100 text-green-800",
    Website: "bg-purple-100 text-purple-800",
    "Web App": "bg-orange-100 text-orange-800",
};

export function ShowcaseProjects() {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-2 xl:columns-2 2xl:columns-3 gap-6 space-y-0">
            {projects.map((project, index) => (
                <div key={index} className="break-inside-avoid mb-6">
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
    // Helper function to detect if URL is a video based on file extension
    const isVideoUrl = (url: string): boolean => {
        const videoExtensions = [
            ".mp4",
            ".mov",
            ".webm",
            ".avi",
            ".mkv",
            ".m4v",
        ];
        return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    };

    // Determine if this should be rendered as video based on assetType or URL
    const shouldRenderAsVideo =
        project.assetType === "video" || isVideoUrl(project.assetUrl);

    return (
        <div className="w-full h-full overflow-hidden rounded-lg border border-gray-200 bg-white text-card-foreground flex flex-col group transition-shadow duration-200 ease-in-out hover:shadow-md">
            <div className="aspect-video overflow-hidden">
                {shouldRenderAsVideo ? (
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        src={project.assetUrl}
                        aria-label={project.imageAlt}
                        width={1280}
                        height={720}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={project.assetUrl}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover"
                        width={1280}
                        height={720}
                    />
                )}
            </div>
            <div className="border-t border-gray-200" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground flex-1">
                        {project.title}
                    </h3>
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                            categoryColors[project.category]
                        }`}
                    >
                        {project.category}
                    </span>
                </div>
                <span className="text-md text-muted-foreground mb-2">
                    {project.date}
                </span>
                <p className="text-foreground text-md flex-grow">
                    {project.description}
                </p>
            </div>
        </div>
    );
}
