import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

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

export const SignUpPage = () => {
  const [errorMessage, serErrorMessage] = useState('');
  const [errorEmail, serErrorEmail] = useState('');
  const [errorPass, serErrorPass] = useState('');
  const [formData, setFormData] = useState({
    name: "",
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

    axios.post("http://localhost:5700/registration", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
      .then(() => {
        alert('Check your email');
        setFormData({
          name: "",
          email: "",
          password: ""
        })
      })
      .catch((err: any) => {
        const message = getErrorMessage(err);
        serErrorMessage(message);
      })
  };

  return (
    <>
      <div className="registrPage">
        <section className="registrPage__registration registration">
          <form className="registration__form" onSubmit={handleSubmit}>
            <h2 className="registration__title">Sign Up</h2>

            <label className="registration__label">
              Name
              <input
                type="text"
                name="name"
                className="registration__input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

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
              {errorEmail && errorEmail}
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
              {errorPass && errorPass}
            </label>

            <button
              type="submit"
              className="registration__button"
            >
              Sign up
            </button>

            <p className="registration__text">
              Already have an account?{' '}
              <Link
                to="/login"
                className="registration__link registration__link--next"
              >
                Log in
              </Link>
            </p>
          </form>
        </section>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </>
  );
};
