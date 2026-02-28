import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Breadcrumbs from "./Breadcrumbs";
import { PortfolioItem } from "../types";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

export type ProjectsSectionProps = {
    projects: PortfolioItem[];
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        if (!projects.length) return;
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleNext = () => {
        if (!projects.length) return;
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = Math.abs(offset.x) * velocity.x;

        // Jika digeser cukup jauh ke kiri (Next)
        if (swipe < -100 || offset.x < -100) {
            handleNext();
        }
        // Jika digeser cukup jauh ke kanan (Prev)
        else if (swipe > 100 || offset.x > 100) {
            handlePrev();
        }
    };

    // Helper functions to calculate properties for the 3D cover flow effect
    const getCardStyles = (index: number) => {
        const offset = index - activeIndex;
        // Adjust offset for circular logic to find the shortest path
        let adjustedOffset = offset;
        const halfLen = Math.floor(projects.length / 2);

        if (offset > halfLen) adjustedOffset -= projects.length;
        if (offset < -halfLen) adjustedOffset += projects.length;

        const isCenter = adjustedOffset === 0;
        const absOffset = Math.abs(adjustedOffset);

        // Calculate translateX based on position
        // Cards further away move further out, but distance diminishes
        const translateX = adjustedOffset * 35; // sedikit disesuaikan agar swipe tidak terlalu rapat
        const rotateY = adjustedOffset * -15; // Rotate towards center
        const translateZ = absOffset * -100; // Push back non-center cards
        const zIndex = projects.length - absOffset;

        return {
            x: `${translateX}%`,
            z: translateZ,
            rotateY: rotateY,
            scale: isCenter ? 1 : Math.max(0.65, 1 - absOffset * 0.15),
            opacity: isCenter ? 1 : Math.max(0, 1 - absOffset * 0.4),
            zIndex: zIndex,
        };
    };

    return (
        <section id="work" className="py-24 px-4 overflow-hidden bg-gradient-to-b from-[#F9F7F5] to-white border-y border-[#EAD7BB]/30">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center mb-10 text-center">
                    <Breadcrumbs items={[{ title: 'Home', href: '/' }, { title: 'Projects' }]} />
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4 mb-4">
                        FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2996B] to-[#F2C18D]">WORKS.</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-lg">
                        A curated selection of my recent projects, blending functional development with clean interfaces.
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div
                    ref={containerRef}
                    className="relative h-[500px] md:h-[550px] w-full flex items-center justify-center perspective-[1000px] mb-12"
                >
                    {projects.length > 0 ? (
                        projects.map((project, index) => {
                            const styles = getCardStyles(index);
                            return (
                                <motion.div
                                    key={project.title}
                                    className="absolute w-[90%] sm:w-[70%] md:w-[50%] max-w-[400px]"
                                    initial={false}
                                    animate={{
                                        x: styles.x,
                                        z: styles.z,
                                        rotateY: styles.rotateY,
                                        scale: styles.scale,
                                        opacity: styles.opacity,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    style={{
                                        zIndex: styles.zIndex,
                                    }}
                                    drag={activeIndex === index ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.4}
                                    onDragEnd={onDragEnd}
                                >
                                    <ProjectCard
                                        project={project}
                                        isActive={activeIndex === index}
                                        onClick={() => handleCardClick(index)}
                                    />
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-gray-400">No projects available.</div>
                    )}
                </div>

                {/* Navigation Controls (Dipindahkan ke bawah) */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={projects.length <= 1}
                        className="h-12 w-12 rounded-full bg-white border border-[#EAD7BB] shadow-sm flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F2C18D] transition-all hover:-translate-x-1"
                        aria-label="Previous project"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div className="flex gap-2">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleCardClick(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-[#C2996B] w-8" : "bg-[#EAD7BB]/50 w-2 hover:bg-[#C2996B]/50"}`}
                                aria-label={`Go to project ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={projects.length <= 1}
                        className="h-12 w-12 rounded-full bg-white border border-[#EAD7BB] shadow-sm flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F2C18D] transition-all hover:translate-x-1"
                        aria-label="Next project"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;

