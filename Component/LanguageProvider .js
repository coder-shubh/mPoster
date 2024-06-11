import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English
  const { t, i18n } = useTranslation();

  // const changeLanguage = (newLanguage) => {
  //   setLanguage(newLanguage);
  //   i18n.changeLanguage(newLanguage);
  // };
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language from storage', error);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (newLanguage) => {
    try {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Failed to save language to storage', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
