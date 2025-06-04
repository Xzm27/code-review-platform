import type { Metadata } from "next";
import Link from 'next/link';
import "./globals.css";

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
        <nav className="bg-blue-500 text-white p-4 flex justify-between">
          <Link href="/" className="font-bold">Code Review</Link>
          <div>
            <Link href="/login" className="mr-4">Login</Link>
            <Link href="/submit">Submit Code</Link>
          </div>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
