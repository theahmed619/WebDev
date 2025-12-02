import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Full-Stack App",
  description: "creating fullstack app using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
