'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CodeEditor from "../components/codeEditor";
import { SubmitCode } from "../lib/api";

const SubmitPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      router.push("/login")
    }
  }, [router])

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please Login First!");
      return;
    }
    try {
      const response = await SubmitCode(token, code, language);
      setMessage(`Submission successful! ID: ${response.id}`);
    } catch (error) {
      setMessage("Submission Failed.");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Submit Code</h1>
      <div className="mb-4">
        <label className="mr-2">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 rounded bg-black"
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <CodeEditor value={code} onChange={setCode} language={language} />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default SubmitPage;
