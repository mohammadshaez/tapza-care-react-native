import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en/common.json";
import hi from "@/locales/hi/common.json";

export const appI18n = createInstance();

void appI18n.use(initReactI18next).init({
  resources: {
    en: {
      common: en,
    },
    hi: {
      common: hi,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common"],
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default appI18n;
