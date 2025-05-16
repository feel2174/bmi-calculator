"use client";

import { useState } from "react";

export default function Home() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [showAd, setShowAd] = useState(false);
  const [ageGroup, setAgeGroup] = useState("adult"); // adult, senior, child

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));

      // BMI 상태 결정 - 연령대에 따라 다른 기준 적용
      if (ageGroup === "adult") {
        if (bmiValue < 18.5) {
          setStatus("저체중");
        } else if (bmiValue >= 18.5 && bmiValue < 23) {
          setStatus("정상");
        } else if (bmiValue >= 23 && bmiValue < 25) {
          setStatus("과체중");
        } else if (bmiValue >= 25 && bmiValue < 30) {
          setStatus("비만");
        } else {
          setStatus("고도비만");
        }
      } else if (ageGroup === "senior") {
        // 노인은 조금 다른 기준 적용
        if (bmiValue < 20) {
          setStatus("저체중");
        } else if (bmiValue >= 20 && bmiValue < 24) {
          setStatus("정상");
        } else if (bmiValue >= 24 && bmiValue < 27) {
          setStatus("과체중");
        } else if (bmiValue >= 27 && bmiValue < 30) {
          setStatus("비만");
        } else {
          setStatus("고도비만");
        }
      } else if (ageGroup === "child") {
        // 소아/청소년은 더 유연한 기준 적용 (예시 - 실제로는 성별과 나이에 따른 퍼센타일 표 사용 필요)
        if (bmiValue < 15) {
          setStatus("저체중");
        } else if (bmiValue >= 15 && bmiValue < 21) {
          setStatus("정상");
        } else if (bmiValue >= 21 && bmiValue < 24) {
          setStatus("과체중");
        } else if (bmiValue >= 24) {
          setStatus("비만");
        }
      }

      // 계산 후 광고 표시
      setShowAd(true);
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setShowAd(false);
    setAgeGroup("adult");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">BMI 계산기</h1>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="height"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              키 (cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="cm 단위로 입력"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="weight"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              몸무게 (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="kg 단위로 입력"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              연령대 선택
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
                소아/청소년
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
                성인
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
                노인(65세 이상)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={calculateBMI}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              계산하기
            </button>
            <button
              onClick={resetCalculator}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              초기화
            </button>
          </div>

          {bmi !== null && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h2 className="text-xl font-bold mb-2">결과</h2>
              <p className="mb-1">
                BMI: <span className="font-bold">{bmi}</span>
              </p>
              <p>
                상태: <span className="font-bold">{status}</span>
                {ageGroup === "child" && (
                  <span className="text-xs ml-2 text-gray-500">
                    (소아/청소년 기준)
                  </span>
                )}
                {ageGroup === "senior" && (
                  <span className="text-xs ml-2 text-gray-500">
                    (노인 기준)
                  </span>
                )}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <h3 className="font-bold text-lg mb-2">체중 관리 팁</h3>
                {status === "저체중" && (
                  <div className="text-sm">
                    <p className="mb-1">
                      👉 단백질 섭취를 늘려보세요 (계란, 닭가슴살, 두부 등)
                    </p>
                    <p className="mb-1">
                      👉 건강한 지방을 포함한 식사를 하세요 (견과류, 아보카도
                      등)
                    </p>
                    <p className="mb-1">
                      👉 근력 운동을 통해 근육량을 늘리는 것이 도움됩니다
                    </p>
                    <p>👉 하루 5-6회 소량으로 나누어 식사하세요</p>
                  </div>
                )}
                {status === "정상" && (
                  <div className="text-sm">
                    <p className="mb-1">
                      👉 현재의 건강한 식습관과 운동 루틴을 유지하세요
                    </p>
                    <p className="mb-1">
                      👉 일주일에 150분 이상의 중간 강도 유산소 운동을
                      권장합니다
                    </p>
                    <p className="mb-1">
                      👉 다양한 채소와 과일을 포함한 균형 잡힌 식단을 유지하세요
                    </p>
                    <p>👉 정기적인 건강 검진을 통해 체중을 모니터링하세요</p>
                  </div>
                )}
                {status === "과체중" && (
                  <div className="text-sm">
                    <p className="mb-1">
                      👉 당분과 가공식품 섭취를 줄이고 채소와 단백질 위주의
                      식단을 유지하세요
                    </p>
                    <p className="mb-1">
                      👉 규칙적인 유산소 운동(걷기, 수영, 자전거 등)을
                      시작하세요
                    </p>
                    <p className="mb-1">👉 식사량보다 식사의 질에 집중하세요</p>
                    <p>👉 충분한 수분 섭취가 도움됩니다</p>
                  </div>
                )}
                {status === "비만" && (
                  <div className="text-sm">
                    <p className="mb-1">
                      👉 전문가(의사, 영양사)의 도움을 받아 체계적인 체중 관리
                      계획을 세우세요
                    </p>
                    <p className="mb-1">
                      👉 탄수화물 섭취를 줄이고 건강한 단백질과 지방으로
                      대체하세요
                    </p>
                    <p className="mb-1">
                      👉 매일 30-60분의 운동을 목표로 하세요
                    </p>
                    <p>👉 식사 일지를 작성하면 식습관 개선에 도움이 됩니다</p>
                  </div>
                )}
                {status === "고도비만" && (
                  <div className="text-sm">
                    <p className="mb-1">
                      👉 반드시 의료 전문가와 상담하여 건강 상태를 체크하세요
                    </p>
                    <p className="mb-1">
                      👉 식이요법과 운동을 병행한 종합적인 접근이 필요합니다
                    </p>
                    <p className="mb-1">
                      👉 심리적 지원과 생활습관 개선에 중점을 두세요
                    </p>
                    <p>
                      👉 단기간의 급격한 감량보다 장기적이고 지속 가능한 변화를
                      목표로 하세요
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {showAd && (
          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <p className="text-sm text-gray-600 mb-2">광고</p>
              {/* 실제 AdSense 코드로 대체 필요 */}
              <div className="h-60 flex flex-col items-center justify-center border border-gray-300 bg-white p-3">
                <p className="text-gray-500 mb-2">Google AdSense 광고 영역</p>
                <p className="text-xs text-gray-400 mt-2">
                  {status === "저체중" &&
                    "건강한 체중 증가를 위한 제품을 찾고 계신가요?"}
                  {status === "정상" &&
                    "건강 관리에 도움이 되는 제품을 찾고 계신가요?"}
                  {status === "과체중" &&
                    "건강한 체중 관리에 도움이 되는 제품을 찾고 계신가요?"}
                  {status === "비만" &&
                    "안전한 체중 감량을 위한 식단과 운동 제품을 찾고 계신가요?"}
                  {status === "고도비만" &&
                    "의학적 도움과 체식 요법에 관한 정보를 찾고 계신가요?"}
                  {!status &&
                    "당신의 건강한 생활을 지원할 제품을 찾고 계신가요?"}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-10 text-center text-gray-500 text-xs">
          <p>© 2024 BMI 계산기. 모든 권리 보유.</p>
          <p className="mt-1">
            본 계산기는 정보 제공 목적으로만 사용되며, 의학적 조언을 대체하지
            않습니다.
          </p>
        </footer>
      </div>
    </main>
  );
}
