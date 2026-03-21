import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bac-calculator.com"),
  title: {
    default: "BAC Calculator - Estimate Blood Alcohol Content Instantly",
    template: "%s | BAC Calculator",
  },
  description:
    "Free BAC calculator using the Widmark formula to estimate blood alcohol content, legal limits, and time to sober.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
