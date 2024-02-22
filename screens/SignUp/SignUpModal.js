import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {postApiCall} from '../../utils/ApiHandler';
import { Alert } from 'react-native';

export default function SignUpModal() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    Address: '',
    email: '',
    password: '',
  });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [show, setShow] = useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isFGLogin, setisFGLogin] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValidEmail(emailRegex.test(email));
    setUser({...user, email: email});
  };

  function showPassword() {
    setShow(!show);
  }

  const handleSignUp = async () => {
    if (!user.firstName.trim()) {
      Alert.alert("FirstName","Please enter firstname");
      return;
    }
    if (!user.lastName.trim()) {
      Alert.alert("LastName","Please enter lastname");
      return;
    }
    if (!user.contactNumber.trim()) {
      Alert.alert("Contact Number","Please enter contact number");
      return;
    }
    if (!user.Address.trim()) {
      Alert.alert("Address","Please enter address");
      return;
    }
    if (!isValidEmail) {
      Alert.alert("Email","Please enter email");
      return;
    }
    if (!user.password.trim()) {
      Alert.alert("Password","Please enter password");
      return;
    }

    const info = {
      Name: user.firstName + user.lastName,
      Email: user.email,
      Pwd: user.password,
      MobileNumber: user.contactNumber,
      PartyId: 0,
      isFGLogin: isFGLogin,
    };
    try {
      setModalVisible(true);

      let res = await postApiCall({url: 'User/UserRegister', json: info});
      if (res.StatusCode==1) {
        navigation.goBack();
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

  return {
    user,
    setUser,
    setShow,
    show,
    validateEmail,
    isValidEmail,
    setIsValidEmail,
    showPassword,
    handleSignUp,
    modalVisible,
    setModalVisible,
  };
}
