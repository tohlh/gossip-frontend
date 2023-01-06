/*
  Reference:
  https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4
*/

import { Navigate } from 'react-router-dom';

const RouteGuard = (
  { pred, element, redirect }: { pred: boolean, element: JSX.Element, redirect: string }
) => {
  return pred
    ? element
    : <Navigate to={redirect} />;
};

export default RouteGuard;