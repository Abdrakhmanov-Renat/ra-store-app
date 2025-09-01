import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserPage.scss';
import axios from 'axios';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { actions as authActions } from '../../features/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as cartActions } from '../../features/addedToCartProducts';
import { actions as quantitiesActions } from '../../features/cartQuantities';
import { actions as likeActions } from '../../features/likedProducts';

export const UserPage = () => {
  const [errorMessage, serErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: RootState) => state.auth
  );
  const token = localStorage.getItem('accessToken');

  const logoutUser = () => {
    axios.post('http://localhost:5700/logout', {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        dispatch(authActions.logout());
        dispatch(cartActions.setNullProducts())
        dispatch(quantitiesActions.setNullQuantity())
        dispatch(likeActions.setNullProducts());
        localStorage.removeItem('accessToken');
        navigate('/');
      })
      .catch((error) => serErrorMessage(
        error.error || `something went wrong`))
  };

  return (
    <div className="user-page">
      <h1 className="user-page__title">
        {!token ? 'User Page' : `Hi ${user?.name}`}
      </h1>
      <div className="user-page__bottom">
        {!token ? (
          <>
            <div className="user-page__buttons">
              <Link to="/login" className="user-page__button login">
                Login
              </Link>
              <Link to="/sign-up" className="user-page__button signup">
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="user-page__buttons">
              <button
                className="user-page__button logout"
                onClick={logoutUser}
              >
                Logout
              </button>
              <button
                className="user-page__button settings"
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
            </div>
          </>
        )}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
