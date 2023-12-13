// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeepItem } from '../../services/utils';
import { connect } from 'react-redux';

const UserReducer = createSlice({
  name: 'user',
  initialState: {
    data: {},
    profileSections: [],
    isAuthenticated: false,
    isError: null,
    role: null,
    cartData: [],
    orders: []
  },
  reducers: {
    // USER LOGIN
    userLoginRequest(state, action) {},

    userLoginSuccess(state, action) {
      state.isAuthenticated = true;
      state.data = action.payload.data;
    },
    userSignupRequest(state, action) {},
    forgotRequest(state, action) {},
    resetPasswordRequest(state, action) {},

    getRoleRequest() {},
    getRoleSuccess(state, action) {
      state.role = action.payload;
    },

    // REFRESH TOKEN
    refreshToken(state, action) {
      let newData = cloneDeepItem(state.data);
      newData.access_token = action.payload.access_token;
      newData.refresh_token = action.payload.refresh_token;
      Immutable.merge(state, { data: newData });
    },

    // SET AUTH ERROR
    setAuthError(state, action) {
      state.isError = action.payload;
    },

    // REMOVE AUTH ERROR
    removeAuthError(state, action) {
      state.isError = null;
    },

    // USER SIGNOUT

    // USER SIGNOUT
    userSignOutRequest(state, action) {
      state.isAuthenticated = false;
    },

    userSignOutSuccess(state, action) {
      state.isAuthenticated = false;
      state.data = {};
      state.cartData = [];
      state.role = null;
    },

    ProfileUpdateRequest() {},
    ProfileUpdateRequestSuccess(state, action) {
      state.data = { ...state.data, user: action.payload };
    },
    passwordChangeRequest() {},

    updateRoleRequest() {},

    addToCart(state, action) {
      state.cartData = [...state.cartData, ...action.payload];
    },

    removeFromCart(state, action) {
      let temp = [...state.cartData];
      temp.splice(action.payload, 1);
      state.cartData = temp;
    },

    userCheckoutRequest() {},
    userCheckoutSuccess(state) {
      state.cartData = [];
    },

    userCheckoutSendMailRequest() {},
    userCheckoutSendMailSuccess(state) {
      state.cartData = [];
    },

    userCheckoutGetMailRequest() {},
    userCheckoutGetMailSuccess(state, action) {
      if (action.payload && action.payload.length > 0) {
        state.cartData = action.payload;
      }
    },
    getOrdersRequest() {},
    getOrdersSuccess(state, action) {
      state.orders = action.payload;
    }
  }
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userSignupRequest,
  forgotRequest,
  resetPasswordRequest,
  getRoleRequest,
  getRoleSuccess,
  refreshToken,
  setAuthError,
  removeAuthError,
  userSignOutRequest,
  userSignOutSuccess,
  ProfileUpdateRequest,
  ProfileUpdateRequestSuccess,
  passwordChangeRequest,
  updateRoleRequest,
  addToCart,
  removeFromCart,
  userCheckoutRequest,
  userCheckoutSuccess,
  userCheckoutSendMailRequest,
  userCheckoutSendMailSuccess,
  userCheckoutGetMailRequest,
  userCheckoutGetMailSuccess,
  getOrdersRequest,
  getOrdersSuccess
} = UserReducer.actions;

export default UserReducer.reducer;
