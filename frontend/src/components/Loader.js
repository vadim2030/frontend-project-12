import Spinner from 'react-bootstrap/esm/Spinner';

const Loader = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Загрузка</span>
    </Spinner>
  </div>
);

export default Loader;
