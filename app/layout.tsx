import type { Metadata } from "next";
import "./globals.css";
import ReactQueryContext from "@/lib/context/react-query-context";
import { AuthProvider } from "@/lib/context/auth-context";

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
  
  alternates: {
    canonical: "https://shertalks.com", // Replace with your actual domain
  },
  category: "Finance & Education",
  classification: "Stock Market Education Platform",
  other: {
    "google-site-verification": "your-google-verification-code", // Add your verification code
    "application-name": "Sher Talks",
    "msapplication-TileColor": "#2b5797",
    "theme-color": "#ffffff",
  },
  
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
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
        {/* Additional meta tags for Nepal-specific SEO */}
        <meta name="geo.region" content="NP" />
        <meta name="geo.country" content="Nepal" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="language" content="en-NP" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Sher Talks",
              description:
                "Nepal's premier stock market education platform offering courses and portfolio management systems",
              url: "https://shertalks.com",
              logo: "https://shertalks.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "NP",
                availableLanguage: ["English", "Nepali"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "NP",
              },
              sameAs: [
                "https://facebook.com/shertalks",
                "https://instagram.com/shertalks",
                "https://linkedin.com/company/shertalks",
              ],
            }),
          }}
        />
      </head>
      <body cz-shortcut-listen="false"
>
        <ReactQueryContext>
          <AuthProvider enableQuery={false}>{children}</AuthProvider>
        </ReactQueryContext>
      </body>
    </html>
  );
}
