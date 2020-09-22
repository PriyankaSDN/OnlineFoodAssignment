// @ts-nocheck
import * as AppActions from '@actions';
import { navigatorPop, navigatorPush } from '@config/navigationOptions';
import GLOBALS from '@constants';
import React, { Component, lazy } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { COLOR } = GLOBALS;
const Header = lazy(() => import('@components/common/Header'));

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.getJournal();
  }

  render() {
    const { componentId } = this.props;
    return (
      <View style={Styles.homeContainer}>
        <Text>Under Development</Text>
      </View>
    );
  }
}
const mapStateToProps = ({ authReducer }) => ({

});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
