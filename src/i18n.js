import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            es: {
                translation: es,
            },
        },
        lng: "es", // Set default language to Spanish as requested by context (user speaks Spanish)
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // React already safes from xss
        },
    });

export default i18n;
