import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Dimensions,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import {captureRef} from 'react-native-view-shot';

import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Draggable from 'react-native-draggable';
import {DragResizeBlock} from 'react-native-drag-resize';
import Globals from '../utils/Globals';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../Component/ThemeProvider';
import {Colors} from '../utils/Colors';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const EditScreen = props => {
  const Dheight = screenHeight * 0.9;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const {item} = props.route.params;
  const {t, i18n} = useTranslation();
  const {theme} = useTheme();

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
  }, []);
  // create a ref
  const viewRef = useRef();

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
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
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

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
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

  const handleSave = () => {
    setVisible(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.keyboardAvoidingContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{
              backgroundColor:
                theme === 'light' ? Colors.primaryTheme : Colors.secondaryBlack,
            }}>
            <View
              style={[
                styles.listItem,
                {
                  height: Dheight,
                  backgroundColor:
                    theme === 'light'
                      ? Colors.primaryTheme
                      : Colors.secondaryBlack,
                },
              ]}>
              <View style={styles.savedComponent} ref={viewRef}>
                <Image
                  //  source={require('../assets/bg1.png')}
                  source={{
                    uri: Globals.image_Url + item.img,
                  }}
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                  }}
                />

                <View
                  style={{
                    backgroundColor: 'green',
                    flexDirection: 'row',
                    width: '100%',
                    height: 105,
                  }}>
                  <TouchableOpacity
                    style={{margin: 5, width: '65%'}}
                    activeOpacity={0.9}
                    onPress={() => {
                      setVisible(true);
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: 'Sen-Bold',
                                                color: 'white',
                      }}>
                      {title}
                    </Text>
                    <Text style={{color: 'white', fontSize: 18,fontFamily: 'Sen-Regular'}}>
                      {subtitle}
                    </Text>
                    <Text style={{color: 'white', fontSize: 18,fontFamily: 'Sen-Regular'}}>
                      GB Nagar ,201306,U.P
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Image
                      source={require('../assets/w.png')}
                      resizeMode='contain'
                      style={{ width: '40%',
                        height: undefined,
                    aspectRatio: 1,
                 // backgroundColor:'red',
                  alignContent:'flex-end',
                      position: 'absolute', //Here is the trick
                      bottom:-16,right:-10}}
                    /> */}

                <DragResizeBlock x={0} y={0} isDisabled={false}>
                  {/* <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    }}
  > */}
                  <Image
                    source={require('../assets/w.png')}
                    style={{width: '100%', height: '100%'}}
                  />
                  {/* </View> */}
                </DragResizeBlock>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#F08000'}]}
                  onPress={() => shareImage()}>
                  <Text style={styles.buttonText}>
                    {t('sharePhoto')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#C5C5C5'}]}
                  onPress={downloadImage}>
                  <Text style={styles.buttonTextBlack}>
                    {t('shareWithoutPhoto')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: 'grey'}]}
                  // onPress={() =>
                  //   props.navigation.navigate('EditScreen', {rowItem: item})}
                >
                  <Text style={styles.buttonText}>
                    {t('edit')}
                  </Text>
                </TouchableOpacity>
              </View>

              <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={styles.modalContainer}>
                  <View
                    style={[
                      styles.modalContent,
                      {
                        backgroundColor:
                          theme === 'light'
                            ? Colors.primaryTheme
                            : Colors.secondaryBlack,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.modalTitle,
                        {
                          color:
                            theme === 'light'
                              ? Colors.blackText
                              : Colors.whiteText,
                        },
                      ]}>
                      Edit Content
                    </Text>

                    <TextInput
                      style={[
                        styles.input,
                        {
                          color:
                            theme === 'light'
                              ? Colors.blackText
                              : Colors.whiteText,
                        },
                      ]}
                      placeholder="Title"
                      value={title}
                      onChangeText={setTitle}
                      placeholderTextColor={Colors.greyText}
                    />

                    <TextInput
                      style={[
                        styles.input,
                        {
                          color:
                            theme === 'light'
                              ? Colors.blackText
                              : Colors.whiteText,
                          height: 100,
                          textAlignVertical: 'top',
                        },
                      ]}
                      placeholder="Description"
                      value={description}
                      onChangeText={setDescription}
                      multiline
                      placeholderTextColor={Colors.greyText}
                    />

                    <Button
                      title="Save"
                      onPress={() => {
                        handleSave();
                      }}
                    />
                    <View style={{height: 20}} />
                    <Button
                      title="Close"
                      onPress={() => {
                        setVisible(false);
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  savedComponent: {
    backgroundColor: 'red',
    // marginBottom: 30,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 252,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 45,
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
  listItem: {
    height: 610,
    width: '100%',
    // borderRadius: 10,
    alignSelf: 'center',
    // margin: 10,
    elevation: 10,
    backgroundColor: '#fff',
    marginBottom: 40,
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '60%',
    // height:'40%'
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Sen-Bold',
        marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    borderRadius: 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
    flexShrink: 1, 
    fontSize:11
  },
  buttonTextBlack: {
    color: 'black',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
    flexShrink: 1,
    fontSize:11

  },
});

export default EditScreen;
