import React, {useRef} from 'react';
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
} from 'react-native';

import {captureRef} from 'react-native-view-shot';

import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Draggable from 'react-native-draggable';
import {
  DragResizeBlock,
} from 'react-native-drag-resize';
const Test = () => {
  const screenHeight = Dimensions.get('window').height; 
  const screenWidth = Dimensions.get('window').width;
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

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.savedComponent} ref={viewRef}>
            {/* <Text style={styles.text}> Component to be saved </Text>
            <Image
              source={{
                uri:
                  'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=75&w=126',
              }}
              style={styles.image}
            />
            <Text style={styles.text}>Some random text, also saved</Text> */}
         
   {/* <ImageBackground 
        source={require('./assets/bgg.jpeg')}
        resizeMode="contain"
        style={{height: screenHeight, 
                width: screenWidth, 
                justifyContent: 'center', 
                alignItems: 'center'}}> 
                <View style={{ backgroundColor:'green' , flexDirection: 'row',width:'100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,}}> */}
    <View style={{flex:1,height:520,backgroundColor:'blue'}}>
     
    <Image 
        source={require('./assets/bg1.png')}
        resizeMode="stretch"
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
                 }}
               /> 
              
                <View style={{ backgroundColor:'green' , flexDirection: 'row',width:'100%',
    height: 110,
  
  
    // position: 'absolute', //Here is the trick
    // bottom: 0
    }}>
      {/* <DragResizeBlock
  x={0}
  y={0}
  isDisabled={false}

>
  <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    }}
  > */}
   
      <TouchableOpacity style={{margin:5,width:'65%',backgroundColor:'green'}}
      activeOpacity={.9}>
      <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>Shiv Yadav</Text>
      <Text style={{color:'white',fontSize:18}}>Ace Divino, Sector-1 Noida Extension</Text>
      <Text style={{color:'white',fontSize:18}}>GB Nagar ,201306,U.P</Text>
      </TouchableOpacity>
          {/* </View>
</DragResizeBlock> */}

                </View>
                </View>
                <DragResizeBlock
  x={0}
  y={0}
  isDisabled={true}

>
  {/* <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    }}
  > */}
    <Image
              source={require('./assets/w.png')}
              style={{ width: '100%',
              height: '100%'}}
            />
    {/* </View> */}
</DragResizeBlock>
{/* <Draggable 
            imageSource={require('./assets/w.png')}
            renderSize={140} 
            x={200}
            y={300}
           
           // onDragRelease={this._changeFace}
            onLongPress={()=>console.log('long press')}
            onShortPressRelease={()=>console.log('press drag')}
            onPressIn={()=>console.log('in press')}
            onPressOut={()=>console.log('out press')}
        />  */}

                
             
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={shareImage}>
              <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={downloadImage}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
  flex:1
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
    justifyContent: 'space-around',
    width: '75%',
    marginTop:50
  },
  button: {
    backgroundColor: '#ad4fcc',
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 5,
  },
});

export default Test;