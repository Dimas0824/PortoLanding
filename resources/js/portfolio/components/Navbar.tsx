import React from "react";
import { Github } from "lucide-react";
import { Profile } from "../types";
import { motion } from "framer-motion";

export type NavbarProps = {
    profile: Profile;
};

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
    const initial = profile.name?.[0]?.toUpperCase() ?? "P";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 w-full z-50 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-[#EAD7BB]/50"
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-lg font-black tracking-tighter uppercase flex items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <motion.div
                        initial={{ rotate: 12 }}
                        whileHover={{ rotate: 0, scale: 1.1 }}
                        className="w-7 h-7 bg-gradient-to-tr from-[#C2996B] to-[#F2C18D] rounded-lg rotate-12 flex items-center justify-center text-white shadow-md shadow-[#C2996B]/30"
                    >
                        {initial}
                    </motion.div>
                    <span>{profile.name}</span>
                </motion.div>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                    <motion.a whileHover={{ y: -2 }} href="#work" className="hover:text-[#C2996B] transition-colors">
                        Work
                    </motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#expertise" className="hover:text-[#C2996B] transition-colors">
                        Expertise
                    </motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#contact" className="hover:text-[#C2996B] transition-colors">
                        Contact
                    </motion.a>
                    {profile.contacts.github && (
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={profile.contacts.github}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#1A1A1A] text-white px-5 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#C2996B] hover:to-[#F2C18D] hover:text-white transition-all duration-300 font-black shadow-[3px_3px_0px_0px_rgba(242,193,141,1)] hover:shadow-[5px_5px_0px_0px_rgba(194,153,107,0.5)] border border-[#1A1A1A]"
                        >
                            GITHUB
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
