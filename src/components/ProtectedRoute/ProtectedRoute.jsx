import { Navigate } from 'react-router-dom';

import Unauthorized from '@/components/Unauthorized/Unauthorized';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const jwt = localStorage.getItem('jwt');
  const role = localStorage.getItem('role');

  if (!jwt) return <Navigate to='/login' />;

  if (allowedRoles.includes(role)) return children;

  return <Unauthorized />;
};

export default ProtectedRoute;
