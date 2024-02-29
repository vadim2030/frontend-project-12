import {
  Link, Outlet, useLocation, Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getRoutes from '../routes.js';
import { setUserLocalStore } from '../utils/localStore.js';
import { removeCredentials } from '../slices/authSlice.js';
import useIsAuthorizedUser from '../hook/useIsAuthorizedUser.js';

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthorizedUser = useIsAuthorizedUser();

  if (location.pathname === getRoutes.main() && !isAuthorizedUser) {
    return <Navigate to={getRoutes.loginPage()} />;
  }

  const handleSignOut = () => {
    setUserLocalStore(null);
    dispatch(removeCredentials());
    return <Navigate to={getRoutes.loginPage()} />;
  };

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={getRoutes.main()}>{t('Layout.siteName')}</Link>
          {isAuthorizedUser && <Button onClick={handleSignOut} variant="primary" type="button">{t('Layout.signOutBtn')}</Button>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
