export default function Home() {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-primary">Welcome to the Home Page</h1>
          <p className="py-6 text-gray-600">
            This app demonstrates how to use <strong>React Query</strong>, <strong>Zustand</strong>, <strong>Zod</strong>,
            and <strong>DaisyUI</strong> to build modern, interactive, and stylish apps.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
