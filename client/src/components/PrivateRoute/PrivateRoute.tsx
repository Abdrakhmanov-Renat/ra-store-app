import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { Loader } from '../Loader';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );

  if (!isAuthChecked) {
    return <Loader />;
  }

  return (isAuthenticated) ? children : <Navigate to="/login" replace />;
};
