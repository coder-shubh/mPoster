import React, { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Globals from "../../utils/Globals";

export default function EditModal(){
    const [FilePath, setFilePath] = useState(null);
    const [visible, setVisible] = React.useState(false);


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
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                //  console.warn(err);
                return false;
            }
        } else return true;
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
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.log(err);
                // alert('Write permission err', err);
            }
            return false;
        } else return true;
    };



    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 200,
            maxHeight: 200,
            quality: 2,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
            includeBase64: false,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                //   console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    console.log('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                console.log("%%%%%&&&&*", response.assets[0].base64)
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                console.log("%%%%%&&&&*", Globals._Base64String)
                var arr = [];
                arr.push(response.assets[0])
                setFilePath(arr[0].uri);
                console.log(arr[0].uri)
            });
        }
    };


    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 200,
            maxHeight: 200,
            quality: 2,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            console.log('base64 -> ', "_________");
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.assets[0].fileName);
            var arr = [];
            arr.push(response.assets[0])
            setFilePath(arr[0].uri);
        });
    };


    return{
        FilePath,
        setFilePath,
        captureImage,
        chooseFile,
        visible,
        setVisible

    }
}