import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const { user, logout } = useAuthStore();

  return (
    // Gunakan flex layout biar footer bisa nempel di bawah
    <div className="flex flex-col min-h-screen bg-base-200">

      {/* Navbar */}
      <header className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
            🌸 ARF
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/posts" className="btn btn-ghost">Posts</Link>
          <Link to="/about" className="btn btn-ghost">About</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">👋 {user.name}</span>
              <button className="btn btn-error btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </header>

      {/* Konten utama */}
      <main className="flex-grow p-6 max-w-5xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </main>

      {/* Footer selalu di bawah */}
      <footer className="footer footer-center bg-base-100 text-base-content p-4 border-t mt-auto">
        <aside>
          <p>
            Built with ❤️ using <span className="font-semibold text-primary">React</span> +{" "}
            <span className="text-primary font-semibold">DaisyUI</span> by{" "}
            <span className="text-secondary font-bold">Afrizal.R.F</span>
          </p>
        </aside>
      </footer>
    </div>
  );
}
