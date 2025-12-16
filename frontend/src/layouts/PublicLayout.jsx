import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null; 

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicLayout;