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

export function DrawerContent(props) {
  const {language, changeLanguage} = useLanguage();
  const [switchTheme, setSwitchTheme] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const style = globalStyles();
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const {t} = useTranslation();

  const changeTheme = isOn => {
    setSwitchTheme(isOn);
    toggleTheme(isOn);
  };

  const changeLanguages = selectedLanguage => {
    changeLanguage(selectedLanguage);
    AsyncStorage.setItem('language', selectedLanguage.toString());
    setLanguageOptionsVisible(false);
  };

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
            onPress={() => {
              props.navigation.navigate('PurchaseScreen');
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
          onPress={() => {
            setLanguageOptionsVisible(!languageOptionsVisible);
          }}
        />

        {languageOptionsVisible && (
          <>
            <DrawerItem
              label={t('english')}
              onPress={() => changeLanguages('en')}
            />
            <DrawerItem
              label={t('hindi')}
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
