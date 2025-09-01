// hooks/useAuthInit.ts
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actions as authActions } from '../features/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchCart } from '../api/addToCart';
import { fetchLikes } from '../api/addToLike';

export const useAuthInit = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id.toString()));
      dispatch(fetchLikes(user.id.toString()));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get('http://localhost:5700/refresh', {
          withCredentials: true,
        });

        localStorage.setItem('accessToken', res.data.token);
        dispatch(authActions.login(res.data.user));
        dispatch(authActions.setAuthChecked(true));
      } catch (error) {
        dispatch(authActions.logout());
        dispatch(authActions.setAuthChecked(true));
        localStorage.removeItem('accessToken');
      }
    };

    init();
  }, [dispatch]);
};
