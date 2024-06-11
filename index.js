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
import { GoogleSignin } from '@react-native-google-signin/google-signin';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
});

GoogleSignin.configure({
  // webClientId: '635423054737-d7j1kmqhpinij6e7tt9cqt2ea0s7b7n3.apps.googleusercontent.com',
  androidClientId:'635423054737-f4hltjeaufhf5qa581g99dg7b0f3069k.apps.googleusercontent.com',
  // offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
      scopes: ['profile', 'email']
});
const Main = () => (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  

AppRegistry.registerComponent(appName, () => Main);
