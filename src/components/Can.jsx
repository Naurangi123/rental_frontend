import { useAuth } from '../context/AuthContext';

const Can = ({ permission, children }) => {
  const { permissions } = useAuth();

  if (!permissions.includes(permission)) return null;
  return children;
};

export default Can;
