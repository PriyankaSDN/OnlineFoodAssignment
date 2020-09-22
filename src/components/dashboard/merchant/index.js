// @ts-nocheck
import GLOBALS from '@constants';
import * as Images from '@images';
import Theme from 'components/common/styles';
import { set } from 'lodash';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, TABS } = GLOBALS;
const { width, height } = Dimensions.get('window');
const isiOS = Platform.OS == 'ios';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['name', 'address'];

const CardView = ({ item, onClick }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(item)}
      style={styles.row}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.merchant_image }}
          // source={ICONS.ManAvatar}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.textStyle, { fontFamily: FONTS.BOLD, }]}>{item.name}</Text>
        <Text style={[styles.textStyle]}>{item.address}</Text>
      </View>

      <View style={{ flex: 0.1 }}>
        <Image
          source={Images.Forward}
          resizeMode="contain"
          style={{ paddingRight: 10 }}
        />
      </View>

    </TouchableOpacity>
  );
};

function Merchant(props) {
  const { merchantList, onPressMerchant } = props;
  const [searchText, setSearchText] = useState("");
  const [isSearchList, setisSearchList] = useState(false);
  const [newMerchantList, setNewmerchantList] = useState(merchantList, '');

  const searchUpdated = (text) => {
    if (text != '') {
      const filteredList = merchantList.filter(createFilter(text, KEYS_TO_FILTERS))
      setNewmerchantList(filteredList)
      setSearchText(text)
      setisSearchList(true)
    } else {
      setSearchText('')
      setisSearchList(false)
      setNewmerchantList(merchantList)
    }
  }

  return (
    <View
      style={styles.container}>

      <View style={styles.chatView}>
        <TextInput
          // onChangeText={(term) => { setSearchText(term) }}
          onChangeText={(term) => { searchUpdated(term) }}
          style={{ paddingLeft: 10 }}
          placeholder={!isSearchList ? "Search" : null}
          placeholderTextColor={'#0F243D'}
          value={searchText}
        />
        <Image
          source={Images.Search}
          resizeMode="contain"
          style={styles.capImage}
        />
      </View>

      <View style={{ marginBottom: RFValue(50) }}>
        <FlatList
          // style={{ marginBottom: 20 }}
          data={newMerchantList}
          contentContainerStyle={{
            alignItems: 'center', paddingBottom: RFPercentage(isiOS ? 1 : 13)
          }}
          // numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <CardView
              item={item}
              onClick={onPressMerchant}
            />
          )}
        />
      </View>
    </View>
  );
}
export default Merchant = React.memo(Merchant);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(16),
    backgroundColor: COLOR.BACKGROUND,
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
    width: RFValue(80),
    height: RFValue(80),
    // borderRadius: 30,
  },
  textStyle: {
    // alignSelf: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(isiOS ? 16 : 18),
    color: COLOR.BORDER_LIGHT,
  },
  chatView: {
    backgroundColor: 'white',
    marginBottom: RFPercentage(isiOS ? 3 : 3.5),
    borderRadius: RFPercentage(1.8),
    borderColor: 'rgba(62, 151, 255, 0.2)',
    shadowColor: COLOR.SHADOW,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    padding: 1,
    height: RFPercentage(isiOS ? 8 : 10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  capImage: {
    // height: RFPercentage(11),
    // width: RFPercentage(11),
    // alignItems: 'center',
    marginTop: RFValue(30),
  },
})