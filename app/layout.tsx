import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteTitle, siteDescription } from "@/lib/contentResolver";

const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-garamond",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={`${garamond.variable} ${inter.variable} grain-overlay`}>
      <body className="bg-[#f2f5ee] text-[#2c302a] antialiased font-sans">{children}</body>
    </html>
  );
}
