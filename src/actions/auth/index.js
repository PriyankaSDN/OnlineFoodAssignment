import { navigatorPush } from '@config/navigationOptions';
import GLOBALS from '@constants';
import RestClient from '@helpers/RestClient';
import { toast } from '@helpers/common';
import { navigatorRoot } from '../../config/navigationOptions';

const { ACTION_TYPE, URL, STRINGS } = GLOBALS;
const { TRY_AGAIN, TIMEOUT_ERROR, CHECK_NETWORK } = STRINGS;

export function login(data, componentId) {
  console.log('loginAction>>', data)
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.LOGIN_RESET });
    dispatch({ type: ACTION_TYPE.LOGIN_REQUEST });
    try {
      let json = await RestClient.postCall(URL.LOGIN, data);
      console.log('codeLogin', json);
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.LOGIN_SUCCESS,
          payload: json.data,
        });
        navigatorPush({ componentId, screenName: 'Dashboard' });
      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.LOGIN_FAIL,
        });
      }
    } catch (error) {
      console.log('error', error);
      alert(error.problem == 'TIMEOUT_ERROR' ? CHECK_NETWORK : TRY_AGAIN);
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

export function signUp(data, componentId) {
  console.log('signUpAction>>', data)
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.SIGNUP_REQUEST });
    try {
      let json = await RestClient.postCall(URL.SIGNUP, data);
      console.log('signUpRes>>', json)
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.SIGNUP_SUCCESS,
          payload: json.data,
        });
        navigatorPush({ componentId, screenName: 'SignIn' });

      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.SIGNUP_FAIL,
        });
      }
    } catch (error) {
      console.log('catch signup', error.status)
      if (error.status == 303) {
        toast('Email Id alreday exist.');
      }
      dispatch({
        type: ACTION_TYPE.SIGNUP_FAIL,
      });
    }
  };
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: ACTION_TYPE.LOGOUT });
    navigatorRoot('SignIn');
  };
};
