# BMI 계산기 (다국어 지원)

키와 몸무게를 입력하여 BMI(체질량지수)를 계산하는 웹 애플리케이션입니다. 한국어, 영어, 일본어를 지원합니다.

## 지원 언어

- 한국어 (기본)
- 영어
- 일본어

## 기능

- 키와 몸무게 입력으로 BMI 계산
- 연령대별 다른 BMI 기준 적용 (소아/청소년, 성인, 노인)
- 다국어 지원
- 반응형 디자인

## 사용 기술

- [Next.js](https://nextjs.org/) - 리액트 프레임워크
- [Next-intl](https://next-intl-docs.vercel.app/) - 국제화(i18n) 라이브러리
- [TailwindCSS](https://tailwindcss.com/) - CSS 프레임워크

## 실행 방법

### 개발 모드

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프로덕션 모드 실행

```bash
npm run start
```

## 링크

- 한국어: `/ko`
- 영어: `/en`
- 일본어: `/ja`

## 기타 정보

이 프로젝트는 Vercel과 같은 서비스를 통해 쉽게 배포할 수 있습니다.

```bash
npm install -g vercel
vercel
```

## 라이선스

MIT
