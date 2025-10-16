import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
            🌸 React Modern Stack
          </Link>
        </div>

        {/* Burger menu (mobile) */}
        <div className="flex-none lg:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/about">About</Link></li>
              {user ? (
                <li><button onClick={logout}>Logout</button></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </details>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-2">
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

      {/* Animated Routes */}
      <main className="flex-grow mt-20 p-6 max-w-6xl mx-auto w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/:id/edit" element={<EditPost />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="footer footer-center bg-base-200 text-base-content p-4 border-t mt-auto">
        <aside>
          <p>
            Built with <span className="text-error">❤️</span> using{" "}
            <span className="text-primary font-semibold">React + DaisyUI</span> 🌸
          </p>
        </aside>
      </footer>
    </div>
  );
}
