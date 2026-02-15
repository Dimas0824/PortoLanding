import React from "react";
import { CheckCircle2, Coffee } from "lucide-react";
import { ExpertiseGroup } from "../types";

export type ExpertiseSectionProps = {
    expertiseGroups: ExpertiseGroup[];
};

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ expertiseGroups }) => (
    <section id="expertise" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">Technical Expertise.</h3>
                <p className="text-gray-500 max-w-xl text-xs md:text-sm">Toolkit yang saya gunakan untuk mengubah ide abstrak menjadi kode fungsional yang solid.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-8 grid gap-5">
                    {expertiseGroups.map((group) => (
                        <div key={group.category} className="bg-white p-5 rounded-[24px] border border-[#E5E5E5] hover:border-[#F2C18D] transition-colors group">
                            <h4 className="text-[12px] md:text-sm font-black uppercase tracking-[0.2em] text-[#C2996B] mb-3 flex items-center gap-2">{group.category}</h4>
                            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                                {group.items.map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-[#1A1A1A] font-bold text-[13px]">
                                        <CheckCircle2 className="w-4 h-4 text-[#F2C18D]" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="md:col-span-4 bg-[#1A1A1A] p-6 rounded-[24px] text-white flex flex-col justify-between h-full min-h-[260px]">
                    <div>
                        <div className="flex justify-between items-start mb-8">
                            <Coffee className="text-[#F2C18D]" size={28} />
                            <div className="bg-[#F2C18D] text-[#1A1A1A] text-[9px] font-black px-2 py-1 rounded-md animate-pulse">ONLINE</div>
                        </div>
                        <h4 className="text-lg font-black mb-3 tracking-tight">Caffeine Powered.</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed italic">"Mengubah kopi menjadi kode bersih. Kadang error, tapi seringnya jalan."</p>
                    </div>
                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-[9px] font-black uppercase tracking-widest text-[#F2C18D]">
                        <div>
                            <span className="block text-white opacity-50 mb-1">Energy</span>
                            100%
                        </div>
                        <div>
                            <span className="block text-white opacity-50 mb-1">Focus</span>
                            High
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ExpertiseSection;
