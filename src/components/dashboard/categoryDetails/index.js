// @ts-nocheck
import GLOBALS from '@constants';
import * as Images from '@images';
import Theme from 'components/common/styles';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, TABS } = GLOBALS;
const { width, height } = Dimensions.get('window');
const isiOS = Platform.OS == 'ios';

const CardView = ({ item, onClick }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(item)}
      style={styles.row}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.icon }}
          // source={ICONS.ManAvatar}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.textStyle, { fontFamily: FONTS.BOLD, }]}>{item.title}</Text>
        <Text style={[styles.textStyle]}>{item.address}</Text>
      </View>

      <View style={{ flex: 0.1 }}>
        <ImageBackground
          source={Images.Forward}
          resizeMode="contain"
          style={{ paddingRight: 10 }}
        >
          <Text>199</Text>
        </ImageBackground>

      </View>

    </TouchableOpacity>
  );
};

function CategoryDetails(props) {
  const { subCategoryList, onPressSubCategory } = props;
  const [numberOfItem, setNumberOfItem] = useState(1, '');
  const [price, setPrice] = useState(450, '');
  const [totalPice, setTotalPrice] = useState(450, '');

  const onPlusClick = () => {
    setNumberOfItem(numberOfItem + 1)
    let noOfItem = numberOfItem + 1;
    let totalPrice = price * noOfItem;
    console.log('total price>>', totalPrice)
    setTotalPrice(totalPrice)
  }

  const onDeleteClick = () => {
    if (numberOfItem >= 1) {
      setNumberOfItem(numberOfItem - 1)
      console.log('totalPrice>>', totalPice, '==', price)
      let finalPrice = totalPice - price;
      console.log('total price delete>>', finalPrice)
      setTotalPrice(finalPrice)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: RFValue(16),
        backgroundColor: COLOR.BACKGROUND,
      }}>

      <View style={{
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
          source={{ uri: subCategoryList.icon }}
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
          <Text style={{ color: COLOR.WHITE, fontFamily: FONTS.BOLD }}>₹  {totalPice}</Text>
        </View>


        <View style={{ marginTop: 10, paddingLeft: 20 }}>
          <Text style={[styles.textStyle, { fontFamily: FONTS.BOLD }]}>{subCategoryList.title}</Text>
          <Text style={styles.textStyle}>{subCategoryList.description}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{
            borderColor: 'gray', borderWidth: 1, flexDirection: 'row', marginTop: 10,
            justifyContent: 'space-evenly', marginLeft: 20
          }}>
            <TouchableOpacity
              onPress={() => onDeleteClick()}
              style={{ padding: 5 }}>
              <Text>DELETE</Text>
            </TouchableOpacity>
            <View
              style={{
                borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10, paddingRight: 10,
                padding: 5
              }}>
              <Text>{numberOfItem}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onPlusClick()}
              style={{ padding: 5 }}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addCategoryStyle}>
            <Text style={styles.textStyle1}>{'ADD TO CART'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CategoryDetails = React.memo(CategoryDetails);

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
    fontSize: RFValue(isiOS ? 14 : 16),
    color: COLOR.WHITE,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
  },
  addCategoryStyle: {
    alignSelf: 'flex-end',
    marginRight: 20, borderWidth: 1,
    backgroundColor: COLOR.BACKGROUND_ORANGE,
    borderColor: COLOR.BACKGROUND_ORANGE,
  },
})