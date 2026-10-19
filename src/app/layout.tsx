import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../../public/sites/ringondemand/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../../public/sites/ringondemand/fonts/inter-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/inter-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/inter-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../../public/sites/ringondemand/fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

const title = "RingOnDemand | Inbound Calls for Enterprise Companies";
const description =
  "You set the criteria. We run the ads, screen every caller, and send the ones who qualify to your team as inbound calls or live transfers.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: [{ url: "/sites/ringondemand/meta/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
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
      className={`${poppins.variable} ${inter.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
