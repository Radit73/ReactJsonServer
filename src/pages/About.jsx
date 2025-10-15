export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-xl p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-primary mb-4">About This App</h2>
      <p className="text-gray-600 leading-relaxed">
        This project is created as part of a practical task to explore modern React libraries and tools such as 
        <strong> React Query</strong>, <strong>React Hook Form</strong>, <strong>Zustand</strong>, and <strong>DaisyUI</strong>. 
        It demonstrates CRUD operations and form validation using a mock JSON API.
      </p>
      <div className="alert alert-info mt-6">
        <span>UI powered entirely by DaisyUI 🌸</span>
      </div>
    </div>
  );
}
