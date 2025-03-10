import { Card, CardHeader, CardTitle, CardContent, CardImage } from "./ui/card";

interface Project {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    projectUrl: string;
}

const projects: Project[] = [
    {
        title: "Badyetly",
        description:
            "A platform for working people to track their finances better and achieve financial freedom.",
        imageUrl: "https://i.imgur.com/HD6YPeQ.png",
        imageAlt: "Badyetly - Financial Freedom Platform",
        projectUrl: "https://badyetly-mics.vercel.app/accounts",
    },
    {
        title: "Reports Builder",
        description:
            "A feature rich reports builder for an HRIS and Payroll System.",
        imageUrl: "https://i.imgur.com/tMl5IH7.png",
        imageAlt: "Reports Builder",
        projectUrl: "https://reports-builder.vercel.app/",
    },
    {
        title: "Feliz Jewelry",
        description:
            "A Jewelry Portfolio website with a clean and modern design.",
        imageUrl: "https://i.imgur.com/LJ7Gyx8.png",
        imageAlt: "Feliz Jewelry",
        projectUrl: "https://feliz-jewelry.vercel.app/",
    },

    // Add more projects here as needed
];

export function ShowcaseProjects() {
    return (
        <div className="flex flex-wrap gap-4">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="w-full flex-grow basis-full md:basis-[calc(50%-0.5rem)]"
                >
                    <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full no-underline"
                    >
                        <Card className="h-full group cursor-pointer">
                            <CardImage
                                src={project.imageUrl}
                                alt={project.imageAlt}
                                className="w-full aspect-video object-cover mb-4"
                            />
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground group-hover:text-muted-foreground/80">
                                    {project.description}
                                </p>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            ))}
        </div>
    );
}
