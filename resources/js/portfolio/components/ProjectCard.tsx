import React from "react";
import { ArrowRight, Github } from "lucide-react";
import { PortfolioItem } from "../types";

export type ProjectCardProps = {
    project: PortfolioItem;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const handleActivate = () => {
        if (!project.link) return;
        window.open(project.link, "_blank", "noopener,noreferrer");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!project.link) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
        }
    };

    return (
        <div
            onClick={project.link ? handleActivate : undefined}
            onKeyDown={project.link ? handleKeyDown : undefined}
            role={project.link ? "link" : undefined}
            tabIndex={project.link ? 0 : undefined}
            className={`group bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden hover:shadow-lg hover:border-[#F2C18D] transition-all duration-300 flex flex-col h-full ${project.link ? "cursor-pointer" : ""}`}
        >
            <div className="relative h-40 overflow-hidden bg-gray-100 border-b border-[#F5F5F5]">
                <div className="absolute inset-0 bg-[#1A1A1A]/5 group-hover:bg-transparent transition-colors z-10" />
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F2C18D]/50 to-[#C2996B]/40 flex items-center justify-center">
                        <span className="text-[#1A1A1A] font-black text-lg text-center px-6 leading-tight">{project.title}</span>
                    </div>
                )}
                {project.link && (
                    <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:text-[#C2996B] hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={14} />
                        </a>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#C2996B] bg-[#F9F7F5] px-2 py-0.5 rounded-md">{project.category ?? "Project"}</span>
                </div>
                <h4 className="text-base font-black tracking-tight mb-2 leading-tight group-hover:text-[#C2996B] transition-colors">{project.title}</h4>
                <p className="text-gray-500 mb-3 text-[10px] leading-relaxed line-clamp-3">{project.description}</p>

                <div className="mt-auto pt-3 border-t border-[#F5F5F5] flex items-center justify-between">
                    <div className="flex gap-2">
                        {project.tech.map((tech) => (
                            <span key={tech} className="text-[8px] font-bold text-gray-400">
                                #{tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#C2996B]">
                        View <ArrowRight size={10} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
