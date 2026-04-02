import { Head, Link, router, useForm, usePage } from "@inertiajs/react";

type FlashProps = { success?: string; error?: string };
type ContactFields = { email: string; instagram: string; linkedin: string; github: string };
type ProfileProps = {
    name: string;
    title: string;
    bio: string;
    philosophy: string;
    contacts: ContactFields;
    passion: string[];
    images: string[];
    resolvedImages: string[];
};
type SkillGroupRecord = { id: number; category: string; items: string[]; sort_order: number };
type ProjectRecord = { id: number; title: string; description: string; tech: string[]; link: string | null; category: string | null; image: string | null; sort_order: number };
type ContentPageProps = { authUser: { name: string; email: string }; profile: ProfileProps; skillGroups: SkillGroupRecord[]; projects: ProjectRecord[]; flash: FlashProps };

type ProfileFormData = {
    name: string;
    title: string;
    bio: string;
    philosophy: string;
    email: string;
    instagram: string;
    linkedin: string;
    github: string;
    passionText: string;
    imagesText: string;
};

type SkillGroupFormData = { category: string; itemsText: string; sortOrder: string };
type ProjectFormData = { title: string; description: string; techText: string; link: string; category: string; image: string; sortOrder: string };

const splitList = (value: string): string[] => value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
const joinList = (items: string[]): string => items.join("\n");
const inputClass = "w-full rounded-2xl border border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-3 focus:border-[#C2996B] focus:outline-none";

const SkillGroupEditor = ({ group }: { group: SkillGroupRecord }) => {
    const form = useForm<SkillGroupFormData>({ category: group.category, itemsText: joinList(group.items), sortOrder: String(group.sort_order) });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.transform((data) => ({ category: data.category, items: splitList(data.itemsText), sort_order: Number(data.sortOrder || 0) }));
        form.put(`/admin/skills/${group.id}`, { preserveScroll: true });
    };

    return (
        <form className="space-y-3 rounded-[24px] border border-[#1A1A1A]/10 bg-white p-5" onSubmit={submit}>
            <div className="grid gap-3 md:grid-cols-[1fr_120px]">
                <input className={inputClass} value={form.data.category} onChange={(event) => form.setData("category", event.target.value)} />
                <input className={inputClass} type="number" value={form.data.sortOrder} onChange={(event) => form.setData("sortOrder", event.target.value)} />
            </div>
            <textarea className={inputClass} rows={4} value={form.data.itemsText} onChange={(event) => form.setData("itemsText", event.target.value)} />
            <div className="flex gap-3">
                <button type="submit" className="rounded-2xl bg-[#1A1A1A] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Simpan</button>
                <button type="button" onClick={() => router.delete(`/admin/skills/${group.id}`, { preserveScroll: true })} className="rounded-2xl border border-red-200 px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-red-600">Hapus</button>
            </div>
        </form>
    );
};

