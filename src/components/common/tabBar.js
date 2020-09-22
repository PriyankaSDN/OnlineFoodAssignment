/* eslint-disable react-native/no-inline-styles */
/* eslint-disable module-resolver/use-alias */
import GLOBALS from '@constants';
import * as Images from '@images';
import Theme from 'components/common/styles';
import { Tab } from 'components/common/tabSwitcher';
import React, { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles';
const { FONTS, COLOR, BOTTOM_TABS } = GLOBALS;
const { WHITE } = COLOR;
const Home = props => {
  const [selectedTab, setSelectedTab] = useState('Home');
  //  rgba(255, 255, 255, 0.1)
  return (
    <View style={Styles.container}>
      <View style={Styles.mainView}>
        <View style={[Styles.tabViewStyle, selectedTab === 'Home' ? { flex: 0.3 } : { flex: 0.2 }]}>
          <Tab
            id={'Home'}
            tabSelected={() => {
              setSelectedTab('Home');
            }}>
            <View
              style={
                selectedTab === 'Home' ? [Styles.activeTab, { marginLeft: 20 }] : Styles.tabStyle
              }>
              <Image
                // source={selectedTab == 'Wall' ? Images.ActiveWall : Images.Wall}
                source={Images.Wall}
                resizeMode="contain"
                style={Styles.imageStyle}
              />
              {selectedTab === 'Home' ?
                <Text style={{ color: COLOR.WHITE, paddingLeft: 10 }}>{"Order"}</Text>
                : null}
            </View>
          </Tab>
        </View>

        <View style={[Styles.tabViewStyle, selectedTab === 'Profile' ? { flex: 0.3 } : { flex: 0.2 }]}>
          <Tab
            id={'Profile'}
            tabSelected={() => {
              setSelectedTab('Profile');
            }}>
            <View
              style={
                selectedTab === 'Profile' ? Styles.activeTab : Styles.tabStyle
              }>
              <Image
                source={Images.Groups}
                resizeMode="contain"
                style={Styles.imageStyle}
              />
              {selectedTab === 'Profile' ?
                <Text style={{ color: COLOR.WHITE, paddingLeft: 10 }}>{"Profile"}</Text>
                : null}
            </View>
          </Tab>
        </View>


        <View style={[Styles.tabViewStyle, selectedTab === 'Cart' ? { flex: 0.3 } : { flex: 0.2 }]}>
          <Tab
            id={'Cart'}
            tabSelected={() => {
              setSelectedTab('Cart');
            }}>
            <View
              style={
                selectedTab === 'Cart' ? [Styles.activeTab, { marginRight: 20, width: RFValue(95) }] : Styles.tabStyle
              }>
              <Image
                source={Images.Journal}
                resizeMode="contain"
                style={Styles.imageStyle}
              />
              {selectedTab === 'Cart' ?
                <Text style={{ color: COLOR.WHITE, paddingLeft: 10 }}>{"Cart"}</Text>
                : null}
            </View>
          </Tab>
        </View>
      </View>
    </View>
  );
};
export default Home;

const Styles = StyleSheet.create({
  container: {
    height: '8%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    marginBottom: RFValue(24),
  },
  mainView: {
    borderRadius: 30,
    backgroundColor: '#F05A28',
    height: '100%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViewStyle: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },
  activeTab:
  {
    // flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: RFValue(32),
    width: RFValue(90),
    flexDirection: 'row',
    borderRadius: RFValue(30),
    // marginLeft: 40,
  },
  tabStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: { height: RFValue(20), width: RFValue(20) }
})
