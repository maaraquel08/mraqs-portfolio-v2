"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSound } from "@/app/hooks/useSound";
import { Button } from "@/app/components/ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { KeyEsc } from "./keyEsc";

const navItems = {
    "/": {
        name: "home",
        external: false,
    },
    "/writings": {
        name: "writings",
        external: false,
    },
    "/showcase": {
        name: "showcase",
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
    const { playArpeggio } = useSound();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function playClickSound() {
        playArpeggio({
            startFrequency: 1000,
            noteCount: 1,
            noteDuration: 16,
            type: "sine",
            volume: 0.1,
        });
    }

    function handleNavClick() {
        playClickSound();
        setIsMobileMenuOpen(false);
    }

    function toggleMobileMenu() {
        playClickSound();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    function isActive(path: string) {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    }

    function renderLinks(isMobile = false) {
        return Object.entries(navItems).map(
            ([path, { name, external }], index) => {
                const isCurrentPage = !external && isActive(path);

                const baseClasses = `transition-all duration-300 ease-in-out px-3 border-r border-gray-200 last:border-r-0 hover:text-neutral-800 flex relative py-2 items-center gap-2`;
                const mobileBaseClasses = isMobile
                    ? "text-lg py-2 border-r-0"
                    : "";

                const activeClasses = isCurrentPage
                    ? "text-neutral-900 font-medium"
                    : "";

                const mobileAnimationClasses = isMobile
                    ? `transition-all duration-300 ease-out ${
                          isMobileMenuOpen
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-3"
                      }`
                    : "";
                const mobileStyle = isMobile
                    ? { transitionDelay: `${index * 75}ms` }
                    : {};

                const commonClasses = `${baseClasses} ${mobileBaseClasses} ${mobileAnimationClasses} ${activeClasses}`;

                const activeIndicator = isCurrentPage && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                );

                if (external) {
                    return (
                        <a
                            key={path}
                            href={path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleNavClick}
                            className={commonClasses}
                            style={mobileStyle}
                        >
                            {activeIndicator}
                            {name}
                        </a>
                    );
                }
                return (
                    <Link
                        key={path}
                        href={path}
                        onClick={handleNavClick}
                        className={commonClasses}
                        style={mobileStyle}
                    >
                        {activeIndicator}
                        {name}
                    </Link>
                );
            }
        );
    }

    return (
        <aside className="mb-6 tracking-tight">
            <div className="hidden md:block">
                <KeyEsc context="fixed" />
            </div>

            <div className="lg:sticky lg:top-20">
                <div className="md:hidden flex justify-between items-center mb-4">
                    <KeyEsc context="mobileHeader" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <HamburgerMenuIcon className="h-5 w-5" />
                    </Button>
                </div>

                <nav
                    className="hidden md:flex md:flex-row md:items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6"
                    id="desktop-nav"
                >
                    <div className="flex flex-row bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg transition-all duration-300 ease-in-out">
                        {renderLinks(false)}
                    </div>
                </nav>

                <div
                    className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center md:hidden transition-opacity duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                    id="mobile-menu"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) toggleMobileMenu();
                    }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        aria-label="Close navigation menu"
                        className={`absolute top-4 right-4 z-50 transition-opacity duration-300 ease-in-out ${
                            isMobileMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Cross1Icon className="h-5 w-5" />
                    </Button>
                    <nav className="flex flex-col items-center space-y-4">
                        {renderLinks(true)}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