const ProjectEditor = ({ project }: { project: ProjectRecord }) => {
    const form = useForm<ProjectFormData>({
        title: project.title,
        description: project.description,
        techText: joinList(project.tech),
        link: project.link ?? "",
        category: project.category ?? "",
        image: project.image ?? "",
        sortOrder: String(project.sort_order),
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.transform((data) => ({
            title: data.title,
            description: data.description,
            tech: splitList(data.techText),
            link: data.link || null,
            category: data.category || null,
            image: data.image || null,
            sort_order: Number(data.sortOrder || 0),
        }));
        form.put(`/admin/projects/${project.id}`, { preserveScroll: true });
    };

    return (
        <form className="space-y-3 rounded-[24px] border border-[#1A1A1A]/10 bg-white p-5" onSubmit={submit}>
            <div className="grid gap-3 md:grid-cols-[1fr_120px]">
                <input className={inputClass} value={form.data.title} onChange={(event) => form.setData("title", event.target.value)} />
                <input className={inputClass} type="number" value={form.data.sortOrder} onChange={(event) => form.setData("sortOrder", event.target.value)} />
            </div>
            <textarea className={inputClass} rows={4} value={form.data.description} onChange={(event) => form.setData("description", event.target.value)} />
            <textarea className={inputClass} rows={3} value={form.data.techText} onChange={(event) => form.setData("techText", event.target.value)} />
            <div className="grid gap-3 md:grid-cols-2">
                <input className={inputClass} value={form.data.category} onChange={(event) => form.setData("category", event.target.value)} placeholder="Category" />
                <input className={inputClass} value={form.data.link} onChange={(event) => form.setData("link", event.target.value)} placeholder="Link" />
            </div>
            <input className={inputClass} value={form.data.image} onChange={(event) => form.setData("image", event.target.value)} placeholder="Image URL" />
            <div className="flex gap-3">
                <button type="submit" className="rounded-2xl bg-[#1A1A1A] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Simpan</button>
                <button type="button" onClick={() => router.delete(`/admin/projects/${project.id}`, { preserveScroll: true })} className="rounded-2xl border border-red-200 px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-red-600">Hapus</button>
            </div>
        </form>
    );
};

const Content = ({ authUser, profile, skillGroups, projects }: ContentPageProps) => {
    const flash = usePage<{ flash: FlashProps }>().props.flash ?? {};
    const profileForm = useForm<ProfileFormData>({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        philosophy: profile.philosophy,
        email: profile.contacts.email,
        instagram: profile.contacts.instagram,
        linkedin: profile.contacts.linkedin,
        github: profile.contacts.github,
        passionText: joinList(profile.passion),
        imagesText: joinList(profile.images),
    });
    const skillForm = useForm<SkillGroupFormData>({ category: "", itemsText: "", sortOrder: String((skillGroups.at(-1)?.sort_order ?? 0) + 10) });
    const projectForm = useForm<ProjectFormData>({ title: "", description: "", techText: "", link: "", category: "", image: "", sortOrder: String((projects.at(-1)?.sort_order ?? 0) + 10) });

    const submitProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        profileForm.transform((data) => ({
            name: data.name,
            title: data.title,
            bio: data.bio,
            philosophy: data.philosophy || null,
            contacts: { email: data.email || null, instagram: data.instagram || null, linkedin: data.linkedin || null, github: data.github || null },
            passion: splitList(data.passionText),
            images: splitList(data.imagesText),
        }));
        profileForm.put("/admin/profile", { preserveScroll: true });
    };

    const submitSkill = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        skillForm.transform((data) => ({ category: data.category, items: splitList(data.itemsText), sort_order: Number(data.sortOrder || 0) }));
        skillForm.post("/admin/skills", {
            preserveScroll: true,
            onSuccess: () => skillForm.reset(),
        });
    };

    const submitProject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        projectForm.transform((data) => ({
            title: data.title,
            description: data.description,
            tech: splitList(data.techText),
            link: data.link || null,
            category: data.category || null,
            image: data.image || null,
            sort_order: Number(data.sortOrder || 0),
        }));
        projectForm.post("/admin/projects", { preserveScroll: true, onSuccess: () => projectForm.reset() });
    };

    return (
        <>
            <Head title="Admin Content" />
            <div className="min-h-screen bg-[#F6F1EA] px-6 py-8 text-[#1A1A1A]">
                <div className="mx-auto max-w-7xl space-y-8">
                    <div className="flex flex-col gap-4 rounded-[32px] border border-[#1A1A1A]/8 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)] md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Content Admin</p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight">Kelola konten landing page.</h1>
                            <p className="mt-2 text-sm text-gray-500">Login sebagai <span className="font-bold text-[#1A1A1A]">{authUser.name}</span> ({authUser.email})</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/" className="rounded-2xl border border-[#1A1A1A]/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#1A1A1A]">Lihat Site</Link>
                            <button type="button" onClick={() => router.post("/admin/logout")} className="rounded-2xl bg-[#1A1A1A] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Logout</button>
                        </div>
                    </div>

                    {(flash.success || flash.error) && <div className={`rounded-[24px] border px-5 py-4 text-sm ${flash.success ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>{flash.success ?? flash.error}</div>}

                    <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                        <form className="space-y-4 rounded-[32px] border border-[#1A1A1A]/8 bg-white p-6" onSubmit={submitProfile}>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Profile</p>
                                <h2 className="mt-3 text-2xl font-black tracking-tight">Hero dan kontak.</h2>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <input className={inputClass} value={profileForm.data.name} onChange={(event) => profileForm.setData("name", event.target.value)} placeholder="Display name" />
                                <input className={inputClass} value={profileForm.data.title} onChange={(event) => profileForm.setData("title", event.target.value)} placeholder="Headline" />
                            </div>
                            <textarea className={inputClass} rows={4} value={profileForm.data.bio} onChange={(event) => profileForm.setData("bio", event.target.value)} placeholder="Bio" />
                            <input className={inputClass} value={profileForm.data.philosophy} onChange={(event) => profileForm.setData("philosophy", event.target.value)} placeholder="Philosophy" />
                            <div className="grid gap-3 md:grid-cols-2">
                                <input className={inputClass} value={profileForm.data.email} onChange={(event) => profileForm.setData("email", event.target.value)} placeholder="Email" />
                                <input className={inputClass} value={profileForm.data.instagram} onChange={(event) => profileForm.setData("instagram", event.target.value)} placeholder="Instagram" />
                                <input className={inputClass} value={profileForm.data.linkedin} onChange={(event) => profileForm.setData("linkedin", event.target.value)} placeholder="LinkedIn" />
                                <input className={inputClass} value={profileForm.data.github} onChange={(event) => profileForm.setData("github", event.target.value)} placeholder="GitHub" />
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <textarea className={inputClass} rows={5} value={profileForm.data.passionText} onChange={(event) => profileForm.setData("passionText", event.target.value)} placeholder={"Web Application Development\nBackend Architecture"} />
                                <textarea className={inputClass} rows={5} value={profileForm.data.imagesText} onChange={(event) => profileForm.setData("imagesText", event.target.value)} placeholder={"https://...\nhttps://..."} />
                            </div>
                            <button type="submit" className="rounded-2xl bg-[#1A1A1A] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Simpan Profile</button>
                        </form>

                        <div className="space-y-4 rounded-[32px] border border-[#1A1A1A]/8 bg-white p-6">
                            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Preview</p>
                            <h2 className="text-2xl font-black tracking-tight">Resolved hero images.</h2>
                            <div className="grid gap-4">
                                {profile.resolvedImages.length > 0 ? profile.resolvedImages.map((image) => (
                                    <div key={image} className="overflow-hidden rounded-[24px] border border-[#1A1A1A]/8 bg-[#FCFBF9]">
                                        <img src={image} alt="Profile preview" className="h-44 w-full object-cover" />
                                        <div className="px-4 py-3 text-xs text-gray-500">{image}</div>
                                    </div>
                                )) : <div className="rounded-[24px] border border-dashed border-[#1A1A1A]/10 bg-[#FCFBF9] px-4 py-8 text-sm text-gray-500">Belum ada image yang resolve.</div>}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-8 xl:grid-cols-2">
                        <div className="space-y-5">
                            <form className="space-y-3 rounded-[32px] border border-[#1A1A1A]/8 bg-white p-6" onSubmit={submitSkill}>
                                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Skill Groups</p>
                                <input className={inputClass} value={skillForm.data.category} onChange={(event) => skillForm.setData("category", event.target.value)} placeholder="Kategori baru" />
                                <textarea className={inputClass} rows={4} value={skillForm.data.itemsText} onChange={(event) => skillForm.setData("itemsText", event.target.value)} placeholder={"Laravel\nPHP\nMySQL"} />
                                <input className={inputClass} type="number" value={skillForm.data.sortOrder} onChange={(event) => skillForm.setData("sortOrder", event.target.value)} placeholder="Sort order" />
                                <button type="submit" className="rounded-2xl bg-[#1A1A1A] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Tambah Skill Group</button>
                            </form>
                            {skillGroups.map((group) => <SkillGroupEditor key={group.id} group={group} />)}
                        </div>

                        <div className="space-y-5">
                            <form className="space-y-3 rounded-[32px] border border-[#1A1A1A]/8 bg-white p-6" onSubmit={submitProject}>
                                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#C2996B]">Projects</p>
                                <input className={inputClass} value={projectForm.data.title} onChange={(event) => projectForm.setData("title", event.target.value)} placeholder="Judul project" />
                                <textarea className={inputClass} rows={4} value={projectForm.data.description} onChange={(event) => projectForm.setData("description", event.target.value)} placeholder="Deskripsi project" />
                                <textarea className={inputClass} rows={3} value={projectForm.data.techText} onChange={(event) => projectForm.setData("techText", event.target.value)} placeholder={"Laravel\nInertia\nMySQL"} />
                                <div className="grid gap-3 md:grid-cols-2">
                                    <input className={inputClass} value={projectForm.data.category} onChange={(event) => projectForm.setData("category", event.target.value)} placeholder="Category" />
                                    <input className={inputClass} type="number" value={projectForm.data.sortOrder} onChange={(event) => projectForm.setData("sortOrder", event.target.value)} placeholder="Sort order" />
                                </div>
                                <input className={inputClass} value={projectForm.data.link} onChange={(event) => projectForm.setData("link", event.target.value)} placeholder="Project link" />
                                <input className={inputClass} value={projectForm.data.image} onChange={(event) => projectForm.setData("image", event.target.value)} placeholder="Image URL" />
                                <button type="submit" className="rounded-2xl bg-[#1A1A1A] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white">Tambah Project</button>
                            </form>
                            {projects.map((project) => <ProjectEditor key={project.id} project={project} />)}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Content;
