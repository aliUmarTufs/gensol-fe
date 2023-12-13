import { take, put, call, fork } from 'redux-saga/effects';
import {
  getAssessmentsRequest,
  getDiagnosisRequest,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductPackages,
  getProductRequest,
  getRelatedMediaRequest,
  getRelatedMediaSuccess,
  getSubProductRequest,
  getTopicsRequest
} from '../slicers/product';
import {
  ASSESSMENT_REQUEST,
  DIAGNOSIS_REQUEST,
  PRODUCT_PACKAGES_REQUEST,
  PRODUCT_REQUEST,
  SUB_PRODUCT_REQUEST,
  TOPICS_REQUEST,
  callRequest,
  GET_PRODUCT_DETAILS
} from '../../config/webService';
import { manipulateCourseData } from '../../datamanipulators/courses';

function* getProductsPackages() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getProductPackages.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback, query } = payload;
    try {
      const response = yield call(
        callRequest,
        PRODUCT_PACKAGES_REQUEST,
        payloadData,
        '',
        query,
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

function* getProduct() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getProductRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback, query } = payload;
    try {
      const response = yield call(
        callRequest,
        PRODUCT_REQUEST,
        payloadData,
        '',
        query,
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

function* getDiagnosis() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getDiagnosisRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        DIAGNOSIS_REQUEST,
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

function* getAssessments() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getAssessmentsRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        ASSESSMENT_REQUEST,
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

function* getTopics() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getTopicsRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        TOPICS_REQUEST,
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

function* getSubProduct() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getSubProductRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback, query } = payload;
    try {
      const response = yield call(
        callRequest,
        SUB_PRODUCT_REQUEST,
        payloadData,
        '',
        query,
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

function* getProductDetails() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getProductDetailRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { responseCallback, param, query } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_PRODUCT_DETAILS,
        {},
        param,
        query,
        {}
      );
      if (response) {
        if (responseCallback) responseCallback(response);
        yield put(
          getProductDetailSuccess(manipulateCourseData(response?.data?.data))
        );
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.error(err);
      if (responseCallback) responseCallback(err);
    }
  }
}

function* getRelatedMedia() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getRelatedMediaRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { responseCallback, param, query } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_PRODUCT_DETAILS,
        {},
        param,
        query,
        {}
      );
      if (response) {
        if (responseCallback) responseCallback(response);
        yield put(
          getRelatedMediaSuccess(manipulateCourseData(response?.data?.data))
        );
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.error(err);
      if (responseCallback) responseCallback(err);
    }
  }
}

export default function* root() {
  yield fork(getProduct);
  yield fork(getProductsPackages);
  yield fork(getDiagnosis);
  yield fork(getAssessments);
  yield fork(getTopics);
  yield fork(getSubProduct);
  yield fork(getProductDetails);
  yield fork(getRelatedMedia);
}
