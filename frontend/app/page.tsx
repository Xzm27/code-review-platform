import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Code Review Platform</h1>
      <p className="text-lg mb-6 text-gray-700">Submit and analyze code with AI-powered insights.</p>
      <Link
        href="/submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Start Coding
      </Link>
    </div>
  );
};

export default Home;
