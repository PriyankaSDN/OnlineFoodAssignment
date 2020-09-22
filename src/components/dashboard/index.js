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
function Dashboard(props) {
  const { onPressTab, logout, categoriesList, onPressCatrgory } = props;
  return (
    <View
      style={{
        flex: 1,
        padding: RFValue(16),
        backgroundColor: COLOR.BACKGROUND,
      }}>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: RFValue(32), color: COLOR.TEXT_ORANGE, fontFamily: FONTS.SEMI_BOLD }}>Online</Text>
          <Text style={{ fontSize: RFValue(32), color: COLOR.APP_COLOR, fontFamily: FONTS.REGULAR }}> Food</Text>
        </Text>
        <TouchableOpacity onPress={() => logout()}>
          <Image
            source={Images.Logout}
            resizeMode="contain"
            style={{ height: RFValue(20), width: RFValue(20) }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.8, paddingBottom: 10 }}>
        <FlatList
          // style={{ marginBottom: 20 }}
          data={categoriesList}
          contentContainerStyle={{
            alignItems: 'center', paddingBottom: RFPercentage(isiOS ? 1 : 13)
          }}
          // numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                onPressCatrgory(item, index);
              }}
              style={[
                Theme.cardStyle,
                styles.cardStyle,
                index % 2 == 0
                  ? { marginRight: RFValue(8), marginTop: RFValue(16) }
                  : { marginLeft: RFValue(8), marginTop: RFValue(16) },
              ]}>
              <View
                style={styles.viewS}>
                <Image source={{ uri: item.icon }}
                  // resizeMode="contain"
                  style={styles.imageStyle}
                />
              </View>
              <Text
                style={[styles.textStyle, { paddingTop: 0 }]}>
                {item.title}
              </Text>
              <Text style={styles.textStyle}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
export default Dashboard = React.memo(Dashboard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 30,
  },
  cardStyle: {
    backgroundColor: COLOR.WHITE,
    // backgroundColor: 'red',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(8),
    // width: (width - 48) / 0.2,
    // height: (width - 48) / 2.1,

    width: width / 1.2,
    height: width / 2,
  },
  viewS: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 30
  },
  imageStyle: {
    width: width / 1.2,
    height: width / 3.6,
    marginBottom: 10,
  },
  textStyle: {
    alignSelf: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: RFValue(isiOS ? 16 : 18),
    color: COLOR.BORDER_LIGHT,
  }
})