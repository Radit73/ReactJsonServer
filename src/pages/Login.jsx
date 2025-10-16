import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Masukkan username terlebih dahulu.");
    setIsSubmitting(true);
    setTimeout(() => {
      login(username.trim());
      navigate("/");
    }, 450);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 px-6 py-16 shadow-2xl shadow-primary/20">
      <Motion.div
        className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/40 blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.35),transparent_45%)]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col-reverse gap-8 text-white md:flex-row md:items-center">
        <Motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 space-y-4 text-sm text-white/80 md:text-base"
        >
          <h1 className="text-3xl font-bold text-primary-content md:text-4xl">
            Selamat datang kembali
          </h1>
          <p>
            Masuk untuk mengakses seluruh fitur dashboard. Username cukup satu kata dan akan
            tersimpan sementara melalui Zustand.
          </p>
          <ul className="space-y-2 text-slate-200">
            <li>- Data login digunakan untuk menampilkan badge pengguna.</li>
            <li>- Informasi tersimpan di localStorage, sehingga bertahan setelah refresh.</li>
            <li>- Logout kapan saja melalui tombol pada navbar.</li>
          </ul>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-100 shadow-xl shadow-primary/10 backdrop-blur"
        >
          <h2 className="text-center text-lg font-semibold text-primary">Login</h2>
          <p className="mt-2 text-center text-xs text-slate-300">
            Username apa pun akan diterima selama tidak kosong.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wide text-slate-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
                className="input input-bordered mt-2 w-full border-primary/60 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </Motion.div>
      </div>
    </section>
  );
}
