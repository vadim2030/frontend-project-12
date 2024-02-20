import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getRoutes from '../routes.js';
import Layout from './Layout.js';
import NotFoundPage from '../page/NotFoundPage.js';
import LoginPage from '../page/LoginPage.js';
import ChatPage from '../page/ChatPage.js';
import { setCredentials } from '../slices/authSlice.js';

const App = ({ userData }) => {
  const dispatch = useDispatch();
  if (userData) {
    dispatch(setCredentials(userData));
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path={getRoutes.main()} element={<Layout />}>
            <Route index element={<ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path={getRoutes.loginPage()} element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
