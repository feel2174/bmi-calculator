"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Home() {
  // Get translations and locale
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [ageGroup, setAgeGroup] = useState("adult"); // adult, senior, child

  // 안전하게 메시지 접근을 위한 헬퍼 함수
  const safeT = (key: string, fallback: string): string => {
    try {
      return t(key);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`, error);
      return fallback;
    }
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));

      // BMI 상태 결정 - 연령대에 따라 다른 기준 적용
      if (ageGroup === "adult") {
        if (bmiValue < 18.5) {
          setStatus(safeT("bmiStatus.underweight", "저체중"));
        } else if (bmiValue >= 18.5 && bmiValue < 23) {
          setStatus(safeT("bmiStatus.normal", "정상"));
        } else if (bmiValue >= 23 && bmiValue < 25) {
          setStatus(safeT("bmiStatus.overweight", "과체중"));
        } else if (bmiValue >= 25 && bmiValue < 30) {
          setStatus(safeT("bmiStatus.obese", "비만"));
        } else {
          setStatus(safeT("bmiStatus.severelyObese", "고도비만"));
        }
      } else if (ageGroup === "senior") {
        // 노인은 조금 다른 기준 적용
        if (bmiValue < 20) {
          setStatus(safeT("bmiStatus.underweight", "저체중"));
        } else if (bmiValue >= 20 && bmiValue < 24) {
          setStatus(safeT("bmiStatus.normal", "정상"));
        } else if (bmiValue >= 24 && bmiValue < 27) {
          setStatus(safeT("bmiStatus.overweight", "과체중"));
        } else if (bmiValue >= 27 && bmiValue < 30) {
          setStatus(safeT("bmiStatus.obese", "비만"));
        } else {
          setStatus(safeT("bmiStatus.severelyObese", "고도비만"));
        }
      } else if (ageGroup === "child") {
        // 소아/청소년은 더 유연한 기준 적용
        if (bmiValue < 15) {
          setStatus(safeT("bmiStatus.underweight", "저체중"));
        } else if (bmiValue >= 15 && bmiValue < 21) {
          setStatus(safeT("bmiStatus.normal", "정상"));
        } else if (bmiValue >= 21 && bmiValue < 24) {
          setStatus(safeT("bmiStatus.overweight", "과체중"));
        } else if (bmiValue >= 24) {
          setStatus(safeT("bmiStatus.obese", "비만"));
        }
      }
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setAgeGroup("adult");
  };

  // 광고 스크립트를 위한 useEffect
  useEffect(() => {
    // Google AdSense 스크립트 로드 (실제 사용 시 본인의 광고 ID로 변경 필요)
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      try {
        document.head.removeChild(script);
      } catch {
        // Script might not be in the document anymore
      }
    };
  }, []);

  // 언어 전환 적용
  const changeLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  // 언어 전환 섹션을 위한 컴포넌트
  const LanguageSelector = () => {
    return (
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => changeLanguage("ko")}
          className={`text-sm ${
            locale === "ko"
              ? "text-blue-700 font-bold"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          {safeT("language.ko", "한국어")}
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={() => changeLanguage("en")}
          className={`text-sm ${
            locale === "en"
              ? "text-blue-700 font-bold"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          {safeT("language.en", "English")}
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={() => changeLanguage("ja")}
          className={`text-sm ${
            locale === "ja"
              ? "text-blue-700 font-bold"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          {safeT("language.ja", "日本語")}
        </button>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 relative">
      <LanguageSelector />

      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          {safeT("header.pageTitle", "BMI 계산기")}
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="height"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {safeT("inputs.height", "키 (cm)")}
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={safeT("inputs.heightPlaceholder", "cm 단위로 입력")}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="weight"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {safeT("inputs.weight", "몸무게 (kg)")}
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={safeT("inputs.weightPlaceholder", "kg 단위로 입력")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {safeT("inputs.ageGroup", "연령대 선택")}
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setAgeGroup("child")}
                className={`py-2 px-3 text-sm rounded-md flex-1 ${
                  ageGroup === "child"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {safeT("inputs.child", "소아/청소년")}
              </button>
              <button
                type="button"
                onClick={() => setAgeGroup("adult")}
                className={`py-2 px-3 text-sm rounded-md flex-1 ${
                  ageGroup === "adult"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {safeT("inputs.adult", "성인")}
              </button>
              <button
                type="button"
                onClick={() => setAgeGroup("senior")}
                className={`py-2 px-3 text-sm rounded-md flex-1 ${
                  ageGroup === "senior"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {safeT("inputs.senior", "노인(65세 이상)")}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={calculateBMI}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {safeT("buttons.calculate", "계산하기")}
            </button>
            <button
              onClick={resetCalculator}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {safeT("buttons.reset", "초기화")}
            </button>
          </div>

          {bmi !== null && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h2 className="text-xl font-bold mb-2">
                {safeT("results.title", "결과")}
              </h2>
              <p className="mb-1">
                {safeT("results.bmi", "BMI")}:{" "}
                <span className="font-bold">{bmi}</span>
              </p>
              <p>
                {safeT("results.status", "상태")}:{" "}
                <span className="font-bold">{status}</span>
                {ageGroup === "child" && (
                  <span className="text-xs ml-2 text-gray-500">
                    {safeT("results.childNote", "(소아/청소년 기준)")}
                  </span>
                )}
                {ageGroup === "senior" && (
                  <span className="text-xs ml-2 text-gray-500">
                    {safeT("results.seniorNote", "(노인 기준)")}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* BMI 정보 섹션 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2">
            {safeT("infoSection.title", "BMI란 무엇인가요?")}
          </h2>
          <p className="mb-3">
            {safeT(
              "infoSection.description",
              "체질량지수(BMI)는 체중(kg)을 신장(m)의 제곱으로 나눈 값으로, 비만도를 나타내는 지표입니다."
            )}
          </p>
          <p className="font-mono bg-gray-100 p-2 rounded text-sm">
            {safeT(
              "infoSection.formula",
              "계산식: BMI = 체중(kg) / (신장(m) × 신장(m))"
            )}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              {safeT("categories.title", "BMI 범주 (성인 기준)")}
            </h3>
            <ul className="space-y-1">
              <li className="text-blue-600">
                {safeT("categories.underweight", "저체중: 18.5 미만")}
              </li>
              <li className="text-green-600">
                {safeT("categories.normal", "정상: 18.5 - 22.9")}
              </li>
              <li className="text-yellow-600">
                {safeT("categories.overweight", "과체중: 23 - 24.9")}
              </li>
              <li className="text-orange-600">
                {safeT("categories.obese", "비만: 25 - 29.9")}
              </li>
              <li className="text-red-600">
                {safeT("categories.severelyObese", "고도비만: 30 이상")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
