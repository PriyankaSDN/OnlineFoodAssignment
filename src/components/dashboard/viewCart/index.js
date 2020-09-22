// @ts-nocheck
import GLOBALS from '@constants';
import * as Images from '@images';
import Theme from 'components/common/styles';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, TABS } = GLOBALS;
const { width, height } = Dimensions.get('window');
const isiOS = Platform.OS == 'ios';

function ViewCart(props) {
  const { subCategoryList, onPressSubCategory } = props;
  console.log('subCategoryComponet', subCategoryList)
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: RFValue(16),
        backgroundColor: COLOR.BACKGROUND,
      }}>

      <View style={{
        flex: 0.8,
        backgroundColor: 'white',
        marginBottom: RFPercentage(isiOS ? 1.5 : 2),
        shadowColor: COLOR.SHADOW,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 1,
        elevation: 5,
        height: width / 1.65,
        width: width / 1.1
      }}>

        <ImageBackground
          source={{ uri: 'https://mean.stagingsdei.com:6047/uploads/attachment/user/2020-08-21T23-40-47.130Z-Food.jpg' }}
          imageStyle={{ borderRadius: 10, borderColor: 'transparent' }}
          style={{ opacity: 0.5, height: width / 3.1, width: width / 1.1, alignItems: 'center', justifyContent: 'center' }}
        />
        <View style={{
          position: 'absolute',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
          height: width / 3.1,
          width: width / 1.1,
          justifyContent: 'flex-end',
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'transparent',
          paddingBottom: 10,
          paddingLeft: 20
        }}>
          <Text style={{ color: COLOR.WHITE, fontFamily: FONTS.BOLD }}>₹  450</Text>
        </View>
        <View style={{ marginTop: 10, paddingLeft: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={[styles.textStyle, { fontFamily: FONTS.BOLD }]}>{'Margherita'}</Text>
            <Text style={styles.textStyle}>{'Medium | New Hand Tossed'}</Text>

            <View style={{ borderColor: 'gray', borderWidth: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly' }}>
              <View style={{ paddingTop: 3, paddingBottom: 3, }}>
                <Text>DELETE</Text>
              </View>
              <View style={{
                borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10, paddingRight: 10,
                paddingTop: 3, paddingBottom: 3,
              }}>
                <Text>1</Text>
              </View>
              <View style={{ paddingTop: 3, paddingBottom: 3, }}>
                <Text>+</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.textStyle, { fontFamily: FONTS.BOLD, paddingRight: 20, color: 'red' }]}>{'DELETE'}</Text>
          </View>

        </View>
      </View>

      <TouchableOpacity style={styles.addCategoryStyle}>
        <View>
          <Text style={styles.textStyle1}>{'PLACE ORDER'}</Text>
          <Text style={styles.textStyle1}>{'Yoy pay ₹ 450'}</Text>
        </View>
        <Text style={[styles.textStyle1, { fontSize: RFValue(24), fontFamily: FONTS.REGULAR }]}>{'>'}</Text>

      </TouchableOpacity>

    </ScrollView>
  );
}
export default ViewCart = React.memo(ViewCart);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 30,
  },
  cardStyle: {
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(8),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: width / 1.2,
    height: width / 2,
    margin: 10,
  },
  section: {
    flex: 0.7,
    marginHorizontal: 10, justifyContent: 'center',
    paddingLeft: 20
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: RFPercentage(isiOS ? 1.5 : 2),
    borderRadius: RFPercentage(1.8),
    shadowColor: COLOR.SHADOW,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    padding: 1,
    elevation: 5,
    height: RFPercentage(isiOS ? 14 : 16),
    width: width / 1.1
  },
  imageContainer: { flex: 0.2, marginHorizontal: 10 },
  viewS: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 30
  },
  imageStyle: {
    width: width / 1.1,
    height: width / 3.6,
    // borderRadius: 30,
  },
  textStyle: {
    // alignSelf: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(isiOS ? 16 : 18),
    color: COLOR.BORDER_LIGHT,
  },
  textStyle1: {
    fontFamily: FONTS.BOLD,
    fontSize: RFValue(isiOS ? 16 : 16),
    color: COLOR.WHITE,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
  },
  addCategoryStyle: {
    marginTop: RFValue(50),
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 20, borderWidth: 1,
    backgroundColor: COLOR.BACKGROUND_ORANGE,
    borderColor: COLOR.BACKGROUND_ORANGE,
  },
})