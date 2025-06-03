"use client";
import React, { useState } from "react";
import CodeEditor from "../components/codeEditor";
import { login, SubmitCode } from "../lib/api";

const SubmitPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("username"); // Hardcoded for testing
  const [password, setPassword] = useState<string>("password"); // Hardcoded for testing

  const handleLogin = async () => {
    try {
      const { access } = await login(username, password);
      localStorage.setItem("token", access);
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed.");
    }
  };

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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 mr-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      </div>
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
