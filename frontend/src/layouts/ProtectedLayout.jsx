import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
    const { user, loadingAuth } = useAuth();
    const location = useLocation();

    if (loadingAuth) return null;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default ProtectedLayout;