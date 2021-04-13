import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';

import ar from "./ar.json";
import en from "./en.json";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  'en': en,
  'ar': ar,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
// Set deafult language
// i18n.locale = "en";
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(false);

export default i18n;