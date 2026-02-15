import React from "react";
import { Github } from "lucide-react";
import { Profile } from "../types";

export type NavbarProps = {
    profile: Profile;
};

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
    const initial = profile.name?.[0]?.toUpperCase() ?? "P";

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-[#EAD7BB]/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#F2C18D] rounded-lg rotate-12 flex items-center justify-center text-white">{initial}</div>
                    <span>{profile.name}</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                    <a href="#work" className="hover:text-[#C2996B] transition-colors">
                        Work
                    </a>
                    <a href="#expertise" className="hover:text-[#C2996B] transition-colors">
                        Expertise
                    </a>
                    <a href="#contact" className="hover:text-[#C2996B] transition-colors">
                        Contact
                    </a>
                    {profile.contacts.github && (
                        <a
                            href={profile.contacts.github}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#1A1A1A] text-white px-5 py-2 rounded-lg hover:bg-[#F2C18D] hover:text-[#1A1A1A] transition-all duration-300 font-black shadow-[3px_3px_0px_0px_rgba(242,193,141,1)]"
                        >
                            GITHUB
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
