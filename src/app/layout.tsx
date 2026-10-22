import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Glimpsy — Freelance opportunity intelligence",
    template: "%s — Glimpsy",
  },
  description:
    "Find and evaluate freelance web development opportunities from multiple platforms in one focused workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
