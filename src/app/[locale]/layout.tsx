import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
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

// Dynamically generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // params는 Promise이므로 await으로 처리
  const resolvedParams = await params;

  // Fallback to 'ko' if the provided locale is not valid
  const resolvedLocale =
    resolvedParams?.locale && locales.includes(resolvedParams.locale)
      ? resolvedParams.locale
      : "ko";

  // For Korean (default)
  if (resolvedLocale === "ko") {
    return {
      title: "BMI 계산기 | 무료 체질량지수 계산",
      description:
        "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요. 키와 몸무게를 입력하면 바로 BMI 수치와 비만도를 확인할 수 있습니다.",
      keywords: "BMI, 체질량지수, 비만도, 체중계산, 건강, 다이어트, 무료계산기",
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
        description:
          "무료 온라인 BMI 계산기로 당신의 체질량지수를 계산해보세요.",
        images: ["https://bmi.zucca100.com/android-chrome-512x512.png"],
      },
    };
  }
  // For English
  else if (resolvedLocale === "en") {
    return {
      title: "BMI Calculator | Free Body Mass Index Calculator",
      description:
        "Calculate your Body Mass Index with our free online BMI calculator. Enter your height and weight to instantly check your BMI and weight status.",
      keywords:
        "BMI, Body Mass Index, weight status, weight calculation, health, diet, free calculator",
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://bmi.zucca100.com",
        title: "BMI Calculator | Free Body Mass Index Calculator",
        description:
          "Calculate your Body Mass Index with our free online BMI calculator. Enter your height and weight to instantly check your BMI and weight status.",
        siteName: "BMI Calculator",
        images: [
          {
            url: "https://bmi.zucca100.com/android-chrome-512x512.png",
            width: 1200,
            height: 630,
            alt: "BMI Calculator Logo Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "BMI Calculator | Free Body Mass Index Calculator",
        description:
          "Calculate your Body Mass Index with our free online BMI calculator.",
        images: ["https://bmi.zucca100.com/android-chrome-512x512.png"],
      },
    };
  }
  // For Japanese
  else if (resolvedLocale === "ja") {
    return {
      title: "BMI計算機 | 無料ボディマス指数計算",
      description:
        "無料オンラインBMI計算機であなたのボディマス指数を計算しましょう。身長と体重を入力すれば、すぐにBMI値と体型判定が確認できます。",
      keywords:
        "BMI, ボディマス指数, 体型判定, 体重計算, 健康, ダイエット, 無料計算機",
      openGraph: {
        type: "website",
        locale: "ja_JP",
        url: "https://bmi.zucca100.com",
        title: "BMI計算機 | 無料ボディマス指数計算",
        description:
          "無料オンラインBMI計算機であなたのボディマス指数を計算しましょう。身長と体重を入力すれば、すぐにBMI値と体型判定が確認できます。",
        siteName: "BMI計算機",
        images: [
          {
            url: "https://bmi.zucca100.com/android-chrome-512x512.png",
            width: 1200,
            height: 630,
            alt: "BMI計算機ロゴ画像",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "BMI計算機 | 無料ボディマス指数計算",
        description:
          "無料オンラインBMI計算機であなたのボディマス指数を計算しましょう。",
        images: ["https://bmi.zucca100.com/android-chrome-512x512.png"],
      },
    };
  }

  // Fallback (shouldn't happen with our checks)
  return {
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index with our free online BMI calculator.",
  };
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
        <Analytics/>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
