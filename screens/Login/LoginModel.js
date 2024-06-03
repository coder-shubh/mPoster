import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {postApiCall} from '../../utils/ApiHandler';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globals from '../../utils/Globals';

export default function LoginModel() {
  const [user, setUser] = useState({email: '', password: ''});
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [show, setShow] = useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = email => {
    const trimmedEmail = email.trim(); // Trim the email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValidEmail(emailRegex.test(trimmedEmail));
    setUser({...user, email: trimmedEmail});
  };

  function showPassword() {
    setShow(!show);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '635423054737-jo7sr1qebvcseha7hq24nutg5j62c52i.apps.googleusercontent.com', // Replace with your web client ID from Google Developer Console
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      AsyncStorage.setItem('gLogin', 'gLogin');

      handleSignUp(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User canceled the sign in
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g., sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        Alert.alert(
          'Play services not available or outdated. Please update and try again.',
        );
      } else {
        // Some other error happened
        console.error(error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('Facebook login was cancelled');
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken();
        // console.log(tokenData)
        const userInfoRequest = new GraphRequest(
          '/me?',
          {
            parameters: {
              fields: {
                string: 'id,name,email',
              },
              access_token: {
                string: tokenData.accessToken.toString(),
              },
            },
          },
          async (error, result) => {
            if (error) {
              console.error('Error fetching Facebook user data:', error);
            } else {
              console.log('Facebook login successful:', result);
              AsyncStorage.setItem('fLogin', 'fLogin');
              handleSignUp(result);
            }
          },
        );

        // Start the graph request
        new GraphRequestManager().addRequest(userInfoRequest).start();
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  const handleSignUp = async result => {
    const info = {
      Name: result.name,
      Email: result.email,
      Pwd: '',
      MobileNumber: '',
      PartyId: 0,
      isFGLogin: true,
    };
    try {
      setModalVisible(true);

      let res = await postApiCall({url: 'User/UserRegister', json: info});
      if (res.StatusCode == 1) {
        // navigation.goBack();
        SaveUser(res?.ResultData?.UserId, res?.ResultData?.PartyId);
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail) {
      Alert.alert('Email', 'Please enter a valid email');
      return;
    }
    if (!user.password.trim()) {
      Alert.alert('Password', 'Please enter password');
      return;
    }
    const info = {
      UserEmail: user.email,
      UserPassword: user.password,
    };
    try {
      setModalVisible(true);

      let res = await postApiCall({url: 'User/LoginUser', json: info});
      if (res.StatusCode == 1) {
        SaveUser(res.ResultData.UserId, res.ResultData.PartyId);
        console.log(res);
      } else {
        alert(res.Errors);
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  async function SaveUser(id, PartyId) {
    try {
      AsyncStorage.setItem('id', id.toString());
      AsyncStorage.setItem('PartyId', PartyId.toString());
    } catch (e) {
      console.log(e);
    } finally {
      getUser();
    }
  }

  async function getUser() {
    setModalVisible(true);
    try {
      const PartyId = await AsyncStorage.getItem('PartyId');
      const id = await AsyncStorage.getItem('id');
      Globals.UrCode = id;
      Globals.PartyId = PartyId;
      if (PartyId > 0) {
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      } else {
        navigation.reset({index: 0, routes: [{name: 'PartyList'}]});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalVisible(false);
    }
  }

  return {
    user,
    setUser,
    setShow,
    show,
    validateEmail,
    isValidEmail,
    setIsValidEmail,
    showPassword,
    signIn,
    handleLogin,
    handleFacebookLogin,
    modalVisible,
    setModalVisible,
    handleSignUp,
  };
}
