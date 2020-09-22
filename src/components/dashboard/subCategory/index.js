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
        <Image
          source={Images.Forward}
          resizeMode="contain"
          style={{ paddingRight: 10 }}
        />
      </View>

    </TouchableOpacity>
  );
};

function SubCategory(props) {
  const { subCategoryList, onPressSubCategory } = props;
  console.log('subCategoryComponet', subCategoryList)
  return (
    <View
      style={{
        flex: 1,
        padding: RFValue(16),
        backgroundColor: COLOR.BACKGROUND,
      }}>

      <View style={{ paddingBottom: 0 }}>
        <FlatList
          // style={{ marginBottom: 20 }}
          data={subCategoryList}
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
              onClick={onPressSubCategory}
            />
          )}
        />
      </View>
    </View>
  );
}
export default SubCategory = React.memo(SubCategory);

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
    width: RFValue(80),
    height: RFValue(80),
    // borderRadius: 30,
  },
  textStyle: {
    // alignSelf: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(isiOS ? 16 : 18),
    color: COLOR.BORDER_LIGHT,
  }
})