import loginIMG from '../assets/avatar.jpg';
import FormForLoginPage from '../components/FormForLoginPage';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img className="rounded-circle" src={loginIMG} alt="Войти" />
            </div>
            <FormForLoginPage />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              {' '}
              <span>Регистрация (сделать ссылку)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
