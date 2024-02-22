import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import PartyList from './screens/PartyList';
import LoginView from './screens/Login/LoginView';
import {ThemeProvider} from './Component/ThemeProvider';
import SignUp from './screens/SignUp/SignUp';
import {LanguageProvider} from './Component/LanguageProvider ';
import LanguageSelection from './screens/LanguageSelection';
import EditProfileScreen from './screens/EditPicture/EditScreen';
import SplashScreen from './screens/SplashScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerNavigation/DrawerContent';
import PurchaseScreen from './screens/PurchaseScreen';
import { useWindowDimensions } from 'react-native';

const Stack = createNativeStackNavigator();
const DrawerNav = createDrawerNavigator();



const Dashboard = ({ navigation }) => {
  const dimensions = useWindowDimensions();

  return (
    <DrawerNav.Navigator
      useLegacyImplementation
      initialRouteName="HomeScreen"
screenOptions={{drawerPosition:'right',drawerType: dimensions.width >= 768 ? 'permanent' : 'front',}}      
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNav.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerNav.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <DrawerNav.Screen name="PurchaseScreen" component={PurchaseScreen} />
    </DrawerNav.Navigator>
  );
};





const App = ({navigation}) => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="LanguageSelection"
            component={LanguageSelection}
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="LoginView"
            component={LoginView}
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="PartyList"
            component={PartyList}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
