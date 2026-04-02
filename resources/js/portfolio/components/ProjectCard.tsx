import React, { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { PortfolioItem } from "../types";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type ProjectCardProps = {
    project: PortfolioItem;
    isActive?: boolean;
    onClick?: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive = true, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
            ref={cardRef}
            onClick={handleActivate}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={isActive ? { rotateX, rotateY, transformPerspective: 1200 } : {}}
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 30 : 10,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`group rounded-3xl overflow-hidden flex flex-col h-[420px] md:h-[480px] w-full max-w-[22rem]
                mx-auto relative will-change-transform
                ${isActive ? "cursor-pointer" : "cursor-pointer"}`}
        >
            {/* Animated Gradient Border (Creative 3D) */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#EAD7BB] via-transparent to-[#C2996B] p-[1px] z-0">
                {/* Background base */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-3xl h-full w-full" />
            </div>

            {/* Dynamic Glare Effect */}
            {isActive && (
                <motion.div
                    className="pointer-events-none absolute inset-0 z-50 rounded-3xl mix-blend-overlay"
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
                        opacity: 0.4
                    }}
                />
            )}

            {/* Background Image Area (Glassmorphism look) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F9F7F5] to-white" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            {/* Content Container with 3D Pop (TranslateZ effect) */}
            <div
                className="relative z-10 p-6 flex flex-col h-full [transform-style:preserve-3d]"
            >
                {/* Header */}
                <motion.div
                    className="flex justify-between items-start mb-6"
                    style={isActive ? { transform: "translateZ(30px)" } : {}}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C2996B] bg-[#C2996B]/10 px-4 py-1.5 rounded-full border border-[#C2996B]/20 shadow-sm backdrop-blur-md">
                        {project.category ?? "Project"}
                    </span>
                    {project.link && isActive && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 bg-gradient-to-tr from-[#1A1A1A] to-gray-800 text-[#F2C18D] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-110 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-300 z-50 text-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </motion.div>

                {/* Primary Image / Thumbnail floating out */}
                <motion.div
                    style={isActive ? { transform: "translateZ(60px)" } : {}}
                    className="w-full h-40 md:h-48 rounded-2xl overflow-hidden mb-6 shadow-[0_10px_30px_rgba(194,153,107,0.2)] border border-white/50 bg-[#F9F7F5] relative group/img"
                >
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#F2C18D]/40 to-[#C2996B]/30 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
                            <span className="text-[#C2996B] font-serif italic text-2xl drop-shadow-md">No Image</span>
                        </div>
                    )}
                    {/* Inner sheen on image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Text Info */}
                <motion.div
                    className="flex-grow flex flex-col justify-end"
                    style={isActive ? { transform: "translateZ(40px)" } : {}}
                >
                    <h4 className="text-xl md:text-2xl font-black tracking-tight mb-3 leading-tight text-[#1A1A1A] group-hover:text-[#C2996B] transition-colors duration-300">
                        {project.title}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                        {project.description}
                    </p>
                </motion.div>

                {/* Footer Tags */}
                <motion.div
                    className="mt-6 pt-4 border-t border-[#EAD7BB]/50 flex items-center justify-between"
                    style={isActive ? { transform: "translateZ(20px)" } : {}}
                >
                    <div className="flex gap-2 flex-wrap max-w-full">
                        {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] font-bold text-gray-600 bg-gray-100/80 px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm border border-black/5 hover:bg-[#C2996B] hover:text-white transition-colors duration-300">
                                #{tech}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="text-[10px] font-bold text-gray-400 self-center">+{project.tech.length - 3}</span>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
