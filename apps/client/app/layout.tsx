import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import { Provider } from "@/lib/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  metadata,
}: Readonly<{
  children: React.ReactNode;
  metadata: { title: string; description: string };
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} bg-black text-white`}>
          <NavBar />
          <main>{children}</main>
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
