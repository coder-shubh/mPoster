import React from 'react';
import {View, Image, FlatList, Dimensions, Text, StatusBar} from 'react-native';
import globalStyles from '../../Component/Styles/globalStyles';
import {FAB, Portal, PaperProvider} from 'react-native-paper';
import EditModal from './EditModal';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import DeletePopUp from '../../Component/DeletePopUp';

const {width} = Dimensions.get('window');

export default function EditProfileScreen() {
  const styles = globalStyles();
  const viewModal = EditModal();
  const [state, setState] = React.useState({open: false});
  const componentWidth = (width * 95) / 100;

  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: 150,
          width: componentWidth / 3,
          margin: 5,
          borderRadius: 10,
        }}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 10}}
          resizeMode="cover"
          source={{uri: viewModal.FilePath}}
        />
      </View>
    );
  };

  return (
    <PaperProvider>
      <DeletePopUp
        show={viewModal.visible}
        press={() => {
          viewModal.setFilePath(null);
          viewModal.setVisible(false);
        }}
        Cancle={() => {
          viewModal.setVisible(false);
        }}
      />
      {viewModal.FilePath ? (
        <View style={{flex: 1}}>
          <View style={{height: '40%', width: '100%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
              source={{uri: viewModal.FilePath}}
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
              onPress={() => viewModal.chooseFile('photo')}>
              Change Photo
            </Button>
            <Button
              icon="notebook-edit"
              mode="contained-tonal"
              style={{borderRadius: 10}}
              onPress={() => console.log('Pressed')}>
              Change Party
            </Button>
          </View>
          <Text style={[styles.subText, {margin: 10}]}>
            Saved Profile Picture:
          </Text>
          <FlatList
            data={[1, 1, 1, 1]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
      ) : (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <MaterialIcons name="image" size={100} color={Colors.Iris} />
          <Text style={styles.subText}>Upload Your Image </Text>
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
              label: 'Remove Image',
              onPress: () => {
                viewModal.setVisible(true);
              },
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
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
}
