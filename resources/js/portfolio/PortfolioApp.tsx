import React, { useEffect, useMemo, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import MarqueeStrip from "./components/MarqueeStrip";
import ExpertiseSection from "./components/ExpertiseSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import Navbar from "./components/Navbar";
import NoiseOverlay from "./components/NoiseOverlay";
import StyleOverrides from "./components/StyleOverrides";
import { ExpertiseGroup, PortfolioItem, Profile, Skills } from "./types";

export type PortfolioAppProps = {
    profile: Profile;
    skills: Skills;
    portfolios: PortfolioItem[];
};

const normalizeExpertise = (skills: Skills): ExpertiseGroup[] =>
    Object.entries(skills).map(([category, items]) => ({ category, items }));

const normalizeProjects = (projects: PortfolioItem[]): PortfolioItem[] =>
    projects.map((project) => ({
        ...project,
        category: project.category ?? project.tech[0] ?? "Project",
    }));

const PortfolioApp: React.FC<PortfolioAppProps> = ({ profile, skills, portfolios }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    const expertiseGroups = useMemo(() => normalizeExpertise(skills), [skills]);
    const projects = useMemo(() => normalizeProjects(portfolios), [portfolios]);

    useEffect(() => {
        setIsVisible(true);
        const handleMouseMove = (event: MouseEvent) => setMousePos({ x: event.clientX, y: event.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-[#F2C18D]">
            <NoiseOverlay />
            <CustomCursor mousePos={mousePos} />

            <header>
                <Navbar profile={profile} />
                <HeroSection profile={profile} isVisible={isVisible} />
            </header>

            <main>
                <MarqueeStrip items={profile.passion ?? []} />
                <ExpertiseSection expertiseGroups={expertiseGroups} />
                <ProjectsSection projects={projects} />
                <ContactSection contacts={profile.contacts} name={profile.name} />
            </main>

            <footer>
                <FooterSection contacts={profile.contacts} />
            </footer>

            <StyleOverrides />
        </div>
    );
};

export default PortfolioApp;
