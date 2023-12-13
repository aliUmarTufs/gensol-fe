import Error from './404';
// PUBLIC ROUTES
import Home from './public/home';
import Dashboard from './public/Dashboard';

// AUTH ROUTES
import Login from './auth/Login';
import Signup from './auth/Signup';
import Forgot from './auth/Forgot';
import EmailVerification from './auth/EmailVerification';

// PRIVATE ROUTES
// import Dashboard from './private/dashboard';

export { Error, Home, Login, Dashboard, Signup, Forgot, EmailVerification };
