// @ts-nocheck
import GLOBALS from '@constants';
import * as ICONS from '@images';
import React, { Component, lazy, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import SearchBar from '@components/common/searchBar'
const { FONTS, COLOR, STRINGS } = GLOBALS;
const isiOS = Platform.OS == 'ios';
function Header(props) {
  let {
    isLeftIcon = false,
    onLeftIconClick = () => { },
    isTitle = false,
    title = '',
    isRightIcon = false,
    onRightIconClick = () => { },
    findText = () => { },
  } = props;

  const [isHeader, setisHeader] = useState(true)
  return (
    <View>
      {isHeader ?
        <View style={styles.container}>
          <View style={styles.row}>
            {isLeftIcon == true ? (
              <TouchableWithoutFeedback onPress={() => onLeftIconClick()}>
                <View
                  style={[
                    styles.section,
                    { justifyContent: 'center', paddingTop: isiOS ? 2 : 5 },
                  ]}>
                  <Image
                    source={ICONS.LeftArrow}
                    resizeMode="contain"
                    style={styles.capImage}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            {isTitle == true ? (
              <View style={[styles.section, { flex: 3 }]}>
                <View style={styles.capTitle}>
                  <Text style={styles.capTitleText}>{title}</Text>
                </View>
              </View>
            ) : null}
            {isRightIcon == true ? (
              <TouchableWithoutFeedback onPress={() => { setisHeader(!isHeader), onRightIconClick() }}>
                <View
                  style={[
                    styles.rightIcon,
                    { justifyContent: 'center', paddingTop: isiOS ? 0 : 10 },
                  ]}>
                  <Image
                    source={ICONS.findIcon}
                    resizeMode="contain"
                    style={styles.check}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </View> : <SearchBar
          // isLeftIcon={true}
          isTitle={true}
          isRightIcon={true}
          onLeftIconClick={() => onLeftIconClick()}
          onRightIconClick={() => (setisHeader(!isHeader), onRightIconClick())}
          title=""
          findText={findText}
          isSearchActive={isHeader == false}
        />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: RFPercentage(2.5),
    marginTop: isiOS ? getStatusBarHeight() : 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: RFPercentage(11),
  },
  section: {
    flex: 0.5,
    overflow: 'hidden',
  },
  capTitle: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: RFPercentage(isiOS ? 0.8 : 1.2),
    overflow: 'hidden',
  },
  capImage: {
    height: RFPercentage(isiOS ? 4 : 5),
    width: RFPercentage(isiOS ? 4 : 5),
    alignSelf: 'flex-start',
  },
  capTitleText: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(isiOS ? 22 : 23),
    color: COLOR.GREY,
    alignSelf: 'flex-start',
  },
  details: {
    flex: 1,
    paddingHorizontal: 0,
    overflow: 'hidden',
  },
  detailsText: {
    fontFamily: FONTS.LIGHT,
    fontSize: RFValue(16),
    color: COLOR.GREY,
  },
  shiftStyle: {
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(20),
    color: COLOR.DARKGREY,
    justifyContent: 'center',
    marginVertical: RFPercentage(2.5),
  },
  check: {
    height: RFPercentage(isiOS ? 3.5 : 4),
    width: RFPercentage(isiOS ? 3.5 : 4),
    alignSelf: 'center',
  },
  rightIcon: {
    flex: 1,
    // height: RFPercentage(11),
    // backgroundColor:'green'
  },
});
export default Header = React.memo(Header);
