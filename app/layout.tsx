import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yash-agrawal.dev"),
  title: "Yash Agrawal — pre-final year student at IIT Roorkee",
  description:
    "Yash Agrawal — a pre-final year student at IIT Roorkee who builds distributed and high-performance systems in Rust and C++. FluxDB, MatchBench, EdgeProxy and more.",
  openGraph: {
    type: "website",
    title: "Yash Agrawal — pre-final year student at IIT Roorkee",
    description: "Builds distributed and high-performance systems in Rust and C++. Trusts p99 over averages.",
    images: ["/assets/arbitrum-openhouse.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal — pre-final year student at IIT Roorkee",
    description: "Builds distributed and high-performance systems in Rust and C++. Trusts p99 over averages.",
    images: ["/assets/arbitrum-openhouse.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
