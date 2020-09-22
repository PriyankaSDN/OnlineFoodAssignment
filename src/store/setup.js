import AsyncStorage from '@react-native-community/async-storage';
import array from './array';
import thunk from 'redux-thunk';
import promise from './promise';
import * as reducers from '../reducers';
import whitelist from './whitelist';
import {logger} from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {auth, dashboard} from '../config/';
export const storeObj = {};
export default function setup() {
  const isDev = global.isDebuggingInChrome || __DEV__;
  const middleware = [
    autoRehydrate(),
    applyMiddleware(...[thunk, promise, array]),
  ];
  if (isDev) {
    middleware.push(applyMiddleware(logger));
  }
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, {}, compose(...middleware));
  if (global.isDebuggingInChrome) {
    window.store = store;
  }
  persistStore(store, {whitelist, storage: AsyncStorage}, () => {
    if (store.getState().authReducer.isLoggedIn) {
      dashboard();
    } else {
      auth();
    }
  });

  storeObj.store = store;
  return store;
}
