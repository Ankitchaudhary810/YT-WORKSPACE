import type { Metadata } from "next";
import { Inter, Montserrat, Rubik } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Editor - Yt worksapce",
  description: "Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
