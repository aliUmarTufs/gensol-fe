import { Login, Home, Dashboard, Forgot, EmailVerification } from '../modules';
import ResetPassword from '../modules/auth/ResetPassword';
import SignUP from '../modules/auth/Signup';
import PaymentSteps from '../modules/public/PaymentSteps';
import PaymentStepsEducation from '../modules/public/PaymentStepsEducation';
import Product from '../modules/public/Product';
import ProductDetail from '../modules/public/ProductDetail';
import ProductLines from '../modules/public/ProductLines';
import SubProducts from '../modules/public/SubProducts';
import { checkPasswordValidation, isEmailValid } from '../services/utils';

export const ALERT_TIMEOUT = 3000;
export const DEV_ENV = 'dev';
export const PROD_ENV = 'prod';
export const API_LOG = process.env.REACT_APP_ENV === DEV_ENV;
export const API_TIMEOUT = 30000;

export const DATE_FORMAT = 'DD/MMM/YYYY';

export const ERROR_MESSAGES = {
  INTERNET_ERROR: 'Please connect to the working internet',
  SESSION_EXPIRED_ERROR: 'Session expired, Please login again',
  SOMETHING_WRONG: 'Something went wrong',
  FAILED_TO_FETCH: 'Failed to fetch, try to refresh the page'
};

export const FULL_ROW = {
  lg: { span: 24 },
  xl: { span: 24 },
  md: { span: 24 },
  sm: { span: 24 },
  xs: { span: 24 }
};

export const HALF_SPACE = {
  lg: { span: 12 },
  xs: { span: 12 },
  xl: { span: 12 },
  md: { span: 12 },
  sm: { span: 12 }
};

export const FOUR_ITEMS_ROW = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 8 },
  xl: { span: 6 }
};

export const THREE_ITEM_ROWS = {
  xs: { span: 24 },
  sm: { span: 8 },
  md: { span: 8 },
  lg: { span: 8 },
  xl: { span: 8 }
};

export const THREE_ITEM_ROWS_2 = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 8 },
  xl: { span: 8 }
};

export const TWO_THIRD_ITEMS_ROW = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 16 },
  xl: { span: 16 }
};

export const TWO_THIRD_ROW = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 16 },
  lg: { span: 16 },
  xl: { span: 16 }
};
export const TWO_HALF_THIRD_ROW = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 8 },
  lg: { span: 8 },
  xl: { span: 8 }
};
export const TWO_HALF_ROW = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 8 },
  xl: { span: 8 }
};

export const HALF_ROW_FULL_WIDTH_XS = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 }
};

export const SUCCESS_MESSAGES = {
  CONTACTUS_FORM: 'Form Submitted Successfully',
  LOGIN: 'Login Successfully',
  LOGOUT: 'Logout Successfully',
  APPOINMENT_FORM: 'Request send successfully',
  CANCEL_APPOINMENT: 'Appoinment cancelled successfully',
  CREATE_PATIENT: 'Patient Created Successfully',
  UPDATE_PATIENT: 'Patient Updated Successfully',
  DELETE_PATIENT: 'Patient Deleted Successfully',
  APPOINMENT_REVIEW: 'Review Submitted Successfully'
};
export const ACCESS_TYPES = {
  AUTH: 'auth',
  PRIVATE: 'private',
  PUBLIC: 'public'
};
export const ALERT_POSITIONS = {
  topRight: 'top-right',
  topLeft: 'top-left',
  topCenter: 'top-center',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
  bottomCenter: 'bottom-center'
};
export const ALERT_THEMES = {
  dark: 'dark',
  colored: 'colored',
  light: 'light'
};
export const ALERT_TYPES = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  default: 'default'
};
// PRIVATE ROUTES
export const HOME_ROUTE = '/';
export const SUB_PRODUCT = '/sub-products/:categoryName';
export const PRODUCT_DETAIL = '/product-detail/:id';
export const PAYMENT_STEPS = '/payment-steps';
export const PAYMENT_STEPS_EDU = '/payment-steps-education';
export const PRODUCT = '/product';
export const DASHBOARD_ROUTE = '/dashboard';

