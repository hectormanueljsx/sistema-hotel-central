import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = localStorage.getItem('identifier');
  const role = localStorage.getItem('role');

  if (!user) return <Navigate to='/login' />;

  if (allowedRoles.includes(role)) return children;

  return <Navigate to='/' />;
};

export default ProtectedRoute;
