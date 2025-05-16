import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI 계산기 | 무료 체질량지수 계산",
  description:
    "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요. 키와 몸무게를 입력하면 바로 BMI 수치와 비만도를 확인할 수 있습니다.",
  keywords: "BMI, 체질량지수, 비만도, 체중계산, 건강, 다이어트, 무료계산기",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bmi.zucca100.com",
    title: "BMI 계산기 | 무료 체질량지수 계산",
    description:
      "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요. 키와 몸무게를 입력하면 바로 BMI 수치와 비만도를 확인할 수 있습니다.",
    siteName: "BMI 계산기",
    images: [
      {
        url: "https://bmi.zucca100.com/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "BMI 계산기 로고 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI 계산기 | 무료 체질량지수 계산",
    description: "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요.",
    images: ["https://bmi.zucca100.com/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="ylRZwQXQH9ZVegPDqDJGKHanYBIwb2fDMD_NWF917FI"
        />
        <meta
          name="naver-site-verification"
          content="6feae1f36f2e4766975481e81ca8009c89ba99e4"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          data-overlays="bottom"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
