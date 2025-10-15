import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  body: z.string().min(10, "Isi minimal 10 karakter"),
  author: z.string().nonempty("Nama penulis wajib diisi"),
  tags: z.string(),
});

export default function CreatePost() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      tags: data.tags.split(",").map((t) => t.trim()),
    };
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    alert("✅ Post berhasil disimpan!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        ✍️ Buat Postingan Baru
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
          <button type="submit" className="btn btn-primary">Simpan</button>
          <Link to="/posts" className="btn btn-ghost">Batal</Link>
        </div>
      </form>
    </div>
  );
}
