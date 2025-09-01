import { useState } from "react";
import "./SettingsUserPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loader } from "../../components/Loader";

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

export const SettingsUserPage = () => {
  const token = localStorage.getItem('accessToken');

  const [formDataEmail, setFormDataEmail] = useState({
    email: "",
    password: ""
  });
  const [formDataName, setFormDataName] = useState({
    name: "",
    password: ""
  });
  const [openForm, setOpenForm] = useState<null | 'name' | 'email'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPass, serErrorPass] = useState('');
  const [errorEmail, serErrorEmail] = useState('');

  const [notificationEmail, setNotificationEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const resetErrors = () => {
    setErrorMessage('');
    serErrorPass('');
    serErrorEmail('');
  };

  const toggleForm = (type: 'name' | 'email') => {
    setOpenForm(prev => (prev === type ? null : type));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    resetErrors();
    setFormDataEmail({ ...formDataEmail, [e.target.name]: e.target.value });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    resetErrors();
    setFormDataName({ ...formDataName, [e.target.name]: e.target.value });
  };

  const handleSubmitEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoader(true);

    if (validateEmail(formDataEmail.email)) {
      serErrorEmail(validateEmail(formDataEmail.email));
      return;
    }

    if (validatePassword(formDataEmail.password)) {
      serErrorPass(validatePassword(formDataEmail.password));
      return;
    }

    try {
      await axios.patch('http://localhost:5700/change-email', {
        newEmail: formDataEmail.email,
        password: formDataEmail.password,
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setNotificationEmail("Email update initiated. Please check your new email for activation");
      setFormDataEmail({
        email: "",
        password: ""
      });
      // navigate(-1);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Something went wrong';

        setErrorMessage(message);
      } else {
        setErrorMessage('Unexpected error');
      }
    } finally {
      setLoader(false);
    }
  };

  const handleSubmitNameChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formDataName.name.length < 2) {
      serErrorEmail("Name length more 3");
      return;
    }

    if (validatePassword(formDataName.password)) {
      serErrorPass(validatePassword(formDataEmail.password));
      return;
    }

    try {
      await axios.patch('http://localhost:5700/change-name', {
        name: formDataName.name,
        password: formDataName.password,
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      navigate(-1);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Something went wrong';

        setErrorMessage(message);
      } else {
        setErrorMessage('Unexpected error');
      }
    }
  };

  return (
    <div className="settingspage">
      {!loader ? (
        <>
          <h1>Settings</h1>

          <div className="settingspage__section">
            <div className="settingspage__form">
              <button
                onClick={() => toggleForm('name')}
                className="settingspage__button"
              >
                Change Name
              </button>
              {openForm === 'name' && (
                <form onSubmit={handleSubmitNameChange}>
                  <label className="settingspage__label">
                    Name
                    <input
                      name="name"
                      placeholder="New name"
                      value={formDataName.name}
                      onChange={handleChangeName}
                      className="settingspage__input"
                      required
                    />

                    <p className="registration__error registration__error--pass">
                      {errorEmail && errorEmail}
                    </p>
                  </label>

                  <label className="settingspage__label">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formDataName.password}
                      onChange={handleChangeName}
                      className="settingspage__input"
                      required
                    />

                    <p className="registration__error registration__error--pass">
                      {errorPass && errorPass}
                    </p>
                  </label>

                  <button type="submit" className="settingspage__form-button">Save</button>
                </form>
              )}
            </div>

            <div className="settingspage__form">
              <button
                onClick={() => toggleForm('email')}
                className="settingspage__button"
              >
                Change Email
              </button>
              {openForm === 'email' && (
                <form onSubmit={handleSubmitEmailChange}>
                  <label className="settingspage__label">
                    E-mail
                    <input
                      type="email"
                      name="email"
                      placeholder="New email"
                      className="settingspage__input"
                      value={formDataEmail.email}
                      onChange={handleChangeEmail}
                      required
                    />

                    <p className="registration__error registration__error--pass">
                      {errorEmail && errorEmail}
                    </p>
                  </label>

                  <label className="settingspage__label">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="settingspage__input"
                      value={formDataEmail.password}
                      onChange={handleChangeEmail}
                      required
                    />

                    <p className="registration__error registration__error--pass">
                      {errorPass && errorPass}
                    </p>
                  </label>

                  <button type="submit" className="settingspage__form-button">Save</button>
                </form>
              )}
            </div>
            <div className="settingspage__form">
              <button
                onClick={() => navigate('/settings/password')}
                className="settingspage__button"
              >
                Change Password
              </button>
            </div>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {notificationEmail && (
            <div className="activation_page__note activation_page__note--is-success">
              <p className="notification is-success is-light">
                {notificationEmail}
              </p>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
};
