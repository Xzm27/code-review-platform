import type { Metadata } from "next";
import Link from 'next/link';
import "./globals.css";

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Code Review Platform",
  description: "AI-powered code review tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