// AUTH ROUTES
export const lOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/sign-up';
export const FORGOT_ROUTE = '/forgot';
export const EMAIL_VERIFICATION_ROUTE = '/email-verification';
export const RESETPASSWORD_ROUTE = '/reset-password';

// PUBLIC ROUTES
// export const DASHBOARD_ROUTE = '/dashboard';

export const PAGE_ROUTES = [
  // PUBLIC ROUTES
  {
    route: HOME_ROUTE,
    access: ACCESS_TYPES.PUBLIC,
    component: <ProductLines />
  },
  {
    route: SUB_PRODUCT,
    access: ACCESS_TYPES.PUBLIC,
    component: <SubProducts />
  },
  {
    route: PRODUCT_DETAIL,
    access: ACCESS_TYPES.PUBLIC,
    component: <ProductDetail />
  },
  {
    route: PRODUCT,
    access: ACCESS_TYPES.PUBLIC,
    component: <Product />
  },
  {
    route: DASHBOARD_ROUTE,
    access: ACCESS_TYPES.PRIVATE,
    component: <Dashboard />
  },

  // AUTH ROUTES
  {
    route: lOGIN_ROUTE,
    title: 'Login',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Login />
  },
  {
    route: SIGNUP_ROUTE,
    title: 'SignUp',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <SignUP />
  },
  {
    route: FORGOT_ROUTE,
    title: 'Forgot',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Forgot />
  },
  {
    route: EMAIL_VERIFICATION_ROUTE,
    title: 'Email verification',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <EmailVerification />
  },

  {
    route: RESETPASSWORD_ROUTE,
    title: 'Reset Password',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <ResetPassword />
  },
  // PRIVATE ROUTE
  {
    route: PAYMENT_STEPS,
    access: ACCESS_TYPES.PRIVATE,
    component: <PaymentSteps />
  },

  {
    route: PAYMENT_STEPS_EDU,
    access: ACCESS_TYPES.PRIVATE,
    component: <PaymentStepsEducation />
  }
];
export const WEB_STRINGS = {
  ErrorPage: {
    title: '404',
    subtitle: 'Oops! Page not found',
    description:
      "The page you are looking was doesn't exsist. You may have mistyped the address or the page may have been moved",
    button: 'Back to Home'
  }
};

export const header = [
  {
    text: 'Mental Health Learning Solutions',
    link: 'https://www.experiencegeniusacademy.com/learning-solution'
  },
  {
    text: 'Platform',
    link: 'https://www.experiencegeniusacademy.com/platform'
  },
  {
    text: 'Resources',
    link: 'https://www.experiencegeniusacademy.com/resources'
  },
  // { text: 'Products', link: SUB_PRODUCT },
  {
    text: 'Library',
    link: 'https://experiencegenius.academy/dsm-video-immersion-series'
  },
  {
    text: 'About Genius',
    link: 'https://www.experiencegeniusacademy.com/about-genius-academy'
  }
];

const getRequiredLabel = (label) => {
  return;
};

export const validatorField = (_, value, min = 3, max = 80) => {
  if (!value || value?.length < 1) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value?.length > 0 && value?.trim() === '') {
    return Promise.reject(new Error('Cannot accept only white spaces.'));
  } else if (value?.length < min) {
    return Promise.reject(
      new Error(`Must be equal or greater than ${min} characters.`)
    );
  } else if (value?.length > max) {
    return Promise.reject(
      new Error(`Must be less than ${max + 1} characters.`)
    );
  } else {
    return Promise.resolve();
  }
};

export const EMAIL_RULE = [
  {
    validator: (_, value) => {
      if (!value || value?.length < 1) {
        return Promise.reject(new Error('Field is required'));
      } else if (value?.includes(' ')) {
        return Promise.reject(new Error('Cannot accept whitespaces.'));
      } else if (value && !isEmailValid(value)) {
        return Promise.reject(new Error('Invalid email address.'));
      } else {
        return Promise.resolve();
      }
    }
  }
];

