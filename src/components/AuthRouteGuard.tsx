/*
  Reference:
  https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4
*/

import { Navigate } from 'react-router-dom';
import { hasAuthToken } from '../utils/auth';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = hasAuthToken();
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
