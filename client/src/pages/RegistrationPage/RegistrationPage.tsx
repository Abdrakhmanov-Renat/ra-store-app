import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './RegistrationPage.scss';
import { ErrorMessage } from '../../components/ErrorMessage';
import { actions as authActions } from '../../features/auth';
import { fetchCart } from '../../api/addToCart';
import { fetchLikes } from '../../api/addToLike';

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return '';
}

const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return '';
};

export const RegistrationPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, serErrorMessage] = useState('');
  const [errorEmail, serErrorEmail] = useState('');
  const [errorPass, serErrorPass] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    serErrorEmail('');
    serErrorPass('');
    serErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(formData.email)) {
      serErrorEmail(validateEmail(formData.email));
      return;
    }

    if (validatePassword(formData.password)) {
      serErrorPass(validatePassword(formData.password));
      return;
    }

    try {
      const response = await axios.post('http://localhost:5700/login', {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });

      const { user, token } = response.data;

      localStorage.setItem('accessToken', token);

      await dispatch(authActions.login(user));

      await dispatch(fetchCart(user.id));
      await dispatch(fetchLikes(user.id));

      navigate(-1);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data ||
          err.message ||
          'Something went wrong';

        serErrorMessage(message);
      } else {
        serErrorMessage('Unexpected error');
      }
    }
  };

  return (
    <>
      <div className="registrPage">
        <section className="registrPage__registration registration">
          <form className="registration__form" onSubmit={handleSubmit}>
            <h2 className="registration__title">Login</h2>

            <label className="registration__label">
              Email
              <input
                type="email"
                name="email"
                className="registration__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p className="registration__error registration__error--email">
                {errorEmail && errorEmail}
              </p>
            </label>

            <label className="registration__label">
              Password
              <input
                type="password"
                name="password"
                className="registration__input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="registration__error registration__error--pass">
                {errorPass && errorPass}
              </p>
            </label>

            <button
              type="submit"
              className="registration__button"
            >
              Log in
            </button>

            <p className="registration__text">
              Don't have an account?{' '}
              <Link
                to="/sign-up"
                className="registration__link registration__link--next"
              >
                Sign up
              </Link>
            </p>
            {/* <p className="registration__text registration__text--settings">
              Forgot Password?{' '}
              <Link
                to="/settings/password"
                className="registration__link registration__link--next"
              >
                Change Password
              </Link>
            </p> */}
          </form>
        </section>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </>
  );
};
