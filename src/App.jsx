import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { AnimatePresence, motion as Motion } from "framer-motion";

export default function App() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Posts", path: "/posts" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const closeMenu = () => setMenuOpen(false);

  const userInitials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Motion.div
          className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-3xl"
          animate={{ y: [0, 20, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-gradient-to-tr from-sky-500 via-purple-500 to-fuchsia-500 opacity-25 blur-[140px]"
          animate={{ y: [0, -15, 0], x: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.12),transparent_55%)]" />
      </div>

      <header className="sticky top-4 z-50 w-full px-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-base-200/40 bg-base-100/80 px-4 py-3 text-slate-900 shadow-xl backdrop-blur-lg">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/80 bg-clip-text text-lg font-bold text-transparent transition hover:scale-[1.01]"
            onClick={closeMenu}
          >
            React Modern Stack
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`btn btn-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? "btn-primary shadow-lg shadow-primary/30"
                    : "btn-ghost text-slate-600 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="avatar placeholder">
                  <div className="w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-base-100">
                    <span className="text-sm font-semibold">{userInitials}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Logged in as</span>
                  <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                </div>
                <button
                  className="btn btn-outline btn-sm border-primary/60 text-primary hover:bg-primary hover:text-primary-content"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            )}
          </div>

          <button
            className="btn btn-circle btn-ghost border border-base-200/70 text-slate-700 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <Motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-2 rounded-2xl border border-base-200/50 bg-base-100/95 p-4 text-slate-900 shadow-xl backdrop-blur-lg md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`btn btn-sm justify-start font-semibold ${
                    isActive(link.path) ? "btn-primary" : "btn-ghost text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="btn btn-error btn-sm justify-start"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="btn btn-primary btn-sm justify-start"
                >
                  Login
                </Link>
              )}
            </Motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 flex-grow px-4 pb-16 pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <Motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="rounded-3xl border border-white/5 bg-slate-900/80 p-6 text-slate-100 shadow-2xl shadow-primary/10 backdrop-blur"
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/:id/edit" element={<EditPost />} />
              </Routes>
            </Motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="relative z-10 mt-auto w-full bg-base-100/80 py-8 text-slate-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row md:text-left">
          <div>
            <p className="font-semibold text-slate-900">React Modern Stack Playground</p>
            <p className="text-slate-600">
              Built with React, Vite, DaisyUI, Zustand, React Query, and JSON Server.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full border border-primary/40 px-3 py-1 uppercase tracking-wide text-primary">
              Fast Dev
            </span>
            <span className="rounded-full border border-secondary/40 px-3 py-1 uppercase tracking-wide text-secondary">
              Animated UI
            </span>
            <span className="rounded-full border border-accent/40 px-3 py-1 uppercase tracking-wide text-accent">
              Responsive Design
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
