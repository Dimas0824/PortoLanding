import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, Send, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
    const [submitError, setSubmitError] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    useEffect(() => {
        if (!showSuccessModal) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setShowSuccessModal(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [showSuccessModal]);

    const closeModal = () => setShowSuccessModal(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (sending) return;

        setSending(true);
        setSubmitError("");

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";

            await axios.post(
                "/contact/send",
                {
                    name: nameInput.trim() || null,
                    email: emailInput.trim() || null,
                    subject: subjectInput.trim() || "Kolaborasi melalui website portfolio",
                    message: messageInput.trim() || null,
                },
                {
                    headers: token ? { "X-CSRF-TOKEN": token } : undefined,
                }
            );

            setShowSuccessModal(true);
            setNameInput("");
            setEmailInput("");
            setSubjectInput("");
            setMessageInput("");
        } catch {
            setSubmitError("Maaf, pesan Anda belum berhasil terkirim. Silakan coba lagi sebentar lagi, atau hubungi saya melalui email/LinkedIn.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#C2996B]">CONTACT</div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3">Let’s build something solid.</h2>
                    <p className="text-gray-500 mt-3 max-w-2xl text-sm md:text-base">Email dan LinkedIn adalah jalur tercepat. Anda juga bisa mengirimkan ringkasan kebutuhan melalui form berikut.</p>
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
                            <p className="text-sm text-gray-300 mt-3 leading-relaxed">Brief ideal: tujuan, ruang lingkup, target waktu, stack, serta tautan referensi/repo jika ada.</p>

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
                                    <p className="text-sm text-gray-500 mt-2">Silakan isi singkat dan jelas agar saya dapat merespons dengan lebih tepat.</p>
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
                                            placeholder={`Nama Anda (halo ${name.split(" ")[0] ?? ""})`}
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
                                        placeholder="Tujuan, ruang lingkup, target waktu, stack, dan tautan brief/repo..."
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-between gap-4">
                                    <p className="text-xs text-gray-400 italic">Brief yang jelas membantu saya merespons lebih cepat.</p>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="bg-[#1A1A1A] text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#F2C18D] hover:text-[#1A1A1A] transition-all shadow-lg inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending ? "Mengirim..." : "Kirim Pesan"} <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                {submitError && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {submitError}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        className="fixed inset-0 z-[120] flex items-center justify-center p-5 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-success-title"
                        onClick={closeModal}
                    >
                        <div className="absolute inset-0 bg-[#0F0F0F]/45 backdrop-blur-sm" />

                        <motion.div
                            className="relative w-full max-w-xl rounded-[30px] border border-white/70 bg-[#FCFAF8] shadow-[0_45px_120px_-45px_rgba(0,0,0,0.45)] overflow-hidden"
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F2C18D]/35 blur-3xl rounded-full" />
                            <div className="absolute -bottom-20 -left-16 w-56 h-56 bg-[#C2996B]/20 blur-3xl rounded-full" />

                            <button
                                type="button"
                                aria-label="Tutup dialog"
                                onClick={closeModal}
                                className="absolute right-5 top-5 z-10 h-9 w-9 rounded-full border border-[#1A1A1A]/10 bg-white/70 text-[#1A1A1A] hover:bg-white transition-colors inline-flex items-center justify-center"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="relative p-7 md:p-9">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2C18D] to-[#C2996B] text-[#1A1A1A] shadow-lg">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>

                                <h4 id="contact-success-title" className="text-2xl md:text-[28px] font-black tracking-tight mt-5">
                                    Terima kasih, pesan Anda sudah saya terima.
                                </h4>
                                <p className="text-sm md:text-base text-[#4F4A43] leading-relaxed mt-3">
                                    Informasi yang Anda kirimkan telah masuk ke email saya. Saya akan menindaklanjuti secepatnya, mohon menunggu balasan dari saya.
                                </p>

                                <div className="mt-6 rounded-2xl border border-[#C2996B]/25 bg-white/75 px-4 py-3 text-xs md:text-sm text-[#5D5346]">
                                    Jika ada tambahan detail yang ingin disampaikan, Anda dapat mengirimkan email lanjutan kapan saja.
                                </div>

                                <div className="mt-7 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#C2996B] hover:text-[#1A1A1A] transition-colors"
                                    >
                                        Baik, Terima Kasih
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ContactSection;
