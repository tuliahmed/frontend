import axios from "axios";
import * as actiontype from "./ActionType";

const Base = "http://api.helfiger.com/api/";
const Products = "products";
const Product = "product";
const register = "register";
const token = "token";

// ==================== Sync Action Creators ====================

export const Is_Product_Data_Loading = (data) => {
  return {
    type: actiontype.IS_PRODUCT_DATA_LOADING,
    payload: data,
  };
};

export const Product_Data_Load_Success = (data) => {
  return {
    type: actiontype.PRODUCT_DATA_LOAD_SUCCESS,
    payload: data,
  };
};

export const Product_Data_Load_Failed = (error) => {
  return {
    type: actiontype.PRODUCT_DATA_LOAD_FAILED,
    payload: error,
  };
};

export const Clear_Product_Data = () => {
  return {
    type: actiontype.CLEAR_PRODUCT_DATA,
  };
};

// <-------------------------Product Detail--------------------------------->

export const Is_Product_Detail_Data_Loading = (data) => {
  return {
    type: actiontype.IS_PRODUCT_DETAIL_DATA_LOADING,
    payload: data,
  };
};

export const Product_Detail_Data_Load_Success = (data) => {
  return {
    type: actiontype.PRODUCT_DETAIL_DATA_LOAD_SUCCESS,
    payload: data,
  };
};

export const Product_Detail_Data_Load_Failed = (error) => {
  return {
    type: actiontype.PRODUCT_DETAIL_DATA_LOAD_FAILED,
    payload: error,
  };
};

export const Clear_Product_Detail_Data = () => {
  return {
    type: actiontype.CLEAR_PRODUCT_DETAIL_DATA,
  };
};

// ==================== Async Action Creators ====================

// Category অনুযায়ী সব প্রোডাক্ট
export const Fetch_Products_By_Category = (categoryName) => {
  return (dispatch) => {
    dispatch(Is_Product_Data_Loading(true));
    axios
      .get(`${Base}${Products}/${categoryName}/`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            dispatch(Product_Data_Load_Success(response.data));
            dispatch(Is_Product_Data_Loading(false));
          } else {
            dispatch(Is_Product_Data_Loading(false));
            dispatch(Product_Data_Load_Failed(response.code));
          }
        }
      })
      .catch((error) => {
        dispatch(Is_Product_Data_Loading(false));
        const errorMsg =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        dispatch(Product_Data_Load_Failed(errorMsg));
      });
  };
};

// একটা প্রোডাক্টের detail
export const Fetch_Product_Detail = (productId) => {
  return (dispatch) => {
    dispatch(Is_Product_Detail_Data_Loading(true));
    axios
      .get(`${Base}${Product}/${productId}/`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            dispatch(Product_Detail_Data_Load_Success(response.data));
            dispatch(Is_Product_Detail_Data_Loading(false));
          } else {
            dispatch(Is_Product_Detail_Data_Loading(false));
            dispatch(Product_Detail_Data_Load_Failed(response.code));
          }
        }
      })
      .catch((error) => {
        console.log;
        dispatch(Is_Product_Detail_Data_Loading(false));
        const errorMsg =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        dispatch(Product_Detail_Data_Load_Failed(errorMsg));
      });
  };
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------Auth------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const Is_User_Login_Loading = (data) => {
  return {
    type: actiontype.IS_USER_LOGIN_LOADING,
    payload: data,
  };
};
export const User_Login_Success = (token, userID) => {
  return {
    type: actiontype.USER_LOGIN_SUCCESS,
    payload: {
      userID: userID,
      token: token,
    },
  };
};
export const User_Login_Failed = (error) => {
  return {
    type: actiontype.USER_LOGIN_FAILED,
    payload: error,
  };
};
export const Clear_User_Login = () => {
  return {
    type: actiontype.CLEAR_USER_LOGIN,
  };
};
export const Fetch_User = (obj) => {
  return (dispatch) => {
    dispatch(Is_User_Login_Loading(true));
    let data = {
      email: obj.email,
      password: obj.password,
    };
    console.log(data);
    axios
      .post(`${Base}${token}/`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            User_Login_Success(
              { refesh: response.data.refresh, access: response.data.access },
              obj.email,
            ),
          );
          dispatch(Is_User_Login_Loading(false));
          localStorage.setItem("r_token", response.data.refresh);
          localStorage.setItem("a_token", response.data.access);
          localStorage.setItem("userID", obj.email);
        }
      })
      .catch((error) => {
        dispatch(User_Login_Failed(error.code));
        dispatch(Is_User_Login_Loading(false));
      });
  };
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  return {
    type: actiontype.USER_LOGOUT_SUCCESS,
  };
};

