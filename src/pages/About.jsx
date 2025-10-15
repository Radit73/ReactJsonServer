export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-xl p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-primary mb-4">About This App</h2>
      <p className="text-gray-600 leading-relaxed">
        This app showcases CRUD functionality using React Query, Zod, Zustand, 
        and DaisyUI with a mock backend powered by JSON Server.
      </p>
      <div className="alert alert-info mt-6">
        <span>💅 Styled entirely with DaisyUI.</span>
      </div>
    </div>
  );
}
