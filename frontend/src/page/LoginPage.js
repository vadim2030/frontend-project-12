import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginIMG from '../assets/avatar.jpg';
import FormForLoginPage from '../components/FormForLoginPage';
import useIsAuthorizedUser from '../components/hook/useIsAuthorizedUser.js';
import getRoutes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const isAuthorizedUser = useIsAuthorizedUser();
  if (isAuthorizedUser) return <Navigate to={getRoutes.main()} replace />;

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={loginIMG} alt={t('LoginPage.imgAlt')} />
              </div>
              <FormForLoginPage />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('LoginPage.bottomText')}</span>
                {' '}
                <a href={getRoutes.signupPage()}>{t('LoginPage.btnSignup')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
