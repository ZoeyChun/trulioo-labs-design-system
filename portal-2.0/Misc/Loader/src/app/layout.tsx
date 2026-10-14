import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loader",
  description: "Portal 2.0 loader experiments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
