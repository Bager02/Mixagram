import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

const PublicAccessLayout = () => {
    const { user, loadingAuth } = useAuth();

    if (loadingAuth) return null;

    return (
        <>
            {user && <NavBar />}
            <Outlet />
        </>
    );
};

export default PublicAccessLayout;