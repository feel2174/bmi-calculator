import { getRequestConfig } from "next-intl/server";

// Next-intl configuration
export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale || "ko", // Ensure locale is never undefined
    messages: (await import(`../../messages/${locale}/index.json`)).default,
  };
});
