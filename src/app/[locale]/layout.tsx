import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import React from "react";
import Script from "next/script";

// Define available locales
const locales = ["ko", "en", "ja"];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "ko";

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <meta
          name="google-site-verification"
          content="ylRZwQXQH9ZVegPDqDJGKHanYBIwb2fDMD_NWF917FI"
        />
        <meta
          name="naver-site-verification"
          content="6feae1f36f2e4766975481e81ca8009c89ba99e4"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
