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
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
            🌸 React Modern Stack
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
      </div>

      {/* Routes */}
      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </main>

      <footer className="footer footer-center bg-base-100 text-base-content p-4 border-t">
        <aside>
          <p>
            Built with ❤️ using React + DaisyUI by <span className="text-primary font-semibold">Borodo</span>
          </p>
        </aside>
      </footer>
    </div>
  );
}
