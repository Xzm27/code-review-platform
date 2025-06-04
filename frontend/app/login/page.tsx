"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { access } = await login(username, password);
      localStorage.setItem("token", access);
      setMessage("Login successful!");
      router.push("/submit");
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-8 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder="Username"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Login
        </button>
        <p className="mt-2 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
