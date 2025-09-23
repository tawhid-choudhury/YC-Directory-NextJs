import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Genasdasdasda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="font-work-sans antialiased">{children}</body>
    </html>
  );
}
