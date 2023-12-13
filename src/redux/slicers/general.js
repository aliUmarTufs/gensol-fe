// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';

const GeneralReducer = createSlice({
  name: 'general',
  initialState: Immutable({
    accessToken: ''
    // refreshToken: "",
    // selectedIndex: 0,
    // vehicleTypes: [],
    // showEta: true,
  }),
  reducers: {
    contactUsForm() {},
    getaQuoteForm() {},
    newsletterSubscriptionForm() {}
  }
});

export const { contactUsForm, getaQuoteForm, newsletterSubscriptionForm } =
  GeneralReducer.actions;

export default GeneralReducer.reducer;
