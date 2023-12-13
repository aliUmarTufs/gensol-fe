import { take, put, call, fork } from 'redux-saga/effects';
import { getaQuoteForm, newsletterSubscriptionForm } from '../slicers/general';
import { ALERT_TYPES } from '../../constants';
import { callRequest, GET_A_QUOTE, SUBSCRIBED_TO_NEWSLETTER } from '../../config/webService';
import { toastAlert } from '../../services/utils';

function* getAQuote() {
  while (true) {
    const { payload } = yield take(getaQuoteForm.type);
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_A_QUOTE,
        payloadData,
        '',
        '',
        {}
      );
      if (responseCallback) responseCallback(response);
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* subscribeToNewsletter() {
  while (true) {
    const { payload } = yield take(newsletterSubscriptionForm.type);
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        SUBSCRIBED_TO_NEWSLETTER,
        payloadData,
        '',
        '',
        {}
      );
      if (responseCallback) responseCallback(response);
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}
export default function* root() {
  yield fork(getAQuote);
  yield fork(subscribeToNewsletter);
}
