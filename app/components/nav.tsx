import Link from "next/link";

const navItems = {
    "/": {
        name: "home",
        external: false,
    },
    "/blog": {
        name: "blog",
        external: false,
    },
    "https://www.linkedin.com/in/maaraquel/": {
        name: "connect with me",
        external: true,
    },
    "https://drive.google.com/file/d/1G4XkwmpCEOx1W_9fGEuRV6x7MHLhko7B/view": {
        name: "resume",
        external: true,
    },
};

export function Navbar() {
    return (
        <aside className="-ml-[8px] mb-16 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(
                            ([path, { name, external }]) => {
                                if (external) {
                                    return (
                                        <a
                                            key={path}
                                            href={path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                                        >
                                            {name}
                                        </a>
                                    );
                                }
                                return (
                                    <Link
                                        key={path}
                                        href={path}
                                        className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                                    >
                                        {name}
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </nav>
            </div>
        </aside>
    );
}
