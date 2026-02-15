import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ allowedRoles }) => {
  const { loading, role } = useAuth();

  if (loading) return <div>Loading...</div>;

  return allowedRoles.includes(role)
    ? <Outlet />
    : <Navigate to="/403" replace />;
};

export default RoleRoute;
