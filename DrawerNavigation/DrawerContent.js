import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';
import Globals from '../utils/Globals';
import {Colors} from '../utils/Colors';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTheme} from '../Component/ThemeProvider';
import globalStyles from '../Component/Styles/globalStyles';
import {useLanguage} from '../Component/LanguageProvider ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function DrawerContent(props) {
  const {language, changeLanguage} = useLanguage();
  const [switchTheme, setSwitchTheme] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const {t} = useTranslation();

  const changeTheme = isOn => {
    setSwitchTheme(isOn);
    toggleTheme(isOn);
  };
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setSwitchTheme(storedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();
  }, []);

  const resetToScreen = (navigation, screenName) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName }],
      })
    );
  };

  const changeLanguages = selectedLanguage => {
    changeLanguage(selectedLanguage);
    AsyncStorage.setItem('language', selectedLanguage.toString());
    setLanguageOptionsVisible(false);
  };


  const LogOut=async()=>{
    await AsyncStorage.removeItem('PartyId');
    await AsyncStorage.removeItem('id');
    const fLogin = await AsyncStorage.getItem('fLogin');
    const gLogin = await AsyncStorage.getItem('gLogin');


    if(fLogin){
      LoginManager.logOut();
      await AsyncStorage.removeItem('fLogin');
      resetToScreen(props.navigation, 'LoginView');
    }else if(gLogin){
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('gLogin');
      resetToScreen(props.navigation, 'LoginView');
    }
    else{
    resetToScreen(props.navigation, 'LoginView');
    }

  }

  const createTwoButtonAlert = () =>
  Alert.alert('mPoster', 'Logout', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => LogOut()},
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SafeAreaView
        style={[
          styles.userInfoSection,
          {
            backgroundColor:
              theme === 'light' ? Colors.primaryTheme : Colors.secondaryBlack,
          },
        ]}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0096A4',
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            elevation: 10,
            margin: 10,
          }}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Icon name="close" color={'#fff'} size={20} />
        </TouchableOpacity>
        <Image
          style={{height: 50, width: 120, top: '5%', left: '5%'}}
          resizeMode="contain"
          source={require('../assets/azr-logo.png')}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{height: '100%', width: '100%', backgroundColor: '#2894A2'}}>
        <DrawerContentScrollView
          {...props}
          style={{top: Platform.OS === 'ios' ? '-6%' : -5}}>
          <DrawerItem
            icon={({size}) => (
              <Icon name="home" color={Colors.whiteText} size={size} />
            )}
            label={t('homeScreen')}
            labelStyle={{fontFamily: 'Sen-Bold'}}
            onPress={() => {
              props.navigation.navigate('HomeScreen');
            }}
          />
          <Image
            style={{height: 10, width: '100%'}}
            resizeMode="contain"
            source={require('../assets/Rectangleline.png')}
          />

          <DrawerItem
            icon={({size}) => (
              <Icon name="image-edit" color={Colors.whiteText} size={size} />
            )}
            label={t('editProfileScreen')}
            labelStyle={{fontFamily: 'Sen-Bold'}}
            onPress={() => {
              props.navigation.navigate('EditProfileScreen');
            }}
          />

          <Image
            style={{height: 10, width: '100%'}}
            resizeMode="contain"
            source={require('../assets/Rectangleline.png')}
          />

          <DrawerItem
            icon={({size}) => (
              <Icon
                name="microsoft-teams"
                color={Colors.whiteText}
                size={size}
              />
            )}
            label={t('changelist')}
            labelStyle={{fontFamily: 'Sen-Bold'}}
            onPress={() => {
              props.navigation.navigate('PartyList');
            }}
          />

          <Image
            style={{height: 10, width: '100%'}}
            resizeMode="contain"
            source={require('../assets/Rectangleline.png')}
          />

          <DrawerItem
            icon={({size}) => (
              <Icon
                name="wallet-outline"
                color={Colors.whiteText}
                size={size}
              />
            )}
            label={t('purchase')}
            labelStyle={{fontFamily: 'Sen-Bold'}}
            onPress={() => {
              props.navigation.navigate('PurchaseScreen');
            }}
          />

          <Image
            style={{height: 10, width: '100%'}}
            resizeMode="contain"
            source={require('../assets/Rectangleline.png')}
          />
          


          <DrawerItem
            icon={({size}) => (
              <Icon
                name="account"
                color={Colors.whiteText}
                size={size}
              />
            )}
            label={t('logout')}
            labelStyle={{fontFamily: 'Sen-Bold'}}
            onPress={() => {
              createTwoButtonAlert();
            }}
          />

          <Image
            style={{height: 10, width: '100%'}}
            resizeMode="contain"
            source={require('../assets/Rectangleline.png')}
          />
        </DrawerContentScrollView>
      </SafeAreaView>

      {/* Language and Theme Options at the Bottom */}
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({size}) => (
            <Icons
              name="language"
              color={Colors.whiteText}
              size={size}
            />
          )}
          label={t('changeLanguage')}
          labelStyle={{fontFamily: 'Sen-Bold'}}
          onPress={() => {
            setLanguageOptionsVisible(!languageOptionsVisible);
          }}
        />

        {languageOptionsVisible && (
          <>
            <DrawerItem
              label={t('english')}
              labelStyle={{fontFamily: 'Sen-Bold'}}
              onPress={() => changeLanguages('en')}
            />
            <DrawerItem
              label={t('hindi')}
              labelStyle={{fontFamily: 'Sen-Bold'}}
              onPress={() => changeLanguages('hi')}
            />
            {/* Add more language options as needed */}
          </>
        )}
        {/* Toggle Switch for Theme */}

        <DrawerItem
          icon={({size}) => (
            <Icon
              name={
                switchTheme ? 'moon-waning-crescent' : 'white-balance-sunny'
              }
              color={Colors.whiteText}
              size={size}
            />
          )}
          label={t(switchTheme ? 'darkMode' : 'lightMode')}
          labelStyle={{fontFamily: 'Sen-Bold'}}
        />
        <View style={styles.switchContainer}>
          <ToggleSwitch
            isOn={switchTheme}
            onColor={Colors.Iris}
            offColor="#808080"
            size="medium"
            onToggle={isOn => {
              changeTheme(isOn);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    height: '18%',
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#525252',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 1,
    backgroundColor: '#F2F4F4',
    borderRadius: 5,
  },
  txtstyle: {
    color: '#8e1212',
    textAlign: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  switchContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: '15%',
    right: '5%',
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});
