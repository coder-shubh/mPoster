import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Globals from '../utils/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLanguage} from '../Component/LanguageProvider ';
import globalStyles from '../Component/Styles/globalStyles';

export default function SplashScreen({navigation}) {
  const {language, changeLanguage} = useLanguage();
  const styles = globalStyles();

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 3000);
  }, [navigation]);

  async function getUser() {
    try {
      const PartyId = await AsyncStorage.getItem('PartyId');
      const id = await AsyncStorage.getItem('id');
      const language = await AsyncStorage.getItem('language');
      const partyColor = await AsyncStorage.getItem('partyColor');
      Globals.partyColor = partyColor;
      Globals.UrCode = id;
      Globals.PartyId = PartyId;
      if (id != null) {
        if (PartyId > 0) {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('PartyList');
        }
      } else {
        if (language != null) {
          changeLanguage(language);
          navigation.replace('LoginView');
        } else {
          navigation.replace('LanguageSelection');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={[styles.title,{alignSelf:'center'}]}>Poster App</Text>
    </View>
  );
}
