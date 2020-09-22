/* eslint-disable module-resolver/use-alias */
import GLOBALS from '@constants';

const GetCategoryProductData = {
  getCategoryProductData: null,
};

const GetMerchantData = {
  getMerchantData: null,
};

const GetSubCatgoryData = {
  getSubCategoryData: null,
}
const GetCatgoryDetails = {
  getCategoryDetails: null
}

const INITIAL_STATE = {
  ...GetCategoryProductData,
  ...GetMerchantData,
  ...GetSubCatgoryData,
  ...GetCatgoryDetails,
};
const { ACTION_TYPE } = GLOBALS;
function dashboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        ...GetCategoryProductData,
        getCategoryProductData: action.payload,
      });

    case ACTION_TYPE.GET_MERCHANT_SUCCESS:
      return Object.assign({}, state, {
        ...GetMerchantData,
        getMerchantData: action.payload,
      });

    case ACTION_TYPE.GET_SUB_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        ...GetSubCatgoryData,
        getSubCategoryData: action.payload,
      });

    //
    case ACTION_TYPE.GET_CATEGORY_DEATAILS_SUCCESS:
      return Object.assign({}, state, {
        ...GetCatgoryDetails,
        getCategoryDetails: action.payload,
      });
    default:
      return state;
  }
}
export default dashboardReducer;
