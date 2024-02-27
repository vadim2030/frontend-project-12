import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import getRouter from '../routes.js';
import notFoundIMG from '../assets/notFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img className="img-fluid h-25" src={notFoundIMG} alt={t('NotFoundPage.header')} />
      <h1 className="h4 text-muted">{t('NotFoundPage.header')}</h1>
      <p className="text-muted">
        {t('NotFoundPage.textBox')}
        {' '}
        <Link to={getRouter.main()}>{t('NotFoundPage.linkToMain')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
