import { getRequestConfig } from "next-intl/server";

// @ts-expect-error - Next-intl type issues
export default getRequestConfig(async ({ locale }) => {
  // Load messages from JSON files
  return {
    locale,
    messages: (await import(`../../messages/${locale}/index.json`)).default,
  };
});
