import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Automate Restro",
  description: "Making Smarter Restro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-4 pb-4">
        <header className="sticky top-0 py-4"><Header/></header>
        {children}</body>
    </html>
  );
}
