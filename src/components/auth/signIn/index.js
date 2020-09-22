// @ts-nocheck
import Button from '@components/common/button';
import GLOBALS from '@constants';
import * as Images from '@images';
import { validateEmail, validatePassword } from '@utils/ValidationUtils';
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
  ImageBackground
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, STRINGS } = GLOBALS;
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
function SignIn(props) {
  const [email, setEmail] = useState('tiwari@yopmail.com');
  const [password, setPassword] = useState('Password@123');

  const [isBlur, setBlur] = useState(false);
  const { onLogin, isLoggedIn, isLoading, goToSignUp } = props;
  const validateField = () => {
    isBlur ? null : setBlur(true);
    Keyboard.dismiss();
    let isValidEmail = validateEmail(email);
    let isValidPaswd = validatePassword(password);

    if (isValidEmail == true && isValidPaswd == true) {
      onLogin(email, password);
    }
  };
  const shouldMarkError = field => {
    const hasError =
      // field == 'password' ? !validatePassword(password) : !validateEmail(email);
      field == 'password' ? !validatePassword(password) : !validateEmail(email);
    const shouldShow = isBlur;
    return hasError ? shouldShow : false;
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={isIOS ? 0 : 80}
      style={{
        marginTop: 0,
        backgroundColor: WHITE,
        paddingHorizontal: 30,
      }}>
      <View style={styles.imgContainer}>
        <Text style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: RFValue(32), color: COLOR.TEXT_ORANGE, fontFamily: FONTS.SEMI_BOLD }}>Online</Text>
          <Text style={{ fontSize: RFValue(32), color: COLOR.APP_COLOR, fontFamily: FONTS.REGULAR }}> Food</Text>
        </Text>
        {/* <Image source={Images.Logo} resizeMode="contain" style={styles.img} /> */}
      </View>
      <View style={{ flex: 1, marginTop: isIOS ? 48 : 42 }}>
        <Text style={styles.emailText}>{EMAILADDR}</Text>
        <TextInput
          style={[
            styles.emailInput,
            shouldMarkError('email') == false ? { marginBottom: 30 } : null,
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
        {shouldMarkError('email') ? (
          <Text style={styles.helperText}>{EMAIL_ERROR}</Text>
        ) : null}
        <Text style={[styles.emailText, { marginTop: 0 }]}>{EMAILPASWD}</Text>
        <TextInput
          style={[
            styles.emailInput,
            shouldMarkError('password') == false ? { marginBottom: 30 } : null,
          ]}
          editable={isLoading == false}
          value={password}
          maxLength={20}
          placeholder={EMAILPASWD}
          placeholderTextColor={GREY}
          secureTextEntry={true}
          onBlur={() => {
            isBlur ? null : setBlur(true);
          }}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword(password)}
          onSubmitEditing={() => validateField()}
        />
        {shouldMarkError('password') ? (
          <Text style={styles.helperText}>{PASSWORD_ERROR}</Text>
        ) : null}

        <View>
          <Button
            text={SIGNIN}
            onBtnPress={() => validateField()}
            loader={isLoading == true}
          />
        </View>
        <View style={{ marginTop: RFValue(30) }}>
          <Text style={{ alignSelf: 'center' }}
            onPress={() => goToSignUp()}>
            <Text style={{ fontSize: RFValue(16), fontFamily: FONTS.REGULAR }}>New to Online Food ?</Text>
            <Text style={{ fontSize: RFValue(16), color: COLOR.APP_COLOR, fontFamily: FONTS.SEMI_BOLD }}> Signup here</Text>
          </Text>

        </View>

      </View>
    </KeyboardAwareScrollView>
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
        marginTop: 41,
      }
      : {
        fontSize: RFValue(18),
        marginTop: 61,
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
    marginBottom: 20,
    color: COLOR.ERROR,
    marginTop: RFValue(8),
  },
});

export default SignIn = React.memo(SignIn);
