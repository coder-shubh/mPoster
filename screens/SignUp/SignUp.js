import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import globalStyles from '../../Component/Styles/globalStyles';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import CustomButton from '../../Component/CustomButton';
import SignUpModal from './SignUpModal';
import { setI18n, useTranslation } from 'react-i18next';
import { postApiCall } from '../../utils/ApiHandler';
import ModalPopup from '../../Component/ModalPopup';

 
export default function SignUp({navigation}) {
  const styles = globalStyles();
  const viewModal = SignUpModal();
  const { t, i18n } = useTranslation();



  return (
    <ScrollView>
    <View style={styles.container}>
    <ModalPopup modalVisible={viewModal.modalVisible}/>

      <Text style={[styles.title, {left: '5%', marginTop: '40%'}]}>
      {t('Welcome!')}
      </Text>
      <View
        style={[
          styles.socialButton,
          {width: '90%', justifyContent: 'space-between',marginTop:20},
        ]}>
        <TextInput
          style={[styles.Input, {width: '47%'}]}
          label={t("First Name")}
          placeholderTextColor={Colors.Iris}
          outlineStyle={{borderRadius: 15}}
          textColor={Colors.Iris}
          value={viewModal.user.firstName}
          onChangeText={(text) => viewModal.setUser({ ...viewModal.user, firstName: text })}
          mode="outlined"
          activeOutlineColor={Colors.Iris}
        />
        <TextInput
          style={[styles.Input, {width: '47%'}]}
          label={t("Last name")}
          placeholderTextColor={Colors.Iris}
          outlineStyle={{borderRadius: 15}}
          textColor={Colors.Iris}
          value={viewModal.user.lastName}
          onChangeText={(text)=>viewModal.setUser({...viewModal.user,lastName:text})}
          mode="outlined"
          activeOutlineColor={Colors.Iris}
        />
      </View>

      <TextInput
        style={[styles.Input, {width: '90%', marginTop: 25}]}
        label={t("Contact Number")}
        placeholderTextColor={Colors.Iris}
        outlineStyle={{borderRadius: 15}}
        textColor={Colors.Iris}
        value={viewModal.user.contactNumber}
        onChangeText={(text)=>viewModal.setUser({...viewModal.user,contactNumber:text})}
        mode="outlined"
        activeOutlineColor={Colors.Iris}
        keyboardType='phone-pad'
        right={<TextInput.Icon icon="phone" />}
        maxLength={10}
      />

      <TextInput
        style={[styles.Input, {width: '90%'}]}
        label={t("Address")}
        placeholderTextColor={Colors.Iris}
        outlineStyle={{borderRadius: 15}}
        textColor={Colors.Iris}
        value={viewModal.user.Address}
        onChangeText={(text)=>viewModal.setUser({...viewModal.user,Address:text})}
        mode="outlined"
        activeOutlineColor={Colors.Iris}
        right={<TextInput.Icon icon="store" />}
      />
      <TextInput
        style={[styles.Input, {width: '90%'}]}
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
        style={[styles.Input, {width: '90%'}]}
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
          <TextInput.Icon icon="eye" onPress={() => viewModal.showPassword()} />
        }
      />
      <View style={[styles.buttonContainer, {width: '90%'}]}>
        <CustomButton
          title={t('CREATE ACCOUNT')}
          press={() => {
            viewModal.handleSignUp();
          }}
        />
      </View>

      <Text style={[styles.subText, {marginTop: 50}]}>
        {t("Already have an account?")}{' '}
        <Text style={[styles.subText, {color: Colors.Iris}]}onPress={()=>{navigation.navigate('LoginView')}}>{t("Sign In")}</Text>
      </Text>
    </View>
    </ScrollView>
  );
}
