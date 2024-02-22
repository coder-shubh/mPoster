import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import globalStyles from '../../Component/Styles/globalStyles';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import CustomButton from '../../Component/CustomButton';
import LoginModel from './LoginModel';
import { setI18n, useTranslation } from 'react-i18next';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import ModalPopup from '../../Component/ModalPopup';


export default function LoginView({navigation}) {
  const styles = globalStyles();
  const viewModal = LoginModel();
  const { t } = useTranslation();


  return (
    <View style={styles.container}>
      <ModalPopup modalVisible={viewModal.modalVisible}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.LoginCard}>
        <Text style={styles.title}>{t("Welcome!")}</Text>
        <TextInput
          style={styles.Input}
          label={t("Email")}
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
            {t("Please enter a valid email address")}
          </Text>
        )}

        <TextInput
          style={styles.Input}
          label={t("Password")}
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

        <View
          style={[
            styles.buttonContainer,
            {
              alignItems: 'center',
              // flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 50,
              height:'25%'
            },
          ]}>
          <GoogleSigninButton
          style={{width:'60%'}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={viewModal.signIn}
          />
          {/* <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              viewModal.signIn;
            }}>
            <Image
              style={{height: 40, width: 40}}
              resizeMode="contain"
              source={require('../../assets/google.png')}
            />
            <Text style={[styles.subText, {color: 'red'}]}>{t("Google")}</Text>
          </TouchableOpacity> */}
          <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
        </View>
        <Text style={[styles.subText, {marginTop: 50}]}>
          {t("Don't have an account?")}{' '}
          <Text style={[styles.subText, {color: Colors.Iris}]} onPress={()=>{navigation.navigate('SignUp')}}>{t("Sign Up")}</Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}
