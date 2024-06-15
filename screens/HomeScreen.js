import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {getApiCall} from '../utils/ApiHandler';
import Globals from '../utils/Globals';
import {useTranslation} from 'react-i18next';
import ModalPopup from '../Component/ModalPopup';
import MainHeader from '../Component/MainHeader';
import globalStyles from '../Component/Styles/globalStyles';
import {Colors} from '../utils/Colors';
import {useTheme} from '../Component/ThemeProvider';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const HomeScreen = props => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();
  const excludedImageRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const style = globalStyles();
  const [ProfilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    try {
      setModalVisible(true);

      let res = await getApiCall({
        url: 'User/getBanners?pId=' + Globals.PartyId,
      });
      setData(res.ResultData);
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
      getUserDefaultPic();
      setRefreshing(false);
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      header: () => <MainHeader title={'About Us'} />,
    });
  }, [props.navigation]);

  const shareWithoutImage = async index => {
    try {
      // Exclude the specific image from the capture
      const uri = await captureRef(viewRef[`${index}`], {
        format: 'png',
        quality: 0.8,
      });

      // Share the modified URI without the excluded image
      const shareResponse = await Share.open({url: uri});
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };

  // create a ref
  const viewRef = useRef();
  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async index => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef[`${index}`], {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const shareImage = async index => {
    // captureRef(viewRef[`${index}`], options)
    try {
      const uri = await captureRef(viewRef[`${index}`], {
        format: 'png',
        quality: 0.8,
      });
      console.log('uri', uri);
      const shareResponse = await Share.open({url: uri});
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const renderItem = ({item, index}) => {
  //   const Dheight = screenHeight * 0.8;
  //   return (
  //     <View style={[styles.listItem, {height: Dheight}]}>
  //       <View
  //         style={styles.savedComponent}
  //         //ref={viewRef}
  //         ref={shot => (viewRef[`${index}`] = shot)}>
  //         <Image
  //           //  source={require('../assets/bg1.png')}
  //           source={{
  //             uri: Globals.image_Url + item.img,
  //           }}
  //           resizeMode="stretch"
  //           style={{
  //             width: '100%',
  //             height: '80%',
  //             // aspectRatio: 1,
  //           }}
  //         />

  //         <View
  //           style={{
  //             backgroundColor: Globals.partyColor,
  //             flexDirection: 'row',
  //             width: '100%',
  //             height: '20%',
  //             position: 'absolute',
  //             bottom: '0%',
  //           }}>
  //           <TouchableOpacity
  //             style={{margin: 5, width: '65%'}}
  //             activeOpacity={0.9}>
  //             <Text
  //               style={{
  //                 fontSize: 22,
  //                 fontWeight: 'bold',
  //                 color: 'white',
  //                 fontFamily: 'Sen-Bold',
  //               }}>
  //               {item.title}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: 'white',
  //                 fontSize: 18,
  //                 fontFamily: 'Sen-Regular',
  //               }}>
  //               {item.description}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: 'white',
  //                 fontSize: 18,
  //                 fontFamily: 'Sen-Regular',
  //               }}>
  //               GB Nagar ,201306,U.P
  //             </Text>
  //           </TouchableOpacity>
  //         </View>

  //         <Image
  //           ref={excludedImageRef}
  //           source={require('../assets/w.png')}
  //           resizeMode="contain"
  //           style={{
  //             width: '40%',
  //             height: undefined,
  //             aspectRatio: 1,
  //             // backgroundColor:'red',
  //             alignContent: 'flex-end',
  //             position: 'absolute', //Here is the trick
  //             bottom: '0%',
  //             right: -10,
  //           }}
  //         />
  //       </View>

  //       <View style={[styles.row, {width: screenWidth}]}>
  //         <TouchableOpacity
  //           style={[styles.button, {backgroundColor: '#F08000'}]}
  //           onPress={() => shareImage(index)}>
  //           <Text style={{color: 'white', fontFamily: 'Sen-Bold'}}>
  //             {t('sharePhoto')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={[styles.button, {backgroundColor: '#C5C5C5'}]}
  //           onPress={() => {
  //             shareWithoutImage(index);
  //           }}>
  //           <Text style={{color: 'black', fontFamily: 'Sen-Bold'}}>
  //             {t('shareWithoutPhoto')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={[styles.button, {backgroundColor: 'grey'}]}
  //           onPress={() =>
  //             props.navigation.navigate('EditScreen', {item: item})
  //           }>
  //           <Text style={{color: 'white', fontFamily: 'Sen-Bold'}}>
  //             {t('edit')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  const renderItem = ({item, index}) => {
    const Dheight = screenHeight * 0.8;
    return (
      <View style={[style.listItem, {height: Dheight}]}>
        <View
          style={styles.savedComponent}
          ref={shot => (viewRef[`${index}`] = shot)}>
          <Image
            source={{uri: Globals.image_Url + item.img}}
            resizeMode="stretch"
            style={{width: '100%', height: '80%'}}
          />
          <View style={styles.textContainer}>
            <TouchableOpacity style={styles.textTouchable}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              {/* <Text style={styles.address}>GB Nagar, 201306, U.P</Text> */}
            </TouchableOpacity>
          </View>
          <Image
            ref={excludedImageRef}
            source={{uri: Globals.image_Url + ProfilePicture}}
            resizeMode="contain"
            style={styles.excludedImage}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#F08000'}]}
            onPress={() => shareImage(index)}>
            <Text style={styles.buttonText}>{t('sharePhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#C5C5C5'}]}
            onPress={() => {
              shareWithoutImage(index);
            }}>
            <Text style={styles.buttonTextBlack}>{t('shareWithoutPhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'grey'}]}
            onPress={() =>
              props.navigation.navigate('EditScreen', {
                item: item,
                ProfilePicture: Globals.image_Url + ProfilePicture,
              })
            }>
            <Text style={styles.buttonText}>{t('edit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getUserDefaultPic = async () => {
    try {
      setModalVisible(true);
      let res = await getApiCall({
        url: 'user/getUserDefaultPic?userId=' + Globals.UrCode,
      });
      if (res?.StatusCode == 1) {
        console.log('reywriyweiuryiwu', res?.ResultData);
        setProfilePicture(res?.ResultData[0]?.fileUrl);
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={style.container}>
      {/* <StatusBar barStyle={theme === 'light'?"dark-content":"light-content"} backgroundColor={theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack} /> */}

      <ModalPopup modalVisible={modalVisible} />

      {data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: screenHeight * 0.8,
            offset: screenHeight * 0.8 * index,
            index,
          })}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getBanners}
              colors={['#0000ff']}
              tintColor={'#0000ff'}
            />
          }
        />
      ) : (
        <Text style={{textAlign: 'center', top: '50%', fontFamily: 'Sen-Bold'}}>
          {t('no_Content')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: '#F0F1F5',
  },
  savedComponent: {
    backgroundColor: 'green',
    height: '80%',
    width: screenWidth,
    alignSelf: 'center',
  },
  textContainer: {
    backgroundColor: Globals.partyColor,
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: '0%',
  },
  textTouchable: {
    margin: 5,
    width: '65%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Sen-Bold',
  },
  description: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Sen-Regular',
  },
  address: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Sen-Regular',
  },
  excludedImage: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    alignContent: 'flex-end',
    position: 'absolute',
    bottom: '0%',
    right: -10,
  },
  buttonContainer: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
    flexShrink: 1,
    fontSize: 11,
  },
  buttonTextBlack: {
    color: 'black',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
    flexShrink: 1,
    fontSize: 11,
  },
});

export default HomeScreen;
