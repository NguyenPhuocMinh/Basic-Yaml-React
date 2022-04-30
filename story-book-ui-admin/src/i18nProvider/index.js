import { i18n, initReactI18next } from 'story-bootstrap';
import LanguageDetector from 'i18next-browser-languagedetector';
// translations
import TRANSLATIONS_EN from './locales/en/translation';
import TRANSLATIONS_VN from './locales/vn/translation';

const allowedLanguages = ['en', 'vn'];

const defaultLng = 'en';
let lng = defaultLng;

const storageLanguage = localStorage.getItem('language');
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}

const i18nProvider = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng,
    fallbackLng: defaultLng,
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      vn: {
        translation: TRANSLATIONS_VN
      }
    },
    react: {
      useSuspense: true
    },
    load: 'all'
  });

export default i18nProvider;
