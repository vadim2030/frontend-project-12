import {
  Link, Outlet, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import getRoutes from '../routes.js';

const Layout = () => {
  const location = useLocation();
  const userToken = useSelector((state) => state.authData.token);

  if (location.pathname === getRoutes.main() && !userToken) {
    return <Navigate to={getRoutes.loginPage()} />;
  }

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={getRoutes.main()}>Hexlet Chat</Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
