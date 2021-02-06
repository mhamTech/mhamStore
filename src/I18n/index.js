import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// // the translations
// // (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Book": "Book"
    }
  },
  ar: {
    translation: {
      "Book": "كتاب"
    }
  }
};

export const changeLanguage = (lang) => i18n.changeLanguage(lang);

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
});

export default i18n;