import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../../services/chatApi';
import { setUserLocalStore } from '../../utils/localStore';
import { setCredentials } from '../../slices/authSlice';
import getRoutes from '../../routes.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const [isExistingUser, setExistingUser] = useState(false);
  const navigate = useNavigate();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  const registrationSchema = yup.object().shape({
    username: yup.string().required(t('SignupPage.form.errors.requireField')).min(3, t('SignupPage.form.errors.length')).max(20, t('SignupPage.form.errors.length')),
    password: yup.string().required(t('SignupPage.form.errors.requireField')).min(6, t('SignupPage.form.errors.minLength')),
    confirmPassword: yup.string().required(t('SignupPage.form.errors.requireField')).oneOf([yup.ref('password')], t('SignupPage.form.errors.mismatchPassword')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const response = await signup({ username, password });

        if (response.error) {
          throw response.error;
        }
        const { data } = response;
        setUserLocalStore(data);
        dispatch(setCredentials(data));
        navigate(getRoutes.main());
      } catch (err) {
        switch (err.status) {
          case 409:
            setExistingUser(true);
            break;

          default:
            console.log('Произошла сетевая ошибка: ', err);
            break;
        }
      }
    },
  });

  const {
    values: { username, password, confirmPassword },
    handleSubmit,
    handleChange,
    touched,
    errors,
    isValid,
  } = formik;

  return (
    <Form aria-disabled={isSignupLoading} onSubmit={handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('SignupPage.header')}</h1>
      <FloatingLabel
        label={t('SignupPage.form.usernameLabel')}
        controlId="username"
        className="mb-3"
      >
        <Form.Control
          autoComplete="username"
          required
          value={username}
          onChange={handleChange}
          name="username"
          placeholder={t('SignupPage.form.errors.length')}
          isInvalid={(touched.username && errors.username) || isExistingUser}
        />
        {!isValid && <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>}
      </FloatingLabel>

      <FloatingLabel
        label={t('SignupPage.form.passwordLabel')}
        controlId="password"
        className="mb-3"
      >
        <Form.Control
          autoComplete="new-password"
          required
          value={password}
          onChange={handleChange}
          name="password"
          placeholder={t('SignupPage.form.errors.minLength')}
          type="password"
          isInvalid={(touched.password && errors.password) || isExistingUser}
        />
        {!isValid && <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>}
      </FloatingLabel>

      <FloatingLabel
        label={t('SignupPage.form.confirmPasswordLabel')}
        controlId="confirmPassword"
        className="mb-4"
      >
        <Form.Control
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          placeholder={t('SignupPage.form.errors.mismatchPassword')}
          type="password"
          isInvalid={(touched.confirmPassword && errors.confirmPassword) || isExistingUser}
        />
        {!isValid && <Form.Control.Feedback type="invalid" tooltip>{errors.confirmPassword}</Form.Control.Feedback>}
        {isExistingUser && <Form.Control.Feedback type="invalid" tooltip>{t('SignupPage.form.errors.userExists')}</Form.Control.Feedback>}
      </FloatingLabel>
      <Button className="w-100" type="submit" variant="outline-primary">{t('SignupPage.form.btnSubmit')}</Button>
    </Form>
  );
};

export default SignupForm;
