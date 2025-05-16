import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    title: "BMI 계산기 | 무료 체질량지수 계산",
    description:
      "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요. 키와 몸무게를 입력하면 바로 BMI 수치와 비만도를 확인할 수 있습니다.",
    siteName: "BMI 계산기",
    images: [
      {
        url: "https://your-domain.com/images/og-image.svg",
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
    images: ["https://your-domain.com/images/og-image.svg"],
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
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
