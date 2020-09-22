/* eslint-disable module-resolver/use-alias */
import * as AppActions from '@actions';
import GLOBALS from '@constants';
import { ThemeContext } from '@hoc/withRedux';
import React, { Component, lazy } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const {
  STRINGS: { CHECK_NETWORK },
} = GLOBALS;
const SignInComponent = lazy(() => import('@components/auth/signIn'));
const Header = lazy(() => import('@components/common/Header'));
import { navigatorPush } from '@config/navigationOptions';

class SignIn extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  _onPressLogin = async (email, password) => {
    let { componentId } = this.props;
    let postData = {
      "email": email,
      "password": password,
      "role": 4
    }
    this.props.AppActions.login(postData, componentId);
  };
  _onPressSignUp = () => {
    // alert('registration press')
    let { componentId } = this.props;
    navigatorPush({ componentId, screenName: 'SignUp', passProps: {} });
  }

  render() {
    return (
      <View style={styles.container}>
        <SignInComponent
          onLogin={this._onPressLogin}
          isLoading={this.props.isLoading}
          goToSignUp={this._onPressSignUp}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
