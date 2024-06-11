import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useTheme } from './ThemeProvider';
import { Colors } from '../utils/Colors';

export default function MainHeader({title}) {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack,
      }}>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
        }}
        activeOpacity={0.5}
        onPress={() => {
          openDrawer();
        }}>
        <UserAvatar size={40} name="Shubham Singh" />
      </TouchableOpacity>
    </View>
  );
}