export const Auth_Check = () => {
  return (dispatch) => {
    dispatch(Is_User_Login_Loading(true));
    const r_token = localStorage.getItem("r_token");
    const a_token = localStorage.getItem("a_token");
    const userid = localStorage.getItem("userID");
    if (!a_token) {
      dispatch(Is_User_Login_Loading(false));
    } else {
      dispatch(
        User_Login_Success({ refesh: r_token, access: a_token }, userid),
      );
      dispatch(Is_User_Login_Loading(false));
    }
  };
};

// ==================== Sync Action Creators ====================

export const Is_Register_Loading = (data) => {
  return {
    type: actiontype.IS_REGISTER_LOADING,
    payload: data,
  };
};

export const Register_Success = (data) => {
  return {
    type: actiontype.REGISTER_SUCCESS,
    payload: data,
  };
};

export const Register_Failed = (error) => {
  return {
    type: actiontype.REGISTER_FAILED,
    payload: error,
  };
};

export const Clear_Register = () => {
  return {
    type: actiontype.CLEAR_REGISTER,
  };
};

// ==================== Async Action Creator ====================

export const Fetch_Register = (obj) => {
  return (dispatch) => {
    dispatch(Is_Register_Loading(true));

    axios
      .post(`${Base}${register}/`, obj)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          if (response.data) {
            dispatch(Register_Success(response.data));
            dispatch(Is_Register_Loading(false));
          } else {
            dispatch(Is_Register_Loading(false));
            dispatch(Register_Failed(response.code));
          }
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(Is_Register_Loading(false));
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          error.response?.data?.email?.[0] ||
          error.response?.data?.phone?.[0] ||
          error.message ||
          "Something went wrong";
        dispatch(Register_Failed(errorMsg));
      });
  };
};

// ==================== Order Sync Action Creators ====================

export const Is_Order_Data_Loading = (data) => {
  return {
    type: actiontype.IS_ORDER_DATA_LOADING,
    payload: data,
  };
};

export const Order_Data_Load_Success = (data) => {
  return {
    type: actiontype.ORDER_DATA_LOAD_SUCCESS,
    payload: data,
  };
};

export const Order_Data_Load_Failed = (error) => {
  return {
    type: actiontype.ORDER_DATA_LOAD_FAILED,
    payload: error,
  };
};

export const Clear_Order_Data = () => {
  return {
    type: actiontype.CLEAR_ORDER_DATA,
  };
};

// ==================== Order Async Action Creator ====================

export const Fetch_Create_Order = (
  obj, // array of { variant, quantity, price_at_sale }
  token,
) => {
  return (dispatch) => {
    dispatch(Is_Order_Data_Loading(true));
    axios
      .post(`${Base}order/`, obj,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          if (response.data) {
            dispatch(Order_Data_Load_Success(response.data));
            dispatch(Is_Order_Data_Loading(false));
          } else {
            dispatch(Is_Order_Data_Loading(false));
            dispatch(Order_Data_Load_Failed("No data received"));
          }
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(Is_Order_Data_Loading(false));
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          error.response?.data?.customer?.[0] ||
          error.response?.data?.total_amount?.[0] ||
          error.response?.data?.payment_by?.[0] ||
          error.response?.data?.ordritem?.[0] ||
          error.message ||
          "Something went wrong";
        dispatch(Order_Data_Load_Failed(errorMsg));
      });
  };
};
