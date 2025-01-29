import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as messages from "./messages/en.json"
const locales = ["en", "ar"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

export type Messages = typeof messages ;