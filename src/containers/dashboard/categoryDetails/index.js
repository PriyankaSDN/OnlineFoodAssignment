// @ts-nocheck
import * as AppActions from '@actions/';
import React, { Component, lazy } from 'react';
import { StyleSheet, View, Alert, Modal, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigatorPush, navigatorPop } from '@config/navigationOptions';
const SubCategoryUI = lazy(() => import('@components/dashboard/categoryDetails'));
const Header = lazy(() => import('@components/common/Header'));

class CategoryDetails extends Component {
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
    let { _id } = this.props;
    console.log('_id', _id)
    this.props.AppActions.categoryDetailsData(_id);
  }

  _onPressSubCategory = (item) => {
    let { componentId } = this.props;
    // navigatorPush({ componentId, screenName: 'Merchant', passProps: { _id: item._id } });
  }

  render() {
    let { isLoading, componentId, categoryDetails } = this.props;
    console.log('categoryDetails container', categoryDetails)
    return (
      <View style={Styles.homeContainer}>
        <Header
          isLeftIcon={true}
          isTitle={true}
          onLeftIconClick={() => {
            navigatorPop({ componentId });
          }}
          title="Category Details"
        />
        <SubCategoryUI
          dashLoader={isLoading}
          subCategoryList={categoryDetails !== null ? categoryDetails : ''}
          onPressSubCategory={this._onPressSubCategory}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ authReducer, dashboardReducer }) => ({
  isLoading: authReducer.isLoading,
  categoryDetails: dashboardReducer.getCategoryDetails,
});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
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
