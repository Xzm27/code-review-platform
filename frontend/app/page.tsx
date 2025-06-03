import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Code Review Platform</h1>
      <p className="text-lg mb-6">
        Submit and analyze code with AI-powered insights.
      </p>
      <Link
        href="/submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Coding
      </Link>
    </div>
  );
};

export default Home;
