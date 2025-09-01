import "./ChangePasswordPage.scss";
import { ErrorMessage } from '../../components/ErrorMessage';
import { useState } from "react";
import axios from "axios";
import { Loader } from "../../components/Loader";

const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return '';
};

export const ChangePasswordPage = () => {
  const token = localStorage.getItem('accessToken');

  /* #region */
  const [notificationEmail, setNotificationEmail] = useState('');
  const [errorMessage, serErrorMessage] = useState('');
  const [errorOldPassword, serErrorOldPassword] = useState('');
  const [errorNewPass, setErrorNewPass] = useState('');
  const [errorAcceptPass, setErrorAcceptPass] = useState('');
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    acceptNewPassword: "",
  });
  /* #endregion */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    serErrorOldPassword('');
    setErrorNewPass('');
    setErrorAcceptPass('');
    serErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoader(true);

    if (validatePassword(formData.oldPassword)) {
      setErrorNewPass(validatePassword(formData.oldPassword));
      setLoader(false);
      return;
    }

    if (validatePassword(formData.newPassword)) {
      setErrorNewPass(validatePassword(formData.newPassword));
      setLoader(false);
      return;
    }

    if (validatePassword(formData.acceptNewPassword)) {
      setErrorNewPass(validatePassword(formData.acceptNewPassword));
      setLoader(false);
      return;
    }

    if (formData.acceptNewPassword !== formData.newPassword) {
      setErrorAcceptPass("New passwords must match");
      setLoader(false);
      return;
    }

    try {
      await axios.patch('http://localhost:5700/change-password', {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        acceptNewPassword: formData.acceptNewPassword,
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setFormData({
        oldPassword: "",
        newPassword: "",
        acceptNewPassword: ""
      });
      setNotificationEmail("User password successfully updated");

      // navigate(-1);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Something went wrong';

        serErrorMessage(message);
      } else {
        serErrorMessage('Unexpected error');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="registrPage">
          <section className="registrPage__registration registration">
            <form className="registration__form" onSubmit={handleSubmit}>
              <h2 className="registration__title">Set new password</h2>

              <label className="registration__label">
                Old Password
                <input
                  type="password"
                  name="oldPassword"
                  className="registration__input"
                  placeholder="Enter your old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                <p className="registration__error registration__error--email">
                  {errorOldPassword && errorOldPassword}
                </p>
              </label>

              <label className="registration__label">
                New Password
                <input
                  type="password"
                  name="newPassword"
                  className="registration__input"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <p className="registration__error registration__error--pass">
                  {errorNewPass && errorNewPass}
                </p>
              </label>

              <label className="registration__label">
                Accept new Password
                <input
                  type="password"
                  name="acceptNewPassword"
                  className="registration__input"
                  placeholder="Accept your new password"
                  value={formData.acceptNewPassword}
                  onChange={handleChange}
                  required
                />
                <p className="registration__error registration__error--pass">
                  {errorAcceptPass && errorAcceptPass}
                </p>
              </label>

              <button
                type="submit"
                className="registration__button"
              >
                Change Password
              </button>
            </form>
          </section>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {notificationEmail && (
            <div className="activation_page__note activation_page__note--is-success">
              <p className="notification is-success is-light">
                {notificationEmail}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
};
