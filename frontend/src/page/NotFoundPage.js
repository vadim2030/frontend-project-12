import { Link } from 'react-router-dom';
import getRouter from '../routes.js';
import notFoundIMG from '../assets/notFound.svg';

const NotFoundPage = () => (
  <div className="text-center">
    <img className="img-fluid h-25" src={notFoundIMG} alt="Страница не найдена" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <Link to={getRouter.main()}>на главную страницу</Link>
    </p>
  </div>
);

export default NotFoundPage;
