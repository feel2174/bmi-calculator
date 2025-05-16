"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export function Providers({ locale, children }: ProvidersProps) {
  const [messages, setMessages] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        // 절대 경로에서 메시지 로드
        const msg = (await import(`../../../messages/${locale}/index.json`))
          .default;
        setMessages(msg);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // 기본 언어로 fallback
        try {
          const defaultMsg = (await import(`../../../messages/ko/index.json`))
            .default;
          setMessages(defaultMsg);
        } catch (fallbackError) {
          console.error("Failed to load fallback messages", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  // 메시지가 로드될 때까지 로딩 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-200 animate-pulse"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
