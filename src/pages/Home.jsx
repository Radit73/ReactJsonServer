import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const features = [
  {
    title: "Supabase Terintegrasi",
    description:
      "CRUD post langsung ke Supabase, lengkap dengan React Query untuk cache dan invalidation otomatis.",
    accent: "from-sky-500 via-cyan-400 to-emerald-400",
  },
  {
    title: "Form Valid & Responsif",
    description:
      "React Hook Form dan Zod memastikan input bersih, sementara Tailwind + DaisyUI menjaga tampilan rapi.",
    accent: "from-fuchsia-500 via-pink-500 to-rose-400",
  },
  {
    title: "State Sederhana",
    description:
      "Zustand menyimpan status auth ringan sehingga halaman CRUD tetap fokus pada data postingan.",
    accent: "from-amber-500 via-orange-500 to-red-400",
  },
];

const stats = [
  { label: "Posts tersimpan", value: "Supabase" },
  { label: "Form tervalidasi", value: "100%" },
  { label: "Halaman utama", value: "3" },
];

export default function Home() {
  return (
    <section className="space-y-12 text-slate-100">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 px-6 py-14 text-white shadow-2xl md:px-12">
        <Motion.div
          className="absolute -top-24 left-16 h-48 w-48 rounded-full bg-sky-400/40 blur-3xl"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute -bottom-32 right-6 h-64 w-64 rounded-full bg-purple-500/40 blur-3xl"
          animate={{ y: [0, -35, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,255,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.25),transparent_45%)]" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <Motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/70"
          >
            React JSON Server Starter
          </Motion.span>
          <Motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl text-4xl font-black leading-tight md:text-6xl"
          >
            CRUD React + Supabase yang ringan untuk latihan dan eksperimen.
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-3xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            Aplikasi ini memakai React, Vite, Tailwind, dan DaisyUI dengan Framer Motion sebagai bumbu.
            Data disimpan di Supabase, diambil melalui React Query, dan divalidasi lewat Zod.
          </Motion.p>
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-3 md:flex-row"
          >
            <Link to="/posts" className="btn btn-primary btn-wide md:btn-lg">
              Lihat Daftar Post
            </Link>
            <Link to="/about" className="btn btn-outline btn-wide border-white/60 text-white md:btn-lg">
              Jelajahi Teknologi
            </Link>
          </Motion.div>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6 text-slate-100">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Kenapa stack ini menarik?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item, idx) => (
              <Motion.article
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-slate-100 shadow-lg shadow-primary/10 backdrop-blur"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </Motion.article>
            ))}
          </div>
        </div>
        <Motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-3xl border border-primary/30 bg-slate-900/70 p-6 text-slate-100"
        >
          <h3 className="text-lg font-semibold text-primary">Integrasi Cepat</h3>
          <p className="text-sm text-slate-300">
            Supabase bertugas sebagai database utama. React Query mengurus fetch, cache, dan refresh
            otomatis sehingga halaman Posts selalu tersinkron.
          </p>
          <div className="divider my-4 border-white/20" />
          <ul className="space-y-3 text-sm text-slate-200">
            <li>
              <span className="font-semibold text-primary">Auth ringan:</span> Zustand mempermudah state user.
            </li>
            <li>
              <span className="font-semibold text-secondary">Validasi:</span> Zod memastikan data form selalu valid.
            </li>
            <li>
              <span className="font-semibold text-accent">Animasi:</span> Framer Motion untuk transisi yang hidup.
            </li>
          </ul>
        </Motion.aside>
      </section>

      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-100 shadow-xl shadow-secondary/10 backdrop-blur"
      >
        <h2 className="text-2xl font-bold text-secondary md:text-3xl">Status Singkat</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Beberapa angka sederhana untuk menunjukkan bagaimana modul utama saling terhubung.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-center text-slate-100 shadow-lg"
            >
              <span className="text-3xl font-black text-white">{stat.value}</span>
              <p className="mt-2 text-sm uppercase tracking-wide text-slate-300">
                {stat.label}
              </p>
              <div className="mt-4 h-2 rounded-full bg-base-200">
                <Motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </Motion.section>
    </section>
  );
}
