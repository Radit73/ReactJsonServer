import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Schema validasi
const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  body: z.string().min(10, "Isi postingan minimal 10 karakter"),
  author: z.string().nonempty("Nama penulis wajib diisi"),
  tags: z.string(),
});

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Ambil data post
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      if (!res.ok) throw new Error("Gagal fetch post");
      return res.json();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostSchema),
  });

  // Set nilai awal
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setValue("author", data.author);
      setValue("tags", data.tags.join(", "));
    }
  }, [data, setValue]);

  // Mutation update
  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedPost,
          tags: updatedPost.tags.split(",").map((t) => t.trim()),
        }),
      });
      if (!res.ok) throw new Error("Gagal update post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isLoading)
    return <div className="text-center text-gray-500 mt-10">⏳ Memuat data...</div>;
  if (isError)
    return <div className="text-center text-red-500 mt-10">❌ {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        ✏️ Edit Postingan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Judul" className="input input-bordered w-full" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <textarea {...register("body")} placeholder="Isi postingan" className="textarea textarea-bordered w-full"></textarea>
        {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}

        <input {...register("author")} placeholder="Penulis" className="input input-bordered w-full" />
        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}

        <input {...register("tags")} placeholder="Tags (pisahkan dengan koma)" className="input input-bordered w-full" />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${mutation.isLoading ? "loading" : ""}`}
          >
            {mutation.isLoading ? "Menyimpan..." : "Update"}
          </button>
          <Link to="/posts" className="btn btn-ghost">
            Batal
          </Link>
        </div>
      </form>

      {mutation.isError && (
        <p className="text-center text-red-500 mt-4">
          ❌ {mutation.error.message}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="text-center text-green-500 mt-4">
          ✅ Post berhasil diupdate!
        </p>
      )}
    </div>
  );
}
