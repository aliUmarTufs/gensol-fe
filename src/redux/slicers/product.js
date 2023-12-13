// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeepItem } from '../../services/utils';

const UserReducer = createSlice({
  name: 'product',
  initialState: {
    products: {},
    selectedProductName: '',
    productDetail: {},
    relatedMedia: []
  },
  reducers: {
    getProductPackages(state, action) {},
    getProductRequest(state, action) {},
    getDiagnosisRequest(state, action) {},
    getAssessmentsRequest(state, action) {},
    getTopicsRequest(state, action) {},
    getSubProductRequest(state, action) {},
    getProductDetailRequest() {},
    getProductDetailSuccess(state, action) {
      state.productDetail = action.payload;
    },
    getRelatedMediaRequest() {},
    getRelatedMediaSuccess(state, action) {
      state.relatedMedia = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProductName = action.payload;
    }
  }
});

export const {
  getProductPackages,
  getProductRequest,
  getSubProductRequest,
  getDiagnosisRequest,
  getAssessmentsRequest,
  getTopicsRequest,

  getProductDetailRequest,
  getProductDetailSuccess,

  getRelatedMediaRequest,
  getRelatedMediaSuccess,

  setSelectedProduct
} = UserReducer.actions;

export default UserReducer.reducer;
