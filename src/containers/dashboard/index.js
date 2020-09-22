// @ts-nocheck
import * as AppActions from '@actions/';
import React, { Component, lazy } from 'react';
import { StyleSheet, View, Alert, Modal, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigatorPush } from '@config/navigationOptions';
import TabBar from 'components/common/tabBar';
import TabSwitcher, { TabPanel } from 'components/common/tabSwitcher';
const Dashboard = lazy(() => import('@components/dashboard'));
// const Groups = lazy(() => import('@containers/dashboard/groups'));
const Cart = lazy(() => import('@containers/dashboard/cart'));
const ViewCart = lazy(() => import('@containers/dashboard/viewCart'));


class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      page: 1,
      perPAge: 10,
    };
  }

  componentDidMount() {
    let { perPAge, page } = this.state
    this.props.AppActions.categoryData(10, 1);
  }

  _onPressTab = index => {
    let { componentId } = this.props;
    if (index === 0) {
      // alert('NextDose')
      navigatorPush({ componentId, screenName: 'NextDosage', passProps: {} });
    }
  };
  _onPressCategory = (item) => {
    let { componentId } = this.props;
    navigatorPush({ componentId, screenName: 'Merchant', passProps: { _id: item._id } });
  }

  _logout = () => {
    let { componentId } = this.props;
    this.props.AppActions.logout(componentId);
  };
  render() {
    let { isLoading, componentId, categoryList } = this.props;
    console.log('DEEPAK_LIST', categoryList)
    return (
      <View style={Styles.homeContainer}>
        <TabSwitcher>
          <TabPanel
            whenActive="Home"
          >
            <Dashboard
              onPressTab={this._onPressTab}
              logout={this._logout}
              dashLoader={isLoading}
              categoriesList={categoryList !== null ? categoryList.data : []}
              onPressCatrgory={this._onPressCategory}
            />
          </TabPanel>
          <TabPanel whenActive="Profile">
            <Cart componentId={componentId} />
          </TabPanel>
          <TabPanel whenActive="Cart">
            <ViewCart componentId={componentId} />
          </TabPanel>
          <TabBar />
        </TabSwitcher>
      </View>
    );
  }
}
const mapStateToProps = ({ authReducer, dashboardReducer }) => ({
  isLoading: authReducer.isLoading,
  categoryList: dashboardReducer.getCategoryProductData,
});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  acceptStyle: { padding: 10, backgroundColor: 'green', borderColor: 'green', borderWidth: 1, borderRadius: 20, margin: 5 },
  declineStyle: { padding: 10, backgroundColor: 'red', borderColor: 'red', borderWidth: 1, borderRadius: 20, margin: 5 },
  textStyle: { color: '#FFF', paddingLeft: 10, paddingRight: 10 },
  viewStyle: { marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly' },
  mainViewStyle: { alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').width / 1.5, }
});
