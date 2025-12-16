import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicLayout = () => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return null; 

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicLayout;