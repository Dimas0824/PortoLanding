import React from "react";
import { Star, Zap } from "lucide-react";

export type MarqueeStripProps = {
    items: string[];
};

const MarqueeStrip: React.FC<MarqueeStripProps> = ({ items }) => {
    // normalize + dedupe incoming items while preserving first-seen casing (case-insensitive)
    const raw = (items || []).map((m) => (m || "").trim()).filter(Boolean);
    const seen = new Map();
    for (const m of raw) {
        const key = m.toLowerCase();
        if (!seen.has(key)) seen.set(key, m);
    }
    const defaultMessages = ["Available for new projects", "Backend & Data Enthusiast"];
    const base = seen.size ? Array.from(seen.values()) : defaultMessages;

    // build a rendered list large enough for the marquee, avoid immediate duplicates
    const repeatCount = Math.max(6, Math.ceil(12 / base.length));
    const renderMessages: string[] = [];
    for (let r = 0; r < repeatCount; r++) {
        for (const msg of base) {
            // avoid pushing the same message twice in a row (case-insensitive)
            if (
                renderMessages.length === 0 ||
                renderMessages[renderMessages.length - 1].toLowerCase() !== msg.toLowerCase()
            ) {
                renderMessages.push(msg);
            }
        }
    }

    return (
        <div className="bg-[#1A1A1A] py-3 overflow-hidden rotate-[-1deg] w-[110%] -ml-[5%]">
            <div className="flex animate-marquee whitespace-nowrap gap-6 items-center text-lg md:text-xl">
                {renderMessages.map((msg, index) => {
                    // pick a next message that isn't identical to the current one (case-insensitive)
                    const len = renderMessages.length;
                    const currKey = msg.toLowerCase();
                    let next = renderMessages[(index + 1) % len] ?? msg;
                    if (next.toLowerCase() === currKey) {
                        // try to find a different next within a short window
                        for (let k = 2; k < Math.min(len, 6); k++) {
                            const cand = renderMessages[(index + k) % len];
                            if (cand && cand.toLowerCase() !== currKey) {
                                next = cand;
                                break;
                            }
                        }
                    }

                    return (
                        <div key={index} className="flex items-center gap-8">
                            <span className="text-white text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <Zap className="text-[#F2C18D] w-5 h-5 fill-current" /> {msg}
                            </span>
                            <span className="text-[#F2C18D] text-2xl font-serif italic">Let's build something solid</span>
                            <span className="text-white text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <Star className="text-[#F2C18D] w-5 h-5" /> {next}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarqueeStrip;
