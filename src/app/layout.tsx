import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miesta QR Menü",
  description:
    "Bakırköy Miesta Cafe için yumuşak tonlarda tasarlanmış QR menü deneyimi.",
  openGraph: {
    title: "Miesta Cafe QR Menü",
    description:
      "Bakırköy Miesta Cafe'nin imza içecekleri ve taze atıştırmalıkları için modern QR menü.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
