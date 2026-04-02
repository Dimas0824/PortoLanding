import React from "react";
import { CheckCircle2, Coffee } from "lucide-react";
import { ExpertiseGroup } from "../types";
import { motion, type Variants } from "framer-motion";

export type ExpertiseSectionProps = {
    expertiseGroups: ExpertiseGroup[];
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 },
    },
};

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ expertiseGroups }) => (
    <section id="expertise" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">Technical Expertise.</h3>
                <p className="text-gray-500 max-w-xl text-xs md:text-sm">Toolkit yang saya gunakan untuk mengubah ide abstrak menjadi kode fungsional yang solid.</p>
            </motion.div>

            <div className="grid md:grid-cols-12 gap-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-8 grid gap-5"
                >
                    {expertiseGroups.map((group) => (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            key={group.category}
                            className="bg-white p-5 rounded-[24px] border border-[#E5E5E5] hover:border-[#F2C18D] transition-colors group shadow-sm hover:shadow-md"
                        >
                            <h4 className="text-[12px] md:text-sm font-black uppercase tracking-[0.2em] text-[#C2996B] mb-3 flex items-center gap-2">{group.category}</h4>
                            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                                {group.items.map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-[#1A1A1A] font-bold text-[13px] group-hover:translate-x-1 transition-transform">
                                        <CheckCircle2 className="w-4 h-4 text-[#F2C18D]" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
                    className="md:col-span-4 bg-[#1A1A1A] p-6 rounded-[24px] text-white flex flex-col justify-between h-full min-h-[260px] relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C2996B]/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#F2C18D]/10 rounded-full blur-2xl" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Coffee className="text-[#F2C18D]" size={28} />
                            </motion.div>
                            <div className="bg-[#F2C18D] text-[#1A1A1A] text-[9px] font-black px-2 py-1 rounded-md animate-pulse shadow-[0_0_10px_rgba(242,193,141,0.5)]">ONLINE</div>
                        </div>
                        <h4 className="text-lg font-black mb-3 tracking-tight">Caffeine Powered.</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed italic">"Mengubah kopi menjadi kode bersih. Kadang error, tapi seringnya jalan."</p>
                    </div>
                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-[9px] font-black uppercase tracking-widest text-[#F2C18D] relative z-10">
                        <div>
                            <span className="block text-white opacity-50 mb-1">Energy</span>
                            <div className="w-full bg-white/10 rounded-full h-1 mt-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="bg-[#F2C18D] h-1 rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <span className="block text-white opacity-50 mb-1">Focus</span>
                            <div className="w-full bg-white/10 rounded-full h-1 mt-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 1.5, delay: 0.7 }}
                                    className="bg-[#C2996B] h-1 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default ExpertiseSection;
