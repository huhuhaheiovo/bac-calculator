import type { Metadata } from "next";
import {getLocale} from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baccalculator.me"),
  title: {
    default: "BAC Calculator",
    template: "%s | BAC Calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
