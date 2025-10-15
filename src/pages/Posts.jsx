import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function fetchPosts() {
  const res = await fetch("http://localhost:5000/posts");
  if (!res.ok) throw new Error("Gagal fetch posts");
  return res.json();
}

async function deletePost(id) {
  const res = await fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus post");
  return res.json();
}

export default function Posts() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  if (isLoading)
    return <div className="text-center mt-10 text-gray-500">⏳ Loading posts...</div>;
  if (isError)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">Daftar Postingan</h1>
        <Link to="/posts/create" className="btn btn-primary btn-sm">
          + Buat Post
        </Link>
      </div>

      <div className="grid gap-4">
        {data.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.body}</p>
              <p className="text-sm text-gray-500">✍️ {post.author}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {post.tags?.map((tag, i) => (
                  <span key={i} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to={`/posts/${post.id}/edit`} className="btn btn-warning btn-sm">
                  Edit
                </Link>
                <button
                  onClick={() => mutation.mutate(post.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
