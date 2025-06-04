"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        Code Review
      </Link>
      <div className="space-x-4">
        <Link href="/login">Login</Link>
        <Link href="/submit">Submit Code</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
