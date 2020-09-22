/* eslint-disable module-resolver/use-alias */
import GLOBALS from '@constants';


const GetWelcomeData = {
  isWelcomSuccess: false,
  getWelcomeData: null,
}

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  hobbiesLoader: false,
  loginData: null,
  loginToken: null,
  hobbiesList: null,

};
const { ACTION_TYPE } = GLOBALS;
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ACTION_TYPE.LOGIN_RESET:/* RESET LOGIN */
      return Object.assign({}, state, {
        isLoading: false, isLoggedIn: false, loginData: null, loginToken: null,
      });

    case ACTION_TYPE.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false, isLoggedIn: true,
        loginData: action.payload,
        loginToken: action.payload.token,
      });

    case ACTION_TYPE.LOGIN_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        isLoggedIn: false, loginData: null, loginToken: null,
      });
    case ACTION_TYPE.GET_HOBBIES_REQUEST:
      return Object.assign({}, state, {
        hobbiesLoader: true,
      });
    case ACTION_TYPE.GET_HOBBIES_SUCCESS:
      return Object.assign({}, state, {
        hobbiesLoader: false,
        hobbiesList: action.payload,
      });
    case ACTION_TYPE.GET_HOBBIES_FAIL:
      return Object.assign({}, state, {
        hobbiesLoader: false,
      });
    case ACTION_TYPE.SAVE_HOBBIES_REQUEST:
      return Object.assign({}, state, {
        saveHobbiesLoader: true,
      });
    case ACTION_TYPE.SAVE_HOBBIES_SUCCESS:
      return Object.assign({}, state, {
        saveHobbiesLoader: false,
      });
    case ACTION_TYPE.SAVE_HOBBIES_FAIL:
      return Object.assign({}, state, {
        saveHobbiesLoader: false,
      });
    case ACTION_TYPE.AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
      });
    case ACTION_TYPE.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        loginData: null, isLoading: false
      });

    case ACTION_TYPE.WELCOME_DATA_SUCCESS:
      return Object.assign({}, state, {
        ...GetWelcomeData,
        isWelcomSuccess: true,
        getWelcomeData: action.payload,
      });

    default:
      return state;
  }
}
export default authReducer;
