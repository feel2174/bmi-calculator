import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TABOOLA_LOADER_SCRIPT = `(function () {
  var PUBLISHER_ID = 'zucca-network';
  var PAGE_TYPE = 'article';

  var LOADER_URL = '//cdn.taboola.com/libtrc/' + PUBLISHER_ID + '/loader.js';
  var LOADER_PRIVACY_URL = '//static.btloader.com/libtrc/' + PUBLISHER_ID + '/loader.privacy.js';
  var PIXEL_URL = 'https://static.cqvani.com/libtrc/t5?type=pixel&publisher=' + PUBLISHER_ID;
  var SCRIPT_ID = 'tbl_loader_script';

  window._taboola = window._taboola || [];

  var pageTypePush = {};
  pageTypePush[PAGE_TYPE] = 'auto';
  _taboola.push(pageTypePush);

  new Image().src = PIXEL_URL;

  var firstScript = document.getElementsByTagName('script')[0];

  function injectLoader(id, src, fallbackSrc) {
    if (document.getElementById(id)) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    s.id = id;
    if (fallbackSrc) {
      s.onerror = function () {
        if (s.parentNode) s.parentNode.removeChild(s);
        injectLoader(SCRIPT_ID + '_fb', fallbackSrc, null);
      };
    }
    firstScript.parentNode.insertBefore(s, firstScript);
  }

  injectLoader(SCRIPT_ID, LOADER_URL, LOADER_PRIVACY_URL);

  if (window.performance && typeof window.performance.mark === 'function') {
    window.performance.mark('tbl_ic');
  }
})();`;

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Free BMI calculator with multilingual support.",
  keywords: ["BMI", "BMI Calculator", "Body Mass Index", "Health"],
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    url: "https://bmi.zucca100.com",
    title: "BMI Calculator",
    description: "Free BMI calculator with multilingual support.",
    siteName: "BMI Calculator",
    images: [
      {
        url: "https://bmi.zucca100.com/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator",
    description: "Free BMI calculator with multilingual support.",
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
        <Script
          id="taboola-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: TABOOLA_LOADER_SCRIPT }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          id="taboola-flush"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window._taboola = window._taboola || []; _taboola.push({flush: true});",
          }}
        />
      </body>
    </html>
  );
}
