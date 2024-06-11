import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../Component/Styles/globalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/Colors';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../Component/ThemeProvider';

const {width} = Dimensions.get('window');

export default function PurchaseScreen() {
  const styles = globalStyles();
  const [state, setState] = React.useState({open: false});
  const componentWidth = (width * 95) / 100;
  const [value, setValue] = React.useState('');
  const {t} = useTranslation();

  const [price, setprice] = useState('');
  const {theme} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#FFFDD0' : Colors.secondaryBlack,
      }}>
      <View style={{height: '40%', width: '100%'}}>
        <Image
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
          source={{
            uri: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/w/z/g/small-spos8980-poster-bjp-logo-bhartiya-janta-party-with-modi-sl-original-imaghs5tcbe3ht2d.jpeg?q=90&crop=false',
          }}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            justifyContent: 'space-between',
            height: '13%',
            width: '90%',
            borderColor: value == 'first' ? Colors.orange : '#fff',
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: value != 'first' && theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack,
          },
        ]}
        activeOpacity={0.5}
        onPress={() => {
          setValue('first');
          setprice('499');
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.orange,
              fontSize: 20,
              fontFamily: 'Sen-Bold',
            }}>
            ₹499
          </Text>
          <Text
            style={{
              color: theme === 'light' ? Colors.blackText : Colors.whiteText,
              fontSize: 15,
              fontFamily: 'Sen-Regular',
            }}>
            {t('firstPlan')}
          </Text>
        </View>
        <Text
          style={{
            color: Colors.greyText,
            fontSize: 20,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textDecorationLine: 'line-through',
          }}>
          ₹998
        </Text>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <RadioButton value="first" />
        </RadioButton.Group>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          height: 100,
          width: '90%',
          borderRadius: 10,
          alignSelf: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: value == 'second' ? Colors.orange : '#fff',
          marginTop: 10,
          flexDirection: 'row',
          padding: 15,
          backgroundColor: theme === 'light' ? Colors.primaryTheme : Colors.primaryBlack,

        }}
        activeOpacity={0.5}
        onPress={() => {
          setValue('second');
          setprice('99');
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.orange,
              fontSize: 20,
              fontFamily: 'Sen-Bold',
            }}>
            ₹99
          </Text>
          <Text
            style={{
              color: theme === 'light' ? Colors.blackText : Colors.whiteText,
              fontSize: 15,
              fontFamily: 'Sen-Regular',
            }}>
            {t('secondPlan')}
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <RadioButton value="second" />
        </RadioButton.Group>
      </TouchableOpacity>

      {price && (
        <TouchableOpacity
          style={{
            height: 70,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'red',
            marginTop: 10,
            elevation: 5,
            position: 'absolute',
            bottom: 0,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          activeOpacity={0.5}>
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.whiteText,
                fontSize: 20,
                fontFamily: 'Sen-Bold',
              }}>
              ₹{price}
            </Text>
            <Text
              style={{
                color: Colors.whiteText,
                fontSize: 15,
                fontFamily: 'Sen-Regular',
              }}>
              {t('yearly')}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: 20,
              fontFamily: 'Sen-Bold',
              textAlignVertical: 'center',
            }}>
            . {t('purchaseButton')}
          </Text>
          <Icon name="arrowright" color={'#fff'} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
}
