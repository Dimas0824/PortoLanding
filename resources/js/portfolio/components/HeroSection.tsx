import React from "react";
import { Layers, Smile, Star, Zap } from "lucide-react";
import AbstractLines from "./AbstractLines";
import ImageCarousel from "./ImageCarousel";
import { Profile } from "../types";

export type HeroSectionProps = {
    profile: Profile;
    isVisible: boolean;
};

const HeroSection: React.FC<HeroSectionProps> = ({ profile, isVisible }) => (
    <section className="relative pt-16 pb-10 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-[34rem] h-[34rem] bg-[#F2C18D]/18 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 right-[-10rem] w-[40rem] h-[40rem] bg-[#C2996B]/12 blur-3xl rounded-full" />
            <div className="absolute top-36 right-[10%] w-3 h-3 rounded-full border border-[#C2996B]/40" />
            <div className="absolute top-48 right-[13%] w-2 h-2 rounded-full bg-[#F2C18D]/50" />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
            <div className={`lg:col-span-7 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} mt-10`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[2px] bg-[#C2996B]" />
                    <span className="text-[#C2996B] text-[10px] font-black uppercase tracking-[0.4em]">{profile.title}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6 max-w-3xl">
                    {profile.name}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2996B] to-[#F2C18D] italic font-serif px-1">{profile.philosophy ?? "Build with character."}</span>
                </h1>

                <div className="max-w-xl">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-5 bg-white/60 backdrop-blur-sm px-4 py-5 rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
                        {profile.bio}
                    </p>

                    {profile.education && (
                        <div className="mb-5 text-[11px] font-semibold text-gray-500 tracking-wide uppercase">{profile.education}</div>
                    )}

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-xl font-black uppercase tracking-[0.35em] text-[9px] hover:bg-[#F2C18D] hover:text-[#1A1A1A] hover:-translate-y-1 transition-all flex items-center gap-2 shadow-lg group"
                        >
                            Mulai Project <Zap size={16} className="group-hover:fill-current" />
                        </a>
                        <a
                            href="#work"
                            className="bg-white/80 backdrop-blur border-2 border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-xl font-black uppercase tracking-[0.35em] text-[9px] hover:bg-[#1A1A1A] hover:text-white hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            Lihat Karya <Layers size={16} />
                        </a>
                    </div>

                    <div className="mt-6 flex items-center gap-3 text-[10px] text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#F2C18D]" />
                            Available for new projects
                        </div>
                        <span className="opacity-40">•</span>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Collaboration welcome
                        </div>
                    </div>
                </div>
            </div>

            <div className={`hidden md:flex lg:col-span-5 relative items-center justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} mt-10`}>
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                    <AbstractLines className="absolute -top-16 -left-16 w-[140%] h-[140%] opacity-40 scale-110" />

                    <div className="relative w-full h-full p-2">
                        {/* Abstract shape container using custom border-radius */}
                        <div className="w-full h-full overflow-hidden shadow-2xl relative z-10" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                            {/* Image carousel: uses profile.images if present, else fallbacks */}
                            <ImageCarousel
                                images={
                                    profile.images && profile.images.length
                                        ? profile.images
                                        : [
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900",
                                            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=900",
                                            "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=900",
                                        ]
                                }
                                intervalMs={4500}
                                altPrefix={profile.name}
                            />
                        </div>

                        {/* Floating elements adjusted to match the compact abstract shape */}
                        <div className="absolute top-2 -left-6 z-20 bg-white border border-[#1A1A1A] p-2.5 rounded-[40%_60%_70%_30%] shadow-lg -rotate-12 hover:rotate-0 transition-transform cursor-default">
                            <Smile className="w-5 h-5 text-[#F2C18D]" />
                        </div>

                        <div className="absolute bottom-4 -right-12 z-20 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-[2rem_2rem_0_2rem] shadow-xl border border-white/10 hover:scale-105 transition-transform cursor-default">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#F2C18D]">AVAILABLE</div>
                            </div>
                            <div className="text-[10px] font-medium opacity-90">Reply ≤ 24 jam</div>
                        </div>
                    </div>

                    {/* Decorative abstract blob backgrounds */}
                    <div className="absolute -z-10 bg-[#C2996B]/15 w-full h-full top-4 left-6" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                    <div className="absolute -z-10 bg-[#F2C18D]/20 w-[90%] h-[90%] -bottom-6 -left-4" style={{ borderRadius: '50% 50% 30% 70% / 60% 30% 70% 40%' }} />
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
