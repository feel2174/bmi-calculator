"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const TABOOLA_RIGHT_RAIL_SCRIPT = `
  window._taboola = window._taboola || [];
  _taboola.push({
    mode: 'thumbnails-rr',
    container: 'taboola-right-rail-thumbnails',
    placement: 'Right Rail Thumbnails',
    target_type: 'mix'
  });
`;

const TABOOLA_BELOW_ARTICLE_SCRIPT = `
  window._taboola = window._taboola || [];
  _taboola.push({
    mode: 'alternating-thumbnails-a',
    container: 'taboola-below-article-thumbnails',
    placement: 'Below Article Thumbnails',
    target_type: 'mix'
  });
`;

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [ageGroup, setAgeGroup] = useState("adult");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (bmi !== null && !adsLoaded) {
      try {
        if (window.adsbygoogle && window.adsbygoogle.push) {
          window.adsbygoogle.push({});
          setAdsLoaded(true);
        } else {
          const timer = setTimeout(() => {
            if (window.adsbygoogle && window.adsbygoogle.push) {
              window.adsbygoogle.push({});
              setAdsLoaded(true);
            }
          }, 2000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [adsLoaded, bmi]);

  useEffect(() => {
    if (bmi === null) {
      setAdsLoaded(false);
    }
  }, [bmi]);

  const safeT = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  const calculateBMI = () => {
    if (!height || !weight) {
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(2)));

    if (ageGroup === "adult") {
      if (bmiValue < 18.5) {
        setStatus(safeT("bmiStatus.underweight", "Underweight"));
      } else if (bmiValue < 23) {
        setStatus(safeT("bmiStatus.normal", "Normal"));
      } else if (bmiValue < 25) {
        setStatus(safeT("bmiStatus.overweight", "Overweight"));
      } else if (bmiValue < 30) {
        setStatus(safeT("bmiStatus.obese", "Obese"));
      } else {
        setStatus(safeT("bmiStatus.severelyObese", "Severely obese"));
      }
      return;
    }

    if (ageGroup === "senior") {
      if (bmiValue < 20) {
        setStatus(safeT("bmiStatus.underweight", "Underweight"));
      } else if (bmiValue < 24) {
        setStatus(safeT("bmiStatus.normal", "Normal"));
      } else if (bmiValue < 27) {
        setStatus(safeT("bmiStatus.overweight", "Overweight"));
      } else if (bmiValue < 30) {
        setStatus(safeT("bmiStatus.obese", "Obese"));
      } else {
        setStatus(safeT("bmiStatus.severelyObese", "Severely obese"));
      }
      return;
    }

    if (bmiValue < 15) {
      setStatus(safeT("bmiStatus.underweight", "Underweight"));
    } else if (bmiValue < 21) {
      setStatus(safeT("bmiStatus.normal", "Normal"));
    } else if (bmiValue < 24) {
      setStatus(safeT("bmiStatus.overweight", "Overweight"));
    } else {
      setStatus(safeT("bmiStatus.obese", "Obese"));
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setAgeGroup("adult");
  };

  const changeLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-between p-6 md:p-24 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="mb-6 flex w-full flex-col items-center md:mb-0">
        <div className="my-4 flex justify-center space-x-2 md:absolute md:top-4 md:right-4 md:my-0 md:justify-end">
          <button
            onClick={() => changeLanguage("ko")}
            className={`text-sm ${
              locale === "ko"
                ? "font-bold text-blue-500"
                : isDarkMode
                  ? "text-blue-300 hover:text-blue-400"
                  : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {safeT("language.ko", "Korean")}
          </button>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-400"}>
            |
          </span>
          <button
            onClick={() => changeLanguage("en")}
            className={`text-sm ${
              locale === "en"
                ? "font-bold text-blue-500"
                : isDarkMode
                  ? "text-blue-300 hover:text-blue-400"
                  : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {safeT("language.en", "English")}
          </button>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-400"}>
            |
          </span>
          <button
            onClick={() => changeLanguage("ja")}
            className={`text-sm ${
              locale === "ja"
                ? "font-bold text-blue-500"
                : isDarkMode
                  ? "text-blue-300 hover:text-blue-400"
                  : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {safeT("language.ja", "Japanese")}
          </button>
        </div>
        <h1 className="mt-2 text-center text-3xl font-bold md:mt-8 md:text-4xl">
          {safeT("header.pageTitle", "BMI Calculator")}
        </h1>
      </div>

      <div className="z-10 w-full max-w-6xl font-mono text-sm">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-center">
          <article className="w-full max-w-3xl">
            <div
              className={`mx-auto w-full max-w-md rounded-lg p-6 shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className={`mb-2 block text-sm font-bold ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {safeT("inputs.height", "Height (cm)")}
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className={`w-full rounded border px-3 py-2 leading-tight shadow appearance-none focus:outline-none focus:shadow-outline ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                  placeholder={safeT("inputs.heightPlaceholder", "Enter cm")}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="weight"
                  className={`mb-2 block text-sm font-bold ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {safeT("inputs.weight", "Weight (kg)")}
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  className={`w-full rounded border px-3 py-2 leading-tight shadow appearance-none focus:outline-none focus:shadow-outline ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                  placeholder={safeT("inputs.weightPlaceholder", "Enter kg")}
                />
              </div>

              <div className="mb-6">
                <label
                  className={`mb-2 block text-sm font-bold ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {safeT("inputs.ageGroup", "Select age group")}
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setAgeGroup("child")}
                    className={`flex-1 rounded-md px-3 py-2 text-sm ${
                      ageGroup === "child"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {safeT("inputs.child", "Child/Teen")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgeGroup("adult")}
                    className={`flex-1 rounded-md px-3 py-2 text-sm ${
                      ageGroup === "adult"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {safeT("inputs.adult", "Adult")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgeGroup("senior")}
                    className={`flex-1 rounded-md px-3 py-2 text-sm ${
                      ageGroup === "senior"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {safeT("inputs.senior", "Senior (65+)")}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={calculateBMI}
                  className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  {safeT("buttons.calculate", "Calculate")}
                </button>
                <button
                  onClick={resetCalculator}
                  className="w-full rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                >
                  {safeT("buttons.reset", "Reset")}
                </button>
              </div>

              {bmi !== null && (
                <div
                  className={`mt-6 rounded-md p-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <h2 className="mb-2 text-xl font-bold">
                    {safeT("results.title", "Results")}
                  </h2>
                  <p className="mb-1">
                    {safeT("results.bmi", "BMI")}:{" "}
                    <span className="font-bold">{bmi}</span>
                  </p>
                  <p>
                    {safeT("results.status", "Status")}:{" "}
                    <span className="font-bold">{status}</span>
                    {ageGroup === "child" && (
                      <span
                        className={`ml-2 text-xs ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {safeT("results.childNote", "(child/teen range)")}
                      </span>
                    )}
                    {ageGroup === "senior" && (
                      <span
                        className={`ml-2 text-xs ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {safeT("results.seniorNote", "(senior range)")}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {bmi !== null && (
              <div className="mx-auto mt-8 w-full max-w-md">
                <div
                  className={`rounded-md p-4 text-center ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-200"
                  }`}
                >
                  <p
                    className={`mb-2 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {safeT("advertisements", "Advertisement")}
                  </p>
                  <div
                    className={`flex h-60 flex-col items-center justify-center rounded border p-3 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <ins
                      className="adsbygoogle"
                      style={{ display: "block" }}
                      data-ad-client="ca-pub-9196149361612087"
                      data-ad-slot="9277294823"
                      data-ad-format="auto"
                      data-full-width-responsive="true"
                    ></ins>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`mx-auto mt-8 w-full max-w-md rounded-lg p-6 shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="mb-2 text-xl font-bold">
                {safeT("infoSection.title", "What is BMI?")}
              </h2>
              <p className="mb-3">
                {safeT(
                  "infoSection.description",
                  "BMI estimates body weight status using weight in kilograms divided by height in meters squared."
                )}
              </p>
              <p
                className={`rounded p-2 font-mono text-sm ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {safeT(
                  "infoSection.formula",
                  "Formula: BMI = weight (kg) / (height (m) x height (m))"
                )}
              </p>

              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">
                  {safeT("categories.title", "BMI categories (adult range)")}
                </h3>
                <ul className="space-y-1">
                  <li className={isDarkMode ? "text-blue-300" : "text-blue-600"}>
                    {safeT("categories.underweight", "Underweight: under 18.5")}
                  </li>
                  <li className={isDarkMode ? "text-green-300" : "text-green-600"}>
                    {safeT("categories.normal", "Normal: 18.5 - 22.9")}
                  </li>
                  <li
                    className={isDarkMode ? "text-yellow-300" : "text-yellow-600"}
                  >
                    {safeT("categories.overweight", "Overweight: 23 - 24.9")}
                  </li>
                  <li
                    className={isDarkMode ? "text-orange-300" : "text-orange-600"}
                  >
                    {safeT("categories.obese", "Obese: 25 - 29.9")}
                  </li>
                  <li className={isDarkMode ? "text-red-300" : "text-red-600"}>
                    {safeT("categories.severelyObese", "Severely obese: 30+")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mx-auto mt-10 w-full max-w-3xl">
              <div
                id="taboola-below-article-thumbnails"
                className={`min-h-24 rounded-lg border p-4 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              />
              <Script
                id="taboola-below-article"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: TABOOLA_BELOW_ARTICLE_SCRIPT }}
              />
            </div>
          </article>

          <aside className="hidden w-full max-w-xs shrink-0 lg:block">
            <div className="sticky top-8">
              <div
                id="taboola-right-rail-thumbnails"
                className={`min-h-96 rounded-lg border p-4 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              />
              <Script
                id="taboola-right-rail"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: TABOOLA_RIGHT_RAIL_SCRIPT }}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
