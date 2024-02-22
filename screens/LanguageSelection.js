import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../Component/LanguageProvider ';
import { Colors } from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelection = ({ navigation }) => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    AsyncStorage.setItem('language', newLanguage.toString());
    navigation.replace('LoginView')
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguageChange('en')}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguageChange('hi')}>
        <Text style={styles.buttonText}>हिन्दी</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    borderColor: Colors.purple,
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width:'90%',
    borderWidth:1,
    height:50
  },
  buttonText: {
    color: Colors.purple,
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default LanguageSelection;
