import ApiHandler from '../services/ApiHandler';
import { getCurrentAccessToken } from '../services/utils';

export const API_TIMEOUT = 30000;
export const ABORT_REQUEST_MESSAGE = 'Network failed. Aborted request.';

export const BASE_URL =
  'https://genius-academy-cms-shop-90dfceeffd52.herokuapp.com';
// export const BASE_URL =
//   'http://localhost:1337';

export const ERROR_SOMETHING_WENT_WRONG =
  'Something went wrong, Please try again later';
export const ERROR_API_NOT_FOUND = 'Api not found, Please try again later';

export const ERROR_NETWORK_NOT_AVAILABLE =
  'Please connect to the working Internet';

export const ERROR_ACCOUNT_BLOCKED =
  'Either your account is blocked or deleted';

export const ERROR_TOKEN_EXPIRE = 'Session Expired, Please login again!';

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
};

// GET A QUOTE

export const GET_A_QUOTE = {
  route: 'api/getQuoteEmail',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const SUBSCRIBED_TO_NEWSLETTER = {
  route: 'api/newsletterSubscription',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

// DASHBOARD STATES

export const CONTACT_US = {
  route: '/conact-forms/fill',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

// ALL SUBSCRIPTIONS

export const LOGIN_REQUEST = {
  route: 'api/auth/local',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const SIGNUP_REQUEST = {
  route: 'api/auth/local/register',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const FORGOT_REQUEST = {
  route: 'api/auth/forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const RESET_PASSWORD_REQUEST = {
  route: 'api/auth/reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const UPDATE_PROFILE_REQUEST = {
  route: 'api/users',
  access_token_required: false,
  type: REQUEST_TYPE.PUT
};

export const UPDATE_USER_ROLE = {
  route: 'api/updateUserRole',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};
export const GET_USER_ROLE = {
  route: 'api/users',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const PASSWORD_UPDATE_REQUEST = {
  route: 'api/changePassword',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const USER_CHECKOUT_REQUEST = {
  route: 'api/orders',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const USER_CHECKOUT_SENDMAIL_REQUEST = {
  route: 'api/studentPaymentEmail',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const USER_CHECKOUT_GETMAIL_REQUEST = {
  route: 'api/carts',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const USER_ORDER_HISTORY = {
  route: 'api/orders',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const PRODUCT_REQUEST = {
  route: 'api/categories',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const DIAGNOSIS_REQUEST = {
  route: 'api/diagnoses',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const ASSESSMENT_REQUEST = {
  route: 'api/assessments',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const TOPICS_REQUEST = {
  route: 'api/topics',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const SUB_PRODUCT_REQUEST = {
  route: 'api/courses',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const PRODUCT_PACKAGES_REQUEST = {
  route: 'api/product-lines',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const GET_SUBSCRIPTIONS = {
  route: '/api/v1/reports/stats',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const GET_PRODUCT_DETAILS = {
  route: '/api/courses',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const callRequest = async (
  url,
  data,
  parameter,
  query,
  header = {},
  baseURL = BASE_URL
) => {
  let _header = { ...header, 'ngrok-skip-browser-warning': '1' };

  if (url.access_token_required) {
    const _access_token = getCurrentAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`
        }
      };
    }
  }

  let _url =
    parameter && parameter !== null ? `${url.route}/${parameter}` : url.route;
  if (query && query !== null) {
    _url = `${_url}?${query}`;
  }
  let response = await ApiHandler(url.type, _url, data, _header, baseURL);
  return response;
};
