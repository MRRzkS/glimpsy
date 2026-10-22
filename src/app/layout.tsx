import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Glimpsy — Freelance opportunity intelligence",
    template: "%s — Glimpsy",
  },
  description:
    "Turn scattered freelance listings into a focused queue of projects worth your attention.",
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
