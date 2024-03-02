import {View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image} from 'react-native';
import globalStyles from '../../Component/Styles/globalStyles';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import CustomButton from '../../Component/CustomButton';
import LoginModel from './LoginModel';
import {setI18n, useTranslation} from 'react-i18next';
import {
  LoginButton,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
  LoginManager,
} from 'react-native-fbsdk-next';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import ModalPopup from '../../Component/ModalPopup';
import { useEffect } from 'react';

export default function LoginView({navigation}) {
  const styles = globalStyles();
  const viewModal = LoginModel();
  const {t} = useTranslation();


  useEffect(()=>{
    GoogleSignin.configure({
      // webClientId: '635423054737-d7j1kmqhpinij6e7tt9cqt2ea0s7b7n3.apps.googleusercontent.com',
      androidClientId:'635423054737-f4hltjeaufhf5qa581g99dg7b0f3069k.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
      scopes: ['profile', 'email']
    });
  },[]);

  return (
    <View style={styles.container}>
      <ModalPopup modalVisible={viewModal.modalVisible} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.LoginCard}>
        <Text style={styles.title}>{t('Welcome!')}</Text>
        <TextInput
          style={styles.Input}
          label={t('Email')}
          placeholderTextColor={Colors.Iris}
          outlineStyle={{borderRadius: 15}}
          textColor={Colors.Iris}
          value={viewModal.user.email}
          onChangeText={viewModal.validateEmail}
          mode="outlined"
          activeOutlineColor={Colors.Iris}
          right={<TextInput.Icon icon="email" />}
        />

        {viewModal.user.email.length ===
        0 ? null : viewModal.isValidEmail ? null : (
          <Text style={{color: 'red', alignSelf: 'center'}}>
            {t('Please enter a valid email address')}
          </Text>
        )}

        <TextInput
          style={styles.Input}
          label={t('Password')}
          placeholderTextColor={Colors.Iris}
          outlineStyle={{borderRadius: 15}}
          textColor={Colors.Iris}
          secureTextEntry={viewModal.show}
          value={viewModal.user.password}
          onChangeText={password =>
            viewModal.setUser({...viewModal.user, password})
          }
          mode="outlined"
          activeOutlineColor={Colors.Iris}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => viewModal.showPassword()}
            />
          }
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title={t('LOGIN')}
            press={() => {
              viewModal.handleLogin();
            }}
          />
        </View>

        <Text style={[styles.subText,{top:'7%',color:Colors.Iris}]}>{t('or')}</Text>


        <View
          style={[
            styles.buttonContainer,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 50,
              height: '25%',
            },
          ]}>
          {/* <GoogleSigninButton
            style={{width: '60%'}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={viewModal.signIn}
          /> */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              viewModal.signIn();
            }}activeOpacity={0.5}>
            <Image
              style={{height: 40, width: 40}}
              resizeMode="contain"
              source={require('../../assets/google.png')}
            />
            <Text style={[styles.subText, {color: 'red',width:'90%',right:'40%'}]}>{t("Google")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              viewModal.handleFacebookLogin();
            }}activeOpacity={0.5}>
            <Image
              style={{height: 30, width: 30}}
              resizeMode="contain"
              source={require('../../assets/facebook.png')}
            />
            <Text style={[styles.subText, {color: 'blue',width:'85%',right:'30%'}]}>{t("facebook")}</Text>
          </TouchableOpacity>

          {/* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  let accessToken = data.accessToken;
                  // alert(accessToken.toString());

                  const responseInfoCallback = (error, result) => {
                    if (error) {
                      console.log(error);
                      alert('Error fetching data: ' + error.toString());
                    } else {
                      console.log('Success fetching data: ' + result.toString());
                      viewModal.handleSignUp(result);
                    }
                  };

                  const infoRequest = new GraphRequest(
                    '/me',
                    {
                      accessToken: accessToken,
                      parameters: {
                        fields: {
                          string: 'id,name,email',
                        },
                      },
                    },
                    responseInfoCallback,
                  );

                  // Start the graph request.
                  new GraphRequestManager().addRequest(infoRequest).start();
                });
              }
            }}
            onLogoutFinished={() => alert('logout.')}
          /> */}
        </View>
        <Text style={[styles.subText, {marginTop: 50}]}>
          {t("Don't have an account?")}{' '}
          <Text
            style={[styles.subText, {color: Colors.Iris}]}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {t('Sign Up')}
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}
