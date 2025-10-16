import { motion as Motion } from "framer-motion";

const timeline = [
  {
    title: "Pengaturan Proyek",
    description:
      "Mulai dengan Vite + React dan install Tailwind CSS, DaisyUI, serta Framer Motion untuk styling dan animasi.",
    badge: "Setup",
    color: "from-sky-500 to-cyan-400",
  },
  {
    title: "State & Data Layer",
    description:
      "Gunakan Zustand untuk auth state yang sederhana, React Query untuk komunikasi ke JSON Server, dan Zod untuk validasi.",
    badge: "Data Flow",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Halaman CRUD",
    description:
      "Halaman Posts menampilkan daftar, tambah, dan edit. Framer Motion menambah animasi mikro agar interaksi terasa hidup.",
    badge: "CRUD",
    color: "from-amber-500 to-orange-500",
  },
];

const stack = [
  { label: "React 19 + Vite 7", tone: "text-primary" },
  { label: "Tailwind CSS & DaisyUI", tone: "text-secondary" },
  { label: "React Query 5", tone: "text-accent" },
  { label: "Zustand + Zod", tone: "text-success" },
];

export default function About() {
  return (
    <section className="space-y-10 text-slate-100">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-100 shadow-xl shadow-primary/10 backdrop-blur">
        <Motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-bold text-primary md:text-4xl"
        >
          Tentang Aplikasi
        </Motion.h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
          Proyek ini didesain untuk menjadi landasan belajar dan eksperimen web modern. Fokus pada
          konsistensi UI, responsivitas, serta alur data yang bersih, membuatnya cocok dijadikan bahan
          referensi tugas maupun portofolio.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
          {stack.map((item) => (
            <span
              key={item.label}
              className={`rounded-full border border-white/20 bg-slate-950/60 px-4 py-1 ${item.tone}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6 text-slate-100">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Timeline Pengembangan
          </h2>
          <div className="relative space-y-8 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-0.5 before:bg-gradient-to-b before:from-primary/60 before:via-secondary/40 before:to-accent/60">
            {timeline.map((item, idx) => (
              <Motion.article
                key={item.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative ml-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-slate-100 shadow-lg shadow-base-300/30"
              >
                <div
                  className={`absolute -left-10 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-xs font-bold text-white shadow-lg`}
                >
                  {idx + 1}
                </div>
                <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  {item.badge}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </Motion.article>
            ))}
          </div>
        </div>

        <Motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex h-fit flex-col gap-4 rounded-3xl border border-secondary/40 bg-slate-900/70 p-6 text-slate-100"
        >
          <h2 className="text-xl font-semibold text-secondary">Highlight Fitur</h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-200">
            <p>
              <span className="font-semibold text-secondary">Auth Persisten:</span> Data login disimpan ke
              localStorage menggunakan middleware Zustand.
            </p>
            <p>
              <span className="font-semibold text-primary">Validasi Solid:</span> Setiap form menggunakan Zod
              sehingga feedback lebih kredibel.
            </p>
            <p>
              <span className="font-semibold text-accent">Transisi Halus:</span> Framer Motion membuat setiap
              pergantian halaman terasa premium.
            </p>
            <p>
              <span className="font-semibold text-success">Tema Dinamis:</span> DaisyUI memberi baseline tema
              yang mudah dimodifikasi.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-slate-950/60 p-4 text-sm text-slate-300 shadow-md">
            Tips: Jalankan <span className="font-semibold text-secondary">npm run server</span> untuk menyalakan JSON Server, lalu{" "}
            <span className="font-semibold text-secondary">npm run dev</span> untuk
            melihat UI responsif ini di browser.
          </div>
        </Motion.aside>
      </section>
    </section>
  );
}
