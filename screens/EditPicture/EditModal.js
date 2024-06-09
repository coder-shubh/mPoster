import React, {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Globals from '../../utils/Globals';
import {getApiCall, postApiCall, postCall} from '../../utils/ApiHandler';
import axios from 'axios';

export default function EditModal() {
  const [filePaths, setFilePaths] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const updateFile = type => {
    const options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 2,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: false,
      includeBase64: false,
      selectionLimit: 0,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.errorCode) {
        console.error('Error: ', response.errorMessage || response.errorCode);
        return;
      }
      const newUris = response.assets.map(asset => asset.uri);
      setFilePaths(prevPaths => {
        if (prevPaths.length > 0) {
          const updatedPaths = [...prevPaths];
          updatedPaths[updatedPaths.length - 1] = newUris[0];
          return updatedPaths;
        }
        return [...prevPaths, ...newUris];
      });
    });
  };

  const captureImage = async type => {
    const options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 2,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: false,
      includeBase64: false,
    };

    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode) {
          console.error('Error: ', response.errorMessage || response.errorCode);
          return;
        }
        const asset = response.assets[0];
        setFilePaths([...filePaths, asset.uri]);
      });
    }
  };

  const chooseFile = type => {
    const options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 2,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: false,
      includeBase64: false,
      selectionLimit: 0, // Set to 0 for multiple selection
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.errorCode) {
        console.error('Error: ', response.errorMessage || response.errorCode);
        return;
      }
      const newUris = response?.assets.map(asset => asset.uri);
      // setFilePaths([...filePaths, ...newUris]);
      uploadImage(response.assets);
      console.log(response);
    });
  };

  const uploadImage = async image => {
    const formdata = new FormData();
    const photo = image[0];
    formdata.append('images', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    const requestOptions = {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    };

    fetch(
      'http://103.97.197.49/PosterApp/Api/user/UploadUserPic?id=1&fileType=uProfile&userId=' +
        Globals.UrCode,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => getAllUserPic())
      .catch(error => console.error(error));
  };

  const getAllUserPic = async () => {
    try {
      setModalVisible(true);
      let res = await getApiCall({
        url: 'user/getAllUserPic?userId=' + Globals.UrCode,
      });
      if (res?.StatusCode == 1) {
        setFilePaths(res?.ResultData);
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  const getUserDefaultPic = async () => {
    try {
      setModalVisible(true);

      let res = await getApiCall({
        url: 'user/getUserDefaultPic?userId=' + Globals.UrCode,
      });
      if (res?.StatusCode == 1) {
        setSelectedImage(res?.ResultData);
        console.log('reywriyweiuryiwu', res?.ResultData);
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  const SetUserPicDefault = async image => {
    console.log('rillllllle', image);

    const formdata = new FormData();
    formdata.append('images', {
      FileName: image?.fileName,
      fileType: 'uProfile',
      userId: Globals.UrCode,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    };

    fetch(
      'http://103.97.197.49/PosterApp/Api/user/SetUserPicDefault?FileName=' +
        image?.fileName +
        '&fileType=uProfile&userId=' +
        Globals.UrCode,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => getUserDefaultPic())
      .catch(error => console.error(error));
  };
  return {
    filePaths,
    setFilePaths,
    captureImage,
    chooseFile,
    visible,
    setVisible,
    setSelectedImage,
    selectedImage,
    updateFile,
    getAllUserPic,
    images,
    getUserDefaultPic,
    modalVisible,
    SetUserPicDefault,
  };
}
