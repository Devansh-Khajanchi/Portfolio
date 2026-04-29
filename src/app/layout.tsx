import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import Nav from "@/components/ui/Nav";
import AgentationWrapper from "@/components/ui/AgentationWrapper";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],       // optical size axis (9–40)
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Nav />
        <main>{children}</main>
        <AgentationWrapper />
        <DarkModeToggle />
      </body>
    </html>
  );
}
