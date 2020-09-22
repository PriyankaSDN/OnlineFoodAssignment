/* eslint-disable module-resolver/use-alias */
import * as AppActions from '@actions';
import GLOBALS from '@constants';
import { ThemeContext } from '@hoc/withRedux';
import React, { Component, lazy } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigatorPop, navigatorPush } from '@config/navigationOptions';
const {
  STRINGS: { CHECK_NETWORK },
} = GLOBALS;
const SignUpComponent = lazy(() => import('@components/auth/signUp'));
const Header = lazy(() => import('@components/common/Header'));

class SignUp extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.state = {
      fcmToke: 'fn8AfE41-3g:APA91bElat-hfSXP1oRu6XCZ0Nu2vbj4QrSa9GW6WANWUdkwRnmHPMB-QXq1djTmtJ2VgAd3hojfGevc-L2ickdMVczvf7Qm7iRG1rwG--_PS_BiBR2q9NpFghwelam01w42PIU0Rs4z'
    };
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  // onRegistration(firstName, lastName, email, password, role, phone, address, city, state, country, zip);


  _onPressSignUp = async (firstName, lastName, email, password, role,
    phone, address, city, state, country, zip, imageUrl) => {
    let { componentId } = this.props;
    let postData = {
      "firstname": firstName,
      "lastname": lastName,
      "email": email,
      "password": password,
      "profile_image": imageUrl,
      "role": role,
      "phone": phone,
      "address": address,
      "city": city,
      "state": state,
      "country": country,
      "zip": zip
    }
    this.props.AppActions.signUp(postData, componentId);
  };

  render() {
    let { componentId } = this.props;
    return (
      <View style={styles.container}>
        <Header
          isLeftIcon={true}
          isTitle={true}
          onLeftIconClick={() => {
            navigatorPop({ componentId });
          }}
          title="Sign Up"
        />
        <SignUpComponent
          onRegistration={this._onPressSignUp}
          isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  isLoading: authReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
