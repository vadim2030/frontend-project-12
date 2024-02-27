import Spinner from 'react-bootstrap/esm/Spinner';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{t('Loader.textLable')}</span>
      </Spinner>
    </div>
  );
};

export default Loader;
