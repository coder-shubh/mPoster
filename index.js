/**
 * @format
 */

import {AppRegistry} from 'react-native';
 import App from './App';
//import App from './screens/HomeScreen';
import {name as appName} from './app.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import { LanguageProvider } from './Component/LanguageProvider ';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
});


const Main = () => (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  

AppRegistry.registerComponent(appName, () => Main);
