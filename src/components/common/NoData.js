// @ts-nocheck
import Loader from '@components/common/loader';
import GLOBALS from '@constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {FONTS, COLOR} = GLOBALS;
const {PRIMARY, WHITE, GREY} = COLOR;
export default NoData = React.memo(props => {
  let {emptyTextMessage} = props;
  emptyTextMessage = emptyTextMessage ? emptyTextMessage : 'No data found';
  return (
    <View
      style={{
        flex: 1,
        borderRadius: RFValue(5),
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: RFValue(10),
        // backgroundColor: GREY,
      }}>
      {<Text style={styles.buttonText}>{emptyTextMessage}</Text>}
    </View>
  );
});
const styles = StyleSheet.create({
  buttonText: {
    fontSize: RFValue(15),
    color: GREY,
    textTransform: 'uppercase',
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
  },
});
