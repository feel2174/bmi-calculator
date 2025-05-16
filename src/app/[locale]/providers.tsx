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
        Loading...
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
