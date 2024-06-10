import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../Component/Styles/globalStyles';
import {FAB, Portal, PaperProvider, Button} from 'react-native-paper';
import EditModal from './EditModal';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../utils/Colors';
import DeletePopUp from '../../Component/DeletePopUp';
import Globals from '../../utils/Globals';
import ModalPopup from '../../Component/ModalPopup';

const {width} = Dimensions.get('window');

export default function EditProfileScreen({navigation}) {
  const styles = globalStyles();
  const viewModal = EditModal();
  const [state, setState] = useState({open: false});
  const componentWidth = (width * 95) / 100;
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  useEffect(() => {
    viewModal.getAllUserPic();
    viewModal.getUserDefaultPic();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        height: 150,
        width: componentWidth / 3 - 10,
        margin: 5,
        borderRadius: 10,
      }}
      activeOpacity={0.8}
      onPress={() => {
          viewModal.SetUserPicDefault(item)
      }}>
      <Image
        style={{height: '100%', width: '100%', borderRadius: 10}}
        resizeMode="cover"
        source={{
          uri: Globals.image_Url + item?.fileUrl,
        }}
      />
    </TouchableOpacity>
  );


  const setDefaultImage=()=>{
    if(viewModal.selectedImage){
      return Globals.image_Url+viewModal.selectedImage
    }
  }

  return (
    <PaperProvider>
      <DeletePopUp
        show={viewModal.visible}
        press={() => {
          viewModal.setFilePaths([]);
          viewModal.setVisible(false);
        }}
        Cancle={() => viewModal.setVisible(false)}
      />
      <ModalPopup modalVisible={viewModal.modalVisible} />

      {viewModal.filePaths?.length > 0 || viewModal.selectedImage ? (
        <View style={{flex: 1}}>
          <View style={{height: '40%', width: '100%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
              source={{
                uri:viewModal.selectedImage && Globals.image_Url+viewModal.selectedImage
              }}
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              {justifyContent: 'space-between', height: '13%'},
            ]}>
            <Button
              icon="camera"
              mode="elevated"
              style={{borderRadius: 10}}
              onPress={() => viewModal.updateFile('photo')}>
              Change Photo
            </Button>
            <Button
              icon="notebook-edit"
              mode="contained-tonal"
              style={{borderRadius: 10}}
              onPress={() => navigation.navigate('PartyList')}>
              Change Party
            </Button>
          </View>
          <Text style={[styles.subText, {margin: 10}]}>
            Saved Profile Pictures:
          </Text>
          <FlatList
            data={viewModal.filePaths}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
      ) : (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <MaterialIcons name="image" size={100} color={Colors.Iris} />
          <Text style={styles.subText}>Upload Your Image</Text>
        </View>
      )}

      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'delete',
              label: 'Remove Images',
              onPress: () => viewModal.setVisible(true),
            },
            {
              icon: 'camera',
              label: 'Camera',
              onPress: () => viewModal.captureImage('photo'),
            },
            {
              icon: 'panorama',
              label: 'Gallery',
              onPress: () => viewModal.chooseFile('photo'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // Handle FAB open state
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
}
