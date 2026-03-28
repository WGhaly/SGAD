import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SGAD — Architecture, Interior Design & Fitout | Egypt",
    template: "%s | SGAD",
  },
  description:
    "Al Safwa Group for Architecture and Decoration. Egypt's leading turnkey fitout contractor for banking, hospitality, restaurant and corporate interiors. 302+ projects across Egypt.",
  keywords: [
    "interior design Egypt",
    "fitout contractor Egypt",
    "bank fitout Cairo",
    "hotel interior design Egypt",
    "SGAD",
    "Al Safwa Group",
    "architecture decoration Egypt",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SGAD — Architecture & Interior Design",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F4]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
