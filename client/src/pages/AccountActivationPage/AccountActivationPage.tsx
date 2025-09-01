import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./AccountActivationPage.scss";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components/Loader';
import { actions as authActions } from '../../features/auth';

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activationToken } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5700/activate/${activationToken}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log('Activation response:', response.data);
        const { user, token } = response.data;

        localStorage.setItem('accessToken', token);

        dispatch(authActions.login(user));
      })
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => setDone(true));
  }, [activationToken, dispatch, navigate]);

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <div className="activation_page">
        <h1 className="activation_page__title">Account activation</h1>

        {error ? (
          <div className="activation_page__note activation_page__note--is-danger">
            <p className="notification is-danger is-light">
              {error}
            </p>
          </div>
        ) : (
          <div className="activation_page__note activation_page__note--is-success">
            <p className="notification is-success is-light">
              Your account is now active
            </p>
          </div>
        )}
      </div>
    </>
  );
};
