import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {getApiCall, postApiCall} from '../utils/ApiHandler';
import Globals from '../utils/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPopup from '../Component/ModalPopup';
import {useTheme} from '../Component/ThemeProvider';
import {Colors} from '../utils/Colors';

const PartyList = props => {
  const [data, setData] = useState([]);
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useTheme();

  useEffect(() => {
    getPartyList();
  }, []);

  const getPartyList = async () => {
    try {
      setModalVisible(true);

      let res = await getApiCall({url: 'User/getAllParty'});
      setData(res.ResultData);
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  const SetParty = async (PId, partyColor) => {
    const info = {
      UserId: Globals.UrCode,
      PartyId: PId,
    };
    try {
      setModalVisible(true);
      let res = await postApiCall({url: 'User/SetParty', json: info});
      if (res.StatusCode == 1) {
        console.log(res);

        AsyncStorage.setItem('PartyId', PId.toString());
        AsyncStorage.setItem('partyColor', partyColor.toString());
        Globals.PartyId = PId;
        Globals.partyColor = partyColor;
        if (Globals.PartyId) {
          props.navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        }
      } else {
        Globals.PartyId = PId;
        Globals.partyColor = partyColor;
        props.navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      }
    } catch (e) {
      alert(e);
    } finally {
      setModalVisible(false);
    }
  };

  async function SaveUser(id, PartyId) {
    try {
      AsyncStorage.setItem('id', id.toString());
      AsyncStorage.setItem('PartyId', PartyId.toString());
    } catch (e) {
      console.log(e);
    } finally {
      getUser();
    }
  }

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          {
            backgroundColor:
              theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack,
          },
        ]}
        activeOpacity={0.9}
        onPress={() => SetParty(item.PId, item.partyColor)}>
        <Image
          source={{
            uri: item.img,
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Sen-Bold',
            color: theme === 'light' ? Colors.greyText : Colors.whiteText,
            marginLeft: 20,
          }}>
          {t(item.title)}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={[
        styles.body,
        {
          backgroundColor:
            theme === 'light' ? Colors.primaryTheme : Colors.secondaryBlack,
        },
      ]}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={
          theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack
        }
      />
      <ModalPopup modalVisible={modalVisible} />

      <FlatList
        data={data}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    backgroundColor: 'green',
    height: 500,
    // marginBottom: 30,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: "red"
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 45,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
  },
  listItem: {
    height: 120,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    elevation: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
});

export default React.memo(PartyList);
