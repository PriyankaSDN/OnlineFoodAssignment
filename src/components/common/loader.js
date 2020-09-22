// @ts-nocheck
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import GLOBALS from '@constants';
const {COLOR} = GLOBALS;
export default Loader = props => {
  const {loaderColor} = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={loaderColor ? loaderColor : COLOR.WHITE} />
    </View>
  );
};
