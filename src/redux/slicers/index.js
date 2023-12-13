import { combineReducers } from '@reduxjs/toolkit';

import general from './general';
import user from './user';
import product from './product';
import subscription from './subscription';

export default combineReducers({
  general,
  user,
  subscription,
  product
});
