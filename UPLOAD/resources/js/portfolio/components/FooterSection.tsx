import React from "react";
import { ContactInfo } from "../types";

export type FooterSectionProps = {
    contacts: ContactInfo;
};

const FooterSection: React.FC<FooterSectionProps> = ({ contacts }) => (
    <footer className="py-12 border-t border-[#E5E5E5] bg-[#FDFCFB] text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C2996B]">© 2025 Crafted with Anu hehe</p>
            <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {contacts.instagram && (
                    <a href={contacts.instagram} className="hover:text-[#1A1A1A]" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                )}
                {contacts.linkedin && (
                    <a href={contacts.linkedin} className="hover:text-[#1A1A1A]" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                )}
                {contacts.github && (
                    <a href={contacts.github} className="hover:text-[#1A1A1A]" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                )}
            </div>
        </div>
    </footer>
);

export default FooterSection;
