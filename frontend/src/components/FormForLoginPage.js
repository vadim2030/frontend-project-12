import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import getRoutes from '../routes.js';
import { useLoginMutation } from '../services/chatApi.js';
import { setUserLocalStore } from '../utils/localStore.js';

const FormForLoginPage = () => {
  const usernameInput = useRef(null);
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (val) => {
      try {
        setAuthFailed(false);
        const response = await login(val);
        setUserLocalStore(response.data);
        navigate(getRoutes.main());
      } catch (err) {
        setAuthFailed(true);
        console.log('Ошибка авторизации: ', err);
      }
    },
  });

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <FloatingLabel className="mb-3" label="Ваш ник" controlId="username">
        <Form.Control
          ref={usernameInput}
          required
          placeholder="Ваш ник"
          autoComplete="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={isAuthFailed}
        />
      </FloatingLabel>
      <InputGroup className="mb-4">
        <FloatingLabel label="Пароль" controlId="password">
          <Form.Control
            required
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={isAuthFailed}
          />
          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
        </FloatingLabel>
      </InputGroup>
      <Button variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
    </Form>
  );
};

export default FormForLoginPage;
