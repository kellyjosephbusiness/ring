import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../../public/sites/iclosed/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../../public/sites/iclosed/fonts/inter-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/inter-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/inter-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../../public/sites/iclosed/fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

const interDisplay = localFont({
  variable: "--font-inter-display",
  display: "swap",
  src: [
    { path: "../../public/sites/iclosed/fonts/inter-display-500-latin.woff2", weight: "500", style: "normal" },
  ],
});

const title = "iClosed - AI scheduler powering high-ticket sales teams";
const description =
  "Boost sales and save time. iClosed scheduler captures up to 200% more leads by collecting info before showing time slots — while disqualifying non-buyers.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { "max-image-preview": "large" },
  icons: {
    icon: [
      { url: "/sites/iclosed/meta/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/sites/iclosed/meta/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: ["/sites/iclosed/meta/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/sites/iclosed/meta/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${interDisplay.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
