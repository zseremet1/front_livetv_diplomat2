import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const query = Object.fromEntries(
  window.location.search
    .slice(1)
    .split("&")
    .map((x) => x.split("="))
);
const lang = query.lang;

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // FIXX line
    lng: lang,
    fallbackLng: "hr",
    debug: false,
    // preload: ['en', 'de'],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
