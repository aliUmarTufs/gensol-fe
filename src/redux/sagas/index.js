import { fork } from 'redux-saga/effects';
import general from './general';
import subscription from './subscription';
import user from './user';
import product from './product';

export default function* root() {
  yield fork(general);
  yield fork(subscription);
  yield fork(product);
  yield fork(user);
}
