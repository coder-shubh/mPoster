import {StyleSheet, PixelRatio} from 'react-native';
import {useTheme} from '../ThemeProvider';
import {Colors} from '../../utils/Colors';
const scaleFactor = PixelRatio.getFontScale();

const globalStyles = () => {
  // const { theme } = useTheme();
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor:
        theme === 'light' ? Colors.primaryTheme : Colors.secondaryBlack,
    },
    title: {
      fontSize: 26 * scaleFactor,
      fontFamily: 'Sen-Bold',
      alignSelf: 'flex-start',
      color: Colors.Iris,
    },
    LoginCard: {
      backgroundColor: Colors.primaryTheme,
      height: '50%',
      width: '90%',
      borderRadius: 30,
      // elevation: 20,
      padding: 10,
      bottom: '30%',
      position: 'absolute',
    },
    Input: {
      width: '100%',
      color: Colors.blackText,
      alignSelf: 'center',
      backgroundColor: Colors.InputBckColor,
      marginTop: 10,
      fontFamily: 'Sen-Bold',

    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: Colors.Iris,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 14 * scaleFactor,
      color: Colors.whiteText,
      fontFamily: 'Sen-Bold',
    },
    buttonContainer: {
      width: '100%',
      alignSelf: 'center',
      marginTop: 20,
    },
    subText: {
      fontSize: 14 * scaleFactor,
      color: Colors.greyText,
      fontFamily: 'Sen-Bold',
      textAlign: 'center',
    },
    CardTouchLayout: {
      width: '95%',
      height: 100,
      borderWidth: 2,
      borderColor: Colors.Iris,
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 20,
      flexDirection: 'row',
      padding: 10,
      backgroundColor:
        theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack,
      elevation: 10,
    },
    AvatarImage: {
      height: 70,
      width: 70,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    profileSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
      marginTop: '5%',
    },
    socialButton: {
      width: '100%',
      height: 50,
      backgroundColor: Colors.primaryTheme,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',

      borderRadius: 50,
      marginTop: 10,
    },
    listItem: {
      minHeight: 610,
      width: '100%',
      alignSelf: 'center',
      elevation: 10,
      backgroundColor:  theme === 'light' ? Colors.primaryTheme : Colors.secondaryBlack,
      marginBottom: 40,
    },
  });
};

export default globalStyles;
