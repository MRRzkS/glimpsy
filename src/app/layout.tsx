import type { Metadata } from "next";
import "./globals.css";
import "./responsive-polish.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
