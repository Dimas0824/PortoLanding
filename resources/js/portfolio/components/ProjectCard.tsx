import React from "react";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { PortfolioItem } from "../types";
import { motion } from "framer-motion";

export type ProjectCardProps = {
    project: PortfolioItem;
    isActive?: boolean;
    onClick?: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive = true, onClick }) => {
    const handleActivate = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (!isActive && onClick) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
            return;
        }

        if (!project.link) return;
        window.open(project.link, "_blank", "noopener,noreferrer");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            handleActivate(e);
        }
    };

    return (
        <motion.div
            onClick={handleActivate}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 30 : 10,
                rotateY: isActive ? 0 : 0 // Can play with slight rotation if desired
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`group bg-white rounded-[24px] border border-[#EAD7BB]/60 overflow-hidden
                transition-shadow duration-500 flex flex-col h-[400px] md:h-[450px] w-full max-w-sm
                mx-auto relative
                ${isActive ? "shadow-[0_20px_50px_-20px_rgba(194,153,107,0.3)] cursor-pointer" : "cursor-pointer"}`}
        >
            {/* Background Image Area (Glassmorphism look) */}
            <div className="absolute inset-0 z-0">
                {project.image ? (
                    <>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/70 backdrop-blur-[2px]" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F9F7F5] to-white" />
                )}
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-6 flex flex-col h-full">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C2996B] bg-[#C2996B]/10 px-3 py-1 rounded-full border border-[#C2996B]/20">
                        {project.category ?? "Project"}
                    </span>
                    {project.link && isActive && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 bg-[#1A1A1A] text-[#F2C18D] rounded-full flex items-center justify-center shadow-lg hover:bg-[#F2C18D] hover:text-[#1A1A1A] transition-all -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>

                {/* Primary Image / Thumbnail inside */}
                <div className="w-full h-36 md:h-44 rounded-2xl overflow-hidden mb-6 shadow-sm border border-black/5 bg-gray-100/50">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F2C18D]/30 to-[#C2996B]/20 flex items-center justify-center">
                            <span className="text-[#C2996B] font-serif italic text-2xl">No Image</span>
                        </div>
                    )}
                </div>

                {/* Text Info */}
                <div className="flex-grow">
                    <h4 className="text-xl md:text-2xl font-black tracking-tight mb-3 leading-tight text-[#1A1A1A]">
                        {project.title}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Footer Tags */}
                <div className="mt-4 pt-4 border-t border-[#EAD7BB]/40 flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap max-w-[80%]">
                        {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                #{tech}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="text-[9px] font-bold text-gray-400">+{project.tech.length - 3}</span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
