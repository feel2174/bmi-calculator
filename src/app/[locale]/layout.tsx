import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import "./globals.css";

const locales = ["ko", "en", "ja"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "ko") {
    return {
      title: "BMI 계산기 | 무료 체질량지수 계산",
      description:
        "무료 온라인 BMI 계산기로 키와 몸무게를 입력해 체질량지수와 체중 상태를 확인해 보세요.",
    };
  }

  if (locale === "ja") {
    return {
      title: "BMI計算機 | 無料ボディマス指数計算",
      description:
        "無料のオンラインBMI計算機で、身長と体重を入力してBMIと体重状態を確認できます。",
    };
  }

  return {
    title: "BMI Calculator | Free Body Mass Index Calculator",
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
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      <Analytics />
      <Providers locale={locale}>{children}</Providers>
    </>
  );
}
