import React, { useEffect } from 'react';
import './styles.scss';
import { Header } from '../../components';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DASHBOARD_ROUTE, HOME_ROUTE } from '../../constants';

function AuthSharedLayout({ children }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authenticated = useSelector(({ user }) => user.isAuthenticated);
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (authenticated) {
      navigate(redirect ? redirect : HOME_ROUTE);
    }
  }, [authenticated]);

  return (
    <section className="auth-wrapper">
      <div className="auth-content">{children}</div>
    </section>
  );
}

export default AuthSharedLayout;
