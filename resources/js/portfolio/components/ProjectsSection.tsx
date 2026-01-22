import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Breadcrumbs from "./Breadcrumbs";
import { PortfolioItem } from "../types";

export type ProjectsSectionProps = {
    projects: PortfolioItem[];
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const sync = () => setIsMobileView(mediaQuery.matches);
        sync();

        const listener = (event: MediaQueryListEvent) => setIsMobileView(event.matches);

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", listener);
            return () => mediaQuery.removeEventListener("change", listener);
        }

        mediaQuery.addListener(listener);
        return () => mediaQuery.removeListener(listener);
    }, []);

    useEffect(() => {
        const maxIndex = Math.max(projects.length - 1, 0);
        setActiveIndex((prev) => Math.min(prev, maxIndex));
    }, [projects.length]);

    useEffect(() => {
        if (!isMobileView) {
            setActiveIndex(0);
        }
    }, [isMobileView]);

    const handlePrev = () => {
        if (!projects.length) return;
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleNext = () => {
        if (!projects.length) return;
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    return (
        <section id="work" className="py-16 px-6 md:px-5 bg-[#F9F7F5] border-y border-[#EAD7BB]/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
                    <div>
                        <Breadcrumbs items={[{ title: 'Home', href: '/' }, { title: 'Projects' }]} />
                        <h2 className="text-3xl font-black tracking-tighter">
                            PROJECTS<span className="text-[#F2C18D]">.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block h-[1px] bg-[#EAD7BB] flex-grow ml-6 mb-1" />
                </div>

                {isMobileView && projects.length ? (
                    <div className="space-y-4">
                        <ProjectCard project={projects[activeIndex]} />
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.35em] text-[#C2996B]">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={projects.length <= 1}
                                className="h-10 w-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-sm transition-colors hover:border-[#F2C18D] disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Previous project"
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <div className="text-[10px] tracking-[0.45em]">
                                {activeIndex + 1}/{projects.length}
                            </div>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={projects.length <= 1}
                                className="h-10 w-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-sm transition-colors hover:border-[#F2C18D] disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Next project"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;

