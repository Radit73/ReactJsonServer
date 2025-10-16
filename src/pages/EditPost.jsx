import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as Motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
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

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setValue("author", data.author);
      setValue("tags", data.tags.join(", "));
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const { error } = await supabase
        .from("posts")
        .update({
          ...updatedPost,
          tags: updatedPost.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
  });

  // ⬇️ kode tampilan tetap sama ⬇️
  return (
    <section className="grid gap-8 text-slate-100 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* ...JSX kamu tetap sama */}
    </section>
  );
}
