import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import signupIMG from '../assets/avatar1.jpg';
import SignupForm from '../components/signupPage/SignupForm';
import useIsAuthorizedUser from '../hook/useIsAuthorizedUser.js';
import getRoutes from '../routes.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const isAuthorizedUser = useIsAuthorizedUser();
  if (isAuthorizedUser) return (<Navigate to={getRoutes.main()} replace />);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img className="rounded-circle" src={signupIMG} alt={t('SignupPage.header')} />
              </div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
