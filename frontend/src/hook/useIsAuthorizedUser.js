import { useSelector } from 'react-redux';

export default () => Boolean(useSelector((state) => state.authData.token));
