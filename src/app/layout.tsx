import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/ui/Nav";
import AgentationWrapper from "@/components/ui/AgentationWrapper";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devansh Khajanchi — Portfolio",
  description: "Design, code, and creative work by Devansh Khajanchi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <AgentationWrapper />
      </body>
    </html>
  );
}
