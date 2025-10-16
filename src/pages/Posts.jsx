import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

async function fetchPosts() {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}

export default function Posts() {
  const queryClient = useQueryClient();
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const isDeleting = mutation.isPending || mutation.isLoading;
  const deletingId = mutation.variables;

  const handleDelete = (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus post ini?");
    if (!confirmed) return;
    mutation.mutate(id);
  };

  const renderTags = (rawTags) => {
    if (!rawTags) return [];
    if (Array.isArray(rawTags)) return rawTags.filter(Boolean);
    return rawTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  };

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <section className="space-y-8 text-slate-100">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">Daftar Posts</h1>
          <p className="text-sm text-slate-400">
            Kelola konten yang tersimpan di Supabase dengan React Query dan animasi halus.
          </p>
        </div>
        <Link to="/posts/create" className="btn btn-primary gap-2 self-start md:self-auto">
          <span className="text-lg leading-none">+</span>
          Tambah Post
        </Link>
      </header>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-48 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-primary/5"
            >
              <div className="h-6 w-2/3 animate-pulse rounded bg-slate-700/50" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-700/40" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-700/30" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-700/30" />
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-700/40" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-700/40" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="alert alert-error border border-error/30 bg-error/10 text-error-content">
          <span>Gagal memuat posts: {error.message}</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-primary/30 bg-slate-900/60 p-12 text-center shadow-lg shadow-primary/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 text-3xl text-primary">
            +
          </div>
          <div>
            <p className="text-xl font-semibold text-slate-100">Belum ada post</p>
            <p className="mt-2 text-sm text-slate-400">
              Mulai buat konten pertama kamu dan simpan langsung ke Supabase.
            </p>
          </div>
          <Link to="/posts/create" className="btn btn-secondary">
            Tambah Post Pertama
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, idx) => {
            const tags = renderTags(post.tags);
            const postDeleting = isDeleting && deletingId === post.id;
            return (
              <Motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-primary/10 backdrop-blur-lg"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-semibold text-slate-100 group-hover:text-primary">
                      {post.title}
                    </h2>
                    <span className="rounded-full border border-slate-700/60 px-3 py-1 text-xs text-slate-400">
                      {post.author || "Tanpa penulis"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">{post.body}</p>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
                  <span>{formatDate(post.created_at) || "Tanggal tidak tersedia"}</span>
                  <div className="flex gap-2">
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="btn btn-ghost btn-sm text-secondary hover:text-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className={`btn btn-error btn-sm text-error-content ${postDeleting ? "loading" : ""}`}
                      disabled={postDeleting}
                    >
                      {postDeleting ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                </div>
              </Motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
