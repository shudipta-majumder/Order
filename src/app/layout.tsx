import "@/styles/globals.scss";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import LayoutProvider from "./LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Walton",
    default: "Walton Corporate Price Quotation",
  },
  description: "Walton Corporate Price Quotation",
  icons: {
    icon: "/images/favicon/favicon-32x32.png",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
    other: {
      rel: "manifest",
      url: "/images/favicon/site.webmanifest",
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        id="root"
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
