import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const DeletePopUp = ({show,press,Cancle}) => {


  return (
    <Portal>
      <Dialog visible={show}>
        <Dialog.Title >Delete Image</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={Cancle}>Cancel</Button>
          <Button onPress={press} labelStyle={{color:'red'}}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};


export default DeletePopUp;