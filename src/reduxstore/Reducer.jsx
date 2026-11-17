import * as actiontype from "./ActionType";
import { combineReducers } from "redux";

const initialState = {
  // <-------------------------Product--------------------------------->
  iS_product_data_loading: null,
  pRODUCT_data_load_success: null,
  pRODUCT_data_load_failed: null,

  // <-------------------------Product Detail--------------------------------->
  iS_product_detail_data_loading: null,
  pRODUCT_detail_data_load_success: null,
  pRODUCT_detail_data_load_failed: null,

  // <-------------------------Order--------------------------------->  ✅ NEW
  iS_order_data_loading: false,
  oRDER_data_load_success: null,
  oRDER_data_load_failed: null,
};

const authInitialState = {
  r_token: null,
  a_token: null,
  userId: null,
  iS_user_login_loading: null,
  uSER_login_failed: null,
  sTORE_user_logout_reason: null,
  // <-------------------------Client Register--------------------------------->
  iS_register_loading: null,
  rEGISTER_success: null,
  rEGISTER_failed: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============ Product Loading ============
    case actiontype.IS_PRODUCT_DATA_LOADING:
      return {
        ...state,
        iS_product_data_loading: action.payload,
      };

    // ============ Product Success ============
    case actiontype.PRODUCT_DATA_LOAD_SUCCESS:
      return {
        ...state,
        pRODUCT_data_load_success: action.payload,
      };

    // ============ Product Failed ============
    case actiontype.PRODUCT_DATA_LOAD_FAILED:
      return {
        ...state,
        pRODUCT_data_load_failed: action.payload,
      };

    // ============ Clear Product ============
    case actiontype.CLEAR_PRODUCT_DATA:
      return {
        ...state,
        pRODUCT_data_load_success: null,
        pRODUCT_data_load_failed: null,
      };

    // ============ Product Detail Loading ============
    case actiontype.IS_PRODUCT_DETAIL_DATA_LOADING:
      return {
        ...state,
        iS_product_detail_data_loading: action.payload,
      };

    // ============ Product Detail Success ============
    case actiontype.PRODUCT_DETAIL_DATA_LOAD_SUCCESS:
      return {
        ...state,
        pRODUCT_detail_data_load_success: action.payload,
      };

    // ============ Product Detail Failed ============
    case actiontype.PRODUCT_DETAIL_DATA_LOAD_FAILED:
      return {
        ...state,
        pRODUCT_detail_data_load_failed: action.payload,
      };

    // ============ Clear Product Detail ============
    case actiontype.CLEAR_PRODUCT_DETAIL_DATA:
      return {
        ...state,
        pRODUCT_detail_data_load_success: null,
        pRODUCT_detail_data_load_failed: null,
      };
    // ============ Order Loading ============
    case actiontype.IS_ORDER_DATA_LOADING:
      return {
        ...state,
        iS_order_data_loading: action.payload,
      };

    // ============ Order Success ============
    case actiontype.ORDER_DATA_LOAD_SUCCESS:
      return {
        ...state,
        oRDER_data_load_success: action.payload,
        oRDER_data_load_failed: null,
      };

    // ============ Order Failed ============
    case actiontype.ORDER_DATA_LOAD_FAILED:
      return {
        ...state,
        oRDER_data_load_failed: action.payload,
        oRDER_data_load_success: null,
      };

    // ============ Clear Order ============
    case actiontype.CLEAR_ORDER_DATA:
      return {
        ...state,
        oRDER_data_load_success: null,
        oRDER_data_load_failed: null,
      };
    default:
      return state;
  }
};

const Auth_Reducer = (state = authInitialState, action) => {
  switch (action.type) {
    case actiontype.IS_USER_LOGIN_LOADING:
      return {
        ...state,
        iS_user_login_loading: action.payload,
      };
    case actiontype.USER_LOGIN_SUCCESS:
      return {
        ...state,
        r_token: action.payload.token.refesh,
        a_token: action.payload.token.access,
        userId: action.payload.userID,
      };
    case actiontype.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actiontype.USER_LOGIN_FAILED:
      return {
        ...state,
        uSER_login_failed: action.payload,
      };
    case actiontype.CLEAR_USER_LOGIN:
      return {
        ...state,
        uSER_login_failed: null,
      };
    case actiontype.STORE_USER_LOGOUT_REASON:
      return {
        ...state,
        sTORE_user_logout_reason: action.payload,
      };
    case actiontype.CLEAR_USER_LOGOUT_REASON:
      return {
        ...state,
        sTORE_user_logout_reason: null,
      };
    // <-----------------------------Register Dear----------------------------->
    case actiontype.IS_REGISTER_LOADING:
      return { ...state, iS_register_loading: action.payload };

    case actiontype.REGISTER_SUCCESS:
      return {
        ...state,
        rEGISTER_success: action.payload,
        rEGISTER_failed: null,
      };

    case actiontype.REGISTER_FAILED:
      return {
        ...state,
        rEGISTER_failed: action.payload,
        rEGISTER_success: null,
      };

    case actiontype.CLEAR_REGISTER:
      return {
        ...state,
        rEGISTER_success: null,
        rEGISTER_failed: null,
      };

    default:
      return state;
  }
};
export const Reducer = combineReducers({
  productReducer: productReducer,
  Auth_Reducer: Auth_Reducer,
});
