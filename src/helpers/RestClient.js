'use strict';

import NetInfo from '@react-native-community/netinfo';
import { create } from 'apisauce';
import GLOBALS from '@constants';
import { accessToken } from '@helpers/common';
const { BASE_URL, BASE_URL_VIDEO } = GLOBALS;

const api = create({
  baseURL: BASE_URL, //TEST_API_URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: accessToken(),
  },
  timeout: 10 * 1000 /* 1 second = 1000 ms */,
});

class RestClient {
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) fulfill(isConnected);
        else {
          reject(isConnected);
        }
      });
    });
  }

  static getCall(url, token) {
    api.setHeader('Authorization', url == 'login' ? '' : accessToken());
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.get(BASE_URL + url).then(response => {
            if (response.status === 200) {
              fulfill(response.data);
            }
            reject(response);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.log('error___GET___', error);
        });
    });
  }

  static postCallVideo(url, params, token) {
    console.log('url', BASE_URL_VIDEO + url, params);
    api.setHeader('Authorization', accessToken());
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(BASE_URL_VIDEO + url, params).then(response => {
            console.log('responsesdfsdfsfsfsfsfsdfs', response);
            if (response.status === 200) {
              fulfill(response.data);
            }
            reject(response);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.log('Error___POST____', error);
        });
    });
  }

  static postCall(url, params, token) {
    console.log('url', BASE_URL + url, params);
    api.setHeader('Authorization', accessToken());
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(BASE_URL + url, params).then(response => {
            console.log('responsesdfsdfsfsfsfsfsdfs', response);
            if (response.status === 200) {
              fulfill(response.data);
            }
            reject(response);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.log('Error___POST____', error);
        });
    });
  }

  static putCall(url, params) {
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.put(`https://reqres.in/api` + url, params).then(response => {
            if (response.status === 200) {
              fulfill(response.data);
            }
            reject(response);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.log('eroro', error);
        });
    });
  }

  static patchCall(url, params) {
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.put(`https://reqres.in/api` + url, params).then(response => {
            if (response.status === 200) {
              fulfill(response.data);
            }
            reject(response);
          });
        })
        .catch(error => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.log('eroro', error);
        });
    });
  }
}

export default RestClient;
