import type { Metadata } from "next";
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
