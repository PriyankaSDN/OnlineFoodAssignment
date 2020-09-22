import { navigatorPush, navigatorRoot } from '@config/navigationOptions';
import GLOBALS from '@constants';
import RestClient from '@helpers/RestClient';
import { toast } from '@helpers/common';
import moment from 'moment';

const { ACTION_TYPE, URL, STRINGS } = GLOBALS;
const { TRY_AGAIN, TIMEOUT_ERROR, CHECK_NETWORK } = STRINGS;

export function categoryData(perPage, page) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_CATEGORY_REQUEST });
    try {
      let json = await RestClient.getCall(URL.CATEGORY);
      console.log('signUpRes>>', json)
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.GET_CATEGORY_SUCCESS,
          payload: json.data,
        });
        // navigatorPush({ componentId, screenName: 'SignIn' });

      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.GET_CATEGORY_FAIL,
        });
      }
    } catch (error) {
      console.log('catch error')
      console.log('catch Priyanka', error)
      if (error.status == 303) {
        toast('Server Error!');
      }
      dispatch({
        type: ACTION_TYPE.GET_CATEGORY_FAIL,
      });
    }
  };
}

//merchantData
export function merchantData(perPage, page, id) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_MERCHANT_REQUEST });
    try {
      let json = await RestClient.getCall(URL.MERCHANT + perPage + '&page=' + page + '&id=' + id);
      console.log('merchantRes>>', json)
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.GET_MERCHANT_SUCCESS,
          payload: json.data,
        });
        // navigatorPush({ componentId, screenName: 'SignIn' });

      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.GET_MERCHANT_FAIL,
        });
      }
    } catch (error) {
      console.log('catch error')
      console.log('catch Priyanka', error)
      if (error.status == 303) {
        toast('Server Error!');
      }
      dispatch({
        type: ACTION_TYPE.GET_MERCHANT_FAIL,
      });
    }
  };
}

//subCategoryData
export function subCategoryData(perPage, page, id) {
  console.log('SUB_CATEGORY_id', id)
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_SUB_CATEGORY_REQUEST });
    try {
      let json = await RestClient.getCall(URL.SUB_CATEGORY + id + '&type=merchant');
      console.log('merchantRes>>', json)
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.GET_SUB_CATEGORY_SUCCESS,
          payload: json.data,
        });
        // navigatorPush({ componentId, screenName: 'SignIn' });

      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.GET_SUB_CATEGORY_FAIL,
        });
      }
    } catch (error) {
      console.log('catch error')
      console.log('catch Priyanka', error)
      if (error.status == 303) {
        toast('Server Error!');
      }
      dispatch({
        type: ACTION_TYPE.GET_SUB_CATEGORY_FAIL,
      });
    }
  };
}

//categoryDetailsData
export function categoryDetailsData(id) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.GET_CATEGORY_DETAILS_REQUEST });
    try {
      let json = await RestClient.getCall(URL.CATEGORY_DEATILS + id);
      console.log('merchantRes>>', json)
      if (json.statusCode == 200) {
        dispatch({
          type: ACTION_TYPE.GET_CATEGORY_DEATAILS_SUCCESS,
          payload: json.data,
        });
        // navigatorPush({ componentId, screenName: 'SignIn' });

      } else {
        if (json.code == 400) {
          toast(json.message);
        }
        dispatch({
          type: ACTION_TYPE.GET_CATEGORY_DETAILS_FAIL,
        });
      }
    } catch (error) {
      console.log('catch error')
      console.log('catch Priyanka', error)
      if (error.status == 303) {
        toast('Server Error!');
      }
      dispatch({
        type: ACTION_TYPE.GET_CATEGORY_DETAILS_FAIL,
      });
    }
  };
}