import type { Metadata } from "next";
import "./globals.css";
import ReactQueryContext from "@/lib/context/react-query-context";
import { AuthProvider } from "@/lib/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: {
    default: "Sher Talks - Nepal Stock Market Education & Portfolio Management",
    template: "%s | Sher Talks",
  },
  description:
    "Master Nepal Stock Market with expert courses and manage your portfolio effectively. Learn trading strategies, technical analysis, and investment planning from Nepal's leading stock market educators.",
  keywords: [
    "Nepal stock market",
    "NEPSE",
    "stock trading course",
    "portfolio management",
    "investment education",
    "technical analysis",
    "Nepal share market",
    "trading strategies",
    "financial literacy",
    "stock market training Nepal",
    "investment course",
    "share trading",
    "market analysis",
    "Nepal finance",
  ],
  authors: [{ name: "Nooloops", url: "https://nooloops.com" }],
  creator: "Nooloops",
  publisher: "Sher Talks",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="NP" />
        <meta name="geo.country" content="Nepal" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="language" content="en-NP" />
        {/* Schema.org structured data */}
      </head>
      <body cz-shortcut-listen="false">
        <ReactQueryContext>
          <AuthProvider enableQuery={true}>{children}</AuthProvider>
        </ReactQueryContext>
        <Toaster />
      </body>
    </html>
  );
}
