import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";

export const metadata: Metadata = {
  metadataBase: new URL('https://heynomus.xyz'),
  title: {default:"Heynomus — Follow the evidence",template:"%s · Heynomus"},
  description: "An independent research workspace for Robinhood Chain. Follow builders, inspect evidence, and keep your research connected.",
  icons: {
    icon: "/brand/heynomus-symbol.png",
    shortcut: "/brand/heynomus-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
