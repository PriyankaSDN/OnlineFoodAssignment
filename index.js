import React from 'react';
import {StatusBar} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/routes';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import setup, {storeObj} from './src/store/setup';
console.disableYellowBox = true;
Navigation.events().registerAppLaunchedListener(() => {
  <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />;
  const store = setup();
  SplashScreen.hide();
  registerScreens(storeObj.store, Provider);
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader',
      },
    },
  });
});
