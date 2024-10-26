import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useSelector((state) => state.user);
  
  // Redirect if user role does not match the required roles
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // If role matches, render the protected component
  return children;
};

export default ProtectedRoute;