import type { Metadata } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { HOME_META } from "@/components/sites/ringondemand/seo/home-meta";
import { siteGraph } from "@/components/sites/ringondemand/seo/schema";
import { SITE } from "@/components/sites/ringondemand/seo/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: HOME_META.title,
  description: HOME_META.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/sites/ringondemand/meta/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    title: HOME_META.title,
    description: HOME_META.description,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META.title,
    description: HOME_META.description,
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
      <body>
        <JsonLd data={siteGraph()} />
        {children}
      </body>
    </html>
  );
}
