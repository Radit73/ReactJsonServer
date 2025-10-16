export default function Home() {
  return (
    <div className="hero min-h-[calc(100vh-5rem)] bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-center text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_40%_30%,rgba(168,85,247,0.3),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.25),transparent_60%)] animate-pulse"></div>

      <div className="hero-content flex flex-col justify-center items-center px-6 w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fadeIn">
          Welcome to the Home Page
        </h1>
        <p className="py-6 text-lg md:text-xl max-w-3xl text-gray-200">
          A modern app built with <span className="text-purple-400 font-semibold">React</span>,{" "}
          <span className="text-pink-400 font-semibold">DaisyUI</span>,{" "}
          <span className="text-yellow-300 font-semibold">Zustand</span>, and{" "}
          <span className="text-blue-400 font-semibold">React Query</span>.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-primary btn-wide shadow-lg animate-bounce">
            Get Started
          </button>
          <button className="btn btn-outline btn-accent shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
