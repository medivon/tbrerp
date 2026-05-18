import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THAIBORAN ERP",
  description: "THAIBORAN ERP codebase foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
