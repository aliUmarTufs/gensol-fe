import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import { ALERT_TYPES } from '../../constants';
import {
  callRequest,
  FORGOT_REQUEST,
  GET_SUBSCRIPTIONS,
  GET_USER_ROLE,
  LOGIN_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  RESET_PASSWORD_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_USER_ROLE,
  USER_CHECKOUT_GETMAIL_REQUEST,
  USER_CHECKOUT_REQUEST,
  USER_CHECKOUT_SENDMAIL_REQUEST,
  USER_ORDER_HISTORY
} from '../../config/webService';
import { toastAlert } from '../../services/utils';
import {
  ProfileUpdateRequest,
  ProfileUpdateRequestSuccess,
  forgotRequest,
  getOrdersRequest,
  getOrdersSuccess,
  getRoleRequest,
  getRoleSuccess,
  passwordChangeRequest,
  resetPasswordRequest,
  updateRoleRequest,
  userCheckoutGetMailRequest,
  userCheckoutGetMailSuccess,
  userCheckoutRequest,
  userCheckoutSendMailRequest,
  userCheckoutSendMailSuccess,
  userCheckoutSuccess,
  userLoginRequest,
  userLoginSuccess,
  userSignupRequest
} from '../slicers/user';
import { manipulateOrdersList } from '../../datamanipulators/order';

function* userLogin() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userLoginRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        LOGIN_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userLoginSuccess(response));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userSignup() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userSignupRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        SIGNUP_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        // yield put(userLoginSuccess(response));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* forgot() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(forgotRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        FORGOT_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        // yield put(userLoginSuccess(response));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* resetPassword() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(resetPasswordRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        // yield put(userLoginSuccess(response));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* profileUpdate() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(ProfileUpdateRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback, parameter } = payload;
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE_REQUEST,
        payloadData,
        parameter,
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(ProfileUpdateRequestSuccess(response?.data));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* getUserRole() {
  while (true) {
    const { payload } = yield take(getRoleRequest.type);
    const { responseCallback, parameter, query } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_USER_ROLE,
        {},
        parameter,
        query,
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(getRoleSuccess(response?.data?.role.name?.toLowerCase()));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* updateUserRole() {
  while (true) {
    const { payload } = yield take(updateRoleRequest.type);
    const { payloadData, headers } = payload;
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_ROLE,
        payloadData,
        '',
        '',
        headers
      );
    } catch (err) {
    }
  }
}
function* passwordUpdate() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(passwordChangeRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        PASSWORD_UPDATE_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        // yield put(ProfileUpdateRequestSuccess(response?.data));
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userCheckout() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userCheckoutRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        USER_CHECKOUT_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userCheckoutSuccess());
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userCheckoutSendEmail() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userCheckoutSendMailRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        USER_CHECKOUT_SENDMAIL_REQUEST,
        payloadData,
        '',
        '',
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userCheckoutSendMailSuccess());
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userCheckoutGetEmail() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userCheckoutGetMailRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { paramter, query, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        USER_CHECKOUT_GETMAIL_REQUEST,
        {},
        paramter,
        query,
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(
          userCheckoutGetMailSuccess(
            response?.data?.data?.attributes?.itemsData
          )
        );
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* getOrders(action) {
  // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
  const { payload } = action;
  // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
  const { query, responseCallback } = payload;
  try {
    const response = yield call(
      callRequest,
      USER_ORDER_HISTORY,
      {},
      '',
      query,
      {}
    );
    if (response.status) {
      if (responseCallback) responseCallback(response);
      yield put(getOrdersSuccess(manipulateOrdersList(response?.data)));
    } else {
      if (responseCallback) responseCallback(response);
    }
  } catch (err) {
    if (responseCallback) responseCallback(err);
  }
}

export default function* root() {
  yield fork(userLogin);
  yield fork(userSignup);
  yield fork(forgot);
  yield fork(resetPassword);
  yield fork(profileUpdate);
  yield fork(getUserRole);
  yield fork(updateUserRole);
  yield fork(passwordUpdate);
  yield fork(userCheckout);
  yield fork(userCheckoutSendEmail);
  yield fork(userCheckoutGetEmail);
  yield takeLatest(getOrdersRequest.type, getOrders);
}
