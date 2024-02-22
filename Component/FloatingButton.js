import * as React from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const FloatingButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'camera',
              label: 'Camera',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'panorama',
              label: 'Gallery',
              onPress: () => console.log('Pressed notifications'),
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
};

export default FloatingButton;