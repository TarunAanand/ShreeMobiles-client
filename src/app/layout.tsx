import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Mobiles",
  description: "Generated by create next app",
    icons: {
    icon: "/icon.ico", 
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
        className={`${GeistSans} ${GeistMono} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
