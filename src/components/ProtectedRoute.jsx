import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUser } from '../utils/cookies';

export default function ProtectedRoute({ children, roles }) {
  if (!isLoggedIn()) return <Navigate to="/admin/login" replace />;

  if (roles && !roles.includes(getUser()?.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}