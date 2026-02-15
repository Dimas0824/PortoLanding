import React, { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Send, Zap } from "lucide-react";
import { ContactInfo } from "../types";

export type ContactSectionProps = {
    contacts: ContactInfo;
    name: string;
};

const ContactSection: React.FC<ContactSectionProps> = ({ contacts, name }) => {
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [subjectInput, setSubjectInput] = useState<string>("");
    const [messageInput, setMessageInput] = useState<string>("");
    const [sending, setSending] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const recipient = contacts.email ?? "";
        if (!recipient) {
            alert("Recipient email not configured.");
            return;
        }

        const subject = subjectInput || "Contact via website";

        const lines: string[] = [];
        const fromName = nameInput || name || "";
        if (fromName) lines.push(`Name: ${fromName}`);
        if (emailInput) lines.push(`Email: ${emailInput}`);
        if (messageInput) lines.push("", messageInput);

        const body = lines.join("%0D%0A");

        const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${body}`;

        // Redirect user to their email client with prefilled fields
        window.location.href = mailto;
    };

    return (
        <section id="contact" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#C2996B]">CONTACT</div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3">Let’s build something solid.</h2>
                    <p className="text-gray-500 mt-3 max-w-2xl text-sm md:text-base">Email/LinkedIn adalah jalur tercepat. Form di bawah untuk brief singkat.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-7">
                    <div className="lg:col-span-5 space-y-5">
                        <div className="rounded-[26px] border border-[#1A1A1A]/12 bg-white p-6 shadow-sm">
                            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Direct</div>
                            <h3 className="text-2xl font-black tracking-tight mt-3">Fast channels</h3>
                            <p className="text-sm text-gray-500 mt-2">Untuk kolaborasi, pakai salah satu channel ini. Biasanya saya reply ≤ 24 jam.</p>

                            <div className="mt-6 space-y-3">
                                {contacts.email && (
                                    <a
                                        href={`mailto:${contacts.email}`}
                                        className="group flex items-center justify-between rounded-2xl border border-[#1A1A1A]/12 bg-[#FDFCFB] px-4 py-3 hover:border-[#F2C18D] hover:bg-white transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-[#1A1A1A]/10 flex items-center justify-center group-hover:border-[#F2C18D] transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black">Email</div>
                                                <div className="text-xs text-gray-500">{contacts.email}</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#C2996B]" />
                                    </a>
                                )}

                                {contacts.linkedin && (
                                    <a
                                        href={contacts.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between rounded-2xl border border-[#1A1A1A]/12 bg-[#FDFCFB] px-4 py-3 hover:border-[#F2C18D] hover:bg-white transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-[#1A1A1A]/10 flex items-center justify-center group-hover:border-[#F2C18D] transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black">LinkedIn</div>
                                                <div className="text-xs text-gray-500">Profile</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#C2996B]" />
                                    </a>
                                )}

                                {contacts.github && (
                                    <a
                                        href={contacts.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between rounded-2xl border border-[#1A1A1A]/12 bg-[#FDFCFB] px-4 py-3 hover:border-[#F2C18D] hover:bg-white transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-[#1A1A1A]/10 flex items-center justify-center group-hover:border-[#F2C18D] transition-colors">
                                                <Github className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black">GitHub</div>
                                                <div className="text-xs text-gray-500">Profile</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#C2996B]" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[26px] bg-[#1A1A1A] text-white p-6 border border-white/10 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.7)]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#F2C18D]">
                                    <Zap className="w-4 h-4" />
                                    Availability
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest bg-[#F2C18D] text-[#1A1A1A] px-3 py-1 rounded-full">AVAILABLE</div>
                            </div>

                            <h4 className="text-2xl font-black tracking-tight mt-6">Clear scope, predictable delivery.</h4>
                            <p className="text-sm text-gray-300 mt-3 leading-relaxed">Ideal brief: tujuan, scope, deadline, stack, dan link referensi/repo.</p>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-[#F2C18D]">
                                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                    <div className="text-white/55 text-[9px] mb-1">Response</div>
                                    ≤ 24h
                                </div>
                                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                    <div className="text-white/55 text-[9px] mb-1">Delivery</div>
                                    Predictable
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="rounded-[26px] border border-[#1A1A1A]/12 bg-[#F9F7F5] p-7 md:p-9 shadow-sm">
                            <div className="flex items-start justify-between gap-5 mb-7">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Brief form</div>
                                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-3">Send a message</h3>
                                    <p className="text-sm text-gray-500 mt-2">Form singkat. Isi jelas biar saya bisa reply cepat.</p>
                                </div>
                                <div className="shrink-0">
                                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C2996B] bg-white border border-[#C2996B]/35 px-3 py-1.5 rounded-full">
                                        Reply ≤ 24h
                                    </span>
                                </div>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Your name</label>
                                        <input
                                            type="text"
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            className="w-full bg-white/90 border border-[#1A1A1A]/12 px-4 py-3.5 rounded-2xl focus:outline-none focus:border-[#F2C18D] focus:ring-2 focus:ring-[#F2C18D]/35 transition-all shadow-[0_10px_22px_-18px_rgba(0,0,0,0.25)]"
                                            placeholder={`Nama kamu (hi ${name.split(" ")[0] ?? ""})`}
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Email</label>
                                        <input
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            className="w-full bg-white/90 border border-[#1A1A1A]/12 px-4 py-3.5 rounded-2xl focus:outline-none focus:border-[#F2C18D] focus:ring-2 focus:ring-[#F2C18D]/35 transition-all shadow-[0_10px_22px_-18px_rgba(0,0,0,0.25)]"
                                            placeholder="nama@email.com"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Subject</label>
                                    <input
                                        type="text"
                                        value={subjectInput}
                                        onChange={(e) => setSubjectInput(e.target.value)}
                                        className="w-full bg-white/90 border border-[#1A1A1A]/12 px-4 py-3.5 rounded-2xl focus:outline-none focus:border-[#F2C18D] focus:ring-2 focus:ring-[#F2C18D]/35 transition-all shadow-[0_10px_22px_-18px_rgba(0,0,0,0.25)]"
                                        placeholder="Contoh: Project Collaboration"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Message</label>
                                    <textarea
                                        rows={6}
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="w-full bg-white/90 border border-[#1A1A1A]/12 px-4 py-3.5 rounded-2xl focus:outline-none focus:border-[#F2C18D] focus:ring-2 focus:ring-[#F2C18D]/35 transition-all resize-none shadow-[0_10px_22px_-18px_rgba(0,0,0,0.25)]"
                                        placeholder="Tujuan, scope, deadline, stack, link repo/brief..."
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-between gap-4">
                                    <p className="text-xs text-gray-400 italic">Clear brief = faster reply.</p>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="bg-[#1A1A1A] text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#F2C18D] hover:text-[#1A1A1A] transition-all shadow-lg inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending ? 'Sending...' : 'Send'} <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
