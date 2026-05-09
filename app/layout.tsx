import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atakan Timuçin Portfolyo",
  description: "Atakan Timuçin portfolyo sitesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
