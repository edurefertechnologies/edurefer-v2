import {
  translations,
  type Language,
  type TranslationKey,
} from "./translation";

export function getTranslations(
  language: Language = "en"
) {
  return function t(key: TranslationKey) {
    return translations[language][key];
  };
}