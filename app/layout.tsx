import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const PeerProvider = dynamic(() => import("@/contexts/PeerContext"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "quick-share",
  description: "Effortlessly move files between your devices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto h-screen flex flex-col p-4 relative">
          <Header />
          <PeerProvider>{children}</PeerProvider>
        </div>
      </body>
    </html>
  );
}
