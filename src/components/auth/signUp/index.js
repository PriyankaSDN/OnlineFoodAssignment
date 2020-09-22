// @ts-nocheck
import Button from '@components/common/button';
import GLOBALS from '@constants';
import * as Images from '@images';
import { validateEmail, validatePassword } from '@utils/ValidationUtils';
import { add } from 'lodash';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  NativeModules,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, STRINGS } = GLOBALS;
import { Avatar } from 'react-native-elements';
var ImagePicker = NativeModules.ImageCropPicker;
import Modal from 'react-native-modal';

const {
  SIGNIN,
  SIGNUP,
  EMAILADDR,
  EMAILPASWD,
  EMAILHOLDER,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  VALID_ERROR,
} = STRINGS;
const { PRIMARY, WHITE, GREY, DARKGREY } = COLOR;
const isIOS = Platform.OS === 'ios';
function SignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [profileUrl, setProfileUrl] = useState('https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', '');
  const [modalVisible, setModalVisible] = useState(false, '');

  const [isBlur, setBlur] = useState(false);
  const { onRegistration, isLoggedIn, isLoading } = props;
  const validateField = () => {
    isBlur ? null : setBlur(true);
    Keyboard.dismiss();
    let isValidEmail = validateEmail(email);
    let isValidPaswd = validatePassword(password);
    // onRegistration('priyanka', 'Tiwari', 'pt@yopmail.com', 'Pass@12', "4", '9876543211',
    //   'Nagpur', 'Nagpur', 'Maharastra', 'India', '440022');
    if (firstName == '') {
      alert('Please enter first name.')
    } else if (lastName == '') {
      alert('Please enter last name.')
    } else if (email == '') {
      alert('Please enter email address.')
    } else if (!isValidEmail) {
      alert('Please enter valid email address.')
    } else if (password == '') {
      alert('Please enter password.')
    } else if (!isValidPaswd) {
      alert(PASSWORD_ERROR)
    } else if (role == '') {
      alert('Please enter role')
    } else if (phone == '') {
      alert('Please enter phone number')
    } else {
      onRegistration(firstName, lastName, email, password, role, phone, address, city, state, country, zip, profileUrl);
    }
  };

  const shouldMarkError = field => {
    let hasError;
    if (field == 'password') {
      hasError = !validatePassword(password)
    } else if (field == 'email') {
      hasError = !validateEmail(email)
    }
    const shouldShow = isBlur;
    return hasError ? shouldShow : false;
  };

  const CameraOpen = () => {
    ImagePicker.openCamera(
      { width: 300, height: 300, cropping: true }
    ).then(image => {

      setModalVisible(false)
      setProfileUrl(image.path)

      let fileName = moment().unix() + '.jpg';
      let cameraPath = image.path;
      let file = {
        uri: cameraPath,
        type: 'image/jpeg',
        name: fileName,
      };
      const formData = new FormData();
      formData.append('file', file);
      //call image upload api from here
    });
  }

  const GalleryOpen = () => {
    ImagePicker.openPicker({
      width: 300, height: 400, cropping: true,
    }).then(image => {

      setModalVisible(false)
      setProfileUrl('file://' + image.path)

      let galleryPath = 'file://' + image.path;
      let file = {
        uri: galleryPath,
        type: 'image/jpeg',
        name: 'abc.jpg',
      };
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('userId', this.state.userId);
      //call image upload api from here
    })
  }

  const onImageClick = () => {
    setModalVisible(true)
  };

  return (
    <View
      style={{ flex: 1 }}>
      {/* <View style={{ flex: 0.8, marginTop: isIOS ? 8 : 4 }}> */}
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={isIOS ? 0 : 80}
        style={{
          marginTop: 0,
          backgroundColor: WHITE,
          paddingHorizontal: 30,
          flex: 1,
        }}>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Avatar
            source={{
              uri: profileUrl,
            }}
            showEditButton
            size={RFValue(100)}
            rounded
            onPress={() => onImageClick()}
            activeOpacity={0.7}
          />
        </View>


        <View style={styles.viewRow}>
          <Text style={styles.emailText}>{STRINGS.FIRST_NAME}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>

        <TextInput
          style={[styles.emailInput]}
          value={firstName}
          editable={isLoading == false}
          placeholder={'Enter ' + STRINGS.FIRST_NAME}
          placeholderTextColor={GREY}
          maxLength={50}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid={'transparent'}
          onChangeText={firstName => setFirstName(firstName)}
        />

        <View style={styles.viewRow}>
          <Text style={[styles.emailText]}>{STRINGS.LAST_NAME}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          value={lastName}
          editable={isLoading == false}
          placeholder={'Enter ' + STRINGS.LAST_NAME}
          placeholderTextColor={GREY}
          maxLength={50}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid={'transparent'}
          onChangeText={lastName => setLastName(lastName)}
        // onSubmitEditing={() => validateField()}
        />

        <View style={styles.viewRow}>
          <Text style={[styles.emailText]}>{EMAILADDR}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          value={email}
          editable={isLoading == false}
          placeholder={EMAILHOLDER}
          placeholderTextColor={GREY}
          maxLength={50}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          keyboardType="email-address"
          underlineColorAndroid={'transparent'}
          onChangeText={email => setEmail(email)}
          onSubmitEditing={() => validateField()}
        />

        <View style={styles.viewRow}>
          <Text style={[styles.emailText]}>{EMAILPASWD}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>
        <TextInput
          style={[
            styles.emailInput
          ]}
          editable={isLoading == false}
          value={password}
          maxLength={20}
          placeholder={EMAILPASWD}
          placeholderTextColor={GREY}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword(password)}
          onSubmitEditing={() => validateField()}
        />

        <View style={styles.viewRow}>
          <Text style={[styles.emailText]}>{STRINGS.ROLE}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>
        <TextInput
          style={[
            styles.emailInput
          ]}
          editable={isLoading == false}
          value={role}
          maxLength={2}
          placeholder={'Enter ' + STRINGS.ROLE}
          placeholderTextColor={GREY}
          keyboardType={'number-pad'}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={role => setRole(role)}
        />

        <View style={styles.viewRow}>
          <Text style={[styles.emailText]}>{STRINGS.PHONE}</Text>
          <Text style={styles.starStyle}>{'*'}</Text>
        </View>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          editable={isLoading == false}
          value={phone}
          maxLength={10}
          placeholder={'Enter ' + STRINGS.PHONE}
          placeholderTextColor={GREY}
          keyboardType={'number-pad'}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={phone => setPhone(phone)}
        />

        <Text style={[styles.emailText]}>{STRINGS.ADDRESS}</Text>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          editable={isLoading == false}
          value={address}
          maxLength={20}
          placeholder={'Enter ' + STRINGS.ADDRESS}
          placeholderTextColor={GREY}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={address => setAddress(address)}
          onSubmitEditing={() => validateField()}
        />

        <Text style={[styles.emailText]}>{STRINGS.CITY}</Text>
        <TextInput
          style={styles.emailInput}
          editable={isLoading == false}
          value={city}
          maxLength={20}
          placeholder={'Enter ' + STRINGS.CITY}
          placeholderTextColor={GREY}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={city => setCity(city)}
        />

        <Text style={[styles.emailText]}>{STRINGS.STATE}</Text>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          editable={isLoading == false}
          value={state}
          maxLength={20}
          placeholder={'Enter ' + STRINGS.STATE}
          placeholderTextColor={GREY}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={state => setState(state)}
        />

        <Text style={[styles.emailText]}>{STRINGS.COUNTRY}</Text>
        <TextInput
          style={[
            styles.emailInput,
          ]}
          editable={isLoading == false}
          value={country}
          maxLength={20}
          placeholder={'Enter ' + STRINGS.COUNTRY}
          placeholderTextColor={GREY}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={country => setCountry(country)}
        />

        <Text style={[styles.emailText]}>{STRINGS.ZIP}</Text>
        <TextInput
          style={[styles.emailInput, { marginBottom: 24 }]}
          editable={isLoading == false}
          value={zip}
          maxLength={6}
          placeholder={'Enter ' + STRINGS.ZIP}
          placeholderTextColor={GREY}
          keyboardType={'number-pad'}
          // secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={zip => setZip(zip)}
        />
      </KeyboardAwareScrollView>

      <View style={{ flex: 0.2, marginLeft: 10, marginRight: 10 }}>
        <Button
          text={STRINGS.SIGNUP}
          onBtnPress={() => validateField()}
          loader={isLoading == true}
        />
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.bottomModal}
      >
        <View style={styles.content} >
          <View style={styles.gallaryViewStyle}>
            <View style={{ marginRight: 20, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => CameraOpen()}
              >
                <MaterialCommunityIconsIcon
                  name="camera"
                  color={COLOR.CINNABAR}
                  size={40}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 16 }}>
                Camera
          </Text>
            </View>

            <View style={{ marginLeft: 20, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => GalleryOpen()}
              >
                <MaterialCommunityIconsIcon
                  name="camera-burst"
                  color={COLOR.TEXT_ORANGE}
                  size={40}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'left', marginTop: 10, fontSize: 16 }}>
                Gallery
          </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    paddingHorizontal: 30,
  },
  imgContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 58,
  },
  img: { width: '31.5%', flex: 1 },
  emailText: {
    color: DARKGREY,
    fontFamily: FONTS.REGULAR,
    ...(isIOS
      ? {
        fontSize: RFValue(17),
        // marginBottom: RFValue(24)
        marginTop: RFValue(24),
      }
      : {
        fontSize: RFValue(18),
        // marginTop: 4,
      }),

  },
  starStyle: {
    color: 'red',
    fontFamily: FONTS.REGULAR,
    paddingLeft: RFValue(8),
    ...(isIOS
      ? {
        fontSize: RFValue(17),
        marginTop: RFValue(24),
      }
      : {
        fontSize: RFValue(18),
      }),
  },
  emailInput: {
    fontFamily: FONTS.LIGHT,
    fontSize: RFValue(17),
    borderBottomWidth: 0.4,
    borderBottomColor: PRIMARY,
    padding: 0,
    ...(isIOS
      ? {
        marginTop: 10,
        borderBottomWidth: 0.4,
      }
      : {
        marginTop: 6,
        borderBottomWidth: 1,
      }),
    backgroundColor: 'transparent',
  },
  helperText: {
    marginBottom: 10,
    color: COLOR.ERROR,
    marginTop: RFValue(8),
  },
  viewRow: { flexDirection: 'row' },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  content: { flex: 0.3, backgroundColor: 'white', height: 350, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' },
  gallaryViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default SignUp = React.memo(SignUp);
