import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const commissioner = Commissioner({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Crowdfunding Prouduct Page | FScode",
  description:
    "Solution for Crowdfuning Product Page challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${commissioner.className} flex min-h-screen flex-col antialiased scroll-smooth relative`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
