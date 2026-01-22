import React, { useState, useEffect } from 'react';
import { Ghost, MoveLeft, Search, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove as EventListener);
        return () => window.removeEventListener('mousemove', handleMouseMove as EventListener);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans overflow-hidden selection:bg-[#F2C18D] flex items-center justify-center relative">
            <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div
                className="fixed w-6 h-6 border border-[#C2996B] rounded-full pointer-events-none z-[100] transition-transform duration-150 ease-out hidden md:block"
                style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
            />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-[#1A1A1A]/5 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-[#F2C18D]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute top-20 left-20 opacity-20 rotate-45">
                    <AlertTriangle size={48} />
                </div>
                <div className="absolute bottom-20 right-20 opacity-20 -rotate-12">
                    <Search size={48} />
                </div>
            </div>

            <div className="text-center relative z-10 px-6 max-w-4xl mx-auto">
                <div className="relative mb-8 md:mb-12">
                    <h1 className="text-[120px] md:text-[250px] font-black leading-none tracking-tighter text-[#1A1A1A] select-none mix-blend-hard-light relative z-10">
                        4
                        <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#C2996B] to-[#F2C18D] italic font-serif mx-2 md:mx-4">0</span>
                        4
                    </h1>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#1A1A1A] p-4 md:p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] -rotate-6 animate-bounce z-20 hover:rotate-0 transition-transform cursor-help">
                        <Ghost size={48} className="text-[#F2C18D] md:w-16 md:h-16" />
                    </div>

                    <h1 className="absolute top-2 left-2 text-[120px] md:text-[250px] font-black leading-none tracking-tighter text-[#1A1A1A]/5 select-none z-0">
                        404
                    </h1>
                </div>

                <div className="max-w-xl mx-auto space-y-8 backdrop-blur-sm bg-[#FDFCFB]/50 p-6 rounded-3xl">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-[#C2996B] text-[#C2996B] text-[10px] font-black uppercase tracking-[0.2em] bg-white">
                            System Malfunction
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#1A1A1A]">Waduh, Kamu Tersesat?</h2>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
                            Halaman yang kamu cari sepertinya hilang ditelan{' '}
                            <span className="text-[#C2996B] italic font-serif">null pointer exception</span>. Mungkin sudah dihapus, dipindahkan, atau sedang izin ngopi
                            sebentar.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <a
                            href="/"
                            className="bg-[#1A1A1A] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#F2C18D] hover:text-[#1A1A1A] hover:-translate-y-1 transition-all flex items-center gap-3 shadow-lg group w-full md:w-auto justify-center"
                        >
                            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Home
                        </a>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center gap-3 w-full md:w-auto justify-center group"
                        >
                            Coba Refresh <span className="group-hover:rotate-180 transition-transform duration-500">↻</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 w-full text-center mt-20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] opacity-30">CODE: 404 • LOST IN CYBERSPACE</p>
            </div>
        </div>
    );
};

export default NotFound;
