// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import axios from 'axios';

const fetchTranslation = async (language) => {
  const response = await axios.get(`https://your-api-url/translations/${language}.json`);
  return response.data;
};

const resources = {
  en: { translation: {} },
  es: { translation: {} },
  hi: { translation: {} }, // Add a Hindi translation object
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const loadTranslations = async () => {
  const userLanguage = RNLocalize.getLocales()[0].languageCode;

  try {
    const translation = await fetchTranslation(userLanguage);
    i18n.addResourceBundle(userLanguage, 'translation', translation, true, true);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

loadTranslations();

export default i18n;