export const numberValidatorField = (_, value) => {
  if (value === undefined) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value < 1) {
    return Promise.reject(new Error('Must be equal or greater than 1.'));
  } else if (`${value}`.toLowerCase().includes('e')) {
    return Promise.reject(new Error('Invalid Value.'));
  } else {
    return Promise.resolve();
  }
};
export const numberMinMaxValidatorField = (_, value) => {
  if (value === undefined) {
    return Promise.reject(new Error('Students are required.'));
  } else if (value < 1) {
    return Promise.reject(new Error('Minimum 1 student required.'));
  } else if (`${value}`.toLowerCase().includes('e')) {
    return Promise.reject(new Error('Invalid Value.'));
  } else {
    return Promise.resolve();
  }
};

export const phoneValidation = (_, v, __, min = 10, max = 30) => {
  const value = v?.toString();
  if (!value || value?.length < 1) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value?.length > 0 && value?.trim() === '') {
    return Promise.reject(new Error('Cannot accept white spaces.'));
  } else if (value?.length < min) {
    return Promise.reject(
      new Error(`Must be greater than ${min - 1} characters.`)
    );
  } else if (value?.length > max) {
    return Promise.reject(
      new Error(`Must be less than ${max + 1} characters.`)
    );
  } else {
    return Promise.resolve();
  }
};

export const passwordValidation = (_, value) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value?.includes() === '') {
    return Promise.reject(new Error('Cannot accept whitespace'));
  } else if (value && !checkPasswordValidation(value)) {
    return Promise.reject(
      new Error(
        'Should contain at least 8 and maximum 30 characters , 1 Upper case, 1 Lower Case and 1 Special Character!'
      )
    );
  } else {
    return Promise.resolve();
  }
};

export const STOCK_NAME_LIST = ['ethereum'];
export const handlePassworMatch = (_, value, name) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value !== name) {
    return Promise.reject(new Error('Passwords do not match.'));
  } else {
    return Promise.resolve();
  }
};

export const handlePassworNotMatch = (_, value, name) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value === name) {
    return Promise.reject(new Error('Passwords is same.'));
  } else if (value && value?.includes() === '') {
    return Promise.reject(new Error('Cannot accept whitespace'));
  } else if (value && !checkPasswordValidation(value)) {
    return Promise.reject(
      new Error(
        'Should contain at least 8 and maximum 30 characters , 1 Upper case, 1 Lower Case and 1 Special Character!'
      )
    );
  } else {
    return Promise.resolve();
  }
};

export const AUDIENCE = [
  {
    value: 'student',
    name: 'School'
  },
  {
    value: 'professional',
    name: 'Professional'
  },
  {
    value: 'hobbyist',
    name: 'Hobbyist'
  },
  {
    value: 'audienceOther',
    name: 'Other'
  }
];

export const INTEREST = [
  {
    value: 'technology',
    name: 'Technology'
  },
  {
    value: 'artDesign',
    name: 'Art and Design'
  },
  {
    value: 'sportFitness',
    name: 'Sport and Fitness'
  },
  {
    value: 'cookingFood',
    name: 'Cooking and Food'
  },
  {
    value: 'interestOther',
    name: 'Other'
  }
];

export const SUBJECT = [
  {
    value: 'mathematics',
    name: 'Mathematics'
  },
  {
    value: 'science',
    name: 'Science'
  },
  {
    value: 'history',
    name: 'History'
  },
  {
    value: 'art',
    name: 'Art'
  },
  {
    value: 'subjectOther',
    name: 'Other'
  }
];

export const LMSFIELD = [
  {
    type: 'text',
    name: 'fullName',
    placeholder: 'Full Name'
  },
  {
    type: 'email',
    name: 'emailAddress',
    placeholder: 'Email Address'
  },
  {
    type: 'text',
    name: 'schoolInstitution',
    placeholder: 'School/Institution'
  },
  {
    type: 'text',
    name: 'gradLevel',
    placeholder: 'Grad/Level'
  }
];
