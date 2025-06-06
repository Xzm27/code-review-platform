'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';
import { submitCode, analyzeCode } from '../lib/api';

interface AnalysisResult {
  line: number;
  message: string;
  type: string;
  symbol: string;
}

const SubmitPage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('python');
  const [message, setMessage] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in.');
      return;
    }
    try {
      const response = await submitCode(token, code, language);
      setMessage(`Submission successful! ID: ${response.id}`);
    } catch (error) {
      setMessage('Submission failed.');
    }
  };

  const handleAnalyze = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in.');
      return;
    }
    try {
      const response = await analyzeCode(token, code, language);
      setAnalysisResults(response.results);
      setMessage('Analysis complete.');
    } catch (error) {
      setMessage('Analysis failed.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Submit Code</h1>
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="mr-2 font-semibold">Language:</label>
          <select
            value={language}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
            className="border p-2 rounded-lg w-full max-w-xs"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <CodeEditor value={code} onChange={setCode} language={language} />
        <div className="flex space-x-4">
          <button
            onClick={handleAnalyze}
            className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Analyze
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
        <p className="mt-2 text-gray-600">{message}</p>
        {analysisResults.length > 0 && (
          <div className="mt-4 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
            <ul className="list-disc pl-5">
              {analysisResults.map((result, index) => (
                <li key={index} className="text-gray-700">
                  Line {result.line}: {result.message} ({result.type})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitPage;