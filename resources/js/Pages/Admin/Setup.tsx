import { Head, useForm } from "@inertiajs/react";

type SetupForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const Setup = () => {
    const form = useForm<SetupForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post("/admin/setup");
    };

    return (
        <>
            <Head title="Admin Setup" />

            <div className="min-h-screen bg-[#F6F1EA] px-6 py-10 text-[#1A1A1A]">
                <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center">
                    <div className="w-full rounded-[32px] border border-[#C2996B]/20 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]">
                        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Initial Setup</p>
                        <h1 className="mt-4 text-3xl font-black tracking-tight">Buat admin pertama.</h1>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
                            Panel admin belum memiliki akun. Buat satu akun admin terlebih dulu untuk mulai mengelola seluruh konten landing page.
                        </p>

                        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={submit}>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">Nama</label>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(event) => form.setData("name", event.target.value)}
                                    className="w-full rounded-2xl border border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-3.5 focus:border-[#C2996B] focus:outline-none focus:ring-2 focus:ring-[#F2C18D]/35"
                                    autoComplete="name"
                                />
                                {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">Email</label>
                                <input
                                    type="email"
                                    value={form.data.email}
                                    onChange={(event) => form.setData("email", event.target.value)}
                                    className="w-full rounded-2xl border border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-3.5 focus:border-[#C2996B] focus:outline-none focus:ring-2 focus:ring-[#F2C18D]/35"
                                    autoComplete="email"
                                />
                                {form.errors.email && <p className="text-sm text-red-600">{form.errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">Password</label>
                                <input
                                    type="password"
                                    value={form.data.password}
                                    onChange={(event) => form.setData("password", event.target.value)}
                                    className="w-full rounded-2xl border border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-3.5 focus:border-[#C2996B] focus:outline-none focus:ring-2 focus:ring-[#F2C18D]/35"
                                    autoComplete="new-password"
                                />
                                {form.errors.password && <p className="text-sm text-red-600">{form.errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    value={form.data.password_confirmation}
                                    onChange={(event) => form.setData("password_confirmation", event.target.value)}
                                    className="w-full rounded-2xl border border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-3.5 focus:border-[#C2996B] focus:outline-none focus:ring-2 focus:ring-[#F2C18D]/35"
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#C2996B] hover:text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {form.processing ? "Menyimpan..." : "Buat Admin"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
