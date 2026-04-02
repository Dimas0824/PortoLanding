import { Head, useForm } from "@inertiajs/react";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const Login = () => {
    const form = useForm<LoginForm>({
        email: "",
        password: "",
        remember: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post("/admin/login");
    };

    return (
        <>
            <Head title="Admin Login" />

            <div className="min-h-screen bg-[#F6F1EA] px-6 py-10 text-[#1A1A1A]">
                <div className="mx-auto flex min-h-[80vh] max-w-xl items-center">
                    <div className="w-full rounded-[32px] border border-[#C2996B]/20 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]">
                        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Admin</p>
                        <h1 className="mt-4 text-3xl font-black tracking-tight">Masuk ke panel konten.</h1>
                        <p className="mt-3 text-sm leading-relaxed text-gray-500">
                            Gunakan akun admin untuk mengelola profile, skill groups, dan project yang tampil di landing page.
                        </p>

                        <form className="mt-8 space-y-5" onSubmit={submit}>
                            <div className="space-y-2">
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
                                    autoComplete="current-password"
                                />
                                {form.errors.password && <p className="text-sm text-red-600">{form.errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-3 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={form.data.remember}
                                    onChange={(event) => form.setData("remember", event.target.checked)}
                                    className="h-4 w-4 rounded border-[#1A1A1A]/20 text-[#C2996B] focus:ring-[#F2C18D]"
                                />
                                Tetap login di browser ini
                            </label>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#C2996B] hover:text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {form.processing ? "Memproses..." : "Masuk"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
