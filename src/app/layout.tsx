import type { Metadata } from "next";
import { DM_Sans, DM_Mono, EB_Garamond } from "next/font/google";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import AgentationWrapper from "@/components/ui/AgentationWrapper";
import ThemeScript from "@/components/ui/ThemeScript";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],       // optical size axis (9–40)
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
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
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${ebGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <AgentationWrapper />
      </body>
    </html>
  );
}
