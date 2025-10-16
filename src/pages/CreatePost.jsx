import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  body: z.string().min(10, "Isi minimal 10 karakter"),
  author: z.string().nonempty("Nama penulis wajib diisi"),
  tags: z.string(),
});

const helperText =
  "Gunakan koma untuk memisahkan setiap tag. Contoh: react, ui, supabase";

export default function CreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: { tags: "react, tailwind" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const newData = {
        ...data,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const { error } = await supabase.from("posts").insert([newData]);
      if (error) throw error;

      reset();
      alert("Post berhasil disimpan ke Supabase!");
      navigate("/posts");
    } catch (error) {
      console.error(error);
      setSubmitError(error.message ?? "Terjadi kesalahan saat menyimpan post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid gap-8 text-slate-100 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-primary/10 backdrop-blur"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary md:text-4xl">Tambah Post Baru</h1>
              <p className="mt-1 text-sm text-slate-400">
                Lengkapi detail konten dan simpan ke Supabase dalam sekali klik.
              </p>
            </div>
            <Link to="/posts" className="btn btn-ghost border border-white/10 text-slate-300">
              Kembali ke Posts
            </Link>
          </header>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Judul Post
              </label>
              <input
                id="title"
                type="text"
                placeholder="Misal: Tips Produktivitas ala Developer React"
                className={`input input-bordered w-full bg-slate-950/60 text-slate-100 placeholder:text-slate-500 ${
                  errors.title ? "border-error/60 focus:border-error focus:outline-error" : "border-white/10"
                }`}
                {...register("title")}
              />
              {errors.title && <p className="text-sm text-error">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Penulis
              </label>
              <input
                id="author"
                type="text"
                placeholder="Nama penulis"
                className={`input input-bordered w-full bg-slate-950/60 text-slate-100 placeholder:text-slate-500 ${
                  errors.author ? "border-error/60 focus:border-error focus:outline-error" : "border-white/10"
                }`}
                {...register("author")}
              />
              {errors.author && <p className="text-sm text-error">{errors.author.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                placeholder="react, tailwind, supabase"
                className={`input input-bordered w-full bg-slate-950/60 text-slate-100 placeholder:text-slate-500 ${
                  errors.tags ? "border-error/60 focus:border-error focus:outline-error" : "border-white/10"
                }`}
                {...register("tags")}
              />
              <p className="text-xs text-slate-400">{helperText}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="body" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Isi Post
              </label>
              <textarea
                id="body"
                rows={6}
                placeholder="Tulis cerita atau insight menarik untuk dibagikan ke pembaca..."
                className={`textarea textarea-bordered w-full bg-slate-950/60 text-slate-100 placeholder:text-slate-500 ${
                  errors.body ? "border-error/60 focus:border-error focus:outline-error" : "border-white/10"
                }`}
                {...register("body")}
              />
              {errors.body && <p className="text-sm text-error">{errors.body.message}</p>}
            </div>
          </div>

          {submitError && (
            <div className="alert alert-error bg-error/10 text-sm text-error-content">
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-500">
              Data akan otomatis tervalidasi sebelum dikirim ke Supabase.
            </p>
            <button
              type="submit"
              className={`btn btn-secondary md:btn-wide ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Post"}
            </button>
          </div>
        </form>
      </Motion.div>

      <Motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex flex-col gap-6 rounded-3xl border border-primary/30 bg-slate-900/80 p-8 text-slate-200 shadow-xl shadow-secondary/15 backdrop-blur"
      >
        <div>
          <h2 className="text-lg font-semibold text-primary">Checklist Konten</h2>
          <p className="mt-2 text-sm text-slate-400">
            Gunakan struktur jelas dan sertakan insight praktis agar post kamu menarik untuk dibaca.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
            <span>
              <strong className="text-secondary">Judul singkat:</strong> pastikan menggambarkan inti tulisan.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
            <span>
              <strong className="text-secondary">Isi padat:</strong> bagi menjadi paragraf pendek agar mudah dipindai.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
            <span>
              <strong className="text-secondary">Tags relevan:</strong> membantu pembaca menemukan topik serupa.
            </span>
          </li>
        </ul>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
          <p>
            Setelah tersimpan, post akan muncul di halaman daftar dan dapat langsung diedit atau dihapus kapan saja.
          </p>
        </div>
      </Motion.aside>
    </section>
  );
}

