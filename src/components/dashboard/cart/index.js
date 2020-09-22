/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// @ts-nocheck
import Loader from '@components/common/screenLoader';
import GLOBALS from '@constants';
import * as Images from '@images';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { FONTS, COLOR } = GLOBALS;
function Cart(props) {
  const { onPressAssessment, allAssessments, assessmentLoader } = props;
  const CardView = ({ item, onClick }) => {
    return (
      <TouchableOpacity
        onPress={() => onClick(item)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          shadowColor: COLOR.SHADOW,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          padding: RFValue(16),
          elevation: 5,
          borderRadius: RFValue(8),
          marginBottom: RFValue(8),
        }}>
        <View style={{ flex: 0.2 }}>
          <Image source={Images.Assessments} resizeMode="contain" />
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 0.1, justifyContent: 'center' }}>
          {item.status === 'Completed' && (
            <Image
              source={Images.RadioChecked}
              resizeMode="contain"
              style={{ height: RFValue(32), width: RFValue(32) }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: COLOR.BACKGROUND,
        flex: 1,
        paddingHorizontal: RFValue(16),
      }}>
      <Text
        style={{
          fontFamily: FONTS.REGULAR,
          fontSize: RFValue(30),
          color: COLOR.TEXT_ORANGE,
        }}>
        Select Journal type
      </Text>
      {assessmentLoader ? (
        <Loader />
      ) : (
          <FlatList
            contentContainerStyle={{ flex: 1, paddingVertical: RFValue(8) }}
            data={allAssessments}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <CardView item={item} onClick={onPressAssessment} />
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(15),
                    color: COLOR.GREY,
                    fontFamily: FONTS.REGULAR,
                  }}>
                  No journal are available
              </Text>
              </View>
            }
          />
        )}
    </View>
  );
}

export default Cart = React.memo(Cart);
